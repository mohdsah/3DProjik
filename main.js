// Basic THREE.js Setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Ground
let ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshLambertMaterial({color: 0x228B22})
);
ground.rotation.x = - Math.PI / 2;
scene.add(ground);

// Player
let player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshLambertMaterial({color: 0x00ff00})
);
player.position.y = 1;
scene.add(player);

// Monster
let monster = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshLambertMaterial({color: 0xff0000})
);
monster.position.set(5, 1, -5);
scene.add(monster);

// Health bar logic
let health = 100;
function updateHealthBar() {
    document.getElementById('healthbar').style.width = health + '%';
}

// Controls
let keys = {};
document.addEventListener('keydown', (e) => { keys[e.code] = true; });
document.addEventListener('keyup', (e) => { keys[e.code] = false; });

// Dash function
let dashCooldown = 0;

function animate() {
    requestAnimationFrame(animate);

    let speed = 0.1;
    if (dashCooldown <= 0 && keys['ShiftLeft']) {
        speed = 0.3;
        dashCooldown = 30; // cooldown for dash
    }
    if (dashCooldown > 0) dashCooldown--;

    if (keys['KeyW']) player.position.z -= speed;
    if (keys['KeyS']) player.position.z += speed;
    if (keys['KeyA']) player.position.x -= speed;
    if (keys['KeyD']) player.position.x += speed;

    // Attack monster
    if (keys['Space']) {
        let dist = player.position.distanceTo(monster.position);
        if (dist < 2) {
            scene.remove(monster);
        }
    }

    // Monster attack player
    let distToPlayer = player.position.distanceTo(monster.position);
    if (distToPlayer < 2) {
        health -= 0.2;
        if (health <= 0) {
            health = 0;
            alert("Game Over!");
            location.reload();
        }
        updateHealthBar();
    }

    camera.position.set(player.position.x, player.position.y + 5, player.position.z + 10);
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}

animate();
