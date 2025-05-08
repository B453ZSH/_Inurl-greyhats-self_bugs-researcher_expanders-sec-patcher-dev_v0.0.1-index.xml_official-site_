/* 1103820767-widgets.js please sleep */
// ==UserScript==
// @name         Block Specific Blogger Widget
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Blocks the specific Blogger widget script (1103820767-widgets.js) from loading
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Block via fetch API
    const originalFetch = window.fetch;
    window.fetch = function() {
        const url = arguments[0];
        if (typeof url === 'string' && url.includes('1103820767-widgets.js')) {
            console.log('[Blogger Widget Blocker] Blocked fetch request to:', url);
            return Promise.reject(new Error('Blocked by userscript'));
        }
        return originalFetch.apply(this, arguments);
    };

    // Block via XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        const url = arguments[1];
        if (typeof url === 'string' && url.includes('1103820767-widgets.js')) {
            console.log('[Blogger Widget Blocker] Blocked XHR request to:', url);
            this._blocked = true;
            return;
        }
        originalXHROpen.apply(this, arguments);
    };

    const originalXHRSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        if (this._blocked) {
            this.dispatchEvent(new Event('error'));
            return;
        }
        originalXHRSend.apply(this, arguments);
    };

    // Block script tag injection
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT' && 
                    node.src && 
                    (node.src.includes('1103820767-widgets.js') || 
                     node.textContent.includes('1103820767-widgets.js'))) {
                    console.log('[Blogger Widget Blocker] Removed script tag:', node.src || 'inline script');
                    node.remove();
                }
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Preemptively block if script is already in DOM at load time
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('script').forEach((script) => {
            if (script.src.includes('1103820767-widgets.js') || 
                script.textContent.includes('1103820767-widgets.js')) {
                console.log('[Blogger Widget Blocker] Removed pre-existing script tag');
                script.remove();
            }
        });
    });
})();