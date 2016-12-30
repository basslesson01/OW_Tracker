angular.module('OW_Trakcer_App',[])
  .controller('myController',['$scope','$http','myFactory',function($scope,$http,myFactory) {
    $scope.getProfile = function(battletag){
      var btag = document.getElementById('battletag').value;
      console.log(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        myFactory.setBattleTag(btag);
        console.log('Battletag is: ' + myFactory.getBattleTag());
        console.log('Level is: ' + data.data.data.level);
        console.log('Quickplay Wins: ' + data.data.data.games.quick.wins); //Wow. Such nest. Much crap
        console.log('Skill rating: ' + data.data.data.competitive.rank);
      });
    }//End of getProfile

  }])

  .factory('myFactory',function(){
    var battletag = {
      tag : ''
    };
    return {
      getBattleTag: function() {
        return battletag.tag;
      },
      setBattleTag: function(Tag){
        battletag.tag = Tag;
      }
    };
  });
