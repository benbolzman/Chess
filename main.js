var letters = ["placeholder", "A", "B", "C", "D", "E", "F", "G", "H"]

function translateLocation (locationarry) {
	//Changes location letter (i.e "A" in ["A", 1]) to appropriate number for math
	var number = letters.findIndex(function (element) {
		if (element == locationarry[0]) return true;
	});
	return number;
}

function isOccupied (location) {
	//Checks if location is Occupied and returns what piece is there
	return board[location[0]][location[1]];
}

function isOpposing (current, obstacle) {
	//Checks if the piece is of the opposite color
	if (current.color != obstacle.color) {
		return true;
	} else {
		return false;
	}
}

function SAVE() {
	localStorage.setItem('board', JSON.stringify(board));
}

function PLACE (piece, desiredlocation) {
	//places the piece on the board the first time
	var currentletter = piece.location[0];
	var currentdigit = piece.location[1];
	var desiredletter = desiredlocation[0];
	var desireddigit = desiredlocation[1];
	board[currentletter][currentdigit] = "empty";
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter + ' img').remove();
	piece.location = desiredlocation;
	currentletter = piece.location[0];
	currentdigit = piece.location[1];
	board[currentletter][currentdigit] = piece;
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter + ' img').remove();
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter).append('<img src="' + piece.image + '" class="pieces">');
	SAVE();
}

function MOVE (piece, desiredlocation) {
	var currentletter = piece.location[0];
	var currentdigit = piece.location[1];
	var desiredletter = desiredlocation[0];
	var desireddigit = desiredlocation[1];
	var removed = isOccupied(desiredlocation);
	if (removed != "empty") {
		var color = removed.color;
		if (color == "white") {
			var index = blackKing.otherteam.findIndex(function (piece) {
				return piece === removed
			});
			blackKing.otherteam.splice(index, 1);
		} else if (color == "black") {
			var index = whiteKing.otherteam.findIndex(function (piece) {
				return piece === removed
			});
			whiteKing.otherteam.splice(index, 1);
		}
	}
	board[currentletter][currentdigit] = "empty";
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter + ' img').remove();
	piece.location = desiredlocation;
	currentletter = piece.location[0];
	currentdigit = piece.location[1];
	board[currentletter][currentdigit] = piece;
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter + ' img').remove();
	$('.board-row-' + currentdigit + ' .board-column-' + currentletter).append('<img src="' + piece.image + '" class="pieces">');
	SAVE();
}

function getLocation (locationstring) {
	var letter = locationstring.slice(0, 1);
	var digit = parseInt(locationstring.slice(2));
	return [letter, digit];
}

function checkSacrifice () {
	var whitelocation = whiteKing.location;
	var whiteInCheck = false;
	var blacklocation = blackKing.location;
	var blackInCheck = false;
	for (piece of whiteKing.otherteam) {
		if(piece.checkKing(whitelocation)) {
			whiteInCheck = true;
			break;
		}
	}
	for (piece of blackKing.otherteam) {
		if(piece.checkKing(blacklocation)) {
			blackInCheck = true;
			break;
		}
	}
	return [whiteInCheck, blackInCheck];
}

//Creating the black pawn objects
var blackpawns = [];
for (var i = 1; i < 9; i++) {
	var pawn = new Pawn ("black", [letters[i], 7]);
	blackpawns.push(pawn);
}

//Creating the white pawn objects
var whitepawns = [];
for (var i = 1; i < 9; i++) {
	var pawn = new Pawn ("white", [letters[i], 2]);
	whitepawns.push(pawn);
}

//Creating the rook objects
var whiterookL = new Rook ("white", ["A", 1]);
var whiterookR = new Rook ("white", ["H", 1]);
var blackrookL = new Rook ("black", ["A", 8]);
var blackrookR = new Rook ("black", ["H", 8]);

//Creating the knight objects
var whiteknightL = new Knight ("white", ["B", 1]);
var whiteknightR = new Knight ("white", ["G", 1]);
var blackknightL = new Knight ("black", ["B", 8]);
var blackknightR = new Knight ("black", ["G", 8]);

//Creating the bishop objects
var whitebishopL = new Bishop ("white", ["C", 1]);
var whitebishopR = new Bishop ("white", ["F", 1]);
var blackbishopL = new Bishop ("black", ["C", 8]);
var blackbishopR = new Bishop ("black", ["F", 8]);

//Creating the queen objects
var whitequeen = new Queen ("white", ["D", 1]);
var blackqueen = new Queen ("black", ["D", 8]);

//Creating the kings
var whiteKing = new King ("white", ["E", 1]);
var blackKing = new King ("black", ["E", 8]);

