var mongoose = require('mongoose');
var Loc = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
	  res.status(status);
	  res.json(content);
};

var buildBlogList = function(req, res, results, stats) {
	  var blogs = [];
	  results.forEach(function(doc) {
		      blogs.push({
			            blogTitle: doc.obj.blogTitle,
			            blogEntry: doc.obj.blogEntry,
			            blogDate: doc.obj.blogDate,
			            _id: doc.obj._id
			          });
		    });
	  return blogs;
};

//GET
module.exports.blogList = function(req, res) {
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
				console.log(err);
				sendJSONresponse(res, 404, err);
				return;
			}
		console.log(blog);
		sendJSONresponse(res, 200, blog);
		});
	}else{
		console.log('No blogid');
		sendJSONresponse(res, 404, {
			"message": "No blogid"
		});
	}
};

//POST
module.exports.blogListCreate = function(res, req) {
	console.log(req.body);
	Loc.create({
		blogTitle: req.body.blogTitle,
		blogEntry: req.body.blogEntry,
		blogDate: req.body.blogDate,
	}, function(err, blog) {
		if (err) {
			console.log(err);
			sendJSONresponse(res, 400, err);
		}else{
			console.log(blog);
			sendJSONresponse(res, 201, blog);
		}
	});
};

//PUT
module.exports.blogUpdate = function(req, res) {
	if(!req.params.blogid) {
		sendJSONresponse(res, 404, {
			"message": "Not found, id needed"
		});
		return;
	}
	Loc
		.findById(req.params.blogid)
		.exec(
			function(err, blogid) {
				if (!blog) {
				sendJSONresponse(res, 404, {
					"message": "locationid not found"
			});
			return;
			} else if (err) {
				sendJSONresponse(res, 400, err);
				return;
			}
			blogs.blogTitle = req.body.blogTitle;
			blogs.blogEntry = req.body.blogEntry;
			blogs.blogDate = req.body.blogDate;
			blogs.save(function(err, blogs){
				if(err){
					sendJSONresponse(res, 200, blogs);
				}
			});
		}
	);
}

//Delete
module.exports.blogDeleteOne = function(req, re) {
	var blogid = req.params.blogid;
	if (blogid) {
		Loc
		.findByIdAndRemove(blogid)
		.exec(
			function(err, blog) {
				if (err) {
					console.log(err);
					sendJSONresponse(res, 404, err);
					return;
				}
				console.log("Blog id " + blogid + " deleted");
				sendJSONresponse(res, 204, null);
			}
		);
	} else {
		sendJSONresponse(res, 404, {
			"message": "No blogid"
		});
	}
};
		
