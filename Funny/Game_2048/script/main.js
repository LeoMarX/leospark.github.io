var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
// var board = [[2,0,2,4],[4,4,0,0],[4,4,0,8],[0,16,16,0]];
// var board = [[0,0,0,8], [2,2,0,0], [2,2,4,4], [0,0,4,4]];
// var board = [[2,2,8,16], [4,2,16,8], [16,4,2,4], [8,2,16,4]];
var score = 0;

window.onload = init();

function init() {
	randNumber();
	randNumber();
	refreshBoardView();
}

function newGame() {
	board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	score = 0;
	init();
	updateScore();
}
// 生成新的随机数
function randNumber() {
	// 获取所有为0的数字的位置
	var storeZero = [];
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(board[i][j] === 0) {
				storeZero.push([i,j]);
			}
		}
	}

	if(storeZero.length > 0) {
		// 随机选择一个位置
		var randomPos = Math.floor(Math.random()*storeZero.length);
		var row = storeZero[randomPos][0];
		var col = storeZero[randomPos][1];
		board[row][col] = Math.random()>0.5 ? 2 : 4;
		// 添加类名，设置动画
		document.getElementById("number-cell-"+row+"-"+col).className = "number-cell" + " new_number";
		setTimeout(function(){
			document.getElementById("number-cell-"+row+"-"+col).className = "number-cell"
			}, 220);
		// console.log(row + "; " + col + "; " + board[row][col]);
	}
	// return no zero?
}

function moveLeft() {
	var temp = 0, flags = 0;
	for(var i=0; i<4; i++) {
		for(var j=0; j<3; j++) {
			for(var k=j+1; k<4; k++) {
				if(board[i][j]===0 && board[i][k]!==0) {
					// console.log("one: "+i+", "+j+", "+k);
					if(board[i][k]===board[i][k+1]) {
						board[i][j]=board[i][k]*2;
						board[i][k]=0;
						board[i][k+1]=0;
						moveAnimation(i,k,i,j);
						moveAnimation(i,k+1,i,j);
						temp += board[i][j];
						// console.log("two: "+i+", "+j+", "+k);
						break;
					} else {
						board[i][j]=board[i][k];
						board[i][k]=0;
						moveAnimation(i,k,i,j);
						flags ++;
						// console.log("three: "+i+", "+j+", "+k);
						// break;
					}
				}
				if(board[i][j]!==0 && board[i][k]!==0) {
					if(board[i][j]===board[i][k]) {
						board[i][j] = board[i][j]*2;
						board[i][k] = 0;
						moveAnimation(i,k,i,j);
						temp += board[i][j];
						// console.log("four: "+i+", "+j+", "+k);
						break;			
					} else { break; }
				}
			}
		}
	}
	score += temp;
	// 检查是否有发生移动，大于 0 则返回 true
	return (temp+flags)>0 ? true : false;
}

function moveRight() {
	var  temp = 0, flags = 0;
	for(var i=0; i<4; i++) {
		for(var j=3; j>0; j--) {
			for(var k=j-1; k>=0; k--) {
				if(board[i][j]===0 &&　board[i][k]!==0) {
					if(board[i][k]===board[i][k-1]) {
						board[i][j] = board[i][k]*2;
						board[i][k] = 0;
						board[i][k-1] = 0;
						moveAnimation(i,k,i,j);
						moveAnimation(i,k-1,i,j);
						temp += board[i][j];
						break;
					} else {
						board[i][j] = board[i][k];
						board[i][k] = 0;
						moveAnimation(i,k,i,j);
						flags ++;
						// break;
					}
				}

				if(board[i][j]!==0 && board[i][k]!==0) {
					if(board[i][j]===board[i][k]) {
						board[i][j] = board[i][j]*2;
						board[i][k] = 0;
						moveAnimation(i,k,i,j);
						temp += board[i][j];
						break;
					} else { break; }
				}
			}
		}
	}
	score += temp;
	return (temp+flags)>0 ? true : false;
}

