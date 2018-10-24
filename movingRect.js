function MovingRect(posVector, rectNr) {
	// this.pos = createVector(width / 2, height/ 2);
	this.pos = posVector
	this.objClass = "notFixed";
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.side = 85;
	this.rectStrokeValue = 255;
	bounceSlider = createSlider(90.00, 200.00, 200.00);
	bounceSlider.position(20 + bounceSlider.width * rectNr,20);


	this.applyForce = function(p5Vector) {
		this.acc.add(p5Vector);
	}
	this.klass = function() {
		return this.objClass;
	}

	this.changePos = function(p5Vector) {
		this.pos.add(p5Vector);
	}

	this.update = function() {
		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.vel.limit(10);
		this.acc.mult(0);
		this.edges();
	}

	this.draw = function() {
		text(String(rectNr), this.pos.x + this.side/2, this.pos.y + this.side/2);
		text("bounce", bounceSlider.x * 2 * rectNr + bounceSlider.width, 35);
		this.bounce = bounceSlider.value() / 100;
		rect(this.pos.x, this.pos.y, this.side, this.side);
		noFill();
		strokeWeight(1);
		stroke(this.rectStrokeValue);
	}

	this.rectStroke = function(input) {
		this.rectStrokeValue = input;
	}

	this.edges = function() {
		revVelX = createVector(this.vel.x * -1 * this.bounce, 0)
		revVelY = createVector(0, this.vel.y * -1 * this.bounce)

		if (this.pos.x < 0 ) {
			this.pos.x = 0;
			this.applyForce(revVelX)
		}
		if (this.pos.x + this.side > width) {
			this.pos.x = width - this.side;
			this.applyForce(revVelX)
		}
		if (this.pos.y < 0) {
			this.pos.y = 0;
			this.applyForce(revVelY)
		} 
		if (this.pos.y + this.side > height) {
			this.pos.y = height - this.side;
			this.applyForce(revVelY)
		}
	}



	this.collide = function(obj) {
		//IF COLLIDING WITH A FIXED OBJECT - REPPEL ALL THE FORCE, OTHERWISE, COUNT THE FORCE AND USE IT TO REPPEL THE OTHER OBJECT
		if (obj.objClass == "notFixed") {
			stoppingForceVertical = createVector(0, (this.vel.y * -1 * this.bounce));
			stoppingForceHorizontal = createVector( (this.vel.x * -1 * this.bounce), 0);
		} else {
			stoppingForceVertical = createVector(0, (this.vel.y * -1 * this.bounce));
			stoppingForceHorizontal = createVector( (this.vel.x * -1 * this.bounce), 0);
		}
		negativeVector = this.side;
		positiveVector = obj.side;

		//Moving out of collision zone using straight angles and a vector
		// movingOutOfCollisionUp = createVector(0, -(obj.side/2 + this.side/2) + Math.abs(this.pos.y - obj.pos.y));
		// movingOutOfCollisionDown = createVector(0, (obj.side/2 + this.side/2) - Math.abs(this.pos.y - obj.pos.y));
		// movingOutOfCollisionLeft = createVector(-(obj.side/2 + this.side/2) + Math.abs(this.pos.x - obj.pos.x), 0);
		// movingOutOfCollisionRight = createVector( (obj.side/2 + this.side/2) - Math.abs(this.pos.x - obj.pos.x), 0);
		movingOutOfCollisionUp = createVector(0, -negativeVector + Math.abs(this.pos.y - obj.pos.y));
		movingOutOfCollisionDown = createVector(0, positiveVector - Math.abs(this.pos.y - obj.pos.y));
		movingOutOfCollisionLeft = createVector(-negativeVector + Math.abs(this.pos.x - obj.pos.x), 0);
		movingOutOfCollisionRight = createVector(positiveVector - Math.abs(this.pos.x - obj.pos.x), 0);


		//NEGATIVE POS - LONGER SIDE IDK Y.

		//console.log(colliderSide);
		if (colliderSide == "up" || colliderSide == "down") {
			this.applyForce(stoppingForceVertical);
			if (colliderSide == "up") {
				this.changePos(movingOutOfCollisionUp);		
			} else {
				this.changePos(movingOutOfCollisionDown);
			}
		} else {
			this.applyForce(stoppingForceHorizontal);
			if (colliderSide == "left") {
				this.changePos(movingOutOfCollisionLeft);
			} else {
				this.changePos(movingOutOfCollisionRight);
			}
			//this.applyForce(stoppingForceHorizontal);
		} 
	}
}