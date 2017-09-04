function Knight (color, location) {
	//A constructor for knights
	var self = this;
	this.moveCount = 0;
	this.type = "knight";
	this.color = color;
	this.location = location;
	this.image = "images/" + color + "Knight.png";
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
		var letterdist = desiredletteridx - currentletteridx;
		var digitdist = desireddigit - currentdigit;
		if (Math.abs(letterdist) == 1 && Math.abs(digitdist) == 2) {
			if (obstacle == "empty") {
				validMove = true;
			} else if (obstacle != "empty" && opposite) {
				validMove = true;
			} else {
				validMove = false;
			}
		} else if (Math.abs(letterdist) == 2 && Math.abs(digitdist) == 1) {
			if (obstacle == "empty") {
				validMove = true;
			} else if (obstacle != "empty" && opposite) {
				validMove = true;
			} else {
				validMove = false;
			}
		} else {
			validMove = false;
		}
	return validMove;
	});
	this.checkKing = (function (kingdest) {
			return self.checkMove(kingdest);
	});
}
