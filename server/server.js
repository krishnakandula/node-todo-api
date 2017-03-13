const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

//Creating a new todo
app.post('/todos', (req, res) => {
    
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});