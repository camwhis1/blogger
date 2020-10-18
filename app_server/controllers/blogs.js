var request = require("request");
var apiOptions = {
	        server : "http://localhost:80"
	};

var _showError = function (req, res, status) {
	          var title, content;
	          if (status === 404) {
			  title = "404, page not found";
			  content = "Oh dear. Looks like we can't find this page. Sorry.";
		  } else if (status === 500) {
			  title = "500, internal server error";
			  content = "How embarrassing. There's a problem with our server.";
		  } else {
			  title = status + ", something's gone wrong";
			  content = "Something, somewhere, has gone just a little bit wrong.";
		  }
	          res.status(status);
	          res.render('generic-text', {
			  title : title,
			  content : content
		  });
};

var renderBlogList = function(req, res, responseBody){
	res.render('blogList', {
		title: 'Blog List',
		blogs: responseBody
	});
};

module.exports.list = function(req, res){
	  var requestOptions, path;
	          path = '/api/blogs';
	          requestOptions = {
			  url : apiOptions.server + path,
			  method : "GET",
			  json : {},
			  qs: {}
		  };
	          request(requestOptions, function(err, response, body) {
			  renderBlogList(req, res, body);
		  });
};

var renderBlogEdit = function(req, res, responseBody){
	            res.render('blogEdit', {
			    title: 'Blog Edit',
			    pageHeader: { 
				    title: 'Blog Edit'               
			    },
			    blogs: responseBody
		    });
};

module.exports.edit = function(req, res) {
	var requestOptions, path;
	path = "/api/blogs/" + req.params.blogid;
	    requestOptions = {
		            url : apiOptions.server + path,
		            method : "GET",
		            json : {}
		        }; 
	    request(requestOptions, function(err, response, body) {
		    renderBlogEdit(req, res, body);
	    });
};


module.exports.editPost = function(req, res){
	var id = req.params.blogid;
	path = '/api/blogs/' + id;
	postdata = {
		blogTitle: req.body.blogTitle,
		blogEntry: req.body.blogEntry
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "PUT",
		json : postdata
	};
	request(requestOptions, function(err, response, body) {
		if (response.statusCode === 201) {
			res.redirect('/blogList');
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};

var renderBlogDelete = function(req, res, responseBody){
	res.render('blogDelete', {
		title: 'Blog Delete',
		blogs: responseBody
	});
};

module.exports.del = function(req, res){
	path = "/api/blogs/" + req.params.blogid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function(err, response, body) {
		renderBlogDelete(req, res, body);
	});
};

module.exports.deletePost = function(req, res){
	path = '/api/blogs/' + req.params.blogid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};
	request(requestOptions, function(err, response, body) {
		if (response.statusCode === 204) {
			res.redirect('/blogList');
		} else {				
			_showError(req, res, response.statusCode);
		}
	});
};

module.exports.add = function(req, res){
	res.render('blogAdd', { title: 'Blog Add' });
};

module.exports.addPost = function(req, res){
	var requestOptions, path, postdata;
	path = '/api/blogs/';
	postdata = {
		blogTitle: req.body.blogTitle,
		blogEntry: req.body.blogEntry,
		blogDate: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	request(requestOptions, function(err, response, body) {
		if (response.statusCode === 201) {
			res.redirect('/blogList');
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};
