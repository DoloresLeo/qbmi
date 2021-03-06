import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/radio/style";
import _Radio from "antd/es/radio";
import "antd/es/form/style";
import _Form from "antd/es/form";
import "antd/es/tree-select/style";
import _TreeSelect from "antd/es/tree-select";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect } from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies

import moment from 'moment';
import { isFunction, pickBy, isObject, flatMap } from 'lodash';
import Select from '../../Select';
import CustTreeSelect from '../../TreeSelect';
import './index.less';
var RangePicker = _DatePicker.RangePicker;
var SHOW_PARENT = _TreeSelect.SHOW_PARENT;

var StandardForm = function StandardForm(props) {
  var handleFinish = props.onFinish,
      options = props.options,
      formLayout = props.formLayout,
      initialValues = props.initialValues,
      onValuesChange = props.onValuesChange,
      _props$format = props.format,
      format = _props$format === void 0 ? 'YYYY-MM-DD' : _props$format,
      onFormReset = props.onFormReset;

  var _Form$useForm = _Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  useEffect(function () {
    var thisValues = {};

    if (initialValues) {
      Object.keys(initialValues).forEach(function (item) {
        if (isObject(initialValues[item])) {
          if (initialValues[item].type === 'time') {
            thisValues["time-".concat(item)] = moment(initialValues[item].value);
          } else {
            thisValues[item] = initialValues[item];
          }
        } else {
          thisValues[item] = initialValues[item];
        }
      });
      form.setFieldsValue(thisValues);
    }
  }, [initialValues]); // 重置

  var timeArr = {};

  var onFinish = function onFinish(values, refresh) {
    var newValues = {};
    Object.keys(values).forEach(function (item) {
      if (item.indexOf('times-') >= 0) {
        var name = item.split('-')[1];
        newValues[timeArr[name][0]] = values[item] && values[item][0] ? values[item][0].format(format) : '';
        newValues[timeArr[name][1]] = values[item] && values[item][1] ? values[item][1].format(format) : '';
      } else if (item.indexOf('time-') >= 0) {
        var _name = item.split('-')[1]; // if (newValues[name]) {

        newValues[_name] = values[item] ? values[item].format(format) : ''; // }
      } else if (isObject(values[item]) && values[item].label) {
        newValues[item] = values[item].value || values[item].key;
      } else {
        newValues[item] = values[item];
      }
    });
    return isFunction(handleFinish) && handleFinish(pickBy(newValues, function (value) {
      return value !== undefined || value !== null;
    }), refresh);
  };

  var onReset = function onReset() {
    form.resetFields();
    var values = form.getFieldsValue();

    if (onFormReset) {
      onFinish(values, 'no');
      onFormReset();
    } else {
      onFinish(values);
    }
  }; // 提交
  // 校验未通过


  var onFinishFailed = function onFinishFailed(errorInfo) {
    return isFunction(handleFinish) && handleFinish(errorInfo);
  };

  // 渲染单选按钮选项
  var renderRadio = function renderRadio() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return list.map(function (item) {
      return /*#__PURE__*/React.createElement(_Radio, {
        key: item.value,
        value: item.value
      }, item.text);
    });
  };

  // 渲染菜单项
  var renderItems = function renderItems(item) {
    var tProps = null; // let comWidth = 272;
    // return list.map(item => {

    var FormItem = /*#__PURE__*/React.createElement(_Input, {
      placeholder: item.placeholder,
      allowClear: true,
      className: "searchForm-field"
    });

    switch (item.type) {
      case 'select':
        FormItem = /*#__PURE__*/React.createElement(Select, {
          selectProps: _objectSpread({
            allowClear: true,
            className: 'searchForm-field'
          }, item.selectProps),
          options: item.options,
          dataServer: item.dataServer
        });
        break;

      case 'rangePicker':
        FormItem = /*#__PURE__*/React.createElement(RangePicker, {
          allowClear: true,
          format: item.format || 'YYYY-MM-DD',
          showTime: item.showTime // showTime={{
          //   hideDisabledOptions: true,
          //   defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
          // }}
          ,
          className: "searchForm-field"
        });
        break;

      case 'inputNumber':
        FormItem = /*#__PURE__*/React.createElement(_InputNumber, {
          className: "searchForm-field"
        });
        break;

      case 'textArea':
        FormItem = /*#__PURE__*/React.createElement(_Input.TextArea, {
          allowClear: true,
          className: "searchForm-field"
        });
        break;

      case 'datePicker':
        FormItem = /*#__PURE__*/React.createElement(_DatePicker, {
          // defaultValue={
          //   initialValues && initialValues[`time-${item.name}`]
          //     ? moment(initialValues[`time-${item.name}`])
          //     : null
          // }
          allowClear: true,
          key: item.picker,
          picker: item.picker || 'date',
          format: format,
          showTime: item.showTime,
          className: "searchForm-field"
        });
        break;

      case 'radio':
        FormItem = /*#__PURE__*/React.createElement(_Radio.Group, {
          defaultValue: initialValues && initialValues[item.name] ? initialValues[item.name] : null
        }, renderRadio(item.options));
        break;

      case 'treeSelect':
        tProps = {
          allowClear: true,
          treeData: item.treeData,
          showCheckedStrategy: SHOW_PARENT,
          placeholder: item.placeholder
        };
        FormItem = /*#__PURE__*/React.createElement(_TreeSelect, _extends({}, tProps, {
          className: "searchForm-field"
        }));
        break;

      case 'custTreeSelect':
        FormItem = /*#__PURE__*/React.createElement(CustTreeSelect, {
          allowClear: true,
          dataServer: item.dataServer,
          transformOptions: item.transformOptions,
          callback: item.callback,
          className: "searchForm-field",
          placeholder: (item === null || item === void 0 ? void 0 : item.placeholder) || '请选择'
        });
        break;

      default:
        break;
    }

    var name = item.name;

    if (item.type === 'rangePicker') {
      timeArr[item.name] = item.timeArr || ['StartTime', 'EndTime'];
      name = "times-".concat(item.name);
    } else if (item.type === 'datePicker') {
      name = "time-".concat(item.name);
    }

    var formSpan;
    var colSpan;

    if (item.formSpan === false) {
      formSpan = {};
    } else if (_typeof(item.formSpan) !== 'object') {
      formSpan = {
        span: item.formSpan || 6
      };
    } else {
      // eslint-disable-next-line prefer-destructuring
      formSpan = item.formSpan;
    }

    if (_typeof(item.colSpan) !== 'object') {
      colSpan = {
        span: item.colSpan || 6
      };
    } else {
      // eslint-disable-next-line prefer-destructuring
      colSpan = item.colSpan;
    }

    return item.type !== 'inputNumberRange' ? /*#__PURE__*/React.createElement(_Col, _extends({
      key: item.name
    }, colSpan), /*#__PURE__*/React.createElement(_Form.Item, {
      label: item.label,
      name: name,
      rules: Array.isArray(item.rules) ? item.rules : [],
      style: item.style || {},
      labelCol: _objectSpread({}, formSpan)
    }, FormItem)) : /*#__PURE__*/React.createElement(_Col, _extends({
      key: item.name
    }, colSpan), /*#__PURE__*/React.createElement(_Form.Item, {
      label: item.label,
      labelCol: _objectSpread({}, formSpan),
      style: {
        marginBottom: 0
      }
    }, /*#__PURE__*/React.createElement(_Form.Item, {
      name: item.names[0],
      rules: [{
        required: false
      }],
      style: {
        display: 'inline-block'
      }
    }, /*#__PURE__*/React.createElement(_InputNumber, null)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        height: '32px',
        lineHeight: '32px',
        margin: '0 8px 0 8px'
      }
    }, "\u81F3"), /*#__PURE__*/React.createElement(_Form.Item, {
      name: item.names[1],
      rules: [{
        required: false
      }],
      style: {
        display: 'inline-block'
      }
    }, /*#__PURE__*/React.createElement(_InputNumber, null)))); // });
  }; // 渲染表单行


  var renderRow = function renderRow(list) {
    // eslint-disable-next-line no-undef
    var fieldsArr = Array.isArray(list) ? flatMap(list, function (item) {
      return item;
    }) : [];
    return fieldsArr.length ? /*#__PURE__*/React.createElement(_Row, {
      gutter: 24
    }, fieldsArr.map(function (item) {
      return renderItems(item);
    })) : null;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "search-form"
  }, /*#__PURE__*/React.createElement(_Form, {
    form: form,
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
    layout: formLayout,
    onValuesChange: onValuesChange
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-btns btns"
  }, /*#__PURE__*/React.createElement(_Button, {
    type: "primary",
    htmlType: "submit"
  }, "\u67E5\u8BE2"), /*#__PURE__*/React.createElement(_Button, {
    onClick: onReset
  }, "\u91CD\u7F6E")), /*#__PURE__*/React.createElement("div", {
    className: "search-content"
  }, renderRow(options))));
}; // StandardForm.defaultValue = {
//   format: 'YYYY-MM-DD HH:mm',
// };


export default StandardForm;