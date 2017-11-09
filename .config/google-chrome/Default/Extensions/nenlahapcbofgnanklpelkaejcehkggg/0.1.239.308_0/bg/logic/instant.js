import * as analytics from '../utility/analytics';
import tldjs from 'tldjs';
import woodstock from 'iv-woodstock';
import _ from 'lodash';
import {
  runV2,
  runV3,
  setMetricsCallback as setMetricsCallbackV2,
  updateConfig
} from 'iv-wb-light/dist/iv-wb-light-chrome';
import tree from '../state';
import localStore from 'storage/local';
import {SITE_API, WIKIBUY_API} from 'constants';
import {setEvent} from 'api/preferences';
import {getCart} from 'api/cart';
import hasFeature from 'utility/hasFeature';
import getSite from 'cache/siteCache';
import getEbayOrderStats from './ebay';
import doWork from './worker';
import {getData as getFeedbackData} from 'logic/feedback';
import * as linus from 'iv-linus';
import {fetchASIN} from './deals';
import delay from '../utility/delay';

import modalDetailsReceived from 'messaging/notifications/outbound/modalDetailsReceived';
import amazonResultsReceived from 'messaging/notifications/outbound/amazonResultsReceived';
import feedbackDataReceived from 'messaging/notifications/outbound/feedbackDataReceived';
import communityDealReceived from 'messaging/notifications/outbound/communityDealReceived';
import abortRun from 'messaging/notifications/outbound/abortRun';
import siteList from '../resources/site-list.json';

const CACHE_EXPIRATION = 1000 * 60 * 1;

// Setup environment endpoint V2
setMetricsCallbackV2((name, data) => {
  analytics.track(name, data);
});
updateConfig({
  WB_API_BASE: WIKIBUY_API.replace('/v1', ''),
  SITE_API_BASE: SITE_API.replace('/v2', '')
});
linus.config.sendMetric = (event, properties) => {
  const arg = {
    integrations: {
      'Customer.io': false
    }
  };
  analytics.track(event, properties, arg);
};

const settingsCursor = tree.select(['settings']);
const postOnboardingRunCursor = tree.select(['postOnboardingRun']);

let ebayCheck = 0;
let workerCheck = 0;

const fetchingSites = {};
let running = false;

async function checkWoodstockData(details) {
  const domain = tldjs.getDomain(details.url);
  if (fetchingSites[domain]) {
    fetchingSites[domain].requestQueue.push(details);
    return;
  }
  fetchingSites[domain] = {
    requestQueue: [details]
  };

  if (hasFeature('eb_o_ck') && domain === 'ebay.com' && new Date().getTime() > ebayCheck) {
    ebayCheck = new Date().getTime() + 24 * 60 * 60 * 1000; // check once a day
    getEbayOrderStats().then(orders => {
      if (orders) {
        _.forEach(orders, order => {
          analytics.track('ebayOrderHistory', order);
        });
      }
    });
  }
  if (hasFeature('worker_init_fetch') && new Date().getTime() > workerCheck) {
    workerCheck = new Date().getTime() + 24 * 60 * 60 * 1000;
    doWork();
  }

  getSite(domain).then(siteData => {
    _.forEach(fetchingSites[domain].requestQueue, details => {
      const properties = woodstock(details, siteData);
      if (properties) {
        analytics.track(properties.key || 'merchantCheckout', properties);
        if (properties.type === 'placeOrder' && domain === 'amazon.com') {
          // Todo - add amazon order history tracking
        }
      }
      delete fetchingSites[domain];
    });
  });
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
  if (details && details.requestBody) {
    details.formData = details.requestBody.formData;
  }
  if (!running) {
    checkWoodstockData(details);
    const linusData = linus.updateRequest(details);
    if (linusData) {
      linus.persistPageData(linusData);
    }
  }
}, {urls: siteList}, ['requestBody']);

async function patchRunWithSettings(data, overrideZip) {
  const {userId} = await localStore.get('userId');
  const {prime, zipcode, address} = settingsCursor.get();
  data.userId = userId;
  data.prime = typeof prime === 'boolean' ? prime : true;
  data.zipcode = overrideZip || zipcode;
  if (!overrideZip && address) {
    data.address = address;
  }
  data.features = _.get(tree.get(['session']), 'features');
  if (data.features && _.get(data, 'product.vendor') === 'amazon.com') {
    data.features = [...data.features, 'show_deleted_results'];
  }
  data.events = settingsCursor.get('events');
  return data;
}

