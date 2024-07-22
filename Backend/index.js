const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limiting each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Order schema
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  paymentMethodId: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

app.post(
  '/checkout',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('paymentMethodId').notEmpty().withMessage('Payment method ID is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, city, state, paymentMethodId } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // example amount in cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });

      const newOrder = new Order({
        name,
        email,
        address,
        city,
        state,
        paymentMethodId,
        amount: 1000, // example amount in cents
      });

      await newOrder.save();
      res.json({ message: 'Order received', clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// First Constant for database
// MONGO_URI=mongodb+srv://emmanueljackie328:VX8MnwPynxKum2fD@cluster20.pnvunem.mongodb.net/?

//Place your secret key here if you want to make any changes let me know
// STRIPE_SECRET_KEY=your-stripe-secret-key