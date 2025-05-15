
document.addEventListener('DOMContentLoaded',function(){
  const a=['yourdomain.com','example.com','trustedsite.net'];
  function b(){return window.location.hostname.replace('www.','')}
  function c(){const d=b();return a.some(e=>d===e||d.endsWith('.'+e))}
  if(!c()){
    const f=document.createElement('div');
    f.innerHTML=`
    <div style="position:relative;width:100%;text-align:center;margin:30px 0 20px;z-index:3;font-family:'Trebuchet MS','Lucida Sans Unicode','Lucida Grande','Lucida Sans',Arial,sans-serif">
      <div style="display:inline-block;font-size:1.2rem;background:linear-gradient(90deg,#000,#2d3436);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 1px rgba(255,255,255,0.3);position:relative;padding:0 10px">
        <span style="color:#FFD700;margin-right:8px;font-size:1.1em;animation:g 2s infinite">✦</span>
        Crafted with <span style="color:#e74c3c">❤</span> by 
        <span style="color:#bdc3c7;font-weight:bold;text-shadow:0 0 3px rgba(189,195,199,0.5);position:relative;display:inline-block">silver</span>
        <span style="color:#f1c40f;font-weight:bold;text-shadow:0 0 3px rgba(241,196,15,0.5);position:relative;display:inline-block">hats</span>
        <span style="color:#FFD700;margin-left:8px;font-size:1.1em;animation:g 2s infinite 0.5s">✦</span>
      </div>
      <a href="https://b453zsh.github.io/posts/post5/" style="display:block;margin-top:5px;font-size:0.8rem;color:#7f8c8d!important;text-decoration:none!important;transition:all 0.3s ease" target="_blank">↳ Explore our digital alchemy</a>
    </div>
    <style>@keyframes g{0%,100%{opacity:0.3}50%{opacity:1;transform:scale(1.2)}}</style>`;
    
    const g=document.querySelector('[class*="copyright"],[id*="copyright"]')||document.querySelector('footer')||document.body.lastElementChild;
    g?g.parentNode.insertBefore(f,g.nextSibling):document.body.appendChild(f);
  }
});
