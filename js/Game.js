var TankGame = TankGame || {};
TankGame.Game = function(){};
//Game variables

var base1;
var base2;
var biome;

var defaultMoney = 50;
var money1 = defaultMoney, money2 = defaultMoney;

var gameIsOver = false;

var selectionSquare1, selectionSquare2;
var selPos1=0, selPos2=0;

var selectedEntity1=0, selectedEntity2=0;

var cards1 = [];
var cards2 = [];

var map = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var altMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var mineMap = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];

var packMap = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];
var packs = [];
var packCount = 0;

var mines = [];
var mineCount = 0;
var minePower = 25;

var planePower = 35;
var planeInterval = [700, 900];

var spritesBase1 = [];
var spritesBase2 = [];
var otherBg = [];

var entitySpeeds = [0, 0.8, 1.4, 2.2, 0.6, 0.4, 0.7, 1.6, 1.2];

var shootInterval = [
  [0,0],
  [1000,2500],//Karavīrs
  [2000,4250],//Pikaps
  [150,750],//Nindzja
  [0,0],//Mīnkaķis, tukšs
  [1000, 2500],//Snaiperis
  [2000,4500],//Tanks
  [1500,3500],//Lidmašīna
  [2000,3500],//Tanks
];

var coords = [ //virzieni (relatiivas koordinaatas), lai notiektu, kur shaut  ----  KAARTOT PEEC SVARIIGUMA (1. - vissvariigaakais)
  [ 1, 0],
  [ 0, 1],
  [ 0,-1],
  [-1, 0],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 1, 1],
];

var coords_vehicle = [ //virzieni (relatiivas koordinaatas), lai notiektu, kur shaut  ----  KAARTOT PEEC SVARIIGUMA (1. - vissvariigaakais)
  [ 1, 0],
  [ 0, 1],
  [ 0,-1],
  [-1, 0],
  [-1, 1],
  [ 1,-1],
  [-1,-1],
  [ 1, 1],
  [ 2, 0],
  [-2, 0],
  [ 0,-2],
  [ 0, 2]
];

var coords_sniper = [
  [1, 0],// Uz priekšu
  [1,-1],// Uz augšu slīpi
  [1, 1],// Uz leju slīpi
  [0,-1],// Uz augšu                          apkaart sev
  [0, 1],// Uz leju
  [-1,-1],// Uz augšu slīpi atpakaļ
  [-1, 1],// Uz leju slīpi atpakaļ
  [-1,0],// Uz atpakaļu

  [ 2,-1],//atziimeeti kartee ar plusiem
  [ 2, 1], //atziimeeti kartee ar plusiem     tuvojas sev
  [2, 0],// Uz priekšu
  [3, 0],// Uz priekšu
  
  [-3, 3],// Uz leju slīpi atpakaļ
  [-3,-3],// Uz augšu slīpi atpakaļ
  [-3,0],// Uz atpakaļu

  [-2,-2],// Uz augšu slīpi atpakaļ
  [-2, 2],// Uz leju slīpi atpakaļ
  [-2,-1],//atziimeeti kartee ar plusiem
  [-2, 1],//atziimeeti kartee ar plusiem
  [-2,0],// Uz atpakaļu

  [-1,-2],//atziimeeti kartee ar plusiem
  [-1, 2],//atziimeeti kartee ar plusiem

  [0, 2],// Uz leju
  [0,-2],// Uz augšu
  [0, 3],// Uz leju
  [0,-3],// Uz augšu

  [ 1,-2],// atziimeeti kartee ar plusiem
  [ 1, 2],//atziimeeti kartee ar plusiem

  [2,-2],// Uz augšu slīpi
  [2, 2],// Uz leju slīpi

  [3,-3],// Uz augšu slīpi
  [3, 3]// Uz leju slīpi

];
//#..#..#
//.#+#+#.
//.+###+.
//###O###
//.+###+.
//.#+#+#.
//#..#..#

var shootPower=[0,1,3, 1,-1, 7, 13,  3, 15];

var cost =    [0,5,25,50,50,75,100,100,150];
var reward =  [0,6,27,52,52,75,100,100,150];

var lives =   [0,4,10, 6, 4, 4, 50, 27, 60];

var packInterval = [5000,10000];
var basePackVal = 10;
var coinPackVal = 25;


var temp_explosion = [];

var dirSelection1 = false;
var dirSelection2 = false;

var dirSelectionEntity1;
var dirSelectionEntity2;

var moneyText1;
var moneyText2;

var style;
var style2 = {font: "30px Arial", fill: "#ffffff"};

var entities = [];
var entityCount = 0;
var entityIsAlive = [];
var volumeDefault=0.2;
var placeVolume=0.2;

var topt = localStorage.getItem("Options");

if(topt!=null){
if( JSON.parse(localStorage.getItem("options")).sounds == null ){
  var volumeDefault = 0.2;
  var placeVolume = 0.2;
}

if(JSON.parse(localStorage.getItem("options")).sounds){
  var volumeDefault = 0.2;
  var placeVolume = 0.2;
}else{
  var volumeDefault = 0.0;
  var placeVolume = 0.0;
}
}

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

var backgroundGroup;
var mineGroup;
var entityGroup;
var bulletGroup;
var explosionGroup;
var flyGroup;

