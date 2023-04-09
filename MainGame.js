let tank = new Tank(600, 370, "up");
let over = false;
let moveDirection = null;
setTimeout(createEnemy, 2000);
// createBoss();
// createAirBoss();
// createFinalBoss();

function handleTankMovement() {
    if (moveDirection === "up") {
        tank.moveUp();
    } else if (moveDirection === "down") {
        tank.moveDown();
    } else if (moveDirection === "left") {
        tank.moveLeft();
    } else if (moveDirection === "right") {
        tank.moveRight();
    }
}



function main() {
    if (over) return;
    clearAll();
    // Air Boss
    checkBulletOfAirBoss();
    checkCrashWithAirBoss();
    randomAirBossMove();
    moveBulletOfAirBoss();
    drawAirBoss();

    // Tank Boss
    checkBulletOfBoss()
    checkCrashWithBoss()
    randomBossMove();
    moveBulletOfBoss();
    drawBoss();

    // Tank enemies
    checkBulletOfEnemies();
    checkAllCrash();
    randomMove();
    displayAllStar();
    checkCrashWithStar();
    moveAllBullet();
    drawAllEnemy();

    //Check crash with all
    checkCrashWithAllEnemie();
    // Player
    handleTankMovement();
    tank.drawAllBullet();
    tank.reload();
    tank.drawBlood();
    tank.draw();

    // final boss
    checkBulletOfFinalBoss();
    checkCrashWithFinalBoss();
    randomFinalBossMove();
    moveBulletOfFinalBoss();
    drawFinalBoss();


    requestAnimationFrame(main);
}

main();

// Xây hàm điều khiển nhân vật


function handleKeyDown(event) {
    switch (event.keyCode) {
        case 38:
            moveDirection = "up";
            break;
        case 40:
            moveDirection = "down";
            break;
        case 37:
            moveDirection = "left";
            break;
        case 39:
            moveDirection = "right";
            break;
        case 32:
            tank.firePlus();
            break;
    }
}

function handleKeyUp(event) {
    moveDirection = null;
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);