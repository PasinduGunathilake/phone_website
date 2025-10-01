let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

// function to enable dark mode
const enableDarkMode = () => {
    document.body.classList.add("darkMode"); // Use "darkMode" for consistency with CSS
    localStorage.setItem("darkmode", "active");
}

// function to disable dark mode
const disableDarkMode = () => {
    document.body.classList.remove("darkMode");
    localStorage.setItem("darkmode", "inactive"); // Use "inactive" or removeItem
}

if(darkmode === "active") {
    enableDarkMode();
} else {
    disableDarkMode();
}

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode !== "active") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});