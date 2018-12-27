const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {Users}    = require('./../server/models/users');

//Todo.remove
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

//Todo.findOneAndRemove()
// Todo.findOneAndRemove({_id: '5c23a51818e78441150deaf7'}).then((todo) => {
	
// });


Todo.findByIdAndRemove('5c23a51818e78441150deaf7').then((todo) => {
	console.log(todo);
});