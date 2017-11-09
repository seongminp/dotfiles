import React, {Component} from 'react';
import {branch} from 'higher-order/baobab';
import Loader from 'components/Loader';
import CouponsBlock from './components/CouponsBlock';
import CashBackBlock from './components/CashBackBlock';
import ProductOffer from './components/ProductOffer';
import AddToWatchlist from './components/AddToWatchlist';
import Personalization from './components/Personalization';
import _ from 'lodash';
import {activateThroughPinnedTab} from 'actions/cashbackActions';
import * as actions from 'actions/notificationActions';
import sendMetric from 'utility/sendMetric';
import AmazonSearch from 'components/AmazonSearch';
import {WIKIBUY_URL} from 'constants';
import {tryCoupons} from 'actions/offersActions';
import isFullAccount from 'utility/isFullAccount';
import './offers.less';

class Offers extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    actions.getPersonalizedData();
  }

  componentDidMount() {
    sendMetric('page', 'sitehubOffers', {
      view: 'sitehubOffers',
      type: 'notification',
      domain: location.hostname.replace(/^www\./, ''),
      pagePath: location.pathname
    });
    if (this.props.communityDeal && !this.props.priceHistory) {
      const asin = _.get(this.props, 'communityDeal.asin');
      actions.loadPriceHistory(asin);
    }
  }

  render() {
    const storeName = _.get(this.props.offers, 'cashback.vendor');
    const coupons = _.get(this.props.offers, 'coupons.coupons');
    const couponsType = _.get(this.props.offers, 'coupons.type');
    const couponsThrottled = _.get(this.props.offers, 'coupons.couponsThrottled');
    const reward = _.get(this.props.offers, 'cashback.reward');
    const hasPersonalization = storeName !== 'eBay' && !reward && !_.get(coupons, 'length');
    return (
      <div className={`wb-Offers ${hasPersonalization ? '' : 'no-personalization'}`}>
        {
          storeName !== 'eBay' ?
          <div className="search-amazon-site-hub">
            <AmazonSearch newTab={true} autoFocus={false} pageLocation="siteHub"/>
          </div> : null
        }
        {
          _.get(this.props, 'offers.$isLoading') ?
          <Loader color="#adb9bf"/> : null
        }
        {
          this.props.communityDeal ?
          <AddToWatchlist communityDeal={this.props.communityDeal}/> : null
        }
        {
          reward ?
          <CashBackBlock
            reward={reward}
            cashback={_.get(this.props.offers, 'cashback')}
            storeName={storeName}
            sessionEmail={_.get(this.props, 'session.email')}
            activated={this.state.activated || _.get(this.props.offers, 'cashback.user.activated')}
            activating={this.state.activating}
            onActivate={this.onActivate.bind(this)}/> : null
        }
        {
          coupons && coupons.length ?
          <CouponsBlock
            coupons={coupons}
            couponsType={couponsType}
            couponsThrottled={couponsThrottled}
            storeName={storeName}
            onTryCodes={this.onTryCodes.bind(this)}/> : null
        }
        <ProductOffer
          notification={this.props.notification}
          communityDeal={this.props.communityDeal}
          priceHistory={this.props.priceHistory}
          onClickDeal={this.onClickDeal.bind(this)}
          onVisitMerchant={this.onVisitMerchant.bind(this)}/>
        {
          hasPersonalization && this.props.personalizedData ?
          <Personalization personalizedData={this.props.personalizedData}/> : null
        }
      </div>
    );
  }

  onClickDeal(deal, e) {
    const isMainDeal = _.get(this.props, 'communityDeal.id') === deal.id;
    this.viewProductPage(deal, isMainDeal ? 'deal' : 'dealList', e);
  }

  onVisitMerchant(result, e) {
    this.viewProductPage(this.props.communityDeal, 'button', e);
  }

  onMoreInfo(e) {
    this.viewProductPage(this.props.communityDeal, 'more info', e);
  }

  onClosePopup(label, e) {
    if (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    this.setState({hideNotification: true});
    sendMetric('trackClick', 'dismissSavingsNotification', label, {
      domain: location.hostname.replace(/^www\./, ''),
      pagePath: location.pathname,
      cashback: !!_.get(this.props, 'cashbackView.reward')
    });
  }

  viewProductPage(deal, type, e) {
    if (e && e.isPropagationStopped) {
      return;
    }
    e.stopPropagation();
    sendMetric('trackClick', 'viewProductPage', '', {
      view: 'quoteCompleteNotification',
      domain: location.hostname.replace(/^www\./, ''),
      pagePath: location.pathname,
      savings: _.get(deal, 'savings'),
      pageLocation: 'sitehub',
      type,
      productId: _.get(deal, 'id'),
      productUrl: _.get(deal, 'url')
    });
    if (type === 'dealList') {
      window.open(`${WIKIBUY_URL}${deal.url}`);
    } else if (_.get(this.props, 'notification.cartPricing.savings')) {
      window.open(`${WIKIBUY_URL}${deal.url}?run=${_.get(this.props, 'notification.run.id')}`);
    } else {
      window.open(`${WIKIBUY_URL}${deal.url}?run=${_.get(deal, 'runId')}`);
    }
  }

  async onActivate() {
    const reward = _.get(this.props.view, 'reward', {});
    this.setState({activating: true});
    sendMetric('trackClick', 'activateCashback', 'activate', {
      domain: location.hostname.replace(/^www\./, ''),
      pagePath: location.pathname,
      rewardAmount: reward.amount,
      rewardDisplay: reward.type,
      pageLocation: 'sitehub'
    });
    await activateThroughPinnedTab();
    if (isFullAccount()) {
      this.setState({activated: true});
    } else {
      this.setState({activating: false});
    }
  }

  async onTryCodes() {
    tryCoupons();
  }

}

export default branch({
  offers: ['offers'],
  view: ['siteHubView'],
  deal: ['siteHubView', 'primaryDeal'],
  offerHistory: ['siteHubView', 'offerHistory'],
  personalizedData: ['siteHubView', 'personalizedData'],
  communityDeal: ['notification', 'communityDeal', 'deal'],
  cart: ['ProductPage', 'cart'],
  productPage: ['ProductPage'],
  notification: ['notification'],
  priceHistory: ['ProductPage', 'priceHistory'],
  session: ['session']
}, Offers);
