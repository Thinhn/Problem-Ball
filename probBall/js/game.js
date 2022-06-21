//to instantiate a new object that contain all the behind the scene of the game
let gameScene = new Phaser.Scene("game");
//init to declare global variable
gameScene.init = function(){
this.gameWidth = this.sys.game.config.width;
this.gameHeight = this.sys.game.config.height;
this.isTerminate = false;
};
//to load stuff before putting thing on the screen
gameScene.preload = function(){
this.load.image("bg","asset/bg.png");//the index is calling the javascript so go into the folder don't need ./
this.load.image("paddle","asset/paddle.png");
this.load.image("caterpill","asset/caterpillar.png");
this.load.image("replayBtn","asset/replayBttn.png");
};
//to create stuff and put them on the screen
gameScene.create = function(){
//creating group
this.entities = this.add.group();
function changeSize(obj,width,height){
    obj.displayWidth = width;
    obj.displayHeight = height;
}
function addPhys(obj,ref){
    ref.entities.add(obj);
    ref.physics.add.existing(obj);
    ref.physics.add.collider(ref.entities);
}


this.bg = this.add.sprite(0,0,"bg");
this.bg.setPosition(this.gameWidth/2,this.gameHeight/2);
changeSize(this.bg,this.gameWidth,this.gameHeight);

this.paddle = this.add.sprite(0,0,"paddle");
this.paddle.setPosition(this.gameWidth/2-250,this.gameHeight/2);
changeSize(this.paddle,100,100);

//add another paddle
this.paddle2 = this.add.sprite(0,0,"paddle");
this.paddle2.setPosition(this.gameWidth/2+250,this.gameHeight/2);
changeSize(this.paddle2,100,100);


//create caterpiller
this.caterpill = this.add.sprite(0,0,"caterpill");
this.caterpill.setPosition(this.gameWidth/2,this.gameHeight/2);
changeSize(this.caterpill,100,100);

//create the words and play button for the end game
this.gameOverScreen = this.add.container(this.gameWidth/2,this.gameHeight/2,).setAlpha(0);// set to invisible
this.scoreText = this.add.text(-80,-80,"Game Over",{fontSize: "32px",fill: "#11111"});
this.replayBtn = this.add.sprite(0,0,"replayBtn");
this.replayBtn.setInteractive();
this.replayBtn.on("pointerdown",replayB,this);
this.gameOverScreen.add([this.scoreText,this.replayBtn]);



//declaring and setting physics
addPhys(this.paddle,this);
addPhys(this.paddle2,this);
addPhys(this.caterpill,this);
// math random
    //change the size of collison box
    this.paddle.body.width = 30;
    this.caterpill.body.width = 50;
    this.paddle.body.offset.x =10 ;
    this.paddle.body.immovable = true;// so that it become a wall and bounce the ball
    this.paddle2.body.immovable = true;
    //keep the ball from going out
    this.caterpill.body.collideWorldBounds = true;
           //move the ball
           this.caterpill.body.bounce.setTo(1);
           this.caterpill.body.velocity.setTo(200,200);
        this.caterpill.body.offset.x=10;//offset to move the collision box
        
};
//to constantly loop through code
gameScene.update = function(){
    //mouse action
    if(this.isTerminate){
        this.gameOver();
        return;
    }
    if(this.input.activePointer){
        this.physics.moveTo(this.paddle,this.gameWidth/2-250,this.input.y,100);
    }

    if(this.caterpill.x <=20 || this.caterpill.x >=this.gameWidth-50){
        //console.log("Hello World");
        this.gameOverScreen.setAlpha(1);
        this.isTerminate = true;
    }
};
gameScene.gameOver= function (){
    //delete
    this.caterpill.body.setVelocity(0);
    this.paddle.body.setVelocity(0);
    this.caterpill.setVisible(false);
    this.paddle.setVisible(false);
    this.paddle2.setVisible(false);

}
function replayB(){
    this.isTerminate = false;
    this.gameOverScreen.setAlpha(0);
    this.caterpill.body.setVelocity(200);
    this.caterpill.setPosition(this.gameWidth/2,100);
    this.paddle.body.setVelocity(100);
    this.caterpill.setVisible(true);
    this.paddle.setVisible(true);
    this.paddle2.setVisible(true);

}
//config to create an object that will be pass to game
let config = {
    type:Phaser.AUTO,//canvas or webGL
    width:640,
    height:360,
    scene:gameScene,
    physics: {
        default: "arcade",//arcade tell you to use real physics
        arcade:{
            gravity:{y:0},//0 to stop it from falling, and 1000 to keep it from floating
            debug:false,
        }
    }
}
let game = new Phaser.Game(config);
