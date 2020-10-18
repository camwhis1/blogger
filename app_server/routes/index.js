var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlogL = require('../controllers/blogs');

router.get('/', ctrlHome.home);
router.get('/blogList', ctrlBlogL.list);

router.get('/blogEdit/:blogid', ctrlBlogL.edit);
router.post('/blogEdit/:blogid', ctrlBlogL.editPost);
	
router.get('/blogDelete/:blogid', ctrlBlogL.del);
router.post('/blogDelete/:blogid', ctrlBlogL.deletePost);


router.get('/blogAdd', ctrlBlogL.add);
router.post('/blogAdd', ctrlBlogL.addPost);

module.exports = router;
