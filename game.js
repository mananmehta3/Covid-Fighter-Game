function loadImages() {
    // player, virus, gem
    enemyImage1 = new Image();
    enemyImage1.src = "Assets/virus1.png";
    enemyImage2 = new Image();
    enemyImage2.src = "Assets/virus2.png";
    playerImage = new Image();
    playerImage.src = "Assets/scientist.png";
    trophyImage = new Image();
    trophyImage.src = "Assets/vaccine.png";
}

function init() {
    // objects that we have in the game
    canvas = document.getElementById("myCanvas");
    W = 1400;
    H = 800;
    canvas.width = W;
    canvas.height = H;

    gameOver = false;

    // initial health
    health = 100;

    // create a context
    pen = canvas.getContext('2d');

    // JSON for enemies object 
    e1 = {
        x: 300,
        y: 100,
        w: 120,
        h: 120,
        speed: 20,
        image: enemyImage1
    };
    e2 = {
        x: 600,
        y: 300,
        w: 120,
        h: 120,
        speed: 40,
        image: enemyImage2
    };
    e3 = {
        x: 900,
        y: 40,
        w: 120,
        h: 120,
        speed: 60,
        image: enemyImage1
    };

    // Array to contain all enemies
    enemy = [e1, e2, e3];

    // Player and trohpy object
    player = {
        x: 40,
        y: H / 2 - 50,
        w: 200,
        h: 200,
        speed: 30,
        image: playerImage,
        moving: false
    };

    trophy = {
        x: W - 200,
        y: H / 2 - 30,
        w: 120,
        h: 120,
        image: trophyImage
    };

    // Event Listener
    // move player
    canvas.addEventListener('mousedown', function () {
        player.moving = true;
    });

    // stop player
    canvas.addEventListener('mouseup', function () {
        player.moving = false;
    });
}

function ifCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {
        return true;
    }
    return false;
}

function draw() {
    pen.clearRect(0, 0, W, H);
    //    pen.fillStyle = "red";
    pen.drawImage(player.image, player.x, player.y, player.w, player.h);
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy[i].image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
    pen.drawImage(trophy.image, trophy.x, trophy.y, trophy.w, trophy.h);

    pen.fillStyle = "white";
    pen.font = "30px Roboto";
    pen.fillText("Player Health: " + health, 20, 30);
}

function update() {

    // move the box up and down    
    if (player.moving == true) {
        player.x += player.speed;
        health += 10;
    }

    if (ifCollision(trophy, player)) {
        health += 100;
        alert("You Won " + health);
        gameOver = true;
        return;
    }

    for (let i = 0; i < enemy.length; i++) {
        if (ifCollision(player, enemy[i])) {
            health -= 20;
        }
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;

        if (enemy[i].y > 600 || enemy[i].y < 100) enemy[i].speed *= -1;
    }

    if (health < 0) {
        alert("Game Over " + health);
        gameOver = true;
    }
}

function gameloop() {
    if (gameOver == true) {
        clearInterval(f);
    }
    draw();
    update();
}

loadImages();
init();
var f = setInterval(gameloop, 150);