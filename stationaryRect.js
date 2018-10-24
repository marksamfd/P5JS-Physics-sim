function StationaryRect() {
	this.side = 200;
	this.pos = createVector(width / 2 - this.side, height/ 2 - this.side);

	this.update = function() {
		this.draw();
	}

	this.draw = function() {
		rect(this.pos.x, this.pos.y, this.side, this.side);
		noFill();
		strokeWeight(1);
	}
}