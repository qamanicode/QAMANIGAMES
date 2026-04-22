// Pong Game JavaScript Logic

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10;
const paddleHeight = 100;
const playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#0095DD', score: 0 };
const computerPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#0095DD', score: 0 };

// Create the pong ball
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 5, velocityX: 5, velocityY: 5, color: '#0095DD' };

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height, playerPaddle.color);
    drawRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height, computerPaddle.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    let player = (ball.x < canvas.width / 2) ? playerPaddle : computerPaddle;
    if (collisionDetect(ball, player)) {
        ball.velocityX = -ball.velocityX;
    }

    // Update computer paddle position
    computerPaddle.y = ball.y - computerPaddle.height / 2;
}

function collisionDetect(ball, paddle) {
    return ball.x + ball.radius > paddle.x &&
           ball.x - ball.radius < paddle.x + paddle.width &&
           ball.y + ball.radius > paddle.y &&
           ball.y - ball.radius < paddle.y + paddle.height;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
}

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    playerPaddle.y = event.clientY - rect.top - playerPaddle.height / 2;
});

// Main game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();