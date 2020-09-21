var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlogA = require('../controllers/blog');
var ctrlBlogL = require('../controllers/blogL');

router.get('/', ctrlHome.bHome);
router.get('/blogAdd', ctrlBlogA.bAdd);
router.get('/blogList', ctrlBlogL.bList);

module.exports = router;
