const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// let newTodo = new Todo({
//     text: 'Cook dinner'
// });

let t2 = new Todo({
    text: 'Go to the gym',
    completed: false
});

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (error) => {
//     console.log('Unable to save todo', error);
// });

t2.save().then((doc) => {
    console.log('Saved todo', doc);
}, (error) => {
    console.log('Unable to save todo', error);
});

