//Library Imports
var express    = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {Users}    = require('./models/users'); 

var app = express();
const port = process.env.PORT || 3000;

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

//Showing all Todos
app.get('/todos', (req,res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

//Getting todos using Id
app.get('/todos/:id',(req,res) => {
	var id = req.params.id;
	//Validating whether id entered by user is valid or not
	if(!ObjectID.isValid(id))
	{
		//console.log("ID entered by user is invalid");
		return res.status(404).send();
	}
	else
	{
		Todo.findById(id).then((todo) => {
			if(!todo)
			{
				return res.status(404).send();
			}
			else
			{
				return res.send({todo});
			}
		}).catch((e) => {
			res.status(400).send();
		});
	}
});

//Creating delete Route
app.delete('/todos/:id', (req,res) => {
	var id  = req.params.id;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo)
		{
			return res.status(404).send();
		}
		
		return res.status(200).send(todo);
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = {app};