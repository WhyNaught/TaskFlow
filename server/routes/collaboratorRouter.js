const express = require('express'); 
const router = express.Router(); 
const User = require('../schemas/userSchema'); 

// patch request to alter the collaborators array for each taskflow 
// rememebr to add feature later that overrides the editor status of the collaborator 
router.patch('/api/user/:username/:taskflowId/share', async (req, res) => {
    const {username, taskflowId} = req.params; 
    const {collaboratorName, editor} = req.body; 
    try {
        const collaborator = await User.findOne({username: collaboratorName});
        if (!collaborator) {
            res.status(404).json({error: "User not found, please check casing, spelling, etc."});
        }; 

        const result = await User.findOne({username: username, "taskflows.id": taskflowId}, {
            "taskflows.$": 1
        }); 

        const taskflow = result.taskflows[0];  
        taskflow.collaborators.forEach((coll) => {
            if (coll.username === collaboratorName) {
                console.log("User already exists"); 
                throw new Error('User is already a collaborator'); 
            }; 
        }); 

        await User.findOneAndUpdate({username: collaboratorName}, {
            $push: {
                shared: taskflow
            }
        });

        await User.findOneAndUpdate({username: username, "taskflows.id": taskflowId}, 
            {$push: {"taskflows.$.collaborators": {
                username: collaboratorName, 
                editor: editor, 
                email: collaborator.email
            }}}
        ); 

        res.status(200).json({message: 'Collaborator added succesfully!'}); 
    } catch (err) {
        console.error({error: "Error adding a collaborator", err}); 
        res.status(500).json({error: "An error occurred while adding a collaborator"}); 
    };
});

// get request to retrieve all tasks shared with the collaborator 
router.get('/api/user/shared', async (req, res) => {
    const {username} = req.query; 
    try {
        const user = await User.findOne({username: username});
        const sharedFlows = user.shared;  

        res.json({sharedFlows: sharedFlows}); 
        // res.status(200).json({message: "Shared taskflows received successfully"}); 
    } catch (err) {
        console.error({error: 'Error retrieving shared taskflows'}); 
        res.status(500).json({error: "Something went wrong whilst trying to receive your shared taskflows"}); 
    };
});

module.exports = router; 