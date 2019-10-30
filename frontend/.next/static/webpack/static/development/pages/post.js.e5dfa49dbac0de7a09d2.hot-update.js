webpackHotUpdate("static/development/pages/post.js",{

/***/ "./components/Post.js":
/*!****************************!*\
  !*** ./components/Post.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _PostList__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./PostList */ "./components/PostList.js");










var _jsxFileName = "/media/n2_3TB/EDU/GraphQL/crudapp/frontend/components/Post.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement;

function _templateObject3() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_9__["default"])(["\n  mutation UPDATE_POST_MUTATION(\n    $userId: String!\n    $postId: String!\n    $title: String!\n    $content: String!\n  ) {\n    updatePost(\n      userId: $userId\n      postId: $postId\n      title: $title\n      content: $content\n      ) {\n        id\n        title\n        userId\n        content\n        createdDate\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_9__["default"])(["\n  mutation CREATE_POST_MUTATION(\n    $userId: String!\n    $title: String!\n    $content: String!\n  ) {\n    createPost(\n      userId: $userId\n      title: $title\n      content: $content\n      ) {\n        id\n        title\n        userId\n        content\n        createdDate\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_9__["default"])(["\n  query POST_QUERY(\n    $id: String!\n  ) {\n    post(id: $id) {\n      id\n      title\n      userId\n      content\n      createdDate\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






 //import NProgress from 'nprogress';
//import CreateFormCategoryTP from './CreateFormCategoryTP';

 // import Error from './ErrorMessage';

var RowDiv = styled_components__WEBPACK_IMPORTED_MODULE_15__["default"].div.withConfig({
  displayName: "Post__RowDiv",
  componentId: "sc-1g58j7m-0"
})(["margin:52px 0px;padding:30px 10px;border:1px solid rgba(34,36,38,0.15);border-radius:0.28571429rem;box-shadow:0 1px 2px 0 rgba(34,36,38,0.15);.menu-account-info{font-family:'Montserrat Alternates','Roboto','Open Sans',sans-serif,'Arial';}.segment.segment-bottom{display:flex;justify-content:space-between;}"]);
var FormTab = styled_components__WEBPACK_IMPORTED_MODULE_15__["default"].div.withConfig({
  displayName: "Post__FormTab",
  componentId: "sc-1g58j7m-1"
})(["form{> div.inline.fields.radio-buttons{border:1px solid rgba(34,36,38,0.15);padding:1em 1em;}div.fields.form-group-submit{display:", ";}div.fields.form-group-edit{display:", ";}}"], function (props) {
  return props.submitShow;
}, function (props) {
  return props.editShow;
});
var POST_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_12___default()(_templateObject());
var CREATE_POST_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_12___default()(_templateObject2());
var UPDATE_POST_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_12___default()(_templateObject3());
var ItemsList = styled_components__WEBPACK_IMPORTED_MODULE_15__["default"].div.withConfig({
  displayName: "Post__ItemsList",
  componentId: "sc-1g58j7m-2"
})(["display:block;max-width:", ";margin:2.5rem 3rem;padding:0 4em;@media (max-width:700px){margin:2.5rem 1rem;}"], function (props) {
  return props.theme.maxWidth;
}); // const Post = props => (
//   <Query query={ALL_POSTS_QUERY}>
//     {({ data: { posts }, loading: loadingQuery }) => {
//       console.log('query PostList posts: ', posts);
//       if (loadingQuery)
//         return (
//           <div>
//             <p>Загрузка...</p>
//             <Icon loading name="spinner" />
//           </div>
//         );
//       if (!posts) {
//         return <p>Постов нет</p>;
//       }
//       // console.log('const PostList: props:', props);
//       return (
//         <RowDiv>
//           <div>
//             <Segment.Group>
//               <Segment>
//               <ItemsList>
//                 {data.posts.map(post => (
//                   <PostBlock postItem={postItem} key={post.id} />
//                 ))}
//               </ItemsList>
//                 <CreateFormCategoryTP />
//               </Segment>
//             </Segment.Group>
//           </div>
//         </RowDiv>
//       );
//     }}
//   </Query>
// );

var Post = function Post(props) {
  console.log('const Post props: ', props);
  return __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_11__["Query"], {
    query: POST_QUERY,
    variables: {
      id: props.id
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157
    },
    __self: this
  }, function (_ref) {
    var data = _ref.data,
        loadingQuery = _ref.loading;
    console.log('query Post data: ', data);
    return loadingQuery ? __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 166
      },
      __self: this
    }, __jsx("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 167
      },
      __self: this
    }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...", __jsx("i", {
      className: "spinner icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 169
      },
      __self: this
    }))) : __jsx(RowDiv, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 176
      },
      __self: this
    }, __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 177
      },
      __self: this
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Segment"].Group, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 178
      },
      __self: this
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Segment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 179
      },
      __self: this
    }, __jsx(PostBlock, {
      postItem: data.post,
      key: data.post.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 181
      },
      __self: this
    })))));
  });
};

