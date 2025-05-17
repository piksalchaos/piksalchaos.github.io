const stoopidCat = document.getElementById("stoopidcat");
window.addEventListener('DOMContentLoaded', changeImage);
stoopidCat.addEventListener('click', startAnimation);

function changeImage() {
    stoopidCat.src = `images/cat doodles/${Math.floor(Math.random()*25.99)}.png`;
}

const duration_ms = 1500;
let startTime;
let bounceFactor;

function startAnimation() {
    startTime = performance.now();
    animateJiggle();
    
    //console.log(`sfx/${Math.floor(Math.random()*21)}.mp3`);
    changeImage();
    const sound = new Audio(`sfx/${Math.floor(Math.random()*26.99)}.mp3`);
    sound.play();
}

function animateJiggle() {
    let timeElapsed = performance.now() - startTime;
    bounceFactor = easeOutElastic(timeElapsed/duration_ms);

    if (timeElapsed < duration_ms) {
        requestAnimationFrame(animateJiggle);
    } else {
        timeElapsed = duration_ms;
    }
    stoopidCat.style.transform = `scale(calc(${bounceFactor} * 0.3 + 0.7))`;
}

function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}