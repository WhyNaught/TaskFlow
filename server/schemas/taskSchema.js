const mongoose = require('mongoose'); 

const taskSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    description: String, 
    author: String, 
    dob: String, 
    order: Number, 
    deadline: String, 
    assigned: [String], // who has the task been assigned to 
    category: String
});

module.exports = mongoose.model('Task', taskSchema); 