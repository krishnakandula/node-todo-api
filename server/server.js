const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

//Creating a new todo
app.post('/todos', (req, res) => { 
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});

//Returns all todos
app.get('/todos', (req, res) => {
    Todo.find().then((docs) => {
        res.send({
            todos: docs
        });
    }, (error) => {
        res.status(400).send(error);
    });
});

//Gets individual todo
//GET /todos/:id
//url parameter
app.get('/todos/:id', (req, res) => {
    //Key value pairs
    //key is id, value is id value
    let id = req.params.id;

    //404 - send back empty body
    if(!ObjectID.isValid(id)){
        res.status(404).send(`Invalid id: ${id}`);
    }
    
    //findbyid
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send(`Todo with id: ${id} not found`);
        }

        res.status(200).send({todo});
    }, (error) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};