/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js"
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js"
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "../node_modules/html-loader/dist/runtime/getUrl.js"
/*!**********************************************************!*\
  !*** ../node_modules/html-loader/dist/runtime/getUrl.js ***!
  \**********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ },

/***/ "./js/main.js"
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
() {

var navbar = document.querySelector(".navbar");
var navLinks = Array.from(document.querySelectorAll(".navbar .nav-link"));
var sections = Array.from(document.querySelectorAll("#home, #about, #projects, #contact"));

// Update both navbar size and the current-section marker.
function updateNavigation() {
  navbar.classList.toggle("compact", window.scrollY > 30);
  var atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  var currentSection = sections[0].id;
  var markerPosition = navbar.offsetHeight + 2;
  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= markerPosition) {
      currentSection = section.id;
    }
  });

  // The last link must stay active at the very bottom of the page.
  if (atPageBottom) {
    currentSection = sections[sections.length - 1].id;
  }
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#".concat(currentSection));
  });
}

// Scroll by hand so the fixed navbar never covers a heading.
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    var targetId = link.getAttribute("href");
    if (targetId === "#") {
      event.preventDefault();
      return;
    }
    var target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({
      top: top,
      behavior: "smooth"
    });
  });
});
window.addEventListener("scroll", updateNavigation, {
  passive: true
});
window.addEventListener("resize", updateNavigation);
updateNavigation();
var track = document.querySelector(".carousel-track");
var slides = Array.from(document.querySelectorAll(".project-slide"));
var previousButton = document.querySelector(".carousel-button.previous");
var nextButton = document.querySelector(".carousel-button.next");
var slideCount = document.querySelector(".slide-count");
var currentSlide = 0;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = "translateX(-".concat(currentSlide * 100, "%)");
  slideCount.textContent = "".concat(String(currentSlide + 1).padStart(2, "0"), " / ").concat(String(slides.length).padStart(2, "0"));
  slides.forEach(function (slide, slideIndex) {
    slide.setAttribute("aria-hidden", slideIndex !== currentSlide);
  });
}
previousButton.addEventListener("click", function () {
  return showSlide(currentSlide - 1);
});
nextButton.addEventListener("click", function () {
  return showSlide(currentSlide + 1);
});
var modalOpenButtons = document.querySelectorAll(".modal-open");
var modals = document.querySelectorAll(".modal");
var lastFocusedElement = null;
function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-opened");
  modal.querySelector(".modal-close").focus();
}
function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-opened");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}
modalOpenButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var modal = document.getElementById(button.dataset.modal);
    openModal(modal);
  });
});
modals.forEach(function (modal) {
  modal.querySelector(".modal-close").addEventListener("click", function () {
    return closeModal(modal);
  });
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    var openModalElement = document.querySelector(".modal:not([hidden])");
    if (openModalElement) closeModal(openModalElement);
  }
});
document.getElementById("current-year").textContent = new Date().getFullYear();

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss"
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss ***!
  \*************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/image.jpg */ "./assets/image.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/github.svg */ "./assets/github.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/linkedin.svg */ "./assets/linkedin.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #222222;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

body.modal-opened {
  overflow: hidden;
}

button,
a {
  font: inherit;
}

/* Sticky navbar that gets smaller after scrolling. */
.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 80px;
  background: white;
  border-bottom: 1px solid #999999;
  transition: height 0.2s;
}

.navbar.compact {
  height: 55px;
}

.navbar.compact .nav-links a {
  font-size: 13px;
}

.nav-content,
.footer-content {
  width: calc(100% - 40px);
  max-width: 1000px;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #2463a9;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  height: 100%;
  display: flex;
}

.nav-links a {
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: #222222;
  text-decoration: none;
  transition: font-size 0.2s;
}

/* This is the reading-position indicator. */
.nav-links a.active {
  color: white;
  background: #2463a9;
}

.section-content,
.hero-content,
.break-content,
.contact-content {
  width: calc(100% - 40px);
  max-width: 1000px;
  margin: auto;
}

