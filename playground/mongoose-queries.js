const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = '58c74bc3e34d6c1f2848035b';

// Todo.find({
//     //No need to convert id to ObjectId, mongoose does for us
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     //No need to convert id to ObjectId, mongoose does for us
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((error) => {
    console.log(error);
});