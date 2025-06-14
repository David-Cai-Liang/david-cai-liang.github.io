function openEmail() {
    var email = 'davidcailiang9@gmail.com';
    var subject = 'Question';
    var stuff = 'Hello,\n\nI have a question:';
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(stuff);
}

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const prismLight = document.getElementById("prism-light-theme");
const prismDark = document.getElementById("prism-dark-theme");

function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    //
    if (theme === 'light') {
      prismLight.removeAttribute("disabled");
      prismDark.setAttribute("disabled", true);
      themeToggle.textContent = "🌙";
    } else {
      prismLight.setAttribute("disabled", true);
      prismDark.removeAttribute("disabled");
      themeToggle.textContent = "☀️";
    }
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    //
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}
