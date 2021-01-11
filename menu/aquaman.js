var canvas=document.getElementById("canvas2")
var ctx=canvas.getContext("2d")
canvas.width = 800;
canvas.height= 500;
let score=0;
let gameframe = 0;
ctx.font='40px Georgia';


//Mouse setting
let canvasposition = canvas.getBoundingClientRect();
const mouse ={
    x: canvas.width/2, 
    y: canvas.height/2, 
    click:false
}
canvas.addEventListener("mousedown" , function(event){
    mouse.click =true;
    mouse.x= event.x -canvasposition.left;
    mouse.y= event.y -canvasposition.top;
    console.log(mouse.x , mouse.y);
});
canvas.addEventListener("mouseup" , function(event){
    mouse.click =false;
   
});

//player setting

var personup= new Image();
personup.src="male.png"

var persondown = new Image();
persondown.src="maledown.png"
class player {
    constructor(){
        this.x=0;
        this.y=canvas.height/2;
        this.radius=50;
        this.angle=0;
        this.framex = 0;
        this.framey = 0;
        this.frame = 0;
    }
    update(){
        const dx=this.x - mouse.x;
        const dy=this.y - mouse.y;
        let theta=Math.atan2(dy,dx)
        this.angle=theta;
           
          if (mouse.x != this.x){
              this.x -= dx/20;
          }

          if (mouse.y != this.y){
              this.y -= dy/20;
          }
    }
    draw(){
        if (mouse.click){
            ctx.lineWidth= 0.005;
            ctx.beginPath();
            ctx.moveTo(this.x , this.y)
            ctx.lineTo(mouse.x , mouse.y)
            ctx.stroke();
        }
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI *2)
        ctx.fill();
        ctx.closePath();
       ctx.save();
        ctx.translate(this.x , this.y);
        ctx.rotate(this.angle)
        if (this.x >= mouse.x){
            ctx.drawImage(personup , 0 - 80 , 0 - 90 )
        }else{
             
           ctx.drawImage(persondown , 0 - 80 , 0 - 90 )
        }
        ctx.restore();
    }
}

const player1 = new player();

function animate(){
    ctx.clearRect(0 , 0 , canvas.width , canvas.height)
    player1.update();
    player1.draw();
    gameframe++;
    requestAnimationFrame(animate)
    ctx.fillStyle="black"
    ctx.fillText("score: " + score , 10 , 50,) 
}
animate()
