// ==UserScript==
// @name         Blogger Desktop Enforcer
// @namespace    https://github.com/B453ZSH/
// @version      3.0
// @description  Permanently forces desktop view and blocks all mobile redirects/CSS
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // ================= CONFIG =================
    const CONFIG = {
        debug: true,    // Show console logs
        forceDesktop: true // Set false to allow mobile view
    };

    // ============== CORE PROTECTION ==============
    
    // 1. Block m=1 redirects in URL
    if (CONFIG.forceDesktop && /[?&]m=1(&|$)/.test(location.search)) {
        const cleanUrl = location.href.replace(/([?&])m=1(&|$)/, '$1m=0$2');
        if (CONFIG.debug) console.log('[Enforcer] Removing m=1, replacing with m=0');
        location.replace(cleanUrl);
        return;
    }

    // 2. Hijack WidgetManager before it loads
    const originalWM = window._WidgetManager;
    window._WidgetManager = {
        _Init: function() {
            if (CONFIG.debug) console.log('[Enforcer] Blocked WidgetManager mobile init');
            // Remove m=1 from all URLs in arguments
            const args = Array.from(arguments).map(arg => 
                typeof arg === 'string' ? arg.replace(/\?m=1/g, '?m=0') : arg
            );
            return originalWM?._Init.apply(this, args);
        }
    };

    // 3. Block mobile CSS
    const blockMobileCss = () => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href.includes('widget_css_mobile_bundle.css')) {
                if (CONFIG.debug) console.log('[Enforcer] Removed mobile CSS:', link.href);
                link.remove();
                
                // Inject desktop-friendly viewport
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=1024, initial-scale=1';
                document.head.appendChild(meta);
            }
        });
    };

    // 4. Prevent Blogger's mobile detection
    Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        configurable: false,
        writable: false
    });

    // =============== EXECUTION ================
    
    // Immediate action
    blockMobileCss();
    
    // Continuous protection
    const observer = new MutationObserver(blockMobileCss);
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    
    // Fallback for AJAX navigation
    setInterval(blockMobileCss, 2000);

    // Final safeguard - rewrite all links
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.href.includes('m=1')) {
            e.preventDefault();
            location.href = link.href.replace('m=1', 'm=0');
        }
    }, true);
})();
