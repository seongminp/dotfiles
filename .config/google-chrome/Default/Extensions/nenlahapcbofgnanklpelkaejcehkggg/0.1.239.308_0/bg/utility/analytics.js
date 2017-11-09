/* global analytics:true */
import constants from '../constants';
import UAParser from 'ua-parser-js';
import _ from 'lodash';
import publicSuffixList from 'iv-public-suffix-list';
import tree from 'state';

window.analytics.load(constants.SEGMENT_KEY);

const uaParser = new UAParser();
let priceCheckId = null;

export function track(event, data, contextData) {
  if (!_.isString(event)) {
    throw new Error('cannot log events with obj as event name');
  }
  analytics.track(
    event,
    _.merge(getBaseProperties(), data),
    _.merge(getContextProperties(), contextData)
  );
}

export function trackError(event, label) {
  analytics.track(
    'error',
    _.merge(getBaseProperties(), {name: event, label: label}),
    getContextProperties()
  );
}

export function trackClick(event, label, pageLocation, data, contextData) {
  if (typeof pageLocation === 'object') {
    contextData = data;
    data = pageLocation;
    pageLocation = null;
  }
  track(
    event,
    _.merge({label, pageLocation, category: 'click'}, data),
    contextData
  );
}

export function trackHover(event, label, pageLocation, data, contextData) {
  if (typeof pageLocation === 'object') {
    contextData = data;
    data = pageLocation;
    pageLocation = null;
  }
  track(
    event,
    _.merge({label, pageLocation, category: 'hover'}, data),
    contextData
  );
}

export function identify(userId, traits) {
  if (_.isObject(userId)) {
    traits = userId;
  }
  analytics.identify(
    userId,
    _.merge(getBaseProperties(), traits),
    getContextProperties()
  );
}

export function page(name, data, options) {
  analytics.page(
    name,
    _.merge(getBaseProperties(), data),
    getContextProperties(),
    _.merge({
      integrations: {
        'Google Analytics': false
      }
    }, options)
  );
}

export function setPriceCheckId(id) {
  priceCheckId = id;
}

function getBaseProperties() {
  const version = window.chrome && window.chrome.runtime && window.chrome.runtime.getManifest ? window.chrome.runtime.getManifest().version : null;
  const features = tree.get(['session', 'features']);
  const roles = tree.get(['session', 'roles']);
  const events = tree.get(['settings', 'events']);
  return {
    domain: publicSuffixList.getDomain(location.hostname),
    priceCheckId: priceCheckId,
    extensionVersion: version,
    features: features,
    roles: roles,
    installId: tree.get('installId'),
    profileId: tree.get('profileId'),
    hasOrdered: !!(events && events.hasOrdered)
  };
}

function getContextProperties() {
  const uaResult = uaParser.getResult();
  return {
    browser: _.get(uaResult, 'browser'),
    device: {
      model: _.get(uaResult, 'device.model'),
      type: _.get(uaResult, 'device.type'),
      manufacturer: _.get(uaResult, 'device.vendor')
    },
    locale: _.get(window, 'navigator.language'),
    os: _.get(uaResult, 'os'),
    screen: {
      width: _.get(window, 'screen.availWidth') || _.get(window, 'screen.width'),
      height: _.get(window, 'screen.availHeight') || _.get(window, 'screen.height'),
      density: window.devicePixelRatio
    },
    integrations: {
      'Google Analytics': false,
      'Google AdWords': false,
      'Facebook Audiences': false,
      'Twitter Ads': false,
      'Facebook Conversions': false,
      'Customer.io': false
    }
  };
}