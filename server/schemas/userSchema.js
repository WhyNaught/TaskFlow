const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: String, 
    email: String, // note that this implementation of email is temporary until we implement google OAuth
    password: String
});

module.exports = mongoose.model('User', userSchema);