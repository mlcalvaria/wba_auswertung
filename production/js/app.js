
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


