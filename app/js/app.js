//@prepros-append directives/resultTable.js
//@prepros-append filters/personData.js
//@prepros-append controllers/WbaCtrl.js
//@prepros-append services/clients.js

var wba = angular.module('wba', ['ngRoute']);

/*
 * Der routeProvider
 *
 * Der Routeprovider steuert die verschiedenen Ansichten beim Wechsel der URL an und bestimmt über welchen Controller sie bedient werden.
 */

wba.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/views/home.php',   controller: 'WbaCtrl',resolve: {

            data: function($q,clients){
                var deffered = $q.defer();

                clients.getData().then(function(promise){
                    deffered.resolve(promise);
                });

                deffered.promise.then(function(promise){
                   clients.init(promise.data);
                });
                return deffered.promise;
            }

        }}).
        otherwise({redirectTo: '/'});
}]);



wba.directive('rt',function(){
    return{
        restrict: 'E',
        templateUrl: "partials/modules/resultTable.html",
        link: function(scope,element,attrs){

        }
    }
});
wba.filter('persondata',function(){
    return function(obj,val){

        var filtered = [];

        angular.forEach(obj, function(item) {
            var re = new RegExp(val, 'i');
            if(!val || re.test(item.Vorname) || re.test(item.Nachname) || re.test(item.Firma)){

                filtered.push(item) ;
            }

        });
        return filtered;
    };
});
wba.controller('WbaCtrl',function($scope,$http,clients){

    $scope.search       = '';
    $scope.allPersons   = clients.totalPersonCount;
    $scope.clients      = clients.data;
    $scope.participants = clients.participants;
    $scope.denials      = clients.denials;
    $scope.pending      = clients.pendings;

    $scope.updatePerson = function(person){
        clients.update(person);
    }

});
wba.factory('clients',function($http){

  return{

      data: [],

      participants: 0,
      denials: 0,
      pendings: 0,
      totalPersonCount: 0,

      getData: function(){
          return $http.post('sys/core/fetchData.php');
      },

      update: function(person){
          return $http.post('sys/core/update.php',{

              'id':             person.Id,
              'firstname':      person.Vorname,
              'lastname':       person.Nachname,
              'caretaker':      person.Betreuer,
              'participation':  person.Teilnahme,
              'company':        person.Firma,
              'partner':        person.Partner,
              'children':       person.Kinder
          });
      },

      init: function(data){

          this.data = data;
var k = 0;
          for (var i = 0;i < this.data.length;i++){

              if (this.data[i].Teilnahme == 0){this.denials++;}
              if (this.data[i].Teilnahme == 1){this.participants++;this.totalPersonCount += 1;}
              if (this.data[i].Teilnahme == 2){this.pendings++;}
              if (this.data[i].Partner  != ""){this.totalPersonCount += 1;}


              if(this.data[i].Kinder != ""){

                  this.totalPersonCount += parseInt(this.data[i].Kinder);
              }
          }
      }

  }

});