function moveUp() {
	var temp = 0, flags = 0;
	for(var j=0; j<4; j++) {
		for(var i=0; i<3; i++) {
			for(var k=i+1; k<4; k++) {
				if(board[i][j]===0 && board[k][j]!==0) {
					if(k<3 && board[k][j]===board[k+1][j]) {
						board[i][j] = board[k][j]*2;
						board[k][j] = 0;
						board[k+1][j] = 0;
						moveAnimation(k,j,i,j);
						moveAnimation(k+1,j,i,j);
						temp += board[i][j];
						break;
					} else {
						board[i][j] = board[k][j];
						board[k][j] = 0;
						moveAnimation(k,j,i,j);
						flags ++;
						// break;
					}
				}

				if(board[i][j]!==0 && board[k][j]!==0) {
					if(board[i][j]===board[k][j]) {
						board[i][j] = board[i][j]*2;
						board[k][j] = 0;
						moveAnimation(k,j,i,j);
						temp += board[i][j];
						break;
					} else { break; }
				}
			}
		}
	}
	score += temp;
	return (temp+flags)>0 ? true : false;
}

function moveDown() {
	var temp = 0, flags = 0;
	for(var j=0; j<4; j++) {
		for(var i=3; i>0; i--) {
			for(var k=i-1; k>=0; k--) {
				if(board[i][j]===0 && board[k][j]!==0) {
					if(k>0 && board[k][j]===board[k-1][j]) {
						board[i][j] = board[k][j]*2;
						board[k][j] = 0;
						board[k-1][j] = 0;
						moveAnimation(k,j,i,j);
						moveAnimation(k-1,j,i,j);
						temp += board[i][j];
						break;
					} else {
						board[i][j] = board[k][j];
						board[k][j] = 0;
						moveAnimation(k,j,i,j);
						flags ++;
						// break;
					}
				}

				if(board[i][j]!==0 && board[k][j]!==0) {
					if(board[i][j]===board[k][j]) {
						board[i][j] = board[i][j]*2;
						board[k][j] = 0;
						moveAnimation(k,j,i,j);
						temp += board[i][j];
						break;
					} else { break; }
				}
			}
		}
	}
	score += temp;
	return (temp+flags)>0 ? true : false;
}

// 检查游戏能否继续
function checkGameOver() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(board[i][j]===0 || (i<3 && board[i][j]===board[i+1][j]) || (j<3 && board[i][j]===board[i][j+1])) {
				return true;
			}
		}
	}
	noticeGameOver();
	return false;
}

// 绑定键盘事件
document.onkeydown = function(event){
	event = event || window.event;
	function timer() {
		randNumber();
		refreshBoardView();
	}
	switch(event.keyCode) {
		case 37:
			event.preventDefault();
			if(moveLeft()){
				setTimeout(timer, 180);
			}
			break;
		case 38:
			event.preventDefault();
			if(moveUp()){
				setTimeout(timer, 180);
			}
			break;
		case 39:
			event.preventDefault();
			if(moveRight()){
				setTimeout(timer, 180);
			}
			break;
		case 40:
			event.preventDefault();
			if(moveDown()){
				setTimeout(timer, 180);
			}
			break;
		default:
			refreshBoardView();
			break;
	}
	updateScore();
	checkGameOver();
};

// 添加 touch 事件
document.addEventListener("touchstart",function(event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
})

document.getElementById("container").addEventListener("touchmove",function(event) {
	event.preventDefault();
});

document.addEventListener("touchend",function(event) {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var slideX = endX - startX,
		slideY = endY - startY,
		deltaX = Math.abs(slideX),
		deltaY = Math.abs(slideY);

	if(deltaX<0.2*document.body.clientWidth && deltaY<0.2*document.body.clientWidth) {
		return;
	}

	function timer() {
		randNumber();
		refreshBoardView();
	}

	if(deltaX>deltaY) {
		if(slideX>0) {
			if(moveRight()){
				setTimeout(timer, 180);
			}
		} else {
			if(moveLeft()){
				setTimeout(timer, 180);
			}
		}
	} else {
		if(slideY>0) {
			if(moveDown()){
				setTimeout(timer, 180);
			}			
		} else {
			if(moveUp()){
				setTimeout(timer, 180);
			}
		}
	}
	updateScore();
	checkGameOver();
});