wba.controller('WbaCtrl',function($scope,$http,clients){

    $scope.search       = '';
    $scope.allPersons   = clients.getTotalVisitors();
    $scope.clients      = clients.data;
    $scope.participants = clients.getParticipantCount();
    $scope.denials      = clients.getDenialCount();
    $scope.pending      = clients.getPendingCount();

    $scope.updatePerson = function(person){
        clients.update(person);
    }

});