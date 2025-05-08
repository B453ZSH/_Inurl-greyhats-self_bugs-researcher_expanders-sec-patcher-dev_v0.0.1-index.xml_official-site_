// ==UserScript==
// @name         Blogger Clean URL Enforcer
// @namespace    https://github.com/B453ZSH/
// @version      4.0
// @description  Forces clean URLs (no m= parameters) while blocking all mobile behavior
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // ================= CONFIG =================
    const CONFIG = {
        debug: true    // Show console logs
    };

    // ============== URL CLEANER ==============
    function cleanUrl(url) {
        return url
            .replace(/([?&])m=[01]&?/g, '$1')  // Remove m=0 or m=1
            .replace(/[?&]$/, '')              // Remove trailing ? or &
            .replace(/\?&/, '?');              // Fix ?& sequences
    }

    // 1. Clean current URL if needed
    if (/[?&]m=[01]/.test(location.search)) {
        const newUrl = cleanUrl(location.href);
        if (CONFIG.debug) console.log('[Cleaner] Removing m parameter from URL');
        location.replace(newUrl);
        return;
    }

    // ============== CORE PROTECTION ==============
    
    // 2. Hijack WidgetManager before it loads
    const originalWM = window._WidgetManager;
    window._WidgetManager = {
        _Init: function() {
            if (CONFIG.debug) console.log('[Enforcer] Neutralizing WidgetManager mobile init');
            // Remove all m parameters from arguments
            const args = Array.from(arguments).map(arg => 
                typeof arg === 'string' ? cleanUrl(arg) : arg
            );
            return originalWM?._Init.apply(this, args);
        }
    };

    // 3. Block mobile CSS and scripts
    const blockMobileAssets = () => {
        // Remove mobile CSS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href.includes('widget_css_mobile_bundle.css')) {
                if (CONFIG.debug) console.log('[Enforcer] Removed mobile CSS');
                link.remove();
            }
        });

        // Block mobile scripts
        document.querySelectorAll('script').forEach(script => {
            if (script.src && script.src.includes('mobile')) {
                if (CONFIG.debug) console.log('[Enforcer] Blocked mobile script');
                script.remove();
            }
        });
    };

    // 4. Force desktop rendering
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=1024, initial-scale=1';
    document.head.appendChild(meta);

    // =============== EXECUTION ================
    
    // Immediate cleanup
    blockMobileAssets();
    
    // Continuous protection
    const observer = new MutationObserver(blockMobileAssets);
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    
    // Link rewriting for navigation
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href*="m="]');
        if (link) {
            e.preventDefault();
            location.href = cleanUrl(link.href);
        }
    }, true);

    // Final protection against Blogger's redirects
    window.addEventListener('beforeunload', e => {
        if (location.href.includes('m=')) {
            if (CONFIG.debug) console.log('[Guard] Blocking m parameter redirect');
            location.href = cleanUrl(location.href);
            e.preventDefault();
        }
    });
})();
