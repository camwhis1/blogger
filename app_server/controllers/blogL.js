module.exports.bList = function(req, res){
	res.render('blogList', { 
		title: 'Blog List',
		pageHeader: { 
			title: 'Blog List',
		},
		blog: [{
			        blogTitle: 'We did one!',
			        blogEntry: 'I hope this gets put into my blog',
			        blogDate: '9/22/2020'
		},{
				blogTitle: 'We did two!',
				blogEntry: 'I did it',
				blogDate: '9/24/2020'
		},{
				blogTitle: 'Third entry',
				blogEntry: 'complete',
				blogDate: '9/24/2020'
		}]
	});
};

module.exports.eList = function(req, res){
	        res.render('blogEdit', {title: 'Blog Edit'});
};
module.exports.dList = function(req, res){
	        res.render('blogDelete', { title: 'Blog Delete' });
};
