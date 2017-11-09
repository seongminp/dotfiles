import moment from 'moment';
import publicSuffixList from 'iv-public-suffix-list';
import Url from 'url';
import tree from 'state';
import _ from 'lodash';
import {track} from '../utility/analytics';
import warnAboutStandDown from 'messaging/notifications/outbound/warnAboutStandDown';
import cache from 'cache/cashbackCache';
import hasFeature from 'utility/hasFeature';
import LRU from 'lru-cache';

const standDownCache = LRU({
  max: 500,
  maxAge: 1000 * 15
});

const afSrcRequests = {};
const noRedirectPatterns = [
  '[?&]?afsrc=1',
  'priceline\\.com.+refid='
];

const affiliateRawPatterns = [
  'priceline\\.com.+refid=',
  '[?&]?afsrc=1',
  'rffrid=.*\\.hcom\\.us',
  'vistaprint\\.com.*psite=mkwid',
  'https?\\:\\/\\/eightsleep.*[\\?\\&]utm_medium=(?:search-paid|display|cpm|email|referral)'
];

const affiliateMatchPatterns = [
  '*://*.7eer./*',
  '*://*.evyy.net/*',
  '*://*.avantlink.com/*',
  '*://goto.orientaltrading.com/*',
  '*://goto.target.com/*',
  '*://affiliates.toysrus.com/*',
  '*://affiliates.abebooks.com/*',
  '*://affiliates.babiesrus.com/*',
  '*://linksynergy.walmart.com/*',
  '*://partners.hostgator.com/*',
  '*://partners.hotwire.com/*',
  '*://partners.jawbone.com/*',
  '*://partners.wantable.co/*',
  '*://rover.ebay.com/*',
  '*://www.pepperjamnetwork.com/*',
  '*://click.linksynergy.com/*',
  '*://shareasale.com/*',
  '*://tracking.groupon.com/*',
  '*://www.anrdoezrs.net/*',
  '*://www.awin1.com/*',
  '*://www.dpbolvw.net/*',
  '*://www.gopjn.com/*',
  '*://www.jdoqocy.com/*',
  '*://www.kqzyfj.com/*',
  '*://www.pjatr.com/*',
  '*://www.pjtra.com/*',
  '*://www.pntra.com/*',
  '*://www.pntrac.com/*',
  '*://www.pntrs.com/*',
  '*://www.qksrv.net/*',
  '*://www.shareasale.com/*',
  '*://www.tkqlhce.com/*',
  '*://commission-junction.com/*',
  '*://ftjcfx.com/*',
  '*://lduhtrp.net/*',
  '*://linksynergy.com/*',
  '*://tqlkg.com/*',
  '*://*.goto.orientaltrading.com/*',
  '*://*.goto.target.com/*',
  '*://*.affiliates.toysrus.com/*',
  '*://*.affiliates.abebooks.com/*',
  '*://*.affiliates.babiesrus.com/*',
  '*://*.linksynergy.walmart.com/*',
  '*://*.partners.hostgator.com/*',
  '*://*.partners.hotwire.com/*',
  '*://*.partners.jawbone.com/*',
  '*://*.partners.wantable.co/*',
  '*://*.rover.ebay.com/*',
  '*://*.www.pepperjamnetwork.com/*',
  '*://*.click.linksynergy.com/*',
  '*://*.shareasale.com/*',
  '*://*.tracking.groupon.com/*',
  '*://*.www.anrdoezrs.net/*',
  '*://*.www.awin1.com/*',
  '*://*.www.dpbolvw.net/*',
  '*://*.www.gopjn.com/*',
  '*://*.www.jdoqocy.com/*',
  '*://*.www.kqzyfj.com/*',
  '*://*.www.pjatr.com/*',
  '*://*.www.pjtra.com/*',
  '*://*.www.pntra.com/*',
  '*://*.www.pntrac.com/*',
  '*://*.www.pntrs.com/*',
  '*://*.www.qksrv.net/*',
  '*://*.www.shareasale.com/*',
  '*://*.www.tkqlhce.com/*',
  '*://*.commission-junction.com/*',
  '*://*.ftjcfx.com/*',
  '*://*.lduhtrp.net/*',
  '*://*.linksynergy.com/*',
  '*://*.tqlkg.com/*',
  '*://*.sjv.io/*'
];

