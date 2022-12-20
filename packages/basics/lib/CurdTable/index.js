"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/table/style");
var _table = _interopRequireDefault(require("antd/es/table"));
require("antd/es/card/style");
var _card = _interopRequireDefault(require("antd/es/card"));
var _react = _interopRequireWildcard(require("react"));
var _SearchForm = _interopRequireDefault(require("../SearchForm"));
require("./index.less");
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
var CurdTable = function CurdTable(props) {
  var request = props.request,
    pagination = props.pagination,
    expressionAt = props.expressionAt,
    toolBarRender = props.toolBarRender,
    _props$isSearch = props.isSearch,
    isSearch = _props$isSearch === void 0 ? true : _props$isSearch;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    sorter = _useState6[0],
    setSorter = _useState6[1];
  var _useState7 = (0, _react.useState)({
      current: 1,
      pageSize: 50
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    params = _useState8[0],
    setParams = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    total = _useState10[0],
    setTotal = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedRowKeys = _useState12[0],
    setSelectedRowKeys = _useState12[1];
  var getData = function getData() {
    setLoading(true);
    request(params, sorter).then(function (res) {
      setTotal((res === null || res === void 0 ? void 0 : res.total) || 0);
      setData((res === null || res === void 0 ? void 0 : res.data) || []);
      setLoading(false);
    }).catch(function () {
      setLoading(false);
    });
  };
  // 分页默认逻辑，可修改
  var paginationProps = _objectSpread({
    // showQuickJumper: true,
    showSizeChanger: true,
    total: total,
    showTotal: function showTotal() {
      return "\u5171".concat(total, "\u6761\u8BB0\u5F55");
    }
  }, params);
  var handleChangeTable = function handleChangeTable(pagination, _, sorter) {
    setParams({
      current: pagination.current,
      pageSize: pagination.pageSize
    });
    setSorter(sorter);
  };
  var handleSearch = function handleSearch(value) {
    var temp = _objectSpread(_objectSpread({}, params), value);
    Object.keys(temp).forEach(function (item) {
      if (!temp[item]) delete temp[item];
    });
    setParams(temp);
  };
  (0, _react.useEffect)(function () {
    var _props$rowSelection;
    setSelectedRowKeys((props === null || props === void 0 ? void 0 : (_props$rowSelection = props.rowSelection) === null || _props$rowSelection === void 0 ? void 0 : _props$rowSelection.selectedList) || []);
  }, []);
  (0, _react.useEffect)(function () {
    getData();
  }, [params]);
  var onSelectChange = function onSelectChange(newSelectedRowKeys, selectedRows) {
    var _props$rowSelection2, _props$rowSelection2$;
    setSelectedRowKeys(newSelectedRowKeys);
    props === null || props === void 0 ? void 0 : (_props$rowSelection2 = props.rowSelection) === null || _props$rowSelection2 === void 0 ? void 0 : (_props$rowSelection2$ = _props$rowSelection2.onChange) === null || _props$rowSelection2$ === void 0 ? void 0 : _props$rowSelection2$.call(_props$rowSelection2, newSelectedRowKeys, selectedRows);
  };
  var rowSelectionS = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange
  };
  return /*#__PURE__*/_react.default.createElement(_card.default, null, isSearch && /*#__PURE__*/_react.default.createElement(_SearchForm.default, {
    linenum: props === null || props === void 0 ? void 0 : props.linenum,
    formRef: props === null || props === void 0 ? void 0 : props.formRef,
    getData: handleSearch,
    columns: expressionAt === null || expressionAt === void 0 ? void 0 : expressionAt.columns
  }), toolBarRender, /*#__PURE__*/_react.default.createElement(_table.default, _objectSpread(_objectSpread({
    rowKey: props === null || props === void 0 ? void 0 : props.rowKey,
    loading: loading,
    rowSelection: (props === null || props === void 0 ? void 0 : props.rowSelection) && rowSelectionS,
    /* 通过新申明将默认项覆盖 */
    style: {
      marginTop: 20
    },
    dataSource: data,
    pagination: _objectSpread(_objectSpread({}, paginationProps), pagination)
  }, expressionAt), {}, {
    columns: expressionAt.columns.filter(function (item) {
      return !(item === null || item === void 0 ? void 0 : item.hideTable);
    }),
    onChange: handleChangeTable
  })));
};
var _default = CurdTable;
exports.default = _default;