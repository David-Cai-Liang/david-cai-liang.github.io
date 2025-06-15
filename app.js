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

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var toggleAllBtn = document.getElementById("toggleAll");
var isAllOpen = false; // State tracker

// Toggle All button behavior
toggleAllBtn.addEventListener("click", function () {
  isAllOpen = !isAllOpen; // Flip state
  if (isAllOpen) {
      toggleAllBtn.textContent = "CLOSE ALL EXPERIENCES";
  }
  else {
    toggleAllBtn.textContent = "OPEN ALL EXPERIENCES";
  }
  for (i = 0; i < coll.length; i++) {
    var content = coll[i].nextElementSibling;
    if (isAllOpen) {
      coll[i].classList.add("active");
      content.style.display = "block";
    } else {
      coll[i].classList.remove("active");
      content.style.display = "none";
    }
  }
}
)
