<style>
  .silverhats-signature {
    position: relative;
    width: 100%;
    text-align: center;
    margin: 30px 0 20px;
    z-index: 3;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  
  .silverhats-text {
    display: inline-block;
    font-size: 1.2rem;
    background: linear-gradient(90deg, #000000, #2d3436);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 1px rgba(255,255,255,0.3);
    position: relative;
    padding: 0 10px;
  }
  
  .silverhats-text::before {
    content: "✦";
    color: #FFD700;
    margin-right: 8px;
    font-size: 1.1em;
    animation: sparkle 2s infinite;
  }
  
  .silverhats-text::after {
    content: "✦";
    color: #FFD700;
    margin-left: 8px;
    font-size: 1.1em;
    animation: sparkle 2s infinite 0.5s;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  .silver-part {
    color: #bdc3c7;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(189, 195, 199, 0.5);
    position: relative;
    display: inline-block;
  }
  
  .silver-part::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #bdc3c7, transparent);
  }
  
  .hats-part {
    color: #f1c40f;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(241, 196, 15, 0.5);
    position: relative;
    display: inline-block;
  }
  
  .hats-part::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f1c40f, transparent);
  }
  
  .silverhats-link {
    display: block;
    margin-top: 5px;
    font-size: 0.8rem;
    color: #7f8c8d !important;
    text-decoration: none !important;
    transition: all 0.3s ease;
  }
  
  .silverhats-link:hover {
    color: #f39c12 !important;
    text-shadow: 0 0 5px rgba(243, 156, 18, 0.3);
  }
  
  .silverhats-link::before {
    content: "↳ ";
    color: #95a5a6;
  }
</style>

<div class="silverhats-signature">
  <div class="silverhats-text">
    Crafted with <span style="color:#e74c3c">❤</span> by 
    <span class="silver-part">silver</span><span class="hats-part">hats</span>
  </div>
  <a href="https://b453zsh.github.io/posts/post5/" class="silverhats-link" target="_blank">Explore our digital alchemy</a>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // ALLOWED DOMAINS (edit this list)
    const ALLOWED_DOMAINS = [
      'yourdomain.com',
      'example.com',
      'trustedsite.net'
    ];
    
    function getCurrentDomain() {
      return window.location.hostname.replace('www.', '');
    }
    
    function isDomainAllowed() {
      const currentDomain = getCurrentDomain();
      return ALLOWED_DOMAINS.some(domain => 
        currentDomain === domain || 
        currentDomain.endsWith('.' + domain)
      );
    }
    
    // Only show if NOT on allowed domain
    if (!isDomainAllowed()) {
      const signature = document.querySelector('.silverhats-signature');
      
      // Insert after copyright or at page bottom
      const copyright = document.querySelector('[class*="copyright"], [id*="copyright"]') || 
                       document.querySelector('footer') || 
                       document.body.lastElementChild;
      
      if (copyright) {
        copyright.parentNode.insertBefore(signature, copyright.nextSibling);
      } else {
        document.body.appendChild(signature);
      }
      
      signature.style.display = 'block';
    }
  });
</script>
