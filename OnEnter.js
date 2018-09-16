const step_count = 5;
var direction = 1;
var tar = document.getElementById("target");
var isClicked = false;
var keysDown = {left:false,right:false,up:false,down:false};
var keys = {left:37, right:39, up:38, down:40};

const PLAYER_DIR = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
};



function Player() {
    this.element = null;
    this.pos = {x:0,y:0,dir:PLAYER_DIR.RIGHT};
    this.loop = function(){
        setInterval(()=>{
            this.element.style.left = this.pos.x +'px';
            this.element.style.top = this.pos.y + 'px';
        },10)
    }
    this.init = function(element){
        this.element=element;

        document.addEventListener("keydown",(ev)=>{
            switch(ev.keyCode){
                case 37: 
                    this.pos.x--;
                    break;
                case 39:
                    this.pos.x++;
                    break;
                case 38: 
                    this.pos.y--;
                    break;
                case 40: 
                    this.pos.y++;
                    break;
            }
        })
    }
}

const player = new Player();
player.init(document.getElementById("target"));
player.loop();