"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input/style");
var _input = _interopRequireDefault(require("antd/es/input"));
require("antd/es/form/style");
var _form = _interopRequireDefault(require("antd/es/form"));
require("antd/es/descriptions/style");
var _descriptions = _interopRequireDefault(require("antd/es/descriptions"));
require("antd/es/col/style");
var _col = _interopRequireDefault(require("antd/es/col"));
require("antd/es/row/style");
var _row = _interopRequireDefault(require("antd/es/row"));
var _react = _interopRequireDefault(require("react"));
var _index = _interopRequireDefault(require("./index.less"));
var _TextArea = _interopRequireDefault(require("antd/lib/input/TextArea"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SchemaDescribe = function SchemaDescribe(props) {
  var itemList = props.itemList,
    extraComponents = props.extraComponents,
    _props$column = props.column,
    column = _props$column === void 0 ? 3 : _props$column,
    _props$fillLine = props.fillLine,
    fillLine = _props$fillLine === void 0 ? false : _props$fillLine,
    _props$labelAlign = props.labelAlign,
    labelAlign = _props$labelAlign === void 0 ? 'left' : _props$labelAlign;
  var labelstyle = labelAlign == 'right' ? {
    justifyContent: 'flex-end',
    width: '120px'
  } : {};
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_row.default, {
    className: _index.default['antrow'],
    style: props === null || props === void 0 ? void 0 : props.style
  }, /*#__PURE__*/_react.default.createElement(_col.default, {
    flex: "auto"
  }, /*#__PURE__*/_react.default.createElement(_descriptions.default, _objectSpread(_objectSpread({
    size: "small"
  }, props), {}, {
    style: {}
  }), itemList === null || itemList === void 0 ? void 0 : itemList.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement(_descriptions.default.Item, {
      span: item === null || item === void 0 ? void 0 : item.span,
      label: (item === null || item === void 0 ? void 0 : item.rules) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
        className: _index.default['itemrequired']
      }, "* "), item.label) : item.label,
      key: index,
      className: _index.default['antdescriptionsitem'],
      labelStyle: _objectSpread(_objectSpread({}, labelstyle), props === null || props === void 0 ? void 0 : props.labelStyle)
    }, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
      className: _index.default['antformitem'],
      name: item.name,
      rules: item === null || item === void 0 ? void 0 : item.rules
    }, (item === null || item === void 0 ? void 0 : item.customRender) || ((item === null || item === void 0 ? void 0 : item.type) == 'input' ? /*#__PURE__*/_react.default.createElement(_input.default, {
      placeholder: "\u8BF7\u8F93\u5165".concat(item.label)
    }) : /*#__PURE__*/_react.default.createElement(_TextArea.default, {
      autoSize: true,
      style: {
        border: 0,
        padding: 0
      }
    }))));
  }), itemList.length % parseInt(column + '') == 0 || fillLine ? '' : /*#__PURE__*/_react.default.createElement("div", null))), extraComponents && /*#__PURE__*/_react.default.createElement(_col.default, {
    flex: "100px",
    style: {
      textAlign: 'end'
    }
  }, extraComponents)));
};
var _default = SchemaDescribe;
exports.default = _default;