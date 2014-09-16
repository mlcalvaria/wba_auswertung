wba.controller('WbaCtrl',function($scope,$http,clients){

    $scope.search       = '';

    $scope.selectedYear = '\'13';

    loadData();

    $scope.updatePerson = function(person){
        clients.update(person);
    };

    $scope.changeSelectedYear = function(){

        var year = $scope.selectedYear.substring(1);

        clients.setYear(year);

        clients.getData()
            .then(loadData);
    };

    function loadData(){
        $scope.allPersons   = clients.getTotalVisitors();
        $scope.clients      = clients.data;
        $scope.participants = clients.getParticipantCount();
        $scope.denials      = clients.getDenialCount();
        $scope.pending      = clients.getPendingCount();
    }
});