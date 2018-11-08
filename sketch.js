function setup() {
	createCanvas(600,500);
	rectanglePosVector = createVector(50, 100);
	rectangle2PosVector = createVector(110, 100);
	rectangle = new MovingRect(rectanglePosVector, 1);
	rectangle2 = new MovingRect(rectangle2PosVector, 2);
	//rectangle2.side = 50;
	//fixedRect = new StationaryRect();
	//airResistanceForce = 0.01;
	//colliderCheck = new CollisionDetectionSquares(rectangle, fixedRect);
	colliderCheck = new CollisionDetectionSquares(rectangle, rectangle2);
	colliderCheck2 = new CollisionDetectionSquares(rectangle2, rectangle);

	
	moveForce = 1;
	moveUp = createVector(0,-moveForce);
	moveDown = createVector(0,moveForce);
	moveLeft = createVector(-moveForce,0);
	moveRight = createVector(moveForce,0);
	
	airResistanceSlider = createSlider(0.00, 15.00, 0.00);
	airResistanceSlider.position(20,50);

	gravityForceSlider = createSlider(0, 100, 0);
	gravityForceSlider.position(20,80);

	bounceSlider = createSlider(90.00, 200.00, 200.00);
	bounceSlider.position(20,20);
}



function draw() {

	frameRate(120);
	background(51);

	gravity = createVector(0, gravityForceSlider.value()/100);
	text("gravityForce", gravityForceSlider.x * 2 + gravityForceSlider.width, 95);
	airResistanceRect1 = createVector( (rectangle.vel.x * -1) * airResistanceSlider.value() / 100, (rectangle.vel.y * -1) * airResistanceSlider.value() / 100);
	airResistanceRect2 = createVector( (rectangle2.vel.x * -1) * airResistanceSlider.value() / 100, (rectangle2.vel.y * -1) * airResistanceSlider.value() / 100);
	text("airResistance", airResistanceSlider.x * 2 + airResistanceSlider.width, 65);
	text("bounce", bounceSlider.x * 2 + bounceSlider.width, 35);





	//Moving out of collision zone with negative velocity force


	//Moving out of collision zone by the shortest distance with a vetor
	// movingOutOfCollisionA = createVector(fixedRect.pos.x, fixedRect.pos.y);
	// movingOutOfCollisionB = createVector(rectangle.pos.x, rectangle.pos.y);
	// movingOutOfCollision = movingOutOfCollisionB.sub(movingOutOfCollisionA);
	// movingOutOfCollision.setMag( dist(rectangle.pos.x, rectangle.pos.y, fixedRect.pos.x, fixedRect.pos.y) -49);


	// movingOutOfCollisionUp.setMag( 50 - dist(rectangle.pos.x, rectangle.pos.y, fixedRect.pos.x, fixedRect.pos.y) );
	// movingOutOfCollisionDown.setMag( 50 - dist(rectangle.pos.x, rectangle.pos.y, fixedRect.pos.x, fixedRect.pos.y) );
	// movingOutOfCollisionLeft.setMag( 50 - dist(rectangle.pos.x, rectangle.pos.y, fixedRect.pos.x, fixedRect.pos.y) );
	// movingOutOfCollisionRight.setMag( 50 - dist(rectangle.pos.x, rectangle.pos.y, fixedRect.pos.x, fixedRect.pos.y) );
	// UPDADE POSITION INSTEAD OF APPLYING FORCES BY VECTORS










	// IDEA:: CALCULATE ALL POSITON CHANGES WHEN OBJECTS COLLIDE BEFORE DRAWING THE OBJECTS TO AVOID TWITCHES 
	//obj1.collide(obj2) Function in object to structure the code better
	//1 : input
	//2 : update
	//3 : collisions ---> collision correction
	//4 : draw


	if (keyIsDown(UP_ARROW)) {
		rectangle.applyForce(moveUp);
  	}
  	if (keyIsDown(DOWN_ARROW)) {
		rectangle.applyForce(moveDown);
  	}
  	if (keyIsDown(LEFT_ARROW)) {
  		rectangle.applyForce(moveLeft);
  	}
  	if (keyIsDown(RIGHT_ARROW)) {
  		rectangle.applyForce(moveRight);
  	}

  	if (keyIsDown(87)) {
		rectangle2.applyForce(moveUp);
  	}
  	if (keyIsDown(83)) {
		rectangle2.applyForce(moveDown);
  	}
  	if (keyIsDown(65)) {
  		rectangle2.applyForce(moveLeft);
  	}
  	if (keyIsDown(68)) {
  		rectangle2.applyForce(moveRight);
  	}


  	rectangle.bounceForce(bounceSlider.value());
	rectangle.applyForce(airResistanceRect1);
	rectangle.applyForce(gravity);
	//rectangle.update();


	rectangle2.bounceForce(bounceSlider.value());
	rectangle2.applyForce(airResistanceRect2);
	rectangle2.applyForce(gravity);

	rectangle.update();
	rectangle2.update();


	colliderCheck.update();
	colliderCheck2.update();

	if (CollisionDetectionSquares(rectangle, rectangle2)) {
		colliderSide = colliderCheck.collisionSide;
		colliderSide2 = colliderCheck2.collisionSide;

		//console.log("rect1: ",colliderSide);
		//console.log("rect2: ",colliderSide2);
		rectangle.collide(rectangle2, colliderSide);
		rectangle2.collide(rectangle, colliderSide2);
	}

	rectangle2.draw();
	rectangle.draw();



  // 	if (keyIsDown(76)) { //L
		// console.log("vectorLineLength: ",vectorLineLength);
  // 	}
  // 	if (keyIsDown(68)) { //D
		// console.log("DeltaX: ",trueDeltaX, "deltaY: ",trueDeltaY);
  // 	}
  // 	if (keyIsDown(65)) { //A
		// console.log("Angle: ",vectorLineAngle);
  // 	}
  // 	if (keyIsDown(88)) { //X
		// console.log("BothvectorLineInBoxLength: ",vectorLineInBoxLengthObj1 +vectorLineInBoxLengthObj2);
  // 	}
  	if (keyIsDown(67)) { //C
		console.clear();
  	}
  // 	if (keyIsDown(77)) { //M
  // 		console.log(moveUp, moveRight, moveDown, moveLeft);
  // 	}
  // 	if (keyIsDown(49)) { //1
  // 		console.log(vectorLineInBoxLengthObj1);
  // 	}
  // 	if (keyIsDown(50)) { //2
  // 		console.log(vectorLineInBoxLengthObj2);
  // 	}

}