export async function getCartForRun(run) {
  const cartData = await getCart({
    items: [
      {
        run_id: _.get(run, 'runId')
      }
    ],
    priceCheckId: tree.get('priceCheckId')
  });
  cartData.items = _.map(cartData.items, (item) => {
    item.betterResults = _.map(item.betterResults, (betterResult) => {
      const rawResult = _.find(run.betterResults, {id: betterResult.id});
      betterResult.meta = rawResult ? _.assign({}, betterResult.meta, rawResult.meta) : _.assign({}, betterResult.meta);
      return betterResult;
    });
    item.result = item.betterResults[0];
    return item;
  });
  return cartData;
}

async function getCommunityDeal(asin, retries) {
  let deal = await fetchASIN(asin);
  while (!deal && retries) {
    await delay(1000);
    deal = await fetchASIN(asin);
    --retries;
  }
  return deal;
}

function cleanRunCache() {
  const cache = tree.select(['runCache']);
  if (cache) {
    _.forOwn(cache.get(), (data, key) => {
      if (data.expires < Date.now()) {
        cache.unset(key);
      }
    });
  }
}

export async function startRun(data, overrideZip) {
  cleanRunCache();
  data = await patchRunWithSettings(data, overrideZip);
  if (data.meta && (hasFeature('az_mk_res') || hasFeature('wbv2_list_est'))) {
    data.meta.shouldGetAmazonList = true;
  }
  if (data.meta && (hasFeature('ext_instant_offers'))) {
    data.meta.instantOffersEnabled = true;
  }
  if (data.meta && (hasFeature('ext_full_pricing'))) {
    data.meta.amazonFullPricing = true;
  }
  if (data.meta && data.meta.dealId) {
    data.meta.disableOriginPricing = true;
  }
  let amazonResults;
  let startedRun = {runId: 'aborted'};
  const tabId = _.get(data, 'meta.tab.id');
  running = true;

  const runTimeoutId = setTimeout(() => {
    abortRun(tabId, {runId: startedRun.runId});
    tree.set(['runCache', startedRun.runId], {cart: false, expires: Date.now()});
  }, 30000);
  const vendor = _.get(data, 'product.vendor') || 'amazon.com';
  if (!hasFeature('ext_disable_feedback')) {
    getFeedbackData({
      wbpid: _.get(data, 'product.wbpid') || `${vendor}_${vendor === 'amazon.com' ? data.asin : _.get(data, 'gtin[0]')}`,
      product: _.get(data, 'product'),
      userId: data.userId,
      meta: _.get(data, 'meta.feedback')
    }).then((data) => {
      feedbackDataReceived(tabId, data);
      return data;
    });
  }
  let hasInstantOffers;
  const instantOffers = hasFeature('ext_runV3') ? runV3 : runV2;
  startedRun = await instantOffers(data, async (runResp) => {
    const {runId, type, list, data} = runResp;
    if (type === 'amazonListPrices') {
      amazonResultsReceived(tabId, {runId, amazonResults: list});
    } else if (type === 'instantOffers' && !hasInstantOffers) {
      clearTimeout(runTimeoutId);
      hasInstantOffers = true;
      try {
        const cartData = await getCartForRun({runId: data.instantOffersRunId});
        cartData.instantOffers = data;
        tree.set(['runCache', data.instantOffersRunId], {parentRunId: startedRun.runId, expires: Date.now() + CACHE_EXPIRATION});
        modalDetailsReceived(tabId, cartData);
      } catch (e) {}
    } else if (type === 'complete') {
      running = false;
      clearTimeout(runTimeoutId);
      try {
        const cartData = await getCartForRun({runId});
        cartData.amazonResults = amazonResults;
        modalDetailsReceived(tabId, cartData);
        tree.set(['runCache', runId], {cart: cartData, expires: Date.now() + CACHE_EXPIRATION});
      } catch (e) {
        abortRun(tabId, {runId});
      }
    }
  });
  if (startedRun && startedRun.runId) {
    tree.set(['runCache', startedRun.runId], {running: true});
    if (data.asin) {
      getCommunityDeal(data.asin).then((deal) => {
        if (deal) {
          communityDealReceived(tabId, {deal});
          tree.set(['runCache', deal.runId], {parentRunId: startedRun.runId, expires: Date.now() + CACHE_EXPIRATION});
        } else {
          communityDealReceived(tabId, {error: 'no deal found'});
        }
      });
    }
  }
  return startedRun;
}

export async function completeOnboarding() {
  settingsCursor.set('showOnboarding', false);
  setEvent('hasAgreedToTerms');

  let events = _.cloneDeep(tree.get(['settings', 'events']));
  events = _.merge(events, {hasAgreedToTerms: Date.now()});
  tree.set(['settings', 'events'], events);


  const postOnboardingRun = postOnboardingRunCursor.get();
  if (postOnboardingRun) {
    startRun(_.cloneDeep(postOnboardingRun));
    postOnboardingRunCursor.set(null);
  }
}
