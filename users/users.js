'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const winston = require('winston');


// router.post('/receivePayment', (req, res, next) => {
//     const {
//         stripeToken, 
//         amount
//     } = req.body;
//     return stripe.charges.create({
//         amount,
//         currency: "usd",
//         source: stripeToken,
//         description: "Menu Item Charge"
//     })
//     .then(charge => res.send(charge))
//     .catch(err => winston.log('error', 'Error Creating Charge for stripe', {err}));
// });

module.exports = router;