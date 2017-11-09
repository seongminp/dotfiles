import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {autoComplete} from 'actions/newTabActions';
import sendMetric from 'utility/sendMetric';
import hasFeature from 'utility/hasFeature';
import './amazon-search.less';

class AmazonSearch extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };

    this.lastRequestId = null;
    this.closeSuggestions = (e) => {
      setTimeout(() => {
        if (!e.isPropagationStopped) {
          this.setState({showSuggestions: false});
        }
      }, 100);
    };
    document.addEventListener('click', this.closeSuggestions);
  }

  componentWillMount() {
    if (this.props.autoFocus) {
      this.setState({showSuggestions: true});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeSuggestions);
  }

  async loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    const suggestions = await autoComplete(value);
    this.setState({
      isLoading: false,
      suggestions: suggestions ? suggestions : this.state.suggestions
    });
  }

  onChange(event, {newValue}) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested({value}) {
    this.loadSuggestions(value);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const {value, suggestions, isLoading} = this.state;
    const inputProps = {
      type: 'search',
      placeholder: 'Search Products',
      value,
      onChange: this.onChange.bind(this)
    };
    return (
      <div className="amazon-search">
        <form onSubmit={this.onSubmitSearch.bind(this)}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            getSuggestionValue={(s) => s}
            renderSuggestion={(s) => <span onClick={(e) => this.onClickResult(e, {suggestionValue: s})}><span className="suggestion">{s}</span> <span className="select-arrrow">→</span></span>}
            onSuggestionSelected={this.onClickResult.bind(this)}
            inputProps={inputProps}
            renderInputComponent={this.renderInputComponent.bind(this)}
            alwaysRenderSuggestions={!!(suggestions && suggestions.length && this.state.showSuggestions && value.length)} />
        </form>
        <div className="icon-search"></div>
      </div>
    );
  }

  onClickResult(e, {suggestionValue}) {
    e.stopPropagation();
    sendMetric('trackClick', 'searchWikibuy', 'keep', {
      domain: location.hostname.replace(/^www\./, ''),
      pagePath: location.pathname,
      pageLocation: this.props.pageLocation || 'newTab',
      term: suggestionValue,
      suggestion: true
    });
    this.navigateSearch(suggestionValue);
  }

  onSubmitSearch(e) {
    e.preventDefault();
    const term = e.target.value;
    if (term && term.length) {
      sendMetric('trackClick', 'searchWikibuy', 'keep', {
        domain: location.hostname.replace(/^www\./, ''),
        pagePath: location.pathname,
        pageLocation: this.props.pageLocation || 'newTab',
        term,
        suggestion: false
      });
      this.navigateSearch(term);
    }
  }

  navigateSearch(term) {
    const url = `https://wikibuy.com/search?q=${encodeURIComponent(btoa(JSON.stringify({match: term})))}`;
    if (this.props.newTab) {
      window.open(url, '_blank');
    } else {
      location.href = url;
    }
  }

  renderInputComponent(inputProps) {
    const {onChange, ...props} = inputProps;
    return (
      <input {...props}
        onClick={(e) => {
          e.stopPropagation();
          this.setState({showSuggestions: true});
        }}
        onChange={(e) => {
          const target = e.path && e.path.length ? e.path[0] : e.currentTarget;
          e.target.value = target.value;
          onChange(e);
        }} autoFocus={this.props.autoFocus}/>
    )
  }
}

export default AmazonSearch;
