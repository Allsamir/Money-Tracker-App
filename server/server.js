require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('../routes/api');
const mongoose = require('mongoose');

const app = express();
const Port = process.env.PORT || 3001;

app.use(cors()); // to connect to your font-end
app.use(express.json()); // to get the data from our front end
app.use(apiRoutes);

mongoose.connect(process.env.DATABASE_URI)
.then(result => {
          console.log("Connected to Database");
})
.catch(error => {
          console.error(error);
})

app.listen(Port, () => {
          console.log(`server is running at ${Port}`)
})