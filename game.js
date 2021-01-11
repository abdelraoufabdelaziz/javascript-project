const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;


let gameFrame = 0;

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
    }
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

    }
    update() {
        this.y += this.speed;
    }
    draw() {


        ctx.drawImage(Diamond, this.x - 30, this.y - 30, this.radius * 2, this.radius * 2);

    }
}

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

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameFrame++;
   
    handlefishes();
     handleEnemy();
    handlediamonds();
    requestAnimationFrame(animate);


}

animate();