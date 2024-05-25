require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  origin:"*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



const port = process.env.PORT || 3002;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db = require('./db');

//les routes




const niveauRoutes = require('./routes/niveauRoutes');
app.use('/api', niveauRoutes);

const parcoursRoutes = require('./routes/parcoursRoutes');
app.use('/api', parcoursRoutes);

const promotionRoutes = require('./routes/promotionRoutes');
app.use('/api', promotionRoutes);

const ueRoutes = require('./routes/ueRoutes');
app.use('/api', ueRoutes);


