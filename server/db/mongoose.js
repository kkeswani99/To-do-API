var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
//mongoose.connect('mongodb://karankeswani99:karan99@ds141813.mlab.com:41813/todoapp');
module.exports = {mongoose};