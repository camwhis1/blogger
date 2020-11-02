var mongoose = require('mongoose');
//Next 3 lines included to avoid warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//Users Schema
var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

//*** Methods for Users Schema ***//

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, process.env.JWT_SECRET); //Do not keep secret in code
};

mongoose.model('User', userSchema);
