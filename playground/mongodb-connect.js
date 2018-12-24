//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' ,/*{useNewUrlParser: true},*/ (err, db) => {
	if(err)
	{
		return console.log("Unable to connect MongoDB Server");
	}
	console.log("Connected to MongoDB Server");

	// db.collection("Todos").insertOne({
	// 	text: "Something To Do",
	// 	completed: false
	// }, (err,result) => {
	// 	if(err)
	// 	{
	// 		return console.log("Unable to insert todo", err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });
	// db.collection('NewCollection').insertOne({
	// 	name: 'Kritika Keswani',
	// 	age: 17,
	// 	location: "Shalimar Bagh New Delhi India"
	// }, (err,result) => {
	// 	if(err)
	// 	{
	// 		return console.log("Unable to insert into New Collection", err);
	// 	}

	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	db.close();
});