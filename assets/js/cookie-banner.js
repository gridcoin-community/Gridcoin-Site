/* 

The MIT License (MIT)

Copyright (c) 2015 Alexandre Demode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 

*/

; // jshint ignore:line
(function (root, factory, undefined) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    // root is window
    root.CookiesEuBanner = factory();
  }
}(window, function () {
  'use strict';

  var CookiesEuBanner,
    document = window.document;

  CookiesEuBanner = function (launchFunction, waitAccept, useLocalStorage, undefined) {
    if (!(this instanceof CookiesEuBanner)) {
      return new CookiesEuBanner(launchFunction);
    }

    this.cookieTimeout = 31104000000; // 12 months in milliseconds
    this.bots = /bot|crawler|spider|crawling/i;
    this.cookieName = 'hasConsent';
    this.trackingCookiesNames = ['__utma', '__utmb', '__utmc', '__utmt', '__utmv', '__utmz', '_ga', '_gat', '_gid'];
    this.launchFunction = launchFunction;
    this.waitAccept = waitAccept || false;
    this.useLocalStorage = useLocalStorage || false;
    this.init();
  };

  CookiesEuBanner.prototype = {
    init: function () {
      // Detect if the visitor is a bot or not
      // Prevent for search engine take the cookie alert message as main content of the page
      var isBot = this.bots.test(navigator.userAgent);

      if (isBot || this.hasConsent() === false) {
        this.removeBanner(0);
        return false;
      }

      // User has already consent to use cookies to tracking
      if (this.hasConsent() === true) {
        // Launch user custom function
        this.launchFunction();
        return true;
      }

      // Check if DoNotTrack is activated
      var dnt = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
      var doNotTrack = dnt === 'yes' || dnt === 1 || dnt === '1';

      if (doNotTrack) {
        this.showBannerDnt();
      } else { 
        this.showBanner();
      }

      if (!this.waitAccept) {
        // Accept cookies by default for the next page
        this.setConsent(true);
      }
    },

    /*
     * Show cookies banner
     */
    showBanner: function () {
      var _this = this,
        getElementById = document.getElementById.bind(document),
        banner = getElementById('cookies-eu-banner'),
        rejectButton = getElementById('cookies-eu-reject'),
        acceptButton = getElementById('cookies-eu-accept'),
        moreLink = getElementById('cookies-eu-more'),
        waitRemove = (banner.dataset.waitRemove === undefined) ? 0 : parseInt(banner.dataset.waitRemove),
        // Variables for minification optimization
        addClickListener = this.addClickListener,
        removeBanners = _this.removeBanners.bind(_this, waitRemove);

      banner.style.display = 'block';

      if (moreLink) {
        addClickListener(moreLink, function () {
          _this.deleteCookie(_this.cookieName);
        });
      }

      if (acceptButton) {
        addClickListener(acceptButton, function () {
          removeBanners();
          _this.setConsent(true);
          _this.launchFunction();
        });
      }

      if (rejectButton) {
        addClickListener(rejectButton, function () {
          removeBanners();
          _this.setConsent(false);

          // Delete existing tracking cookies
          _this.trackingCookiesNames.map(_this.deleteCookie);
        });
      }
    },


    /*
     * Show informational cookies banner for Do Not Track enabled browsers
     */
    showBannerDnt: function () {
      var _this = this,
        getElementById = document.getElementById.bind(document),
        banner = getElementById('cookies-eu-banner-dnt'),
        okButton = getElementById('cookies-eu-ok'),
        waitRemove = (banner.dataset.waitRemove === undefined) ? 0 : parseInt(banner.dataset.waitRemove),
        // Variables for minification optimization
        addClickListener = this.addClickListener,
        removeBanners = _this.removeBanners.bind(_this, waitRemove);

      banner.style.display = 'block';

      if (okButton) {
        addClickListener(okButton, function () {
          removeBanners();
          _this.setConsent(false);

          // Delete existing tracking cookies
          _this.trackingCookiesNames.map(_this.deleteCookie);
        });
      }
    },

    /*
     * Set consent cookie or localStorage
     */
    setConsent: function (consent) {
      if (this.useLocalStorage) {
        return localStorage.setItem(this.cookieName, consent);
      }

      this.setCookie(this.cookieName, consent);
    },

    /*
     * Check if user already consent
     */
    hasConsent: function () {
      var cookieName = this.cookieName;
      var isCookieSetTo = function (value) {
        return document.cookie.indexOf(cookieName + '=' + value) > -1 || localStorage.getItem(cookieName) === value;
      };

      if (isCookieSetTo('true')) {
        return true;
      } else if (isCookieSetTo('false')) {
        return false;
      }

      return null;
    },

    /*
     * Create/update cookie
     */
    setCookie: function (name, value) {
      var date = new Date();
      date.setTime(date.getTime() + this.cookieTimeout);

      document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/' + ';sameSite=Lax';
    },

    /*
     * Delete cookie by changing expire
     */
    deleteCookie: function (name) {
      var hostname = document.location.hostname.replace(/^www\./, ''),
          commonSuffix = '; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';

      document.cookie = name + '=; domain=.' + hostname + commonSuffix;
      document.cookie = name + '=' + commonSuffix;
    },

    addClickListener: function (DOMElement, callback) {
      if (DOMElement.attachEvent) { // For IE 8 and earlier versions
        return DOMElement.attachEvent('onclick', callback);
      }

      // For all major browsers, except IE 8 and earlier
      DOMElement.addEventListener('click', callback);
    },

    /*
     * Delays removal of banner allowing developers
     * to specify their own transition effects
     */
    removeBanners: function (wait) {
      var banners = document.getElementsByClassName('cookies-eu-banner');
      
      for (const banner of banners) {
        this.removeBanner(banner, wait);
      }      
    },

    removeBanner: function(banner, wait) {
      if (banner) {
        banner.classList.add('cookies-eu-banner--before-remove');
        
        setTimeout (function() {
          if (banner.parentNode) {
            banner.parentNode.removeChild(banner);
          }
        }, wait);
      }
    }
  };

  return CookiesEuBanner;
}));
