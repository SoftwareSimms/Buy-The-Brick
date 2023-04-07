// THIS IS THE CLIENT SIDE JAVASCRIPT EVERYTHING ON HERE IS HELD VIA CLIENT SESSION

const el = {};
let bricks;
let sets;
let basket = [];
let totalCost = 0;

/* Remove all contents from a given element */
function removeContentFrom(what) {
  what.textContent = '';
}

function save(name, thing) {
  const jsonThing = JSON.stringify(thing);
  localStorage.setItem(name, jsonThing);
  console.log(localStorage);
}

// // subtract uses nextSibling as it is left of the input element in the append
function addOne(e) {
  if (e.target.dataset.class === 'basket') {
    const inputVal = parseInt(e.target.nextSibling.value); // possible modulerisation
    const newVal = inputVal + 1;
    e.target.nextSibling.value = newVal; //
    for (const item of basket) {
      if (item.id === e.target.dataset.id) {
        item.amount = newVal;
        removeContentFrom(el.basket);
        showBasket(basket, bricks, el.basket);
        save('basket', basket);
      }
    }
  } else {
    const inputVal = parseInt(e.target.nextSibling.value);
    const newVal = inputVal + 1;
    e.target.nextSibling.value = newVal;
  }
}

// subtract uses previousSibling as it is right of the input element in the append
function subtractOne(e) {
  if (e.target.dataset.class === 'basket') {
    const inputVal = parseInt(e.target.previousSibling.value);
    const newVal = inputVal - 1;
    e.target.previousSibling.value = newVal;
    for (const item of basket) {
      if (item.id === e.target.dataset.id) {
        item.amount = newVal;
        removeContentFrom(el.basket);
        showBasket(basket, bricks, el.basket);
        save('basket', basket);
      }
    }
  } else {
    const inputVal = parseInt(e.target.previousSibling.value);
    if (inputVal > 0) {
      const newVal = inputVal - 1;
      e.target.previousSibling.value = newVal;
    }
  }
}

async function loadBricks() {
  const response = await fetch('bricks');
  if (response.ok) {
    bricks = await response.json();
  } else {
    bricks = [{ msg: 'failed to load bricks :-(' }];
  }
  removeContentFrom(el.itemDisplayBox);
  showBricks(bricks, el.itemDisplayBox);
  if (basket !== '') {
    showBasket(basket, bricks, el.basket);
  }
}

async function loadSets() {
  const response = await fetch('sets');
  let sets;
  if (response.ok) {
    sets = await response.json();
  } else {
    sets = [{ msg: 'failed to load sets :-(' }];
  }
  removeContentFrom(el.itemDisplayBox);
  showSets(sets, el.itemDisplayBox);
}

function loadBasket() { // attempted to modulerise, wouldn't update basket
  const jsonBasket = localStorage.getItem('basket');
  const notJsonBasket = JSON.parse(jsonBasket);
  basket = notJsonBasket;
  if (basket.length === 0) {
    removeContentFrom(el.orderForm);
  }
}
/* Add an array of bricks to the page */
function showBricks(bricks, where) {
  for (const brick of bricks) {
    const div = document.createElement('div');
    const li = document.createElement('li');
    const price = document.createElement('li');
    const img = document.createElement('img');
    const inputBox = document.createElement('input');
    const addBasketButton = document.createElement('button');
    const upButton = document.createElement('button');
    const downButton = document.createElement('button');
    div.className = 'legoDiv';
    li.dataset.id = brick.id;
    li.textContent = brick.name;
    li.dataset.cost = brick.cost;
    li.dataset.colour = brick.colour;
    li.dataset.dimensions = brick.dimensions;
    li.dataset.style = brick.style;
    li.dataset.stock = brick.stock;

    price.textContent = 'Unit Cost: £' + brick.cost;

    upButton.textContent = '+';

    downButton.textContent = '-';

    addBasketButton.textContent = 'Add To Basket';
    addBasketButton.className = 'legoButton';
    addBasketButton.dataset.name = brick.buttonName;
    addBasketButton.dataset.id = brick.id;
    addBasketButton.dataset.cost = brick.cost;

    inputBox.type = 'number';
    inputBox.placeholder = 'Enter amount';
    inputBox.value = 0;
    inputBox.min = '0';
    inputBox.dataset.id = brick.id + 'input';

    img.setAttribute = ('src');
    img.src = brick.img;
    img.className = 'brick';
    // console.log(li.dataset.cost);
    where.append(div);
    div.append(li, img, price, upButton, inputBox, downButton, addBasketButton);
    addBasketButton.addEventListener('click', addToBasket);
    upButton.addEventListener('mousedown', addOne);
    downButton.addEventListener('mousedown', subtractOne);
  }
}

