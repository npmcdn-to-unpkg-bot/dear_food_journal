(function() {
  'use strict';

  angular
    .module('dearFoodJ.meals')
    .controller('MealsController', MealsController);

  MealsController.$inject = ['$filter', 'MealsService'];

  function MealsController($filter, MealsService) {
    var vm = this;
    // var now = new Date();

    vm.apiSearch = '';
    vm.foodSearch = foodSearch;
    vm.meal = {
      date: new Date(),
      foods: [],
      userFoods[],
      totalNutrition: {

      }

    };
    // // vm.meal.date = new Date($filter('date')(Date.now(), 'yyyy-MM-dd'));
    // // vm.meal.date = new Date();
    // // vm.meal.time = new Date();
    //   // $filter('date')(Date.now(), 'HH:mm:ss'));
    // console.log(vm.meal.date);
    // vm.meal.foods = [];

    // // will nede to do backend/front end checking to single these out as non-api foods and food entries
    // vm.meal.userFoods = [];

    // // compare to mongoose model to change/develop?
    // vm.meal.totalNutrition = {
    //   calories: 0,
    //   fat: 0,
    //   carbs: 0,
    //   fiber: 0,
    //   protein: 0,
    //   sugars: 0
    // };


    vm.addToMeal = addToMeal;
    vm.clearFoodSearch = clearFoodSearch;
    vm.removeFood = removeFood;

    vm.addOwnFood = addOwnFood;

    vm.addMeal = addMeal;

    // add own food ---> add to last item

    function foodSearch() {
      MealsService.foodApiSearch(vm.apiSearch).then(function(data) {
        console.log(data.data.hits);
        vm.searchResults = data.data.hits;
      });
    }

    function clearFoodSearch() {
      vm.searchResults = null;
      vm.apiSearch = '';
    }

    function addToMeal(food) {
      var id = vm.meal.foods.length;
      console.log('clicked', food);
      food.id = 'food-' + id;
      food.servingSzId = 'serv-sz-id' + id;
      food.userServing = 1;

      vm.meal.foods.push(food);
        console.log(vm.meal.foods);

    }

    function removeFood(food, type) {
      var foodIdx = vm.meal[type].indexOf(food);
      vm.meal[type].splice(foodIdx, 1);
    }

    function addOwnFood() {
      var newId = 'user-food-' + vm.meal.userFoods.length;

      vm.meal.userFoods.push({
        id: newId,
        userServing: 1,
        calories: null,
        carbs: null,
        fat: null,
        fiber: null,
        protein: null,
        sugar: null
      });
    }

    function addMeal() {
      console.log(vm.meal);
    }
  }
})();