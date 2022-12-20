import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/descriptions/style";
import _Descriptions from "antd/es/descriptions";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/row/style";
import _Row from "antd/es/row";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import React from 'react';
import styleScoped from "./index.less";
import TextArea from 'antd/lib/input/TextArea';
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Row, {
    className: styleScoped['antrow'],
    style: props === null || props === void 0 ? void 0 : props.style
  }, /*#__PURE__*/React.createElement(_Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(_Descriptions, _objectSpread(_objectSpread({
    size: "small"
  }, props), {}, {
    style: {}
  }), itemList === null || itemList === void 0 ? void 0 : itemList.map(function (item, index) {
    return /*#__PURE__*/React.createElement(_Descriptions.Item, {
      span: item === null || item === void 0 ? void 0 : item.span,
      label: (item === null || item === void 0 ? void 0 : item.rules) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: styleScoped['itemrequired']
      }, "* "), item.label) : item.label,
      key: index,
      className: styleScoped['antdescriptionsitem'],
      labelStyle: _objectSpread(_objectSpread({}, labelstyle), props === null || props === void 0 ? void 0 : props.labelStyle)
    }, /*#__PURE__*/React.createElement(_Form.Item, {
      className: styleScoped['antformitem'],
      name: item.name,
      rules: item === null || item === void 0 ? void 0 : item.rules
    }, (item === null || item === void 0 ? void 0 : item.customRender) || ((item === null || item === void 0 ? void 0 : item.type) == 'input' ? /*#__PURE__*/React.createElement(_Input, {
      placeholder: "\u8BF7\u8F93\u5165".concat(item.label)
    }) : /*#__PURE__*/React.createElement(TextArea, {
      autoSize: true,
      style: {
        border: 0,
        padding: 0
      }
    }))));
  }), itemList.length % parseInt(column + '') == 0 || fillLine ? '' : /*#__PURE__*/React.createElement("div", null))), extraComponents && /*#__PURE__*/React.createElement(_Col, {
    flex: "100px",
    style: {
      textAlign: 'end'
    }
  }, extraComponents)));
};
export default SchemaDescribe;