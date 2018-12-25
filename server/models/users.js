var mongoose = require("mongoose");

var Users = mongoose.model('Users', {
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 1
	}
});

module.exports = {Users};