import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/form/style";
import _Form from "antd/es/form";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// SearchForm
import React, { useState } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
var FormItem = _Form.Item;
var SearchForm = function SearchForm(props) {
  var _renderFormItem, _renderFormItem$props, _renderFormItem2, _renderFormItem2$prop, _renderFormItem2$prop2, _renderFormItem2$prop3, _renderFormItem3, _renderFormItem3$prop;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    paramExpand = _useState2[0],
    setParamExpand = _useState2[1];
  var getData = props.getData,
    columns = props.columns,
    _props$linenum = props.linenum,
    linenum = _props$linenum === void 0 ? 2 : _props$linenum;
  var _ref = (props === null || props === void 0 ? void 0 : props.formRef) || _Form.useForm(),
    _ref2 = _slicedToArray(_ref, 1),
    form = _ref2[0];
  var formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  var setExpand = function setExpand(expand) {
    setParamExpand(expand);
  };
  var handleSearch = function handleSearch(value) {
    form.validateFields().then(function (values) {
      getData(_objectSpread(_objectSpread({}, values), value));
    });
  };
  // 查询重置
  var handleFormReset = function handleFormReset() {
    form.resetFields();
    handleSearch({
      current: 1
    });
  };
  // 渲染search表单项
  var renderFormItem = function renderFormItem() {
    var _columns$filter;
    return /*#__PURE__*/React.createElement(React.Fragment, null, columns === null || columns === void 0 ? void 0 : (_columns$filter = columns.filter(function (item) {
      return !(item === null || item === void 0 ? void 0 : item.hideSearch);
    })) === null || _columns$filter === void 0 ? void 0 : _columns$filter.map(function (item, index) {
      var _item$hideSearch = item.hideSearch,
        hideSearch = _item$hideSearch === void 0 ? false : _item$hideSearch;
      if (item === null || item === void 0 ? void 0 : item.renderSearchItem) {
        return /*#__PURE__*/React.createElement(_Col, {
          md: 6,
          sm: 24,
          key: index
        }, /*#__PURE__*/React.createElement(FormItem, {
          label: (item === null || item === void 0 ? void 0 : item.searchTitle) || (item === null || item === void 0 ? void 0 : item.title),
          name: item === null || item === void 0 ? void 0 : item.dataIndex
        }, ((item === null || item === void 0 ? void 0 : item.searchIndex) || (item === null || item === void 0 ? void 0 : item.dataIndex)) && (item === null || item === void 0 ? void 0 : item.renderSearchItem())));
      }
      return hideSearch || /*#__PURE__*/React.createElement(_Col, {
        md: 6,
        sm: 24,
        key: index
      }, /*#__PURE__*/React.createElement(FormItem, {
        label: (item === null || item === void 0 ? void 0 : item.searchTitle) || (item === null || item === void 0 ? void 0 : item.title),
        name: item === null || item === void 0 ? void 0 : item.dataIndex
      }, ((item === null || item === void 0 ? void 0 : item.searchIndex) || (item === null || item === void 0 ? void 0 : item.dataIndex)) && /*#__PURE__*/React.createElement(_Input, {
        placeholder: (item === null || item === void 0 ? void 0 : item.placeholder) || '请输入',
        autoComplete: "off"
      })));
    }));
  };
  return /*#__PURE__*/React.createElement(_Form, _objectSpread(_objectSpread({
    form: form
  }, formItemLayout), {}, {
    onFinish: handleSearch
  }), /*#__PURE__*/React.createElement(_Row, {
    gutter: 6
  }, paramExpand ? (_renderFormItem = renderFormItem()) === null || _renderFormItem === void 0 ? void 0 : (_renderFormItem$props = _renderFormItem.props) === null || _renderFormItem$props === void 0 ? void 0 : _renderFormItem$props.children.map(function (item) {
    return item;
  }) : (_renderFormItem2 = renderFormItem()) === null || _renderFormItem2 === void 0 ? void 0 : (_renderFormItem2$prop = _renderFormItem2.props) === null || _renderFormItem2$prop === void 0 ? void 0 : (_renderFormItem2$prop2 = _renderFormItem2$prop.children) === null || _renderFormItem2$prop2 === void 0 ? void 0 : (_renderFormItem2$prop3 = _renderFormItem2$prop2.slice(0, linenum * 4 - 1)) === null || _renderFormItem2$prop3 === void 0 ? void 0 : _renderFormItem2$prop3.map(function (item) {
    return item;
  }), /*#__PURE__*/React.createElement(_Col, {
    md: columns.length <= linenum * 4 - 1 || paramExpand ? 24 - columns.length % 4 * 6 : 6,
    sm: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'end',
      lineHeight: '40px'
    }
  }, ((_renderFormItem3 = renderFormItem()) === null || _renderFormItem3 === void 0 ? void 0 : (_renderFormItem3$prop = _renderFormItem3.props) === null || _renderFormItem3$prop === void 0 ? void 0 : _renderFormItem3$prop.children.length) > linenum * 4 - 1 && /*#__PURE__*/React.createElement("a", {
    style: {
      marginRight: '20px'
    },
    onClick: function onClick() {
      setExpand(!paramExpand);
    }
  }, paramExpand ? /*#__PURE__*/React.createElement(CaretUpOutlined, null) : /*#__PURE__*/React.createElement(CaretDownOutlined, null), paramExpand ? '收起' : '展开'), /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    htmlType: "submit"
  }, "\u67E5\u8BE2"), /*#__PURE__*/React.createElement(_Button, {
    style: {
      marginLeft: 8,
      marginRight: 8
    },
    onClick: handleFormReset
  }, "\u91CD\u7F6E")))));
};
export default SearchForm;