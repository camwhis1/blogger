var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

//require blog controller
var ctrlBlog = require('../controllers/blog');
//require authentication controller
var ctrlAuth = require('../controllers/authentication');

//Calling GET, POST, PUT, DELETE on blogs
//Functions defined in ../controllers/blog.js
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', auth, ctrlBlog.blogCreate);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', auth, ctrlBlog.blogUpdateOne);
router.delete('/blogs/:blogid', auth, ctrlBlog.blogDeleteOne);

//add routes to API URLs for login and register (Lab 6)
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
