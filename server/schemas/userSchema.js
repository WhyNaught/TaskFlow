// consider switching to PostGreSQL once done with the rest of this project
const mongoose = require('mongoose'); 
const taskflowSchema = require('../schemas/flowSchema'); 

const userSchema = new mongoose.Schema({
    username: String, 
    email: String, // note that this implementation of email is temporary until we implement google OAuth
    password: String, 
    taskflows: {type: [taskflowSchema.schema], default: []},
    shared: {type: [taskflowSchema.schema], default: []}
});

module.exports = mongoose.model('User', userSchema);