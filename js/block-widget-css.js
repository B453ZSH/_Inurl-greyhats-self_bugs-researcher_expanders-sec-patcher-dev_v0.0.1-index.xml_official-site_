// ==UserScript==
// @name         Blogger Widget CSS Blocker
// @version      1.4
// @match        *://*.blogspot.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const TARGET_CSS = '55013136-widget_css_bundle.css';
    
    // Block link elements
    const nativeCreate = document.createElement;
    document.createElement = function(tag) {
        const el = nativeCreate.call(this, tag);
        if (tag.toLowerCase() === 'link') {
            el.setAttribute = function(name, value) {
                if (name === 'href' && value.includes(TARGET_CSS)) return;
                return Element.prototype.setAttribute.call(this, name, value);
            };
        }
        return el;
    };

    // Remove existing
    const clean = () => {
        document.querySelectorAll(`link[href*="${TARGET_CSS}"]`).forEach(el => {
            console.log('[CSS Blocker] Removed:', el.href);
            el.remove();
        });
    };

    // Monitor DOM
    new MutationObserver(clean)
        .observe(document, {childList: true, subtree: true});
    
    clean(); // Initial run
})();