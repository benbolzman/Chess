function King (color, location) {
	//A constructor for kings
	var blackpieces = [blackpawns[0], blackpawns[1], blackpawns[2], blackpawns[3], blackpawns[4], blackpawns[5], blackpawns[6], blackpawns[7], blackrookL, blackrookR, blackknightL, blackknightR, blackbishopL, blackbishopR, blackqueen];
	var whitepieces = [whitepawns[0], whitepawns[1], whitepawns[2], whitepawns[3], whitepawns[4], whitepawns[5], whitepawns[6], whitepawns[7], whiterookL, whiterookR, whiteknightL, whiteknightR, whitebishopL, whitebishopR, whitequeen];

	var self = this;
	this.type = "King";
	this.color = color;
	this.location = location;
	if (color == "black") {
		this.otherteam = whitepieces;
	} else if (color == "white") {
		this.otherteam = blackpieces;
	}
	this.image = "images/" + color + "King.png";
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
		var letterdist = desiredletteridx - currentletteridx;
		var digitdist = desireddigit - currentdigit;
		if (Math.abs(letterdist) <= 1 && Math.abs(digitdist) <= 1) {
			if (target == "empty"){
				validMove = true;
				for (piece of self.otherteam) {
					if(piece.checkKing(desiredlocation)) {
						validMove = false;
						break;
					}
				}
			} else if (target != "empty" && opposite) {
				validMove = true;
				for (piece of self.otherteam) {
					if(piece.checkKing(desiredlocation)) {
						validMove = false;
						break;
					}
				}
			} else {
				validMove = false;
			}
		} else {
			validMove = false;
		}
	return validMove
	});
	this.isCheckmate = (function () {
		var currentletteridx = translateLocation(self.location);
		var currentdigit = self.location[1];
		var checkmate = true;
		if (self.checkMove([currentletteridx, (currentdigit + 1)])
			|| self.checkMove([currentletteridx, (currentdigit - 1)])
			|| self.checkMove([(currentletteridx + 1), currentdigit])
			|| self.checkMove([(currentletteridx - 1), currentdigit])
			|| self.checkMove([(currentletteridx + 1), (currentdigit + 1)])
			|| self.checkMove([(currentletteridx - 1), (currentdigit - 1)])
			|| self.checkMove([(currentletteridx + 1), (currentdigit - 1)])
			|| self.checkMove([(currentletteridx - 1), (currentdigit + 1)])) {

			checkmate = false;
		}
	return checkmate;
	});
}
