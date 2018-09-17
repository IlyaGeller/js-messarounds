const step_count = 1;
var direction = 1;
var speed = 20;
var tar = document.getElementById("target");
document.getElementById("body").style.width = '800px';
var MAP_WIDTH = document.getElementById("body").style.width.split('p')[0];
var isClicked = false;
var keysDown = {left:false,right:false,up:false,down:false};
var keys = {left:37, right:39, up:38, down:40};
var readyToJump = true;
var playerOnRightEnd = false;
var playerOnLeftEnd = false;
const jump_height = 80;
const PLAYER_DIR = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
};

const PLAYER_MAP_END = {
    LEFT : 150,
    RIGHT : 600
};

const SPRITES = {
    IDLE : "url(jungle_idle.png)",
    RUN : "url(jungle_run.png)",
    JUMP : "url(jungle_jump.png)",
    LANDING : "url(jungle_landing.png)",
    MID_AIR : "url(jungle_mid_air.png)"
}
function mapScrollDirection() {
    if(playerOnLeftEnd){
        return 2;
    }else if(playerOnRightEnd){
        return -2;
    }else{
        return 0;
    }
}

function Player() {
    this.map = null;
    this.element = null;
    this.pos = {x:PLAYER_MAP_END.LEFT,y:325,dir:PLAYER_DIR.RIGHT};
    this.loop = function(){
        setInterval(()=>{
            this.element.style.left = this.pos.x +'px';
            this.element.style.top = this.pos.y + 'px';
            if (this.pos.x <= PLAYER_MAP_END.LEFT && keysDown[PLAYER_DIR.LEFT]){
                playerOnLeftEnd = true;
            }else{
                playerOnLeftEnd = false;
            }  
            if (this.pos.x >= PLAYER_MAP_END.RIGHT && keysDown[PLAYER_DIR.RIGHT]){
                playerOnRightEnd = true;
            }else{
                playerOnRightEnd = false;
            }
            this.map.style["background-position"] = this.getNextPosition();
            if(keysDown[PLAYER_DIR.LEFT]){
                this.element.style["transform"] = 'scaleX(' + (-1) + ')';
            }else if(keysDown[PLAYER_DIR.RIGHT]){
                this.element.style["transform"] = 'scaleX(' + (1) + ')';
            }
        },1000/60);

        setInterval(()=>{
            this.animateScript();  
        },100);
        
        setInterval(()=>{
            if(keysDown[PLAYER_DIR.LEFT]){
                if(this.pos.x >PLAYER_MAP_END.LEFT){
                    this.pos.x-=step_count*speed;
                }
            }
            if(keysDown[PLAYER_DIR.RIGHT]){
                if(this.pos.x < PLAYER_MAP_END.RIGHT){
                    this.pos.x+=step_count*speed;
                }
            }
            if(keysDown[PLAYER_DIR.UP]){
                if(readyToJump){
                    readyToJump = false;
                    this.pos.y -= jump_height;
                    setTimeout(()=>{
                        this.pos.y += jump_height;
                    },400)
                    setTimeout(()=>{
                        readyToJump = true;
                    },700)
                }
            }
        },70)
    }
    this.getNextPosition = function() {
        if(this.map.style["background-position"]) {
            const x = this.map.style["background-position"].split(' ')[0];
            const nextX = parseInt(x);
            return ((nextX + mapScrollDirection()) + 'px 0px');
        } else {
            return '0px 0px';
        }
    }
    this.init = function(map,element){
        this.map=map;
        this.element=element;  
        this.map.style["background-position"] = this.getNextPosition()
        this.element.style["background-position-x"] = '0px';
        this.element.style["transform"] = 'scaleX(' + 1 + ')';
        document.addEventListener("keydown",(ev)=>{
            switch(ev.keyCode){
                case 37:
                    keysDown[PLAYER_DIR.LEFT] = true;
                    break;
                case 39:
                    keysDown[PLAYER_DIR.RIGHT] = true;
                    break;
                case 38:
                    keysDown[PLAYER_DIR.UP] = true;
                    break;
                }
            }
        )
        document.addEventListener("keyup",(ev)=>{
            switch(ev.keyCode){
                case 37:
                    keysDown[PLAYER_DIR.LEFT] = false;
                    break;
                case 39:
                    keysDown[PLAYER_DIR.RIGHT] = false;
                    break;
                case 38:
                    keysDown[PLAYER_DIR.UP] = false;
                    break;
                }
            }
        )
    }
    this.animateScript = function(){
        const x = this.element.style.backgroundPositionX.split(' ')[0];
        var nextX = parseInt(x);
        if(keysDown[PLAYER_DIR.LEFT]||keysDown[PLAYER_DIR.RIGHT]||keysDown[PLAYER_DIR.UP]){
            nextX = parseInt(x) - 60;
        }
        this.element.style["background-position-x"] = nextX + 'px';
    }
}

const player = new Player();
player.init(document.getElementById("bg"),document.getElementById("target"));
player.loop();