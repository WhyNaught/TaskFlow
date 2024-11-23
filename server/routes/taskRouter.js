const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const TaskFlow  = require('../schemas/flowSchema'); 

// post request to add user tasks to database when created 
router.post('/api/user/create', async (req, res) => {
    const {name, description, username} = req.body; 
    const id = Date.now(); 
    try {
        /* const result = await User.updateOne({username: username}, 
            {
            $push: {
                taskflows: {
                    id: id, // generates a unique ID 
                    name: name,
                    description: description,
                    author: username, 
                    dob: new Date().toISOString(), 
                    pending: [],
                    doing: [],
                    done: [],
                    collaborators: [] 
                }
            }
            }
        ); */

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
        } catch (err) {
            res.status(500).json({error: "Something went wrong", err}); 
        }; 

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

// route to save changes  
router.patch('/api/user/save/:username/:taskflowId', async (req, res) => { 
    const {username, taskflowId} = req.params;
    const {pending, doing, closed} = req.body; 
    try {
        await User.findOneAndUpdate(
            { username: username, "taskflows.id": taskflowId },  
            {
                $set: {
                    "taskflows.$.pending": pending,
                    "taskflows.$.doing": doing,
                    "taskflows.$.closed": closed
                }
            },
            { new: true }  
        );

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
        /*
        const user = await User.findOne({username: username, email: email}); 
        if (!user) {
            return res.status(404).json({error: "User not found"}); 
        };
        */

        const taskflows = await TaskFlow.find({
            author: username
        });

        res.json({taskflows: taskflows}); 
    } catch (err) {
        console.error('Error retrieving user TaskFlows', err); 
        res.status(500).json({error: "An error occured while retrieving your TaskFlows"}); 
    };
});

module.exports = router; 