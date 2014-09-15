wba.factory('clients',function($http){

    var api = 'http://quac.triangulum.uberspace.de/wba-api/';

  return{

      data: [],

      participants: 0,
      denials: 0,
      pendings: 0,
      totalPersonCount: 0,

      getData: function(){
          return $http.get(api + 'data/13');
      },

      update: function(person){

          return $http.post(api + person.id,{
              data: {
                  'id':             person.id,
                  'vorname':      person.vorname,
                  'nachname':       person.nachname,
                  'teilnahme':  person.teilnahme,
                  'firma':        person.firma,
                  'partner':        person.partner,
                  'kinder':       person.kinder
              }
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