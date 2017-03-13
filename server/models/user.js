const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

let User = mongoose.model('User', userSchema);

module.exports = {
    User
};