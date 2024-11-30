// API that contains all necesssary HTTP requests for user authentication
const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenVerify = require('../middleware/tokenVerify');
require('dotenv').config();

// Post route for registration
router.post('/api/register', async (req, res) => {
    // check to see if user already exists in our database
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(400).json({error: 'Account with this email already exists'});
        }
    } catch (error) {
        console.log(error);
    };

    const salt = await bcrypt.genSalt(10);
    const hp = await bcrypt.hash(req.body.password, parseInt(salt)); // hp = hashed password

    // if everything works out, create the new user 
    const newUser = new User ({
        username: req.body.username, 
        email: req.body.email, 
        password: hp
    });

    // save to database
    try {
        await newUser.save();
        const token = jwt.sign({email: newUser.email}, process.env.SIGNATURE, {expiresIn : '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.status(201).json({message: 'User registered successfully!'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error, please try again later.'})
    }

});

// login post route
router.post('/api/login', async (req, res) => {
    // check if the user exists and their password is correct
    try {
        const user = await User.findOne({email:req.body.email}); 
        if (!user) {
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({message: 'Incorrect email or password'});
        }
        const token = jwt.sign({email: user.email}, process.env.SIGNATURE); 
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: 'Internal server error, please try again later.'});
    }
    
});

// allows user to logout 
router.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully!'});
});

// retrieves the user's username and email based on their token 
router.get('/api/data', tokenVerify, async (req, res) => {
    const {username, email} = req.user; 
    res.status(200).json({username, email});
});

// checks if the user is logged in with a valid token using token verify and then retrieves the relevant JSX markup
router.get('/api/user', tokenVerify, async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        };
        res.status(200).json({username: user.username, email : user.email});
    } catch (error) {
        res.status(500).json({error: 'Internal server error, please try again later.'});
    }
}); 

// Export to other files
module.exports = router; 