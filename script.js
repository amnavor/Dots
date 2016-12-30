$(document).ready(function() {

  var challengeMode = false;
  var round = 1;
  var playedList = [];
  var userTurn = false;
  var currentTargetIndex = 0;
  var start = false;
  var imgSkull = "https://cloud.githubusercontent.com/assets/12720744/21555932/67f155f6-cdd1-11e6-94a4-d27e24ba146c.png";
  var imgNoSkull = "https://cloud.githubusercontent.com/assets/12720744/21555965/bdccff52-cdd1-11e6-88cf-c837270fa1e8.png";
  var imgPlay = "https://cloud.githubusercontent.com/assets/12720744/21555950/a2f94550-cdd1-11e6-95b6-050892b458bf.png";
  var imgReset = "https://cloud.githubusercontent.com/assets/12720744/21555930/638c8f26-cdd1-11e6-879c-37ca5500b42f.png";

  var audio1 = new Audio('https://upload.wikimedia.org/wikipedia/commons/a/aa/Tone_450Hz.ogg');
  var audio2 = new Audio('https://upload.wikimedia.org/wikipedia/commons/b/bb/Tone_430-54Hz.ogg');
  var audio3 = new Audio('https://upload.wikimedia.org/wikipedia/commons/9/91/Tone_400Hz.ogg');
  var audio4 = new Audio('https://upload.wikimedia.org/wikipedia/commons/4/4d/Tone_380Hz.ogg');
  var audioFail = new Audio(' https://upload.wikimedia.org/wikipedia/commons/f/f2/Fondamentale_absente.ogg');
  var audioWin = new Audio("https://upload.wikimedia.org/wikipedia/commons/7/76/Ding_Dong_Bell.ogg");

  function playSound(note) {
    var audio;
    switch (note) {
      case 1:
        audio = audio1;
        break;
      case 2:
        audio = audio2;
        break;
      case 3:
        audio = audio3;
        break;
      case 4:
        audio = audio4;
        break;
    }
    audio.play();
    setTimeout(function() {
      audio.pause();
    }, 150);
  }

  $("#chalButton").click(function() {
     start = false;
    if (challengeMode) {
      $("#chalMode").attr("src", imgNoSkull);
      challengeMode = false;
      $("#screen").html("Challenge Mode: Off");
      setTimeout(reset, 1500);
    } else {
      $("#chalMode").attr("src", imgSkull);
      challengeMode = true;
      $("#screen").html("Challenge Mode: On");
      setTimeout(reset, 1500);
    }
  });

  function reset() {
    round = 1;
    $("#screen").html("Press play to begin");
    playedList = [];
    userTurn = false;
    start = false;
    currentTargetIndex = 0;
    $("#playButton").attr("src", imgPlay);
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
      if (start) {
        $("#" + hit).fadeOut(150).fadeIn(150);
        playSound(hit);
        i++;
        if (i < howManyTimes) {
          hit = playedList[i];
          setTimeout(f, 1000);
        } else if (i == howManyTimes) {
          userTurn = true;
          setTimeout(function() {
            $(".nums").css("background-color", "grey");
          }, 1000);
        }
      }
    }
    f();
  }

  $(".nums").click(function() {
    if (userTurn) {

      var num = $(this).attr('id');
      if (playedList[currentTargetIndex] == num) {
        $("#" + num).css("background-color", "#83c3db");
        playSound(Math.round(num));
        setTimeout(function() {
          $("#" + num).css("background-color", "grey");
        }, 200);
        currentTargetIndex += 1;
      } else {
        $("#" + num).css("background-color", "#d69196");
        audioFail.play();
        setTimeout(function() {
          audioFail.pause();
        }, 300);
        setTimeout(function() {
          $("#" + num).css("background-color", "grey");
        }, 200);
        if (!challengeMode) {
          userTurn = false;
          $("#screen").html("Try Again!");
          setTimeout(function() {
            $("#screen").html("Round " + round);
            sequence();
            currentTargetIndex = 0;
          }, 2000);
        } else {
          $("#screen").html("Game Over");
          setTimeout(reset, 2000);
        }
      }

      if (currentTargetIndex == playedList.length) {
        round += 1;
        if (round == 21) {
          $("#screen").html("You Win!");
          audioWin.play();
          setTimeout(function() {
            audioWin.pause();
          }, 4000);
          setTimeout(reset, 3000);
        } else if (round == 20) {
          $("#screen").html("Final Round!");
        } else {
          currentTargetIndex = 0;
          userTurn = false;
          setTimeout(function() {
            $(".nums").css("background-color", "grey");
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
    if (!start) {
      start = true;
      $("#screen").html("Round 1");
      $("#playButton").attr("src", imgReset);
      setTimeout(add, 1500);
    } else {
      reset();
    }
  });

});
