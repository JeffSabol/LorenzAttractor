// Jeff Sabol 01-21-2024
// I wanted to learn more about chaos theory
// https://en.wikipedia.org/wiki/Lorenz_system

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Input params
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
// let x = 0.01, y = 0, z = 0;
let x = Math.random() * 0.01;
let y = Math.random() * 0.01;
let z = Math.random() * 0.01;
let hue = Math.floor(Math.random() * 360);

function setupCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
}

let i = 0; // Draw iterations
const totalIterations = 100000; // Total points to draw

function drawPoint() {
    const dt = 0.01;
    const scale = 10;
    const pointsPerFrame = 16;

    for (let j = 0; j < pointsPerFrame; j++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;

        x += dx;
        y += dy;
        z += dz;

        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // 100% saturation, 50% lightness

        ctx.beginPath();
        ctx.arc(x * scale, z * scale - 200, 0.5, 0, 2 * Math.PI);
        // ctx.fillStyle = 'rgba(0, 250, 255, 0.5)'; // My favorite color
        ctx.fill();

    }
    hue = (hue + 1) % 360; // Cycle back to 0 after reaching 360

    i += pointsPerFrame;
    if (i < totalIterations) {
        requestAnimationFrame(drawPoint);
    }
}

function drawInstantly() {
    const dt = 0.01;
    const scale = 10;
    
    x = 0.01;
    y = 0;
    z = 0;

    const totalIterations = 100000;

    for (let i = 0; i < totalIterations; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;

        x += dx;
        y += dy;
        z += dz;

        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`; // 100% saturation, 50% lightness

        ctx.beginPath();
        ctx.arc(x * scale, z * scale - 200, 0.5, 0, 2 * Math.PI);
        ctx.fill();

        // Increment the hue to gradually change colors
        hue = (hue + 1) % 360; // Cycle back to 0 after reaching 360
    }
}


function instantDraw(){
    setupCanvas();
    drawInstantly();
}

function main() {
    setupCanvas();
    drawPoint();
}

main()