// all required modules
const express = require('express');
const app = express();
const authrouter = require('../server/routes/authrouter');
const taskrouter = require('../server/routes/taskRouter');
const collaboratorRouter = require('../server/routes/collaboratorRouter'); 
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
}; 

// starting app
app.listen(port, '0.0.0.0', () => {
    console.log('Started on port ' + port); 
});

// linking app to express router
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
})); // allows server to connect to frontend
app.use(express.json()); // allows app to parse json data
app.use(authrouter);
app.use(taskrouter); 
app.use(collaboratorRouter); 