const express = require('express');
const app = express();
const router = require('../server/routes/authrouter');
let port; 

// setting up ports 
if (process.env.status === 'production') {
    port = process.env.PROD_PORT; 
} else if (process.env.status === 'development') {
    port = process.env.DEV_PORT;
}

// starting app
app.listen(port, 'localhost', () => {
    console.log('Started on port ' + port); 
})

// linking app to express router
app.use(router);