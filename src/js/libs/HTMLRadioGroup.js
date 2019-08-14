class HTMLRadioGroup {
  /**
   * @param {*} radioInput 
   */
  constructor(radioInput) {
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
  add(radioInput) {
    this._list.push(radioInput);
  }

  /**
   * 
   * @param {Event} e 
   */
  dispatchEvent(e) {
    const checkedRadio = this.checkedRadio;

    if (checkedRadio) {
      checkedRadio.dispatchEvent(e)
    }
  }

  get checkedRadio() {
    let radioInput = this._list.filter(element => {
      return element.checked;
    })

    return radioInput[0];
  }

  get value() {
    const checkedRadio = this.checkedRadio;

    if (checkedRadio) {
      return checkedRadio.value
    } else {
      return false;
    }
  }

  set value(value) {
    /**
     * @type {HTMLInputElement}
     */
    let radioToCheck = this._list.filter((element) => {
      return element.value === value;
    })[0]

    if (radioToCheck) {
      radioToCheck.checked = true;
    } else {
      console.warn('The specified value was not found in the required RadioGroup.')
    }
  }

  get checked() {
    return !!this.checkedRadio
  }


  /**
   * @param {*} el 
   * @return {HTMLRadioGroup}
   */
  static parse(el) {
    return el;
  }
}

export { HTMLRadioGroup };