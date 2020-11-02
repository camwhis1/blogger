var mongoose = require('mongoose');
var dbURI = 'mongodb://blogs:blogs@localhost/blogs';

mongoose.connect(dbURI);

//Report when DB is connected/disconnected/or error occurs
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// Closes (disconnects) from Mongoose DB upon shutdown    
gracefulShutdown = function (msg, callback) {
   mongoose.connection.close(function () {
       console.log('Mongoose disconnected through ' + msg);
           callback();
    });
};

//For app termination
process.on('SIGINT', function() {
	  gracefulShutdown('app termination', function () {
		      process.exit(0);
	  }); });

//get schemas
require('./blogs');
require('./users');