function addToBasket(e) {
  const brickId = e.currentTarget.dataset.id;
  const price = e.currentTarget.dataset.cost;
  const inputVal = parseInt(e.target.previousElementSibling.previousElementSibling.value);
  let exists = false;
  let itemCost = 0;
  // let newAmount = 0;
  if (isNaN(inputVal) || inputVal < 1) { window.alert('Please enter a posistive integer'); } else {
    if (basket.length === 0) {
      itemCost = inputVal * price;
      basket.push({ id: brickId, amount: inputVal, itemAmountCost: itemCost });
      showBasket(basket, bricks, el.basket);
    } else {
      for (const item of basket) {
        if (item.id === brickId) {
          item.amount = item.amount + inputVal;
          item.itemAmountCost = item.amount * price;
          exists = true;
          // newAmount = item.amount;
        }
      }
      if (exists === false) {
        itemCost = inputVal * price;
        basket.push({ id: brickId, amount: inputVal, itemAmountCost: itemCost });
        save('basket', basket);
      }
      // r  e turn basket;
      removeContentFrom(el.basket);
      showBasket(basket, bricks, el.basket);
      save('basket', basket);
    }
  }
}

function showBasket(basket, database, where) {
  const buttonContainer = document.createElement('div');
  const totalCostElement = document.createElement('p');
  totalCostElement.id = 'totalCost';
  totalCost = 0;
  const emptyBasketButton = document.createElement('button');
  emptyBasketButton.textContent = 'Empty Basket';
  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Checkout';
  for (const item of basket) {
    for (const data of database) {
      if (item.id === data.id && item.amount > 0) {
        const div = document.createElement('div');
        const name = document.createElement('li');
        const amount = document.createElement('li');
        const unitCost = document.createElement('li');
        const total = document.createElement('li');
        const img = document.createElement('img');
        const inputBox = document.createElement('input');
        const upButton = document.createElement('button');
        const downButton = document.createElement('button');

        div.className = 'legoDiv';

        name.textContent = data.name;

        amount.textContent = 'Amount in Basket:';

        unitCost.textContent = 'Unit Cost £' + data.cost;

        total.dataset.id = data.id;
        total.textContent = 'Total: £' + ((item.amount * data.cost).toFixed(2));
        totalCost = totalCost + (item.amount * data.cost);

        upButton.textContent = '+';
        upButton.dataset.amount = item.amount;
        upButton.dataset.class = 'basket';
        upButton.dataset.id = data.id;
        upButton.dataset.cost = data.cost;

        downButton.textContent = '-';
        downButton.dataset.amount = item.amount;
        downButton.dataset.class = 'basket';
        downButton.dataset.id = data.id;
        downButton.dataset.cost = data.cost;

        inputBox.type = 'number';
        inputBox.placeholder = 'Enter amount';
        inputBox.value = item.amount;
        inputBox.dataset.id = item.id + 'input';

        img.setAttribute = ('src');
        img.src = data.img;
        img.className = 'brick';

        where.append(div);
        div.append(name, img, unitCost, amount, upButton, inputBox, downButton, total);
        upButton.addEventListener('click', addOne);
        downButton.addEventListener('click', subtractOne);
      }
    }
  }
  totalCostElement.textContent = 'Total Basket Cost: £' + totalCost.toFixed(2);
  el.basket.append(buttonContainer);
  buttonContainer.append(emptyBasketButton, totalCostElement, checkoutButton);
  checkoutButton.addEventListener('click', showOrderForm);
  emptyBasketButton.addEventListener('click', emptyBasket);
}

