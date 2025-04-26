const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rotateMessage = document.getElementById('rotate-message');

function resizeCanvas() {
  if (window.innerWidth < window.innerHeight) {
    // Portrait
    rotateMessage.style.display = 'none';
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    // Landscape
    rotateMessage.style.display = 'block';
    canvas.style.display = 'none';
  }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);

resizeCanvas(); // Initial call

// Player object
const player = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  width: 32,
  height: 48,
  speed: 3,
  sprite: new Image()
};

player.sprite.src = 'assets/player.png';

// Key press tracking
const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Draw player function
function drawPlayer() {
  ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
  if (canvas.style.display !== 'none') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

    // Draw player
    drawPlayer();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
