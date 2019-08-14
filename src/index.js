// @ts-nocheck
import { FormObserver } from './js/FormObserver';

window.addEventListener('DOMContentLoaded', e => {
  const formObserver = new FormObserver({
    triggerChangeOnSetter: true,
  });
  const formElements = formObserver.init(document.querySelector('form'), {
    email: "john.smith@gmail.com",
    checkOut: true,
    nonExistingControl: "asdas"
  });

  formElements.assign({ password: "adsa" })

  formElements.getControl("email");
});