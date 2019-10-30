webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/PostCard.js":
/*!********************************!*\
  !*** ./components/PostCard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");






var _jsxFileName = "/media/n2_3TB/EDU/GraphQL/crudapp/frontend/components/PostCard.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;




 // import ItemStyles from './styles/ItemStyles';
//import BlockStyles from './styles/BlockStyles';
// const Block = styled.div`
//   background: white;
//   border: 1px solid rgba(0, 0, 0, 0.1)};
//   /* ${props => props.theme.offWhite}; */
//   border-radius: 5px;
//   box-shadow: ${props => props.theme.bs};
//   position: relative;
//   /* display: flex;
//   flex-direction: column; */
//   display: block;
//   margin: 1.8rem auto;
//   padding: 5px 0 10px;
//   img {
//     width: 100%;
//     height: 400px;
//     object-fit: scale-down;
//     /* object-fit: cover; */
//   }
//   p {
//     /* text-align: left;
//     font-size: 12px;
//     line-height: 2;
//     font-weight: 300;
//     /* flex-grow: 1; */
//     /* padding: 0 3rem; */
//     /* font-size: 1.5rem; */
//   }
//   .buttonList {
//     display: grid;
//     width: 100%;
//     border-top: 1px solid ${props => props.theme.lightgrey};
//     grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//     grid-gap: 1px;
//     background: ${props => props.theme.lightgrey};
//     & > * {
//       background: white;
//       border: 0;
//       font-size: 1rem;
//       padding: 1rem;
//     }
//   }
// `;
// const Title = styled.h3`
//   margin: 2px 1rem;
//   text-align: left;
//   /* margin-top: -0.5rem; */
//   /* transform: skew(-5deg) rotate(-1deg); */
//   text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
//   a {
//     background: ${props => props.theme.green};
//     display: inline;
//     line-height: 1.3;
//     font-size: 1.1rem;
//     text-align: center;
//     /* color: white; */
//     padding: 0 1rem;
//   }
// `;
// const Description = styled.p`
//   text-align: justify;
//   /* font-size: 12px; */
//   line-height: 2;
//   font-weight: 300;
//   padding: 0 2rem;
//   font-size: 0.85rem;
// `;

var PostCard =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(PostCard, _Component);

  function PostCard() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, PostCard);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(PostCard).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PostCard, [{
    key: "render",
    value: function render() {
      var _this$props$postcard = this.props.postcard,
          id = _this$props$postcard.id,
          userId = _this$props$postcard.userId,
          title = _this$props$postcard.title,
          content = _this$props$postcard.content,
          createdDate = _this$props$postcard.createdDate;
      console.log('PostCard this.props', this.props);
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"].Content, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"].Header, {
        as: "a",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, title), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Divider"], {
        clearing: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: this
      }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Label"], {
        as: "span",
        color: "orange",
        ribbon: "right",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }, createdDate), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"].Meta, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, userId), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"].Description, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, __jsx("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, content)), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Divider"], {
        horizontal: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Item"].Extra, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Icon"], {
        name: "comment alternate outline",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }), " \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438", __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_10__["Label"], {
        color: "teal",
        floating: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, "22")))))
      /*  <Card fluid raised>
      <Card.Content>
       <Card.Header>{title}</Card.Header>
       <Card.Meta>{userId}</Card.Meta>
       <Card.Meta>{createdDate}</Card.Meta>
       <Card.Description>{content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
       <a>
         <Icon name='comment alternate outline' />
         10 комментариев
       </a>
      </Card.Content>
      </Card>
      <Block>
         <Title>
           <Link
             href={{
               pathname: '/user',
               query: { id: item.id },
             }}
           >
             <a>{item.title}</a>
           </Link>
         </Title>
         <Description>{item.userId}</Description>
         <Description>{item.createdDate}</Description>
         <div>{item.content}</div>
       </Block> */
      ;
    }
  }]);

  return PostCard;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(PostCard, "propTypes", {
  postcard: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
    userId: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
    content: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
    createdDate: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (PostCard);

/***/ })

})
//# sourceMappingURL=index.js.69e429121785b048a2bd.hot-update.js.map