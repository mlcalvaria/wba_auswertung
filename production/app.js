//@prepros-append search/search.module.js

//@prepros-append summary/summary.module.js

//@prepros-append data-table/dataTable.module.js
//@prepros-append data-table/dataTable.controller.js
//@prepros-append data-table/clients.service.js
//@prepros-append data-table/personData.filter.js
//@prepros-append data-table/resultTable.directive.js


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


