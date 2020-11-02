var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

//*** routerProvider ***
app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})

		.when('/blogList', {
			templateUrl: 'pages/blogList.html',
			controller: 'ListController',
			controllerAs: 'vm'
		})

		.when('/blogAdd', {
			templateUrl: 'pages/blogAdd.html',
			controller: 'AddController',
			controllerAs: 'vm'
		})

		.when('/blogEdit/:id', {
			templateUrl: 'pages/blogEdit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})

		.when('/blogDelete/:id', {
			templateUrl: 'pages/blogDelete.html',
			controller: 'DeleteController',
			controllerAs: 'vm'
		})

		.when('/register', {
			templateUrl: 'common/auth/register.html',
			controller: 'RegisterController'
			controllerAs: 'vm'
		})

		.when('/login', {
			templateUrl: 'common/auth/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);
});

//*** State Provider ***//
app.config(function($stateProvider) {
	$stateProvider
		.state('blogList', {
			url: '/blogList',
			templateUrl: 'pages/blogList.html',
			controller: 'ListController'
		});
});

//**** REST Web API functions ***

function getBlogs($http) {
	return $http.get('/api/blogs');
}

function getBlogById($http, id) {
	return $http.get('/api/blogs/' + id);
}

function addBlog($http, authentication, data) {
	return $http.post('/api/blogs/', data, { headers : { Authorization: 'Bearer ' + authentication.getToken() }} );
}

function updateBlog($http, authentication, id, data) {
	return $http.put('/api/blogs/' + id, data, { headers : { Authorization: 'Bearer ' + authentication.getToken() }} );
}

function deleteBlog($http, authentication, id) {
	return $http.delete('/api/blogs/' + id, { headers : { Authorization: 'Bearer ' + authentication.getToken() }} );
}

//*** Controllers ***

//home (index) page controller
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "Cameron Whisler's Blog Site"
	};
	vm.message = "Welcome to my blog site!";
});

//blog add controller
app.controller("AddController", [ '$http', '$routeParams', '$state', function AddController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.title = "Add Blog";

	vm.submit = function() {
		var data = vm.blog;
		data.title = addForm.title.value;
		data.text = addForm.text.value;

		addBlog($http, data)
			.success(function(data) {
				vm.message = "Blog data added!";
				$state.go('blogList');
			})
			.error(function (e) {
				vm.message = "Could not add blog";
			});
	}
}]);

//blog list controller
app.controller('ListController', function ListController($http) {
	var vm = this;
	vm.pageHeader = {
		title: 'Blog List'
	};

	getBlogs($http).success(function(data) {
		vm.blogs = data;
		vm.message = "Blog data found!";
	})
	.error(function (e) {
		vm.message = "Could not get list of blogs";
	});
});

//edit blog controller
app.controller('EditController', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {}; //start with empty blog
	vm.id = $routeParams.id; 
	vm.pageHeader = {
		title: 'Blog Edit'
	};

	//Get blog data to be displayed on edit page
	getBlogById($http, vm.id).success(function(data) {
		vm.blog = data;
		vm.message = "Blog data found!";
	})
	.error(function (e) {
		vm.message = "Could not get blog with id " + vm.id;
	});

	//Submit function attached to ViewModel for use in form
	vm.submit = function() {
		var data = vm.blog;
		data.title = userForm.title.value;
		data.text = userForm.text.value;

		updateBlog($http, vm.id, data).success(function(data) {
			vm.message = "Blog data updated!";
			$state.go('blogList'); //refer to book for info on StateProvider
		})
		.error(function (e) {
			vm.message = "Could not update blog with id " + vm.id;
		});
	}
}]);

//delete blog controller
app.controller("DeleteController", [ '$http', '$routeParams', '$state', function DeleteController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {};
	vm.id = $routeParams.id;
	vm.title = "Delete Blog";

	getBlogById($http, vm.id)
		.success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found!";
		})
		.error(function (e) {
			vm.message = "Could not get blog with id " + vm.id;
		});

	vm.submit = function() {
		var data = {};
		deleteBlog($http, vm.id)
			.success(function(data) {
				vm.message = "Blog data deleted!";
				//go back to blogList
				$state.go('blogList');
			})
			.error(function (e) {
				vm.message = "Could not delete blog with id " + vm.id;
			});
	}

	vm.cancel = function() {
		$state.go('blogList');
	}
}]);
