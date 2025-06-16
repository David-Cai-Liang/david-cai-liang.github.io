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
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Set theme on initial load
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}


// Function to update the text of the "Open All / Close All" button
// based on the state of its sub-collapsibles
function updateToggleAllButtonText(sectionId, buttonId) {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);
    if (!section || !button) return;

    const collapsibles = section.getElementsByClassName("collapsible");
    let anyOpen = false;

    for (let i = 0; i < collapsibles.length; i++) {
        const content = collapsibles[i].nextElementSibling;
        if (collapsibles[i].classList.contains("active") && content.style.maxHeight && content.style.maxHeight !== "0px" && content.style.maxHeight !== "") {
            anyOpen = true; // Found at least one open
            break;
        }
    }

    if (anyOpen) {
        button.textContent = button.textContent.replace('OPEN ALL', 'CLOSE ALL');
    } else {
        button.textContent = button.textContent.replace('CLOSE ALL', 'OPEN ALL');
    }
}


// Collapsible Headers (for individual items)
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) { // If it has a maxHeight set (meaning it's open)
            content.style.maxHeight = null; // Collapse it
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Expand it
        }

        // After an individual item is clicked, update its parent 'toggle all' button's text
        const parentSection = this.closest('.experience-section');
        if (parentSection) {
            const sectionId = parentSection.id;
            // Determine the button ID based on the section ID
            let buttonId = '';
            if (sectionId === 'section-internships') {
                buttonId = 'toggleAllInternships';
            } else if (sectionId === 'section-activities') {
                buttonId = 'toggleAllActivities';
            }
            if (buttonId) {
                updateToggleAllButtonText(sectionId, buttonId);
            }
        }
    });
}

// Function to handle opening/closing all items within a specific section
function toggleAllInSection(sectionId, buttonId) {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);
    if (!section || !button) {
        console.error(`Section or button not found: Section ID '${sectionId}', Button ID '${buttonId}'`);
        return;
    }

    const collapsibles = section.getElementsByClassName("collapsible");
    let anyOpen = false; // Flag to check if any individual collapsible is currently open

    // First, determine the current state of the section
    for (let i = 0; i < collapsibles.length; i++) {
        const content = collapsibles[i].nextElementSibling;
        if (collapsibles[i].classList.contains("active") && content.style.maxHeight && content.style.maxHeight !== "0px" && content.style.maxHeight !== "") {
            anyOpen = true; // Found at least one open
            break;
        }
    }

    if (anyOpen) {
        // If ANY are open, the button's action is to CLOSE ALL
        for (let i = 0; i < collapsibles.length; i++) {
            collapsibles[i].classList.remove("active");
            collapsibles[i].nextElementSibling.style.maxHeight = null; // Collapse
        }
        button.textContent = button.textContent.replace('CLOSE ALL', 'OPEN ALL'); // Update button text
    } else {
        // If NONE are open, the button's action is to OPEN ALL
        for (let i = 0; i < collapsibles.length; i++) {
            collapsibles[i].classList.add("active");
            collapsibles[i].nextElementSibling.style.maxHeight = collapsibles[i].nextElementSibling.scrollHeight + "px"; // Expand
        }
        button.textContent = button.textContent.replace('OPEN ALL', 'CLOSE ALL'); // Update button text
    }
}


// Event listener for "OPEN ALL WORK EXPERIENCES" button
document.getElementById('toggleAllInternships').addEventListener('click', function() {
    toggleAllInSection('section-internships', 'toggleAllInternships');
});

// Event listener for "OPEN ALL ADDITIONAL ACTIVITIES" button
document.getElementById('toggleAllActivities').addEventListener('click', function() {
    toggleAllInSection('section-activities', 'toggleAllActivities');
});


// Initial update of button text on page load
document.addEventListener('DOMContentLoaded', () => {
    // Call updateToggleAllButtonText for each section after all other scripts have run
    // Using a timeout to ensure all heights are calculated if content is dynamic
    setTimeout(() => {
        updateToggleAllButtonText('section-internships', 'toggleAllInternships');
        updateToggleAllButtonText('section-activities', 'toggleAllActivities');
    }, 100); // A small delay might be necessary depending on content loading
});
