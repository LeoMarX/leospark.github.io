var box = document.getElementById("container").offsetWidth;
var cellSpace = box * 0.2;
var cellSideLength = box * 0.04;
var numberBackgroundColor = {2:"#eee4da", 4:"#ede0c8", 8:"#f2b179", 16:"#f59563", 32:"#f67c5f", 64:"#f65e3b", 128:"#edcf72", 256:"#edcc61", 512:"#9c0", 1024:"#33b5e5", 2048:"#09c", 4069:"#a6c", 8192:"#93c"};

function refreshBoardView() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			document.getElementById("number-cell-"+i+"-"+j).textContent = board[i][j];

			// 设置样式
			if(board[i][j] !== 0) {
				document.getElementById("number-cell-"+i+"-"+j).style.display = "block";
				document.getElementById("number-cell-"+i+"-"+j).style.top = getPos(i) + "px";
				document.getElementById("number-cell-"+i+"-"+j).style.left = getPos(j) + "px";
				document.getElementById("number-cell-"+i+"-"+j).style.background = board[i][j]<=8192 ? numberBackgroundColor[board[i][j]] : "black";
				document.getElementById("number-cell-"+i+"-"+j).style.color = board[i][j]<=4 ? "#776e65" : "white";
				document.getElementById("number-cell-"+i+"-"+j).style.fontSize = getFontsize(board[i][j]) + "px";
			} else {
				document.getElementById("number-cell-"+i+"-"+j).style.display = "none";
			}
		}
	}
}

// 返回坐标值
function getPos(i) {
	return (cellSpace * i + cellSideLength * (i+1));
}

function getFontsize(i) {
	if(i>64) {
		return i<1024 ? (0.45 * cellSpace) : (0.4 * cellSpace);
	} else {
		return (0.55 * cellSpace);
	}
}

function moveAnimation(fromX, fromY, toX, toY) {
	var numberCell = document.getElementById("number-cell-"+fromX+"-"+fromY);
	var lengthX = getPos(toX) - getPos(fromX);
	var lengthY = getPos(toY) - getPos(fromY);
	// console.log(lengthX+"; "+lengthY);
	var flag = 1;
	var  t = setInterval(function() {
				numberCell.style.top = getPos(fromX) + lengthX/10*flag + "px";
				numberCell.style.left = getPos(fromY) + lengthY/10*flag + "px";
				// console.log("flag: "+flag);
				flag ++;
				if(flag>10) {
					clearInterval(t);
				} 
		}, 16);
}

function updateScore() {
	document.getElementById("score").innerHTML = score;
}
