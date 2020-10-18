var request = require("request");
var apiOptions = {
	server : "http://localhost:80"
};

module.exports.home = function(req, res, responseBody){
	res.render('index2', {title: 'Blog Home'});
};
