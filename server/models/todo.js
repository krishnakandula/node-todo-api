const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }, 
    completed: {
        type: boolean,
        default: false
    },
    completedAt: {
        type: number,
        default: null
    }
});

let todo = new mongoose.model('Todo', todoSchema);

module.exports = {
    todo
};