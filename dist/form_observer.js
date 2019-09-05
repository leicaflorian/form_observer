(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["form_observer"] = factory();
	else
		root["form_observer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

"function"!=typeof Object.assign&&(Object.assign=function(n){if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(n),t=1;t<arguments.length;t++){var e=arguments[t];if(null!=e)for(var o in e)e.hasOwnProperty(o)&&(r[o]=e[o])}return r});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){t=t||window;for(var i=0;i<this.length;i++)o.call(t,this[i],i,this)});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

!function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,window.CustomEvent=t)}();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

"function"!=typeof Object.entries&&(Object.entries=function(e){for(var t=Object.keys(e),n=t.length,r=new Array(n);n--;)r[n]=[t[n],e[t[n]]];return r});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/mdn-polyfills/Object.assign.js
var Object_assign = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/mdn-polyfills/NodeList.prototype.forEach.js
var NodeList_prototype_forEach = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/mdn-polyfills/CustomEvent.js
var mdn_polyfills_CustomEvent = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/mdn-polyfills/Object.entries.js
var Object_entries = __webpack_require__(3);

// CONCATENATED MODULE: ./src/core/ConsoleExtend.js
/* harmony default export */ var ConsoleExtend = (function (condition) {
  if (condition) {
    var _console;

    for (var _len = arguments.length, messages = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messages[_key - 1] = arguments[_key];
    }

    (_console = console).log.apply(_console, messages);
  }
});
// CONCATENATED MODULE: ./src/core/HTMLRadioGroup.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTMLRadioGroup =
/*#__PURE__*/
function () {
  /**
   * @param {*} radioInput 
   */
  function HTMLRadioGroup(radioInput) {
    _classCallCheck(this, HTMLRadioGroup);

    /**
     * @type {HTMLInputElement[]}
     */
    this._list = [];
    this.type = 'radio';
    this.localName = 'input';
    this.add(radioInput);
  }
  /**
   * 
   * @param {*} radioInput 
   */


  _createClass(HTMLRadioGroup, [{
    key: "add",
    value: function add(radioInput) {
      this._list.push(radioInput);
    }
    /**
     * 
     * @param {Event} e 
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(e) {
      var checkedRadio = this.checkedRadio;

      if (checkedRadio) {
        checkedRadio.dispatchEvent(e);
      }
    }
    /**
     * @param {string} type 
     * @param {EventListenerOrEventListenerObject} listener 
     * @param {boolean? | AddEventListenerOptions} options 
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener, options) {
      this._list.forEach(function (radioControl) {
        radioControl.addEventListener(type, listener, options);
      });
    }
  }, {
    key: "checkedRadio",
    get: function get() {
      var radioInput = this._list.filter(function (element) {
        return element.checked;
      });

      return radioInput[0];
    }
  }, {
    key: "value",
    get: function get() {
      var checkedRadio = this.checkedRadio;

      if (checkedRadio) {
        return checkedRadio.value;
      } else {
        return false;
      }
    },
    set: function set(value) {
      /**
       * @type {HTMLInputElement}
       */
      var radioToCheck = this._list.filter(function (element) {
        return element.value === value;
      })[0];

      if (radioToCheck) {
        radioToCheck.checked = true;
      } else {
        console.warn('The specified value was not found in the required RadioGroup.');
      }
    }
  }, {
    key: "checked",
    get: function get() {
      return !!this.checkedRadio;
    }
    /**
     * @param {*} el 
     * @return {HTMLRadioGroup}
     */

  }], [{
    key: "parse",
    value: function parse(el) {
      return el;
    }
  }]);

  return HTMLRadioGroup;
}();


// CONCATENATED MODULE: ./src/core/FormControlsCollection.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function FormControlsCollection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FormControlsCollection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FormControlsCollection_createClass(Constructor, protoProps, staticProps) { if (protoProps) FormControlsCollection_defineProperties(Constructor.prototype, protoProps); if (staticProps) FormControlsCollection_defineProperties(Constructor, staticProps); return Constructor; }






/**
 * @typedef { HTMLRadioGroup | HTMLInputElement | HTMLTextAreaElement } HTMLFormControlElement
 */

/**
 * I'm not using Proxy due to compatibility issues.
 * In fact this library is compatible even with IE9.
 */

