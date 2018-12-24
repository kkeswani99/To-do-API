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


	//deleteMany
	// db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((result) => {
	// 	console.log(result);
	// });
	//----------------------------------------------------------------------------
	

	//deleteOne
	// db.collection('Todos').deleteOne({text: "Eat Lunch"}).then((result) => {
	// 	console.log(result);
	// });
	//-----------------------------------------------------------------------------
	
	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });
	//-----------------------------------------------------------------------------
	
	//Challenge
	// db.collection('NewCollection').findOneAndDelete({name: "Kritika Keswani"}).then((result) => {
	// 	console.log(result);
	// });

	//Now we want to delete document by id
	db.collection('NewCollection').findOneAndDelete({
		_id: new ObjectID("5c20b62eaba46b18f4d557e4")
	}).then((result) => {
		console.log(result);
	});

	//db.close();
});