//The board with memory of what pieces are where
//var jsonboard = localStorage.getItem('board');
//var board = JSON.parse(jsonboard);
//if (!board) {
	var board = {
		A: ["empty", whiterookL, whitepawns[0], "empty", "empty", "empty", "empty", blackpawns[0], blackrookL ],
		B: ["empty", whiteknightL, whitepawns[1], "empty", "empty", "empty", "empty", blackpawns[1], blackknightL ],
		C: ["empty", whitebishopL, whitepawns[2], "empty", "empty", "empty", "empty", blackpawns[2], blackbishopL ],
		D: ["empty", whitequeen, whitepawns[3], "empty", "empty", "empty", "empty", blackpawns[3], blackqueen ],
		E: ["empty", whiteKing, whitepawns[4], "empty", "empty", "empty", "empty", blackpawns[4], blackKing ],
		F: ["empty", whitebishopR, whitepawns[5], "empty", "empty", "empty", "empty", blackpawns[5], blackbishopR ],
		G: ["empty", whiteknightR, whitepawns[6], "empty", "empty", "empty", "empty", blackpawns[6], blackknightR ],
		H: ["empty", whiterookR, whitepawns[7], "empty", "empty", "empty", "empty", blackpawns[7], blackrookR ]
	}
	//localStorage.setItem('board', JSON.stringify(board));
//}

var stringcurrentlocation = null;
var stringdesiredlocation = null;
var currentarry = null;
var desiredarry = null;
var firstclickarry = null;
var turncounter = 1;
$(document).ready(main);

function main () {
	//Creates the board on the screen
	for(var i = 8; i > 0; i--) {
		$('#boardbox').append('<div class="row board-row-' + i + ' chess-row"></div>');
		$('.board-row-' + i).append('<div class="col-sm-1 col-sm-offset-1 number"><h4>'+ i +'</h4></div>');
		for(var j = 1; j < 9; j++) {
			$('.board-row-' + i).append('<div class="col-sm-1 board-column-' + letters[j] +' chess-column" data-location="' + letters[j] + ':' + i +'"></div>');
		}
	}

	//sets the hieght of the columns to keep them square
	$('.number').each(function (idx, ele) {
		$(ele).height(($(ele).width()));
	});

	$('.chess-column').each(function (idx, ele) {
		$(ele).height(($(ele).width()));
	});

	//puts the pieces on the board on the screen
	for (column in board) {
		for (row of board[column]) {
			if (row != "empty") {
				PLACE(row, row.location);
			}
		}
	}
	$('.chess-column').click(function () {
		var self = this;
		var player = null;
		if (turncounter % 2 == 0) {
			player = "black";
		} else {
			player = "white";
		}
		firstclick = $('#boardbox').find('.chosen');
		if(firstclick.length == 0) {
			stringlocation = $(self).attr('data-location');
			firstclickarry = getLocation(stringlocation);
			var color = board[firstclickarry[0]][firstclickarry[1]].color;
			if (color === player) {
				$(self).addClass('chosen');
			}
		} else {
			stringcurrentlocation = $(firstclick).attr("data-location");
			currentarry = getLocation(stringcurrentlocation);
			stringdesiredlocation = $(self).attr('data-location');
			desiredarry = getLocation(stringdesiredlocation);
			if (stringcurrentlocation != stringdesiredlocation) {
				if (board[currentarry[0]][currentarry[1]].checkMove(desiredarry)) {
					MOVE(board[currentarry[0]][currentarry[1]], desiredarry);
					console.log(board[desiredarry[0]][desiredarry[1]].type);
					var sacrificearry = checkSacrifice();
					if ((player == "white" && sacrificearry[0]) || (player == "black" && sacrificearry[1])) {
						MOVE(board[desiredarry[0]][desiredarry[1]], currentarry);
						alert("Can't put your king in check!");
					} else {
						if (player == "white" && sacrificearry[1]) {
							var location = blackKing.location;
							$('.board-row-' + location[1] + ' .board-column-' + location[0]).addClass('inCheck');
						} else if (player == "black" && sacrificearry[0]) {
							var location = whiteKing.location;
							$('.board-row-' + location[1] + ' .board-column-' + location[0]).addClass('inCheck');
						} else {
							$('#boardbox .inCheck').removeClass('inCheck');
						}
						turncounter++;
						if (turncounter % 2 == 0) {
							player = "black";
						} else {
							player = "white";
						}
						$('#navbox .turn p').html("It is " + player + "'s turn.'");
					}
				} else {
					alert("Invalid Move!");
				}
			}
			$('#boardbox .chosen').removeClass('chosen');
		}
	});
}
