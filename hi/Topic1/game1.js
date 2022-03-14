let shape1;
let shape2;
let planets = [];
let pOrder = [0,1,2,3,4,5,6,7];
let round = 0;
let timerVal = 0;
let score = 0;
let capture;
let predictions = [];
let palm = [400,400];
let selector = [400,400];
let grabbing = false;
let wasgrabbing = false;
let traillist = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
let grabtime = 0;


function setup() {
  let cnv = createCanvas(800,800);
  cnv.parent('gameContainer');
  background(0);

  setInterval(tick, 1000);

  planets.push(new Draggable(0, "Mercury",100,450));
  planets.push(new Draggable(1, "Venus",250,500));
  planets.push(new Draggable(2, "Earth",500,500));  
  planets.push(new Draggable(3, "Mars",650,450));
  planets.push(new Draggable(4, "Jupiter",100,600));
  planets.push(new Draggable(5, "Saturn",250,650));
  planets.push(new Draggable(6, "Uranus",500,650));
  planets.push(new Draggable(7, "Neptune",650,600));
  shuffle(pOrder, true);
  print(pOrder);
  
  capture = createCapture(VIDEO);
  capture.hide();
  handpose = ml5.handpose(capture);
  handpose.on("predict", results => {
    predictions = results;
  });
  
}


function draw() {
  background(0);
  fill(255);
  ellipse(400,200,70,70);

  
  for (var i = 0; i<8; i++){
   planets[i].over();
   planets[i].update();
   planets[i].show();
   planets[i].check();
   
  }
  text(Math.floor(timerVal/60) + ":" + timerVal, 700, 60);
  text(score, 700, 80);
  text(pOrder[round],700, 100);

  push();
  tint(255,50);
  translate(width,0);
  scale(-1, 1);
  image(capture, 0, 0, 1050, 800);
  pop();

  if(predictions[0]){
    
    const prediction = predictions [0];

    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      
      fill(0, 255, 0);
      noStroke();
      //ellipse(800- (keypoint[0]*1.65), keypoint[1]*1.65, 7, 7);
    }

    palm = [800-((prediction.landmarks[0][0]+prediction.landmarks[9][0])*0.825),((prediction.landmarks[0][1]*1.65+prediction.landmarks[9][1]*1.65)/2)];
    //ellipse(palm[0],palm[1], 30 ,30);

   




    if( prediction.landmarks[8][1] > prediction.landmarks[6][1] && // indexFinger down
      prediction.landmarks[12][1] > prediction.landmarks[10][1] && // middleFinger down
      prediction.landmarks[16][1] > prediction.landmarks[14][1] && // ringfinger down
      prediction.landmarks[20][1] > prediction.landmarks[18][1]) { // Pinky down      
      fill(255,0,0);
      //ellipse(palm[0],palm[1], 30 ,30);
      grabbing = true;
    }
    else {grabbing = false}


    
  } 
  selector[0] -= (selector[0]- palm[0])/ 5;
  selector[1] -= (selector[1]- palm[1])/ 5;
  

  traillist = [[selector[0],selector[1]],traillist[0],traillist[1],traillist[2],traillist[3],traillist[4],traillist[5],traillist[6],traillist[7]];
  

  if (grabbing == true) {
    grabtime ++;
    if (grabtime == 10) {
      handgrab();
    }
    if (grabtime > 10) {
      strokeWeight(10)
    }
    else{
      strokeWeight(grabtime)
    }
  } else {

      if (grabtime > 10) {
        grabtime = 9
      }else{
        if (grabtime == 5) {
          grabtime--;
          handdrop();
        }
        else if(grabtime > 1) {
          grabtime--;
          strokeWeight(grabtime)
        }
        
      }
  }
  print(grabtime);

    for (i = 1; i < traillist.length; i++) {
    noFill();
    stroke(255,255,255,255/i*1.5);
    ellipse(traillist[i][0], traillist[i][1], 75-i*5, 75-i*5);

  }

}



function next() {
  planets = [];
  timerVal = 0;
  for (var i = 0; i<8; i++){
    planets.push(new Draggable(0, "Mercury",100,450));
    planets.push(new Draggable(1, "Venus",250,500));
    planets.push(new Draggable(2, "Earth",500,500));  
    planets.push(new Draggable(3, "Mars",650,450));
    planets.push(new Draggable(4, "Jupiter",100,600));
    planets.push(new Draggable(5, "Saturn",250,650));
    planets.push(new Draggable(6, "Uranus",500,650));
    planets.push(new Draggable(7, "Neptune",650,600));
  }
  round++;

}


class Draggable {
  constructor(id, text, x, y) {

    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.grabbing = false;
    this.hovering = false;
    this.text = text;
    this.id = id; 
    this.img = loadImage("../Images/p" + this.id + ".png")

    this.x = x;
    this.y = y;
    // Dimensions
    this.w = 50;
    this.h = 70;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }

    if (palm[0] > this.x && palm[0] < this.x + this.w && palm[1] > this.y && palm[1] < this.y + this.h){
      this.hovering = true;
    } else {
      this.hovering = false;
    }

  }

  update() {

    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

    if (this.grabbing) {
      this.x = selector[0] + this.AoffsetX;
      this.y = selector[1] + this.AoffsetY;
    
    }

  }

  show() {


    image(this.img, this.x , this.y, 60 , 60)
    stroke(0);
    // Different fill based on state
    if (this.dragging || this.grabbing) {
      fill(50);
    } else if (this.rollover || this.hovering) {
      fill(100);
    } else {
      fill(175, 200);
    }
    text(this.text,this.x + 10, this.y + 70, this.w, this.h);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  grabbed() {

    if(palm[0] > this.x && selector[0] < this.x + this.w && selector[1] > this.y && selector[1] < this.y + this.h) {
      this.grabbing = true;
      this.AoffsetX = this.x - selector[0];
      this.AoffsetY = this.y - selector[1];
    }


  }
  released() {
    // Quit dragging
    this.dragging = false;
  }

  dropped() {
    this.grabbing = false;
  }
  
  check() {
    if (this.x < 435 && this.x > 365 && this.y < 235 && this.y > 165 && this.dragging == false && pOrder[round] == this.id) {
      roundWin();
    }
  
  
  }
}

function mousePressed() {
  for (var i = 0; i<8; i++){
    planets[i].pressed();
  }
}

function mouseReleased() {
  for (var i = 0; i<8; i++){
    planets[i].released();
  }
}

function handgrab() {
  for (var i = 0; i<8; i++){
    planets[i].grabbed();
  }
  //ellipse(palm[0],palm[1], 10,10);
}

function handdrop() {
  for (var i = 0; i<8; i++){
    planets[i].dropped();
  }
}
function tick(){
    if (timerVal < 20) {timerVal++;}
    else{roundLose()}
}

function roundWin() {
    score += ((20-timerVal) * 10)
    next();
}

function roundLose() {
    next();
}
