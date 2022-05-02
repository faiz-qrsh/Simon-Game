var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
let level=0;
let Score=0;
$("u").click(function(){
    if(!started){
        $("#level-title").text("Level: "+ level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
    for(var i=0;i<=currentLevel;i++){
        if(userClickedPattern[i]!==gamePattern[i]){
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => { $("body").removeClass("game-over")}, 200);
            $("#level-title").html("Game Over");
            $(".btn").hide();
            $(".last").after("<h2>Your Score: "+ (level-1)*2+"</h2>");
            $(".last").after("<h2>Press <u>Here</u> to Restart..</h2>");
            startover();
            break;
        }
        else{
            if(i===currentLevel && userClickedPattern.length===gamePattern.length){
               setTimeout(() => {nextSequence();
                }, 1000);
            }
            else
            continue;
        }
    }
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level: "+ level);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => { $("#"+currentColour).removeClass("pressed")}, 100);
}
function startover(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    $("u").click(function(){
        $(".btn").show();
        $("h2").hide();
        setTimeout(() => {
            if(!started){
                $("#level-title").text("Level: "+ level);
                nextSequence();
                started=true;
            }
        }, 700);
})
}