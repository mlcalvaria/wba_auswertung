










var wba = angular.module('wba', [
    'ngRoute',
    'wba.search',
    'wba.data-table',
    'wba.summary'
]);

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



var searchModule = angular.module('wba.search',[]);
var summaryModule = angular.module('wba.summary',[]);
var tableModule = angular.module('wba.data-table',[]);
wba.controller('WbaCtrl',function($scope,$http,clients){

    console.dir(clients.data);

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

    var api = 'http://quac.triangulum.uberspace.de/wba-api/';

  return{

      data: [],

      participants: 0,
      denials: 0,
      pendings: 0,
      totalPersonCount: 0,

      getData: function(){
          return $http.get(api + 'data/13');
      },

      update: function(person){

          return $http.post(api + person.id,{
              data: {
                  'id':             person.id,
                  'vorname':      person.vorname,
                  'nachname':       person.nachname,
                  'teilnahme':  person.teilnahme,
                  'firma':        person.firma,
                  'partner':        person.partner,
                  'kinder':       person.kinder
              }
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
wba.filter('persondata',function(){
    return function(obj,val){

        var filtered = [];

        angular.forEach(obj, function(item) {
            var re = new RegExp(val, 'i');
            if(!val || re.test(item.vorname) || re.test(item.nachname) || re.test(item.firma)){

                filtered.push(item) ;
            }

        });
        return filtered;
    };
});
wba.directive('rt',function(){
    return{
        restrict: 'E',
        templateUrl: "partials/modules/resultTable.html",
        link: function(scope,element,attrs){

        }
    }
});