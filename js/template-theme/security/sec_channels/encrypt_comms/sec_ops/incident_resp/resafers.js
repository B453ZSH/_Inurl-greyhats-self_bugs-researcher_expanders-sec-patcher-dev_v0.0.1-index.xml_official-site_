
(function () {
  const allowedDomains = ['tztrs.blogspot.com', 'example.com'];
  const isAllowed = allowedDomains.some(d => location.hostname.endsWith(d));
  if (!isAllowed) return;
//1 tags 2. id 3. class 4. tags <button-tags
  const protectedTargets = [
    'footerexamples',
    '#your-id-examples',
    '.cleaners-safe',
    'your-tag0examples'
  ];

  const htmlBackup = {
    'footer': `<footer class="silver-credit">by silver hats ✦ <a href="https://b453zsh.github.io/posts/post5/" target="_blank">↳ Explore our digital alchemy</a></footer>`,
    '#your-id': `<div id="your-id" class="silver-credit">by silver hats ✦ <a href="https://b453zsh.github.io/posts/post5/">↳ Restored ID</a></div>`,
    '.your-class': `<div class="your-class silver-credit">by silver hats ✦ <a href="https://b453zsh.github.io/posts/post5/">↳ Protected Class</a></div>`,
    'your-tag': `<your-tag class="silver-credit">by silver hats ✦ <a href="https://b453zsh.github.io/posts/post5/">↳ Custom Tag Secured</a></your-tag>`
  };

  const insert = (selector, html) => {
    if (!document.querySelector(selector)) {
      const wrap = document.createElement('div');
      wrap.innerHTML = html;
      document.body.appendChild(wrap.firstElementChild);
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .silver-credit {
      background: #000;
      color: yellow;
      font-style: italic;
      text-shadow: 1px 1px 3px silver;
      text-align: center;
      margin: 20px auto;
      padding: 10px;
      max-width: 90%;
      animation: blinkShadow 3s infinite;
    }
    .silver-credit a {
      color: yellow;
      border-bottom: 1px dotted silver;
      text-decoration: none;
    }
    .silver-credit a:hover {
      color: #fff;
      text-shadow: 0 0 5px #00f0ff;
    }
    @keyframes blinkShadow {
      0%, 100% { text-shadow: 1px 1px 3px silver; }
      50% { text-shadow: 0 0 10px #00ccff; }
    }
  `;
  document.head.appendChild(style);

  protectedTargets.forEach(sel => insert(sel, htmlBackup[sel]));

  new MutationObserver(() => {
    protectedTargets.forEach(sel => insert(sel, htmlBackup[sel]));
  }).observe(document.body, { childList: true, subtree: true });
})();

