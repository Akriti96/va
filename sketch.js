var canvas;
var backgroundImage;
var bgImg;
var database;
var myform, myplayer, mygame;

var myPlayerCount, myGameState
var car1,car2,car1Image,car2Image, trackImage
var cars=[]

var fuelImage,fuleGroup
var powerCoinsImage,powerCoinsGroup


// its stores all the players info(1,2--->information)
var allPlayers

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  trackImage=loadImage("./assets/track.jpg")
  car1Image=loadImage("./assets/car1.png")
  car2Image=loadImage("./assets/car2.png")
  fuelImage=loadImage("./assets/fuel.png")
  powerCoinsImage=loadImage("./assets/goldCoin.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();

  mygame = new Game()
  mygame.start()
  mygame.getState()



}

function draw() {
  background(backgroundImage);
  if (myPlayerCount === 2) {
    mygame.updateState(1)
  }

  if(myGameState === 1){
    mygame.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
