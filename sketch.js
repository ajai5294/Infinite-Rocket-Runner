var rocket, space, meteor, satellite, fuel, earth, moon, gameover;
var rocketImg, spaceImg, meteorImg, satelliteImg, fuelImg, earthImg, moonImg, gameoverImg, restartImg;
var score = 0;
var meteorG, satelliteG, fuelG;

//Game States
var PLAY=1;
var END=0;
var gameState=1;
var colliderValue = 150;

function preload(){
    spaceImg = loadImage("space.png");
    rocketImg = loadAnimation("roc-1.png","roc-2.png");
    meteorImg = loadImage("meteor.png");
    satelliteImg = loadImage("satellite.png");
    fuelImg = loadImage("fuel.png");
    earthImg = loadImage("earth.png")
    moonImg = loadImage("moon.png")
    gameoverImg = loadImage("Game Over.png")
    restartImg = loadImage("restart.png")
}

function setup() {
    createCanvas(400,600);
    
    // Moving background
    space=createSprite(200,200);
    space.addImage(spaceImg);
    space.velocityY = 4;

    earth = createSprite(300,500,20,20);
    earth.addImage(earthImg)
    earth.scale=0.012;

    moon = createSprite(100,100,20,20);
    moon.addImage(moonImg)
    moon.scale=0.2;

    rocket = createSprite(70,580,20,50);
    rocket.addAnimation("RocketFlying",rocketImg);
    rocket.scale=0.1;
    rocket.setCollider("rectangle",0,0,rocket.width-200,rocket.height-0);
    rocket.debug = false;

    gameover = createSprite(200, 300, 20, 20);
    gameover.addImage(gameoverImg);
    gameover.scale = 0.5;

    restart = createSprite(270,325,20,20);
    restart.addImage(restartImg);
    restart.scale = 0.5;

    meteorG=new Group();
    satelliteG=new Group();
    fuelG=new Group();
}

function draw() {
    if(gameState===PLAY){
        background(0);
        rocket.x = World.mouseX;
        gameover.visible = false;
        restart.visible = false;
        rocket.visible = true
        moon.visible = true
        earth.visible = true
        
        edges= createEdgeSprites();
        rocket.collide(edges);
        
        //code to reset the background
        if(space.y > 600 ){
            space.y = height/2;
        }

        //if (World.frameCount % Math.round(random(50, 350)) == 0)
        createMeteor();
        createFuel();
        createSatellite();
      
        if (meteorG.isTouching(rocket)) {
            meteorG.destroyEach();
            gameState = END;
        
        } else if(satelliteG.isTouching(rocket)) {
            satelliteG.destroyEach();
            gameState = END;
    
        } else {
            if(fuelG.isTouching(rocket))  {
                score = score+1;
                fuelG.destroyEach();
            }
        }

    } else if(gameState===END) {
        space.velocityY = 0;
        meteorG.destroyEach();
        satelliteG.destroyEach();
        fuelG.destroyEach();
        rocket.visible = false
        moon.visible = false
        earth.visible = false
        gameover.visible = true;
        restart.visible = true;

        if(mousePressedOver(restart)) {
            reset();
        }

    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Score: "+ score,150,30);
}

function reset(){
    score = 0;
    gameover.visible = false;
    restart.visible = false;
    //cloudsGroup.destroyEach()
    //obstaclesGroup.destroyEach()
    gameState = PLAY
    setup()

}

function createMeteor() {
    //console.log("meteor: " + Math.round(random(50, 350)))
    if (World.frameCount % 200 == 0) {
        var meteor = createSprite(Math.round(random(50, 350),40, 0, 0));
        meteor.addImage(meteorImg);
        meteor.scale=0.12;
        meteor.velocityY = 3;
        meteor.lifetime = 250;
        meteor.setCollider("circle",-10,200,meteor.width-750);
        meteor.debug = false;
        meteorG.add(meteor);
    }
  }

  function createSatellite() {
    //console.log("satellite: " + Math.round(random(50, 350)))
    if (World.frameCount % 300 == 0) {
        var satellite = createSprite(Math.round(random(50, 350),40, 0, 0));
        satellite.addImage(satelliteImg);
        satellite.scale=0.12;
        satellite.velocityY = 3;
        satellite.lifetime = 250;
        satellite.setCollider("rectangle",0,0,satellite.width-colliderValue,satellite.height-colliderValue);
        satellite.debug = false;
        satelliteG.add(satellite);
    }
  }

  function createFuel() {
    //console.log("fuel: " + Math.round(random(50, 350)))
    if (World.frameCount % 150 == 0) {
        var fuel = createSprite(Math.round(random(50, 350),40, 20, 20));
        fuel.addImage(fuelImg);
        fuel.scale=0.12;
        fuel.velocityY = 3;
        fuel.lifetime = 250;
        fuel.setCollider("rectangle",0,0,fuel.width-175,fuel.height-175);
        fuel.debug = false;
        fuelG.add(fuel);
    }  
  }

