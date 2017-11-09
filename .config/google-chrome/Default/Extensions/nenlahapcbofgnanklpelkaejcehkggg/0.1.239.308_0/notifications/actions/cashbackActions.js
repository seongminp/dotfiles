import tree from 'state';
import dismissCashback from 'messenger/outbound/dismissCashback';
import getCashback from 'messenger/outbound/getCashback';
import completeTooltipSteps from 'messenger/outbound/completeTooltipSteps';
import activatePinnedTab from 'messenger/outbound/activatePinnedTab';
import saveCashBackNotificationSettings from 'messenger/outbound/saveCashBackNotificationSettings';
import getCashBackNotificationSettings from 'messenger/outbound/getCashBackNotificationSettings';
import moment from 'moment';
import _ from 'lodash';
import currentDomain from 'utility/currentDomain';

const cursor = tree.select('cashbackView');

export function dismiss() {
  dismissCashback();
}

export async function initCashback() {
  let cashbackResult = false;
  const cashback = await getCashback();
  if (cashback && _.get(cashback, 'reward.amount')) {
    cashbackResult = cashback;
  }
  const notificationSettings = await getCashBackNotificationSettings();
  _.set(cashback, 'user.notifications', notificationSettings);
  return cashbackResult;
}

export function setSeenNotificationTooltip(type) {
  const obj = {
    [type]: Date.now()
  };
  let events = _.cloneDeep(tree.get(['events']));
  events = _.merge(events, obj);
  tree.set(['events'], events);
  completeTooltipSteps(type);
}

export function activateThroughPinnedTab() {
  tree.set(['couponsAffiliateDisabledSites', `${currentDomain()}_${tree.get('tabId')}`], moment().add(30, 'minutes').unix());
  return activatePinnedTab({
    pageViewId: tree.get('pageViewId')
  });
}

export async function saveNotificationSettings(notificationSettings) {
  saveCashBackNotificationSettings(notificationSettings);
  cursor.merge(['user', 'notifications'], notificationSettings);
}