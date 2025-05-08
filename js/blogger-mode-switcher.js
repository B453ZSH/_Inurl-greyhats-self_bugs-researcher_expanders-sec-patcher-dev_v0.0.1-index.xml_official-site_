// ==UserScript==
// @name         Blogger View Mode Enforcer
// @namespace    https://github.com/B453ZSH/
// @version      2.0
// @description  FULL control over m=1/m=0 with automatic dysfunction of responsive elements
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        /* CHOOSE ONE MODE: */
        mode: 'auto', // 'auto'|'desktop'|'mobile'
        
        /* ADVANCED OPTIONS: */
        killRedirects: true,   // Stop Blogger's automatic m=1 redirects
        forceViewport: true,   // Override responsive viewport
        debug: true           // Show console logs
    };

    // =============== CORE FUNCTIONALITY ==============
    function enforceViewMode() {
        const url = new URL(window.location.href);
        let shouldReload = false;

        // Mode detection logic
        const isMobileView = url.searchParams.get('m') === '1';
        const isDesktopView = url.searchParams.get('m') === '0';
        const isAutoView = !isMobileView && !isDesktopView;

        // Apply selected mode
        switch(CONFIG.mode) {
            case 'desktop':
                if (isMobileView || isAutoView) {
                    url.searchParams.set('m', '0');
                    shouldReload = true;
                    if (CONFIG.debug) console.log('[Mode Enforcer] Forcing DESKTOP view (m=0)');
                }
                break;
                
            case 'mobile':
                if (isDesktopView || isAutoView) {
                    url.searchParams.set('m', '1');
                    shouldReload = true;
                    if (CONFIG.debug) console.log('[Mode Enforcer] Forcing MOBILE view (m=1)');
                }
                break;
                
            case 'auto':
                if (isMobileView || isDesktopView) {
                    url.searchParams.delete('m');
                    shouldReload = true;
                    if (CONFIG.debug) console.log('[Mode Enforcer] Restoring AUTO view (m=null)');
                }
                break;
        }

        // Apply changes if needed
        if (shouldReload && !url.href.includes(window.location.href)) {
            if (CONFIG.debug) console.log('[Mode Enforcer] Reloading with new mode:', url.toString());
            window.location.replace(url.toString());
        }
    }

    // ========== RESPONSIVE ELEMENT DISABLER ==========
    function disableResponsiveFeatures() {
        // 1. Stop Blogger's mobile redirects
        if (CONFIG.killRedirects) {
            window.addEventListener('beforeunload', function(e) {
                if (window.location.href.includes('m=1')) {
                    if (CONFIG.debug) console.log('[Redirect Blocker] Stopping mobile redirect');
                    e.preventDefault();
                    return (e.returnValue = '');
                }
            }, {capture: true});
        }

        // 2. Block responsive CSS
        const responsiveCss = [
            'widget_css_mobile_bundle.css',
            'responsive.css',
            'mobile.css'
        ];
        
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (responsiveCss.some(css => link.href.includes(css))) {
                link.remove();
                if (CONFIG.debug) console.log('[CSS Blocker] Removed responsive CSS:', link.href);
            }
        });

        // 3. Override viewport meta
        if (CONFIG.forceViewport) {
            const viewportContent = CONFIG.mode === 'desktop' 
                ? 'width=1280, initial-scale=1.0' 
                : 'width=device-width, initial-scale=1.0';
            
            let meta = document.querySelector('meta[name="viewport"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'viewport';
                document.head.appendChild(meta);
            }
            meta.content = viewportContent;
            if (CONFIG.debug) console.log('[Viewport] Set to:', viewportContent);
        }

        // 4. Block adaptive scripts
        const adaptiveScripts = [
            'blogger.js',
            'responsive_scripts',
            'mobile-widget',
            'device-detection'
        ];
        
        document.querySelectorAll('script').forEach(script => {
            if (script.src && adaptiveScripts.some(s => script.src.includes(s))) {
                script.remove();
                if (CONFIG.debug) console.log('[Script Blocker] Removed adaptive script:', script.src);
            }
        });
    }

    // ================ EXECUTION FLOW =================
    (function init() {
        // First-run mode enforcement
        enforceViewMode();
        
        // Continuous protection
        document.addEventListener('DOMContentLoaded', disableResponsiveFeatures);
        new MutationObserver(disableResponsiveFeatures)
            .observe(document, {childList: true, subtree: true});
        
        // Periodic check for SPA changes
        setInterval(() => {
            if (document.querySelector('link[href*="mobile"]') || 
                document.querySelector('script[src*="responsive"]')) {
                disableResponsiveFeatures();
            }
        }, 3000);
    })();
})();