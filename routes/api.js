const express = require('express');
const MoneyTracker = require('../models/data');
const router = express.Router();

// Getting data from font-end by post request because the font-end posted data to backend

router.get('/transaction', async (req, res) => {
          try {
                    res.json({
                              message: "Hello world"
                    })

          } catch (error) {
                    console.error(error);
          }
})

router.post('/transaction', async (req, res) => {

          const {
                    purchase,
                    price,
                    date,
                    description
          } = req.body;
          const newTransaction = new MoneyTracker({
                    purchase: purchase,
                    price: price,
                    date: date,
                    description: description
          })

          try {
                    const savedNewTransaction = await newTransaction.save();

                    console.log(`Transaction Data : ${savedNewTransaction}`);

                    res.json(savedNewTransaction);
          } catch (error) {
                    console.error(error)
          }
});

module.exports = router