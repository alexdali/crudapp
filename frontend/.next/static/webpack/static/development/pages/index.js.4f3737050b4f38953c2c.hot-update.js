webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/PostList.js":
/*!********************************!*\
  !*** ./components/PostList.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _PostCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PostCard */ "./components/PostCard.js");

var _jsxFileName = "/media/n2_3TB/EDU/GraphQL/crudapp/frontend/components/PostList.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  query ALL_POSTS_QUERY {\n    posts {\n      id\n      title\n      userId\n      content\n      createdDate\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






 //import NProgress from 'nprogress';
//import CreateFormCategoryTP from './CreateFormCategoryTP';

 // import Error from './ErrorMessage';

var RowDiv = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "PostList__RowDiv",
  componentId: "j2ms20-0"
})(["margin:52px 0px;padding:30px 10px;border:1px solid rgba(34,36,38,0.15);border-radius:0.28571429rem;box-shadow:0 1px 2px 0 rgba(34,36,38,0.15);.menu-account-info{font-family:'Montserrat Alternates','Roboto','Open Sans',sans-serif,'Arial';}.segment.segment-bottom{display:flex;justify-content:space-between;}"]); // const FormTab = styled.div`
//   form {
//     > div.inline.fields.radio-buttons {
//       /* margin: 0 0 1em; */
//       border: 1px solid rgba(34, 36, 38, 0.15);
//       padding: 1em 1em;
//     }
//     /* div.radio-buttons {
//       padding: 10px 0;
//     } */
//     div.fields.form-group-submit {
//       /* display: none; */
//       display: ${props => props.submitShow};
//     }
//     div.fields.form-group-edit {
//       /* display: flex; */
//       display: ${props => props.editShow};
//     }
//   }
// `;

var ItemsList = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "PostList__ItemsList",
  componentId: "j2ms20-1"
})(["display:block;max-width:", ";margin:2.5rem 3rem;padding:0 4em;@media (max-width:700px){margin:2.5rem 1rem;}"], function (props) {
  return props.theme.maxWidth;
}); // const perScreen = 5;

var ALL_POSTS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_3___default()(_templateObject()); // const UPDATE_POST_MUTATION = gql`
//   mutation UPDATE_POST_MUTATION(
//     $userId: String!
//     $postId: String!
//     $title: String!
//     $content: String!
//   ) {
//     updatePost(
//       userId: $userId
//       postId: $postId
//       title: $title
//       content: $content)
//       {
//         id
//         title
//         userId
//         content
//         createdDate
//     }
//   }
// `;

var PostList = function PostList(props) {
  return __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_2__["Query"], {
    query: ALL_POSTS_QUERY,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: this
  }, function (_ref) {
    var data = _ref.data,
        loadingQuery = _ref.loading;
    return loadingQuery ? __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, __jsx("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: this
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...", __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Icon"], {
      loading: true,
      name: "spinner",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107
      },
      __self: this
    }))) : //console.log('query PostList posts: ', posts);

    /* (!posts) {
      return <p>Постов нет</p>; }*/
    // console.log('const PostList: props:', props);
    __jsx(RowDiv, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 118
      },
      __self: this
    }, __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 119
      },
      __self: this
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Segment"].Group, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120
      },
      __self: this
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__["Segment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121
      },
      __self: this
    }, data.posts.map(function (post) {
      return __jsx(_PostCard__WEBPACK_IMPORTED_MODULE_7__["default"], {
        postcard: post,
        key: post.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      });
    })))));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (PostList);

/***/ })

})
//# sourceMappingURL=index.js.4f3737050b4f38953c2c.hot-update.js.map