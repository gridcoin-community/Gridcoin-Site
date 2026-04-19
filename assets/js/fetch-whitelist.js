/**
 * fetch-whitelist.js — Dynamic project whitelist table
 *
 * Fetches live network status from the Gridcoin API proxy and merges it
 * with static project data (descriptions, CPU/GPU support, team links)
 * embedded in the page by Jekyll from _data/whitelist.yml.
 *
 * Falls back to the static table if the API is unreachable.
 */

const API_URL = (function() {
    const host = window.location.hostname;
    const port = window.location.port;
    // Production: use the dedicated API subdomain.
    if (host === "gridcoin.us" || host === "www.gridcoin.us") {
        return "https://api.gridcoin.us/api/v1/network-status";
    }
    // Jekyll dev server binds to port 4001 and has no reverse-proxy of
    // its own — hop sideways to the FastAPI proxy on :5000 of the same
    // host (proxy CORS must allow the Jekyll origin).
    if (port === "4001") {
        return `${window.location.protocol}//${host}:5000/api/v1/network-status`;
    }
    // Everything else (Caddy staging on :81, same-origin prod reverse-proxy)
    // serves the API under the same origin via /api/v1/*.
    return "/api/v1/network-status";
})();

/**
 * Format a large number with commas (e.g. 792425874 → "792,425,874").
 */
function formatNumber(n) {
    if (n === undefined || n === null) return "—";
    return Number(n).toLocaleString();
}

/**
 * Format a large number in a compact form (e.g. 792425874 → "792.4M").
 */
function formatCompact(n) {
    if (n === undefined || n === null) return "—";
    n = Number(n);
    if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
    if (n >= 1e9)  return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6)  return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3)  return (n / 1e3).toFixed(1) + "K";
    return n.toString();
}

/**
 * Determine the display status and CSS class for a project.
 */
function projectStatus(proj) {
    const status = proj.status || "Unknown";

    if (status === "Automatically Greylisted" || status === "Manually Greylisted") {
        return { text: "Greylisted", cssClass: "status-greylisted" };
    }
    if (status === "Active" && proj.in_superblock === false) {
        return { text: "Excluded", cssClass: "status-excluded" };
    }
    if (status === "Active") {
        return { text: "Active", cssClass: "status-active" };
    }
    return { text: status, cssClass: "" };
}

/**
 * Normalize a project name for matching between the API (e.g. "Amicable_Numbers")
 * and the static YAML data (e.g. "Amicable Numbers").
 */
function normalizeProjectName(name) {
    return name.toLowerCase().replace(/[\s_@]+/g, "").replace(/-/g, "");
}

/**
 * Build a lookup table from the static project data embedded in the page.
 */
function buildStaticLookup() {
    const el = document.getElementById("static-project-data");
    if (!el) return {};

    let data;
    try {
        data = JSON.parse(el.textContent);
    } catch (e) {
        console.error("Failed to parse static project data:", e);
        return {};
    }

    const lookup = {};
    for (const proj of data) {
        const key = normalizeProjectName(proj.name);
        lookup[key] = proj;
    }
    return lookup;
}

/**
 * Render the superblock summary header.
 */
function renderSuperblockHeader(sb, totalWhitelisted) {
    const el = document.getElementById("superblock-info");
    if (!el || !sb) return;

    el.innerHTML = `
        <div class="row text-center mb-3">
            <div class="col-6 col-md-3">
                <strong>Whitelisted Projects</strong><br>${totalWhitelisted} (${sb.total_projects} in superblock)
            </div>
            <div class="col-6 col-md-3">
                <strong>Active Beacons</strong><br>${formatNumber(sb.active_beacons)}
            </div>
            <div class="col-6 col-md-3">
                <strong>Total CPIDs</strong><br>${formatNumber(sb.total_cpids)}
            </div>
            <div class="col-6 col-md-3">
                <strong>Superblock Height</strong><br>${formatNumber(sb.height)}
            </div>
        </div>
        <p class="text-muted text-center mb-0"><small>Last superblock: ${sb.date} | Total magnitude: ${formatNumber(sb.total_magnitude)}</small></p>
    `;
    el.style.display = "";
}

/**
 * Render the dynamic project table.
 */