var FormControlsCollection_FormControlsCollection =
/*#__PURE__*/
function () {
  /**
   * @param {HTMLElement | HTMLFormElement} target
   * @param {Object?} settings
   */
  function FormControlsCollection(target, settings) {
    FormControlsCollection_classCallCheck(this, FormControlsCollection);

    /**
     * @private
     */
    this._settings = {
      controlsSelector: ['input:not([type="button"]):not([type="submit"]):not([type="reset"])', 'textarea', 'select'],
      triggerChangeOnSetter: false,
      consoleVerbose: false
    };

    if (settings) {
      Object.assign(this._settings, settings);
    }
    /**
     * @private
     * @type {HTMLElement | HTMLFormElement}
     */


    this._target = target;
    /**
     * @private
     * @type {Object.<string, HTMLFormControlElement>}
     */

    this._controls = {};
    /**
     * @private
     * @type {Object.<string, string|boolean>}
     */

    this._data = {};

    this._parseControls();
  }
  /**
   * @private
   */


  FormControlsCollection_createClass(FormControlsCollection, [{
    key: "_parseControls",
    value: function _parseControls() {
      var _this = this;

      /**
       * @type {NodeList}
       */
      var _controls = this._target.querySelectorAll(this._settings.controlsSelector.join(','));

      _controls.forEach(
      /**
       * @param {*} control
       */
      function (control) {
        var controlType = _this._getControlType(control);
        /**
         * @type {string}
         */


        var name = control['name'];
        /**
         * @type {string | Boolean}
         */

        var value = _this._getControlValue(control); // If the control doesn't have a name, skips it.


        if (!name) {
          return;
        }

        _this._data['_' + name] = value ? value : _this._data['_' + name] || ''; // If the control is a Radio, instantiate a new HTMLRadioGroup element that
        // will contain all the radios with the same name.

        if (controlType === 'radio') {
          /**
           * @type {HTMLRadioGroup}
           */
          var htmlRadioGroup = HTMLRadioGroup.parse(_this._controls['_' + name]); // If the key has already been added, concat the new control with the existing ones

          if (htmlRadioGroup) {
            htmlRadioGroup.add(control);
          } else {
            _this._controls['_' + name] = new HTMLRadioGroup(control);
          }
        } else {
          _this._controls['_' + name] = control;
        }

        _this._defineMethods(name);

        _this._addEventListeners(control);

        _this._extendValueProperty(control, controlType, name);
      });
    }
    /**
     * @param {HTMLFormControlElement} control 
     */

  }, {
    key: "_addEventListeners",
    value: function _addEventListeners(control) {
      var _this2 = this;

      var eventName = 'input';

      var controlType = this._getControlType(control);

      switch (controlType) {
        case "radio":
        case "checkbox":
        case "select":
          eventName = 'change';
          break;
      } // @ts-ignore


      control.addEventListener(eventName,
      /**
       * @param {Event} e
       */
      function (e) {
        if (e['selfTriggered']) {
          return;
        }
        /**
         * @type {*}
         */


        var target = e.target;

        var value = _this2._getControlValue(target);

        ConsoleExtend(_this2._settings.consoleVerbose, 'OnControlInput');
        _this2[target.name] = value;
      });
    }
    /**
     * Defines a method for the specified name that return the HTMLElement.
     * The name is in camelCase with the prefix "get".
     * 
     * @example 
     * this.getEmail() -> // return the HTMLElement
     * 
     * @param {string} name 
     */

  }, {
    key: "_defineMethods",
    value: function _defineMethods(name) {
      if (name in this) {
        return;
      }

      Object.defineProperty(this, name, _objectSpread({}, this._createGetter(name), {}, this._createSetter(name)));
    }
    /**
     * Extends the original setter for 'value' property, so that each
     * time a user calls the value setter, this will update also the local object
     * that contains the control values.
     * 
     * 
     * Technically this extension of the value setter is useless because the user should
     * never call this setter manually. Instead should set the new value using the object
     * provided by this library.
     * But, to avoid compatibility problems with already written code, i added this extension.
     *  
     * 
     * @param {HTMLElement} control 
     * @param {string} controlType 
     * @param {string} controlName 
     */

  }, {
    key: "_extendValueProperty",
    value: function _extendValueProperty(control, controlType, controlName) {
      var self = this; // Avoid changing the value setter for select, radio and checkbox

      if (['select', 'radio', 'checkbox'].includes(controlType)) {
        return;
      } // Creates an IIFE that stores the original setter for value property,
      // so that this can be called once the personal setter has been executed.


      (function (realHTMLInputElement) {
        Object.defineProperty(Object.getPrototypeOf(control), 'value', {
          set: function set(value) {
            self._data[controlName] = value;
            return realHTMLInputElement.set.call(this, value);
          }
        });
      })(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(control), 'value'));
    }
    /**
     * @private
     * @param {string} name
     * @return {object}
     */

  }, {
    key: "_createGetter",
    value: function _createGetter(name) {
      var _this3 = this;

      return {
        get: function get() {
          ConsoleExtend(_this3._settings.consoleVerbose, 'Getter');
          return _this3._data['_' + name];
        }
      };
    }
    /**
     * @private
     * @param {string} name
     * @return {object}
     */

  }, {
    key: "_createSetter",
    value: function _createSetter(name) {
      var _this4 = this;

      return {
        set:
        /**
         * @param {string} newValue
         */
        function set(newValue) {
          // Avoid updating the value if is the same.
          if (_this4._data['_' + name] === newValue) {
            return;
          }

          ConsoleExtend(_this4._settings.consoleVerbose, 'Setter'); // Updates the value in the object

          _this4._data['_' + name] = newValue; // Then updates the value of the HTMLElement

          _this4._setControlValue(_this4._controls['_' + name], newValue);
        }
      };
    }
    /**
     * @private
     * @param {HTMLFormControlElement} control
     * @return {string | Boolean}
     */

  }, {
    key: "_getControlValue",
    value: function _getControlValue(control) {
      var controlType = this._getControlType(control);

      var value; // For selectControl behaves as normal

      switch (controlType) {
        case 'radio':
          value = control['checked'] ? control.value : false;
          break;

        case 'checkbox':
          value = control['checked'] ? control.value : false;
          break;

        default:
          value = control.value;
      }

      return value;
    }
    /**
     * @param {HTMLFormControlElement} control
     */

  }, {
    key: "_getControlType",
    value: function _getControlType(control) {
      var controlType = control.localName.toLowerCase();

      if (controlType === 'input') {
        controlType = control.type;
      }

      return controlType;
    }
    /**
     * @private
     * @param {HTMLFormControlElement} control 
     * @param {string} value 
     */

  }, {
    key: "_setControlValue",
    value: function _setControlValue(control, value) {
      var stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var controlType = this._getControlType(control);

      var currentValue = this._getControlValue(control); // Avoid updating the control if the value is the same.


      if (currentValue === value) {
        return;
      }

      switch (controlType) {
        case 'radio':
          control.value = value;
          break;

        case 'checkbox':
          control['checked'] = !!value;
          break;

        case 'select':
          control.value = value; // Updates the value stored for the select because if the user tries to set a value 
          // that doesn't exist, the select will be resetted, so the value stored must be updated

          this._data['_' + control["name"]] = control.value;
          break;

        default:
          control.value = value;
      }

      ConsoleExtend(this._settings.consoleVerbose, 'SetControlValue');

      if (this._settings.triggerChangeOnSetter && !stopPropagation) {
        var changeEvent = new CustomEvent('change', {
          bubbles: true
        });
        changeEvent['selfTriggered'] = true;
        ConsoleExtend(this._settings.consoleVerbose, 'DispatchChangeEvent');
        control.dispatchEvent(changeEvent);
      }
    }
    /**
     * Allow an iteration for each control in the target.
     * This method extends the NodeList.forEach method.
     * 
     * @param {function(HTMLFormControlElement, string):void} iteratorFunction 
     */

  }, {
    key: "forEach",
    value: function forEach(iteratorFunction) {
      var _this5 = this;

      Object.keys(this._controls).forEach(function (key) {
        iteratorFunction(_this5._controls[key], key.replace("_", ""));
      });
    }
    /**
     * Fill the form with the data specified in the object 'data',
     * where each key is the name of an existing control.
     * 
     * @param {Object} data
     */

  }, {
    key: "assign",
    value: function assign(data) {
      var _this6 = this;

      var nonValidKeys = [];
      Object.keys(data).forEach(function (key) {
        if ('_' + key in _this6._data) {
          _this6[key] = data[key];
        } else {
          nonValidKeys.push(key);
        }
      }); // While assigning the value, if a key wasn't found, 
      // returns a console warn with the unknown keys.

      if (nonValidKeys.length > 0) {
        console.warn("The folowing fields weren't filled because they weren't found in the specified target.\n", nonValidKeys);
      }
    }
    /**
     * Returns the HTMLElement at the given index
     * 
     * @param {Number} index
     * @return {HTMLFormControlElement}
     */

  }, {
    key: "getItemAt",
    value: function getItemAt(index) {
      return Object.values(this._controls)[index];
    }
    /**
     * Creates a method like 'get<ControlName>()' where 'ControlName' 
     * is the name of the control converted in CamelCase,
     * that returns the HTMLElementof the control
     * 
     * @param {string} name
     * @return {HTMLFormControlElement | null}
     */

  }, {
    key: "getControl",
    value: function getControl(name) {
      ConsoleExtend(this._settings.consoleVerbose, 'getControl(' + name + ')');
      return this._controls['_' + name];
    }
    /**
     * Returns the data of the form in JSON format.
     * If param 'returnObject' is true, returns an object instead of a string.
     * 
     * @param {Boolean?} returnObject 
     * 
     * @return string | Object
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var returnObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var json = {};
      Object.entries(this._data).forEach(function (obj) {
        json[obj[0].replace('_', '')] = obj[1];
      });

      if (returnObject) {
        return json;
      }

      return JSON.stringify(json);
    }
  }]);

  return FormControlsCollection;
}();


// CONCATENATED MODULE: ./src/FormObserver.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormObserver", function() { return FormObserver_FormObserver; });
function FormObserver_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FormObserver_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FormObserver_createClass(Constructor, protoProps, staticProps) { if (protoProps) FormObserver_defineProperties(Constructor.prototype, protoProps); if (staticProps) FormObserver_defineProperties(Constructor, staticProps); return Constructor; }




var FormObserver_FormObserver =
/*#__PURE__*/
function () {
  /**
   * @param {import('./FormObserver').FormObserverSettings} settings
   */
  function FormObserver(settings) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var fillData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    FormObserver_classCallCheck(this, FormObserver);

    /**
     * @private
     * @type {import('./FormObserver').FormObserverSettings}
     */
    this._settings = {
      prefix: 'fo',
      // Form Observe
      consoleVerbose: false,
      triggerChangeOnSetter: false,
      controlsSelector: ['input:not([type=\'button\']):not([type=\'submit\']):not([type=\'reset\'])', 'textarea', 'select']
    }; // Merge the users settings with the default ones

    if (settings) {
      Object.assign(this._settings, settings);
    }

    if (target) {
      return this.init(target, fillData);
    }
  }
  /**
   * Initialize the FormObserver on the specified HTMLElement.
   * 
   * @param {HTMLFormElement | HTMLElement } target
   * @param {Object?} fillData
   * 
   * @return {FormControlsCollection}
   */


  FormObserver_createClass(FormObserver, [{
    key: "init",
    value: function init(target, fillData) {
      if (!target) {
        console.error('No valid target provided');
        return;
      }

      target[this._settings.prefix] = this.serializeControls(target);

      if (fillData) {
        this.fillForm(target[this._settings.prefix], fillData);
      }

      return target[this._settings.prefix];
    }
    /**
     * Serialize a Form end return its Controls as a FormControlsCollection
     * 
     * @param {HTMLElement | HTMLFormElement} target
     * 
     * @return {FormControlsCollection}
     */

  }, {
    key: "serializeControls",
    value: function serializeControls(target) {
      /**
       * @type {FormControlsCollection}
       */
      var formElements = new FormControlsCollection_FormControlsCollection(target, this._settings);
      return formElements;
    }
    /**
     * Fill the form with the data in the given Object.
     * Each key of the object must correspond to the name of an existing control.
     * 
     * @param {FormControlsCollection} target 
     * @param {Object} fillData 
     */

  }, {
    key: "fillForm",
    value: function fillForm(target, fillData) {
      target.assign(fillData);
    }
    /**
     * Returns the data of the form in JSON format.
     * If param 'returnObject' is true, returns an object instead of a string.
     * 
     * @param {HTMLFormElement | HTMLElement} form 
     * @param {Boolean?} returnObject
     *  
     * @return string | Object
     */

  }, {
    key: "toJSON",
    value: function toJSON(form) {
      var returnObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (form[this._settings.prefix]) {
        return form[this._settings.prefix].toJSON(returnObject);
      }

      return {};
    }
    /**
     * @return {import('./FormObserver').FormObserverSettings}
     */

  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }]);

  return FormObserver;
}();

/* harmony default export */ var src_FormObserver = __webpack_exports__["default"] = (FormObserver_FormObserver);


/***/ })
/******/ ]);
});
//# sourceMappingURL=form_observer.js.map