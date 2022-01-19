var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, console.log("error"));
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    //add the animation of balloon [use balloonImage2]
    balloon.addAnimation(balloonImage1);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    //add the animation of balloon [use balloonImage2]
    balloon.addAnimation(balloonImage1);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
 //add the animation of balloon [use balloonImage2]
    balloon.scale=balloon.scale -0.005;
    balloon.addAnimation(balloonImage1);
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
  //add the animation of balloon [use balloonImage2]
    balloon.scale=balloon.scale+0.005;
    balloon.addAnimation(balloonImage1);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}


function updateHeight(x,y){
  database.ref('/balloon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}




function readHeight(data){
  //assign the value of data to height
  balloon.posiiton()
  //assign the x and y value of height to the respective x and y position of balloon
 }

function showError(){
  console.log("Error in writing to the database");
}
