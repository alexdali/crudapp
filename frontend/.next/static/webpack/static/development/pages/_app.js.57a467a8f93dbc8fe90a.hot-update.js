webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/NavBar.js":
/*!******************************!*\
  !*** ./components/NavBar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./User */ "./components/User.js");
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Login */ "./components/Login.js");







var _jsxFileName = "/media/n2_3TB/EDU/GraphQL/crudapp/frontend/components/NavBar.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;




 //import NProgress from 'nprogress';



 //import SigninModal from './SigninModal';

 // const handleRouteChangeStart = () => {
//   NProgress.start();
// };
// const handleRouteChangeCompleteAndError = () => {
//   NProgress.done();
// };
// Router.events.on('routeChangeStart', handleRouteChangeStart);
// Router.events.on('routeChangeComplete', handleRouteChangeCompleteAndError);
// Router.events.on('routeChangeError', handleRouteChangeCompleteAndError);

var RowDiv = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "NavBar__RowDiv",
  componentId: "sc-14mmg1w-0"
})([".logo{float:left;margin:0 25px 0;img.image{width:11rem;}}.ui.floated.header{}.ui.menu{font-family:'Montserrat Alternates','Roboto','Open Sans',sans-serif,'Arial';}.ui.right.floated.menu{margin:0.8rem 2rem 0 0.5rem;}.ui.secondary.menu{.dropdown.item:hover,.link.item:hover,a.item:hover{background:none;}.ui.menu .ui.dropdown .menu > .item:hover{background:none !important;}.dropdown-sub-menu:active{display:none;}}.MenuItem{cursor:pointer;&:after{height:2px;background:#1ab394;content:'';width:0;position:absolute;transform:translateX(-50%);transition:width 0.4s;transition-timing-function:cubic-bezier(1,-0.65,0,2.31);left:50%;margin-top:0.5rem;}&:hover,&:focus{background:none;outline:none;color:#1ab394;font-weight:600;&:after{width:calc(100% - 10px);}@media (max-width:700px){width:calc(100% - 10px);}}a{padding:0 0.5rem;display:flex;align-items:center;position:relative;background:none;border:0;cursor:pointer;@media (max-width:700px){padding:0 10px;}}}"]);
var MenuDiv = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "NavBar__MenuDiv",
  componentId: "sc-14mmg1w-1"
})([".ui.simple.dropdown .menu{opacity:0;}.ui.simple.active.dropdown > .menu,.ui.simple.dropdown:hover > .menu{opacity:1;top:95% !important;margin-top:0;}.ui.menu .ui.dropdown .menu > .selected.item:active{color:rgba(0,0,0,0.95) !important;}"]);

var NavBar =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(NavBar, _React$Component);

  function NavBar(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, NavBar);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(NavBar).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "handleRes", function (res) {
      console.log('NavBar handleRes res: ', res);

      if (res) {
        _this.setState({
          login: false
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "handleItemClick", function (e, data) {
      // console.log('NavBar handleItemClick: e', e);
      console.log('NavBar handleItemClick data: ', data);
      var name = data.name;

      if (name === 'login') {
        _this.setState({
          login: true
        });
      }

      if (name === 'logout') {// this.setState({
        //   login: e,
        // });
      }

      if (name === 'taxservice') {// Router.push({
        //   pathname: '/categorytplist',
        // });
      }
    });

    _this.state = {
      activeItem: '',
      login: false
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(NavBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log('NavBar render this.state: ', this.state);
      // console.log('Header render  this.props: ', this.props.isMobile);
      var _this$state = this.state,
          activeItem = _this$state.activeItem,
          login = _this$state.login;
      return __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_8__["Query"], {
        query: _User__WEBPACK_IMPORTED_MODULE_14__["CURRENT_USER_QUERY"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        },
        __self: this
      }, function (_ref) {
        var data = _ref.data,
            loading = _ref.loading;
        console.log('NavBar render Query data: ', data);
        return __jsx(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, __jsx(MenuDiv, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 202
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"], {
          secondary: true,
          borderless: true,
          floated: "right",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 203
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Menu, {
          position: "right",
          as: "ul",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 204
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Item, {
          name: "home",
          as: "li",
          onClick: _this2.handleItemClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 205
          },
          __self: this
        }, __jsx("div", {
          className: "MenuItem",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 210
          },
          __self: this
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
          href: "/",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 211
          },
          __self: this
        }, __jsx("a", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 212
          },
          __self: this
        }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Item, {
          name: "tariffs",
          as: "li",
          onClick: _this2.handleItemClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          },
          __self: this
        }, __jsx("div", {
          className: "MenuItem",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 223
          },
          __self: this
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
          href: "/tariffs",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 224
          },
          __self: this
        }, __jsx("a", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 225
          },
          __self: this
        }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C")))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Item, {
          name: "tools",
          as: "li",
          onClick: _this2.handleItemClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 229
          },
          __self: this
        }, __jsx("div", {
          className: "MenuItem",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 235
          },
          __self: this
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
          href: "/tools",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 236
          },
          __self: this
        }, __jsx("a", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 237
          },
          __self: this
        }, "\u0421\u0435\u0440\u0432\u0438\u0441\u044B")))), login && __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Item, {
          name: "logout",
          as: "li",
          onClick: _this2.handleItemClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 242
          },
          __self: this
        }, __jsx("div", {
          className: "MenuItem",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 247
          },
          __self: this
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
          href: "#",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 248
          },
          __self: this
        }, __jsx("a", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 249
          },
          __self: this
        }, "\u0412\u044B\u0439\u0442\u0438")))), !login && __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"].Item, {
          name: "login",
          as: "li",
          onClick: _this2.handleItemClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 258
          },
          __self: this
        }, __jsx("div", {
          className: "MenuItem",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 263
          },
          __self: this
        }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
          href: "#",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 264
          },
          __self: this
        }, __jsx("a", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 265
          },
          __self: this
        }, "\u0412\u043E\u0439\u0442\u0438")))), loading && __jsx("i", {
          "class": "spinner icon",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 270
          },
          __self: this
        })))), login && __jsx(_Login__WEBPACK_IMPORTED_MODULE_15__["default"], {
          handleRes: _this2.handleRes,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 275
          },
          __self: this
        }));
      });
    }
  }]);

  return NavBar;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (NavBar);

/***/ })

})
//# sourceMappingURL=_app.js.57a467a8f93dbc8fe90a.hot-update.js.map