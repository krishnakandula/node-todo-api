const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '58c74bc3e34d6c1f2848035b';

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }
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

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((error) => {
//     console.log(error);
// });

//3 cases
//1: Query has no errors, user is not found
//2: Query has no errors, user is found
//3. Query has errors
User.findById('58c71022fcc8d618b092ca8e').then((user) => {
    if(!user){
        return console.log('Id not found');
    }
    console.log('Todo by id: ', JSON.stringify(user, undefined, 2));
}, (error) => {
    console.log(error);
});