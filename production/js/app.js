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


