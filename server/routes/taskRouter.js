const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenVerify = require('../middleware/tokenVerify');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// get request to retrieve user taskflows 
router.put('/api/user/create', async (req, res) => {
    
});


// put request to add user tasks to database when created 

module.exports = router; 