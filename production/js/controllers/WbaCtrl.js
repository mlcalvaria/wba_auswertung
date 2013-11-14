wba.controller('WbaCtrl',function($scope,$http,clients){

    $scope.search       = '';
    $scope.allPersons   = clients.allPersons;
    $scope.clients      = clients.data;
    $scope.participants = clients.participants;
    $scope.denials      = clients.denials;
    $scope.pending      = clients.pendings;

    $scope.updatePerson = function(person){
        clients.update(person);
    }

});