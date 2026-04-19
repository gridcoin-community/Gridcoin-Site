/**
 * fetch-top-cpids.js — populate the top-CPIDs table and its project
 * filter dropdown. The dropdown is driven by /api/v1/history/projects;
 * choosing a project switches the query to the per-project leaderboard.
 */

function formatNumber(n, decimals) {
    if (n === undefined || n === null) return "—";
    const d = decimals === undefined ? 2 : decimals;
    return Number(n).toLocaleString(undefined, {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
    });
}

function shortCpid(hex) {
    if (!hex) return "";
    return hex.slice(0, 12) + "…";
}

function renderTopCpidsRows(rows) {
    const tbody = document.getElementById("top-cpids-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    rows.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-muted">${i + 1}</td>
            <td><code title="${row.cpid}">${shortCpid(row.cpid)}</code></td>
            <td class="text-end">${formatNumber(row.days_active, 0)}</td>
            <td class="text-end">${formatNumber(row.lifetime_mag_sum, 2)}</td>
            <td class="text-end">${formatNumber(row.lifetime_mag_avg_active, 2)}</td>
            <td class="text-end">${formatNumber(row.lifetime_mag_avg_elapsed, 2)}</td>
            <td>${row.first_seen || ""}</td>
            <td>${row.last_seen || ""}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Current sort key — kept in closure so header-click handlers and
// dropdown handlers refer to the same state.
let topCpidsOrderBy = "lifetime_mag_sum";

function updateSortIndicators() {
    document.querySelectorAll(".top-cpids-sort").forEach(th => {
        const key = th.dataset.order;
        const arrow = th.querySelector(".sort-arrow");
        if (arrow) arrow.remove();
        if (key === topCpidsOrderBy) {
            const span = document.createElement("span");
            span.className = "sort-arrow ms-1";
            span.textContent = "▼";
            th.appendChild(span);
        }
    });
}

function loadTopCpids() {
    const projectSel = document.getElementById("top-cpids-project");
    const limitSel   = document.getElementById("top-cpids-limit");
    const loading    = document.getElementById("top-cpids-loading");

    const project = projectSel ? projectSel.value : "";
    const limit   = limitSel   ? limitSel.value   : "100";

    let url = `/api/v1/history/top-cpids`
        + `?limit=${encodeURIComponent(limit)}`
        + `&order_by=${encodeURIComponent(topCpidsOrderBy)}`;
    if (project) url += `&project=${encodeURIComponent(project)}`;

    updateSortIndicators();
    if (loading) loading.style.display = "";
    fetch(window.analyticsApi(url))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            const rows = payload.data || [];
            renderTopCpidsRows(rows);
        })
        .catch(err => {
            console.error("Failed to load top-cpids:", err);
            window.analyticsError("Couldn't load top researchers.");
        })
        .finally(() => {
            if (loading) loading.style.display = "none";
        });
}

function populateProjectDropdown() {
    const sel = document.getElementById("top-cpids-project");
    if (!sel) return;

    fetch(window.analyticsApi("/api/v1/history/projects"))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            const rows = payload.data || [];
            for (const row of rows) {
                const opt = document.createElement("option");
                opt.value = row.name;
                opt.textContent = row.name;
                sel.appendChild(opt);
            }
        })
        .catch(err => {
            console.error("Failed to load project list:", err);
        });
}

function initTopCpids() {
    const projectSel = document.getElementById("top-cpids-project");
    const limitSel   = document.getElementById("top-cpids-limit");

    if (projectSel) projectSel.addEventListener("change", loadTopCpids);
    if (limitSel)   limitSel.addEventListener("change", loadTopCpids);

    document.querySelectorAll(".top-cpids-sort").forEach(th => {
        th.style.cursor = "pointer";
        th.addEventListener("click", () => {
            const key = th.dataset.order;
            if (!key || key === topCpidsOrderBy) return;
            topCpidsOrderBy = key;
            loadTopCpids();
        });
    });

    populateProjectDropdown();
    loadTopCpids();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTopCpids);
} else {
    initTopCpids();
}
