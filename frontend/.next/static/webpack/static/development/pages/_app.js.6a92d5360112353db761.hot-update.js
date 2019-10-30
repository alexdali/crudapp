webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/Page.js":
/*!****************************!*\
  !*** ./components/Page.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Header */ "./components/Header.js");
/* harmony import */ var _Meta__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Meta */ "./components/Meta.js");






var _jsxFileName = "/media/n2_3TB/EDU/GraphQL/crudapp/frontend/components/Page.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_5__["default"])(["\n     html {\n        box-sizing: border-box;\n        font-size: 10px;\n    }\n    *, *:before, *:after {\n        box-sizing: inherit;\n    }\n    body {\n        padding: 0;\n        margin: 0;\n        font-size: 1.5rem;\n        line-height: 2;\n        ", "\n    }\n    a {\n        text-decoration: none;\n        color: ", ";\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1200px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};
var StyledPage = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "Page__StyledPage",
  componentId: "peqh5w-0"
})(["background:white;color:", ";"], function (props) {
  return props.theme.black;
});
var Inner = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "Page__Inner",
  componentId: "peqh5w-1"
})(["max-width:", ";margin:0 auto;padding:2rem;"], function (props) {
  return props.theme.maxWidth;
}); // injectGlobal`
//     @font-face {
//         font-family: 'radnika_next';
//         src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
//         font-weight: normal;
//         font-style: normal;
//     }
//     html {
//         box-sizing: border-box;
//         font-size: 10px;
//     }
//     *, *:before, *:after {
//         box-sizing: inherit;
//     }
//     body {
//         padding: 0;
//         margin: 0;
//         font-size: 1.5rem;
//         line-height: 2;
//         font-family: 'radnika_next';
//     }
//     a {
//         text-decoration: none;
//         color: ${theme.black};
//     }
// `;

var GlobalStyle = Object(styled_components__WEBPACK_IMPORTED_MODULE_7__["createGlobalStyle"])(_templateObject(), ''
/* font-family: 'radnika_next'; */
, theme.black);

var Page =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Page, _Component);

  function Page() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Page);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Page).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Page, [{
    key: "render",
    value: function render() {
      return __jsx(styled_components__WEBPACK_IMPORTED_MODULE_7__["ThemeProvider"], {
        theme: theme,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, __jsx(StyledPage, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, __jsx(_Meta__WEBPACK_IMPORTED_MODULE_9__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }), __jsx(_Header__WEBPACK_IMPORTED_MODULE_8__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }), __jsx(Inner, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, this.props.children), __jsx(GlobalStyle, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      })));
    }
  }]);

  return Page;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ })

})
//# sourceMappingURL=_app.js.6a92d5360112353db761.hot-update.js.map