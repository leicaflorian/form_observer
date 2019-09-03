import "mdn-polyfills/Object.assign";
import { FormControlsCollection } from './core/FormControlsCollection';

class FormObserver {
  /**
   * @param {import('./FormObserver').FormObserverSettings} settings
   */
  constructor(settings, target = null, fillData = {}) {
    /**
     * @private
     * @type {import('./FormObserver').FormObserverSettings}
     */
    this._settings = {
      prefix: 'fo', // Form Observe
      consoleVerbose: false,
      triggerChangeOnSetter: false,
      controlsSelector: [
        'input:not([type=\'button\']):not([type=\'submit\']):not([type=\'reset\'])',
        'textarea',
        'select'
      ]
    };

    // Merge the users settings with the default ones
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
  init(target, fillData) {
    if (!target) {
      console.error('No valid target provided');
      return;
    }

    target[this._settings.prefix] = this.serializeControls(target);

    if (fillData) {
      this.fillForm(target[this._settings.prefix], fillData)
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
  serializeControls(target) {
    /**
     * @type {FormControlsCollection}
     */
    let formElements = new FormControlsCollection(target, this._settings);

    return formElements;
  }

  /**
   * Fill the form with the data in the given Object.
   * Each key of the object must correspond to the name of an existing control.
   * 
   * @param {FormControlsCollection} target 
   * @param {Object} fillData 
   */
  fillForm(target, fillData) {
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
  toJSON(form, returnObject = false) {
    if (form[this._settings.prefix]) {
      return form[this._settings.prefix].toJSON(returnObject);
    }

    return {};
  }

  /**
   * @return {import('./FormObserver').FormObserverSettings}
   */
  get settings() {
    return this._settings;
  }
}

export { FormObserver }