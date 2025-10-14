"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Expander = require("../../../packages/components/src/components/Expander");
var _Translator = require("../../../packages/components/src/context/Translator");
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var FAKE_TIMEOUT_RERENDER = 1;
var Accordion = exports.Accordion = function Accordion(_ref) {
  var children = _ref.children,
    header = _ref.header,
    _ref$initiallyExpande = _ref.initiallyExpanded,
    initiallyExpanded = _ref$initiallyExpande === void 0 ? false : _ref$initiallyExpande,
    _ref$onHandleExpand = _ref.onHandleExpand,
    onHandleExpand = _ref$onHandleExpand === void 0 ? function () {
      return null;
    } : _ref$onHandleExpand;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var accordionContentRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(initiallyExpanded),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setIsExpanded = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAnimating = _useState4[0],
    setIsAnimating = _useState4[1];
  var collapseLabel = Translator.trans(/*@Desc("Hide")*/'ibexa.expander.label.collapse');
  var expandLabel = Translator.trans(/*@Desc("Show")*/'ibexa.expander.label.expand');
  var changeExpanded = function changeExpanded(nextIsExpanded) {
    setIsExpanded(nextIsExpanded);
    onHandleExpand(nextIsExpanded);
    setIsAnimating(true);
    if (accordionContentRef.current) {
      var initialHeight = nextIsExpanded ? 0 : accordionContentRef.current.offsetHeight;
      accordionContentRef.current.style.height = "".concat(initialHeight.toString(), "px");
      accordionContentRef.current.addEventListener('transitionend', function () {
        setIsAnimating(false);
        if (accordionContentRef.current) {
          accordionContentRef.current.style.removeProperty('height');
        }
      }, {
        once: true
      });
    }
    setTimeout(function () {
      if (accordionContentRef.current) {
        var finalHeight = nextIsExpanded ? accordionContentRef.current.scrollHeight : 0;
        accordionContentRef.current.style.height = "".concat(finalHeight.toString(), "px");
      }
    }, FAKE_TIMEOUT_RERENDER);
  };
  var mainClassName = (0, _cssClassNames.createCssClassNames)({
    'ids-accordion': true,
    'ids-accordion--is-animating': isAnimating,
    'ids-accordion--is-expanded': isExpanded
  });
  (0, _react.useEffect)(function () {
    setIsExpanded(initiallyExpanded);
  }, [initiallyExpanded]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: mainClassName
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-accordion__header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-accordion__header-content"
  }, header), /*#__PURE__*/_react["default"].createElement(_Expander.Expander, {
    collapseLabel: collapseLabel,
    expandLabel: expandLabel,
    hasIcon: true,
    isExpanded: isExpanded,
    onClick: changeExpanded,
    type: _Expander.ExpanderType.caret
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-accordion__content",
    ref: accordionContentRef
  }, isExpanded || isAnimating ? children : null));
};