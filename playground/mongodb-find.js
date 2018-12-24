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


	//Fetching entire data or all documents
	// db.collection('Todos').find().toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch Todos');
	// });
	// ------------------------------------------------------------
	
	//To Fetch elements or docs by ObjectId
	// db.collection('Todos').find({
	// 	_id: new ObjectID("5c20adb81397376ab4223120")
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch Todos');
	// });
	//-----------------------------------------------------------------

	//To count no of docs in our collection
	//We are treating this also as a promise
	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch Todos');
	// });
	//-------------------------------------------------------------------


	db.collection('NewCollection').find({name: "Karan Keswani"}).toArray().then((res) => {
		console.log('Users with name Karan Keswani: ');
		console.log(JSON.stringify(res, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch Todos');
	});
	//db.close();
});