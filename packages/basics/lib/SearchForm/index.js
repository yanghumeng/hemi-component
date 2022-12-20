"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/button/style");
var _button = _interopRequireDefault(require("antd/es/button"));
require("antd/es/row/style");
var _row = _interopRequireDefault(require("antd/es/row"));
require("antd/es/input/style");
var _input = _interopRequireDefault(require("antd/es/input"));
require("antd/es/col/style");
var _col = _interopRequireDefault(require("antd/es/col"));
require("antd/es/form/style");
var _form = _interopRequireDefault(require("antd/es/form"));
var _react = _interopRequireWildcard(require("react"));
var _icons = require("@ant-design/icons");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var FormItem = _form.default.Item;
var SearchForm = function SearchForm(props) {
  var _renderFormItem, _renderFormItem$props, _renderFormItem2, _renderFormItem2$prop, _renderFormItem2$prop2, _renderFormItem2$prop3, _renderFormItem3, _renderFormItem3$prop;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    paramExpand = _useState2[0],
    setParamExpand = _useState2[1];
  var getData = props.getData,
    columns = props.columns,
    _props$linenum = props.linenum,
    linenum = _props$linenum === void 0 ? 2 : _props$linenum;
  var _ref = (props === null || props === void 0 ? void 0 : props.formRef) || _form.default.useForm(),
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
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, columns === null || columns === void 0 ? void 0 : (_columns$filter = columns.filter(function (item) {
      return !(item === null || item === void 0 ? void 0 : item.hideSearch);
    })) === null || _columns$filter === void 0 ? void 0 : _columns$filter.map(function (item, index) {
      var _item$hideSearch = item.hideSearch,
        hideSearch = _item$hideSearch === void 0 ? false : _item$hideSearch;
      if (item === null || item === void 0 ? void 0 : item.renderSearchItem) {
        return /*#__PURE__*/_react.default.createElement(_col.default, {
          md: 6,
          sm: 24,
          key: index
        }, /*#__PURE__*/_react.default.createElement(FormItem, {
          label: (item === null || item === void 0 ? void 0 : item.searchTitle) || (item === null || item === void 0 ? void 0 : item.title),
          name: item === null || item === void 0 ? void 0 : item.dataIndex
        }, ((item === null || item === void 0 ? void 0 : item.searchIndex) || (item === null || item === void 0 ? void 0 : item.dataIndex)) && (item === null || item === void 0 ? void 0 : item.renderSearchItem())));
      }
      return hideSearch || /*#__PURE__*/_react.default.createElement(_col.default, {
        md: 6,
        sm: 24,
        key: index
      }, /*#__PURE__*/_react.default.createElement(FormItem, {
        label: (item === null || item === void 0 ? void 0 : item.searchTitle) || (item === null || item === void 0 ? void 0 : item.title),
        name: item === null || item === void 0 ? void 0 : item.dataIndex
      }, ((item === null || item === void 0 ? void 0 : item.searchIndex) || (item === null || item === void 0 ? void 0 : item.dataIndex)) && /*#__PURE__*/_react.default.createElement(_input.default, {
        placeholder: (item === null || item === void 0 ? void 0 : item.placeholder) || '请输入',
        autoComplete: "off"
      })));
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_form.default, _objectSpread(_objectSpread({
    form: form
  }, formItemLayout), {}, {
    onFinish: handleSearch
  }), /*#__PURE__*/_react.default.createElement(_row.default, {
    gutter: 6
  }, paramExpand ? (_renderFormItem = renderFormItem()) === null || _renderFormItem === void 0 ? void 0 : (_renderFormItem$props = _renderFormItem.props) === null || _renderFormItem$props === void 0 ? void 0 : _renderFormItem$props.children.map(function (item) {
    return item;
  }) : (_renderFormItem2 = renderFormItem()) === null || _renderFormItem2 === void 0 ? void 0 : (_renderFormItem2$prop = _renderFormItem2.props) === null || _renderFormItem2$prop === void 0 ? void 0 : (_renderFormItem2$prop2 = _renderFormItem2$prop.children) === null || _renderFormItem2$prop2 === void 0 ? void 0 : (_renderFormItem2$prop3 = _renderFormItem2$prop2.slice(0, linenum * 4 - 1)) === null || _renderFormItem2$prop3 === void 0 ? void 0 : _renderFormItem2$prop3.map(function (item) {
    return item;
  }), /*#__PURE__*/_react.default.createElement(_col.default, {
    md: columns.length <= linenum * 4 - 1 || paramExpand ? 24 - columns.length % 4 * 6 : 6,
    sm: 24
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'end',
      lineHeight: '40px'
    }
  }, ((_renderFormItem3 = renderFormItem()) === null || _renderFormItem3 === void 0 ? void 0 : (_renderFormItem3$prop = _renderFormItem3.props) === null || _renderFormItem3$prop === void 0 ? void 0 : _renderFormItem3$prop.children.length) > linenum * 4 - 1 && /*#__PURE__*/_react.default.createElement("a", {
    style: {
      marginRight: '20px'
    },
    onClick: function onClick() {
      setExpand(!paramExpand);
    }
  }, paramExpand ? /*#__PURE__*/_react.default.createElement(_icons.CaretUpOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.CaretDownOutlined, null), paramExpand ? '收起' : '展开'), /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary",
    htmlType: "submit"
  }, "\u67E5\u8BE2"), /*#__PURE__*/_react.default.createElement(_button.default, {
    style: {
      marginLeft: 8,
      marginRight: 8
    },
    onClick: handleFormReset
  }, "\u91CD\u7F6E")))));
};
var _default = SearchForm;
exports.default = _default;