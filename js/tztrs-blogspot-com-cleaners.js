// i love everything if clean :)
(function(){
  const u=new URL(location.href),
        allowed=[], // allow ?m if needed, e.g., ['m']
        p=u.searchParams;
  let update = false;

  // Clean unwanted query parameters
  for(const k of Array.from(p.keys())) {
    if (!allowed.includes(k)) {
      p.delete(k); update = true;
    }
  }

  // Normalize double slashes (except protocol)
  if(u.pathname.includes('//')) {
    u.pathname = u.pathname.replace(/\/{2,}/g, '/'); update = true;
  }

  // Remove trailing slash (except home)
  if(u.pathname.length > 1 && u.pathname.endsWith('/')) {
    u.pathname = u.pathname.slice(0, -1); update = true;
  }

  // Remove index.html
  if(u.pathname.endsWith('/index.html') || u.pathname === '/index.html') {
    u.pathname = u.pathname.replace('/index.html',''); update = true;
  }

  // Enforce HTTPS (optional, uncomment if needed)
  // if(location.protocol !== 'https:') location.replace('https:' + location.href.substring(location.protocol.length));

  // Update URL if needed
  if(update){
    const clean = u.origin + u.pathname + (p.toString() ? '?' + p : '');
    history.replaceState({}, '', clean);
  }
})();
