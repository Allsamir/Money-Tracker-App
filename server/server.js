const express = require('express');
const cors = require('cors');
const apiRoutes = require('../routes/api');

const app = express();
const Port = process.env.PORT || 3001;

app.use(cors()); // to connect to your font-end
app.use(express.json()); // to get the data from our front end
app.use(apiRoutes);

app.listen(Port, () => {
          console.log(`server is running at ${Port}`)
})