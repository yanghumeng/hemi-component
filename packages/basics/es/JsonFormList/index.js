import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/form/style";
import _Form from "antd/es/form";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
var JsonFormList = function JsonFormList(props) {
  var _props$initValues = props.initValues,
    initValues = _props$initValues === void 0 ? [] : _props$initValues,
    name = props.name,
    title = props.title,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    _props$layout = props.layout,
    layout = _props$layout === void 0 ? {} : _props$layout,
    _props$itemNumber = props.itemNumber,
    itemNumber = _props$itemNumber === void 0 ? 0 : _props$itemNumber;
  return /*#__PURE__*/React.createElement(_Form.List, {
    name: name
  }, function (fields, _ref) {
    var add = _ref.add,
      remove = _ref.remove;
    return /*#__PURE__*/React.createElement(React.Fragment, null, fields.map(function (field, index) {
      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, /*#__PURE__*/React.createElement(_Row, {
        key: field.key,
        wrap: false
      }, /*#__PURE__*/React.createElement(_Col, {
        flex: "auto"
      }, initValues.map(function (item, index) {
        return /*#__PURE__*/React.createElement(_Form.Item, _objectSpread(_objectSpread({}, field), {}, {
          label: item.label,
          name: [field.name, item.name],
          rules: item === null || item === void 0 ? void 0 : item.rules,
          key: index,
          initialValue: item.initValue
        }, layout), item.type == 'custom' ? item.customRender : /*#__PURE__*/React.createElement(_Input, {
          placeholder: "\u8BF7\u8F93\u5165".concat(item.label)
        }));
      })), /*#__PURE__*/React.createElement(_Col, {
        flex: "40px"
      }, fields.length > itemNumber ? /*#__PURE__*/React.createElement(MinusCircleOutlined, {
        style: {
          fontSize: '20px',
          position: 'absolute',
          bottom: '30px',
          marginLeft: '10px',
          color: 'red'
        },
        onClick: function onClick() {
          return remove(field.name);
        }
      }) : null)));
    }), /*#__PURE__*/React.createElement(_Row, null, /*#__PURE__*/React.createElement(_Button, {
      type: "dashed",
      onClick: (props === null || props === void 0 ? void 0 : props.customAdd) && function () {
        var _props$customAdd;
        return (_props$customAdd = props.customAdd) === null || _props$customAdd === void 0 ? void 0 : _props$customAdd.call(props, add);
      } || function () {
        return add();
      },
      block: true,
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null)
    }, title || '添加')));
  });
};
export default JsonFormList;