let ignoreNextStandDown;

export function setIgnoreStandDown() {
  ignoreNextStandDown = true;
  setTimeout(() => {
    ignoreNextStandDown = null;
  }, 10000);
}

export function standDown(url, requestId, tabId) {
  const parsed = url ? Url.parse(url) : null;
  const domain = parsed ? publicSuffixList.getDomain(parsed.hostname) : null;
  if (ignoreNextStandDown) {
    return;
  }
  if (requestId === 'ebatesActivate') {
    tree.set(['couponsAffiliateDisabledSites', `${domain}_${tabId}`], moment().add(60, 'minutes').unix());
    setIgnoreStandDown();
  } else if (requestId) {
    cache.del(domain);
    if (hasFeature('ext_warn_sd')) {
      chrome.tabs.query({url: `*://*.${domain}/*`}, (tabs) => {
        _.forEach(tabs, (tab) => {
          if (tab.id !== tabId) {
            warnAboutStandDown(tab.id);
          }
        });
      });
    }
    if (!tree.get(['couponsDisabledSites', `${domain}_${tabId}`])) {
      track('standDown', {
        domain,
        source: 'unknown',
        requestId
      });
      tree.set(['couponsDisabledSites', `${domain}_${tabId}`], moment().add(60, 'minutes').unix());
    }
  } else {
    setIgnoreStandDown();
  }
}

function affiliateMonitor(patterns) {
  return (e) => {
    const requestId = e.requestId;
    if (standDownCache.has(e.tabId)) {
      standDown(e.url, requestId, e.tabId);
    }
    if (afSrcRequests[requestId] && afSrcRequests[requestId] > moment().unix()) {
      setTimeout(() => {
        delete afSrcRequests[requestId];
      }, 2000);
      standDown(e.url, requestId, e.tabId);
    }
    if (isAffiliateRequest(patterns, e.url)) {
      if (shouldStandDown(patterns, e.url)) {
        if (findMatch(noRedirectPatterns, e.url)) {
          standDownCache.set(e.tabId, true);
          standDown(e.url, requestId, e.tabId);
        } else {
          afSrcRequests[requestId] = moment().add(1, 'minutes').unix();
        }
      }

      track('affiliateRequestMatch', {
        affiliateUrl: e.url,
        requestId
      });
    }
  };
}
chrome.webRequest.onHeadersReceived.addListener(affiliateMonitor(affiliateRawPatterns), {urls: ['<all_urls>'], types: ['main_frame']}, ['responseHeaders']);
chrome.webRequest.onHeadersReceived.addListener(affiliateMonitor(['.*']), {urls: affiliateMatchPatterns, types: ['main_frame']}, ['responseHeaders']);

chrome.webRequest.onHeadersReceived.addListener((details) => {
  if (/\?afsrc=1&ha=1/.test(details.url)) {
    return {redirectUrl: 'https://www.gstatic.com/generate_204'};
  }
}, {urls: ['<all_urls>'], types: ['main_frame']}, ['blocking', 'responseHeaders']);

function isAffiliateRequest(patterns, url) {
  const match = findMatch(patterns, url);
  return match && !(/\?afsrc=1&ha=1/.test(url));
}

function shouldStandDown(patterns, url) {
  if (/groupon\.com\/.*206976/.test(url) && /wid=www\.yelp\.com|wid=www\.opentable\.com/.test(url)) {
    // Stand down to our groupon from yelp/opentable
    return true;
  }
  if (/7882476|3\*BIL10dmOI|301377|14063|1022327|d80280c4d072234ae21480685f7f99d3|c\/101044|5575322144/.test(url)) {
    // standard links
    return false;
  }
  if (/5575143053/.test(url)) {
    // Stand down to our ebay product affiliate
    return true;
  }
  return true;
}

function findMatch(patterns, target) {
  return !!_.find(patterns, (pattern) => {
    const exp = new RegExp(pattern, 'i');
    return exp.test(target);
  });
}