var PostBlock =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(PostBlock, _Component);

  function PostBlock() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, PostBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(PostBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "state", {
      postItem: _this.props.postItem,
      // showCreate: '',
      readOnly: true,
      showEdit: ''
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "enableEdit", function (val) {
      console.log('PostBlock enableEdit');

      if (val === '1') {
        _this.setState({
          showEdit: '1',
          readOnly: false
        });
      } else {
        _this.setState({
          showEdit: '',
          readOnly: true,
          postItem: _this.props.postItem
        });
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "handleChange", function (e, data) {
      var _e$target = e.target,
          name = _e$target.name,
          type = _e$target.type,
          value = _e$target.value; // console.log(`handleChange: e: `, e);

      console.log("handleChange: data: ", data);
      console.log("handleChange: name: ".concat(name, ", type: ").concat(type, ", value: ").concat(value, ", data.checked: ").concat(data.checked, ", data.name: ").concat(data.name));
      var val = value;
      var nam = name;

      if (data.name === 'isActive') {
        val = data.checked;
        nam = data.name;
      }

      var postItem = _this.state.postItem;
      postItem[nam] = val;

      _this.setState({
        postItem: postItem
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "updatePostItem",
    /*#__PURE__*/
    function () {
      var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(updatePost) {
        var postItem, res;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log('updatePostItem e: ', e);
                // console.log('PostList updatePostItem this.state: ', this.state);
                postItem = _this.state.postItem;
                console.log('PostList updatePostItem this.state.postItem: ', postItem);
                _context.next = 4;
                return updatePost({
                  userId: postItem.userId,
                  postId: postItem.id,
                  title: postItem.title,
                  content: postItem.content
                });

              case 4:
                res = _context.sent;
                console.log('updatePostItem UPDATED!!!! res: ', res);

                _this.setState({
                  postItem: _this.props.postItem,
                  // postItem: {
                  //   userId:
                  //   title: '',
                  //   content: '',
                  //   createdDate: '',
                  // },
                  showEdit: '',
                  readOnly: true
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(PostBlock, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log('PostBlock render -> props', this.props);
      console.log('PostBlock render -> state', this.state);
      var _this$state = this.state,
          postItem = _this$state.postItem,
          readOnly = _this$state.readOnly,
          showEdit = _this$state.showEdit;
      console.log('PostBlock render -> state.postItem', postItem);
      return __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_11__["Mutation"], {
        mutation: UPDATE_POST_MUTATION,
        variables: postItem // {postItem: this.state.postItem,categoryTaxPayerId: this.props.postItem.id,}
        ,
        refetchQueries: function refetchQueries() {
          return ['ALL_POSTS_QUERY'];
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 290
        },
        __self: this
      }, function (_ref3) {
        var updatePost = _ref3.updatePost,
            loadingUpdate = _ref3.loading,
            errorUpdate = _ref3.error;
        return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Segment"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 301
          },
          __self: this
        }, __jsx("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 302
          },
          __self: this
        }, __jsx("h3", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 303
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Form"].Input, {
          fluid: true,
          name: "title",
          readOnly: readOnly,
          disabled: loadingUpdate,
          loading: loadingUpdate,
          defaultValue: postItem.title,
          onChange: _this2.handleChange // width={required
          ,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 304
          },
          __self: this
        })), __jsx("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 315
          },
          __self: this
        }, postItem.userId), __jsx("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 329
          },
          __self: this
        }, postItem.createdDate)), __jsx("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 342
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Form"].Input, {
          fluid: true,
          name: "content",
          readOnly: readOnly,
          disabled: loadingUpdate,
          loading: loadingUpdate,
          defaultValue: postItem.content,
          onChange: _this2.handleChange // width={8}
          ,
          required: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 343
          },
          __self: this
        })), showEdit === '' ? __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Segment"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 357
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Button"] // TODO tooltip
        , {
          icon: true,
          size: "large",
          onClick: function onClick() {
            return _this2.enableEdit('1');
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 358
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Icon"], {
          name: "edit outline",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 364
          },
          __self: this
        })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Button"], {
          icon: true,
          size: "large",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 366
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Icon"], {
          name: "trash alternate outline",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 367
          },
          __self: this
        }))) : __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Segment"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 371
          },
          __self: this
        }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Button"], {
          onClick: function onClick() {
            return _this2.updatePostItem(updatePost);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 372
          },
          __self: this
        }, "\u041E\u0431\u043D\u043E\u0432", loadingUpdate ? 'ление' : 'ить'), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_14__["Button"], {
          onClick: function onClick() {
            return _this2.enableEdit('');
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 377
          },
          __self: this
        }, "\u041E\u0442\u043C\u0435\u043D\u0430")));
      });
    }
  }]);

  return PostBlock;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(PostBlock, "propTypes", {
  postItem: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string,
    userId: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string,
    content: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string,
    createdDate: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Post);

/***/ })

})
//# sourceMappingURL=post.js.e5dfa49dbac0de7a09d2.hot-update.js.map