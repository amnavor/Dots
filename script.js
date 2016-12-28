var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {

  $scope.screen = 0;
  $scope.challengeMode = "off";
  var playedList = [];
  var userTurn = false;
  var currentTargetIndex = 0;

//   $scope.switchChalMode = function() {
//     if ($scope.challengeMode == "off") {
//       $scope.challengeMode = "on";
//     } else {
//       $scope.challengeMode = "off";
//     }
//   };

//   $scope.reset = function() {
//     $scope.screen = 0;
//     $scope.challengeMode = "off";
//     var playedList = [];
//     usActive(false);
//   };

  function add() {
    userTurn = false;
    playedList.push(Math.ceil(((Math.random() * 10)) / 2.5));
    sequence();
  }

  function sequence() {
    var i = 0,
      howManyTimes = playedList.length;
    var hit = playedList[i];
    function f() {
      $("#"+hit).fadeOut(100).fadeIn(100);
      i++;
      if (i < howManyTimes) {
        hit = playedList[i];
        setTimeout(f, 1000);
      } else if (i==howManyTimes) {
        userTurn=true;
        setTimeout(function() {$("td").css("background-color", "grey");}, 1000);
      }
    }
    f();
  }

  $("td").click(function() {
    if (userTurn) {
      var num = $(this).attr('id');
      if (playedList[currentTargetIndex] == num) {
        $("#"+ num).css("background-color", "green");
        setTimeout(function() { $("#"+ num).css("background-color", "grey");}, 200);
        currentTargetIndex += 1;
        if (currentTargetIndex > 20) {
            $scope.screen = "win";
        } else if (currentTargetIndex == playedList.length) {
            $scope.screen = "win";
          currentTargetIndex = 0;
           userTurn=false;
              setTimeout(function() {$("td").css("background-color", "grey");}, 1000);
            setTimeout(function() {add();}, 3000);
        }
      } else {
         $("#"+ num).css("background-color", "red");
       setTimeout(function() { $("#"+ num).css("background-color", "grey");}, 200);
        if ($scope.challengeMode == "off") {
          //replay
          $scope.screen = "lose";
        } else {
          //restart
           $scope.screen = "lose";
        }
      }

    }
  });

  $scope.play = function() {
    add();
  };

});