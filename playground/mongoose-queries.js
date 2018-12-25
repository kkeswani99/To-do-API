const {ObjectID} = require('mongodb');


const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {Users}    = require('./../server/models/users');
// var id = "5c225ced85055d65305d80a111";

// if(! ObjectID.isValid(id)) 
// {
// 	console.log("ID Not Valid");
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });



// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todos', todo);
// });



// Todo.findById(id).then((todo) => {
// 	if(!todo)
// 	{
// 		return console.log("ID not found!!!");
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// -------------------------------------------------
//Challenge
var id = "5c21e0a6d9fd566d005880b6";

Users.findById(id).then((user) => {
	if(!user)
	{
		console.log("ID Not Found!!!");
	}
	console.log("User Found", user);
}).catch((e) => console.log(e));
