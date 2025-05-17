const stoopidCatImage = document.getElementById("stoopidcat");
window.addEventListener('DOMContentLoaded', changeStoopidCatImage);
stoopidCatImage.addEventListener('click', changeStoopidCatImage);

function changeStoopidCatImage() {
    stoopidCatImage.src = `images/cat doodles/${Math.floor(Math.random()*25.99)}.png`;
}