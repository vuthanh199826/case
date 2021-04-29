function AirBoss(id){
    this.blood = 1000;
    this.x = Math.round(Math.random()*(1000-100)+100);
    this.y = Math.round(Math.random()*(400-100)+100);
    this.id = id;
    this.bulletsOfAir = [];
    this.width = 130;
    this.height = 130;
    this.speedX = 8;
    this.speedY = 8;
    this.direction = 'down';
    this.reloadCount = 5;
    this.count = 0;
    this.canFire = true;

    this.draw = function (){
        let image = document.getElementById(this.id);
        ctx.drawImage(image,this.x,this.y,this.width,this.height);
    }

    this.drawBlood = function (){
        // ctx.fillStyle = 'white';
        // ctx.fillRect(this.x, this.y - 20,  130 , 10);
        // ctx.fillStyle = "rgb(164,10,10)";
        // ctx.fillRect(this.x, this.y - 20, this.blood * 130 / 1000, 10);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0,  1350 , 5);
        ctx.fillStyle = "rgb(164,10,10)";
        ctx.fillRect(0, 0, this.blood * 1350 / 1000, 5);
    }

    this.moveUp = function (){
        this.id = 'newAirUp';
        this.check();
        this.y = this.y - this.speedY;
    }
    this.moveDown = function (){
        this.id = 'newAirDown';
        this.check();
        this.y = this.y + this.speedY;
    }
    this.moveLeft = function () {
        this.id = 'newAirLeft';
        this.check();
        this.x = this.x - this.speedX;
    }
    this.moveRight = function (){
        this.id = 'newAirRight';
        this.check();
        this.x = this.x + this.speedX;
    }
    this.moveTopRight = function (){
        this.id = 'newAirTopRight';
        this.check();
        this.x = this.x + this.speedX;
        this.y = this.y - this.speedY
    }
    this.moveTopLeft = function (){
        this.id = 'newAirTopLeft';
        this.check();
        this.x = this.x - this.speedX*0.7 ;
        this.y = this.y - this.speedY*0.7;
    }
    this.moveBotRight = function (){
        this.id = 'newAirBotRight';
        this.check();
        this.x = this.x + this.speedX*0.7;
        this.y = this.y + this.speedY*0.7;
    }
    this.moveBotLeft = function (){
        this.id = 'newAirBotLeft';
        this.check();
        this.x = this.x - this.speedX*0.7;
        this.y = this.y + this.speedY*0.7;
    }
    this.check = function () {
        if (this.x > 1280) {
            this.direction = 'left';
        } else if (this.x < 20) {
            this.direction = 'right';
        } else if (this.y > 500) {
            this.direction = 'up';
        } else if (this.y < 20) {
            this.direction = 'down';
        }
    }

    this.getDirectionOfAirBoss = function (num) {
        let dirs= ['up','down','left','right','topright','topleft','botright','botleft'];
        let current = this.direction;
        let all = new Array(num).fill(current);
        let diff = 100 - all.length;
        for (let i = 0; i < diff; i++) {
            let rand = Math.floor(Math.random()*dirs.length);
            all.push(dirs[rand]);
        }
        let randDir = Math.floor(Math.random()*all.length);
        return all[randDir];
    }
    this.fire = function () {
        if(!this.canFire) return;
        if(this.blood<100){
            this.speedX=10;
            this.speedY=10;
        }
        let bullet = new Bullet(this.x + 50, this.y+50,this.direction);
        bullet.speedXoB = 10;
        bullet.speedYoB = 10;
        this.bulletsOfAir.push(bullet);
        this.count = 0;
        this.canFire = false;
    }
    this.reload = function () {
        this.count++;
        if(this.count >= this.reloadCount){
            this.canFire = true;
        }
    }
}

let airboss = [];

function createAirBoss() {
    let pos = [
        [1250, 20],
        [1150, 20],
        [20, 20],
        [30, 100]
    ];
    for (let i = 0; i < 1; i++) {
        let rand = Math.floor(Math.random() * pos.length);
        let air = new AirBoss('newAirDown');
        air.x = pos[rand][0];
        air.y = pos[rand][1];
        airboss.push(air);
    }

}




function drawAirBoss(){
    for (let i = 0; i < airboss.length; i++) {
        airboss[i].reload();
        airboss[i].draw();
        airboss[i].drawBlood();
    }
}
function randomDirecOfAirBoss() {
    for (let i = 0; i < airboss.length; i++) {
        airboss[i].direction = airboss[i].getDirectionOfAirBoss(98);
        let rand = Math.floor(Math.random() * 4);
        if (rand === 1) {
            airboss[i].fire();
        }
    }
    setTimeout(randomDirecOfAirBoss, 10);
}
randomDirecOfAirBoss();

function randomAirBossMove() {
    for (let i = 0; i < airboss.length; i++) {
        if (airboss[i].direction === 'down') airboss[i].moveDown();
        if (airboss[i].direction === 'up') airboss[i].moveUp();
        if (airboss[i].direction === 'left') airboss[i].moveLeft();
        if (airboss[i].direction === 'right') airboss[i].moveRight();

        if (airboss[i].direction === 'topleft') airboss[i].moveTopLeft();
        if (airboss[i].direction === 'topright') airboss[i].moveTopRight();
        if (airboss[i].direction === 'botleft') airboss[i].moveBotLeft();
        if (airboss[i].direction === 'botright') airboss[i].moveBotRight();
    }
}

function moveBulletOfAirBoss() {
    for (let i = 0; i < airboss.length; i++) {
        for (let j = 0; j < airboss[i].bulletsOfAir.length; j++) {
            airboss[i].bulletsOfAir[j].moveBullet();
            airboss[i].bulletsOfAir[j].draw();
        }
    }
}

function checkCrashWithAirBoss() {
    for (let i = 0; i < tank.bullets.length; i++) {
        for (let j = 0; j < airboss.length; j++) {
            if (checkCrash(tank.bullets[i], airboss[j])) {
                tank.bullets.splice(i, 1);
                if(tank.power<5){
                    airboss[j].blood -=10;
                }else if(tank.power>=5){
                    airboss[j].blood -=20;
                }

                if(airboss[j].blood<=0){
                    airboss.splice(j,1);
                    tank.score += 100;
                }
                NextStage3();

                break;
            }
        }
    }
}

function checkBulletOfAirBoss() {
    for (let i = 0; i < airboss.length; i++) {
        for (let j = 0; j < airboss[i].bulletsOfAir.length; j++) {
            if (checkCrash(airboss[i].bulletsOfAir[j], tank)) {
                airboss[i].bulletsOfAir.splice(j, 1);
                tank.blood -= 10;
                CheckLoser();
                break;
            }
        }
    }
}

function NextStage3(){
    if(airboss.length===0) {
        createFinalBoss();
    }
}


