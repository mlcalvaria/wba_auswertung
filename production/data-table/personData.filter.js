wba.filter('persondata',function(){
    return function(obj,val){

        var filtered = [];

        angular.forEach(obj, function(item) {

            var re = new RegExp(val, 'i');

            if(!val || re.test(item.vorname) || re.test(item.nachname) || re.test(item.firma) || re.test(item.email)){
                filtered.push(item) ;
            }

        });

        return filtered;
    };
});