var myApp = angular.module('myApp');

function createNode(classNode, textNode){

				

				var tr = $('<tr/>', {
				class: classNode
				});

				var td = $('<td/>').text(textNode);
				

				tr
					.append(td);
					

				return tr;
			};

function createCompany(parentCompany, childCompaies, earnings, index){
	var table = $('<table/>', {
				class: "tree"
			});
	

	var parentNode = createNode("treegrid-" + index + 1 + " treegrid-parent-0",parentCompany);
	var arr = childCompaies.split(', ');
	var earingsNode = createNode("treegrid-parent-0" ,' Estimated earnings : ' + earnings);
	var mainNode = createNode("treegrid-0","Company Name:");
	

	table
		.append(mainNode)
		.append(parentNode)
		;

	for (var i = 0; i < arr.length; i++) {
			  
			 table.append(createNode("treegrid-parent-" + index + 1,'Child company : ' + arr[i]))
			}
	table.append(earingsNode);

	return table;

	
};
myApp.controller('companiesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	// console.log('companiesController loaded...');

	

	$scope.getcompanies = function(){
		$http.get('/api/companies').success(function(response){
			$scope.companies = response;

			
			var elems = response.map(function(item, index) {
						return createCompany(item.parentCompany, item.childCompaies, item.earnings, index);
					});

			const root = $('#root');
			root.empty();
			root.append(elems);

			$('.tree').treegrid();	
		});
	}

	$scope.getcompany = function(){
		var id = $routeParams.id;
		$http.get('/api/companies/'+id).success(function(response){
			$scope.company = response;
		});
	}

	$scope.addcompany = function(){
		
		$http.post('/api/companies/', $scope.company).success(function(response){
			window.location.href='#/companies';
		});
	}

	$scope.updatecompany = function(){
		var id = $routeParams.id;
		$http.put('/api/companies/'+id, $scope.company).success(function(response){
			window.location.href='#/companies';
		});
	}

	$scope.removecompany = function(id){
		$http.delete('/api/companies/'+id).success(function(response){
			window.location.href='#/companies';
		});
	}
}]);