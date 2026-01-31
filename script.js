// ダークモード切替
document.addEventListener("DOMContentLoaded", () => {
    const toggleDark = document.getElementById("toggleDark");
    const toggleLang = document.getElementById("toggleLang");

    toggleDark.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });

    // 言語切替
    toggleLang.addEventListener("click", () => {
        const jpElements = document.querySelectorAll("[data-lang='jp']");
        const enElements = document.querySelectorAll("[data-lang='en']");
        if (jpElements[0].style.display !== "none") {
            jpElements.forEach(e => e.style.display = "none");
            enElements.forEach(e => e.style.display = "inline");
        } else {
            jpElements.forEach(e => e.style.display = "inline");
            enElements.forEach(e => e.style.display = "none");
        }
    });
});
