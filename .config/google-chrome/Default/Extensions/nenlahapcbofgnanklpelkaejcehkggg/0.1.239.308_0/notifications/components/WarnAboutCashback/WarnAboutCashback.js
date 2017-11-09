import React, {Component} from 'react';

class WarnAboutCashback extends Component {

  render() {
    const reward = this.props.reward;
    return (
      <div>
        <h2>oops, your credit was disabled.</h2>
        {
          reward.type === 'percentage' ?
          <h4 className="bold">reactivate <span className="green">{reward.amount/100}%</span> back</h4> :
          <h4 className="bold">reactivate <span className="green">${reward.amount/100}</span> back</h4>
        }
        <div className="button-wrapper">
          {
            this.props.activated ?
            <button className="primary-btn-large" disabled={true}>
              activated
            </button> :
            this.props.activating ?
            <button className="primary-btn-large" disabled={true}>
              activating
            </button> :
            <button className="primary-btn-large" onClick={this.props.onActivateWarn}>
              ok
            </button>
          }
        </div>
      </div>
    );
  }

}

export default WarnAboutCashback;