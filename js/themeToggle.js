const toggleButton = document.getElementById('theme-toggle-button');
let isLightMode = true;

toggleButton.addEventListener('click', () => {
    if (isLightMode) {
        isLightMode = false;
        document.querySelectorAll('.light-mode').forEach(function(element) {
            element.classList.replace('light-mode', 'dark-mode');
        });
    } else {
        isLightMode = true;
        document.querySelectorAll('.dark-mode').forEach(function(element) {
            element.classList.replace('dark-mode', 'light-mode');
        });
    }
    toggleButton.innerText = isLightMode ? 'dark mode' : 'light mode';
});
