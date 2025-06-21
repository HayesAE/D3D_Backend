const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })),
    mode: 'payment',
    success_url: 'https://d3dshop.com/success.html',
    cancel_url: 'https://d3dshop.com/cancel.html',
    metadata: {
      items: JSON.stringify(req.body.items)
    }
  });

  res.json({ url: session.url });
});

module.exports = router;