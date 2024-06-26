window.addEventListener('focus', initialize);
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    context.lineWidth = 3;
})

const canvas = document.getElementById('headerCanvas');
canvas.width = window.innerWidth;
canvas.height = 250;

const context = canvas.getContext('2d');
context.lineWidth = 3;

let previousTime_ms;

let fishies = []

class Fish {
    static SPEED = 200;
    static ALPHA_SPEED = 0.5;
    static WIGGLE_SPEED = 6;

    static WIDTH_RATIO = 0.15;
    static BODY_RATIO = 0.4;
    static TAIL_LENGTH_RATIO = 0.4;
    static TAIL_WIDTH_RATIO = 0.1;

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = 10 + Math.random() * 40; 

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

        context.restore()
    }

    getAlpha() {
        return (Math.sin(this.alphaRadians) + 1)/2
    }
}

function newFish(isStartingOnTop = false) {
    let x = Math.random() * (canvas.width + canvas.height) - canvas.height;
    let y;
     
    if (isStartingOnTop) {
        y = 0;
    } else {
        y = Math.random() * canvas.height;
    }
    return new Fish(x, y);
}

function update() {
    const currentTime_ms = performance.now();
    const deltaTime = (currentTime_ms - previousTime_ms)/1000;
    previousTime_ms = currentTime_ms;

    for (let i=0; i<fishies.length; i++) {
        fishies[i].update(deltaTime);
        if (fishies[i].x > canvas.width+60 || fishies[i].y > canvas.height+60) {
            fishies[i] = newFish(true);
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

function initialize() {
    fishies = [];
    for (i=0; i<150; i++) {
        fishies.push(newFish());
    }
}

initialize();
update();