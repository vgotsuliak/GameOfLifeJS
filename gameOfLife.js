'use strict'

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

context.fillStyle = "#FF0000";

var x = new Array(100);
for (var i = 0; i < x.length; i++) {
	x[i] = new Array(100);
}

for (var i = 0; i < x.length; i++) {
	for (var j = 0; j < x[i].length; j++) {
		if (Math.random() > 0.95) {
			x[i][j] = true;		
		} else {
			x[i][j] = false;
		}
	};
};


draw(x, context);
setInterval(function(){
	draw(x, context);
	x = nextStep(x);
}, 100);

function draw(elements, context) {
	for (var i = 0; i < elements.length; i++) {
		for (var j = 0; j < elements[i].length; j++) {
			if (elements[i][j]) {
				context.fillRect(i*10,j*10,10,10);
			} else {
				context.clearRect(i*10,j*10,10,10);
			}
		};
	};
};

function nextStep(cells) {
	var nextStepCells = cells.slice();
	for (var i = 0; i < cells.length; i++) {
		for (var j = 0; j < cells[i].length; j++) {
			nextStepCells[i][j] = shouldBeAlive(cells, i, j);
		};
	};
	return nextStepCells;
}

function shouldBeAlive(cells, x, y) {
	//not process border cells
	if (x != 0 && y != 0 && x != cells.length - 1 && y != cells[x].length) {
		var neighbors = 0;
		for (var i = x - 1; i <= x + 1; i++) {
			for (var j = y - 1; j <= y + 1; j++) {
				if (i === x && j === y) {
					continue;
				}
				if (cells[i][j]) {
					neighbors++;
				}
			};
		};
		if (neighbors < 2 || neighbors > 3) {
			return false;
		}
		return true;
	}
	return false;
}

	




















