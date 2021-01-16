const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let score=0;
ctx.font="50px Georgia"
let gameFrame = 0;
let gameover=false;


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
});
canvas.addEventListener("mouseup" , function(event){
    mouse.click =false;
   
});

var personup= new Image();
personup.src="femaledown.png"

var persondown = new Image();
persondown.src="female.png"
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
              this.x -= dx/18;
          }

          if (mouse.y != this.y){
              this.y -= dy/18;
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
       // ctx.beginPath();
        //ctx.arc(this.x , this.y , this.radius , 0 , Math.PI *2)
        //ctx.fill();
        //ctx.closePath();
       ctx.save();
        ctx.translate(this.x , this.y);
        ctx.rotate(this.angle-180)
        if (this.x >= mouse.x){
            ctx.drawImage(personup , 0 - 150 , 0 - 130 )
        }else{
             
           ctx.drawImage(persondown , 0 - 150 , 0 - 130 )
        }
        ctx.restore();
    }
}

const enemyImage = new Image();
enemyImage.src ='shark.png'
const Diamond = new Image();
Diamond.src = 'diamond.png'
const diamondarr = [];


class Enemy {
    constructor(){
        this.x = canvas.width +200;
        this.y = Math.random() * (canvas.height -90)
        this.radius = 100;
        this.speed = Math.random() * 2 + 2;
        this.frame=0;
        //this.framex=0;
        

    }
    draw(){
        // ctx.fillstyle = 'red'
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius, 0 , Math.PI*2)
        // ctx.fill();
        ctx.drawImage(enemyImage,this.x-100,this.y-130,this.radius*3,this.radius*2.5); //put shark image

    }
    update(){
        this.x -= this.speed;
        if(this.x < 0 - this.radius * 2){
            this.x=canvas.width +200;
            this.y = Math.random()*(canvas.height-150)+90;
            this.speed =Math.random()*2+2;
       }
       //collision with player
       const dx= this.x - player1.x;
       const dy= this.y - player1.y;
       const distance=Math.sqrt(dx * dx + dy * dy)
       if(distance < this.radius + player1.radius){
                       Gameover();
       }
    }
}
const img= new Image();
img.src ="smallbutton.png"
function Gameover()
{
    ctx.fillStyle ="white"
    ctx.fillText("Game over" +"  "+ "your score is:" + "("+ score +")", 200 , 300)
    
    ctx.drawImage(img , 0 , 500 )
    gameover=true;
}


const enemy1 =new Enemy();
function handleEnemy(){
    enemy1.update();
    enemy1.draw();
}

class diamond {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted =false;
        this.sound=Math.random() <= 0.5 ? "sound1" : "sound2"

    }
    update() {
        this.y += this.speed;
        const dx =this.x - player1.x;
        const dy =this.y - player1.y;
       this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw() {


        ctx.drawImage(Diamond, this.x - 30, this.y - 30, this.radius * 2, this.radius * 2);

    }
}
const diamondpop1 = document.createElement("audio")
   diamondpop1.src="bubbles-single2.wav"
   const diamondpop2 = document.createElement("audio")
   diamondpop2.src="Plop.ogg"

function handlediamonds() {
    if (gameFrame % 50 == 0) {
        diamondarr.push(new diamond());

    }
    for (let i = 0; i < diamondarr.length; i++) {
        diamondarr[i].update();
        diamondarr[i].draw();
        if (diamondarr[i].y < 0) {
            diamondarr.splice(i, 1);
        }
    }
    for (let i = 0; i < diamondarr.length; i++) {
        if (diamondarr[i].y < 0 - diamondarr[i].radius * 2) {
            diamondarr.splice(i, 1);
        }
        if(diamondarr[i].distance < diamondarr[i].radius + player1.radius){
        console.log("collision");
        if(!diamondarr[i].counted){
            if(diamondarr[i].sound == "sound1"){
                diamondpop1.play();
            }
            else{
                diamondpop2.play()
            }
            score++;
            diamondarr[i].counted = true;
            diamondarr.splice(i , 1)
        }
        }
        
    }
}
const bgfisharr = [];
const bgimg = new Image();
bgimg.src = 'bgimg.png';
class bgfish {
    constructor() {
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 70;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 418;
        this.spriteHeight = 397;
    }
    draw() {
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.drawImage(bgimg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 70, this.y - 60, this.spriteWidth / 3, this.spriteHeight / 4);
    }
    update() {
        this.x -= this.speed;
        // if (this.x < 0 - this.radius * 2) {
        //     this.x = canvas.width + 1000;
        //     this.y = Math.random() * (canvas.height - 100) + 400;
        //     this.speed = Math.random() * 2 + 2;
        // }
        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if (this.frame == 3 || this.frame == 7 || this.frame == 11)
                this.frameX = 0;
            else {
                this.frameX++;
            }
            if (this.frame < 3) this.frameY = 0;
            else if (this.frame < 7) this.frameY = 1;
            else if (this.frame < 11) this.frameY = 2;
            else this.frameY = 0;
        }
    }
}
const bgfish1 = new bgfish();
bgfish1.src = 'bgimg.png';


function handlefishes() {
    bgfish1.update();
    bgfish1.draw();
    if (gameFrame % 100 == 0) {
        bgfisharr.push(new bgfish());

    }
    for (let i = 0; i < bgfisharr.length; i++) {
        bgfisharr[i].update();
        bgfisharr[i].draw();
        if (bgfisharr[i].y < 0) {
            bgfisharr.splice(i, 2);
        }
    }
    for (let i = 0; i < bgfisharr.length; i++) {
        if (bgfisharr[i].y < 0 - bgfisharr[i].radius * 2) {
            bgfisharr.splice(i, 2);
        }
    }
}


const player1 = new player();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameFrame++;
    handlefishes();
     handleEnemy();
    handlediamonds();
    player1.update();
    player1.draw();
    ctx.fillStyle="black"
    ctx.fillText("score: " + score , 10 , 50,)
    if(!gameover)  requestAnimationFrame(animate);

}

animate();
