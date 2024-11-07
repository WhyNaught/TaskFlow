const mongoose = require('mongoose'); 
const taskSchema = require('../schemas/taskSchema'); 
const collaboratorSchema = require('./collaboratorSchema');

const taskflowSchema = new mongoose.Schema({
    id: Number, // TaskFlow id, unique for each TaskFlow for each user  
    name: String, // name of TaskFlow
    description: String, // description of TaskFlow
    pending: [taskSchema.schema],  // pending tasks 
    doing: [taskSchema.schema], // in progress tasks
    closed: [taskSchema.schema], // finished tasks 
    // consider adding functionality later to allow users to create their own categories to sort their tasks 
    author: String, // creator of the TaskFlow
    dob: String, // when the TaskFlow was created (this data will either be private of public, decide later)
    collaborators: [collaboratorSchema.schema] // other people who can see these tasks 
}); 

module.exports = mongoose.model('TaskFlow', taskflowSchema); 