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



const port = process.env.PORT || 3001;

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db = require('./db');

//les routes
const enseignantRoutes = require('./routes/enseignantRoutes');
app.use('/api', enseignantRoutes);


const loginRoutes = require('./routes/loginRoutes');
app.use('/api', loginRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);



const scolariteRoutes = require('./routes/scolariteRoutes');
app.use('/api', scolariteRoutes);

