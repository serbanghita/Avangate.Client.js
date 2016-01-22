function loadScript(url, onLoad, w, d, tagName) {
  w = w || window;
  d = d || document;
  tagName = tagName || 'script';
  
  var $where = d.getElementsByTagName(tagName)[0] || document.body,
      $script = d.createElement('script');
  $script.id = 'myScript-' + Math.random();
  $script.src = chrome.extension.getURL(url);
  $script.onload = onLoad;
  $where.parentNode.insertBefore($script, $where);
}

loadScript('build/ordering.client.js', function(){
  loadScript('extension/test.js');
});
