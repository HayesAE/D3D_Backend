require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const checkoutRoute = require('./routes/checkout');
const webhookRoute = require('./routes/webhook');

const app = express();

app.use('/api/webhook', webhookRoute); // raw body first
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/auth', authRoute);
app.use('/api/checkout', checkoutRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));