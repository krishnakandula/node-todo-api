require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT;

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
    Todo.find().then((todos) => {
        res.send({
            todos
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
        return res.status(404).send(`Invalid id: ${id}`);
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

app.delete('/todos/:id', (req, res) => {
    //Get id
    let id = req.params.id;
    //Validate id -> not valid? return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    //Remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        
        res.status(200).send({todo});
    }, (error) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    //lodash method that picks properties from req.body obj
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send(`Invalid id: ${id}`);
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    

    user.save().then((user) => {
        res.status(200).send(user);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};