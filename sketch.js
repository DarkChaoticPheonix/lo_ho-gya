var giraffeHead,giraffeNeck,giraffeBody;
var giraffeHeadImg,giraffeHead2Img,giraffeNeckImg,giraffeNeck2Img,giraffeBodyImg;
var fakeground;
var fruit,fruitsGroup;
var appleImg,ichigoImg,orangeImg,pineappleImg,pearImg,watermelonImg,grapeImg;
var junglebg;
var playbutton,playImg;
var jameover,jameoverImg;
var restart,restartImg;
var score

var PLAY = 1;
var SERVE = 0;
var END = 2;
var gameState = SERVE;

var fruits = [];

function preload(){
  junglebg = loadImage("jungle.PNG");
  
  giraffeHeadImg = loadImage("giraffehead.png")
  giraffeHead2Img = loadImage("giraffehead2.png")
  giraffeNeckImg = loadImage("giraffeneck.png")
  giraffeBodyImg = loadImage("giraffebody.png")
  giraffeBody2Img = loadImage("giraffebody2.png")
  
  appleImg = loadImage("apple.png")
  watermelonImg = loadImage("watermelon.png")
  orangeImg = loadImage("orange.png")
  pearImg = loadImage("pear.png")
  pineappleImg = loadImage("pineapple.png")
  grapeImg = loadImage("grape.png")
  ichigoImg = loadImage("ichigo.png")

  playImg = loadImage("play.png");

  jameoverImg = loadImage("jameover.png");
  restartImg = loadImage("restart.webp");


}

function setup() {
createCanvas(400,600);



for(var i = 0;i < 1; i++){

}

fakeground = createSprite(350,460,800,10);
fakeground.visible = false ;

giraffeHead = createSprite(200,410,50,50);
giraffeHead.addImage(giraffeHeadImg);
giraffeHead.scale = 0.59;

giraffeNeck = createSprite(200.5,459,50,50);
giraffeNeck.addImage(giraffeNeckImg);
giraffeNeck.scale = 0.6;

giraffeBody = createSprite(200,520,50,50);
giraffeBody.addImage(giraffeBodyImg);
giraffeBody.scale = 0.6;

playbutton = createSprite(200,300,50,10);
playbutton.addImage(playImg);
playbutton.scale = 0.5;
playbutton.visible = false;

jameover = createSprite(200,250,50,10);
jameover.addImage(jameoverImg);
jameover.scale = 0.6;
jameover.visible = false;

restart = createSprite(200,370,15,15);
restart.addImage(restartImg);
restart.scale = 0.2
restart.visible = false;

fruitsGroup = new Group();

setTimeout(remove)

}

function draw() {
background(junglebg);

for (var i = 0; i < 400; i=i+20) {
  line(i,450,i+10,450);
}

if(gameState === SERVE){
  playbutton.visible = true;
  if(mousePressedOver(playbutton)){
  gameState = PLAY;
  } 
}

if(gameState === PLAY ){
playbutton.visible = false;

if(keyDown(RIGHT_ARROW)){
  giraffeHead.x += 10;
  giraffeNeck.x += 10;
  giraffeBody.x += 10;
  giraffeHead.addImage(giraffeHeadImg);
  giraffeBody.addImage(giraffeBodyImg);
}

if(keyDown(LEFT_ARROW)){
  giraffeHead.x -= 10;
  giraffeNeck.x -= 10;
  giraffeBody.x -= 10;
  giraffeHead.addImage(giraffeHead2Img);
  giraffeBody.addImage(giraffeBody2Img);
}

SpawnFruits();
 if(fruitsGroup.isTouching(fakeground)){
 gameState = END;
 }

}



if (gameState === END) {
   jameover.visible = true;
   restart.visible = true;
  

  giraffeBody.velocityX = 0;
  fruitsGroup.setVelocityYEach(0);
  
  // //set lifetime of the game objects so that they are never destroyed
  // obstaclesGroup.setLifetimeEach(-1);
  // cloudsGroup.setLifetimeEach(-1);
  
   if(mousePressedOver(restart)) {
     Reset();
  }
  

}



drawSprites();
}

function Reset(){
gameState = PLAY;

jameover.visible = false;
restart.visible = false;

fruitsGroup.destroyEach();

giraffeBody.x = 200;
giraffeHead.x  = 200;
giraffeNeck.x = 200;

giraffeBody.y = 520;
giraffeHead.y  = 410;
giraffeNeck.y = 459;
}



function SpawnFruits(){
if(frameCount % 60 === 0){
var fruit = createSprite(200,5,20,20);
fruit.x = Math.round(random(0,400));
fruit.velocityY = 5;

var rand = Math.round(random(1,7));
switch(rand) {
  case 1: fruit.addImage(appleImg);
          break;
  case 2: fruit.addImage(pearImg);
          break;
  case 3: fruit.addImage(pineappleImg);
          break;
  case 4: fruit.addImage(ichigoImg);
          break;
  case 5: fruit.addImage(orangeImg);
          break;
  case 6: fruit.addImage(watermelonImg);
          break;
  case 7: fruit.addImage(grapeImg);
  default: break;
}
fruitsGroup.add(fruit);
}
}
