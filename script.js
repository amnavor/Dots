$(document).ready(function() {

  var challengeMode = false;
  var round = 1;
  var playedList = [];
  var userTurn = false;
  var currentTargetIndex = 0;
  var start = false;

  $("#chalButton").click(function() {
    if (challengeMode) {
      $("#chalMode").html("off");
    } else {
      $("#chalMode").html("on");
    }
  });

  $("#reset").click(reset);
  
  function reset() {
    round = 1;
    $("#screen").html("Press Start to Play");
    chal = "off";
    $("#chalMode").html("off");
    var playedList = [];
    userTurn = false;
    start = false;
  }

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
      if (start){
      $("#" + hit).fadeOut(150).fadeIn(150);
      i++;
      if (i < howManyTimes) {
        hit = playedList[i];
        setTimeout(f, 1000);
      } else if (i == howManyTimes) {
        userTurn = true;
        setTimeout(function() {
          $("td").css("background-color", "grey");
        }, 1000);
      }
      }
    }
    f();
  }

  $("td").click(function() {
    if (userTurn) {
      
      var num = $(this).attr('id');
      if (playedList[currentTargetIndex] == num) {
        $("#" + num).css("background-color", "green");
        setTimeout(function() {
          $("#" + num).css("background-color", "grey");
        }, 200);
        currentTargetIndex += 1;
      } else {
        $("#" + num).css("background-color", "red");
        setTimeout(function() {
          $("#" + num).css("background-color", "grey");
        }, 200);
        if (!challengeMode) {
          userTurn = false;
          sequence();
        } else {
          //restart
        }
      }
      
      if (currentTargetIndex == playedList.length) {
        round += 1;
        if (round == 20) {
        $("#screen").html("You Win!");
        } else if (round == 19) {
        $("#screen").html("Final Round!");
        } else {
          currentTargetIndex = 0;
          userTurn = false;
          setTimeout(function() {
            $("td").css("background-color", "grey");
          }, 1000);
          setTimeout(function() {
            $("#screen").html("Round " + round);
            add();
          }, 2000);
        }
      }
    }
  });

  $("#play").click(function() {
    if (!challengeMode) {
      if (!start) {
         start = true;
           $("#screen").html("Round 1");
        add();
      } else {
        //repeat sequence
      }
    } else {
      //highlight challenge mode
    }
  });

});
