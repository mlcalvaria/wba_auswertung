wba.factory('clients',function($http){

  return{

      getData: function(){

          return $http.post('sys/core/fetchData.php');

      }

  }

});