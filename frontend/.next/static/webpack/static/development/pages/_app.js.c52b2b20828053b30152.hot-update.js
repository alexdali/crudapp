webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./lib/withData.js":
/*!*************************!*\
  !*** ./lib/withData.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-with-apollo */ "./node_modules/next-with-apollo/lib/index.js");
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_with_apollo__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-link-error */ "./node_modules/apollo-link-error/lib/bundle.esm.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./config.js");






 //import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart';
//const createClient = new ApolloClient({

function createClient() {
  return new apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    link: apollo_link__WEBPACK_IMPORTED_MODULE_5__["ApolloLink"].from([Object(apollo_link_error__WEBPACK_IMPORTED_MODULE_4__["onError"])(function (_ref) {
      var graphQLErrors = _ref.graphQLErrors,
          networkError = _ref.networkError;
      if (graphQLErrors) graphQLErrors.forEach(function (_ref2) {
        var message = _ref2.message,
            locations = _ref2.locations,
            path = _ref2.path;
        return console.log("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(locations, ", Path: ").concat(path));
      });
      if (networkError) console.log("[Network error]: ".concat(networkError));
    }), new apollo_link_http__WEBPACK_IMPORTED_MODULE_3__["HttpLink"]({
      uri: _config__WEBPACK_IMPORTED_MODULE_6__["endpoint"],
      credentials: 'include'
    })]),
    cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]()
  });
}

/* harmony default export */ __webpack_exports__["default"] = (next_with_apollo__WEBPACK_IMPORTED_MODULE_0___default()(createClient));

/***/ })

})
//# sourceMappingURL=_app.js.c52b2b20828053b30152.hot-update.js.map