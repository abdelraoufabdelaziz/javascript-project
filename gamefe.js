const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;




const enemyImage = new Image();
enemyImage.src ='nshark.png'
class Enemy {
    constructor(){
        this.x = canvas.width +200;
        this.y = Math.random() * (canvas.height -90)
        this.radius = 50;
        this.speed = Math.random() * 2 + 2;
        this.frame=0;
        //this.framex=0;
        

    }
    draw(){
        // ctx.fillstyle = 'red'
        // ctx.beginPath();
        // ctx.arc(this.x,this.y,this.radius, 0 , Math.PI*2)
        // ctx.fill();
        ctx.drawImage(enemyImage,this.x-90,this.y-100,this.radius*7.5,this.radius*3.7); //put shark image

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
const img= new Image();



const enemy1 =new Enemy();
function handleEnemy(){
    enemy1.update();
    enemy1.draw();
}









function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
     handleEnemy();
    handlediamonds();
    requestAnimationFrame(animate);

}

animate();
