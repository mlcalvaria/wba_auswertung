
//@prepros-append controllers/VaCtrl.js
//@prepros-append services/clients.js

var wba = angular.module('wba', ['ngRoute']);

/*
 * Der routeProvider
 *
 * Der Routeprovider steuert die verschiedenen Ansichten beim Wechsel der URL an und bestimmt über welchen Controller sie bedient werden.
 */

wba.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/views/home.php',   controller: 'VaCtrl',resolve: {

            data: function($q,clients){
                var deffered = $q.defer();

                clients.getData().then(function(promise){
                    deffered.resolve(promise);
                });
                return deffered.promise;
            }

        }}).
        otherwise({redirectTo: '/'});
}]);



wba.controller('VaCtrl',function($scope,$http,data){

    var participantCounter = 0,
        denialCounter = 0,
        pendingCounter = 0;

    for (var i = 0;i < data.data.length;i++){
        //console.log(data.data[i].Teilnahme);
        if (data.data[i].Teilnahme == 1){participantCounter++;}
        if (data.data[i].Teilnahme == 0){denialCounter++;}
        if (data.data[i].Teilnahme == 2){pendingCounter++;}
    }

    $scope.data = data.data;

    $scope.participants = participantCounter;
    $scope.denials      = denialCounter;
    $scope.pending      = pendingCounter;

});
wba.factory('clients',function($http){

  return{

      getData: function(){

          return $http.post('sys/core/fetchData.php');

      }

  }

});