var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogList');
var ctrlBlogA = require('../controllers/blogAdd');

router.get('/blogList', ctrlBlogs.blogList);
router.post('/blogList', ctrlBlogs.blogListCreate);
router.get('/blogList/:blogListid', ctrlBlogs.blogList);
router.put('/blogList/:blogListid', ctrlBlogs.blogUpdate);

//rouier.get('/blogEdit', ctrlBlogs.editBlog);


//router.get('/blogDelete', ctrlBlogs.deleteBlog);


//router.get("/blogAdd", ctrlBlogA.blogAdd)
//router.post('/blogAdd', ctrlBlogA.blogAdd);


module.exports = router;
