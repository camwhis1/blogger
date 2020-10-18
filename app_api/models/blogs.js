var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema ({
	        blogTitle: {type: String, required: true},
	        blogEntry: {type: String, required: true},
	        blogDate: {type: String, "default": new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}
});

mongoose.model('Blog', blogSchema);
