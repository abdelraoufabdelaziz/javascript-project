const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
let score = 0;
ctx.font = "50px Georgia"
let gameFrame = 0;
let gameover = false;


//Mouse setting
let canvasposition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener("mousedown", function(event) {
    mouse.click = true;
    mouse.x = event.x - canvasposition.left;
    mouse.y = event.y - canvasposition.top;
});
canvas.addEventListener("mouseup", function(event) {
    mouse.click = false;

});

var personup = new Image();
personup.src = "male.png"

var persondown = new Image();
persondown.src = "maledown.png"
class player {
    constructor() {
        this.x = 0;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.framex = 0;
        this.framey = 0;
        this.frame = 0;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx)
        this.angle = theta;

        if (mouse.x != this.x) {
            this.x -= dx / 18;
        }

        if (mouse.y != this.y) {
            this.y -= dy / 18;
        }
    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.005;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke();
        }
        // ctx.beginPath();
        // ctx.arc(this.x , this.y , this.radius , 0 , Math.PI *2)
        //ctx.fill();
        //ctx.closePath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle)
        if (this.x >= mouse.x) {
            ctx.drawImage(personup, 0 - 80, 0 - 90)
        } else {

            ctx.drawImage(persondown, 0 - 80, 0 - 90)
        }
        ctx.restore();
    }
}


const Diamond = new Image();
Diamond.src = 'diamond.png'
const diamondarr = [];


const enemyImage = new Image();
enemyImage.src = 'nshark.png'
class Enemy {
    constructor() {
        this.x = canvas.width +300;
        this.y = Math.random() * (canvas.height -90)
        this.radius = 50;
        this.speed = Math.random() * 10 + 2;
        this.frame=0;
    }
    draw() {
        // ctx.fillstyle = 'red'
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius, 0 , Math.PI*3)
        // ctx.fill();
        ctx.drawImage(enemyImage,this.x-90,this.y-100,this.radius*7.5,this.radius*3.7); //put shark image
    }
    update() {
        this.x -= this.speed;
        if (this.x < 0 - this.radius * 6) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
        //collision with player
        const dx = this.x - player1.x;
        const dy = this.y - player1.y;
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.radius + player1.radius) {
            Gameover();
        }
    }
}

const lenemyImage = new Image();
lenemyImage.src ='lshark.png'
class LEnemy {
    constructor(){
        this.x = canvas.width -1200;
        this.y = canvas.height/2 -90
        this.radius = 50;
        this.speed = Math.random() * 2 + 2;
        this.frame=0;

    }
    draw(){
        // ctx.fillstyle = 'red'
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius, 0 , Math.PI*3)
        // ctx.fill();
        ctx.drawImage(lenemyImage,this.x-300,this.y-100,this.radius*7.5,this.radius*3.7); //put shark image
    }
    update(){
        this.x += this.speed;
        if(this.x > canvas.width+ this.radius * 6){
            this.x=canvas.width -1200;
            this.y = Math.random()*(canvas.height-150)+90;
            this.speed =Math.random()*10+2;
        }
        
        //collision with player
        const dx = this.x - player1.x;
        const dy = this.y - player1.y;
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < this.radius + player1.radius) {
            Gameover();
        }
    }
}

const img = new Image();
img.src = "smallbutton.png"

function Gameover() {
    ctx.fillStyle = "white"
    ctx.fillText("Game over" + "  " + "your score is:" + "(" + score + ")", 200, 300)

    ctx.drawImage(img, 0, 500)
    gameover = true;
}


const enemy1 = new Enemy();

function handleEnemy() {
    enemy1.update();
    enemy1.draw();
}

const enemy2 =new LEnemy();
function handleLEnemy(){
    enemy2.update();
    enemy2.draw();
}

class diamond {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? "sound1" : "sound2"

    }
    update() {
        this.y += this.speed;
        const dx = this.x - player1.x;
        const dy = this.y - player1.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw() {


        ctx.drawImage(Diamond, this.x - 30, this.y - 30, this.radius * 2, this.radius * 2);

    }
}
const diamondpop1 = document.createElement("audio")
diamondpop1.src = "bubbles-single2.wav"
const diamondpop2 = document.createElement("audio")
diamondpop2.src = "Plop.ogg"

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
        if (diamondarr[i].distance < diamondarr[i].radius + player1.radius) {
            console.log("collision");
            if (!diamondarr[i].counted) {
                if (diamondarr[i].sound == "sound1") {
                    diamondpop1.play();
                } else {
                    diamondpop2.play()
                }
                score++;
                diamondarr[i].counted = true;
                diamondarr.splice(i, 1)
            }
        }

    }
}
const bgfisharr = [];
///////////////////////////////////////
//for medium level
const medbg = new Image();
medbg.src = 'medium.png';
class medfish {
    constructor() {
        this.x = canvas.width + 100;
        this.y = Math.random() * (canvas.height) + 90;
        this.radius = 50;
        this.speed = Math.random() * 1 + 2;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 497;
        this.spriteHeight = 324;
    }
    draw() {

        ctx.drawImage(medbg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 70, this.y - 60, this.spriteWidth / 3, this.spriteHeight / 4);
    }
    update() {
        this.x -= this.speed;

        if (gameFrame % 5 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if (this.frame == 3 || this.frame == 7 || this.frame == 11)
                this.frameX = 0;
            else {
                this.frameX++;
            }
            if (this.frame < 3) this.frameY = 0;
            else if (this.frame < 7) this.frameY = 2;
            else if (this.frame < 11) this.frameY = 1;
            else this.frameY = 0;
        }
    }
}
const medbg1 = new medfish();
medbg1.src = 'medium.png';


function handlefishestoleftm() {
    medbg1.update();
    medbg1.draw();
    if (gameFrame % 100 == 0) {
        bgfisharr.push(new medfish());

    }
    for (let i = 0; i < bgfisharr.length; i++) {
        bgfisharr[i].update();
        bgfisharr[i].draw();
        if (bgfisharr[i].y < 0) {
            bgfisharr.splice(i, 3);
        }
    }
    for (let i = 0; i < bgfisharr.length; i++) {
        if (bgfisharr[i].y < 0 - bgfisharr[i].radius * 2) {
            bgfisharr.splice(i, 3);
        }
    }
}


const player1 = new player();


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame++;
    // hansdlefishestoleft();
    handlefishestoleftm();
    handleEnemy();
    handleLEnemy();
    handlediamonds();
    player1.update();
    player1.draw();
    ctx.fillStyle = "black"
    ctx.fillText("score: " + score, 10, 50, )
    if (!gameover) requestAnimationFrame(animate);

}

animate();