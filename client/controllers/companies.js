var myApp = angular.module('myApp');

function createNode (classNode, textNode) {
			
				var tr = $('<tr/>', {
				class: classNode
				});

				var td = $('<td/>').text(textNode);
				tr
					.append(td);
				return tr;
			};




myApp.controller('companiesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	// console.log('companiesController loaded...');


	$scope.getcompanies = function(){
		$http.get('/api/companies').success(function(response){
			$scope.companies = response;

			var summ = 0;	
		
			var table = $('<table/>', {
				class: "tree"
			});

			var elems = response.map(function(item, index) {

					return createCompany(item.companyName, item.parentCompany, item.earnings);
			});

			

			function totalEarings(name) {

				response.forEach(function(item, i) {
				//for(i = 0; i < response.length; i++) {
					if (summ == 0 && item.companyName == name) {
						summ = item.earnings;
                    }
                    if (name == item.parentCompany) {

						summ +=  item.earnings;
						totalEarings(item.companyName);
					} 
					//return summ;
				});
				return summ;
			};


			function createCompany (companyName, parentCompany, earnings) {

				var earings = totalEarings(companyName);

				summ = 0;

				var parentNode = createNode("treegrid-" + companyName + " treegrid-parent-" + parentCompany, companyName + "  earnings :" + earnings + "  total earings  " + earings);

				return parentNode;
			};

			/*
			function selectChild(parent){

				var parent = response.filter(function(item, index) {
						return item.parentCompany == parent ;
					});
				return parent;
			}
			var cd = selectChild("Soft");

			alert(cd);

			var a = cd.map(function(item, index) {
					return item.earnings[0];
			});
			alert(a);*/


			var mainNode = createNode("treegrid-0", "Companies :");

			table
				.append(mainNode)
				.append(elems);

			const root = $('#root');
			root.empty();
			root.append(table);

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
	};

	$scope.removecompany = function(id){
		$http.delete('/api/companies/'+id).success(function(response){
			window.location.href='#/companies';
		});
	}
}]);