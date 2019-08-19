# Welcome to Form Observer

This library aims to simplify and enhance the functionality of the Forms in Vanilla JS.

It creates an object, starting from a Form, and exposes various methods that simplifies working with form, especially with large forms.

## Why should i use it?
The main idea behind this library is to automatize the manipulation of forms data.

___
### Old way

To access and read data from a form usually you should access the DOM, get the input by id or other identifier, and then get its value.

```js
document.querySelector('#myInput').value 

// OR

let form = document.querySelector('#myForm');

form.querySelector('[name="myInputName"]').value
```

Same story for changing the value of an input...

```js
document.querySelector('#myInput').value = 'new value'

// OR

...

form.querySelector('[name="myInputName"]').value = 'new value'
```

And this becomes more complex if you had to change Radios, Checkboxes or Selects.

___
### New way to do it

Once initialized on a form, the library adds a property on it, by default is '**fo**'.
This property contains shortcuts to get and set any value in the form.

```js
// Once the library was initialized on a form
let form_observer = document.querySelector('#myForm').fo;

form_observer.myInputName // returns the value of the input
form_observer.myInputName = 'new value' // sets the new value of the input

```

## How can i use it?

- First of all, you must import it:
	```js
	import { FormObserver } from 'FormObserver';
	```
- Then the library must be initialized on the desired Form:
	```js
	const htmlForm = document.querySelector('#myForm');

	// Settings are optional if you want to change the default behavior
	const settings = {
		...
	};
	// This data is optional so the FormObserver can be initialize without any data
	const dataToFill = {
		myInputName1 : 'value of input 1',
		myInputName2 : 'value of input 2',
	};

	const myForm = new FormObserver(settings, htmlForm, dataToFill);

	// OR it can be declared and initialized in two different moments

	const formObserver = new FormObserver(settings);

	const myForm = formObserver.init(htmlForm, dataToFill);
	```
- Once initialized, you can save a reference of the returned object *(in the above example is '**myForm**')* or you can access the property '**fo**' on the form which was used to initialize the library.
	```js
	// Once the library was already initialized
	const myForm = document.querySelector('#myForm').fo

	// OR 

	// It initializes and stores a reference of the 'fo' property of the form
	const myForm = new FormObserver(settings, htmlForm, dataToFill);
	```

## Compatibility
The library fully compatible with ALL browsers newer or equal to IE9