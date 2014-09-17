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