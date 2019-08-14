import "mdn-polyfills/NodeList.prototype.forEach";
import "mdn-polyfills/CustomEvent";

import conditionalLog from "./ConsoleExtend";
import { HTMLRadioGroup } from "./HTMLRadioGroup";

/**
 * @typedef { HTMLRadioGroup | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement } HTMLFormControlElement
 */


/**
 * I'm not using Proxy due to compatibilty issues.
 * Infact this library is compatible even with IE9.
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
       * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} control
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

        this._data['_' + name] = value ? value : this._data['_' + name];

        // If the control is a Radio, then stores all the Controls with the same name
        // so the type changes and becomes Array instead of default
        if (controlType === 'radio') {
          /**
           * @type {HTMLRadioGroup}
           */
          let htmlRadioGroup = HTMLRadioGroup.parse(this._controls['_' + name]);

          // If the key has already been added, concats the new control with the existing ones
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
      });
  }

  /**
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} control 
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

    switch (controlType) {
      case 'radio':
        value = control['checked'] ? control.value : false;

        break;
      case 'checkbox':
        value = control['checked'] ? control.value : false;

        break;
      case 'select':

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
}

export { FormControlsCollection };