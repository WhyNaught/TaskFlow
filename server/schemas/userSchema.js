// consider switching to PostGreSQL once done with the rest of this project
const mongoose = require('mongoose'); 
const collaboratorSchema = require('../schemas/collaboratorSchema');

const userSchema = new mongoose.Schema({
    username: String, 
    email: String, // note that this implementation of email is temporary until we implement google OAuth
    password: String, 
    taskflows: {type: [{ //consider making another mongoose schema for taskflows 
        id: Number, 
        name: String, 
        author: String, 
        dob : String, // date when it was created 
        description: String,
        order: {type: Number, default: 1}, // priority order (change the default to the length of the existing array + 1)
        pending: {type: Boolean, default: true}, // to-do
        doing: {type: Boolean, default: false}, // in-progress
        done: {type: Boolean, default: false}, // done
        deadline: {type: String, default: ''}, 
        collaborators: [collaboratorSchema.schema] // holds all other collaborators
    }], default: []}
});

module.exports = mongoose.model('User', userSchema);