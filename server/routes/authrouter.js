// file that contains all necesssary HTTP requests for user authentication
const express = require('express');
const router = express.Router();

// TaskFlow homepage
router.get('/', async (req, res) => {
    res.send('Homepage');
})

// Get request for registation homepage
router.get('/register', async (req, res) => {
    res.send('Registration');
})

// Export to other files
module.exports = router; 