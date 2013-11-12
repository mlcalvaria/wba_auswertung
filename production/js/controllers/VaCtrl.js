wba.controller('VaCtrl',function($scope,$http,data){

    var participantCounter = 0,
        denialCounter = 0,
        pendingCounter = 0;

    for (var i = 0;i < data.data.length;i++){
        //console.log(data.data[i].Teilnahme);
        if (data.data[i].Teilnahme == 1){participantCounter++;}
        if (data.data[i].Teilnahme == 0){denialCounter++;}
        if (data.data[i].Teilnahme == 2){pendingCounter++;}
    }

    $scope.data = data.data;

    $scope.participants = participantCounter;
    $scope.denials      = denialCounter;
    $scope.pending      = pendingCounter;

});