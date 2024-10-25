const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Homepage');
})

router.post('/register', async (req, res) => {
    
})

module.exports = router; 