import uuid from 'uuid-random';

export function listBricks() {
  return bricks;
}

export function listSets() {
  return sets;
}

export function listOrderForms() {
  return orderForms;
}

export function addOrderForm(fullname, email, basketContents, deliveryMethod, address, postcode, paymentMethod) {
  const newOrderForm = {
    id: uuid(),
    fullname,
    email,
    basketContents,
    deliveryMethod,
    address,
    postcode,
    paymentMethod,
    time: Date(),
    dispatched: false,
  };
  orderForms.push(newOrderForm);
  return orderForms;
}

export function addDispatchedOrderForm(id, dispatched) {
  const newDispatchedOrderForm = {
    id: id,
    dispatched: true,
  }
}

const orderForms = [
  {
    id: 'anjfndnalnad',
    basketContents: [
      { id: '4', amount: 2, itemAmountCost: 0.16 },
      { id: '1', amount: 10, itemAmountCost: 1.5 },
      { id: '5', amount: 10, itemAmountCost: 1.5 },
    ],
    fullname: 'Jane Doe',
    email: 'johndoe@mailserver.com',
    deliveryMethod: 'Delivery',
    address: 'Flat 7, Doe Court, Doe Lane',
    postcode: '2DC 1JD',
    paymentMethod: 'PayPal',
    datePlaced: 'tuesday',
    dispatched: false,
  },
];

const dispatchedOrders = [
  {
    id: 'anjfndfdsfnnfi34nad',
    basketContents: [
      { id: '1', amount: 5, itemAmountCost: 0.15 },
    ],
    fullname: 'Johny Doe',
    email: 'johnydoe@mailserver.com',
    deliveryMethod: 'Delivery',
    address: 'Flat 10, Doe Court, Doe Lane',
    postcode: '2DC 1JD',
    paymentMethod: 'PayPal',
    datePlaced: 'Wednesday',
    dispatched: true,
  },
];

const bricks = [
  {
    id: '1',
    name: '2x4 Red Lego Brick',
    buttonName: '2x4 Red Brick Button',
    dimensions: '2x4',
    colour: 'red',
    cost: 0.15,
    stock: 200,
    style: 'brick',
    img: 'https://www.lapetitebrique.com/11279-thickbox_default/lego-spare-parts-brick-2x4-red.jpg',
  },
  {
    id: '2',
    name: '2x2 Red Lego Brick',
    buttonName: '2x2 Red Brick Button',
    dimensions: '2x2',
    colour: 'red',
    cost: 0.12,
    stock: 150,
    style: 'brick',
    img: 'https://www.lapetitebrique.com/11280-thickbox_default/lego-spare-parts-brick-2x2-red.jpg',
  },
  {
    id: '3',
    name: '2x4 Blue Lego Brick',
    buttonName: '2x4 Blue Brick Button',
    dimensions: '2x4',
    colour: 'blue',
    cost: 0.15,
    stock: 210,
    style: 'brick',
    img: 'https://www.lapetitebrique.com/11277-thickbox_default/lego-spare-parts-brick-2x4-medium-blue.jpg',
  },
  {
    id: '4',
    name: '1x2 Blue Lego Brick',
    buttonName: '1x2 Blue Brick Button',
    dimensions: '1x2',
    colour: 'blue',
    cost: 0.08,
    stock: 400,
    style: 'brick',
    img: 'https://www.lapetitebrique.com/11281-large_default/lego-spare-parts-brick-1x2-medium-blue.jpg',
  },
  {
    id: '5',
    name: '2x2 Blue Lego Brick',
    buttonName: '2x2 Blue Brick Button',
    dimensions: '2x2',
    colour: 'blue',
    cost: 0.12,
    stock: 130,
    style: 'brick',
    img: 'https://preview.free3d.com/img/2019/05/2145030695775372956/y045kynf-900.jpg',
  },
  {
    id: 'A',
    name: 'Bonsai Tree',
    colour: 'red',
    cost: 50.00,
    style: 'set',
    stock: 3,
    img: 'https://www.lego.com/cdn/cs/set/assets/blt326a7116fcba7be1/10281.jpg?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1',
  },
];

const sets = [
  {
    id: 'A',
    name: 'Bonsai Tree',
    colour: 'red',
    cost: 50.00,
    style: 'set',
    stock: 3,
    img: 'https://www.lego.com/cdn/cs/set/assets/blt326a7116fcba7be1/10281.jpg?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1',
  },
];
