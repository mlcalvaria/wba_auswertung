wba.factory('clients',function($http){

  return{

      data: [],

      participants: 0,
      denials: 0,
      pendings: 0,
      totalPersonCount: 0,

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
      },

      init: function(data){

          this.data = data;
var k = 0;
          for (var i = 0;i < this.data.length;i++){

              if (this.data[i].Teilnahme == 0){this.denials++;}
              if (this.data[i].Teilnahme == 1){this.participants++;this.totalPersonCount += 1;}
              if (this.data[i].Teilnahme == 2){this.pendings++;}
              if (this.data[i].Partner  != ""){this.totalPersonCount += 1;}


              if(this.data[i].Kinder != ""){

                  this.totalPersonCount += parseInt(this.data[i].Kinder);
              }
          }
      }

  }

});