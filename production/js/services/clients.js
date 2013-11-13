wba.factory('clients',function($http){

  return{

      getData: function(){
          return $http.post('sys/core/fetchData.php');
      },

      update: function(person){
          return $http.post('sys/core/update.php',{

              'id':             person.Id,
              'firstname':      person.Vorname,
              'lastname':       person.Nachname,
              'caretaker':      person.Betreuer,
              'participation':  person.Teilnahme,
              'company':        person.Firma,
              'partner':        person.Partner,
              'children':       person.Kinder
          });
      }

  }

});