function renderProjectTable(apiProjects, staticLookup) {
    const tbody = document.getElementById("project-table-body");
    if (!tbody) return;

    // Sort projects: active first, then greylisted, then excluded.
    const sortOrder = { "Active": 0, "Excluded": 1, "Greylisted": 2 };
    const entries = Object.entries(apiProjects).sort((a, b) => {
        const sa = projectStatus(a[1]).text;
        const sb = projectStatus(b[1]).text;
        const orderDiff = (sortOrder[sa] || 9) - (sortOrder[sb] || 9);
        if (orderDiff !== 0) return orderDiff;
        return a[0].localeCompare(b[0]);
    });

    let html = "";
    for (const [name, proj] of entries) {
        const status = projectStatus(proj);
        const staticKey = normalizeProjectName(name);
        const staticData = staticLookup[staticKey] || {};

        const displayName = proj.display_name || staticData.name || name;
        const projectUrl = staticData.link || proj.display_url || "#";
        const goal = staticData.goal || "";
        const sponsor = staticData.sponsor || "";

        // CPU column — green fill for yes, red for no
        const hasCpu = staticData.cpu === "yes";
        const cpuCell = hasCpu ? "✔️" : "❌";
        const cpuClass = hasCpu ? "table-color-yes" : "table-color-no";

        // GPU column — vendor badges or red X
        const hasGpu = staticData.gpu !== "no" && (
            staticData.nvidia === "yes" || staticData.amd === "yes" || staticData.intel === "yes"
        );
        let gpuCell = "";
        if (staticData.nvidia === "yes") gpuCell += '<img src="/assets/img/nvidia_badge.png" height="40"> ';
        if (staticData.amd === "yes") gpuCell += '<img src="/assets/img/amd_badge.png" height="50"> ';
        if (staticData.intel === "yes") gpuCell += '<img src="/assets/img/intel_badge.png" height="40"> ';
        if (!gpuCell) gpuCell = "❌";
        const gpuClass = hasGpu ? "table-color-yes" : "table-color-no";

        // GDPR — driven dynamically from the API's gdpr_controls field,
        // with static data providing the project-specific enable-steps link.
        // Falls back to the general GDPR guide if no project-specific link.
        const gdprRequired = proj.gdpr_controls === true;
        let gdprCell = "not required";
        let gdprClass = "";
        if (gdprRequired) {
            const gdprLink = staticData["gdpr-enable-steps"] || "/guides/gdpr-stats-export.htm";
            gdprCell = `<a href="${gdprLink}">required <span class="oi oi-warning"></span></a>`;
            gdprClass = "table-color-gdpr-yes";
        }

        // Team link
        const teamLink = staticData.team
            ? `<a href="${staticData.team}" title="Gridcoin Team">📊</a>`
            : "";

        // Stats link
        const statsLink = staticData.stats
            ? `<a href="${staticData.stats}" title="Project Stats">📈</a>`
            : (proj.stats_url ? `<a href="${proj.stats_url}" title="Project Stats">📈</a>` : "");

        // Greylist health — ZCD/WAS not available until v13 hardfork activates
        // autogreylisting. If no projects have greylist data, show N/A.
        let healthCell = "N/A";
        if (proj.zcd !== undefined) {
            const wasDisplay = proj.was !== undefined ? proj.was.toFixed(2) : "—";
            healthCell = `ZCD: ${proj.zcd} / WAS: ${wasDisplay}`;
        }

        html += `<tr class="${status.cssClass}">
            <td><a href="${projectUrl}">${displayName}</a>
                ${status.text !== "Active" ? `<br><span class="${status.cssClass}">(${status.text})</span>` : ""}
            </td>
            <td class="d-none d-lg-table-cell">${goal}</td>
            <td class="d-none d-lg-table-cell">${sponsor}</td>
            <td><span class="badge bg-${status.text === 'Active' ? 'success' : status.text === 'Excluded' ? 'warning' : 'danger'}">${status.text}</span></td>
            <td class="text-end">${formatCompact(proj.rac)}</td>
            <td class="text-end d-none d-md-table-cell">${formatCompact(proj.total_credit)}</td>
            <td class="text-end d-none d-md-table-cell">${proj.cpid_count !== undefined ? formatNumber(proj.cpid_count) : "—"}</td>
            <td class="${cpuClass} d-none d-lg-table-cell">${cpuCell}</td>
            <td class="${gpuClass} d-none d-lg-table-cell">${gpuCell}</td>
            <td class="${gdprClass} d-none d-xl-table-cell">${gdprCell}</td>
            <td class="d-none d-xl-table-cell">${healthCell}</td>
            <td>${teamLink} ${statsLink}</td>
        </tr>`;
    }

    tbody.innerHTML = html;
}

/**
 * Main: fetch API data and render the dynamic table.
 */
function initWhitelist() {
    const staticLookup = buildStaticLookup();
    const dynamicTable = document.getElementById("dynamic-whitelist");
    const staticTable = document.getElementById("static-whitelist");
    const apiError = document.getElementById("api-error");

    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!data || !data.projects) throw new Error("Invalid API response");

            const totalWhitelisted = Object.keys(data.projects).length;
            renderSuperblockHeader(data.superblock, totalWhitelisted);
            renderProjectTable(data.projects, staticLookup);

            // Show dynamic table, hide static fallback.
            if (dynamicTable) dynamicTable.style.display = "";
            if (staticTable) staticTable.style.display = "none";

        })
        .catch(error => {
            console.error("Failed to fetch network status:", error);
            // Keep the static table visible as fallback.
            if (apiError) {
                apiError.textContent = "Live data unavailable — showing cached information.";
                apiError.style.display = "";
            }
        });
}

// Run when the DOM is ready.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhitelist);
} else {
    initWhitelist();
}
