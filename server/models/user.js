const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email : {
        type: String,
        requried: true,
        minlength: 1,
        trim: true
    }
});

let user = mongoose.model('User', userSchema);

module.exports = {
    user
};