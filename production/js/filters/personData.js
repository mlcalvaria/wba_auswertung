wba.filter('persondata',function(){
    return function(obj,scope){

        console.dir(scope.search);
        var re = new RegExp(scope.search, 'i');
        return !scope.search || re.test(obj.Vorname) || re.test(obj.Nachname) || re.test(obj.Firma);
    };
});