
window.SilverhatsProtect = function() {
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
};
