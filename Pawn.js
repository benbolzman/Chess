function Pawn (color, location) {
	//A constructor for pawns
	var self = this;
	this.moveCount = 0;
	this.type = "pawn";
	this.color = color;
	if (color === "white") {
		this.direction = 1;
		this.image = "images/whitepawn.png";
	} else if (color === "black") {
		this.direction = -1;
		this.image = "images/blackpawn.png";
	}
	this.location = location;
	this.checkMove = (function (desiredlocation) {
		var obstacle = isOccupied(desiredlocation);
		var opposite = null;
		if (obstacle === "empty") {
			opposite = false;
		} else {
			opposite = isOpposing(self, obstacle);
		}
		var validMove = null;
		var currentletteridx = translateLocation(self.location);
		var desiredletteridx = translateLocation(desiredlocation);
		var currentdigit = self.location[1];
		var desireddigit = desiredlocation[1];
		if (currentdigit == 7 || currentdigit == 2) {
			if (currentletteridx == desiredletteridx) {
				validMove = (desireddigit == currentdigit + (1 * this.direction) || desireddigit == currentdigit + (2 * this.direction)) && (obstacle == "empty");
			} else if (desiredletteridx == (currentletteridx - 1) || desiredletteridx == (currentletteridx + 1)) {
				validMove = (desireddigit == currentdigit + (1 * this.direction)) && opposite;
			} else {
				validMove = false;
			}
		} else {
			if (currentletteridx == desiredletteridx) {
				validMove = (desireddigit == currentdigit + (1 * this.direction)) && (obstacle == "empty");
			} else if (desiredletteridx == (currentletteridx - 1) || desiredletteridx == (currentletteridx + 1)) {
				validMove = (desireddigit == currentdigit + (1 * this.direction)) && opposite;
			} else {
				validMove = false;
			}
		}
		currentletteridx = letters[currentletteridx];
		desiredletteridx = letters[desiredletteridx];
		return validMove;
	});
	this.checkKing = (function (kingdest) {
		var currentletteridx = translateLocation(self.location);
		var desiredletteridx = translateLocation(kingdest);
		var currentdigit = self.location[1];
		var desireddigit = kingdest[1];
		if (desiredletteridx == (currentletteridx - 1) || desiredletteridx == (currentletteridx + 1)) {
			return (desireddigit == currentdigit + (1 * this.direction));
		} else {
			return false;
		}
	});
}
