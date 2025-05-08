
// Auto-clean unwanted query strings from URL bar
(function() {
  const allowedParams = ['m']; // only allow ?m=1 or ?m=0
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  // Remove all but allowed params
  let changed = false;
  for (const key of params.keys()) {
    if (!allowedParams.includes(key)) {
      params.delete(key);
      changed = true;
    }
  }

  // Replace the address bar without reloading
  if (changed) {
    const newUrl = url.origin + url.pathname + (params.toString() ? '?' + params : '');
    window.history.replaceState({}, '', newUrl);
  }
})();