function emptyBasket() {
  emptyArray(basket, el.basket);
  save('basket', basket);
}

function emptyArray(arr, where) {
  arr.length = 0;
  removeContentFrom(where);
  return arr;
}

function showOrderForm() {
  const processContainer = document.createElement('div');
  const nameContainer = document.createElement('input');
  const emailContainer = document.createElement('input');
  const addressContainer = document.createElement('input');
  const postcodeContainer = document.createElement('input');


  const deliveryLabel = document.createElement('label');
  const deliveryContainer = document.createElement('input');

  const collectionLabel = document.createElement('label');
  const collectionContainer = document.createElement('input');

  const paypalLabel = document.createElement('label');
  const paypalContainer = document.createElement('input');
  const cardLabel = document.createElement('label');
  const cardContainer = document.createElement('input');

  const purchaseBasketButton = document.createElement('button');

  processContainer.id = 'orderForm';
  processContainer.textContent = 'Order Form';

  nameContainer.id = 'nameContainer';
  nameContainer.type = 'text';
  nameContainer.placeholder = 'Enter Fullname';

  emailContainer.id = 'emailContainer';
  emailContainer.type = 'text';
  emailContainer.placeholder = 'Enter Email';

  addressContainer.id = 'addressContainer';
  addressContainer.type = 'text';
  addressContainer.placeholder = 'Enter All Lines of Your Mail Address';

  postcodeContainer.id = 'postcodeContainer';
  postcodeContainer.type = 'text';
  postcodeContainer.placeholder = 'Enter Mailing Postcode';

  deliveryLabel.for = 'deliveryChoice';
  deliveryLabel.textContent = 'Delivery';

  deliveryContainer.id = 'deliveryChoice';
  deliveryContainer.type = 'radio';
  deliveryContainer.name = 'deliveryMethod';
  deliveryContainer.value = 'Delivery';

  collectionLabel.for = 'collectionChoice';
  collectionLabel.textContent = 'Collection';

  collectionContainer.id = 'collectionChoice';
  collectionContainer.type = 'radio';
  collectionContainer.name = 'deliveryMethod';
  collectionContainer.value = 'Collection';

  paypalLabel.for = 'paypalChoice';
  paypalLabel.textContent = 'PayPal';

  paypalContainer.id = 'paypalChoice';
  paypalContainer.type = 'radio';
  paypalContainer.name = 'paymentMethod';
  paypalContainer.value = 'PayPal';

  cardLabel.for = 'cardChoice';
  cardLabel.textContent = 'Card';

  cardContainer.id = 'cardChoice';
  cardContainer.type = 'radio';
  cardContainer.name = 'paymentMethod';
  cardContainer.value = 'Card';

  purchaseBasketButton.textContent = 'Purchase Basket';

  el.body.append(processContainer);
  processContainer.append(nameContainer, emailContainer, deliveryLabel,
    deliveryContainer, addressContainer, postcodeContainer, collectionLabel, collectionContainer, paypalLabel,
    paypalContainer, cardLabel, cardContainer, purchaseBasketButton);

  /*
    if (checkRadios('input[name="deliveryMethod"]') === 'Delivery') {
    processContainer.append(nameContainer, emailContainer, deliveryLabel,
      deliveryContainer, addressContainer, postcodeContainer, collectionLabel, collectionContainer, paypalLabel,
      paypalContainer, cardLabel, cardContainer, purchaseBasketButton);
  } else {
    processContainer.append(nameContainer, emailContainer, deliveryLabel,
      deliveryContainer, collectionLabel, collectionContainer, paypalLabel,
      paypalContainer, cardLabel, cardContainer, purchaseBasketButton);
  }
  */

  purchaseBasketButton.addEventListener('click', purchase);
}

