// @ts-nocheck
import FormObserver from '../src';

window.addEventListener('DOMContentLoaded', e => {
  const formObserver = new FormObserver({
    triggerChangeOnSetter: true,
  });

  const formElements = formObserver.init(document.querySelector('form'));

  formElements.assign({ mySelect: "alpha" })

  console.log(formElements.getControl("email"));
}); 