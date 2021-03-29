var gamePattern = [];

var userchoosed = [];

var buttonColors = ["red", "green", "blue", "yellow"];

var started = false;

var level = 0;

$(document).keypress(function() {

  if (!started) {

    $("#level-title").text("Level" + level);
    nextSequence();
  }
})

$("btn").on("click", function() {
  userChoosenColors = $(this).attr("id");
  userchoosed.push(userChoosenColors);
  playSound(userChoosenColors);

  checkAnswer(userchoosed.length - 1);
})

function nextSequence() {

  userchoosed=[];
  level++;
  $("#level-title").text("Level" + level);

  var randomnum = Math.random() * 4;
  randomnum = Math.floor(randomnum);

  randomChoosenColor = buttonColors[randomnum];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);
}

function playSound(currentColor) {

  var audio = new Audio('sounds/' + currentColor + '.mp3');
  audio.play();
}

function animatePress(currentColor) {

  $('#' + currentColor).addClass("pressed");

  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {

  if (gamePattern[currentlevel] === userchoosed[currentlevel]) {
    console.log("success");

    if (gamePattern.length === userchoosed.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");


    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }
}
