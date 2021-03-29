var gamePattern= [];

var buttonColors= ["red","blue", "green", "yellow"];

var userchoosed=[];


var started=false;

var level=0;
$(document).keypress(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click",function(){
   var userChoosenColors= $(this).attr("id");
   userchoosed.push(userChoosenColors);
   playSound(userChoosenColors);

   animatePress(userChoosenColors);
   checkAnswer(userchoosed.length-1);
});

function checkAnswer(currentlevel){

     if(gamePattern[currentlevel]===userchoosed[currentlevel]){

        console.log("success");
       if(gamePattern.length === userchoosed.length){

         setTimeout(function(){
           nextSequence();
         },1000);
       }
     }
     else{
       console.log("wrong");
       playSound("wrong");

       //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
       $("body").addClass("game-over");
       setTimeout(function () {
         $("body").removeClass("game-over");
       }, 200);

       //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
       $("#level-title").text("Game Over, Press Any Key to Restart");

       startOver();
     }

}

function nextSequence() {

  userchoosed=[];

  level++;
  $("#level-title").text("Level " + level);
  var random = Math.random();
  random = random * 4;
  random = Math.floor(random);

  var randomChoosenColor=buttonColors[random];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}

function playSound(name){
  var audio= new Audio('sounds/' + name +'.mp3');
  audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
