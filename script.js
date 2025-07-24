/* //const SHEETBEST_URL = "https://api.sheetbest.com/sheets/2da9e31a-980d-48cb-b21d-1105f3e3abec";
const SHEETBEST_URL = "https://script.google.com/macros/s/AKfycbzZDy_6SToBzVNOGhDQUbxDPAleEzGSJARgfNaaDEq-shq2g4RtNMPJsvMD7-ETrpgl/exec";


let musics = [];
let filteredMusics = [];
let currentPage = 1;
const pageSize = 50;

async function fetchSheetData() {
    try {
        const res = await fetch(SHEETBEST_URL);
        if (!res.ok) throw new Error("Erro ao buscar dados.");
        musics = await res.json();
        // Garante campos padrão (ajusta nomes se vierem diferentes)
        musics = musics.map(obj => ({
            Codigo: obj.Codigo || obj.codigo || obj.CÓDIGO || "",
            Interprete: obj.Interprete || obj.interprete || obj.INTÉRPRETE || "",
            Musica: obj.Musica || obj.musica || obj.MÚSICA || "",
            Idioma: obj.Idioma || obj.idioma || obj.IDIOMA || ""
        }));
        filteredMusics = musics;
        renderTable();
        renderPagination();
    } catch (err) {
        document.querySelector("#musics-table tbody").innerHTML =
            `<tr><td colspan="4" style="color:var(--text-light);text-align:center;">Não foi possível carregar os dados.<br>Verifique a URL da API SheetBest.</td></tr>`;
    }
}

function renderTable() {
    const tbody = document.querySelector("#musics-table tbody");
    tbody.innerHTML = "";
    const startIdx = (currentPage - 1) * pageSize;
    const items = filteredMusics.slice(startIdx, startIdx + pageSize);

    for (const item of items) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.Codigo || ""}</td>
          <td>${item.Interprete || ""}</td>
          <td>${item.Musica || ""}</td>
          <td>${item.Idioma || ""}</td>
        `;
        tbody.appendChild(tr);
    }
    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:#94a3ba;text-align:center;">Nenhum resultado encontrado.</td></tr>`;
    }
}

function renderPagination() {
    const totalPages = Math.ceil(filteredMusics.length / pageSize);
    const pagDiv = document.getElementById("pagination");
    pagDiv.innerHTML = "";
    if (totalPages <= 1) return;
    let start = Math.max(1, currentPage - 2), end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

    if (start > 1) {
        pagDiv.appendChild(pageBtn(1));
        if (start > 2) pagDiv.appendChild(ellipsis());
    }
    for (let i = start; i <= end; i++) pagDiv.appendChild(pageBtn(i));
    if (end < totalPages) {
        if (end < totalPages - 1) pagDiv.appendChild(ellipsis());
        pagDiv.appendChild(pageBtn(totalPages));
    }

    function pageBtn(num) {
        const btn = document.createElement("button");
        btn.textContent = num;
        if (num === currentPage) btn.classList.add("active");
        btn.onclick = () => { currentPage = num; renderTable(); renderPagination(); }
        return btn;
    }
    function ellipsis() {
        const el = document.createElement("span");
        el.textContent = "...";
        el.style.margin = "0 4px";
        el.style.color = "#bbb";
        el.style.fontWeight = "bold";
        return el;
    }
}

document.getElementById("search").addEventListener("input", function () {
    const q = this.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    filteredMusics = musics.filter(item => {
        return (
            (item.Codigo && item.Codigo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q)) ||
            (item.Interprete && item.Interprete.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q)) ||
            (item.Musica && item.Musica.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q)) ||
            (item.Idioma && item.Idioma.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q))
        );
    });

    currentPage = 1;
    renderTable();
    renderPagination();
});

fetchSheetData(); */



// Cole a URL do seu Apps Script aqui:
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzZDy_6SToBzVNOGhDQUbxDPAleEzGSJARgfNaaDEq-shq2g4RtNMPJsvMD7-ETrpgl/exec";

let musics = [];
let filteredMusics = [];
let currentPage = 1;
const pageSize = 15;

async function fetchSheetData() {
    try {
        const res = await fetch(SHEET_API_URL);
        if (!res.ok) throw new Error("Erro ao buscar dados.");
        musics = await res.json();
        musics = musics.map(obj => ({
            Codigo: obj.Codigo || obj.codigo || obj.CÓDIGO || "",
            Interprete: obj.Interprete || obj.interprete || obj.INTÉRPRETE || "",
            Musica: obj.Musica || obj.musica || obj.MÚSICA || "",
            Idioma: obj.Idioma || obj.idioma || obj.IDIOMA || ""
        }));

        // *** Ordenação automática pelo campo Idioma ***
        musics.sort((a, b) => a.Idioma.localeCompare(b.Idioma, 'pt-BR', { sensitivity: 'base' }));

        filteredMusics = musics;
        renderTable();
        renderPagination();
    } catch (err) {
        document.querySelector("#musics-table tbody").innerHTML =
            `<tr><td colspan="4" style="color:var(--text-light);text-align:center;">Não foi possível carregar os dados.<br>Verifique a URL da API.</td></tr>`;
    }
}

function renderTable() {
    const tbody = document.querySelector("#musics-table tbody");
    tbody.innerHTML = "";
    const startIdx = (currentPage - 1) * pageSize;
    const items = filteredMusics.slice(startIdx, startIdx + pageSize);

    for (const item of items) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.Codigo || ""}</td>
          <td>${item.Interprete || ""}</td>
          <td>${item.Musica || ""}</td>
          <td>${item.Idioma || ""}</td>
        `;
        tbody.appendChild(tr);
    }
    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:#94a3ba;text-align:center;">Nenhum resultado encontrado.</td></tr>`;
    }
}

function renderPagination() {
    const totalPages = Math.ceil(filteredMusics.length / pageSize);
    const pagDiv = document.getElementById("pagination");
    pagDiv.innerHTML = "";
    if (totalPages <= 1) return;
    let start = Math.max(1, currentPage - 2), end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

    if (start > 1) {
        pagDiv.appendChild(pageBtn(1));
        if (start > 2) pagDiv.appendChild(ellipsis());
    }
    for (let i = start; i <= end; i++) pagDiv.appendChild(pageBtn(i));
    if (end < totalPages) {
        if (end < totalPages - 1) pagDiv.appendChild(ellipsis());
        pagDiv.appendChild(pageBtn(totalPages));
    }

    function pageBtn(num) {
        const btn = document.createElement("button");
        btn.textContent = num;
        if (num === currentPage) btn.classList.add("active");
        btn.onclick = () => { currentPage = num; renderTable(); renderPagination(); }
        return btn;
    }
    function ellipsis() {
        const el = document.createElement("span");
        el.textContent = "...";
        el.style.margin = "0 4px";
        el.style.color = "#bbb";
        el.style.fontWeight = "bold";
        return el;
    }
}

document.getElementById("search").addEventListener("input", function () {
    const q = this.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    filteredMusics = musics.filter(item => {
        return (
            String(item.Codigo).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q) ||
            String(item.Interprete).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q) ||
            String(item.Musica).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q) ||
            String(item.Idioma).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(q)
        );
    });

    currentPage = 1;
    renderTable();
    renderPagination();
});

fetchSheetData();
