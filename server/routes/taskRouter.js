const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const TaskFlow  = require('../schemas/flowSchema'); 

// post request to add user tasks to database when created 
router.post('/api/user/create', async (req, res) => {
    const {name, description, username} = req.body; 
    const id = Date.now(); 
    try {
        const newTask = new TaskFlow({
            id: id, // generates a unique ID 
            name: name,
            description: description,
            author: username, 
            dob: new Date().toISOString(), 
            pending: [],
            doing: [],
            done: [],
            collaborators: [] 
        });
        try {
            await newTask.save(); 
            res.status(200).json({message: 'TaskFlow added successfully!'})
        } catch (err) {
            res.status(500).json({error: "Something went wrong", err}); 
        }; 
    } catch (err) {
        console.error('Error adding a new TaskFlow', err);
        res.status(500).json({error: "An error occurred while adding the TaskFlow"});  
    }; 
});

// route to save changes  
router.patch('/api/user/save/:username/:taskflowId', async (req, res) => { 
    const {username, taskflowId} = req.params;
    const {pending, doing, closed} = req.body; 
    try {
        await TaskFlow.findOneAndUpdate({id: taskflowId}, 
            {
                $set: {
                    pending: pending,
                    doing: doing,
                    closed: closed
                }
            }
        )
        res.status(200).json({message: "Changes Saved Succesfully!"});
    } catch (err) {
        console.error('Error saving changes, err'); 
        res.status(500).json({error: "An error occured while saving the TaskFlow"}); 
    }
});

// get request to retrieve user taskflows
router.get('/api/user/taskflows', async (req, res) => {
    const {username, email} = req.query; 
    try {
        const taskflows = await TaskFlow.find({
            author: username
        });

        res.json({taskflows: taskflows}); 
    } catch (err) {
        console.error('Error retrieving user TaskFlows', err); 
        res.status(500).json({error: "An error occured while retrieving your TaskFlows"}); 
    };
});

// get request for individual taskflows
router.get('/api/user/taskflow', async (req, res) => {
    const {taskflowId} = req.query; 
    try  {
        const taskflow = await TaskFlow.findOne({id: taskflowId}); 
        res.status(200).json({taskflow}); 
    } catch (err) {
        res.status(500).json({error: "Something went wrong", err}); 
    };
});

module.exports = router; 