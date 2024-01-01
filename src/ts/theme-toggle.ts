// ------Theme toggle----

const themeToggle = () => {
  const themeToggleInput = document.getElementById(
    'switchThemeInput'
  ) as HTMLInputElement;

  const themeToggleLabel = document.getElementById(
    'switchThemeLabel'
  ) as HTMLLabelElement;

  themeToggleInput.onclick = () => {
    themeToggleLabel.innerText = !themeToggleInput.checked
      ? 'Turn ON the lights'
      : 'Turn OFF the lights';

    const htmlElement = document.querySelector('html') as HTMLElement;
    themeToggleInput.checked
      ? htmlElement.setAttribute('data-bs-theme', 'light')
      : htmlElement.setAttribute('data-bs-theme', 'dark');
  };
};

export default themeToggle;