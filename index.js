var board = new Array(3);
var started = false;
var cursor = "none";

for (var i = 0; i < board.length; i++) {
  board[i] = new Array(3).fill(0);
}

function clearBeforeGame(){
  for(let i=0; i < 9; i++){
    if(document.getElementsByClassName("box")[i].hasAttribute("onclick")){
      document.getElementsByClassName("box")[i].setAttribute("onClick", "writeSign(this.id)");
    }
    if(document.getElementsByClassName("box")[i].hasChildNodes()){
      document.getElementsByClassName("box")[i].removeChild(document.getElementsByClassName("box")[i].firstChild);
    }
    for(let i=0; i<9; i++){
      board[Math.floor(i/3)][i%3] = 0;
    }
  }
  document.getElementById("title").innerHTML = "Tic Tac Toe";
}



function startGame(){
  if(started === true){
    clearBeforeGame();
  }else{
    started = true;
  }
  document.getElementById("title").innerHTML = "Cross turn";
  document.body.style.cursor = 'url("img/cross.png"), auto';
  cursor = "cross";
  for(let i=0; i < 9; i++){
    document.getElementsByClassName("box")[i].setAttribute("onClick", "writeSign(this.id)");
  }
};

function writeSign(id){
  if(cursor === "cross"){
    cross(id);
  }else if(cursor === "circle"){
    circle(id);
  }else{
    console.log("error");
  }
  document.getElementById(id).removeAttribute("onClick");
  let winner = checkWinner();
  if(winner != "play"){
    if(winner === "draw"){
      document.getElementById("title").innerHTML = "It's a draw";
    }else {
      document.getElementById("title").innerHTML = "The winner is " + winner;
    }
    for(let i=0; i < 9; i++){
      if(document.getElementsByClassName("box")[i].hasAttribute("onclick")){
        document.getElementsByClassName("box")[i].removeAttribute("onclick");
      }
    }
  }
  
}

function checkWinner(){
  let win = false;
  let winner = "none";
  for(let i=0; i < 3; i++){
    if(board[i][0] === board[i][1] && board[i][1] === board[i][2]){
      if(board[i][0] != 0){
        winner = board[i][0];
        win = true;
        break;
      }
    }else if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
      if(board[0][i] != 0){
        winner = board[0][i];
        win = true;
        break;
      }
    }
  }
  if(win === false && board[1][1] != 0){
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2]){
      win = true;
    }else if(board[0][2] === board[1][1] && board[1][1] === board[2][0]){
      win = true;
    }
    winner = board[1][1];
  }
  if(win){
    return winner;
  }else{
    let zero = false;
    for(let i=0; i<9; i++){
      if(board[Math.floor(i/3)][i%3] === 0){
        zero = true;
      }
    }
    if(zero === false){
      return "draw";
    }else{
      return "play";
    }
  }
}

function circle(id){
  document.getElementById(id).innerHTML = '<div class="circle"></div>';
  board[Math.floor(id/3)][id%3] = "circle";
  document.getElementById("title").innerHTML = "Cross turn";
  document.body.style.cursor = 'url("img/cross.png"), auto';
  cursor = "cross";
}

function cross(id){
  document.getElementById(id).innerHTML = '<div class="cross"></div>';
  board[Math.floor(id/3)][id%3] = "cross";
  document.getElementById("title").innerHTML = "Circle turn";
  document.body.style.cursor = 'url("img/circle.png"), auto';
  cursor = "circle";
}



