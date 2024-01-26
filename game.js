var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=true;
var level=0;

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("./sounds/"+randomChosenColor+".mp3")
    audio.play();
    $("#level-title").text("Level "+level);
    started=false;
    level++;
}


$(".btn").on("click",function (event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(level);
});

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed")
    setTimeout(function (){
        $("."+currentColor).removeClass("pressed")
    }, 100);
}

$(document).on("keydown",function (){
    if (started){
        gamePattern=[];
        userClickedPattern=[];
        nextSequence();
    }
})

function checkAnswer(currentLevel){
    var n=currentLevel-1;
    pattern=userClickedPattern.slice(n*(n+1)/2),((n+1)*(n+2)/2)[0]
    if (pattern.length===gamePattern.length){
        if (arrayEquals(pattern,gamePattern)){
            if (userClickedPattern.length===((n+1)*(n+2)/2)){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            }
        }
        else{
            $("#level-title").text("Game Over, Press Any Key to Restart")
            started=true;
            playSound("wrong");
            level=0;
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            gamePattern=[];
            userClickedPattern=[];
        }
    }
    else{
        if (isSubsetAndInSameOrder(gamePattern,pattern)==false){
            $("#level-title").text("Game Over, Press Any Key to Restart")
            started=true;
            playSound("wrong");
            level=0;
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            gamePattern=[];
            userClickedPattern=[];
        }
    }

}
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

let isSubsetAndInSameOrder = (parentArray, subsetArray) => {
    return subsetArray.every((el, index) => {
    return parentArray[index] === el;
    });
}
