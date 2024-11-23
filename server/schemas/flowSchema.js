const mongoose = require('mongoose'); 
const taskSchema = require('../schemas/taskSchema'); 
const collaboratorSchema = require('./collaboratorSchema');

const taskflowSchema = new mongoose.Schema({
    id: Number, 
    name: String, 
    description: String, 
    pending: {type: [taskSchema.schema], default: []}, 
    doing: {type: [taskSchema.schema], default: []}, 
    closed: {type: [taskSchema.schema], default: []}, 
    author: String, 
    dob: String, 
    collaborators: {type: [collaboratorSchema.schema], default: []} 
}); 

module.exports = mongoose.model('TaskFlow', taskflowSchema); 