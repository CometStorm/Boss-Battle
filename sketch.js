var player, playerImg;
var ground, groundImg;

var platform1, plat1Img;
var platform2, plat2Img;

var boss, bossImg;
var bossHealth;
var aim, aimImg;
var invisAim;

var laser, lasersGroup, laserImg;

var diff;

var gamestate = 'diff';

function preload(){
  
  
  
  
  
  
}

function setup() {
  createCanvas(600, 400);

  player = createSprite(200, 200,20,40);
  player.shapeColor = 'blue';
  ground = createSprite(300, 370, 800, 100);
  ground.shapeColor = 'green';
  
  platform1 = createSprite(100, 270, 150, 20);
  platform1.shapeColor = 'lightgreen';
  platform2 = createSprite(500, 270, 150, 20);
  platform2.shapeColor = 'lightgreen';
  
  boss = createSprite(300, 50, 80, 80);
  boss.shapeColor = 'purple';
  bossHealth = 10;
  aim = createSprite(300, 200, 40, 40);
  aim.shapeColor = 'orange';
  invisAim = createSprite(300, 200, 10, 10);
  
  lasersGroup = new Group();
}

function draw() {
  background('lightblue');
  createEdgeSprites();
  
  invisAim.visible = false;
  
  player.collide(ground);
  player.collide(platform1);
  player.collide(platform2);
  player.y = player.y + 5 ;
  
  if(gamestate == 'diff') {
    aim.visible = false;
    text('Press a number from 1 - 4 to choose a difficulty', 150, 200)
    text('1 is impossible to lose and 4 is a right challenge', 160, 220)
    text('Use your orange aimer to click on and defeat the boss', 140, 240)
    
    if(keyDown('1') && gamestate == 'diff') {
      diff = 60;
      bossHealth = 10;
      gamestate = 'play';
    }
    if(keyDown('2') && gamestate == 'diff') {
      diff = 40;
      bossHealth = 20
      gamestate = 'play';
    }
    if(keyDown('3') && gamestate == 'diff') {
      diff = 30;
      bossHealth = 50;
      gamestate = 'play';
    }
    if(keyDown('4') && gamestate == 'diff') {
      diff = 15;
      bossHealth = 100;
      gamestate = 'play';
    }
  }
  
  if(gamestate == 'play') {
    spawnLasers();
    aim.visible = true;
    text("HP: " + bossHealth, 300, 150)
    if(keyDown("d") || keyDown("right")) {
      player.velocityX = 10;
    }
    if(keyWentUp("d") || keyWentUp("right")) {
      player.velocityX = 0;
    }
  
    if(keyDown("a") || keyDown("left")) {
      player.velocityX = -10;
    }
    if(keyWentUp("a") || keyWentUp("left")) {
      player.velocityX = 0;
    }
  
    if(keyDown("space") && player.isTouching(ground) || player.isTouching(platform1) || player.isTouching(platform2)) {
      player.velocityY = -17;
    }
    
    aim.x = mouseX;
    aim.y = mouseY;
    
    if(mouseWentDown(LEFT) && invisAim.isTouching(boss)) {
      bossHealth = bossHealth - 1;
    }
  }
  
    if(gamestate == 'endWin') {
    text('You have defeated the BOSS, well done!', 200, 200)
    text('if you want to play again press: R', 200, 220)
    player.velocityX = 0;
    lasersGroup.setVelocityYEach(0);
  }
  
    if(gamestate == 'endLose') {
    text('You ded, press R to try again', 220, 200)
    player.velocityX = 0;
    lasersGroup.setVelocityYEach(0);
  }
  
    if(keyDown('r') && gamestate == 'endLose') {
    reset();
  }
    if(keyDown('r') && gamestate == 'endWin') {
    reset();
  }
  
    invisAim.x = aim.x;
    invisAim.y = aim.y;
  
    if(player.x > 610) {
    player.x = -10;
  }
    if(player.x < -11) {
    player.x = 609
  }
  
    if(player.isTouching(lasersGroup) && gamestate == 'play') {
    gamestate = 'endLose'
  }
  
    if(bossHealth == 0) {
    gamestate = 'endWin';
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  //console.log(player.x);
  //console.log(player.y);
  
  drawSprites();
}

function reset() {
  bossHealth = 10;
  player.x = 200;
  player.y = 305;
  gamestate = 'diff';
}

function spawnLasers() {
  if(frameCount % diff === 0) {
    laser = createSprite(300, -50, 10, 50);
    laser.x = Math.round(random(player.x + 50, player.x - 50));
    laser.velocityY = 10;
    laser.lifetime = 50;
    laser.shapeColor = 'red';
    
    lasersGroup.add(laser);
  }
}