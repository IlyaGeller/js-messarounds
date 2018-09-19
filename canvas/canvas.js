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
        if(Math.abs(this.x - mouse.x) <50 && Math.abs(this.y - mouse.y) <50 && mouse.down){
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

        if(Math.abs(this.x - mouse.x) <50 && Math.abs(this.y - mouse.y) <50 && mouse.down){
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
var circleArray = [];
for(var i=0; i<300; i++){
    var x = Math.random() * (canvas.width - (2*maxRadius)) + maxRadius;
    var y = Math.random() * (canvas.height - (2*maxRadius)) + maxRadius;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    var radius = Math.floor(Math.random() * (maxRadius/2) + 2);
    circleArray.push(new Circle(x,y,dx,dy,radius));
}
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0; i<circleArray.length ; i++){
        circleArray[i].update();
    }
}
animate();
