// ==UserScript==
// @name         Blogger Widget Script Blocker
// @version      1.4
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const TARGET_SCRIPT = '1103820767-widgets.js';

    // Block fetch
    if (window.fetch) {
        const nativeFetch = window.fetch;
        window.fetch = async function(input, init) {
            if (typeof input === 'string' && input.includes(TARGET_SCRIPT)) {
                console.warn('[Script Blocker] Blocked fetch:', input);
                throw new Error('Blocked by script');
            }
            return nativeFetch(input, init);
        };
    }

    // Block XHR
    const nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        if (arguments[1]?.includes(TARGET_SCRIPT)) {
            console.warn('[Script Blocker] Blocked XHR:', arguments[1]);
            this._blocked = true;
            return;
        }
        nativeOpen.apply(this, arguments);
    };

    // Block script tags
    new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(n => {
                if (n.tagName === 'SCRIPT' && 
                   (n.src?.includes(TARGET_SCRIPT) || n.textContent?.includes(TARGET_SCRIPT))) {
                    console.warn('[Script Blocker] Removed:', n.src || 'inline');
                    n.remove();
                }
            });
        });
    }).observe(document, {childList: true, subtree: true});
})();