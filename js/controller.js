angular.module('OW_Trakcer_App',[])
  .controller('myController',['$scope','$http','myFactory',function($scope,$http,myFactory) {
    $scope.setProfile = function(battletag){
      var btag = document.getElementById('battletag').value;
      myFactory.setBattleTag(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        myFactory.setProfile(data.data.data.level, data.data.data.games.quick.wins, data.data.data.games.competitive.wins, data.data.data.games.competitive.played, data.data.data.competitive.rank);
      });
    } //End of setProfile

    $scope.checkSess = function(){
      var btag = myFactory.getBattleTag();
      return btag;
    }

    $scope.getProfile = function(){
      var btag = myFactory.getBattleTag();
      console.log(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        console.log('Battletag is: ' + btag);
        var profilelevel = myFactory.getProfile().level;
        var profileQpWins = myFactory.getProfile().qpWins;
        var profileCpWins = myFactory.getProfile().cpWins;
        var profileCpPlayed = myFactory.getProfile().cpPlayed;
        var profileCpRating = myFactory.getProfile().cpRating;
        return myFactory.getProfile();
      });
    } //End of getProfile
  }])

  .factory('myFactory',function(){
    var battletag = {
      tag : ''
    };
    var profile = {
      level : '',
      qpWins : '',
      cpWins : '',
      cpPlayed : '',
      cpRating : ''
    };
    return {
      getBattleTag: function() {
        return battletag.tag;
      },
      setBattleTag: function(Tag){
        battletag.tag = Tag;
      },
      setProfile: function(lvl,qWin,cWin,cPlayed,cRating){
        profile.level = lvl;
        profile.qpWins = qWin;
        profile.cpWins = cWin;
        profile.cpPlayed = cPlayed;
        profile.cpRating = cRating;
      },
      getProfile: function(){
        return profile;
      }
    };
  });
