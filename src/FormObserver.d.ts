export type FormObserverSettings = Object & {
	/**
	 * Property that will be added to the element on wich the Class was initiated.
	 * 
	 * @example
	 * const form = document.querySelector('form');
	 * const formObserver = new FormObserver();
	 * formObserver.init(form);
	 * 
	 * form.fo // is now defined and is a FormControlsCollection
	 * 
	 * @default 'fo'
	 */
	prefix: string,
	/**
	 * If true, writes a lot of console log!
	 * 
	 * @default false
	 */
	consoleVerbose: boolean,
	/**
	 * Specifies if have to dispatch a ChangeEvent when the value is changed from the Object
	 * 
	 * @default false
	 */
	triggerChangeOnSetter: boolean,
	/**
	 * List of CSSSelectors that will be used to find the controls inside the specified target.
	 * 
	 * @default [
	 *	'input:not([type="button"]):not([type="submit"]):not([type="reset"])',
	 *  'textarea',
	 *  'select'
	 *]
	 */
	controlsSelector: [...string]
}

export class FormControlsCollection {
	constructor(target: HTMLElement): FormControlsCollection;

	/**
   * Allow an iteration for each control in the target.
   * This method extends the NodeList.forEach method.
	 */
	forEach(iteratorFunction: function(HTMLElement, string)): void;

	/**
	 * Fill the form with the data specified in the object 'data',
	 * where each key is the name of an existing control.
	 */
	assign(data: Object): void;

	/**
	 * Returns the HTMLElement at the given index
	 */
	getItemAt(index: Number): HTMLElement;

	/**
	 * Method that returns the HTMLElement of the control with the specified Name.
	 */
	getControl(name: string): HTMLElement | null

	/**
	 * Returns the data of the form in JSON format.
	 * If param 'returnObject' is true, returns an object instead of a string.
	 */
	toJSON(returnObject?: Boolean): string | Object
}

export class FormObserver {
	constructor(settings?: FormObserverSetting, target?: HTMLFormElement | HTMLElement, fillData?: Object): FormObserver

	/**
	 * Initialize the FormObserver on the specified HTMLElement.
	 */
	init(target: HTMLFormElement | HTMLElement, fillData?: Object): FormControlsCollection;

	/**
	 * Serialize a Form end return its Controls as a FormControlsCollection
	 */
	serializeControls(target: HTMLFormElement | HTMLElement): FormControlsCollection;

	/**
	 * Fill the form with the data in the given Object.
	 * Each key of the object must correspond to the name of an existing control.
	 */
	fillForm(target: HTMLFormElement | HTMLElement, fillData: Object): void;

	/**
	 * Returns the data of the form in JSON format.
	 * If param 'returnObject' is true, returns an object instead of a string.
	 */
	toJSON(form: HTMLFormElement | HTMLElement, returnObject?: Boolean): string | Object

	get settings(): FormObserverSettings
}