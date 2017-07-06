var TankGame = TankGame || {};
TankGame.Menu = function(){};

var gameFieldX = (window.innerWidth-(61*15))/2;
var gameFieldY = (window.innerHeight-(61*10))/2;

var flagCount = 273; // jaamaina arii ieksh to preload.js

var flag1 = Math.floor(Math.random()*flagCount );
var flag2 = Math.floor(Math.random()*flagCount );
var tOptions;

TankGame.Menu.prototype = {
  create: function() {

    this.game.stage.backgroundColor = '#2B200F';

    this.game.add.plugin(Fabrique.Plugins.InputField);
    
    tOptions = localStorage.getItem("options");

    if(tOptions!=null){
      if(!window.music_playing && JSON.parse(localStorage.getItem("options")).music){
        music = this.game.add.audio('music_menu');
        music.play();
        music.volume = 0.1;
        window.music_playing=true;
      }
    }

    if( JSON.parse( localStorage.getItem("flag1")) != null ){
        flag1 = JSON.parse( localStorage.getItem("flag1"));
    }

    if( JSON.parse( localStorage.getItem("flag2")) != null ){
        flag2 = JSON.parse( localStorage.getItem("flag2"));
    }

    playbtn = this.game.add.button(centerX, centerY, 'play_btn', function(){
        var val1 = name1.value;
        var val2 = name2.value;
        if(val1=='')val1="Capple";
        if(val2=='')val2="Catter";

        var names = { 'name1': val1, 'name2': val2};
        localStorage.setItem('player_names', JSON.stringify(names));

        localStorage.setItem("flag1", flag1);
        localStorage.setItem("flag2", flag2);

        this.state.start('Game');

    }, this);
    playbtn.anchor.setTo(0.5);
    playbtn.onInputOver.add(function(){
    	playbtn.loadTexture('play_btn_hover');
    }, this);
    playbtn.onInputOut.add(function(){
    	playbtn.loadTexture('play_btn');
    }, this);


    howtobtn = this.game.add.button(centerX, centerY+60+20, 'howtoplay_btn', function(){
        this.state.start('Howtoplay');
    }, this);
    howtobtn.height = 32;
    howtobtn.width = 200;
    howtobtn.anchor.setTo(0.5);
    howtobtn.onInputOver.add(function(){
    	howtobtn.loadTexture('howtoplay_btn_hover');
    }, this);
    howtobtn.onInputOut.add(function(){
    	howtobtn.loadTexture('howtoplay_btn');
    }, this);


    var flagPreview1 = this.game.add.sprite(playbtn.x-300+7, playbtn.y+70, 'flag_' + flag1);
    var flagPreview2 = this.game.add.sprite(playbtn.x+150, playbtn.y+70, 'flag_' + flag2);


    var leftBtnPlayer1 = this.game.add.button(playbtn.x-300+7, playbtn.y+30, 'left_btn',function(){
        flag1--;
        if(flag1<0) flag1 = flagCount-1;
        flagPreview1.loadTexture('flag_' + flag1);
    });
    leftBtnPlayer1.onInputOver.add(function(){
        leftBtnPlayer1.loadTexture('left_btn_hover');
    }, this);
    leftBtnPlayer1.onInputOut.add(function(){
        leftBtnPlayer1.loadTexture('left_btn');
    }, this);

    var rightBtnPlayer1 = this.game.add.button(playbtn.x-225+7, playbtn.y+30, 'right_btn',function(){
        flag1++;
        if(flag1>=flagCount) flag1 = 0;
        flagPreview1.loadTexture('flag_' + flag1);
    });
    rightBtnPlayer1.onInputOver.add(function(){
        rightBtnPlayer1.loadTexture('right_btn_hover');
    }, this);
    rightBtnPlayer1.onInputOut.add(function(){
        rightBtnPlayer1.loadTexture('right_btn');
    }, this);

    var leftBtnPlayer2 = this.game.add.button(playbtn.x+150, playbtn.y+30, 'left_btn',function(){
        flag2--;
        if(flag2<0) flag2 = flagCount-1;
        flagPreview2.loadTexture('flag_' + flag2);
    });
    leftBtnPlayer2.onInputOver.add(function(){
        leftBtnPlayer2.loadTexture('left_btn_hover');
    }, this);
    leftBtnPlayer2.onInputOut.add(function(){
        leftBtnPlayer2.loadTexture('left_btn');
    }, this);

    var rightBtnPlayer2 = this.game.add.button(playbtn.x+225, playbtn.y+30, 'right_btn',function(){
        flag2++;
        if(flag2>=flagCount) flag2 = 0;
        flagPreview2.loadTexture('flag_' + flag2);
    });
    rightBtnPlayer2.onInputOver.add(function(){
        rightBtnPlayer2.loadTexture('right_btn_hover');
    }, this);
    rightBtnPlayer2.onInputOut.add(function(){
        rightBtnPlayer2.loadTexture('right_btn');
    }, this);


    fullscreenbtn = this.game.add.button(160, 10, 'fullscreen_off', function(){
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        if(this.game.scale.isFullScreen){
            fullscreenbtn.loadTexture('fullscreen_off');
            this.game.scale.stopFullScreen();
        } else {
        	fullscreenbtn.loadTexture('fullscreen_on');
            this.game.scale.startFullScreen(false);
        }
    }, this);

    if(this.game.scale.isFullScreen){
        fullscreenbtn.loadTexture('fullscreen_on');
    } else {
    	fullscreenbtn.loadTexture('fullscreen_off');
    }

  if(tOptions!=null){
    if(JSON.parse(localStorage.getItem("options")).particles==true){
        particlesbtn = this.game.add.button(10, 10, 'particles_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.particles=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
        particlesbtn = this.game.add.button(10, 10, 'particles_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.particles=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }
    
    if(JSON.parse(localStorage.getItem("options")).sounds){
        soundsbtn = this.game.add.button(60, 10, 'sounds_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.sounds=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
        soundsbtn = this.game.add.button(60, 10, 'sounds_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.sounds=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }

    if(JSON.parse(localStorage.getItem("options")).music){
        musicbtn = this.game.add.button(110, 10, 'music_on', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.music=false;
            music.stop();
    		window.music_playing=false;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }else{
       musicbtn = this.game.add.button(110, 10, 'music_off', function(){
            var options = localStorage.getItem('options');
            options = JSON.parse(options);
            options.music=true;
            localStorage.setItem("options",JSON.stringify(options));
            this.state.start('Menu');
        }, this);
    }
  }


    this.cat = this.game.add.sprite(0,gameFieldY+(61*10)-30,'gunman_walk');
    var walk =this.cat.animations.add('walk');
    this.cat.animations.play('walk',8,true);

    this.cat2 = this.game.add.sprite(50,gameFieldY+(61*10)-30,'gunman_walk_blue');
    var walk2 =this.cat2.animations.add('walk2');
    this.cat2.animations.play('walk2',7,true);

    game_logo = this.game.add.sprite(window.innerWidth/2,10,'game_logo_moving');
    game_logo.anchor.setTo(0.5,0);

    var move = game_logo.animations.add('move');
    game_logo.animations.play('move',20,true);

    var name1 = this.game.add.inputField(playbtn.x-300, playbtn.y-20, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        height:20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Name player1',
        placeHolderColor: '#000',
        type: Fabrique.InputType.text
    });
    var name2 = this.game.add.inputField(playbtn.x+140, playbtn.y-20, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        height:20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Name player2',
        placeHolderColor: '#000',
        type: Fabrique.InputType.text
    });
    // name1.anchor.setTo(0.5);
    if(JSON.parse(localStorage.getItem("player_names")).name1!==''){
        name1.setText(JSON.parse(localStorage.getItem("player_names")).name1);
    }
    if(JSON.parse(localStorage.getItem("player_names")).name2!==''){
        name2.setText(JSON.parse(localStorage.getItem("player_names")).name2);
    }
  },


  update: function() {
    if(this.cat.position.x<window.innerWidth)this.cat.position.x+=1.8;
    else this.cat.position.x = -15;
    if(this.cat2.position.x<window.innerWidth)this.cat2.position.x+=2;
    else this.cat2.position.x = -15;


    var options = localStorage.getItem('options');
    options = JSON.parse(options);
    //if(options.particles)particlesbtn.loadTexture('particles_on');
    //else particlesbtn.loadTexture('particles_off');
  },

};
