document.addEventListener("DOMContentLoaded", () => {
    const darkButton = document.getElementById("darkButton");
    const langButton = document.getElementById("langButton");
    const modContainer = document.getElementById("modContainer");
    const modSearch = document.getElementById("modSearch");

    // ダーク/ライト切替
    darkButton.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });

    // EN/JP切替
    langButton.addEventListener("click", () => {
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

    let modsData = [];

    // Modカード生成関数
    const renderMods = (mods) => {
        modContainer.innerHTML = "";
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
    };

    // JSON読み込み
    fetch('mods.json')
        .then(res => res.json())
        .then(mods => {
            modsData = mods;
            renderMods(modsData);
        });

    // 検索機能
    if(modSearch){
        modSearch.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = modsData.filter(mod => 
                mod.name_en.toLowerCase().includes(keyword) ||
                mod.name_jp.toLowerCase().includes(keyword)
            );
            renderMods(filtered);
        });
    }
});
