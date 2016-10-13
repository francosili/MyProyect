var myapp = angular.module('myapp', []);

    myapp.controller('search', function($scope, $http) {
        $scope.ingredients = [];
        $scope.ingredientsSelected = undefined;
        $scope.recipies = [];
        $scope.recipie = [];
        
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
            var newstr = str.replace(/,/g,"%2C");            
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
        
        $scope.remove = function(index) { 
            $scope.ingredients.splice(index, 1);     
        };
        
        $scope.goToRecipie = function (id) {
            $http.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information?includeNutrition=false',
            { headers: { "X-Mashape-Key" : "17mFSy4UERmsh6frGLaUs1tP4jccp1JYcCQjsnGKfLpji136TV" }})
            
            .success (function(data) {
                $scope.recipie = data;
                console.log($scope.recipie);
            })
        
            .error (function(err) {
                console.log(err);
            });
        }
});

