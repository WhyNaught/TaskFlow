const express = require('express');
const app = express();
const port = 3000; 
const router = require('../server/routes/authrouter');

app.listen(port, 'localhost', () => {
    console.log('Started on port ' + port); 
})

app.use(router);