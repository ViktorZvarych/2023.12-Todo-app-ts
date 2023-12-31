// ------Theme toggle----
const themeToggle = () => {
    const themeToggleInput = document.getElementById('switchThemeInput');
    const themeToggleLabel = document.getElementById('switchThemeLabel');
    themeToggleInput.onclick = () => {
        themeToggleLabel.innerText = !themeToggleInput.checked
            ? 'Change to light theme'
            : 'Change to dark theme';
        const htmlElement = document.querySelector('html');
        themeToggleInput.checked
            ? htmlElement.setAttribute('data-bs-theme', 'light')
            : htmlElement.setAttribute('data-bs-theme', 'dark');
    };
};
export default themeToggle;
