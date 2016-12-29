angular.module('OW_Trakcer_App',[])
  .controller('myController',['$scope','$http',function($scope,$http) {
    $scope.testing = function(battletag){
      var btag = document.getElementById('battletag').value;
      console.log(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        console.log('Battletag is: ' + data.data.data.username);
        console.log('Level is: ' + data.data.data.level);
      });
    }//End of testing

  }])
