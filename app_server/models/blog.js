var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({
	blogTitle: {type: String, required: true},
	blogEntry: {type: String, required: true},
	blogDate: {type: String, required: true}
});
