function setImg(player,die){
    switch(die){
        case 1:
            player.setAttribute("src","./images/dice1.png"); 
            break;
        case 2:
            player.setAttribute("src","./images/dice2.png"); 
            break;
        case 3:
            player.setAttribute("src","./images/dice3.png"); 
            break;
        case 4:
            player.setAttribute("src","./images/dice4.png"); 
            break;
        case 5:
            player.setAttribute("src","./images/dice5.png"); 
            break;
        case 6:
            player.setAttribute("src","./images/dice6.png"); 
            break;
    }
}

function rollDie(){
    var player1=Math.floor(Math.random()*6)+1;
    var player2=Math.floor(Math.random()*6)+1;
    var message="";
    if(player1>player2){
        message="Player 1 Wins!";
    }else if(player2>player1){
        message="Player 2 Wins!";
    }else{
        message="Its a Tie";
    }

    setImg(document.getElementsByClassName('img1')[0],player1);
    setImg(document.getElementsByClassName('img2')[0],player2);
    document.querySelector("h1").textContent=message;

    return [player1,player2];
}

rollDie();