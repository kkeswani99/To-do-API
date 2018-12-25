//Library Imports
var express    = require('express');
var bodyParser = require('body-parser');

//Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {Users}    = require('./models/users'); 

var app = express();

app.use(bodyParser.json());

//Resource Creation
//creating a new Todo
app.post("/todos", (req,res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});


app.listen(3000, () => {
	console.log("Started on PORT 3000");
});

module.exports = {app};