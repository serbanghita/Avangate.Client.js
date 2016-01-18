function loadScript(url, w, d, tagName) {
  w = w || window;
  d = d || document;
  tagName = tagName || 'script';
  
  var $where = d.getElementsByTagName(tagName)[0] || document.body,
      $script = d.createElement('script');
  $script.id = 'myScript-' + Math.random();
  $script.src = chrome.extension.getURL(url);
  $where.parentNode.insertBefore($script, $where);
}

loadScript('build/ordering.client.js');
loadScript('extension/test.js');