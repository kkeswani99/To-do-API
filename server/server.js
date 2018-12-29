require('./config/config');

//Library Imports
const _            = require('lodash');
var express        = require('express');
var bodyParser     = require('body-parser');
const {ObjectID}   = require('mongodb');
const bcrypt  = require('bcryptjs');

//Local Imports
var {mongoose}     = require('./db/mongoose');
var {Todo}         = require('./models/todo');
var {Users}        = require('./models/users'); 
var {authenticate} = require('./middleware/authenticate');

var app            = express();
const port         = process.env.PORT || 3000;

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
	Todo.findOneAndDelete({_id: id}).then((todo) => {
		if(!todo)
		{
			return res.status(404).send();
		}
		
		return res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/todos/:id', (req,res) => {
	var id   = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed)
	{
		body.completedAt = new Date().getTime();
	} else {
		body.completed   = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate({_id:id}, {$set: body}, {new: true}).then((todo) => {
		if(!todo)
		{
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

//POST /users
app.post('/users',(req,res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new Users(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

var authenticate = (req,res,next) => {
	var token = req.header('x-auth');

	Users.findByToken(token).then((user) => {
		if(!user) {
			return Promise.reject();
		}
		req.user  = user;
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

app.get('/users/me', authenticate, (req,res) => {
	res.send(req.user);
});

app.post('/users/login', (req,res) => {
	var body = _.pick(req.body, ['email', 'password']);
	Users.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = {app};