const littleme = document.getElementById("littleme");

littleme.addEventListener('click', startAnimation)

const duration_ms = 1500;
let startTime;
let bounceFactor;

function startAnimation() {
    startTime = performance.now();
    animateBounce();
    
    console.log(`sfx/${Math.floor(Math.random()*21)}.mp3`);
    const sound = new Audio(`sfx/${Math.floor(Math.random()*28.99)}.mp3`);
    sound.play();
}

function animateBounce() {
    let timeElapsed = performance.now() - startTime;
    bounceFactor = easeOutElastic(timeElapsed/duration_ms);

    if (timeElapsed < duration_ms) {
        requestAnimationFrame(animateBounce);
    } else {
        timeElapsed = duration_ms;
    }
    littleme.style.width = `${(1-bounceFactor)*240+bounceFactor*160}px`;
    littleme.style.height = `${(1-bounceFactor)*160+bounceFactor*320}px`;
    littleme.style.top = `${(1-bounceFactor)*80+bounceFactor*(-37)}px`;
    littleme.style.right = `calc(50% - ${(1-bounceFactor)*460+bounceFactor*420}px)`;
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}