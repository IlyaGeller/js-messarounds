var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")
var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;  
canvas.height = innerHeight;
canvas.width = innerWidth;
var maxRadius = 40;
var minRadius = 5;
var colorArray = [
    "#153641",
    "#22556E",
    "#4799B7",
    "#6DB3BF",
    "#94CFC9"
]
var colorArray2 = [
    "#FFDE59",
    "#FFBB59",
    "#FF8859",
    "#FF5966",
    "#F459FF"
]

var keysDown = {
    LEFT : false,
    RIGHT : false
}

window.addEventListener("keydown", function(ev){
    if(ev.keyCode === 37){
        keysDown.LEFT = true;
    }
    else if(ev.keyCode === 39){
        keysDown.RIGHT = true;
    }
})
window.addEventListener("keyup", function(ev){
    if(ev.keyCode === 37){
        keysDown.LEFT = false;
    }
    else if(ev.keyCode === 39){
        keysDown.RIGHT = false;
    }
})
function Player(){
    this.horizScale = 1;
    this.srcs = [
        "../images/red_idle.png",
        "../images/red_run.png"
    ]
    this.srcNum = {
        IDLE : 0,
        RUN : 1
    }
    this.minPositions = {
        IDLE : 28,
        RUN_0 : 61,
        RUN_1 : 124
    }
    var image = new Image();
    image.src = this.srcs[this.srcNum.IDLE];
    image.onload = function(){
        ctx.drawImage(image,28,29,75,75,100,0,75,75);
    }
    this.spritePosition = this.minPositions.IDLE;
    this.x = 0;
    this.update = function(){
        if(keysDown.LEFT || keysDown.RIGHT){
            this.src = this.srcs[this.srcNum.RUN];
        }else{
            this.src = this.srcs[this.srcNum.IDLE];
        }
        if (keysDown.LEFT && this.x > 0){
            this.x -= 10;
        }
        if (keysDown.RIGHT && this.x < innerWidth-75){
            this.x += 10;
        }
        this.spritePosition += 81.4;
        if(this.spritePosition > 928){
            this.spritePosition = this.minPositions.IDLE;
        }
        /**************************/
        ctx.save();
        ctx.translate(this.x,100);
        ctx.scale(1,1);
        ctx.drawImage(image,this.spritePosition,27,75,75,this.x,100,75,75);
        ctx.restore();
    }
}

var player = new Player();

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.awayFromMouse = true;
    this.fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.fillStyle2 = colorArray2[Math.floor(Math.random()*colorArray2.length)];
    ctx.fillStyle = this.fillStyle;
    this.draw = function(){
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius ,0,2*Math.PI);
        if(Math.abs(this.x - mouse.x) <50 && Math.abs(this.y - mouse.y) <50){
            ctx.fillStyle = this.fillStyle2;
        }else{
            ctx.fillStyle = this.fillStyle;
        }
        ctx.stroke();
        ctx.fill();
    }

    this.update = function(){
        if(this.x - this.radius < 0 || this.x + this.radius > innerWidth){
            this.dx = -this.dx;
        }
        if(this.y - this.radius < 0 || this.y + this.radius > innerHeight){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;  
        this.draw();

        if(Math.abs(this.x - mouse.x) <50 && Math.abs(this.y - mouse.y) <50){
            if(this.radius < maxRadius){
                this.radius += 2;
            }
        }else{
            if(this.radius > radius){
                this.radius -= 2;
            }
        }
    }

}
var mouse = {
    x: undefined,
    y: undefined,
    down: false
}

window.addEventListener("mousemove",function(ev){
    mouse.x = ev.x;
    mouse.y = ev.y;
})

window.addEventListener("mousedown",function(ev){
    mouse.down = true;
})
window.addEventListener("mouseup",function(ev){
    mouse.down = false;
})


// var circleArray = [];
// for(var i=0; i<500; i++){
//     var x = Math.random() * (canvas.width - (2*maxRadius)) + maxRadius;
//     var y = Math.random() * (canvas.height - (2*maxRadius)) + maxRadius;
//     var dx = (Math.random() - 0.5) * 5;
//     var dy = (Math.random() - 0.5) * 5;
//     var radius = Math.floor(Math.random() * (maxRadius/2) + 2);
//     circleArray.push(new Circle(x,y,dx,dy,radius));
// }

let TICKS = 60;
let lastTick = new Date().getTime();

function animate(){
    if((new Date().getTime() - lastTick) >= TICKS){
        lastTick = new Date().getTime();
        ctx.clearRect(0,0,innerWidth,innerHeight);
        // for(var i=0; i<circleArray.length ; i++){
        //     circleArray[i].update();
        // }
        
        player.update();
    }
    requestAnimationFrame(animate);
}
 animate();
