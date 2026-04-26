/**
 * fetch-cpid-sand.js — stacked-area ("sand") chart of a single CPID's
 * magnitude distributed across projects over time.
 *
 * Loads the full CPID list on init to populate a native <datalist>-
 * driven autocomplete; renders the sand chart on demand when the user
 * picks a CPID and hits the Show button. Re-uses Chart.js already
 * loaded by the analytics page.
 */

function hslColor(i, total) {
    const h = Math.round((360 * i) / Math.max(total, 1));
    return `hsl(${h}, 65%, 48%)`;
}

const sandState = {
    chart: null,
    cpidsByHex: new Map(),
};

function populateCpidDatalist() {
    const list  = document.getElementById("cpid-sand-list");
    const input = document.getElementById("cpid-sand-input");
    const hint  = document.getElementById("cpid-sand-autocomplete-hint");
    if (!list) return;

    if (hint) hint.textContent = "Loading autocomplete list…";

    fetch(window.analyticsApi("/api/v1/history/cpids"))
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
        .then(payload => {
            const rows = payload.data || [];
            const frag = document.createDocumentFragment();
            for (const row of rows) {
                sandState.cpidsByHex.set(row.cpid, row);
                const opt = document.createElement("option");
                opt.value = row.cpid;
                // Label shown in the dropdown hint column — days active + last seen.
                opt.label = `active ${row.days_active}d · last ${row.last_seen}`;
                frag.appendChild(opt);
            }
            list.appendChild(frag);
            // Chromium quirk: datalist options appended while the input is
            // focused aren't re-indexed until focus is lost and regained.
            // Firing a synthetic `input` event forces a re-scan so prefix
            // matching starts working immediately.
            if (input) input.dispatchEvent(new Event("input"));
            if (hint) hint.textContent = `${rows.length.toLocaleString()} CPIDs available for autocomplete.`;
        })
        .catch(err => {
            console.error("Failed to load CPID list:", err);
            if (hint) hint.textContent = "Couldn't load autocomplete list.";
            window.analyticsError("Couldn't load CPID autocomplete list.");
        });
}

function pivotByProject(rows) {
    // Input: [{obs_date, project, mag}, ...] sorted by date, project.
    // Output: {labels: [dates], datasets: [{label: project, data: [mag-per-date]}, ...]}
    const dateSet = new Set();
    const perProject = new Map();
    for (const r of rows) {
        dateSet.add(r.obs_date);
        if (!perProject.has(r.project)) perProject.set(r.project, new Map());
        perProject.get(r.project).set(r.obs_date, r.mag);
    }
    const dates = Array.from(dateSet).sort();
    const projects = Array.from(perProject.keys()).sort();
    const datasets = projects.map((p, i) => ({
        label: p,
        data: dates.map(d => perProject.get(p).get(d) ?? 0),
        borderColor: hslColor(i, projects.length),
        backgroundColor: hslColor(i, projects.length),
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.1,
        fill: true,
    }));
    return { labels: dates, datasets };
}

function renderSandChart(rows) {
    const canvas = document.getElementById("cpid-sand-chart");
    if (!canvas || !window.Chart) return;

    if (sandState.chart) {
        sandState.chart.destroy();
        sandState.chart = null;
    }

    if (rows.length === 0) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const { labels, datasets } = pivotByProject(rows);

    const grid = window.softGridStyle ? window.softGridStyle() : { xGrid: {}, yGrid: {} };
    // The sand chart re-instantiates on every CPID selection. Reading the
    // cached resolved lists keeps this sync — on the very first selection
    // before the releases / block-versions fetches have settled we just
    // skip those markers and fall back to quarterly-only annotations.
    const releases = window.analyticsReleases || [];
    const activations = window.analyticsBlockVersions || [];
    const annotations = window.buildChartAnnotations
        ? window.buildChartAnnotations(labels, releases, activations)
        : {};

    sandState.chart = new Chart(canvas, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                title: {
                    display: true,
                    text: "CPID magnitude by project over time (stacked)",
                },
                legend: {
                    position: "bottom",
                    labels: { boxWidth: 12, padding: 8 },
                },
                tooltip: { mode: "index", intersect: false },
                annotation: { annotations },
            },
            scales: {
                x: {
                    ticks: window.yearlyXTicksConfig
                        ? window.yearlyXTicksConfig(labels)
                        : { maxTicksLimit: 12, autoSkip: true },
                    title: { display: true, text: "Date" },
                    grid: grid.xGrid,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: { display: true, text: "Magnitude" },
                    grid: grid.yGrid,
                },
            },
        },
    });
}

// `loadSandChart` is callable as `window.loadSandChart` from
// fetch-top-cpids.js — top-level function declarations in classic
// scripts are automatically global-object properties.
function loadSandChart() {
    const input   = document.getElementById("cpid-sand-input");
    const loading = document.getElementById("cpid-sand-loading");
    const status  = document.getElementById("cpid-sand-status");

    const cpid = (input ? input.value.trim().toLowerCase() : "");
    if (!/^[0-9a-f]{32}$/.test(cpid)) {
        if (status) status.textContent = "Enter a 32-character hex CPID.";
        return;
    }
    if (status) {
        const meta = sandState.cpidsByHex.get(cpid);
        if (meta) {
            status.textContent = `first seen ${meta.first_seen}, last seen ${meta.last_seen}, active ${meta.days_active} days, lifetime mag ${Math.round(meta.lifetime_mag_sum).toLocaleString()}`;
        } else {
            status.textContent = "CPID not found in history — chart will be empty.";
        }
    }

    if (loading) loading.style.display = "";
    fetch(window.analyticsApi(`/api/v1/history/cpid-project-magnitude?cpid=${encodeURIComponent(cpid)}`))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            renderSandChart(payload.data || []);
        })
        .catch(err => {
            console.error("Failed to load cpid-project-magnitude:", err);
            window.analyticsError("Couldn't load CPID sand chart data.");
        })
        .finally(() => {
            if (loading) loading.style.display = "none";
        });
}

function initCpidSand() {
    const input = document.getElementById("cpid-sand-input");
    const btn   = document.getElementById("cpid-sand-render");

    if (btn)   btn.addEventListener("click", loadSandChart);
    if (input) input.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); loadSandChart(); }
    });

    populateCpidDatalist();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCpidSand);
} else {
    initCpidSand();
}
