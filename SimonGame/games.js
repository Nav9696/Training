var buttonColors=["red","yellow","green","blue"];
var gamePattern=[];
var userClickPattern=[]; 
var gameStart=false;
var level=0;

function playSound(color){
    switch(color){
        case "red":
            var audio=new Audio("./sounds/red.mp3");
            break;
        case "blue":
            var audio=new Audio("./sounds/blue.mp3");
            break;
        case "green":
            var audio=new Audio("./sounds/green.mp3");
            break;
        case "yellow":
            var audio=new Audio("./sounds/yellow.mp3");
            break;
    }
    audio.play();
}
function nextSequence(){
    level++;
    userClickPattern=[];
    var randNum=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randNum];
    gamePattern.push(randomChoosenColor);
    $("#level-title").text("Level "+level);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}

function animatePress(currentColor){
    var clickButton=$("#"+currentColor);
    clickButton.addClass("pressed");
    setTimeout(function(){
        clickButton.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
       if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence(); 
            },1000);
        }   
    }else{
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over Press 'A' key tor restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStart=false;
}

$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);

})

$("document").ready(function(){
    document.addEventListener("keydown",function(event){
        if(event.key==='a' && !gameStart){
            gameStart=true;
            nextSequence();
        }
    })
})
