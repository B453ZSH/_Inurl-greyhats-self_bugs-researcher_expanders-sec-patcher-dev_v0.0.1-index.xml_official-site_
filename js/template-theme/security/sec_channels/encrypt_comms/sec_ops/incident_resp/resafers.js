(function() {
  // 1. Allowed domains (editable)
  const allowedDomains = [
    'tztrs.blogspot.com'
    // Add more like 'yourdomain.com', 'another.blogspot.com'
  ];

  const currentDomain = location.hostname;
  const isAllowed = allowedDomains.some(domain => currentDomain.endsWith(domain));
  if (!isAllowed) return;

  // 2. Targeted script classes to protect
  const protectedClasses = ['cleaners-safe'];

  // 3. Observe DOM for protection
  const observer = new MutationObserver(() => {
    for (const cls of protectedClasses) {
      if (!document.querySelector(`script.${cls}`)) {
        injectCredit();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    for (const cls of protectedClasses) {
      if (!document.querySelector(`script.${cls}`)) {
        injectCredit();
      }
    }
  }, 3000);

  // 4. Inject dark minimal beautiful theme & credit note
  function injectCredit() {
    const style = document.createElement('style');
    style.textContent = `
      footer, main, .credit, .copy {
        background: #000 !important;
        color: yellow !important;
        font-style: italic;
        text-shadow: 1px 1px 3px silver;
        padding: 10px;
        display: block;
      }
      .silver-credit {
        font-style: italic;
        color: yellow;
        text-align: center;
        text-shadow: 1px 1px 3px silver;
        animation: blinkSlow 1.5s infinite;
        margin: 40px 10px;
        font-size: 1em;
      }
      .silver-credit a {
        color: yellow;
        text-decoration: none;
        border-bottom: 1px dashed silver;
      }
      .silver-credit a:hover {
        color: white;
        text-shadow: 0 0 5px #00f0ff;
      }
      @keyframes blinkSlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);

    const div = document.createElement('div');
    div.className = 'silver-credit';
    div.innerHTML = `
      by silver hats ✦ blick animate waters — cool effect symbol<br>
      <a href="https://b453zsh.github.io/posts/post5/" target="_blank" rel="noopener">
      ↳ Explore our digital alchemy</a>
    `;
    document.body.appendChild(div);
  }
})();
