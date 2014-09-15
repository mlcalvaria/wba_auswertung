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