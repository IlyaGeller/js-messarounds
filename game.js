const step_count = 20;
var direction = 1;
var tar = document.getElementById("target");
var isClicked = false;
var keysDown = {left:false,right:false,up:false,down:false};
var keys = {left:37, right:39, up:38, down:40};
var readyToJump = true;
const jump_height = 80;
const PLAYER_DIR = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
};



function Player() {
    this.map = null;
    this.element = null;
    this.pos = {x:0,y:202,dir:PLAYER_DIR.RIGHT};
    this.loop = function(){
        setInterval(()=>{
            this.element.style.left = this.pos.x +'px';
            this.element.style.top = this.pos.y + 'px';
            this.map.style["background-position"] = this.getNextPosition()
        },1000/60)
    }
    this.getNextPosition = function() {
        if(this.map.style["background-position"]) {
            const x = this.map.style["background-position"].split(' ')[0];
            const nextX = parseInt(x);
            return ((nextX - 1) + 'px 0px');
        } else {
            return '0px 0px';
        }
    }
    this.init = function(map,element){
        this.map=map;
        this.element=element;  
        this.map.style["background-position"] = this.getNextPosition()

        document.addEventListener("keydown",(ev)=>{
            switch(ev.keyCode){
                case 37:
                    if(this.pos.x - step_count>=0){
                        this.pos.x-=step_count;
                    } 
                    break;
                case 39:
                    if(this.pos.x + step_count <= 780){
                        this.pos.x+=step_count;
                    }
                    break;
                case 38: 
                    if(readyToJump){
                        readyToJump = false;
                        this.pos.y -= jump_height;
                        setTimeout(()=>{
                            this.pos.y += jump_height;
                        },200)
                        setTimeout(()=>{
                            readyToJump = true;
                        },400)
                    }
                    break;
                case 40:
                    if(this.pos.y + step_count <= 780){
                        this.pos.y+=step_count;
                    }
                    break;
            }
        })
    }
}

const player = new Player();
player.init(document.getElementById("bg"),document.getElementById("target"));
player.loop();