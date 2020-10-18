var mongoose = require('mongoose');
var Loc = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
	          res.status(status);
	          res.json(content);
}

var buildBlogList = function(req, res, results) {
	var blogs = [];
	results.forEach(function(obj) {
		blogs.push({ 
			blogTitle: obj.blogTitle,
			blogEntry: obj.blogEntry,
			blogDate: obj.blogDate,
			_id: obj._id
		});
	});
	return blogs;
};

//GET
module.exports.blogList = function(req, res) {
	        console.log('Getting blog list');
	        Loc
	                .find()
	                .exec(function(err, results) {
				if (!results) {
					sendJSONresponse(res, 404, {	
						"message": "no blog found"		
					});
					return;
				} else if (err) {
					console.log(err);
					sendJSONresponse(res, 404, err);
					return;
				}
				console.log(results);
				sendJSONresponse(res, 200, buildBlogList(req, res, results));
			});
};

module.exports.blogListReadOne = function(req, res) {
	        console.log('Finding blog', req.params);
	        if(req.params && req.params.blogid) {
			Loc
				.findById(req.params.blogid)
				.exec(function(err, blog) {
					if (!blog) {
						sendJSONresponse(res, 404, {
							"message": "blogid not found"
						});
						return;
					}else if(err){
						sendJSONresponse(res, 404, err);
						return;	
				        }
					sendJSONresponse(res, 200, blog);
				});
		}else{
			sendJSONresponse(res, 404, {
				"message": "No blogid"
			});
		}
};

//POST
module.exports.blogListCreate = function(req, res) {
	        console.log(req.body);
	        Loc
		.create({
			blogTitle: req.body.blogTitle,
			blogEntry: req.body.blogEntry,
			blogDate: req.body.blogDate,
		}, 
			function(err, blog) {
			if (err) {
				console.log(err);
				sendJSONresponse(res, 400, err);
			}else{
				console.log(blog);
				sendJSONresponse(res, 201, blog);
			}
		});
};

module.exports.blogUpdate = function(req, res) {
	        console.log("Updating a blog entry with id of " + req.params.blogid);
	        console.log(req.body);
	        Loc
	        .findOneAndUpdate(
			{ _id: req.params.blogid },
			{ $set: {"title": req.body.blogTitle, "text": req.body.blogEntry}},
			function(err, response) {
				if (err) {
					sendJSONresponse(res, 400, err);
				} else {
					sendJSONresponse(res, 201, response);
				}
			});
};

//DELETE
module.exports.blogDeleteOne = function(req, res) {
	console.log("Deleting blog entry with id of " + req.params.blogid);
	console.log(req.body);
	Loc
		.findByIdAndRemove(req.params.blogid)
		.exec(function(err, response) {
			if (err) {
				sendJSONresponse(res, 404, err);
			}else{
				sendJSONresponse(res, 204, null);
			}
		});
};
