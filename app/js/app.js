
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
                return deffered.promise;
            }

        }}).
        otherwise({redirectTo: '/'});
}]);



wba.filter('persondata',function(){
    return function(obj,scope){

        console.dir(scope.search);
        var re = new RegExp(scope.search, 'i');
        return !scope.search || re.test(obj.Vorname) || re.test(obj.Nachname) || re.test(obj.Firma);
    };
});
wba.controller('WbaCtrl',function($scope,$http,clients,data){

    var participantCounter  = 0,
        denialCounter       = 0,
        partnerCounter      = 0,
        childrenCounter     = 0,
        pendingCounter      = 0,
        allPersons          = 0;

    for (var i = 0;i < data.data.length;i++){

        var kinder = parseInt(data.data[i].Kinder);

        if (data.data[i].Teilnahme == 0){denialCounter++;}
        if (data.data[i].Teilnahme == 1){participantCounter++;}
        if (data.data[i].Teilnahme == 2){pendingCounter++;}
        if (data.data[i].Partner  != ""){partnerCounter++;}
        if (kinder != 0){childrenCounter = childrenCounter + kinder}

        kinder = 0;
    }

    $scope.allPersons = participantCounter + childrenCounter + partnerCounter;

    $scope.search = '';

    $scope.clients      = data.data;
    $scope.participants = participantCounter;
    $scope.denials      = denialCounter;
    $scope.pending      = pendingCounter;

    $scope.searchFilter = function (obj) {
        var re = new RegExp($scope.search, 'i');
        return !$scope.search || re.test(obj.Vorname) || re.test(obj.Nachname) || re.test(obj.Firma);
    };

    $scope.updatePerson = function(person){
        clients.update(person);

    }

});
wba.factory('clients',function($http){

  return{

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
      }

  }

});