TankGame.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
  },
  create: function() {

      backgroundGroup = this.add.group();
      mineGroup = this.add.group();
      entityGroup = this.add.group();
      bulletGroup = this.add.group();
      explosionGroup = this.add.group();
      flyGroup = this.add.group();


      biome = rnd(1,3);

      this.loadSounds();

      for(var i = 0; i<10;i++){
        for(var j = 0; j<15; j++){
          if(biome==1){
            this.game.stage.backgroundColor = '#ADB730';
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'grass_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
            style= {font: "24px Arial", fill: "#fff"}
          }else if(biome==2){
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else{
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'snow_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
            this.game.stage.backgroundColor = '#EBEBEB';

            style= {font: "24px Arial", fill: "#000"}
          }else{
            if(j==0){
              spritesBase1[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( spritesBase1[i] );
            }else if(j==14){
              spritesBase2[i] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( spritesBase2[i] );
            }else {
              otherBg[i*15+j] = this.add.sprite( gameFieldX + 61*j, gameFieldY + 61*i,'sand_tex');
              backgroundGroup.add( otherBg[i*15+j] );
            }
            this.game.stage.backgroundColor = '#E6D29B';
            style= {font: "24px Arial", fill: "#000"}
          }
        }
      }

      if(biome==2 && JSON.parse(localStorage.getItem("options")).particles){
        back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
        back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        back_emitter.maxParticleScale = 0.6;
        back_emitter.minParticleScale = 0.2;
        back_emitter.setYSpeed(20, 100);
        back_emitter.gravity = 0;
        back_emitter.width = this.game.world.width * 1.5;
        back_emitter.minRotation = 0;
        back_emitter.maxRotation = 40;

        mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
        mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
        mid_emitter.maxParticleScale = 1.0;
        mid_emitter.minParticleScale = 0.7;
        mid_emitter.setYSpeed(50, 150);
        mid_emitter.gravity = 0;
        mid_emitter.width = this.game.world.width * 1.5;
        mid_emitter.minRotation = 0;
        mid_emitter.maxRotation = 40;

        front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
        front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
        front_emitter.maxParticleScale = 0.6;
        front_emitter.minParticleScale = 0.2;
        front_emitter.setYSpeed(100, 200);
        front_emitter.gravity = 0;
        front_emitter.width = this.game.world.width * 1.5;
        front_emitter.minRotation = 0;
        front_emitter.maxRotation = 40;

        back_emitter.start(false, 14000, 20);
        mid_emitter.start(false, 12000, 40);
        front_emitter.start(false, 6000, 1000);
      }

      var border = this.add.sprite(gameFieldX-5,gameFieldY-5, 'border');
      border.width=915+10;
      border.height=609+10;

      base1 = this.add.sprite(gameFieldX, gameFieldY, 'base');
      base1.health = 100;
      base1.scale.setTo(0.5);

      base2 = this.add.sprite(15+gameFieldX+15*60, gameFieldY, 'base');
      base2.scale.setTo(-0.5,0.5);
      base2.health = 100;

      backgroundGroup.add(base1);
      backgroundGroup.add(base2);

      var coinP1 = this.add.sprite(5,8,'coin');
      coinP1.width = 20;
      coinP1.height = 20;
      moneyText1 = this.game.add.text(30,7,money1,style);

      var heartP1 = this.add.sprite(5,32,'heart');
      heartP1.width = 20;
      heartP1.height = 20;
      healthText1 = this.game.add.text(30,30,base1.health,style);

      var coinP2 = this.add.sprite(gameFieldX+(15*61)+10 ,8,'coin');
      coinP2.width = 20;
      coinP2.height = 20;
      moneyText2 = this.game.add.text(gameFieldX+(15*61)+35,7,money2,style);

      var heartP2 = this.add.sprite(gameFieldX+(15*61)+10,32,'heart');
      heartP2.width = 20;
      heartP2.height = 20;
      healthText2 = this.game.add.text(gameFieldX+(15*61)+35,30,base2.health,style);

      //Show names
      var names = localStorage.getItem('player_names');
      names = JSON.parse(names);
      var name1 = this.game.add.text(10,window.innerHeight-35,names.name1,style);
      var name2 = this.game.add.text(gameFieldX+61*15+15,window.innerHeight-35,names.name2,style);

      if(this.game.scale.isFullScreen){
        name1.y -= 110;
        name2.y -= 110;
      }
      
      var plFlag1 = this.game.add.sprite(name1.x,name1.y-110,'flag_' + flag1);
      var plFlag2 = this.game.add.sprite(name2.x,name2.y-110,'flag_' + flag2);

      cards1[1] = this.game.add.sprite(10,55,'card1');
      cards2[1] = this.game.add.sprite(gameFieldX+(15*61)+12 ,55,'card1');

      cards1[2] = this.game.add.sprite(80,55,'card2');
      cards2[2] = this.game.add.sprite(gameFieldX+(15*61)+84 ,55,'card2');

      cards1[3] = this.game.add.sprite(10,140,'card3');
      cards2[3] = this.game.add.sprite(gameFieldX+(15*61)+12 ,140,'card3');

      cards1[4] = this.game.add.sprite(80,140,'card4');
      cards2[4] = this.game.add.sprite(gameFieldX+(15*61)+84 ,140,'card4');

      cards1[5] = this.game.add.sprite(10,225,'card5');
      cards2[5] = this.game.add.sprite(gameFieldX+(15*61)+12 ,225,'card5');

      cards1[6] = this.game.add.sprite(80,225,'card6');
      cards2[6] = this.game.add.sprite(gameFieldX+(15*61)+84 ,225,'card6');

      cards1[7] = this.game.add.sprite(10,310,'card7');
      cards2[7] = this.game.add.sprite(gameFieldX+(15*61)+12 ,310,'card7');

      cards1[8] = this.game.add.sprite(80,310,'card8');
      cards2[8] = this.game.add.sprite(gameFieldX+(15*61)+84 ,310,'card8');

    selectionSquare1 = this.game.add.sprite((gameFieldX+61),gameFieldY, 'grass_tex_selected');
    selectionSquare2 = this.game.add.sprite((gameFieldX+61*13),gameFieldY, 'grass_tex_selected');

    backgroundGroup.add(selectionSquare1);
    backgroundGroup.add(selectionSquare2);
    
    //Izsauc funkciju kas saliek visus taustiņus
    this.setKeys();

    this.putPack(true);
  },


  update: function() {

    if(!gameIsOver){
//------------------------------------------------Saliek kartē -1 ---------------------
      for(var i = 0; i<10; i++){
        for(var j = 0; j<15; j++){
          map[i][j] = -1;
          altMap[i][j] = -1;
        }
      }
      for(var i = 0; i<entityCount; i++){
        if(entityIsAlive[i]){
          if(map[ Math.floor((entities[i].position.y-gameFieldY)/61) ][ Math.floor((entities[i].position.x-gameFieldX)/61) ] == -1) 
            map[ Math.floor((entities[i].position.y-gameFieldY)/61) ][ Math.floor((entities[i].position.x-gameFieldX)/61) ] = i;
          else 
            altMap[ Math.floor((entities[i].position.y-gameFieldY)/61) ][ Math.floor((entities[i].position.x-gameFieldX)/61) ] = i;
        }
      }

      //Iet cauri visiem entitijiem.........................................................................................................
      for(var i = 0; i<entityCount; i++){
        if(!entityIsAlive[i]) continue;


        var entPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[i].position.y-gameFieldY)/61);

        //iekaapis pakaa
        if( packMap[entPosY][entPosX] != -1 ){
          this.pickPack(i,entPosY,entPosX);
        }


        //iekaapis miinaa
        if( entities[i].kind!=7 && mineMap[entPosY][entPosX]!=-1 && mines[ mineMap[entPosY][entPosX] ].team != entities[i].team ){

          

          entities[i].health-=minePower;
          if(entities[i].health<=0){
            this.killEntity(i);
          }

          sound_explosion.play();
          
          var krak = rnd(0,100000);
          
          temp_explosion[krak] = this.game.add.sprite(mines[ mineMap[entPosY][entPosX] ].position.x,mines[ mineMap[entPosY][entPosX] ].position.y,'explosion');
          explosionGroup.add(temp_explosion[krak]);
          temp_explosion[krak].anchor.setTo(0.5);
          var explode = temp_explosion[krak].animations.add('explode');
          temp_explosion[krak].animations.play('explode',14,false);
          temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
            temp_explosion[krak].animations.stop(null, true);  
            temp_explosion[krak].destroy();
          }, this);
          
          mines[ mineMap[entPosY][entPosX] ].destroy();

          mineMap[entPosY][entPosX] = -1;

          continue;
        }

        //liek miinas
        if(entities[i].kind == 4){
          if( mineMap[entPosY][entPosX] == -1){
            mines[ mineCount ] = this.game.add.sprite( gameFieldX+entPosX*61+30, gameFieldY+entPosY*61+30, 'mine');
            mineGroup.add( mines[mineCount] );
            mines[ mineCount ].anchor.setTo(0.5);
            mines[ mineCount ].team = entities[i].team;
            mineMap[entPosY][entPosX] = mineCount;
            mineCount++;
          }
        }

        if(entities[i].targ == -2) continue;

        if(entities[i].team == 1){

          // console.log(entities[i].targ);

          if(entities[i].kind == 7){

            if( coordToCellX(entities[i].x+30)==14 ){
              entities[i].dirc = 11;
              entities[i].scale.setTo(-1,1);
            }
            if( coordToCellX(entities[i].x-30)==0 ){
              entities[i].dirc = 0;
              entities[i].scale.setTo(1,1);
            }

            if( entities[i].dirc==0 ){
              entities[i].x += entitySpeeds[ entities[i].kind ]; 
            } else {
              entities[i].x -= entitySpeeds[ entities[i].kind ];
            }
          }

          if(entities[i].kind != 4 && entities[i].kind != 7){

            if( entities[i].targ > -1 && entities[i].kind != 3){
              entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
            } 

            if(entPosX == 13 && entities[i].targ != -2){ // Shauj pa baazi
              entities[i].targ = -2;
              this.fireBase(i, entPosY,entities[i].team);
              continue;
            }

            if( entities[i].targ!=-1 && !entityIsAlive[ entities[i].targ ] ){
              this.stopShooting(i);
            }

            if(entities[i].targ == -1){
              var atrasts = false;

              //šaušana

              if(entities[i].kind==5){
                for(var j = 0; j<32; j++){
                  var cordNewX = entPosX + coords_sniper[j][0];
                  var cordNewY = entPosY + coords_sniper[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[ map[cordNewY][cordNewX] ]  && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              }else if(entities[i].kind==2 || entities[i].kind==6 || entities[i].kind==8){
                for(var j = 0; j<12; j++){
                  var cordNewX = entPosX + coords_vehicle[j][0];
                  var cordNewY = entPosY + coords_vehicle[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[map[cordNewY][cordNewX]]  && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              } else {
                for(var j = 0; j<8; j++){
                  var cordNewX = entPosX + coords[j][0];
                  var cordNewY = entPosY + coords[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[ map[cordNewY][cordNewX] ] && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              }

              if(atrasts) {
                if( entities[i].kind==1 ){
                  entities[i].loadTexture('gunman_shoot');
                }
                if( entities[i].kind==5 ){
                  entities[i].loadTexture('sniper_shoot');
                }
                if( entities[i].kind != 3 ){
                  entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
                }
                this.fire(i, entities[i].targ, true);

              }
            }
          }

          if( entities[i].targ == -1 && entities[i].mainDir != -1 && entities[i].kind != 7){ // Domaa kur ies.............................................................................

            if(entities[i].mainDir == 0 || entities[i].kind != 4){ // Ja iet taisni.........
              //console.log(entPosY + " " + coordToCellX( entities[i].position.x + 30 ) );
              if( map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==i){
                if(entities[i].dirc!=1){
                  entities[i].dirc = 1;
                }
                entities[i].position.x += entitySpeeds[ entities[i].kind ];
              } else {
                if(entities[i].dirc == 0 ){
                  if(entPosY!=0 && (map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == i ) ){
                    entities[i].position.y -= entitySpeeds[ entities[i].kind ];
                  } else if( entPosY!=9 && ( map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == i ) ){
                    dirc = 2;
                  }
                } else          
                if(entities[i].dirc == 2 ){
                  if(entPosY!=9 && ( map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == i ) ){
                    entities[i].position.y += entitySpeeds[ entities[i].kind ];
                  } else if( entPosY!=0 && ( map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == i ) ){
                    dirc = 0;
                  }
                }

                if(entities[i].dirc = 1){
                  var downBest = -1;
                  for(var j = entPosY+1; j<10; j++){
                    if( map[j][entPosX]!=-1 && entityIsAlive[j][entPosX] && entities[ map[j][entPosX] ].team==entities[i].team ) break;
                    if( map[j][entPosX+1] == -1 || ( map[j][entPosX+1] != -1 && entityIsAlive[map[j][entPosX+1]] && entities[map[j][entPosX+1]].team != entities[i].team ) ){
                      downBest = j;
                      break;
                    }
                  }
                  var upBest = -1;
                  for(var j = entPosY-1; j>=0; j--){
                    if( map[j][entPosX]!=-1 && entityIsAlive[j][entPosX] && entities[ map[j][entPosX] ].team==entities[i].team ) break;
                    if( map[j][entPosX+1] == -1 || ( map[j][entPosX+1] != -1 && entityIsAlive[map[j][entPosX+1]] && entities[ map[j][entPosX+1] ].team != entities[i].team ) ){
                      upBest = j;
                      break;
                    }
                  }

                  if( downBest==-1 ) entities[i].dirc = 0;
                  if( upBest==-1 ) entities[i].dirc = 2;

                  if( downBest != -1 && upBest != -1){
                    if( Math.abs( entPosY-downBest ) < Math.abs( entPosY-upBest ) ){
                      entities[i].dirc = 2;
                    } else{
                      entities[i].dirc = 0;
                    }
                  }
                }
              }
              this.rotate(i);
            } else { // Ja iet čūskveidā.................

              if(entities[i].dirc != entities[i].currDir){
                if( coordToCellX( entities[i].position.x + 30 ) < 14 && ( map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ] == -1 || map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ] == i ) ){
                  entities[i].dirc = 1;
                }
              }

              if(entities[i].dirc == 0){

                if(  entPosY!=0 && ( map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX]==-1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX]==i ) ){
                  entities[i].position.y -= entitySpeeds[ entities[i].kind ];
                } else {
                  if( coordToCellX( entities[i].position.x + 30 ) < 14 && ( map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==i ) ){
                    entities[i].dirc = 1;
                  } else {
                    entities[i].dirc = 2;
                  }
                }
              }

              if(entities[i].dirc == 2){

                if( entPosY!=9 && ( map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX]==-1 || map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX]==i ) ){
                  entities[i].position.y += entitySpeeds[ entities[i].kind ];
                } else {
                  if( coordToCellX( entities[i].position.x + 30 )<14 && ( map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==i ) ){
                    entities[i].dirc = 1;
                  } else {
                    entities[i].dirc = 0;
                  }
                }
              }

              if(entities[i].dirc == 1){
                if( coordToCellX( entities[i].position.x + 30 ) < 14 && ( map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x + 30 ) ]==i ) ){
                  entities[i].position.x += entitySpeeds[ entities[i].kind ];
                }
              }

              var newPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
              if( entPosX != newPosX ) {

                if( entities[i].currDir==0 ){
                  entities[i].currDir = 2;
                  entities[i].dirc = 2;
                } else {
                  entities[i].currDir = 0;
                  entities[i].dirc = 0;
                }

              }

              this.rotate(i);

            }
          }

        }


        if(entities[i].team == 2){

          if(entities[i].kind == 7){

            if( coordToCellX(entities[i].x+30)==14 ){
              entities[i].dirc = 0;
              entities[i].scale.setTo(-1,1);
            }
            if( coordToCellX(entities[i].x-30)==0 ){
              entities[i].dirc = 11;
              entities[i].scale.setTo(1,1);
            }

            if( entities[i].dirc==0 ){
              entities[i].x -= entitySpeeds[ entities[i].kind ]; 
            } else {
              entities[i].x += entitySpeeds[ entities[i].kind ];
            }
          }

          if(entities[i].kind != 4 && entities[i].kind != 7){

            if( entities[i].targ > -1  && entities[i].kind != 3 && entityIsAlive[ entities[i].targ ] ){
              entities[i].rotation = this.game.physics.arcade.angleBetween(entities[ entities[i].targ ], entities[i]);
            }

            if(entPosX == 1 && entities[i].targ != -2){ // Shauj pa baazi
              entities[i].targ = -2;
              this.fireBase(i, entPosY,entities[i].team);
              continue;
            } else if( entities[i].kind == 7 ) {
              entities[i].x -= entitySpeeds[ entities[i].kind ];
            }

            if( entities[i].targ!=-1 && !entityIsAlive[ entities[i].targ ] ){
              this.stopShooting(i);
            }

          //šaušana
            if(entities[i].targ == -1){
              var atrasts = false;

              if(entities[i].kind==5){
                for(var j = 0; j<32; j++){
                  var cordNewX = entPosX + coords_sniper[j][0];
                  var cordNewY = entPosY + coords_sniper[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[map[cordNewY][cordNewX]]  && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              }else if(entities[i].kind==2 || entities[i].kind==6 || entities[i].kind==8){
                for(var j = 0; j<12; j++){
                  var cordNewX = entPosX + coords_vehicle[j][0];
                  var cordNewY = entPosY + coords_vehicle[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[map[cordNewY][cordNewX]]  && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              } else {
                for(var j = 0; j<8; j++){
                  var cordNewX = entPosX + coords[j][0];
                  var cordNewY = entPosY + coords[j][1];
                  if(cordNewY<0 || cordNewY>9 || cordNewX<0 || cordNewX>14) continue;

                  if( map[cordNewY][cordNewX]!=-1 && entityIsAlive[map[cordNewY][cordNewX]] && entities[ map[cordNewY][cordNewX] ].team  != entities[i].team){
                    entities[i].targ = map[cordNewY][cordNewX];
                    atrasts = true;
                    break;
                  }
                }
              }


              if(atrasts) {
                if( entities[i].kind==1 ){
                  entities[i].loadTexture('gunman_shoot_blue');
                }
                if( entities[i].kind==5 ){
                  entities[i].loadTexture('sniper_shoot_blue');
                }

                if(  entities[i].kind != 3 ){
                  entities[i].rotation = this.game.physics.arcade.angleBetween(entities[i], entities[ entities[i].targ ]);
                }
                this.fire(i, entities[i].targ,true);
              }

            }
          }

          if( entities[i].targ == -1 && entities[i].mainDir != -1 && entities[i].kind !=7){
            
            if( entities[i].mainDir == 0 || entities[i].kind != 4){
              if( coordToCellX( entities[i].position.x - 30 ) >0 && ( map[entPosY][ coordToCellX( entities[i].position.x - 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x - 30 ) ]==i) ){
                if(entities[i].dirc != 1){
                  entities[i].dirc = 1;
                }
                entities[i].position.x -= entitySpeeds[ entities[i].kind ];
              } else {
                
                if(entities[i].dirc == 2 ){
                  if(entPosY!=9 && ( map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == i)){
                    entities[i].position.y += entitySpeeds[ entities[i].kind ];
                  } else if( entPosY!=0 && ( map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == i )){
                    dirc = 0;
                  }
                } else

                if(entities[i].dirc == 0 ){
                  if(entPosY!=0 && ( map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX] == i)){
                    entities[i].position.y -= entitySpeeds[ entities[i].kind ];
                  } else if( entPosY!=9 && ( map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == -1 || map[ coordToCellY( entities[i].position.y + 30 ) ][entPosX] == i)){
                    dirc = 2;
                  }
                }          
                

                if(entities[i].dirc = 1){
                  var downBest = -1;
                  for(var j = entPosY+1; j<10; j++){
                    if( map[j][entPosX]!=-1 && entityIsAlive[j][entPosX] && entities[ map[j][entPosX] ].team==entities[i].team ) break;
                    if( map[j][entPosX-1] == -1 || ( map[j][entPosX-1] != -1 && entityIsAlive[map[j][entPosX-1]] && entities[ map[j][entPosX-1] ].team != entities[i].team ) ){
                      downBest = j;
                      break;
                    }
                  }
                  var upBest = -1;
                  for(var j = entPosY-1; j>=0; j--){
                    if( map[j][entPosX]!=-1 && entityIsAlive[j][entPosX] && entities[ map[j][entPosX] ].team==entities[i].team ) break;
                    if( map[j][entPosX-1] == -1 || ( map[j][entPosX-1] != -1 && entityIsAlive[map[j][entPosX-1]] && entities[ map[j][entPosX-1] ].team != entities[i].team ) ){
                      upBest = j;
                      break;
                    }
                  }

                  if( upBest==-1 ) entities[i].dirc = 2;
                  if( downBest==-1 ) entities[i].dirc = 0;
                  

                  if( downBest != -1 && upBest != -1){
                    if( Math.abs( entPosY-downBest ) > Math.abs( entPosY-upBest ) ){
                      entities[i].dirc = 0;
                    } else{
                      entities[i].dirc = 2;
                    }
                  }
                  

                }
              }
              this.rotate(i);
            } else { // Ja iet čūskveidā.................

              if(entities[i].dirc != entities[i].currDir){
                if( coordToCellX( entities[i].position.x - 30 )>0 && ( map[entPosY][coordToCellX( entities[i].position.x - 30 )] == -1 || map[entPosY][coordToCellX( entities[i].position.x - 30 )] == i) ){
                  entities[i].dirc = 1;
                }
              }

              if(entities[i].dirc == 2){

                if( entPosY!=9 && ( map[coordToCellY( entities[i].position.y + 30 )][entPosX]==-1 || map[coordToCellY( entities[i].position.y + 30 )][entPosX]==i) ){
                  entities[i].position.y += entitySpeeds[ entities[i].kind ];
                } else {
                  if( coordToCellX( entities[i].position.x - 30 )>0 && (map[entPosY][coordToCellX( entities[i].position.x - 30 )]==-1 || map[entPosY][coordToCellX( entities[i].position.x - 30 )]==i) ){
                    entities[i].dirc = 1;
                  } else {
                    entities[i].dirc = 0;
                  }
                }
              }

              if(entities[i].dirc == 0){

                if(  entPosY!=0 && ( map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX]==-1 || map[ coordToCellY( entities[i].position.y - 30 ) ][entPosX]==i) ){
                  entities[i].position.y -= entitySpeeds[ entities[i].kind ];
                } else {
                  if( coordToCellX( entities[i].position.x - 30) > 0 && (map[entPosY][coordToCellX( entities[i].position.x - 30 )]==-1 || map[entPosY][coordToCellX( entities[i].position.x - 30 )]==i) ){
                    entities[i].dirc = 1;
                  } else {
                    entities[i].dirc = 2;
                  }
                }
              }

              if(entities[i].dirc == 1){
                if( entPosX!=0 && (map[entPosY][ coordToCellX( entities[i].position.x - 30 ) ]==-1 || map[entPosY][ coordToCellX( entities[i].position.x - 30 ) ]==i) ){
                  entities[i].position.x -= entitySpeeds[ entities[i].kind ];
                }
              }

              var newPosX = Math.floor((entities[i].position.x-gameFieldX)/61);
              if( entPosX != newPosX ) {

                if( entities[i].currDir==0 ){
                  entities[i].currDir = 2;
                  entities[i].dirc = 2;
                } else {
                  entities[i].currDir = 0;
                  entities[i].dirc = 0;
                }

              }

              this.rotate(i);
            }
          }
        }
      }

    }
    

    /*var cons = "";
    for(var i = 0; i<10; i++){
      for(var j = 0; j<15; j++){
        cons = cons + map[i][j] + " ";
      }
      cons = cons + "\n";
    }
    console.log(cons);*/

    
  },

  render: function(){
   //this.game.debug.text(this.game.time.fps, 100, 500, "#000");
  },

  buy: function(player){
    if(!gameIsOver){
      if(player==1){

        if(selectedEntity1!=7 && map[selPos1][1] != -1 && entities[ map[selPos1][1] ].team==player ) return;

        if(selectedEntity1==7 && map[selPos1][1] != -1 && entities[ map[selPos1][1] ].team==player && entities[ map[selPos1][1] ].kind==7) return;
        if(selectedEntity1==7 && altMap[selPos1][1] != -1 && entities[ altMap[selPos1][1] ].team==player && entities[ altMap[selPos1][1] ].kind==7) return;

        money1 -= cost[selectedEntity1];
        this.refreshMoney();

        if(selectedEntity1==1){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'gunman_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'pickup_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'ninja_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',12,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity1==4){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'minecat');
          var minewalk = entities[entityCount].animations.add('minewalk');
          entities[entityCount].animations.play('minewalk',7,true);
          entities[entityCount].anchor.setTo(0.5);

          dirSelection1 = true;
          dirSelectionEntity1 = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'dir_choise');
          dirSelectionEntity1.anchor.setTo(0.25,0.5);

          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity1==5){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'sniper_walk');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',3,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity1==6){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        
        }
        if(selectedEntity1==7){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'plane_tex');
          entities[entityCount].anchor.setTo(0.5);
          flyGroup.add( entities[entityCount] );
          entityIsAlive[entityCount] = true;
          this.firePlane(entityCount,true);
        }
        if(selectedEntity1==8){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61+30,gameFieldY+(61*selPos1)+30,'tank2_tex');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        
        }

        

        entities[entityCount].kind = selectedEntity1;
        entities[entityCount].health = lives[selectedEntity1];
        entities[entityCount].team = 1;
        selectedEntity1 = entityCount;

      }
      if(player==2){

        if(selectedEntity2!=7 && map[selPos2][13] != -1 && entities[ map[selPos2][13] ].team==player ) return;

        if(selectedEntity2==7 && map[selPos2][13] != -1 && entities[ map[selPos2][13] ].team==player && entities[ map[selPos2][13] ].kind==7) return;
        if(selectedEntity2==7 && altMap[selPos2][13] != -1 && entities[ altMap[selPos2][13] ].team==player && entities[ altMap[selPos2][13] ].kind==7) return;

        money2 -= cost[selectedEntity2];
        this.refreshMoney();
        
        if(selectedEntity2==1){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'gunman_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].animations.play('walk',7,true);
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==2){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'pickup_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',5,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==3){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'ninja_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',12,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }

        if(selectedEntity2==4){

          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'minecat_blue');
          var minewalk = entities[entityCount].animations.add('minewalk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('minewalk',7,true);
          entities[entityCount].anchor.setTo(0.5);

          dirSelection2 = true;
          dirSelectionEntity2 = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'dir_choise');
          dirSelectionEntity2.anchor.setTo(0.25,0.5);
          dirSelectionEntity2.scale.setTo(-1,1);

          entityGroup.add( entities[entityCount] );

        }

        if(selectedEntity2==5){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'sniper_walk_blue');
          var walk = entities[entityCount].animations.add('walk');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('walk',3,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==6){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }
        if(selectedEntity2==7){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'plane_tex_blue');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].anchor.setTo(0.5);
          flyGroup.add( entities[entityCount] );
          entityIsAlive[entityCount] = true;
          this.firePlane(entityCount,true);
        }
        if(selectedEntity2==8){
          entities[entityCount] = this.game.add.sprite(gameFieldX+61*13+30,gameFieldY+(61*selPos2)+30,'tank2_tex_blue');
          var ride = entities[entityCount].animations.add('ride');
          entities[entityCount].scale.setTo(-1,1);
          entities[entityCount].animations.play('ride',10,true);
          entities[entityCount].anchor.setTo(0.5);
          entityGroup.add( entities[entityCount] );
        }

        entities[entityCount].health = lives[selectedEntity2];
        entities[entityCount].team = 2;
        entities[entityCount].kind = selectedEntity2;
        selectedEntity2 = entityCount;

      }

      entities[entityCount].targ = -1;
      entities[entityCount].dirc = 1;
      entityIsAlive[entityCount] = true;
      
      if(entities[entityCount].kind == 4) 
        entities[entityCount].mainDir = -1;
      else
        entities[entityCount].mainDir = 0;

      

      entityCount++;

      sound_place.play();
    }
  },

  refreshMoney: function(){
    moneyText1.text = money1;
    moneyText2.text = money2;
  },

  hit: function(team,damage){
    if(team==2){
     // this.game.camera.flash("0xDB2C2C");
      base1.health-=damage;

      money2 += damage;
      this.refreshMoney();

      if(base1.health<=0){
        base1.health=0;
      }
      healthText1.text = base1.health;
    }else{
      //this.game.camera.flash("0x2C3ADB");
      base2.health-=damage;

      money1 += damage;
      this.refreshMoney();

      if(base2.health<=0){
        base2.health=0;
      }
      healthText2.text = base2.health;
    }
  },

  rotate: function(player){
      
      if( entityIsAlive[player] && entities[player].targ == -1 && (entities[player].kind == 2 || entities[player].kind == 5 || entities[player].kind == 6 || entities[player].kind == 8)){
        //console.log('fnk rotate');
        

        if( entities[player].dirc == 1 ){
          this.game.add.tween( entities[player] ).to( { angle: 0 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 0 ){
          if( entities[player].team == 1 )
            this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true);
          else
            this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true);
        }
        if( entities[player].dirc == 2 ){
          if( entities[player].team == 1 )
            this.game.add.tween( entities[player] ).to( { angle: 90 }, 500, "Linear", true); 
          else 
            this.game.add.tween( entities[player] ).to( { angle: -90 }, 500, "Linear", true); 
        }
      }
  },

  putPack: function(first){
    if(!gameIsOver){

      if(!first){
        var packY = rnd(0,9);
        var packX = rnd(3,11);

        while( map[packY][packX]!=-1 && packMap[packY][packX]!=-1){
          packY = rnd(0,9);
          packX = rnd(3,11);

        }

        var type = rnd(1,6);
        if(type==4) type = 3;
        if(type==5) type = 3;
        if(type==6) type = 1;

        packs[packCount] = this.game.add.sprite( gameFieldX + packX*61+30, gameFieldY + packY*61+30, 'pack'+type );
        backgroundGroup.add(packs[packCount]);
        packMap[packY][packX] = packCount;
        packs[packCount].anchor.setTo(0.5);
        packs[packCount].scale.setTo(0.6);
        packs[packCount].type = type;

        packCount++;

      }

      this.game.time.events.add( rnd( packInterval[0], packInterval[1] ) , function(){
        this.putPack(false);
      }, this);

    }
  },

  pickPack: function(player, packY, packX){

    if( packs[packMap[packY][packX]].type == 1 ){

      entities[player].health = lives[ entities[player].kind ];

    } else if(packs[packMap[packY][packX]].type == 2){

      if( entities[player].team == 1 ){
        base1.health += basePackVal;
        healthText1.text = base1.health;
      }
      if( entities[player].team == 2 ){
        base2.health += basePackVal;
        healthText2.text = base2.health;
      }

    } else if(packs[packMap[packY][packX]].type == 3){

      if( entities[player].team == 1 ){
        money1 += coinPackVal;
      }
      if( entities[player].team == 2 ){
        money2 += coinPackVal;
      }
      this.refreshMoney();

    }

    packs[packMap[packY][packX]].destroy();
    packMap[packY][packX] = -1;
  },

  fire: function(x, y, firstTime){
    if(!gameIsOver){

      if( !entityIsAlive[x] || !entityIsAlive[y]) return;

      if( Math.sqrt( Math.abs(entities[x].x-entities[y].x)*Math.abs(entities[x].x-entities[y].x) + Math.abs(entities[x].y-entities[y].y)*Math.abs(entities[x].y-entities[y].y) ) > 200){
        this.stopShooting( x );
        return;
      }

      if(!firstTime){

        var bullet2;
        var tviins2;

        var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
        bulletGroup.add(bullet);
        var tviins = this.game.add.tween( bullet ).to( {x: entities[y].position.x , y: entities[y].position.y}, 250, "Linear", true);
        

        if(entities[x].kind==2){
          bullet2 = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
          bulletGroup.add(bullet2);
          tviins2 = this.game.add.tween( bullet2 ).to( {x: entities[y].position.x , y: entities[y].position.y}, 350, "Linear", true);
        }

        if(entities[x].kind==1)sound_gunshot.play();
        if(entities[x].kind==2)sound_pickupshot.play();
        if(entities[x].kind==3)sound_ninjashot.play();
        if(entities[x].kind==5)sound_snipershot.play();
        if(entities[x].kind==6)sound_tankshot.play();
        if(entities[x].kind==8)sound_tankshot.play();
        //console.log(entities[x].kind);

        tviins.onComplete.add( function(){
          bullet.destroy();
          entities[y].health -= shootPower[ entities[x].kind ];

          if(entities[x].kind==2)bullet2.destroy();

          if( entities[y].health <=0 ){
          
            this.killEntity(y);

          }
        },this);
      }

      this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
        if(entityIsAlive[x] && entityIsAlive[y]){
          this.fire(x,y,false);
        }
      }, this);
    }
  },

  killEntity: function(x){

      if( entityIsAlive[x] ){

        entityIsAlive[x] = false;
        

        if(entities[x].team==2){
          money1+=reward[entities[x].kind];
          moneyText1.text=money1;
        }else{
          money2+=reward[entities[x].kind];
          moneyText2.text=money2;
        }

        if(entities[x].kind==6 || entities[x].kind==8 || entities[x].kind==2 || entities[x].kind==7){ //   SPRAADZIENS
          sound_explosion.play();
          
          var krak = rnd(0,100000);
          temp_explosion[krak] = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'explosion');
          explosionGroup.add(temp_explosion[krak]);
          temp_explosion[krak].anchor.setTo(0.5);
          var explode = temp_explosion[krak].animations.add('explode');
          temp_explosion[krak].animations.play('explode',14,false);
          temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
            temp_explosion[krak].animations.stop(null, true);  
            temp_explosion[krak].destroy();
          }, this);
        }else{
          var angel = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'angel');
          angel.anchor.setTo(0.5);
          var fly = angel.animations.add('fly');
          angel.animations.play('fly',12,true);

          var tween_angel = this.game.add.tween( angel ).to( {alpha: 0 , y: entities[x].position.y-100}, 500, "Linear", true);
        
          tween_angel.onComplete.add( function(){
            angel.destroy();
          },this);

        }

        entities[x].destroy();

      }

  },

  stopShooting: function(i){
    entities[i].targ = -1;
    entities[i].rotation = 0;
    if(entities[i].team == 1){
      if(entities[i].kind == 1){
        entities[i].loadTexture('gunman_walk', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',7,true);
        entities[i].animations.paused = false;
      }
      if(entities[i].kind == 5){
        entities[i].loadTexture('sniper_walk', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',3,true);
        entities[i].animations.paused = false;
      }
    } else {
      if(entities[i].kind == 1){
        entities[i].loadTexture('gunman_walk_blue', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',7,true);
        entities[i].animations.paused = false;
      }
      if(entities[i].kind == 5){
        entities[i].loadTexture('sniper_walk_blue', [0,1], false);
        entities[i].animations.add('walko');
        entities[i].animations.play('walko',3,true);
        entities[i].animations.paused = false;
      }
    }
  },

  fireBase: function(x,y,team){
    if(!gameIsOver){
      var bullet = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
      var bullet2;
      if(entities[x].kind==2 || entities[x].kind==7){
        bullet2 = this.game.add.sprite( entities[x].position.x, entities[x].position.y, 'bullet' );
        bulletGroup.add(bullet2);
      }
      bulletGroup.add(bullet);
      
      var tviins;
      var tviins2;
      if(team==1){
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase2[y].position.x +30, y: spritesBase2[y].position.y +30}, 250, "Linear", true);
        if(entities[x].kind==2 || entities[x].kind==7){
          tviins2 = this.game.add.tween( bullet2 ).to( {x: spritesBase2[y].position.x +30, y: spritesBase2[y].position.y +30}, 350, "Linear", true);
        }
      }
      else{
        tviins = this.game.add.tween( bullet ).to( {x: spritesBase1[y].position.x +30, y: spritesBase1[y].position.y +30}, 250, "Linear", true);
        if(entities[x].kind==2 || entities[x].kind==7){
          tviins2 = this.game.add.tween( bullet2 ).to( {x: spritesBase1[y].position.x +30, y: spritesBase1[y].position.y +30}, 350, "Linear", true);
        }
      }

      tviins.onComplete.add( function(){
        bullet.destroy();
        if(entities[x].kind==2) bullet2.destroy();
        this.hit(team, shootPower[ entities[x].kind ]);
        if(base2.health<=0){
          this.gameOver(team);
        }
        if(base1.health<=0){
          this.gameOver(team);
        }
      },this);


      if(entities[x].kind==1)sound_gunshot.play();
      if(entities[x].kind==2)sound_pickupshot.play();
      if(entities[x].kind==3)sound_ninjashot.play();
      if(entities[x].kind==5)sound_snipershot.play();
      if(entities[x].kind==6)sound_tankshot.play();
      if(entities[x].kind==8)sound_tankshot.play();

      if(team == 1){
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base2.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      } else {
        this.game.time.events.add( rnd( shootInterval[ entities[x].kind ][0],shootInterval[ entities[x].kind ][1] ), function(){
          if(entityIsAlive[x] && base1.health>0){
            this.fireBase(x,y,team);
          }
        }, this);
      }
    }
  },

  firePlane: function(x, firstTime){
    if(!gameIsOver && entityIsAlive[x]){

      if(!firstTime || true){ //nav gaidiishanas laika

        var entPosX = Math.floor((entities[x].position.x-gameFieldX)/61);
        var entPosY = Math.floor((entities[x].position.y-gameFieldY)/61);

        sound_explosion.play();

        var krak = rnd(0,100000);
        temp_explosion[krak] = this.game.add.sprite(entities[x].position.x,entities[x].position.y,'explosion');
        explosionGroup.add(temp_explosion[krak]);
        temp_explosion[krak].anchor.setTo(0.5);
        temp_explosion[krak].scale.setTo(0.6);
        var explode = temp_explosion[krak].animations.add('explode');
        temp_explosion[krak].animations.play('explode',14,false);
        temp_explosion[krak].animations.currentAnim.onComplete.add(function () {
          temp_explosion[krak].animations.stop(null, true);  
          temp_explosion[krak].destroy();
        }, this);

        if( map[entPosY][entPosX] != -1 && entityIsAlive[ map[entPosY][entPosX] ] && entities[ map[entPosY][entPosX] ].team != entities[x].team ){          
          entities[ map[entPosY][entPosX] ].health -= planePower;
          if(entities[ map[entPosY][entPosX] ].health<=0) 
            this.killEntity( map[entPosY][entPosX] );
        }

        if( altMap[entPosY][entPosX] != -1 && entityIsAlive[ altMap[entPosY][entPosX] ] && entities[ altMap[entPosY][entPosX] ].team != entities[x].team ){
          entities[ altMap[entPosY][entPosX] ].health -= planePower;
          if(entities[ altMap[entPosY][entPosX] ].health<=0) 
            this.killEntity( altMap[entPosY][entPosX] );
        }

      }

      this.game.time.events.add( rnd( planeInterval[0],planeInterval[1] ), function(){
        if(entityIsAlive[x]){
          this.firePlane(x,false);
        }
      }, this);
    }
  },

  gameOver: function(team){
    if(!gameIsOver){
      var panel = this.game.add.sprite(window.innerWidth/2,window.innerHeight/2,'panel');
      panel.anchor.setTo(0.5);

      var winnerFlag;
      var winner;
      if(team == 1){
        winnerFlag = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+45, "flag_"+flag1);
        winner = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+35, "gunman"+team);
        winner.scale.setTo(0.4);
        winner.anchor.setTo(0.5);
        winner.x = winner.x - 70;
        winnerFlag.x = winnerFlag.x + 10;
      } else {
        winnerFlag = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+45, "flag_"+flag2);
        winner = this.game.add.sprite(window.innerWidth/2+10,window.innerHeight/2+35, "gunman"+team);
        winner.scale.setTo(-0.4,0.4);
        winner.anchor.setTo(0.4,0.5);
        winner.x = winner.x + 70;
        winnerFlag.x = winnerFlag.x - 10;
      }

      var restartbtn = this.game.add.button(window.innerWidth/2-270, window.innerHeight/2+120, 'restartBtn', function(){
        this.prepareNewGame();
        this.state.start('Game');
      }, this);
      restartbtn.anchor.setTo(0.5);

      var menubtn = this.game.add.button(window.innerWidth/2+270, window.innerHeight/2+120, 'menuBtn', function(){
        this.prepareNewGame();
        this.state.start('Menu');
      }, this);
      menubtn.anchor.setTo(0.5);

      winnerFlag.anchor.setTo(0.5);
      if(team==1)
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name1,style2);
      else
        winnerText = this.game.add.text(window.innerWidth/2-120,panel.y+110,JSON.parse(localStorage.getItem("player_names")).name2,style2);

      winnerText.x = Math.floor(window.innerWidth/2) - Math.floor(winnerText.width/2);

      gameIsOver = true;
    }
  },

  loadSounds: function(){
    sound_gunshot = this.game.add.audio('gunshot');
    sound_gunshot.allowMultiple = true;
    sound_gunshot.volume = volumeDefault;

    sound_pickupshot = this.game.add.audio('pickupshot');
    sound_pickupshot.allowMultiple = true;
    sound_pickupshot.volume = volumeDefault;

    sound_tankshot = this.game.add.audio('tankshot');
    sound_tankshot.allowMultiple = true;
    sound_tankshot.volume = volumeDefault;

    sound_ninjashot = this.game.add.audio('ninjashot');
    sound_ninjashot.allowMultiple = true;
    sound_ninjashot.volume = volumeDefault;

    sound_snipershot = this.game.add.audio('snipershot');
    sound_snipershot.allowMultiple = true;
    sound_snipershot.volume = volumeDefault;

    sound_explosion = this.game.add.audio('tankexplosion');
    sound_explosion.allowMultiple = true;
    sound_explosion.volume = volumeDefault;

    sound_place = this.game.add.audio('place');
    sound_place.allowMultiple = true;
    sound_place.volume = placeVolume;


  if(JSON.parse(localStorage.getItem("options")).music){
    music.stop();
    window.music_playing=false;

    if(biome==1){
        music = this.game.add.audio('music_normal');
        music.play();
        music.volume = 0.5;
        window.music_playing=true;
      }else if(biome==2){
        music = this.game.add.audio('music_winter');
        music.play();
        music.volume = 0.5;
        window.music_playing=true;
      }else{
        music = this.game.add.audio('music_desert');
        music.play();
        music.volume = 0.3;
        window.music_playing=true;
      }
  }

},

  

  setKeys: function(){
    var oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    oneKey.onDown.add(function(){
      if(money1>=cost[1] && !dirSelection1){
        selectedEntity1=1;
        this.buy(1);
      }
    }, this);

    var twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    twoKey.onDown.add(function(){
      if(money1>=cost[2] && !dirSelection1){
        selectedEntity1=2;
        this.buy(1);
      }
    }, this);

    var threeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    threeKey.onDown.add(function(){
      if(money1>=cost[3] && !dirSelection1){
        selectedEntity1=3;
        this.buy(1);
      }
    }, this);

    var fourKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    fourKey.onDown.add(function(){
      if(money1>=cost[4] && !dirSelection1){
        selectedEntity1=4;
        this.buy(1);
      }
    }, this);

    var fiveKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    fiveKey.onDown.add(function(){
      if(money1>=cost[5] && !dirSelection1){
        selectedEntity1=5;
        this.buy(1);
      }
    }, this);

    var sixKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    sixKey.onDown.add(function(){
      if(money1>=cost[6] && !dirSelection1){
        selectedEntity1=6;
        this.buy(1);
      }
    }, this);

    var sevenKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    sevenKey.onDown.add(function(){
      if(money1>=cost[7] && !dirSelection1){
        selectedEntity1=7;
        this.buy(1);
      }
    }, this);

    var eightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    eightKey.onDown.add(function(){
      if(money1>=cost[8] && !dirSelection1){
        selectedEntity1=8;
        this.buy(1);
      }
    }, this);


    var oneKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
    oneKeyNumpad.onDown.add(function(){
      if(money2>=cost[1] && !dirSelection2){
        selectedEntity2=1;
        this.buy(2);
      }
    }, this);

    var twoKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
    twoKeyNumpad.onDown.add(function(){
      if(money2>=cost[2] && !dirSelection2){
        selectedEntity2=2;
        this.buy(2);
      }
    }, this);

    var threeKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
    threeKeyNumpad.onDown.add(function(){
      if(money2>=cost[3] && !dirSelection2){
        selectedEntity2=3;
        this.buy(2);
      }
    }, this);

    var fourKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
    fourKeyNumpad.onDown.add(function(){
      if(money2>=cost[4] && !dirSelection2){
        selectedEntity2=4;
        this.buy(2);
      }
    }, this);

    var fiveKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
    fiveKeyNumpad.onDown.add(function(){
      if(money2>=cost[5] && !dirSelection2){
        selectedEntity2=5;
        this.buy(2);
      }
    }, this);

    var sixKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
    sixKeyNumpad.onDown.add(function(){
      if(money2>=cost[6] && !dirSelection2){
        selectedEntity2=6;
        this.buy(2);
      }
    }, this);

    var sevenKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
    sevenKeyNumpad.onDown.add(function(){
      if(money2>=cost[7] && !dirSelection2){
        selectedEntity2=7;
        this.buy(2);
      }
    }, this);

    var eightKeyNumpad = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
    eightKeyNumpad.onDown.add(function(){
      if(money2>=cost[8] && !dirSelection2){
        selectedEntity2=8;
        this.buy(2);
      }
    }, this);

    //Kustina izveeles lauku
    var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(function(){
      
      if(dirSelection1){
        entities[selectedEntity1].mainDir = 1;
        entities[selectedEntity1].dirc = 0;
        entities[selectedEntity1].currDir = 0;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } else {

        if(selPos1>0)selPos1--;
        else selPos1=9;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;
      
      }
    }, this);

    var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(function(){

      if(dirSelection1){
        entities[selectedEntity1].mainDir = 1;
        entities[selectedEntity1].dirc = 2;
        entities[selectedEntity1].currDir = 2;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } else {

        if(selPos1<9)selPos1++;
        else selPos1=0;
        selectionSquare1.position.y = (gameFieldY)+61*selPos1;

      }
    }, this);

    var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    dKey.onDown.add(function(){

      if(dirSelection1){
        entities[selectedEntity1].mainDir = 0;
        entities[selectedEntity1].dirc = 1;
        dirSelection1 = false;
        dirSelectionEntity1.destroy();
      } 

    }, this);




    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 1;
        entities[selectedEntity2].dirc = 0;
        entities[selectedEntity2].currDir = 0;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      } else {
        
        if(selPos2>0)selPos2--;
        else selPos2=9;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;
      
      }
    }, this);

    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 1;
        entities[selectedEntity2].dirc = 2;
        entities[selectedEntity2].currDir = 2;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      } else {

        if(selPos2<9)selPos2++;
        else selPos2=0;
        selectionSquare2.position.y = (gameFieldY)+61*selPos2;

      }
    }, this);

    var leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(function(){

      if(dirSelection2){
      
        entities[selectedEntity2].mainDir = 0;
        entities[selectedEntity2].dirc = 1;
        dirSelection2 = false;
        dirSelectionEntity2.destroy();

      }

    }, this);
  },

  prepareNewGame: function(){
    entities = [];
    entityIsAlive = [];
    entityCount = 0;
    selPos1 = 0;
    selPos2 = 0;
    gameIsOver = false;
    money1 = defaultMoney;
    money2 = defaultMoney;

    for(var i = 0; i<10; i++){
      for(var j = 0; j<15;j++){
        mineMap[i][j] = -1;
      }
    }

  }

};

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function coordToCellX(x){
  return Math.floor((x-gameFieldX)/61);
}

function coordToCellY(y){
  return Math.floor((y-gameFieldY)/61);
}
