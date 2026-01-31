document.addEventListener("DOMContentLoaded", () => {
    const toggleDark = document.getElementById("toggleDark");
    const toggleLang = document.getElementById("toggleLang");

    toggleDark.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });

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

    // Modカード自動生成
    const modContainer = document.getElementById("modContainer");
    if (modContainer) {
        fetch('mods.json')
            .then(res => res.json())
            .then(mods => {
                mods.forEach(mod => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${mod.image}" alt="${mod.name_en}">
                        <h3 data-lang="en">${mod.name_en}</h3>
                        <h3 data-lang="jp" style="display:none">${mod.name_jp}</h3>
                        <p data-lang="en">${mod.description_en}</p>
                        <p data-lang="jp" style="display:none">${mod.description_jp}</p>
                        <a href="${mod.download}" target="_blank">
                            <button data-lang="en">Download</button>
                            <button data-lang="jp" style="display:none">ダウンロード</button>
                        </a>
                    `;
                    modContainer.appendChild(card);
                });
            });
    }
});
