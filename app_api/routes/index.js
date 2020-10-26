var express = require('express');
var router = express.Router();
//require blog controller
var ctrlBlog = require('../controllers/blog');

//Calling GET, POST, PUT, DELETE on blogs
//Functions defined in ../controllers/blog.js
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.blogCreate);
router.get('/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/blogs/:blogid', ctrlBlog.blogUpdateOne);
router.delete('/blogs/:blogid', ctrlBlog.blogDeleteOne);

module.exports = router;
