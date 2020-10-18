var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/blogs', ctrlBlogs.blogList);
router.post('/blogs', ctrlBlogs.blogListCreate);
router.get('/blogs/:blogid', ctrlBlogs.blogListReadOne);
router.put('/blogs/:blogid', ctrlBlogs.blogUpdate);
router.delete('/blogs/:blogid', ctrlBlogs.blogDeleteOne);

module.exports = router;
