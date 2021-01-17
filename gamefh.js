const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

let gameFrame=0;
  

//jellyfish
const jellyarr = [];
const jellyImage = new Image();
jellyImage.src ='jellyfish.png'

class Enemy {
    constructor() {
        this.x = Math.random()*(canvas.width - 150);
        this.y =canvas.height +100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.frame=0;
        //this.framex=0;


    }
    draw() {
        //ctx.fillstyle = 'blue'
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius, 0 , Math.PI*2)
        // ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(jellyImage,this.x-190,this.y-150,this.radius*7.5,this.radius*6); 
    }
    update() {
        this.y -= this.speed;

    }
}



function handleEnemy() {
    if (gameFrame % 100 ==0) //every 50 frame push jellyfish
    {
        jellyarr.push(new Enemy())

    }
    for (let i=0; i< jellyarr.length;i++)
    {
        jellyarr[i].update();
        jellyarr[i].draw();
        
        if (jellyarr[i].y< 0 - this.radius * 2) //passed top
        {
            jellyarr.splice(i,1) //cut element from array to no generate fish

            i--;
        }
        
    }
}



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    handleEnemy();
    gameFrame++;
    requestAnimationFrame(animate);

}

animate();