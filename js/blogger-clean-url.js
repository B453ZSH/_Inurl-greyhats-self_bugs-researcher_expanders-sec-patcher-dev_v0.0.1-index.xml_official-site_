// ==UserScript==
// @name         Blogger Smart View Manager
// @namespace    https://github.com/B453ZSH/
// @version      5.0
// @description  Prevents refresh loops while handling view mode changes
// @match        *://*.blogspot.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    
    const CONFIG = {
        debug: true,
        SESSION_KEY: 'bloggerViewState'
    };

    // ============== SESSION MANAGEMENT ==============
    function getViewState() {
        return GM_getValue(CONFIG.SESSION_KEY, {
            userChoice: null,
            lastUrl: null
        });
    }

    function saveViewState(state) {
        GM_setValue(CONFIG.SESSION_KEY, state);
    }

    // ============== INTELLIGENT URL CLEANING ==============
    function handleUrl() {
        const currentUrl = new URL(location.href);
        const viewState = getViewState();
        
        // Detect explicit user navigation
        const isUserNavigation = performance.navigation.type === 0 || 
                               document.referrer !== '';
        
        // Clean URL only if not fresh user choice
        if (currentUrl.searchParams.has('m') && !isUserNavigation) {
            currentUrl.searchParams.delete('m');
            history.replaceState(null, '', currentUrl.toString());
            if (CONFIG.debug) console.log('[Manager] Cleaned automatic m parameter');
        }
    }

    // ============== VIEWPORT PROTECTION ==============
    function lockViewport() {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, minimum-scale=1.0';
        document.head.appendChild(meta);
    }

    // ============== CORE PROTECTION ==============
    function initialize() {
        // 1. Initial cleanup
        handleUrl();
        
        // 2. Viewport stabilization
        lockViewport();
        
        // 3. Mobile asset blocking
        const observer = new MutationObserver(() => {
            document.querySelectorAll('link[href*="mobile"], script[src*="mobile"]').forEach(el => {
                el.remove();
                if (CONFIG.debug) console.log('[Manager] Removed mobile asset:', el.href || el.src);
            });
        });
        
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        
        // 4. Navigation protection
        window.addEventListener('beforeunload', e => {
            if (location.href.includes('m=')) {
                if (CONFIG.debug) console.log('[Manager] Blocking parameterized redirect');
                e.preventDefault();
                return false;
            }
        });
    }

    // ============== INITIALIZATION ==============
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
