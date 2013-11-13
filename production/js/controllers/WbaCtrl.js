wba.controller('WbaCtrl',function($scope,$http,clients,data){

    var participantCounter  = 0,
        denialCounter       = 0,
        partnerCounter      = 0,
        childrenCounter     = 0,
        pendingCounter      = 0,
        allPersons          = 0;

    for (var i = 0;i < data.data.length;i++){

        var kinder = parseInt(data.data[i].Kinder);

        if (data.data[i].Teilnahme == 0){denialCounter++;}
        if (data.data[i].Teilnahme == 1){participantCounter++;}
        if (data.data[i].Teilnahme == 2){pendingCounter++;}
        if (data.data[i].Partner  != ""){partnerCounter++;}
        if (kinder != 0){childrenCounter = childrenCounter + kinder}

        kinder = 0;
    }

    $scope.allPersons = participantCounter + childrenCounter + partnerCounter;

    $scope.search = '';

    $scope.clients      = data.data;
    $scope.participants = participantCounter;
    $scope.denials      = denialCounter;
    $scope.pending      = pendingCounter;

    $scope.searchFilter = function (obj) {
        var re = new RegExp($scope.search, 'i');
        return !$scope.search || re.test(obj.Vorname) || re.test(obj.Nachname) || re.test(obj.Firma);
    };

    $scope.updatePerson = function(person){
        clients.update(person);

    }

});