// ==UserScript==
// @name         Blogger Smart View Cleaner (Silverhats Edition)
// @namespace    https://github.com/B453ZSH/
// @version      5.2
// @description  Minimal safe view manager with Silverhats !
// @match        *://*.blogspot.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
        debug: true
    };

    // ============== VIEWPORT PROTECTION ==============
    function lockViewport() {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0';
        document.head.appendChild(meta);
        if (CONFIG.debug) console.log('[Cleaner] Viewport meta added');
    }

    // ============== MOBILE ASSET REMOVER ==============
    function removeMobileAssets() {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('link[href*="mobile"], script[src*="mobile"]').forEach(el => {
                el.remove();
                if (CONFIG.debug) console.log('[Cleaner] Removed mobile asset:', el.href || el.src);
            });
        });

        observer.observe(document, {
            childList: true,
            subtree: true
        });
    }

    // ============== CREDIT FOOTER INJECTOR ==============
    function injectSilverhatsCredit() {
        const badge = document.createElement('div');
        badge.innerHTML = `<a href="https://tztrs.blogspot.com/2025/05/powered-by-silverhats-coders-clean.html" 
            style="
                display:inline-block;
                text-align:center;
                font-size:10px;
                padding:4px 10px;
                position:fixed;
                bottom:5px;
                left:50%;
                transform:translateX(-50%);
                background:linear-gradient(to right, silver, #ccc);
                color:white;
                text-shadow:0 0 2px silver;
                border-radius:6px;
                z-index:9999;
                text-decoration:none;
                font-family:sans-serif;
            ">
            Powered by Silverhats
        </a>`;
        document.body.appendChild(badge);
        if (CONFIG.debug) console.log('[Cleaner] Silverhats footer injected');
    }

    // ============== INITIALIZATION ==============
    function initialize() {
        lockViewport();
        removeMobileAssets();
        injectSilverhatsCredit();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
