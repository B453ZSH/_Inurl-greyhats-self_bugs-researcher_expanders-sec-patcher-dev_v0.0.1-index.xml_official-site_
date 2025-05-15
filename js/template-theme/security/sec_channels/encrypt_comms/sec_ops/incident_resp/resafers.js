(function() {
  const allowedDomains = [
    'example.com',
    'example2.blogspot.com'
    // Add more domains as needed
  ];

  const currentDomain = location.hostname;
  const isAllowed = allowedDomains.some(domain => currentDomain.endsWith(domain));

  if (!isAllowed) {
    console.warn("Domain not authorized for this script. Execution stopped.");
    return;
  }

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    footer, head, main, credit, copy {
      background: #000 !important;
      color: yellow !important;
      font-style: italic;
      text-shadow: 1px 1px 3px silver;
      display: block;
      padding: 10px;
    }
    .silver-credit {
      font-style: italic;
      color: yellow;
      text-shadow: 1px 1px 3px silver;
      animation: waterPulse 3s ease-in-out infinite;
    }
    .silver-credit a {
      color: yellow;
      text-decoration: none;
      border-bottom: 1px dotted silver;
    }
    .silver-credit a:hover {
      color: #fff;
      text-shadow: 0 0 5px #00f0ff;
    }
    @keyframes waterPulse {
      0%, 100% { text-shadow: 1px 1px 3px silver; }
      50% { text-shadow: 0 0 10px #00ccff; }
    }
  `;
  document.head.appendChild(style);

  // Credit text
  const div = document.createElement('div');
  div.className = 'silver-credit';
  div.innerHTML = `
    by silver hats ✦blick animate waters;cool effect symbol<br>
    <a href="https://b453zsh.github.io/posts/post5/" target="_blank" rel="noopener">
    ↳ Explore our digital alchemy</a>
  `;
  document.body.appendChild(div);

  // Script protection
  const scriptSelector = 'script.cleaners-safe';
  const observer = new MutationObserver(() => {
    if (!document.querySelector(scriptSelector)) {
      alert("Protected script removed! Guarded by silver hats ✦");
      // Optionally redirect or take action:
      // window.location.href = "https://b453zsh.github.io/";
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
