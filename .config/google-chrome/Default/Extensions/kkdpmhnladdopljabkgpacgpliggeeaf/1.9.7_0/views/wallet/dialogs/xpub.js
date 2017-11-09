if (!window.JST) {
  window.JST = {};
}
window.JST["wallet/dialogs/xpub"] = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<section id="dialogs_xpub_dialog">\n  <header>\n    <h1>');
    
      __out.push(__sanitize(t('wallet.dialogs.xpub.extended_public_key')));
    
      __out.push('</h1>\n  </header>\n  <div id="code_container" class="regular-code-text selectable">coucou</div>\n  <div id="qrcode_container"></div>\n  <div class="regular-grey-text-small">');
    
      __out.push(__sanitize(t('wallet.dialogs.xpub.qrcode')));
    
      __out.push('</div>\n</section>\n<div class="dialog-actions-bar">\n  <a href="#email" class="action-rounded-button">');
    
      __out.push(__sanitize(t('common.send_by_email')));
    
      __out.push('</a>\n  <a href="#print" class="action-rounded-button">');
    
      __out.push(__sanitize(t('common.print')));
    
      __out.push('</a>\n  <div class="left-spacer"></div>\n  <a href="#dismiss" class="cancel-rounded-button">');
    
      __out.push(__sanitize(t('common.close')));
    
      __out.push('</a>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
};