async function purchase() {
  el.nameContainer = document.querySelector('#nameContainer');
  el.emailContainer = document.querySelector('#emailContainer');
  el.addressContainer = document.querySelector('#addressContainer');
  el.postcodeContainer = document.querySelector('#postcodeContainer');

  const deliveryMethod = checkRadios('input[name="deliveryMethod"]');
  const paymentMethod = checkRadios('input[name="paymentMethod"]');
  const payload = {
    fullname: el.nameContainer.value,
    basketContents: basket,
    email: el.emailContainer.value,
    deliveryMethod: deliveryMethod,
    address: el.addressContainer.value,
    postcode: el.postcodeContainer.value,
    paymentMethod: paymentMethod,
  };
  console.log('Payload', payload);

  const response = await fetch('orderForms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}


function checkRadios(group) {
  const radioButtons = document.querySelectorAll(group);
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
}

function showFilters() {

}

function showSets(sets, where) {
  for (const set of sets) {
    const div = document.createElement('div');
    const li = document.createElement('li');
    const price = document.createElement('li');
    const img = document.createElement('img');
    const inputBox = document.createElement('input');
    const addBasketButton = document.createElement('button');
    const upButton = document.createElement('button');
    const downButton = document.createElement('button');
    div.className = 'legoDiv';
    li.dataset.id = set.id;
    li.textContent = set.name;
    li.dataset.cost = set.cost;
    li.dataset.colour = set.colour;
    li.dataset.dimensions = set.dimensions;
    li.dataset.style = set.style;
    li.dataset.stock = set.stock;

    price.textContent = 'Unit Cost: £' + set.cost;

    upButton.textContent = '+';

    downButton.textContent = '-';

    addBasketButton.textContent = 'Add To Basket';
    addBasketButton.className = 'legoButton';
    addBasketButton.dataset.name = set.buttonName;
    addBasketButton.dataset.id = set.id;
    addBasketButton.dataset.cost = set.cost;

    inputBox.type = 'number';
    inputBox.placeholder = 'Enter amount';
    inputBox.value = 0;
    inputBox.min = '0';
    inputBox.dataset.id = set.id + 'input';

    img.setAttribute = ('src');
    img.src = set.img;
    img.className = 'brick';
    // console.log(li.dataset.cost);
    where.append(div);
    div.append(li, img, price, upButton, inputBox, downButton, addBasketButton);
    addBasketButton.addEventListener('click', addToBasket);
    upButton.addEventListener('mousedown', addOne);
    downButton.addEventListener('mousedown', subtractOne);
  }
}

/**
 * Page elements used in the program are
 * setup here for convenience.
 */
function prepareHandles() {
  el.body = document.body;
  el.itemDisplayBox = document.querySelector('#itemDisplayBox');
  el.filterBox = document.querySelector('#filterBox');
  el.basket = document.querySelector('#basketBox');
  el.viewSetsButton = document.querySelector('#viewSetsButton');
  el.viewBricksButton = document.querySelector('#viewBricksButton');
  el.orderForm = document.querySelector('#orderForm');
  el.emptyButton = document.querySelector('#emptyButton');
  el.checkoutButton = document.querySelector('#checkoutButton');
  el.totalCost = document.querySelector('#totalCost');
  el.basketLogic = document.querySelector('#basketLogic');
}

/**
 * Connect listeners for button clicks,
 * keyboard input, etc.
 */
function addEventListeners() {
  el.viewSetsButton.addEventListener('click', loadSets);
  el.viewBricksButton.addEventListener('click', loadBricks);
}

function pageLoaded() {
  console.log('js ready');
  prepareHandles();
  addEventListeners();
  loadBricks();
  loadBasket();
}

window.addEventListener('load', pageLoaded);
