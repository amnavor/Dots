$(document).ready(function() {

  var challengeMode = false;
  var points = 0;
  var playedList = [];
  var userTurn = false;
  var currentTargetIndex = 0;
  var start = false;

  $("#chalButton").click(function()  {
    if (challengeMode) {
      $("#chalMode").html("off");
    } else {
      $("#chalMode").html("on");
    }
  });

  $("#reset").click(function()  {
    points = 0;
    chal = "off";
    $("#chalMode").html("off");
    var playedList = [];
    userTurn=false;
  });

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
      $("#"+hit).fadeOut(150).fadeIn(150);
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
        points += 1;
        if (points == 20) {
        $("#screen").html("you win!");
        } else if (currentTargetIndex == playedList.length) {
        $("#screen").html("next round");
          currentTargetIndex = 0;
           userTurn=false;
              setTimeout(function() {$("td").css("background-color", "grey");}, 1000);
            setTimeout(function() {add();}, 3000);
        }
      } else {
         $("#"+ num).css("background-color", "red");
       setTimeout(function() { $("#"+ num).css("background-color", "grey");}, 200);
        if (!challengeMode) {
          //replay
        } else {
          //restart
        }
      }

    }
  });

$("#play").click(function()  {
  if (!challengeMode) {
  if (!start) {
    add();
  } else {
    //repeat sequence
  } 
  } else {
    //highlight challenge mode
  }
});

});
