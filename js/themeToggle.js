const toggleButton = document.getElementById('theme-toggle-button');
let isLightMode = true;

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     isLightMode = false;
//     replaceEveryClass('light-mode', 'dark-mode');
//     toggleButton.innerText = 'light mode';
// }


toggleButton.addEventListener('click', () => {
    if (isLightMode) {
        isLightMode = false;
        replaceEveryClass('light-mode', 'dark-mode');
    } else {
        isLightMode = true;
        replaceEveryClass('dark-mode', 'light-mode');
    }
    toggleButton.innerText = isLightMode ? 'dark mode' : 'light mode';
});

function replaceEveryClass(oldClass, newClass) {
     document.querySelectorAll('.' + oldClass).forEach(function(element) {
            element.classList.replace(oldClass, newClass);
        });
}