// ==UserScript==
// @name         Blogger URL Cleaner
// @namespace    https://github.com/B453ZSH/
// @version      4.1
// @description  Removes all m= parameters while preventing mobile redirects
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    const CONFIG = {
        debug: true    // Show console logs
    };

    // ============== URL CLEANER ==============
    function cleanUrl(url) {
        const cleaned = url
            .replace(/([?&])m=[01]&?/g, '$1')  // Remove m=0 or m=1
            .replace(/[?&]$/, '')               // Remove trailing ? or &
            .replace(/\?&/, '?');               // Fix ?& sequences
        
        if (url !== cleaned && CONFIG.debug) {
            console.log('[Cleaner] Removed m parameter from URL');
        }
        return cleaned;
    }

    // 1. Clean current URL if needed
    if (/[?&]m=[01]/.test(location.search)) {
        history.replaceState(null, '', cleanUrl(location.href));
    }

    // ============== CORE PROTECTION ==============
    
    // 2. Neutralize WidgetManager's mobile forcing
    const originalWM = window._WidgetManager;
    window._WidgetManager = {
        _Init: function() {
            if (CONFIG.debug) console.log('[Neutralizer] Blocking mobile parameter injection');
            // Clean all URLs in arguments
            const args = Array.from(arguments).map(arg => 
                typeof arg === 'string' ? cleanUrl(arg) : arg
            );
            return originalWM?._Init.apply(this, args);
        }
    };

    // 3. Block automatic mobile redirects
    window.addEventListener('beforeunload', e => {
        if (location.href.includes('m=')) {
            if (CONFIG.debug) console.log('[Guard] Blocking m parameter redirect');
            history.replaceState(null, '', cleanUrl(location.href));
            e.preventDefault();
        }
    });

    // 4. Clean all links on click
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href*="m="]');
        if (link) {
            e.preventDefault();
            location.href = cleanUrl(link.href);
        }
    }, true);

    // 5. Monitor for dynamic URL changes
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (/[?&]m=[01]/.test(location.search)) {
                history.replaceState(null, '', cleanUrl(location.href));
            }
        }
    }, 500);
})();
