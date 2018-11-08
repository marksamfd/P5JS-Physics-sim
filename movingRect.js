function MovingRect(posVector, rectNr) {
	// this.pos = createVector(width / 2, height/ 2);
	this.pos = posVector
	this.objClass = "notFixed";
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.side = 115;
	this.rectStrokeValue = 255;
	this.mass = this.side;


	this.applyForce = function(p5Vector) {
		this.acc.add(p5Vector);
	}

	this.changePos = function(p5Vector) {
		this.pos.add(p5Vector);
	}

	this.update = function() {
		//this.edges();
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		//this.vel.limit(10);
		this.acc.mult(0);
		this.edges();

		this.impactForceHorizontal = this.vel.x * this.mass;
		this.impactForceVertical = this.vel.y * this.mass;
	}

	this.bounceForce = function(bounceSlider) {
		this.bounce = bounceSlider / 100;
	}

	this.draw = function() {
		text(String(rectNr), this.pos.x + this.side/2, this.pos.y + this.side/2);
		
		rect(this.pos.x, this.pos.y, this.side, this.side);
		noFill();
		strokeWeight(1);
		stroke(this.rectStrokeValue);
	}

	this.rectStroke = function(input) {
		this.rectStrokeValue = input;
	}


	this.collide = function(obj) {
		//IF COLLIDING WITH A FIXED OBJECT - DEFLECT ALL THE FORCE, OTHERWISE, COUNT THE FORCE AND USE IT TO DEFLECT THE OTHER OBJECT 
		movingOutOfCollisionUp = createVector(0, - ( (this.side + obj.side) / 2) + Math.abs(this.pos.y - obj.pos.y));
		movingOutOfCollisionDown = createVector(0, (obj.side + this.side) / 2 - Math.abs(this.pos.y - obj.pos.y));
		movingOutOfCollisionLeft = createVector(-( (this.side + obj.side) / 2) + Math.abs(this.pos.x - obj.pos.x), 0);
		movingOutOfCollisionRight = createVector((obj.side + this.side) / 2 - Math.abs(this.pos.x - obj.pos.x), 0);





		if (this.objClass == "notFixed") {
			//stoppingForceVertical = createVector(0, (this.vel.y * -1 * this.bounce));
			//stoppingForceHorizontal = createVector( (this.vel.x * -1 * this.bounce), 0);

			impactForceVerticalDiff = (this.impactForceVertical - obj.impactForceVertical);
			impactForceHorizontalDiff = (this.impactForceHorizontal - obj.impactForceHorizontal);
			//console.log("impactForceVerticalDiff: ", impactForceVerticalDiff);
			//console.log("impactForceHorizontalDiff: ", impactForceHorizontalDiff);

			// impactOnObjectVertical = createVector(0, (this.vel.y * this.bounce));
			// impactOnObjectHorizontal = createVector( (this.vel.x * this.bounce), 0);

			impactOnObjectVertical = createVector(0, (impactForceVerticalDiff / obj.mass));
			impactOnObjectHorizontal = createVector( (impactForceHorizontalDiff / obj.mass), 0);

			if (colliderSide == "up" || colliderSide == "down") {
				obj.applyForce(impactOnObjectVertical);
				if (colliderSide == "up") {
					this.changePos(movingOutOfCollisionUp);		
				} else {
					this.changePos(movingOutOfCollisionDown);
				}	
			} else {
				obj.applyForce(impactOnObjectHorizontal);
				if (colliderSide == "left") {
					this.changePos(movingOutOfCollisionLeft);
				} else {
					this.changePos(movingOutOfCollisionRight);
				}
			}
		} else {
			//CALCULATE THE IMPACT FORCE ON THIS OBJECT
			impactOnObjectVertical = createVector(0, (this.vel.y * this.bounce));
			impactOnObjectHorizontal = createVector( (this.vel.x * this.bounce), 0);

			if (colliderSide == "up" || colliderSide == "down") {
				obj.applyForce(impactOnObjectVertical);
				if (colliderSide == "up") {
					this.changePos(movingOutOfCollisionUp);		
				} else {
					this.changePos(movingOutOfCollisionDown);
				}	
			} else {
				obj.applyForce(impactOnObjectHorizontal);
				if (colliderSide == "left") {
					this.changePos(movingOutOfCollisionLeft);
				} else {
					this.changePos(movingOutOfCollisionRight);
				}
			} 

		}
		

		//Moving out of collision zone using straight angles and a vector
		// movingOutOfCollisionUp = createVector(0, -(obj.side/2 + this.side/2) + Math.abs(this.pos.y - obj.pos.y));
		// movingOutOfCollisionDown = createVector(0, (obj.side/2 + this.side/2) - Math.abs(this.pos.y - obj.pos.y));
		// movingOutOfCollisionLeft = createVector(-(obj.side/2 + this.side/2) + Math.abs(this.pos.x - obj.pos.x), 0);
		// movingOutOfCollisionRight = createVector( (obj.side/2 + this.side/2) - Math.abs(this.pos.x - obj.pos.x), 0);


		//NEGATIVE POS - LONGER SIDE IDK Y.

		//console.log(colliderSide);
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

}