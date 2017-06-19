var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'companiesController',
		templateUrl: 'views/companies.html'
	})
	.when('/companies', {
		controller:'companiesController',
		templateUrl: 'views/companies.html'
	})
	.when('/companies/details/:id',{
		controller:'companiesController',
		templateUrl: 'views/company_details.html'
	})
	.when('/companies/add',{
		controller:'companiesController',
		templateUrl: 'views/add_company.html'
	})
	.when('/companies/edit/:id',{
		controller:'companiesController',
		templateUrl: 'views/edit_company.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});