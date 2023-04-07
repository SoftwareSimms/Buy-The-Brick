// this is the server thus eveything saved here will be saved after client session ends

import express from 'express';
import * as db from './database.js';

const app = express();
app.use(express.static('client'));

app.use(express.static('src'));

const PORT = 8080;

app.listen(PORT, function (err) {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', PORT);
});

function getBricks(req, res) {
  res.json(db.listBricks());
}

function getSets(req, res) {
  res.json(db.listSets());
}

function getOrderForms(req, res) {
  res.json(db.listOrderForms());
}

const admin = true;

function postOrderForm(req, res) {
  const orderForms = db.addOrderForm(req.body);
  if (admin === true) {
    res.json(orderForms);
  }
}


app.get('/bricks', getBricks);
app.get('/sets', getSets);
app.get('/orders/orderForms', getOrderForms);
app.post('/orderForms', express.json(), postOrderForm);
