wba.filter('persondata',function(){
    return function(obj,val){

        var filtered = [];

        angular.forEach(obj, function(item) {
            var re = new RegExp(val, 'i');
            if(!val || re.test(item.Vorname) || re.test(item.Nachname) || re.test(item.Firma)){

                filtered.push(item) ;
            }

        });
        return filtered;
    };
});