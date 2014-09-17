










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
        when('/', {templateUrl: 'partials/views/home.html',   controller: 'WbaCtrl',resolve: {

            data: function($q,clients){
                return clients.getData();
            }

        }}).
        otherwise({redirectTo: '/'});
}]);



var searchModule = angular.module('wba.search',[]);
var summaryModule = angular.module('wba.summary',[]);
var tableModule = angular.module('wba.data-table',[]);
wba.controller('WbaCtrl',function($scope,$http,clients){

    $scope.search       = '';

    $scope.selectedYear = '\'13';

    loadData();

    $scope.updatePerson = function(person,prop){

        console.dir(person);
        /**
         * Todo:
         * Zur Zeit wird jeder Wert aktualsiert, und zwar bei jedem update (Jedem keydown)
         * Zwar läuft die Neuberechnung flüssig, dennoch wäre es schön wenn man die Neuzuweißung nur für das Feld durchführt
         * das betroffen ist
         */

        clients.update(person)
            .then(loadData);
    };

    $scope.changeSelectedYear = function(){

        var year = $scope.selectedYear.substring(1);

        clients.setYear(year);

        clients.getData()
            .then(loadData);

    };

    function loadData(){
        $scope.allPersons   = clients.totalVisitors();
        $scope.clients      = clients.data;
        $scope.participants = clients.getParticipantCount();
        $scope.denials      = clients.getDenialCount();
        $scope.pending      = clients.getPendingCount();
    }
});
wba.factory('clients',function($http){

    var api = 'https://quac.triangulum.uberspace.de/wba-api/';

    function getStatusCount(data,status){

        var count = 0;

        data.forEach(function(item){
            if(item.teilnahme == status){
                count++;
            }
        });

        return count;
    }


  return{

      data: [],

      selectedYear: '13',

      participants: 0,
      denials: 0,
      pendings: 0,
      totalVisitors: function(){

          var total = 0;

          this.data.forEach(function(item){

              var partner = item.partner ? 1 : 0;

              if(item.teilnahme == '1'){
                  total += (1 + item.kinder + partner);
              }

          });

          return total;
      },
      totalPersonCount: 0,

      getData: function(){

          var self = this;

          return $http.get(api + 'data/' + self.selectedYear)
              .then(function(res){
                  self.data = res.data;
              });
      },

      update: function(person){

          var self = this;

          if(!person.id){
              throw new Error('Missing ID');
          }

          return $http.post(api + person.id,{
              data: person
          });
      },

      getPendingCount: function(){
          return getStatusCount(this.data,'2');
      },

      getDenialCount: function(){
          return getStatusCount(this.data, '0');
      },

      getParticipantCount: function(){
          return getStatusCount(this.data, '1');
      },

      setYear: function(year){
          this.selectedYear = year;
      }

  }

});
wba.filter('persondata',function(){
    return function(obj,val){

        var filtered = [];

        angular.forEach(obj, function(item) {

            var re = new RegExp(val, 'i');

            if(!val || re.test(item.vorname) || re.test(item.nachname) || re.test(item.firma) || re.test(item.email)){
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