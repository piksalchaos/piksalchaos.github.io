window.addEventListener('focus', initialize);
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
})

const canvas = document.getElementById('headerCanvas');
canvas.width = window.innerWidth;
canvas.height = 250;

const context = canvas.getContext('2d');
context.lineWidth = 3;

let previousTime_ms;

let rainDrops = []

class RainDrop {
    static SPEED = 240;
    static ALPHA_SPEED = 0.5;
    static WIGGLE_SPEED = 7.5;
    static LENGTH = 30;

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.angle = Math.PI*0.25 + (Math.random()-0.5)*0.25;
        this.wiggleRadians = Math.random() * Math.PI*2;

        const randomColorValue = () => (Math.random() + 0.7) * 255;
        this.alphaRadians = Math.random() * Math.PI*2;
        this.color = [randomColorValue(), randomColorValue(), randomColorValue()];
    }

    update(dt) {
        this.x += Math.cos(this.angle) * RainDrop.SPEED * dt;
        this.y += Math.sin(this.angle) * RainDrop.SPEED * dt;

        this.angle += Math.sin(this.wiggleRadians) * 0.01;
        
        this.wiggleRadians += RainDrop.WIGGLE_SPEED * dt;
        if (this.wiggleRadians > Math.PI*2) {
            this.wiggleRadians -= Math.PI*2;
        }

        this.alphaRadians += RainDrop.ALPHA_SPEED * dt;
        if (this.alphaRadians > Math.PI*2) {
            this.alphaRadians -= Math.PI*2;
        }
    }

    draw(context) {
        const c = this.color
        context.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]}, ${this.getAlpha()})`;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(
            this.x-Math.cos(this.angle)*RainDrop.LENGTH,
            this.y-Math.sin(this.angle)*RainDrop.LENGTH
        );

        context.stroke();
    }

    getAlpha() {
        return (Math.sin(this.alphaRadians) + 1)/2
    }
}

function newRainDrop(isStartingOnTop = false) {
    let x = Math.random() * (canvas.width + canvas.height) - canvas.height;
    let y;
     
    if (isStartingOnTop) {
        y = 0;
    } else {
        y = Math.random() * canvas.height;
    }
    return new RainDrop(x, y);
}

function update() {
    const currentTime_ms = performance.now();
    const deltaTime = (currentTime_ms - previousTime_ms)/1000;
    previousTime_ms = currentTime_ms;

    for (let i=0; i<rainDrops.length; i++) {
        rainDrops[i].update(deltaTime);
        if (rainDrops[i].x > canvas.width+50 || rainDrops[i].y > canvas.height+50) {
            rainDrops[i] = newRainDrop(true);
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i=0; i<rainDrops.length; i++) {
        rainDrops[i].draw(context);
    }
}

function initialize() {
    rainDrops = [];
    for (i=0; i<150; i++) {
        rainDrops.push(newRainDrop());
    }
}

initialize();
update();