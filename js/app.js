var score = 0;
var gameLevel = 1;
var life = 3;
var totalScore = 0;
var count = 0;
var players = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png"
]
var random = function (min_speed, max_speed) {
    return Math.floor(Math.random() * (max_speed - min_speed)) + min_speed;
}
// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.max = 300;
    this.min = 250;
    this.speed = random(this.min, this.max);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.speed = random(this.min, this.max);
        if (life <= 0) {
            this.speed = 0;
            score = 0;
            gameLevel = 0;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = players[random(0, 4)];
};
Player.prototype.resetPlayer = function () {
    this.x = 202;
    this.y = 404;
};
Player.prototype.update = function () {
    if (this.y < 54) {
        this.resetPlayer();
        score = score + 1;

    }
    document.getElementById('scorecard').innerHTML = "SCORE : " + score + " | GAME LEVEL : " + gameLevel + " | LIFE : " + life;
    for (var i = 0; i < 3; i++) {

        if ((this.y + 38 > allEnemies[i].y) && (this.y < allEnemies[i].y + 38) && (this.x + 38 > allEnemies[i].x) && (this.x < allEnemies[i].x + 38)) {
            life -= 1;
            this.resetPlayer();
            score = 0;
        }
    }
    if (this.y < -10) {
        score += 1;
        this.resetPlayer();
        totalScore += 1;
        gameLevel += 1;
    }
    if (life == 0) {

        // Create gradient
        ctx.font = "30px Verdana";
        var gradient = ctx.createLinearGradient(0, 0, 10, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        // Fill with gradient
        ctx.strokeStyle = gradient;
        ctx.strokeText("Game over! ", 180, 40);

        ctx.font = "20px Verdana";
        var gradient = ctx.createLinearGradient(0, 0, 10, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        // Fill with gradient
        ctx.strokeStyle = gradient;
        ctx.strokeText("PRESS F5 TO CONTINUE", 155, 600);

    }
};
Player.prototype.updateScore = function () {
    this.resetPlayer();
    score += 1;
    count++;
    totalScore += 1;
    if ((count % 3) == 0) {
        gameLevel += 1;
        for (var i = 0; i < 3; i++) {
            allEnemies[i].min += 100;
            allEnemies[i].max += 100;
        }
    }

};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (e) {
    if (e == 'left') {
        this.x -= 101;
    }
    if (e == 'right') {
        this.x += 101;
    }
    if (e == 'up') {
        this.y -= 85;
    }

    if (e == 'down') {
        this.y += 85;
    }

    if (this.y < -10) {
        this.updateScore();

    }
    if (this.y > 420) {
        this.y -= 85 * 2;
    }
    if (this.x > 420) {
        this.x -= 101 * 3;
    }
    if (this.x < -20) {
        this.x += 101 * 3;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-10, 63), new Enemy(-10, 146), new Enemy(-10, 232)];
var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