section {
  padding: 70px 0;
}

h1 {
  font-size: 60px;
  animation: appear 0.8s;
}

h2 {
  font-size: 36px;
}

.eyebrow,
.project-type {
  color: #2463a9;
  font-weight: bold;
}

/* This element stays vertically centered. */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  background: #eeeeee;
}

.hero-copy {
  max-width: 550px;
}

/* Simple three-column content. */
.about-intro {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
}

.profile-photo {
  width: 180px;
  height: 180px;
  -o-object-fit: cover;
     object-fit: cover;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.info-card {
  padding: 15px;
  background: #eeeeee;
  border: 1px solid #999999;
}

/* Basic carousel. */
.projects,
.media-section {
  background: #eeeeee;
}

.carousel {
  display: grid;
  grid-template-columns: 45px minmax(0, 1fr) 45px;
  align-items: center;
  gap: 10px;
}

.carousel-window {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s;
}

.project-slide {
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 25px;
  padding: 20px;
  background: white;
  border: 1px solid #999999;
}

.project-visual {
  min-height: 230px;
  display: grid;
  place-items: center;
  background: #cccccc;
  overflow: hidden;
}

.project-visual img {
  width: 100%;
  height: 230px;
  -o-object-fit: cover;
     object-fit: cover;
}

.carousel-button {
  height: 45px;
  cursor: pointer;
}

.slide-count,
.contact,
.work-break {
  text-align: center;
}

.work-break {
  min-height: 500px;
  display: flex;
  align-items: center;
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${___CSS_LOADER_URL_REPLACEMENT_0___}) center/cover fixed;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 30px;
}

video {
  width: 100%;
  background: black;
}

