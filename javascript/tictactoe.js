window.onload=function() {
	text=document.getElementById("winner");
	canv=document.getElementById("myCanvas");
	ctx=canv.getContext("2d");
	document.addEventListener('mousedown', mouseClick);
	
	drawSquares();
	setArray();
}
player=1;
changePlayer=false;
squares=[];
gameFinished=false;
rectSide=100;
aiGame=true;
gameOnGoing=false;

function drawSquares() {
	ctx.beginPath();
	ctx.rect(rectSide, rectSide, rectSide, rectSide);
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'black';
	ctx.rect(rectSide, rectSide, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/3, rectSide, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/1.5, rectSide, rectSide/3, rectSide/3);
	ctx.rect(rectSide, rectSide, rectSide/3, rectSide/3);
	ctx.rect(rectSide, rectSide + rectSide/3, rectSide/3, rectSide/3);
	ctx.rect(rectSide, rectSide + rectSide/1.5, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/3, rectSide + rectSide/3, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/3, rectSide + rectSide/1.5, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/1.5, rectSide + rectSide/3, rectSide/3, rectSide/3);
	ctx.rect(rectSide + rectSide/1.5, rectSide + rectSide/1.5, rectSide/3, rectSide/3);
	ctx.stroke();
}

function resetGame() {
 player = 1;
 changePlayer = false;
 gameFinished = false;
 aiGame = true;
 setArray();
 ctx.clearRect(0, 0, canv.width, canv.height);
 drawSquares();
 text.innerHTML = "";
 gameOnGoing=false;
 document.getElementById("chooseAI").innerHTML = "Play with player";
}

function setAI() {

	if (gameOnGoing)
		return;
		
	if (aiGame) {
		aiGame = false;
		document.getElementById("chooseAI").innerHTML = "Play with AI";
	} else {
		aiGame = true;
		document.getElementById("chooseAI").innerHTML = "Play with player";
	}
}

function setArray() {	
	squares[0]=0;
	squares[1]=0;
	squares[2]=0;
	squares[3]=0;
	squares[4]=0;
	squares[5]=0;
	squares[6]=0;
	squares[7]=0;
	squares[8]=0;
}
function drawX(x, y) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+15, y+15);
	ctx.lineTo(x-15, y-15);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+15, y-15);
	ctx.lineTo(x-15, y+15);
	ctx.stroke();
}

function drawCircle(x, y) {
	ctx.beginPath();
	ctx.arc(x,y,14,0,2*Math.PI);
	ctx.stroke();
}

function mouseClick(evt) {

	if (gameFinished)
		return;
		
	if (squares[0] === 0 && evt.clientX > rectSide && evt.clientX < (rectSide + rectSide/3)
		&& evt.clientY > rectSide && evt.clientY < (rectSide + rectSide/3)) {
		drawToPosition(0, player);
		changePlayer = true;
	} else if (squares[1] === 0 && evt.clientX > (rectSide + rectSide/3) && evt.clientX < (rectSide + rectSide/1.5)
		&& evt.clientY > rectSide && evt.clientY < (rectSide + rectSide/3)){
		drawToPosition(1, player);
		changePlayer = true;
	} else if (squares[2] === 0 && evt.clientX > (rectSide + rectSide/1.5) && evt.clientX < rectSide*2
		&& evt.clientY > rectSide && evt.clientY < (rectSide + rectSide/3)){
		drawToPosition(2, player);
		changePlayer = true;
	} else if (squares[3] === 0 && evt.clientX > rectSide && evt.clientX < (rectSide + rectSide/3)
		&& evt.clientY > (rectSide + rectSide/3) && evt.clientY < (rectSide + rectSide/1.5)){
		drawToPosition(3, player);
		changePlayer = true;
	} else if (squares[4] === 0 && evt.clientX > (rectSide + rectSide/3) && evt.clientX < (rectSide + rectSide/1.5)
		&& evt.clientY > (rectSide + rectSide/3) && evt.clientY < (rectSide + rectSide/1.5)){
		drawToPosition(4, player);
		changePlayer = true;
	} else if (squares[5] === 0 && evt.clientX > (rectSide + rectSide/1.5) && evt.clientX < rectSide*2
		&& evt.clientY > (rectSide + rectSide/3) && evt.clientY < (rectSide + rectSide/1.5)){
		drawToPosition(5, player);
		changePlayer = true;
	} else if (squares[6] === 0 && evt.clientX > rectSide && evt.clientX < (rectSide + rectSide/3)
		&& evt.clientY > (rectSide + rectSide/1.5) && evt.clientY < rectSide*2){
		drawToPosition(6, player);
		changePlayer = true;
	} else if (squares[7] === 0 && evt.clientX > (rectSide + rectSide/3) && evt.clientX < (rectSide + rectSide/1.5)
		&& evt.clientY > (rectSide + rectSide/1.5) && evt.clientY < rectSide*2){
		drawToPosition(7, player);
		changePlayer = true;
	} else if (squares[8] === 0 && evt.clientX > (rectSide + rectSide/1.5) && evt.clientX < rectSide*2
		&& evt.clientY > (rectSide + rectSide/1.5) && evt.clientY < rectSide*2){
		drawToPosition(8, player);
		changePlayer = true;
	}
	if (changePlayer === true && !aiGame) {
		if (player === 0)
			player = 1;
		else
			player = 0;
			
		changePlayer = false;
	}
	
	if (aiGame && changePlayer) {
		aiPlay();
		changePlayer = false;
	}
	
	if (calculateWinner() === 1) {
		gameFinished=true;
		text.innerHTML = "Winner is O";
	} else if (calculateWinner() === 2) {
		gameFinished=true;
		text.innerHTML = "Winner is X";
	}
	
}

function calculateWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (var i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function drawToPosition(pos, player) {

	gameOnGoing = true;
	switch (pos) {
		case 0:
			console.log("Upper row left square");
			if (player === 0) {
				drawCircle(116.48, 116.48);
				squares[0] = 1;
			} else {
				drawX(116.5, 116.5);
				squares[0] = 2;
			}
			
			break;
		case 1:
			console.log("Upper row, middle square");
			if (player === 0) {
				drawCircle(150.48, 116.48);
				squares[1] = 1;
			} else {
				drawX(150.5, 116.5);
				squares[1] = 2;
			}
			
			break;
		case 2:
			console.log("Upper row, right square");
			if (player === 0) {
				drawCircle(184.48, 116.48);
				squares[2] = 1;
			} else {
				drawX(184.5, 116.5);
				squares[2] = 2;
			}
			break;
		case 3:
			console.log("Middle row, left square");
			if (player === 0) {
				drawCircle(116.48, 150.48);
				squares[3] = 1;
			} else {
				drawX(116.5, 150.5);
				squares[3] = 2;
			}
			break;
		case 4:
			console.log("Middle row, middle square");
			if (player === 0) {
				drawCircle(150.48, 150.48);
				squares[4] = 1;
			} else {
				drawX(150.5, 150.5);
				squares[4] = 2;
			}
			
			break;
		case 5:
			console.log("Middle row, right square");
			if (player === 0) {
				drawCircle(184.48, 150.48);
				squares[5] = 1;
			} else {
				drawX(184.5, 150.5);
				squares[5] = 2;
			}
			
			break;
		case 6:
			console.log("Down row left square");
			if (player === 0) {
				drawCircle(116.48, 184.48);
				squares[6] = 1;
			} else {
				drawX(116.5, 184.5);
				squares[6] = 2;
			}
			
			break;
		case 7:
			console.log("Down row middle square");
			if (player === 0) {
				drawCircle(150.48, 184.48);
				squares[7] = 1;
			} else {
				drawX(150.5, 184.5);
				squares[7] = 2;
			}
			
			break;
		case 8:
			console.log("Down row right square");
			if (player === 0) {
				drawCircle(184.48, 184.48);
				squares[8] = 1;
			} else {
				drawX(184.5, 184.5);
				squares[8] = 2;
			}
			
			break;
	}
}

function aiPlay() {

	const twoInARow = [
		[0,1,2],
		[1,2,0],
		[0,2,1],
		[3,4,5],
		[4,5,3],
		[3,5,4],
		[6,7,8],
		[7,8,6],
		[6,8,7],
		
		[0,3,6],
		[3,6,0],
		[0,6,3],
		[1,4,7],
		[4,7,1],
		[1,7,4],
		[2,5,8],
		[5,8,2],
		[2,8,5],
		
		[0,4,8],
		[2,4,6],
		[4,6,2],
		[4,8,0]
	];
	
	/* Find out if we have two in a row, if we have make it three in a row */
	for (var i = 0; i < twoInARow.length; i++) {
		const [a, b, c] = twoInARow[i];
		if (squares[a] === 1 && squares[a] === squares[b] && squares[c] === 0) {
			drawToPosition(c, 0);
			return;
		}
	}
	
	/* Find out if opponent has two in a row, if has block it. Handle special case */
	for (var i = 0; i < twoInARow.length; i++) {
		const [a, b, c] = twoInARow[i];
		if (squares[a] === 2 && squares[a] === squares[b] && squares[c] === 0) {
			drawToPosition(c, 0);
			return;
		} else if (squares[a] === 2 && squares[a] === squares[b] && squares[6] === 0) {
			drawToPosition(6, 0);
			return;
		}
	}
	
	/* Start always with left corner if player's first choice is middle square */
	if (squares[4] === 2 && squares[0] === 0) {
		drawToPosition(0, 0);
		return;
	}
	
	/* Start always with middle square if player's first choice is not middle square */
	if (squares[4] === 0) {
		drawToPosition(4, 0);
		return;
	}
	
	for (var i = 0; i < squares.length; i++) {
		if (squares[i] === 0) {
			drawToPosition(i, 0);
			return;
		}
			
	}
	
}