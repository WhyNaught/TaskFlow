const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const mongoose = require('mongoose');
const tokenVerify = require('../middleware/tokenVerify'); 

// post request to add user tasks to database when created 
router.post('/api/user/create', async (req, res) => {
    const {name, description, username} = req.body; 

    try {
        const result = await User.updateOne({username: username}, 
            {
            $push: {
                taskflows: {
                    id: Date.now(), // generates a unique ID 
                    name: name,
                    description: description,
                    author: username, 
                    dob: new Date().toISOString(), 
                    order: 1,
                    pending: true,
                    doing: false,
                    done: false,
                    deadline: '',
                    collaborators: [] 
                }
            }
            }
        ); 
        if (result.modifiedCount > 0) {
            res.status(200).json({message: 'TaskFlow added successfully!'});
        } else {
            res.status(404).json({message: 'User not found.'}); 
        }; 
    } catch (err) {
        console.error('Error adding a new TaskFlow', err);
        res.status(500).json({error: "An error occurred while adding the TaskFlow"});  
    }; 
});

// get request to retrieve user taskflows
router.get('/api/user/taskflows', tokenVerify, async (req, res) => {
    const {username, email} = req.query; 
    try {
        const user = await User.findOne({username: username, email: email}); 
        if (!user) {
            return res.status(404).json({error: "User not found"}); 
        };
        res.json({taskflows: user.taskflows}); 
    } catch (err) {
        console.error('Error retrieving user TaskFlows', err); 
        res.status(500).json({error: "An error occured while retrieving your TaskFlows"}); 
    };
});

module.exports = router; 