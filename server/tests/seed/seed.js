const {ObjectID} = require('mongodb');
const jwt        = require('jsonwebtoken');

const {Todo}     = require('./../../models/todo');
const {Users}    = require('./../../models/users');


const userOneId  = new ObjectID(); 
const userTwoId  = new ObjectID();
const users = [{
	_id      :  userOneId,
	email    : 'karankeswani99@gmail.com',
	password : 'userOnePass',
	tokens   : [{
		access : 'auth',
		token  :  jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}] 
}, {
	_id       : userTwoId,
	email     : 'jen@example.com',
	password  : 'userTwoPass',
	// tokens   : [{
	// 	access : 'auth',
	// 	token  :  jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
	// }] 
}];


const todos = [{
	_id: new ObjectID(),
	text: "First Test Todo"
}, {
	_id: new ObjectID(),
	text: "Second Test Todo",
	completed: true,
	completedAt: 333
}];

const populateTodos = (done) => {
	Todo.deleteMany({}).then(() => {
		Todo.insertMany(todos)//.then(() => done());
	}/*, (e) => {
		done();
	}*/).then(() => done());
};

const populateUsers = (done) => {
	try {
	Users.deleteMany({}).then(() => {
		var userOne = new Users(users[0]).save();
		var userTwo = new Users(users[1]).save();

		return Promise.all([userOne,userTwo]).then(() => done())
	}).then(() => done());}
	catch (e) {
		done(e);
	}
	done();
	this.timeout(1000);
};


module.exports = {todos, populateTodos, users, populateUsers};