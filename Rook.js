function Rook (color, location) {
	//A constructor for the Rook object
	var self = this;
	this.moveCount = 0;
	this.type = "Rook";
	this.color = color;
	this.location = location;
	this.image = "images/" + color + "rook.png";
	this.checkMove = (function (desiredlocation) {
		var target = isOccupied(desiredlocation);
		var opposite = null;
		if (target === "empty") {
			opposite = false;
		} else {
			opposite = isOpposing(self, target);
		}
		var validMove = null;
		var currentletteridx = translateLocation(self.location);
		var desiredletteridx = translateLocation(desiredlocation);
		var currentdigit = self.location[1];
		var desireddigit = desiredlocation[1];
		//movmetn loop if moving vertically
		if (currentletteridx === desiredletteridx) {
      var distance = desireddigit - currentdigit;
      var counter = null;
      if (distance > 0) counter = 1;
      if (distance < 0) counter = -1;
			for (var i = currentdigit; i != desireddigit; i += counter) {
				validMove = true;
				if (i == currentdigit) continue;
				var obstacle = isOccupied([letters[currentletteridx], i]);
				if (obstacle != "empty") {
					validMove = false;
					break;
				}
			}
			if (validMove && target != "empty" && !opposite) {
				validMove = false;
			}
		//movment loop if moving horizontally
		} else if (currentdigit === desireddigit) {
			var distance = desiredletteridx - currentletteridx;
      var counter = null;
      if (distance > 0) counter = 1;
      if (distance < 0) counter = -1;
			for (var i = currentletteridx; i != desiredletteridx; i += counter) {
				validMove = true;
				if (i == currentletteridx) continue;
				var obstacle = isOccupied([letters[i], currentdigit]);
				if (obstacle != "empty") {
					validMove = false;
					break;
				}
			}
			if (validMove && target != "empty" && !opposite) {
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
