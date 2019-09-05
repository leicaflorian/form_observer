import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/CustomEvent";
import "mdn-polyfills/Object.entries";

import conditionalLog from "./ConsoleExtend";
import { HTMLRadioGroup } from "./HTMLRadioGroup";

/**
 * @typedef { HTMLRadioGroup | HTMLInputElement | HTMLTextAreaElement } HTMLFormControlElement
 */

/**
 * I'm not using Proxy due to compatibility issues.
 * In fact this library is compatible even with IE9.
 */
class FormControlsCollection {
  /**
   * @param {HTMLElement | HTMLFormElement} target
   * @param {Object?} settings
   */
  constructor(target, settings) {
    /**
     * @private
     */
    this._settings = {
      controlsSelector: [
        'input:not([type="button"]):not([type="submit"]):not([type="reset"])',
        'textarea',
        'select'
      ],
      triggerChangeOnSetter: false,
      consoleVerbose: false
    }


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
  _parseControls() {
    /**
     * @type {NodeList}
     */
    const _controls = this._target.querySelectorAll(this._settings.controlsSelector.join(','));

    _controls.forEach(
      /**
       * @param {*} control
       */
      control => {
        const controlType = this._getControlType(control);
        /**
         * @type {string}
         */
        const name = control['name'];
        /**
         * @type {string | Boolean}
         */
        const value = this._getControlValue(control);

        // If the control doesn't have a name, skips it.
        if (!name) {
          return;
        }

        this._data['_' + name] = value ? value : (this._data['_' + name] || '');

        // If the control is a Radio, instantiate a new HTMLRadioGroup element that
        // will contain all the radios with the same name.
        if (controlType === 'radio') {
          /**
           * @type {HTMLRadioGroup}
           */
          let htmlRadioGroup = HTMLRadioGroup.parse(this._controls['_' + name]);

          // If the key has already been added, concat the new control with the existing ones
          if (htmlRadioGroup) {
            htmlRadioGroup.add(control)
          } else {
            this._controls['_' + name] = new HTMLRadioGroup(control);
          }
        } else {
          this._controls['_' + name] = control;
        }

        this._defineMethods(name);
        this._addEventListeners(control);
        this._extendValueProperty(control, controlType, name);
      });
  }

  /**
   * @param {HTMLFormControlElement} control 
   */
  _addEventListeners(control) {
    let eventName = 'input';
    let controlType = this._getControlType(control);

    switch (controlType) {
      case "radio":
      case "checkbox":
      case "select":
        eventName = 'change';
        break;
    }

    // @ts-ignore
    control.addEventListener(eventName,
      /**
       * @param {Event} e
       */
      e => {
        if (e['selfTriggered']) {
          return;
        }

        /**
         * @type {*}
         */
        let target = e.target;
        let value = this._getControlValue(target);

        conditionalLog(this._settings.consoleVerbose, 'OnControlInput');

        this[target.name] = value;
      })
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
  _defineMethods(name) {
    if (name in this) {
      return;
    }

    Object.defineProperty(this, name, {
      ...this._createGetter(name),
      ...this._createSetter(name)
    })
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
  _extendValueProperty(control, controlType, controlName) {
    let self = this;

    // Avoid changing the value setter for select, radio and checkbox
    if (['select', 'radio', 'checkbox'].includes(controlType)) {
      return;
    }

    // Creates an IIFE that stores the original setter for value property,
    // so that this can be called once the personal setter has been executed.
    (function(realHTMLInputElement) {
      Object.defineProperty(Object.getPrototypeOf(control), 'value', {
        set: function(value) {
          self._data[controlName] = value;

          return realHTMLInputElement.set.call(this, value);
        },
      });
    }(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(control), 'value')));
  }

  /**
   * @private
   * @param {string} name
   * @return {object}
   */
  _createGetter(name) {
    return {
      get: () => {
        conditionalLog(this._settings.consoleVerbose, 'Getter');
        return this._data['_' + name];
      }
    }
  }

  /**
   * @private
   * @param {string} name
   * @return {object}
   */
  _createSetter(name) {
    return {
      set:
        /**
         * @param {string} newValue
         */
        newValue => {
          // Avoid updating the value if is the same.
          if (this._data['_' + name] === newValue) {
            return;
          }

          conditionalLog(this._settings.consoleVerbose, 'Setter');

          // Updates the value in the object
          this._data['_' + name] = newValue;

          // Then updates the value of the HTMLElement
          this._setControlValue(this._controls['_' + name], newValue);
        }
    }
  }

  /**
   * @private
   * @param {HTMLFormControlElement} control
   * @return {string | Boolean}
   */
  _getControlValue(control) {
    let controlType = this._getControlType(control);
    let value;

    // For selectControl behaves as normal
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
  _getControlType(control) {
    let controlType = control.localName.toLowerCase();

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
  _setControlValue(control, value, stopPropagation = false) {
    let controlType = this._getControlType(control);
    let currentValue = this._getControlValue(control);

    // Avoid updating the control if the value is the same.
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
        control.value = value;

        // Updates the value stored for the select because if the user tries to set a value 
        // that doesn't exist, the select will be resetted, so the value stored must be updated
        this._data['_' + control["name"]] = control.value;
        break;
      default:
        control.value = value;
    }

    conditionalLog(this._settings.consoleVerbose, 'SetControlValue');

    if (this._settings.triggerChangeOnSetter && !stopPropagation) {
      const changeEvent = new CustomEvent('change', { bubbles: true });

      changeEvent['selfTriggered'] = true;

      conditionalLog(this._settings.consoleVerbose, 'DispatchChangeEvent');

      control.dispatchEvent(changeEvent);
    }
  }

  /**
   * Allow an iteration for each control in the target.
   * This method extends the NodeList.forEach method.
   * 
   * @param {function(HTMLFormControlElement, string):void} iteratorFunction 
   */
  forEach(iteratorFunction) {
    Object.keys(this._controls).forEach(key => {
      iteratorFunction(this._controls[key], key.replace("_", ""));
    })
  }

  /**
   * Fill the form with the data specified in the object 'data',
   * where each key is the name of an existing control.
   * 
   * @param {Object} data
   */
  assign(data) {
    const nonValidKeys = [];

    Object.keys(data).forEach(key => {
      if ('_' + key in this._data) {
        this[key] = data[key];
      } else {
        nonValidKeys.push(key)
      }
    });

    // While assigning the value, if a key wasn't found, 
    // returns a console warn with the unknown keys.
    if (nonValidKeys.length > 0) {
      console.warn("The folowing fields weren't filled because they weren't found in the specified target.\n", nonValidKeys)
    }
  }

  /**
   * Returns the HTMLElement at the given index
   * 
   * @param {Number} index
   * @return {HTMLFormControlElement}
   */
  getItemAt(index) {
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
  getControl(name) {
    conditionalLog(this._settings.consoleVerbose, 'getControl(' + name + ')');

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
  toJSON(returnObject = false) {
    let json = {};

    Object.entries(this._data).forEach(obj => {
      json[obj[0].replace('_', '')] = obj[1]
    })

    if (returnObject) {
      return json;
    }

    return JSON.stringify(json);
  }
}

export { FormControlsCollection };