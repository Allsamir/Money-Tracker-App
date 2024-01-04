const express = require('express')
const router = express.Router();

// Getting data from font-end by post request because the font-end posted data to backend

router.get('/transaction', async (req, res) => {
          try {
                    res.json({message: "Hello world"})
                    
          } catch (error) {
                    console.error(error);
          }
})

router.post('/transaction', async (req, res) => {
          try {
                    console.log(req.body)

          } catch (error) {
                    console.error(error)
          }
});

module.exports = router