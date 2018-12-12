/*

由三部分组成：
动态作画、
静态作画、
动态交互。
*/

//********************************全局变量初始化********************************************************** */

//泡沫
var boids = [];

//棒棒糖
var systems;

//眼
var e1, e2;

//毛笔
var num = 60;
var mx = [];
var my = [];

//追鼠标结
var numSegments = 15,
x = [],
y = [],
angle = [],
segLength = 30,
targetX, targetY;
for (var i = 0; i < numSegments; i++) 
{
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

var xoff = 0.0;//随机数种子





//**********************设置画布     及部分数据初始化*************************************************************
function setup() {
	createCanvas(800,700);
	//棒棒糖
	systems = [];

//滑条初始化
	rSlider = createSlider(0, 255, 100);
	rSlider.position(1010,40);
	gSlider = createSlider(0, 255, 100);
	gSlider.position(1010,60);
	bSlider = createSlider(0, 255, 100);
	bSlider.position(1010,80);

	typeSlider = createSlider(0, 2, 0);
	typeSlider.position(1010,200);

	boolSlider = createSlider(0, 2, 0);
	boolSlider.position(1010,320);

	//毛笔初始化
	fill(255, 153);
    for (var i = 0; i < num; i++) {
      mx.push(i);
      my.push(i);
		}
		
	//眼睛初始化
	e1 = new Eye(200, 250, 100);
	e2 = new Eye(400, 250, 100);

	//追鼠标结
	x[x.length-1] = 300; 
	y[x.length-1] = 100; 
	
	//泡沫
	for (var i = 0; i < 100; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
	
	
  }
//*********************************drawh函数画**************************************************
function draw() {

	//***********************************************************（1）动态作画*****************************/
	if(boolSlider.value()==0)
	{
		background(150,40,20);
		stroke(240,220,200);
		strokeWeight(1);
		//随机种子
		xoff = xoff + 0.01;
	
		//文字
		textSize(20);
		text("画笔的",730,65);
		text("R,G,B",730,85);

		text("画笔元",730,210);
		text("素选择",730,230);

		text("作画模",730,330);
		text("式选择",730,350);

		//棒棒糖
		for (i = 0; i < systems.length; i++) {
			systems[i].run();
			systems[i].addParticle();
		}
	 
		stroke(240,220,200);
//毛笔嵌套五角星
	  var which = frameCount % num;
	  mx[which] = mouseX;
	  my[which] = mouseY;
	  
	  if(typeSlider.value()==0)
	  {
			for (var i = 0; i < num; i++) 
			{
				var index = (which+1 + i) % num;
				push();
				translate(mx[index],my[index]);
				rotate(frameCount / -100.0);
				star(0, 0, 30, i, 5); 
				pop();
			}
		}

		//毛笔嵌套滑稽
		else if(typeSlider.value()==1)
		{
			for (var i = 0; i < num; i++) 
			{
				var index = (which+1 + i) % num;
				push();
				translate(mx[index],my[index]);
				huaji(0,0,i*1.5,mx[index]%2);
				pop();
			}
		}

		//毛笔嵌套皮卡丘
		else if(typeSlider.value()==2)
		{
			for (var i = 0; i < num; i++) 
			{
				var index = (which+1 + i) % num;
				push();
				translate(mx[index],my[index]);
				pika(0,0,i*1.5);
				pop();
			}
		}



	}
//****************************************（2）静态作画*******************************************/
	else if(boolSlider.value()==1)
	{
		stroke(240,220,200);
		strokeWeight(1);
		xoff = xoff + 0.01;
	
		textSize(20);
		text("五星的",730,65);
		text("R,G,B",730,85);

		text("画笔元",730,210);
		text("素选择",730,230);

		text("作画模",730,330);
		text("式选择",730,350);

		//点击作画
		if(mouseIsPressed){
		if(typeSlider.value()==0)
		{
		//画五星，形状大小随机
				star(mouseX,mouseY, 20,noise(xoff)*50,5); 
			
		}
		else if(typeSlider.value()==1)
		{
			//画滑稽，大小和眼睛朝向随机
			if(noise(xoff)>0.5)
				huaji(mouseX,mouseY,noise(xoff)*100,1);
			else
				huaji(mouseX,mouseY,noise(xoff)*100,0);
		}
		else if(typeSlider.value()==2)
		{
			//画皮卡丘，大小随机
			pika(mouseX,mouseY,noise(xoff)*100);
		}
	}

	}
	//**********************（3）动态交互******************************************************* */	
		
	else if(boolSlider.value()==2)
	{
		background(150,40,20);
		stroke(240,220,200);
		strokeWeight(1);
		xoff = xoff + 0.01;
	
		textSize(20);
		text("五星的",730,65);
		text("R,G,B",730,85);

		text("画笔元",730,210);
		text("素选择",730,230);

		text("作画模",730,330);
		text("式选择",730,350);

//泡沫
		for (var i = 0; i < boids.length; i++) {
			boids[i].run(boids);
		}

//大笑脸
	  noStroke();
	  fill(237,148,14);
	  ellipse(300,300,400);
		fill(252,222,12);
		ellipse(300,300,380);
	  
	  fill(173,91,10);
	  arc(300,300, 320, 320, 0, PI, CHORD);
	  fill(252,222,12);
	  arc(300,296, 320, 280, 0, PI, CHORD);

//大眼睛
		e1.update(mouseX, mouseY);
		e1.display();

		e2.update(mouseX, mouseY);
		e2.display();

		//追鼠标结
		reachSegment(0, mouseX, mouseY);

		for(var i=1; i<numSegments; i++) 
		{
			reachSegment(i, targetX, targetY);
		}

		for(var j=x.length-1; j>=1; j--) 
		{
			positionSegment(j, j-1);
		}

		for(var k=0; k<x.length; k++) 
		{
			segment(x[k], y[k], angle[k], (k+1)*2);
		}

	
//鼠标上滑稽
if(typeSlider.value()==0)
{
//画五星，形状大小随机
		star(mouseX,mouseY, 20,noise(xoff)*50,5); 
	
}
else if(typeSlider.value()==1)
{
	//画滑稽，大小和眼睛朝向随机
	if(noise(xoff)>0.5)
		huaji(mouseX,mouseY,noise(xoff)*100,1);
	else
		huaji(mouseX,mouseY,noise(xoff)*100,0);
}
else if(typeSlider.value()==2)
{
	//画皮卡丘，大小随机
	pika(mouseX,mouseY,noise(xoff)*100);
}

 
	}
  }
//********************************各调用函数*********************************************************
//*********************** */星星。参数：坐标、内外半径、边数**********************************
function star(x, y, radius1, radius2, npoints) 
{
fill(rSlider.value(),gSlider.value(),bSlider.value(),180);
var angle = TWO_PI / npoints;
var halfAngle = angle/2.0;
beginShape();
for (var a = 0; a < TWO_PI; a += angle) {
	var sx = x + cos(a) * radius2;
	var sy = y + sin(a) * radius2;
	vertex(sx, sy);
	sx = x + cos(a+halfAngle) * radius1;
	sy = y + sin(a+halfAngle) * radius1;
	vertex(sx, sy);
}
endShape(CLOSE);
}

//******************************** */眼睛 参数：坐标，半径*************************
function Eye(tx, ty, ts)
 {
  this.x = tx;
  this.y = ty;
  this.size = ts;
  this.angle = 0;

  this.update = function (mx, my) {
    this.angle = atan2(my - this.y, mx - this.x);
  };

  this.display = function () {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    rotate(this.angle);
    fill(0,0,0);
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  };
}

//***********************************追鼠标结**************************** */
function positionSegment(a, b) 
{
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin)
 {
  var dx = xin - x[i];
  var dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a, sw) 
{
  strokeWeight(sw);
	stroke(10,10,10,180);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

//********************************************* */滑稽脸。参数：坐标，大小，眼睛朝向（0，1）****************
function huaji(x,y,size,l)
{
	  noStroke();
	  fill(237,148,14);
	  ellipse(x,y,1.06*size);
	fill(252,222,12);
	ellipse(x,y,size);//脸
	  
	  fill(173,91,10);
	  arc(x, y, 0.8*size, 0.8*size, 0, PI, CHORD);
	  fill(252,222,12);
	  arc(x, y-0.01*size, 0.8*size, 0.7*size, 0, PI, CHORD);//笑
	  
	  fill(254,240,205);
	  arc(x-0.25*size, y, 0.8*size, 0.6*size, 1.3*PI,1.7* PI, PIE);
	  fill(252,222,12);
	  arc(x-0.25*size, y, 0.8*size, 0.5*size, 1.3*PI,1.7* PI, PIE);
	  
	  
	  fill(254,240,205);
	  arc(x+0.25*size, y, 0.8*size, 0.6*size, 1.3*PI,1.7* PI, PIE);
	  fill(252,222,12);
	  arc(x+0.25*size, y, 0.8*size, 0.5*size, 1.3*PI,1.7* PI, PIE);//眼壳子
		if(l==0)
		{
	  fill(173,91,10);
	ellipse(x-0.34*size,y-0.28*size,0.1*size);
	  ellipse(x+0.16*size,y-0.28*size,0.1*size);//眼珠
	  }
	if(l==1)
	{
	  fill(173,91,10);
	ellipse(x-0.1*size,y-0.28*size,0.1*size);
	  ellipse(x+0.35*size,y-0.28*size,0.1*size);//眼珠
	  
	  
	  }
	  
	  fill(58,43,1);
	  arc(x-0.28*size, y-0.35*size,0.20*size, 0.20*size, 1.1*PI,2.1* PI, OPEN);
	  fill(252,222,12);
	  arc(x-0.28*size, y-0.35*size, 0.21*size, 0.16*size, 1*PI,2.2* PI, OPEN);
	  
	  fill(58,43,1);
	  arc(x+0.28*size, y-0.35*size,0.20*size,0.20*size, 0.9*PI,1.9* PI, CHORD);
	  fill(252,222,12);
	  arc(x+0.28*size, y-0.35*size, 0.21*size, 0.15*size, 0.9*PI,1.9* PI, CHORD);//眉毛
  
	  
	  fill(241,74,56);
	  ellipse(x-0.25*size,y-0.18*size,0.25*size,0.07*size);
	  ellipse(x+0.25*size,y-0.18*size,0.25*size,0.07*size);
	}
	

function pika(x,y,size)
{
  	
	strokeWeight(0.5);
	stroke(20,22,20);
	fill(252,222,12);
	triangle(x-0.25*size,y-0.4*size,x-0.1*size,y-0.45*size,x-0.45*size,y-0.8*size);
  triangle(x+0.25*size,y-0.4*size,x+0.1*size,y-0.45*size,x+0.45*size,y-0.8*size);
  fill(0);
  triangle(x-0.35*size,y-0.6*size,x-0.3*size,y-0.65*size,x-0.45*size,y-0.8*size);
  triangle(x+0.35*size,y-0.6*size,x+0.3*size,y-0.65*size,x+0.45*size,y-0.8*size);
//犄角
fill(252,222,12);
  ellipse(x,y,size);//脸
  
  

	
	
	fill(0);
  ellipse(x-0.24*size,y-0.18*size,0.21*size);
	ellipse(x+0.24*size,y-0.18*size,0.21*size);//眼黑

  beginShape();
  curveVertex(x,y-0.015);
  curveVertex(x,y-0.015);
  curveVertex(x-0.04*size,y-0.02*size);
  curveVertex(x-0.02*size,y+0.01*size);
  curveVertex(x,y+0.02*size);
  curveVertex(x+0.02*size,y+0.01*size);
  curveVertex(x+0.04*size,y-0.02*size);
  curveVertex(x,y-0.015);  
  curveVertex(x,y-0.015); 
  endShape();//鼻子
  
	
	fill(220,220,220);
  ellipse(x-0.26*size,y-0.18*size,0.05*size);
	ellipse(x+0.22*size,y-0.18*size,0.05*size);//眼珠
  
  ellipse(x-0.27*size,y-0.1*size,0.01*size);
	ellipse(x+0.21*size,y-0.1*size,0.01*size);//眼睛白色反光
	

	
	fill(241,74,56,180);
	ellipse(x-0.3*size,y,0.15*size,0.1*size);
	ellipse(x+0.3*size,y,0.15*size,0.1*size);//红晕
  
 
  stroke(0);
  noFill();
  strokeWeight(0.015*size);
	beginShape();
  curveVertex(x-0.12*size,y+0.17*size);
  curveVertex(x-0.12*size,y+0.17*size);
  curveVertex(x-0.07*size,y+0.23*size);
  curveVertex(x,y+0.2*size);
  curveVertex(x+0.07*size,y+0.23*size);
  curveVertex(x+0.12*size,y+0.17*size);
  curveVertex(x+0.12*size,y+0.17*size);
  endShape();
}

/********************************棒棒糖********************************************** */
function mousePressed()
 {
	if(mouseX>0&&mouseX<800)
	{
  this.p = new ParticleSystem(createVector(mouseX, mouseY));
	systems.push(p);
	}
}

// A simple Particle class
var Particle = function(position) 
{
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function()
 {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function()
{
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () 
{
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
	//ellipse(this.position.x, this.position.y, 12, 12);
	star(this.position.x, this.position.y, 5,12, 5); 
};

// Is the particle still useful?
Particle.prototype.isDead = function ()
{
	if (this.lifespan < 0) 
	{
    return true;
	}

	else
	{
    return false;
  }
};

var ParticleSystem = function (position) 
{
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () 
{
  // Add either a Particle or CrazyParticle to the system
  if (int(random(0, 2)) == 0) {
    p = new Particle(this.origin);
	}
	
	else 
	{
    p = new CrazyParticle(this.origin);
  }
  this.particles.push(p);
};

ParticleSystem.prototype.run = function () 
{
	for (var i = this.particles.length - 1; i >= 0; i--) 
	{
    var p = this.particles[i];
    p.run();
		if (p.isDead()) 
		{
      this.particles.splice(i, 1);
    }
  }
};

// A subclass of Particle

function CrazyParticle(origin) 
{
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Particle.call(this, origin);

  // Initialize our added properties
  this.theta = 0.0;
};

// Create a Crazy.prototype object that inherits from Particle.prototype.
// Note: A common error here is to use "new Particle()" to create the
// Crazy.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give Particle for the "origin" 
// argument. The correct place to call Particle is above, where we call 
// it from Crazy.
CrazyParticle.prototype = Object.create(Particle.prototype); // See note below

// Set the "constructor" property to refer to CrazyParticle
CrazyParticle.prototype.constructor = CrazyParticle;

// Notice we don't have the method run() here; it is inherited from Particle

// This update() method overrides the parent class update() method
CrazyParticle.prototype.update=function() 
{
  Particle.prototype.update.call(this);
  // Increment rotation based on horizontal velocity
  this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
}

// This display() method overrides the parent class display() method
CrazyParticle.prototype.display=function() 
{
  // Render the ellipse just like in a regular particle
  Particle.prototype.display.call(this);
  // Then add a rotating line
  push();
  translate(this.position.x, this.position.y);
  rotate(this.theta);
  stroke(255,this.lifespan);
  line(0,0,25,0);
  pop();
}


//**********************************泡沫************************************************************ */
// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x, y) 
{
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) 
{
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

// Forces go into acceleration
Boid.prototype.applyForce = function(force) 
{
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) 
{
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids);    // Alignment
  var coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() 
{
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset acceleration to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) 
{
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

// Draw boid as a circle
Boid.prototype.render = function() 
{
  fill(127, 127);
  stroke(200);
	//ellipse(this.position.x, this.position.y, 16, 16);
//	pika(this.position.x, this.position.y, 50);
	pika(this.position.x, this.position.y,noise(xoff)*100);
}

// Wraparound
Boid.prototype.borders = function() 
{
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) 
{
  var desiredseparation = 25.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
	for (var i = 0; i < boids.length; i++) 
	{
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
		if ((d > 0) && (d < desiredseparation)) 
		{
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
	if (count > 0) 
	{
    steer.div(count);
  }

  // As long as the vector is greater than 0
	if (steer.mag() > 0) 
	{
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) 
{
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
	for (var i = 0; i < boids.length; i++) 
	{
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
	if (count > 0) 
	{
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
	} 

	else 
	{
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) 
{
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
	var count = 0;
	
	for (var i = 0; i < boids.length; i++) 
	{
    var d = p5.Vector.dist(this.position, boids[i].position);
		if ((d > 0) && (d < neighbordist)) 
		{
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
	if (count > 0) 
	{
    sum.div(count);
    return this.seek(sum); // Steer towards the location
	} 
	
	else 
	{
    return createVector(0, 0);
  }
}
