const mongoose = require('mongoose'); 

const collaboratorSchema = new mongoose.Schema({
    username: String, 
    editor: {type: Boolean, default: false}, // allows the owner to set perms
    email: String
});

module.exports = mongoose.model('Collaborator', collaboratorSchema); 