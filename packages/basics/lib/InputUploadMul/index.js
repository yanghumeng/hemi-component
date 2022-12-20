"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UploadPicture;
require("antd/es/image/style");
var _image = _interopRequireDefault(require("antd/es/image"));
require("antd/es/upload/style");
var _upload = _interopRequireDefault(require("antd/es/upload"));
require("antd/es/input/style");
var _input = _interopRequireDefault(require("antd/es/input"));
require("antd/es/message/style");
var _message2 = _interopRequireDefault(require("antd/es/message"));
var _react = _interopRequireWildcard(require("react"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _icons = require("@ant-design/icons");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function UploadPicture(props) {
  var _props$len = props.len,
    len = _props$len === void 0 ? 1 : _props$len,
    onChange = props.onChange,
    title = props.title,
    _props$inputStyle = props.inputStyle,
    inputStyle = _props$inputStyle === void 0 ? {} : _props$inputStyle;
  var inputRequest = props.inputRequest;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    fileList = _useState2[0],
    setFileList = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    results = _useState4[0],
    setResults = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    previewVisible = _useState6[0],
    setPreviewVisible = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    previewImage = _useState8[0],
    setPreViewImage = _useState8[1];
  var _useState9 = (0, _react.useState)(0.5),
    _useState10 = _slicedToArray(_useState9, 2),
    scaleStep = _useState10[0],
    setScaleStep = _useState10[1];
  var _useState11 = (0, _react.useState)(),
    _useState12 = _slicedToArray(_useState11, 2),
    inputValue = _useState12[0],
    setInputValue = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    uploading = _useState14[0],
    setuploading = _useState14[1];
  (0, _react.useEffect)(function () {
    setFileList((props === null || props === void 0 ? void 0 : props.fileList) ? props.fileList : []);
    setResults((props === null || props === void 0 ? void 0 : props.fileList) ? props.fileList : []);
  }, [props === null || props === void 0 ? void 0 : props.fileList]);
  (0, _react.useEffect)(function () {
    onChange && onChange(results);
    if (results.length == 0) {
      setInputValue('');
    }
  }, [results]);
  /** 文件转化成64位 */
  var getBase64 = function getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return resolve(reader.result);
      };
      reader.onerror = function (error) {
        return reject(error);
      };
    });
  };
  /** 图片预览 */
  var handlePreview = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!file.url && !file.preview)) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return getBase64(file.originFileObj);
            case 3:
              file.preview = _context.sent;
            case 4:
              setPreViewImage(file.url || file.preview);
              setPreviewVisible(true);
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function handlePreview(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /** 改变图片的回调 */
  var handleChange = function handleChange(info) {
    if (info.fileList.length <= len) {
      (function () {
        var resultarr = info.fileList;
        var oldarr = resultarr.filter(function (item) {
          return item.status === 'done' || item.status === 'success';
        });
        if (oldarr.length == resultarr.length) {
          var _loop = function _loop(index) {
            var element = resultarr[index];
            var percent = element.percent,
              status = element.status,
              name = element.name,
              type = element.type;
            if (status === 'done' && percent == 100) {
              var file = new window.File([element], name, {
                type: type
              });
              var formData = new FormData();
              formData.append('file', file);
              inputRequest(formData).then(function (response) {
                if (response.f > 0) {
                  element.status = 'success';
                  element.res = response.d;
                  setResults(_toConsumableArray(resultarr));
                } else {
                  element.status = 'error';
                }
              }).catch(function () {
                element.status = 'error';
              });
            }
          };
          for (var index = 0; index < resultarr.length; index++) {
            _loop(index);
          }
        }
        if (info.file.status === 'removed') {
          setResults(_toConsumableArray(resultarr));
        }
        if (info.file.status === 'error') {
          _message2.default.error('有文件上传失败,请重试');
        }
        resultarr = resultarr.filter(function (el) {
          return el.status !== 'error';
        });
        setFileList(_toConsumableArray(resultarr));
      })();
    }
  };
  /** 上传之前的回调 */
  var beforeUpload = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_, fileListU) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", !outLimit([].concat(_toConsumableArray(fileList), _toConsumableArray(fileListU)), len));
            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function beforeUpload(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**是否查出数量限制 */
  var outLimit = function outLimit(fileList, len) {
    if (fileList.length > len) {
      _message2.default.warning("\u6587\u4EF6\u6570\u91CF\u9650\u5236".concat(len));
      return true;
    }
    return false;
  };
  /** 粘贴快捷键的回调 */
  var onPaste = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
      var _e$originalEvent;
      var clipboardData, i, items, item, types, imgItem, newFileList, listItem, file, formData;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!uploading) {
                _context3.next = 3;
                break;
              }
              _message2.default.warning("\u5DF2\u6709\u6587\u4EF6\u6B63\u5728\u4E0A\u4F20");
              return _context3.abrupt("return");
            case 3:
              if (!(len >= 2 && fileList.length >= len)) {
                _context3.next = 6;
                break;
              }
              _message2.default.warning("\u6587\u4EF6\u6570\u91CF\u9650\u5236".concat(len));
              return _context3.abrupt("return");
            case 6:
              /** 获取剪切板的数据clipboardData */
              clipboardData = (e === null || e === void 0 ? void 0 : e.clipboardData) || (e === null || e === void 0 ? void 0 : (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.clipboardData), i = 0;
              /** 为空判断 */
              if (!clipboardData) {
                _context3.next = 36;
                break;
              }
              items = clipboardData.items;
              if (items) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return");
            case 11:
              item = items[0];
              types = clipboardData.types || [];
              /** 遍历剪切板的数据 */
            case 13:
              if (!(i < types.length)) {
                _context3.next = 20;
                break;
              }
              if (!(types[i] === 'Files')) {
                _context3.next = 17;
                break;
              }
              item = items[i];
              return _context3.abrupt("break", 20);
            case 17:
              i++;
              _context3.next = 13;
              break;
            case 20:
              if (!(item && item.kind === 'file' && item.type.match(/^image\//i))) {
                _context3.next = 36;
                break;
              }
              setuploading(true);
              imgItem = item.getAsFile();
              newFileList = (0, _cloneDeep.default)(results);
              _context3.t0 = _objectSpread;
              _context3.t1 = _objectSpread({}, imgItem);
              _context3.t2 = {};
              _context3.next = 29;
              return getBase64(imgItem);
            case 29:
              _context3.t3 = _context3.sent;
              _context3.t4 = {
                status: 'uploading',
                url: _context3.t3
              };
              listItem = (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t4);
              file = new window.File([imgItem], imgItem.name, {
                type: imgItem.type
              });
              formData = new FormData();
              formData.append('file', file);
              inputRequest && inputRequest(formData).then(function (res) {
                var data = (res === null || res === void 0 ? void 0 : res.data) || res;
                if (data && (data === null || data === void 0 ? void 0 : data.f) >= 1) {
                  listItem.status = 'success';
                  listItem.res = data === null || data === void 0 ? void 0 : data.d;
                  if (len === 1) {
                    setFileList([listItem]);
                    setResults([listItem]);
                    setuploading(false);
                    setInputValue(imgItem.name);
                    return;
                  }
                  setInputValue(imgItem.name);
                  newFileList.push(listItem);
                  setFileList(newFileList);
                  setResults(newFileList);
                } else {
                  _message2.default.error('上传失败,请重试');
                }
                setuploading(false);
              });
            case 36:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function onPaste(_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  /** 上传图片的文案 */
  var uploadButton = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 8
    }
  }, title || '图片上传'));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_input.default, {
    style: inputStyle,
    onPaste: onPaste,
    value: inputValue,
    placeholder: "\u8BF7\u5C06\u56FE\u7247\u7C98\u8D34\u5230\u8FD9\u91CC\u4E0A\u4F20",
    suffix: uploading ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : '',
    allowClear: true
  })), /*#__PURE__*/_react.default.createElement(_upload.default, _objectSpread(_objectSpread({}, props), {}, {
    listType: "picture-card",
    fileList: fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    maxCount: len
  }), fileList.length >= len ? null : uploadButton), /*#__PURE__*/_react.default.createElement(_image.default, {
    width: 200,
    style: {
      display: 'none'
    },
    src: previewImage,
    preview: {
      visible: previewVisible,
      scaleStep: scaleStep,
      src: previewImage,
      onVisibleChange: function onVisibleChange(value) {
        setPreviewVisible(value);
      }
    }
  }));
}