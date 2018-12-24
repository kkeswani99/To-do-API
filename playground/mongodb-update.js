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


	//findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5c2119cc18e78441150dd013")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// },{ returnOriginal: false}).then((result) => {
	// 	console.log(result);
	// });

	//Challenge

	db.collection('NewCollection').findOneAndUpdate({
		_id: new ObjectID("5c20afed33588838d0cac14c")
	}, {
		$set: {
			name: "Random Name"
		},
		$inc: {
			age: 1
		}
	},{ returnOriginal: false}).then((result) => {
		console.log(result);
	});
	//db.close();
});