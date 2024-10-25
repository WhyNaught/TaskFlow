// all required modules
const express = require('express');
const app = express();
const router = require('../server/routes/authrouter');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let port; 

// mongoose connection string
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongoose booted successfully');
    });

// setting up ports 
if (process.env.STATUS === 'production') {
    port = process.env.PROD_PORT; 
} else if (process.env.STATUS === 'development') {
    port = process.env.DEV_PORT;
}

// starting app
app.listen(port, 'localhost', () => {
    console.log('Started on port ' + port); 
})

// linking app to express router
app.use(express.json()); // allows app to parse json data
app.use(router);