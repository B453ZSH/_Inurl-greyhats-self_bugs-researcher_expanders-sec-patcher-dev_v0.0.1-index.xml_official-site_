// ==UserScript==
// @name         Blogger Mobile CSS Blocker
// @version      1.4
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const TARGET_CSS = '1437498933-widget_css_mobile_bundle.css';
    const FALLBACK_STYLE = `
        /* Mobile CSS Replacement */
        body { opacity: 1 !important; }
    `;

    // Block dynamic loading
    document.createElement = new Proxy(document.createElement, {
        apply(target, thisArg, args) {
            const el = Reflect.apply(target, thisArg, args);
            if (args[0]?.toLowerCase() === 'link') {
                el.setAttribute = function(name, value) {
                    if (name === 'href' && value.includes(TARGET_CSS)) {
                        const style = document.createElement('style');
                        style.textContent = FALLBACK_STYLE;
                        document.head.appendChild(style);
                        return;
                    }
                    return Element.prototype.setAttribute.call(this, name, value);
                };
            }
            return el;
        }
    });

    // Clean existing
    const observer = new MutationObserver(() => {
        document.querySelectorAll(`link[href*="${TARGET_CSS}"]`).forEach(el => {
            console.log('[Mobile Blocker] Removed:', el.href);
            el.remove();
            document.head.insertAdjacentHTML('beforeend', `<style>${FALLBACK_STYLE}</style>`);
        });
    });
    
    observer.observe(document, {childList: true, subtree: true});
})();