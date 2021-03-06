(function() {
  'use strict';

  angular
    .module('dearFoodJ.inspirations')
    .config(ConfigInspirations);

  ConfigInspirations.$inject = ['$routeProvider'];

  function ConfigInspirations($routeProvider) {
    $routeProvider
      .when('/journals/:journal_id/inspirations', {
        templateUrl: '/partials/inspirations/index.html',
        controller: 'InspirationsController',
        controllerAs: 'vm',
        resolve: {
          inspirationData: ['UserService', 'InspirationService', function(UserService, InspirationService) {
            var user = UserService.getCurrentUser();

            return InspirationService.inspirationResource.query({ journal_id: user.journal });
          }]
        }
      })
      .when('/journals/:journal_id/inspirations/new', {
        templateUrl: '/partials/inspirations/new.html',
        controller: 'NewInspirationsController',
        controllerAs: 'vm'
      })
      .when('/journals/:journal_id/inspirations/:inspiration_id/edit', {
        templateUrl: '/partials/inspirations/edit.html',
        controller: 'InspirationsController',
        controllerAs: 'vm',
        resolve: {
          inspirationData: ['$route', 'UserService', 'InspirationService', function($route, UserService, InspirationService) {
            var user = UserService.getCurrentUser();
            var inspiration = $route.current.params.inspiration_id;

            return InspirationService.inspirationResource.get({ journal_id: user.journal, inspiration_id: inspiration });
          }]
        }
      })
      .when('/journals/:journal_id/inspirations/:inspiration_id/delete', {
        resolve: {
          deleteInspiration: ['$route', '$location', 'UserService', 'InspirationService', function($route, $location, UserService, InspirationService) {
            var user = UserService.getCurrentUser();
            var inspiration = $route.current.params.inspiration_id;

            InspirationService.inspirationResource.delete({ journal_id: user.journal, inspiration_id: inspiration }).$promise.then(function(data) {
              if (data.success) {
                $location.path('/journals/' + user.journal + '/inspirations');
              }
            });
          }]
        }
      });
  }
})();