let orderForms;
const el = {};

function removeContentFrom(what) {
  what.textContent = '';
}

async function loadOrderForms() {
  const response = await fetch('orderForms');
  if (response.ok) {
    orderForms = await response.json();
  } else {
    orderForms = [{ msg: 'failed to load sets :-(' }];
  }
  removeContentFrom(el.orderForm);
  showOrderForms(orderForms);
}

async function loadDispatchedOrderForms() {
  const response = await fetch('dispatchedOrderForms');
  let dispatchedOrderForms;
  if (response.ok) {
    dispatchedOrderForms = await response.json();
  } else {
    dispatchedOrderForms = [{ msg: 'failed to load sets :-(' }];
  }
  removeContentFrom(el.formDisplayBox);
  showOrderForms(dispatchedOrderForms);
}

function showOrderForms(forms) {
  for (const form of forms) {
    const formContainer = document.createElement('div');
    const nameContainer = document.createElement('input');
    const emailContainer = document.createElement('input');
    const basketContainer = document.createElement('li');
    const addressContainer = document.createElement('input');
    const postcodeContainer = document.createElement('input');
    const deliveryContainer = document.createElement('input');
    const paymentContainer = document.createElement('input');
    const dispatchedContainer = document.createElement('input');
    const dispatchedContainerLabel = document.createElement('label');
    const updateFormButton = document.createElement('button');

    formContainer.id = 'orderForm';
    formContainer.textContent = 'Order Form ' + form.id;

    nameContainer.id = 'nameContainer';
    nameContainer.value = form.fullname;
    nameContainer.type = 'text';
    nameContainer.placeholder = 'Enter Fullname';

    emailContainer.id = 'emailContainer';
    emailContainer.value = form.email;
    emailContainer.type = 'text';
    emailContainer.placeholder = 'Enter Email';

    /* for (const item of forms.basketContents) {
      const id = document.createElement('input');
      const unitCost = document.createElement('input');
      const amount = document.createElement('input');
    } */

    basketContainer.textContent = JSON.stringify(form.basketContents);

    addressContainer.id = 'addressContainer';
    addressContainer.value = form.address;
    addressContainer.type = 'text';
    addressContainer.placeholder = 'Enter All Lines of Your Mail Address';

    postcodeContainer.id = 'postcodeContainer';
    postcodeContainer.value = form.postcode;
    postcodeContainer.type = 'text';
    postcodeContainer.placeholder = 'Enter Mailing Postcode';

    deliveryContainer.id = 'deliveryContainer';
    deliveryContainer.value = form.deliveryMethod;
    deliveryContainer.type = 'text';
    deliveryContainer.placeholder = 'Enter Delivery Method:';

    paymentContainer.id = 'paymentContainer';
    paymentContainer.value = form.paymentMethod;
    paymentContainer.type = 'text';
    paymentContainer.placeholder = 'Enter Payment Method:';

    dispatchedContainerLabel.for = 'dispatchedContainer';
    dispatchedContainerLabel.textContent = 'Dispatched?';

    dispatchedContainer.id = 'dispatchedContainer';
    dispatchedContainer.value = form.dispatched;
    dispatchedContainer.type = 'checkbox';

    updateFormButton.textContent = 'Update Form With New Changed Details';

    el.orderForm.append(formContainer);
    formContainer.append(nameContainer, emailContainer, basketContainer,
      deliveryContainer, addressContainer, postcodeContainer,
      deliveryContainer, paymentContainer, dispatchedContainerLabel,
      dispatchedContainer, updateFormButton);

    updateFormButton.addEventListener('click', editForm);
  }
}

async function editForm() {
  el.nameContainer = document.querySelector('#nameContainer');
  el.emailContainer = document.querySelector('#emailContainer');
  el.addressContainer = document.querySelector('#addressContainer');
  el.postcodeContainer = document.querySelector('#postcodeContainer');

  el.nameContainer = document.querySelector('#nameContainer');
  el.emailContainer = document.querySelector('#emailContainer');
  //el.basketContainer = document.querySelector('#basketContainer');
  el.addressContainer = document.querySelector('#addressContainer');
  el.postcodeContainer = document.querySelector('#postcodeContainer');
  el.deliveryContainer = document.querySelector('#deliveryContainer');
  el.paymentContainer = document.querySelector('paymentContainer');
  el.dispatchedContainer = document.querySelector('dispatchedContainer');

  const payload = {
    fullname: el.nameContainer.value,
    // basketContents: el.basketContainer.value,
    email: el.emailContainer.value,
    deliveryMethod: el.deliveryContainer.value,
    address: el.addressContainer.value,
    postcode: el.postcodeContainer.value,
    paymentMethod: el.paymentMethod.value,
    dispatched: el.dispatchedContainer.value,
  };
  console.log('Payload', payload);

  if (el.dispatchedContainer.value === false) {
    const response = await fetch('orderForms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  else {
    const response = await fetch('dispatchedOrderForms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}

function prepareHandles() {
  el.orderForm = document.querySelector('#orderFormsContainer');
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
  loadOrderForms();
  // loadDispatchedOrderForms();
}
window.addEventListener('load', pageLoaded);
