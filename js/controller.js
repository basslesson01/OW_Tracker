angular.module('OW_Trakcer_App',[])
  .controller('myController',['$scope','$http','myFactory',function($scope,$http,myFactory) {

    $scope.setProfile = function(battletag){
      var btag = document.getElementById('battletag').value;
      myFactory.setBattleTag(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        overallStatus = data.status; //This returns 200 regardless of if player exists or not
        overallStatusCode = data.data.statusCode; //This is undefined if player search returns a valid data object
        console.log("data is: " + data);
        console.log(data);
        if(overallStatus == 200 && overallStatusCode == ''){
          $scope.message = "Stats for " + btag;
          //myFactory.setProfile(data.data.data.level, data.data.data.games.quick.wins, data.data.data.games.competitive.wins, data.data.data.games.competitive.played, data.data.data.competitive.rank);
        }
        else if (overallStatus == 200 && overallStatusCode == 404){
          $scope.message = "battletag " + btag + " does not exist";
        }
      });
    } //End of setProfile()

    $scope.checkSess = function(){
      var btag = myFactory.getBattleTag();
      return btag;
    } //End of checkSess()

    $scope.getProfile = function(){
      var btag = myFactory.getBattleTag();
      console.log(btag);
      $http.get('https://api.lootbox.eu/pc/us/' + btag + '/profile').then(function(data){
        console.log('Battletag is: ' + btag);
        player = data.data.data; //Such nesting. Much wow. Would copy&pasta again.
        //console.log('Data.data.data.level: ' + data.data.data.level);
        $scope.lvl = player.level;
        $scope.qpwin = player.games.quick.wins;
        $scope.cpplayed = player.games.competitive.played;
        $scope.cpwin = player.games.competitive.wins;
        $scope.sr = player.competitive.rank;
        //return myFactory.getProfile();
      });
    } //End of getProfile()
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
    }; //I don't think I need this, because I can get player data from calling data.property;
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
