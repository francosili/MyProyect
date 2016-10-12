var myapp = angular.module('myapp', []);

    myapp.controller('search', function($scope, $http) {
        $scope.ingredients = [];
        $scope.ingredientsSelected = undefined;
        $scope.recipies = [];
        
        $scope.save = function() {
            if($scope.ingredientName != "") {
                $scope.addIngredients();
            }
        };
        
        $scope.addIngredients = function() {
            $scope.ingredients.push($scope.ingredientName);
            $scope.ingredientName = '';
           
        };
        
        $scope.transformToString = function() {
            var str = $scope.ingredients.toString();
            var newstr = str.replace(/,/g,"%2");            
            $scope.ingredientsSelected = newstr;  
            $http.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients='+$scope.ingredientsSelected+'&limitLicense=false&number=5&ranking=1',
            { headers: { "X-Mashape-Key" : "17mFSy4UERmsh6frGLaUs1tP4jccp1JYcCQjsnGKfLpji136TV" }})
            
            .success (function(data) {
                $scope.recipies = data;
                console.log($scope.recipies);
            })
        
            .error (function(err) {
                console.log(err);
            });
        
        };
});