.email-link {
  display: block;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.social-links a {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* These SVG masks are scalable social icons made through CSS. */
.social-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  background: #222222;
  -webkit-mask-position: center;
          mask-position: center;
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-size: contain;
          mask-size: contain;
}

.icon-github {
  -webkit-mask-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
          mask-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
}

.icon-linkedin {
  -webkit-mask-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
          mask-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
}

footer {
  height: 80px;
  color: white;
  background: #222222;
}

/* Basic modal. */
.modal {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
}

.modal[hidden] {
  display: none;
}

.modal-card {
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 35px;
  background: white;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Stack the large sections on smaller screens. */
@media (max-width: 800px) {
  .project-slide,
.media-grid {
    grid-template-columns: 1fr;
  }

  .project-visual {
    min-height: 150px;
  }

  .project-visual img {
    height: 150px;
  }
}
@media (max-width: 600px) {
  .logo {
    display: none;
  }

  .nav-content,
.nav-links {
    justify-content: center;
  }

  .about-intro {
    align-items: flex-start;
    flex-direction: column;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .work-break {
    background-attachment: scroll;
  }
}`, "",{"version":3,"sources":["webpack://./css/main.scss"],"names":[],"mappings":"AAUA;EACE,sBAAA;AATF;;AAYA;EACE,SAAA;EACA,cAdK;EAeL,8BAAA;EACA,gBAAA;AATF;;AAYA;EACE,gBAAA;AATF;;AAYA;;EAEE,aAAA;AATF;;AAYA,qDAAA;AACA;EACE,eAAA;EACA,WAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,gCAAA;EACA,uBAAA;AATF;;AAYA;EACE,YAAA;AATF;;AAYA;EACE,eAAA;AATF;;AAYA;;EA7CE,wBAAA;EACA,iBAAA;EACA,YAAA;EA8CA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;AAPF;;AAUA;EACE,cA5DK;EA6DL,eAAA;EACA,iBAAA;EACA,qBAAA;AAPF;;AAUA;EACE,YAAA;EACA,aAAA;AAPF;;AAUA;EACE,aAAA;EACA,mBAAA;EACA,eAAA;EACA,cAzEK;EA0EL,qBAAA;EACA,0BAAA;AAPF;;AAUA,4CAAA;AACA;EACE,YAAA;EACA,mBAnFK;AA4EP;;AAUA;;;;EAjFE,wBAAA;EACA,iBAAA;EACA,YAAA;AA8EF;;AAQA;EACE,eAAA;AALF;;AAQA;EACE,eAAA;EACA,sBAAA;AALF;;AAQA;EACE,eAAA;AALF;;AAQA;;EAEE,cA5GK;EA6GL,iBAAA;AALF;;AAQA,4CAAA;AACA;EACE,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,mBArHM;AAgHR;;AAQA;EACE,gBAAA;AALF;;AAQA,iCAAA;AACA;EACE,aAAA;EACA,mBAAA;EACA,SAAA;EACA,mBAAA;AALF;;AAQA;EACE,YAAA;EACA,aAAA;EACA,oBAAA;KAAA,iBAAA;AALF;;AAQA;EACE,aAAA;EACA,qCAAA;EACA,SAAA;AALF;;AAQA;EACE,aAAA;EACA,mBAlJM;EAmJN,yBAAA;AALF;;AAQA,oBAAA;AACA;;EAEE,mBAzJM;AAoJR;;AAQA;EACE,aAAA;EACA,+CAAA;EACA,mBAAA;EACA,SAAA;AALF;;AAQA;EACE,gBAAA;AALF;;AAQA;EACE,aAAA;EACA,0BAAA;AALF;;AAQA;EACE,eAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,SAAA;EACA,aAAA;EACA,iBAAA;EACA,yBAAA;AALF;;AAQA;EACE,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,gBAAA;AALF;;AAQA;EACE,WAAA;EACA,aAAA;EACA,oBAAA;KAAA,iBAAA;AALF;;AAQA;EACE,YAAA;EACA,eAAA;AALF;;AAQA;;;EAGE,kBAAA;AALF;;AAQA;EACE,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;EACA,+HAAA;AALF;;AASA;EACE,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,SAAA;AANF;;AASA;EACE,WAAA;EACA,iBAAA;AANF;;AASA;EACE,cAAA;EACA,mBAAA;AANF;;AASA;EACE,aAAA;EACA,uBAAA;EACA,SAAA;AANF;;AASA;EACE,aAAA;EACA,mBAAA;EACA,QAAA;AANF;;AASA,gEAAA;AACA;EACE,WAAA;EACA,YAAA;EACA,qBAAA;EACA,mBA1PK;EA2PL,6BAAA;UAAA,qBAAA;EACA,8BAAA;UAAA,sBAAA;EACA,0BAAA;UAAA,kBAAA;AANF;;AASA;EACE,2DAAA;UAAA,mDAAA;AANF;;AASA;EACE,2DAAA;UAAA,mDAAA;AANF;;AASA;EACE,YAAA;EACA,YAAA;EACA,mBA3QK;AAqQP;;AASA,iBAAA;AACA;EACE,eAAA;EACA,WAAA;EACA,QAAA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,8BAAA;AANF;;AASA;EACE,aAAA;AANF;;AASA;EACE,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,iBAAA;AANF;;AASA;EACE,kBAAA;EACA,SAAA;EACA,WAAA;AANF;;AASA;EACE;IACE,UAAA;EANF;EAQA;IACE,UAAA;EANF;AACF;AASA,iDAAA;AACA;EACE;;IAEE,0BAAA;EAPF;;EAUA;IACE,iBAAA;EAPF;;EAUA;IACE,aAAA;EAPF;AACF;AAUA;EACE;IACE,aAAA;EARF;;EAWA;;IAEE,uBAAA;EARF;;EAWA;IACE,uBAAA;IACA,sBAAA;EARF;;EAWA;IACE,0BAAA;EARF;;EAWA;IACE,6BAAA;EARF;AACF","sourcesContent":["$blue: #2463a9;\n$light: #eeeeee;\n$dark: #222222;\n\n@mixin container {\n  width: calc(100% - 40px);\n  max-width: 1000px;\n  margin: auto;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  color: $dark;\n  font-family: Arial, sans-serif;\n  line-height: 1.5;\n}\n\nbody.modal-opened {\n  overflow: hidden;\n}\n\nbutton,\na {\n  font: inherit;\n}\n\n/* Sticky navbar that gets smaller after scrolling. */\n.navbar {\n  position: fixed;\n  z-index: 10;\n  top: 0;\n  width: 100%;\n  height: 80px;\n  background: white;\n  border-bottom: 1px solid #999999;\n  transition: height 0.2s;\n}\n\n.navbar.compact {\n  height: 55px;\n}\n\n.navbar.compact .nav-links a {\n  font-size: 13px;\n}\n\n.nav-content,\n.footer-content {\n  @include container;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.logo {\n  color: $blue;\n  font-size: 24px;\n  font-weight: bold;\n  text-decoration: none;\n}\n\n.nav-links {\n  height: 100%;\n  display: flex;\n}\n\n.nav-links a {\n  display: flex;\n  align-items: center;\n  padding: 0 15px;\n  color: $dark;\n  text-decoration: none;\n  transition: font-size 0.2s;\n}\n\n/* This is the reading-position indicator. */\n.nav-links a.active {\n  color: white;\n  background: $blue;\n}\n\n.section-content,\n.hero-content,\n.break-content,\n.contact-content {\n  @include container;\n}\n\nsection {\n  padding: 70px 0;\n}\n\nh1 {\n  font-size: 60px;\n  animation: appear 0.8s;\n}\n\nh2 {\n  font-size: 36px;\n}\n\n.eyebrow,\n.project-type {\n  color: $blue;\n  font-weight: bold;\n}\n\n/* This element stays vertically centered. */\n.hero {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  padding-top: 80px;\n  background: $light;\n}\n\n.hero-copy {\n  max-width: 550px;\n}\n\n/* Simple three-column content. */\n.about-intro {\n  display: flex;\n  align-items: center;\n  gap: 30px;\n  margin-bottom: 40px;\n}\n\n.profile-photo {\n  width: 180px;\n  height: 180px;\n  object-fit: cover;\n}\n\n.about-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n\n.info-card {\n  padding: 15px;\n  background: $light;\n  border: 1px solid #999999;\n}\n\n/* Basic carousel. */\n.projects,\n.media-section {\n  background: $light;\n}\n\n.carousel {\n  display: grid;\n  grid-template-columns: 45px minmax(0, 1fr) 45px;\n  align-items: center;\n  gap: 10px;\n}\n\n.carousel-window {\n  overflow: hidden;\n}\n\n.carousel-track {\n  display: flex;\n  transition: transform 0.4s;\n}\n\n.project-slide {\n  min-width: 100%;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n  gap: 25px;\n  padding: 20px;\n  background: white;\n  border: 1px solid #999999;\n}\n\n.project-visual {\n  min-height: 230px;\n  display: grid;\n  place-items: center;\n  background: #cccccc;\n  overflow: hidden;\n}\n\n.project-visual img {\n  width: 100%;\n  height: 230px;\n  object-fit: cover;\n}\n\n.carousel-button {\n  height: 45px;\n  cursor: pointer;\n}\n\n.slide-count,\n.contact,\n.work-break {\n  text-align: center;\n}\n\n.work-break {\n  min-height: 500px;\n  display: flex;\n  align-items: center;\n  color: white;\n  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),\n    url(\"../assets/image.jpg\") center / cover fixed;\n}\n\n.media-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n  gap: 30px;\n}\n\nvideo {\n  width: 100%;\n  background: black;\n}\n\n.email-link {\n  display: block;\n  margin-bottom: 20px;\n}\n\n.social-links {\n  display: flex;\n  justify-content: center;\n  gap: 25px;\n}\n\n.social-links a {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n/* These SVG masks are scalable social icons made through CSS. */\n.social-icon {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  background: $dark;\n  mask-position: center;\n  mask-repeat: no-repeat;\n  mask-size: contain;\n}\n\n.icon-github {\n  mask-image: url(\"../assets/github.svg\");\n}\n\n.icon-linkedin {\n  mask-image: url(\"../assets/linkedin.svg\");\n}\n\nfooter {\n  height: 80px;\n  color: white;\n  background: $dark;\n}\n\n/* Basic modal. */\n.modal {\n  position: fixed;\n  z-index: 20;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 20px;\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.modal[hidden] {\n  display: none;\n}\n\n.modal-card {\n  position: relative;\n  width: 100%;\n  max-width: 500px;\n  padding: 35px;\n  background: white;\n}\n\n.modal-close {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n@keyframes appear {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n/* Stack the large sections on smaller screens. */\n@media (max-width: 800px) {\n  .project-slide,\n  .media-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .project-visual {\n    min-height: 150px;\n  }\n\n  .project-visual img {\n    height: 150px;\n  }\n}\n\n@media (max-width: 600px) {\n  .logo {\n    display: none;\n  }\n\n  .nav-content,\n  .nav-links {\n    justify-content: center;\n  }\n\n  .about-intro {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .about-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .work-break {\n    background-attachment: scroll;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./index.html"
/*!********************!*\
  !*** ./index.html ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/image.jpg */ "./assets/image.jpg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/battlebot.png */ "./assets/battlebot.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/biped.png */ "./assets/biped.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/appleII.png */ "./assets/appleII.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta\n      name=\"description\"\n      content=\"Zisu Jiang's embedded systems and computer engineering portfolio.\"\n    />\n    <title>Zisu Jiang | Embedded Systems Portfolio</title>\n  </head>\n  <body>\n    <nav class=\"navbar\" aria-label=\"Main navigation\">\n      <div class=\"nav-content\">\n        <a class=\"logo nav-link\" href=\"#home\" aria-label=\"Go to home\">ZJ.</a>\n        <div class=\"nav-links\">\n          <a class=\"nav-link active\" href=\"#home\">Home</a>\n          <a class=\"nav-link\" href=\"#about\">About</a>\n          <a class=\"nav-link\" href=\"#projects\">Projects</a>\n          <a class=\"nav-link\" href=\"#contact\">Contact</a>\n        </div>\n      </div>\n    </nav>\n\n    <header id=\"home\" class=\"hero page-section\">\n      <div class=\"hero-content\">\n        <p class=\"eyebrow\">Hello, I am</p>\n        <h1>Zisu Jiang</h1>\n        <p class=\"hero-title\">\n          Computer Engineering Graduate &amp; Computer Science Student\n        </p>\n        <p class=\"hero-copy\">\n          I build embedded systems, low-level software, and GPU-accelerated\n          programs.\n        </p>\n        <a class=\"button\" href=\"#projects\">See my work</a>\n      </div>\n    </header>\n\n    <main>\n      <section id=\"about\" class=\"about page-section\">\n        <div class=\"section-content\">\n          <p class=\"eyebrow\">A little background</p>\n          <h2>About me</h2>\n          <div class=\"about-intro\">\n            <img\n              class=\"profile-photo\"\n              src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"\n              alt=\"Placeholder profile photo\"\n            />\n            <p>\n              I am a Master of Computer Science student at the University of\n              Illinois Urbana-Champaign. My work focuses on embedded software,\n              firmware, FPGA systems, and hardware-software integration.\n            </p>\n          </div>\n\n          <div class=\"about-grid\">\n            <article class=\"info-card\">\n              <span class=\"card-number\">01</span>\n              <h3>Education</h3>\n              <p>\n                UIUC<br />MCS · Expected May 2028<br />B.S. Computer Engineering\n                · May 2026\n              </p>\n            </article>\n            <article class=\"info-card\">\n              <span class=\"card-number\">02</span>\n              <h3>Skills</h3>\n              <p>C/C++, CUDA, Python, Verilog, Linux, and Assembly</p>\n            </article>\n            <article class=\"info-card\">\n              <span class=\"card-number\">03</span>\n              <h3>Focus</h3>\n              <p>\n                Embedded software, firmware, FPGA, communication protocols, and\n                hardware-software integration\n              </p>\n            </article>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"projects\" class=\"projects page-section\">\n        <div class=\"section-content\">\n          <p class=\"eyebrow\">Selected work</p>\n          <h2>Projects</h2>\n\n          <div class=\"carousel\" aria-label=\"Project carousel\">\n            <button\n              class=\"carousel-button previous\"\n              type=\"button\"\n              aria-label=\"Previous project\"\n            >\n              &#8592;\n            </button>\n\n            <div class=\"carousel-window\">\n              <div class=\"carousel-track\">\n                <article class=\"project-slide\" aria-hidden=\"false\">\n                  <div\n                    class=\"project-visual project-one\"\n                    role=\"img\"\n                    aria-label=\"BattleBot concept image placeholder\"\n                  >\n                    <img\n                      src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\"\n                      alt=\"Scorpion-Lift BattleBot concept\"\n                    />\n                  </div>\n                  <div class=\"project-details\">\n                    <p class=\"project-type\">C++, Python, ESP32</p>\n                    <h3>Scorpion-Lift BattleBot</h3>\n                    <p>\n                      A Wi-Fi controlled combat robot with motor control,\n                      telemetry, and a hardware failsafe.\n                    </p>\n                    <button\n                      class=\"text-button modal-open\"\n                      type=\"button\"\n                      data-modal=\"modal-one\"\n                    >\n                      Read more <span aria-hidden=\"true\">&#8599;</span>\n                    </button>\n                  </div>\n                </article>\n\n                <article class=\"project-slide\" aria-hidden=\"true\">\n                  <div\n                    class=\"project-visual project-two\"\n                    role=\"img\"\n                    aria-label=\"Self-balancing biped concept image placeholder\"\n                  >\n                    <img\n                      src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\"\n                      alt=\"Self-Balancing Biped concept\"\n                    />\n                  </div>\n                  <div class=\"project-details\">\n                    <p class=\"project-type\">C, ESP32, Embedded Systems</p>\n                    <h3>Self-Balancing Biped</h3>\n                    <p>\n                      A two-legged robot that uses real-time feedback control to\n                      maintain dynamic stability.\n                    </p>\n                    <button\n                      class=\"text-button modal-open\"\n                      type=\"button\"\n                      data-modal=\"modal-two\"\n                    >\n                      Read more <span aria-hidden=\"true\">&#8599;</span>\n                    </button>\n                  </div>\n                </article>\n\n                <article class=\"project-slide\" aria-hidden=\"true\">\n                  <div\n                    class=\"project-visual project-three\"\n                    role=\"img\"\n                    aria-label=\"FPGA Apple II concept image placeholder\"\n                  >\n                    <img\n                      src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\"\n                      alt=\"FPGA Apple II reconstruction concept\"\n                    />\n                  </div>\n                  <div class=\"project-details\">\n                    <p class=\"project-type\">SystemVerilog, VHDL</p>\n                    <h3>FPGA Apple ][ Reconstruction</h3>\n                    <p>\n                      A reconstruction of the legacy Apple ][ architecture on an\n                      Intel DE10-Lite FPGA.\n                    </p>\n                    <button\n                      class=\"text-button modal-open\"\n                      type=\"button\"\n                      data-modal=\"modal-three\"\n                    >\n                      Read more <span aria-hidden=\"true\">&#8599;</span>\n                    </button>\n                  </div>\n                </article>\n              </div>\n            </div>\n\n            <button\n              class=\"carousel-button next\"\n              type=\"button\"\n              aria-label=\"Next project\"\n            >\n              &#8594;\n            </button>\n          </div>\n          <p class=\"slide-count\" aria-live=\"polite\">01 / 03</p>\n        </div>\n      </section>\n\n      <section class=\"work-break page-section\" aria-label=\"Working style\">\n        <div class=\"break-content\">\n          <p class=\"eyebrow\">My focus</p>\n          <h2>Hardware meets software.</h2>\n        </div>\n      </section>\n\n      <section id=\"media\" class=\"media-section page-section\">\n        <div class=\"section-content media-grid\">\n          <div>\n            <p class=\"eyebrow\">Project demo</p>\n            <h2>Scorpion-Lift BattleBot</h2>\n            <p>\n              This video demonstrates the BattleBot's wireless controls,\n              movement, lift mechanism, and system testing.\n            </p>\n          </div>\n          <video controls preload=\"metadata\" aria-label=\"BattleBot demo video\">\n            <!-- webpackIgnore: true -->\n            <source src=\"assets/battlebot-demo.mov\" />\n            Your browser does not support HTML5 video.\n          </video>\n        </div>\n      </section>\n\n      <section id=\"contact\" class=\"contact page-section\">\n        <div class=\"contact-content\">\n          <p class=\"eyebrow\">Let us connect</p>\n          <h2>Have an idea?<br />Send me a note.</h2>\n          <a class=\"email-link\" href=\"mailto:zisuj2@gmail.com\"\n            >zisuj2@gmail.com</a\n          >\n          <div class=\"social-links\" aria-label=\"Social media links\">\n            <a href=\"https://github.com/zzangzs\" aria-label=\"GitHub profile\">\n              <span class=\"social-icon icon-github\" aria-hidden=\"true\"></span>\n              GitHub\n            </a>\n            <a\n              href=\"https://www.linkedin.com/in/zisu-jiang\"\n              aria-label=\"LinkedIn profile\"\n            >\n              <span class=\"social-icon icon-linkedin\" aria-hidden=\"true\"></span>\n              LinkedIn\n            </a>\n          </div>\n        </div>\n      </section>\n    </main>\n\n    <footer>\n      <div class=\"footer-content\">\n        <p>&copy; <span id=\"current-year\"></span> Zisu Jiang</p>\n        <a class=\"nav-link\" href=\"#home\">Back to top &#8593;</a>\n      </div>\n    </footer>\n\n    <div\n      class=\"modal\"\n      id=\"modal-one\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"modal-one-title\"\n      hidden\n    >\n      <div class=\"modal-card\">\n        <button\n          class=\"modal-close\"\n          type=\"button\"\n          aria-label=\"Close project details\"\n        >\n          &times;\n        </button>\n        <p class=\"project-type\">C++, Python, ESP32 · Team Lead</p>\n        <h2 id=\"modal-one-title\">Scorpion-Lift BattleBot</h2>\n        <p>\n          I built ESP32 firmware for Wi-Fi web-based robot control, including\n          PWM output for two DC motors and three servo actuators. The system\n          includes a heartbeat failsafe that stops the drive outputs within 580\n          ms of signal loss and INA219 telemetry for current and voltage\n          monitoring. The robot reached a 0.706 m/s drive speed, lifted 2 lb in\n          0.76 seconds, and ran continuously for two minutes.\n        </p>\n        <a\n          class=\"text-button\"\n          href=\"assets/battlebot-lab-report.pdf\"\n          target=\"_blank\"\n          rel=\"noopener\"\n          >View lab report &#8599;</a\n        >\n      </div>\n    </div>\n\n    <div\n      class=\"modal\"\n      id=\"modal-two\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"modal-two-title\"\n      hidden\n    >\n      <div class=\"modal-card\">\n        <button\n          class=\"modal-close\"\n          type=\"button\"\n          aria-label=\"Close project details\"\n        >\n          &times;\n        </button>\n        <p class=\"project-type\">C, ESP32, Embedded Systems · Team Leader</p>\n        <h2 id=\"modal-two-title\">Self-Balancing Biped</h2>\n        <p>\n          I designed and programmed a two-legged self-balancing robot using an\n          ESP32 and real-time feedback control loops. I applied control systems\n          and embedded programming concepts to achieve dynamic stability and\n          developed the firmware in C using Git-based version control. The\n          project provided hands-on experience with hardware-software co-design,\n          timing analysis, and system-level validation.\n        </p>\n        <a class=\"text-button\" href=\"https://github.com/zzangzs/cs431biped\"\n          >View project &#8599;</a\n        >\n      </div>\n    </div>\n\n    <div\n      class=\"modal\"\n      id=\"modal-three\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"modal-three-title\"\n      hidden\n    >\n      <div class=\"modal-card\">\n        <button\n          class=\"modal-close\"\n          type=\"button\"\n          aria-label=\"Close project details\"\n        >\n          &times;\n        </button>\n        <p class=\"project-type\">SystemVerilog, VHDL · Team Leader</p>\n        <h2 id=\"modal-three-title\">FPGA Apple ][ Reconstruction</h2>\n        <p>\n          I reconstructed the legacy Apple ][ architecture on an Intel DE10-Lite\n          FPGA by translating system-level specifications into RTL hardware. I\n          migrated the memory subsystem from off-chip SRAM to on-chip block RAM\n          to improve latency and synchronization. The project included FPGA\n          design flow, synthesis, and timing analysis.\n        </p>\n        <a\n          class=\"text-button\"\n          href=\"https://github.com/zzangzs/apple2fpga_MAX10\"\n          >View project &#8599;</a\n        >\n      </div>\n    </div>\n  </body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ },

/***/ "./css/main.scss"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./assets/appleII.png"
/*!****************************!*\
  !*** ./assets/appleII.png ***!
  \****************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "49ebb6b021ed78ce4959.png";

/***/ },

/***/ "./assets/battlebot.png"
/*!******************************!*\
  !*** ./assets/battlebot.png ***!
  \******************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "9f952c697e82f222ed3b.png";

/***/ },

/***/ "./assets/biped.png"
/*!**************************!*\
  !*** ./assets/biped.png ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "3e41148aff3886c829ae.png";

/***/ },

/***/ "./assets/github.svg"
/*!***************************!*\
  !*** ./assets/github.svg ***!
  \***************************/
(module) {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTEyIC43YTEyIDEyIDAgMCAwLTMuOCAyMy40Yy42LjEuOC0uMy44LS42di0yLjNjLTMuMy43LTQtMS40LTQtMS40LS41LTEuNC0xLjMtMS43LTEuMy0xLjctMS4xLS44LjEtLjguMS0uOCAxLjIuMSAxLjggMS4yIDEuOCAxLjIgMS4xIDEuOCAyLjggMS4zIDMuNSAxIC4xLS44LjQtMS4zLjgtMS42LTIuNy0uMy01LjUtMS4zLTUuNS01LjkgMC0xLjMuNS0yLjQgMS4yLTMuMi0uMS0uMy0uNS0xLjUuMS0zLjIgMCAwIDEtLjMgMy4zIDEuMmExMS40IDExLjQgMCAwIDEgNiAwYzIuMy0xLjUgMy4zLTEuMiAzLjMtMS4yLjYgMS43LjIgMi45LjEgMy4yLjguOCAxLjIgMS45IDEuMiAzLjIgMCA0LjYtMi44IDUuNi01LjUgNS45LjQuNC44IDEuMS44IDIuMnYzLjJjMCAuMy4yLjcuOC42QTEyIDEyIDAgMCAwIDEyIC43WiIvPgo8L3N2Zz4K";

/***/ },

/***/ "./assets/image.jpg"
/*!**************************!*\
  !*** ./assets/image.jpg ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "47da01192a321b885cb6.jpg";

/***/ },

/***/ "./assets/linkedin.svg"
/*!*****************************!*\
  !*** ./assets/linkedin.svg ***!
  \*****************************/
(module) {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTIwIDNINGEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMlY1YTIgMiAwIDAgMC0yLTJaTTggMThINVY5aDN2OVpNNi41IDcuNUExLjUgMS41IDAgMSAxIDYuNSA0YTEuNSAxLjUgMCAwIDEgMCAzLjVaTTE5IDE4aC0zdi01YzAtMi0zLTItMyAwdjVoLTNWOWgzdjFjMi0zIDYtMSA2IDN2NVoiLz4KPC9zdmc+Cg==";

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// no installed chunks
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	__webpack_require__.nc = undefined;
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/main.scss */ "./css/main.scss");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ "./js/main.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files


// Stylesheets


// Scripts

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map