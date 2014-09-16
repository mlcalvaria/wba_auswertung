wba.factory('clients',function($http){

    var api = 'https://quac.triangulum.uberspace.de/wba-api/';

    function getStatusCount(data,status){

        var count = 0;

        data.forEach(function(item){
            if(item.teilnahme == status){
                count++;
            }
        });

        return count;
    }

  return{

      data: [],

      selectedYear: '13',

      participants: 0,
      denials: 0,
      pendings: 0,
      totalPersonCount: 0,

      getData: function(){

          var self = this;

          return $http.get(api + 'data/' + self.selectedYear)
              .then(function(res){
                  self.data = res.data;
              });
      },

      update: function(person){

          return $http.post(api + person.id,{
              data: {
                  'id':         person.id,
                  'vorname':    person.vorname,
                  'nachname':   person.nachname,
                  'teilnahme':  person.teilnahme,
                  'firma':      person.firma,
                  'partner':    person.partner,
                  'kinder':     person.kinder
              }
          });
      },

      getPendingCount: function(){
          return getStatusCount(this.data,'2');
      },

      getDenialCount: function(){
          return getStatusCount(this.data, '0');
      },

      getParticipantCount: function(){
          return getStatusCount(this.data, '1');
      },
      getTotalVisitors: function(){

          var total = 0;

          this.data.forEach(function(item){

              var partner = item.partner ? 1 : 0;

              if(item.teilnahme == '1'){
                  total += (1 + item.kinder + partner);
              }

          });

          return total;
      },
      setYear: function(year){
          this.selectedYear = year;
      }

  }

});