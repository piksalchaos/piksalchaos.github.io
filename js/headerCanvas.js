window.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        initialize();
    }, 200);
})

let resizeTimer;

const canvas = document.getElementById('headerCanvas');
const mainBody = document.getElementsByClassName("main")[0];

const context = canvas.getContext('2d');
context.lineWidth = 3;
const OFFSCREEN_OFFSET = 90

let previousTime_ms;

let fishies = [];

class Fish {
    static SPEED = 150;
    static ALPHA_SPEED = 0.5;
    static WIGGLE_SPEED = 5;

    static WIDTH_RATIO = 0.15;
    static BODY_RATIO = 0.4;
    static TAIL_LENGTH_RATIO = 0.4;
    static TAIL_WIDTH_RATIO = 0.1;


    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = 20 + Math.random() * 50; 

        this.angle = Math.PI*0.25 + (Math.random()-0.9)*0.25;
        this.wiggleRadians = Math.random() * Math.PI*2;

        const getRandomColorValue = () => (Math.random() + 0.7) * 255;
        this.alphaRadians = Math.random() * Math.PI*2;
        this.color = [getRandomColorValue(), getRandomColorValue(), getRandomColorValue()];
    }

    update(dt) {
        this.x += Math.cos(this.angle) * Fish.SPEED * dt;
        this.y += Math.sin(this.angle) * Fish.SPEED * dt;

        this.angle += Math.sin(this.wiggleRadians) * 0.025;
        
        this.wiggleRadians += Fish.WIGGLE_SPEED * dt;
        if (this.wiggleRadians > Math.PI*2) {
            this.wiggleRadians -= Math.PI*2;
        }

        this.alphaRadians += Fish.ALPHA_SPEED * dt;
        if (this.alphaRadians > Math.PI*2) {
            this.alphaRadians -= Math.PI*2;
        }
        //console.log(fishies.length);
    }

    draw(context) {
        context.save();

        const c = this.color
        context.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]}, ${this.getAlpha()})`;

        context.translate(this.x, this.y);
        context.rotate(this.angle);
        
        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(-this.size*Fish.BODY_RATIO*1.2, this.size*Fish.WIDTH_RATIO * 2);
        context.lineTo(-this.size*Fish.BODY_RATIO, this.size*Fish.WIDTH_RATIO);
        context.lineTo(-this.size, 0);
        context.lineTo(-this.size*Fish.BODY_RATIO, -this.size*Fish.WIDTH_RATIO);
        context.lineTo(-this.size*Fish.BODY_RATIO*1.2, -this.size*Fish.WIDTH_RATIO * 2);

        context.translate(-this.size, 0);
        context.rotate(-Math.cos(this.wiggleRadians) * 0.2);
        context.moveTo(0, 0);
        context.lineTo(-this.size*Fish.TAIL_LENGTH_RATIO, -this.size*Fish.TAIL_WIDTH_RATIO);
        context.lineTo(-this.size*Fish.TAIL_LENGTH_RATIO, this.size*Fish.TAIL_WIDTH_RATIO);
        context.closePath();

        context.fill();

        context.restore();
    }

    getAlpha() {
        return (Math.sin(this.alphaRadians) + 1)/2
    }
}

function newFish(yPosition = Math.random() * canvas.height) {
    let x = Math.random() * (canvas.width + canvas.height) - canvas.height;
    let y = yPosition;

    return new Fish(x, y);
}

function update() {
    const currentTime_ms = performance.now();
    const deltaTime = Math.min(currentTime_ms - previousTime_ms)/1000;
    previousTime_ms = currentTime_ms;

    for (let i=0; i<fishies.length; i++) {
        fishies[i].update(deltaTime);
        if (fishies[i].y > canvas.height+OFFSCREEN_OFFSET) {
            fishies[i] = newFish(fishies[i].y%(canvas.height+OFFSCREEN_OFFSET));
        }
        if (fishies[i].x > canvas.width+OFFSCREEN_OFFSET) {
            fishies[i] = newFish(fishies[i].x%(canvas.width+OFFSCREEN_OFFSET));
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i=0; i<fishies.length; i++) {
        fishies[i].draw(context);
    }
}

function setCanvasDimensions(canvas) {
    canvas.width = window.innerWidth
    canvas.height = Math.max(
        window.innerHeight,
        mainBody.scrollHeight + 500
    );
    //console.log(window.getComputedStyle(mainBody).marginTop);
}

function initialize() {
    setCanvasDimensions(canvas)
    fishies = [];
    for (i=0; i<(canvas.width*canvas.height) * 0.00006; i++) {
        fishies.push(newFish());
    }
}

update();