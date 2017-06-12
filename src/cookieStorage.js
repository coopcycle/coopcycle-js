/*
    A minimal interface to deal with cookies.

    Inspired from `cookies-js` - https://github.com/ScottHamper/Cookies
*/

function cookieStorage () {
}

cookieStorage.prototype._generateCookieString = function (key, value, opts) {
    key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
    key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
    value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
    opts = opts || {};

    var cookieString = key + '=' + value;
    cookieString += opts.expires ? ';expires=' + opts.expires.toUTCString() : '';
    cookieString += opts.secure ? ';secure' : '';

    return cookieString;
};

cookieStorage.prototype.set = function (key, value, opts) {
    var str = this._generateCookieString(key, value, opts);
    document.cookie = str;
    return document.cookie;
};

cookieStorage.prototype.get = function (key) {
    // Regexp from MDN - https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
    var re = new RegExp("(?:(?:^|.*;\\s*)" + encodeURIComponent(key) + "\\s*\\=\\s*([^;]*).*$)|^.*$/", "i");
    return decodeURIComponent(document.cookie.replace(re, "$1"));
};

export default cookieStorage;
