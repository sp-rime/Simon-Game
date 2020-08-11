var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var level = 0;
var i = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // console.log("gamePattern : "+gamePattern.length);
  // console.log("userClickedPattern : "+userClickedPattern.length);
  if (gamePattern.length !== userClickedPattern.length) {

    if (userChosenColour === gamePattern[i]) {
      i++;
    } else {
      GameOver();
    }
  }
  if (gamePattern.length === userClickedPattern.length) {
    if (userChosenColour === gamePattern[i]) {
      // console.log(userClickedPattern);
      console.log("nextSequence");
      userClickedPattern = [];
      setTimeout(nextSequence(), 60000);
    } else {
      GameOver();
    }

  }


});


function GameOver() {
  count = 0;
  level = 0;
  console.log(userClickedPattern);
  console.log(gamePattern);
  userClickedPattern = [];
  gamePattern = [];
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  $("#level-title").text("Game Over,Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function nextSequence() {
  i = 0;
  count++;
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(400).fadeOut(400).fadeIn(400);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  console.log(gamePattern);
}


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(event) {
  if (count === 0) {
    nextSequence();
  }
});
