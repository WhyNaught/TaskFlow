const mongoose = require('mongoose'); 
const taskSchema = require('../schemas/taskSchema'); 
const collaboratorSchema = require('./collaboratorSchema');

const taskflowSchema = new mongoose.Schema({
    id: Number, // TaskFlow id, unique for each TaskFlow for each user  
    name: String, // name of TaskFlow
    description: String, // description of TaskFlow
    pending: {type: [taskSchema.schema], default: []},  // pending tasks 
    doing: {type: [taskSchema.schema], default: []}, // in progress tasks
    closed: {type: [taskSchema.schema], default: []}, // finished tasks 
    // consider adding functionality later to allow users to create their own categories to sort their tasks 
    author: String, 
    dob: String, // when the TaskFlow was created (this data will either be private of public, decide later)
    collaborators: {type: [collaboratorSchema.schema], default: []} // other people who can see these tasks 
}); 

module.exports = mongoose.model('TaskFlow', taskflowSchema); 