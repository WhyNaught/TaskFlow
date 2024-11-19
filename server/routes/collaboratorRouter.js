const express = require('express'); 
const router = express.Router(); 
const User = require('../schemas/userSchema'); 

// patch request to alter the collaborators array for each taskflow 
router.patch('/api/user/:username/:taskflowId/share', async (req, res) => {
    const {username, taskflowId} = req.params; 
    const {collaboratorName, editor} = req.body; // check if this implementation is correct 
    try {
        const collaborator = await User.findOne({username: collaboratorName}); 
        if (!collaborator) {
            return res.status(404).json({error: "No user with this username exists"}); 
        }; 
        const user = await User.findOne({username: username}); 
        const taskflows = user.taskflows; 
        const taskflow = taskflows.find((flow) => flow.id === parseInt(taskflowId));
        if(!taskflow) {
            return res.status(404).json({error: "taskflow not found"}); 
        }; 
        const collaborators = (taskflow.collaborators ? taskflow.collaborators : []);  
        if (collaborators.find((collaborator) => collaboratorName === collaborator.username)) {
            console.log('This collaborator has already been added!'); 
            return res.status(404).json({error: "Collaborator already exists"}); 
        };
        collaborators.push({
            username: collaboratorName, 
            editor: editor, 
            email: collaborator.email
        });

        const result = await User.findOneAndUpdate({username: username, "taskflows.id": taskflowId}, {
            $set: {
                "taskflows.$.collaborators": collaborators
            }
        });

        if (result.modifiedCount > 0) {
            res.status(200).json({message: 'Collaborator added succesfully!'}); 
        };
    } catch (err) {
        console.error({error: "Error adding a collaborator", err}); 
        res.status(500).json({error: "An error occurred while adding a collaborator"}); 
    };
});

// get request to retrieve all tasks shared with the collaborator 
router.get('/api/user/shared', async (req, res) => {
    const {username} = req.query; 
    const sharedFlows = []; 
    try {
        // parse through every user and every one of their taskflows and append
        // whichever ones the collaborator's name shows up in 
        const users = await User.find({
            "taskflows.collaborators": username
        });

        console.log(users); 

        users.forEach(user => {
            user.taskflows.forEach(taskflow => {
                if (taskflow.collaborators.includes(username)) {
                    sharedFlows.push(taskflow);
                };
            });
        });

        res.json({sharedFlows: sharedFlows}); 
    } catch (err) {
        console.error({error: 'Error retrieving shared taskflows'}); 
        res.status(500).json({error: "Something went wrong whilst trying to receive your shared taskflows"}); 
    };
});

module.exports = router; 