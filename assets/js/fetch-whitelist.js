/**
 * fetch-whitelist.js — Dynamic project whitelist table
 *
 * Fetches live network status from the Gridcoin API proxy and merges it
 * with static project data (descriptions, CPU/GPU support, team links)
 * embedded in the page by Jekyll from _data/whitelist.yml.
 *
 * Falls back to the static table if the API is unreachable.
 *
 * The host/port routing logic is shared with the analytics page via
 * window.analyticsApi() (assets/js/analytics-api.js, loaded ahead of
 * this script on whitelist.htm).
 */

// Local helper so the rest of this file reads naturally; keeps
// analytics-api.js as the one place those rules live.
function whitelistApiUrl() {
    return window.analyticsApi("/api/v1/network-status");
}

// Allow only http(s) and mailto URLs into href attributes — protects
// against `javascript:` / `data:` payloads if the API or static data
// ever returns an unexpected scheme. Returns "#" for anything else
// (or empty/missing input) so the link is rendered but harmless.
function safeUrl(url) {
    if (!url || typeof url !== "string") return "#";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (/^mailto:/i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
    return "#";
}

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

// Build a column cell — <strong>label</strong><br>value — without
// touching innerHTML on a string assembled from API data.
function summaryCell(label, value) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";
    const strong = document.createElement("strong");
    strong.textContent = label;
    col.appendChild(strong);
    col.appendChild(document.createElement("br"));
    col.appendChild(document.createTextNode(value));
    return col;
}

/**
 * Render the superblock summary header.
 */
function renderSuperblockHeader(sb, totalWhitelisted) {
    const el = document.getElementById("superblock-info");
    if (!el || !sb) return;

    el.replaceChildren();

    const row = document.createElement("div");
    row.className = "row text-center mb-3";
    row.appendChild(summaryCell(
        "Whitelisted Projects",
        `${totalWhitelisted} (${sb.total_projects} in superblock)`,
    ));
    row.appendChild(summaryCell("Active Beacons", formatNumber(sb.active_beacons)));
    row.appendChild(summaryCell("Total CPIDs",   formatNumber(sb.total_cpids)));
    row.appendChild(summaryCell("Superblock Height", formatNumber(sb.height)));
    el.appendChild(row);

    const p = document.createElement("p");
    p.className = "text-muted text-center mb-0";
    const small = document.createElement("small");
    small.textContent = `Last superblock: ${sb.date} | Total magnitude: ${formatNumber(sb.total_magnitude)}`;
    p.appendChild(small);
    el.appendChild(p);

    el.style.display = "";
}

// Tiny helpers to keep renderProjectTable readable while staying off
// innerHTML for any field that could carry API content.
function makeCell(opts) {
    const td = document.createElement("td");
    if (opts && opts.cls) td.className = opts.cls;
    if (opts && opts.text !== undefined) td.textContent = opts.text;
    return td;
}

function makeLink(href, text, title) {
    const a = document.createElement("a");
    a.href = safeUrl(href);
    a.textContent = text;
    if (title) a.title = title;
    return a;
}

function vendorBadgeImg(src, height) {
    const img = document.createElement("img");
    img.src = src;
    img.height = height;
    img.alt = "";
    return img;
}

/**
 * Render the dynamic project table.
 */
function renderProjectTable(apiProjects, staticLookup) {
    const tbody = document.getElementById("project-table-body");
    if (!tbody) return;

    // Sort projects: Active first, then Excluded (less severe — project
    // is whitelisted but its stats are stale), then Greylisted (most
    // severe — not earning rewards). Anything else falls to the bottom.
    const sortOrder = { "Active": 0, "Excluded": 1, "Greylisted": 2 };
    const entries = Object.entries(apiProjects).sort((a, b) => {
        const sa = projectStatus(a[1]).text;
        const sb = projectStatus(b[1]).text;
        const orderDiff = (sortOrder[sa] || 9) - (sortOrder[sb] || 9);
        if (orderDiff !== 0) return orderDiff;
        return a[0].localeCompare(b[0]);
    });

    tbody.replaceChildren();

    for (const [name, proj] of entries) {
        const status = projectStatus(proj);
        const staticKey = normalizeProjectName(name);
        const staticData = staticLookup[staticKey] || {};

        const displayName = proj.display_name || staticData.name || name;
        const projectUrl  = staticData.link || proj.display_url || "#";
        const goal        = staticData.goal    || "";
        const sponsor     = staticData.sponsor || "";

        const tr = document.createElement("tr");
        if (status.cssClass) tr.className = status.cssClass;

        // Project cell: <a>name</a> [<br><span>(status)</span>]
        const nameCell = document.createElement("td");
        nameCell.appendChild(makeLink(projectUrl, displayName));
        if (status.text !== "Active") {
            nameCell.appendChild(document.createElement("br"));
            const span = document.createElement("span");
            if (status.cssClass) span.className = status.cssClass;
            span.textContent = `(${status.text})`;
            nameCell.appendChild(span);
        }
        tr.appendChild(nameCell);

        tr.appendChild(makeCell({ cls: "d-none d-lg-table-cell", text: goal }));
        tr.appendChild(makeCell({ cls: "d-none d-lg-table-cell", text: sponsor }));

        // Status badge.
        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        const badgeColor = status.text === "Active" ? "success"
                         : status.text === "Excluded" ? "warning"
                         : "danger";
        badge.className = `badge bg-${badgeColor}`;
        badge.textContent = status.text;
        statusCell.appendChild(badge);
        tr.appendChild(statusCell);

        tr.appendChild(makeCell({ cls: "text-end", text: formatCompact(proj.rac) }));
        tr.appendChild(makeCell({
            cls: "text-end d-none d-md-table-cell",
            text: formatCompact(proj.total_credit),
        }));
        tr.appendChild(makeCell({
            cls: "text-end d-none d-md-table-cell",
            text: proj.cpid_count !== undefined ? formatNumber(proj.cpid_count) : "—",
        }));

        // CPU column — green fill for yes, red for no.
        const hasCpu = staticData.cpu === "yes";
        tr.appendChild(makeCell({
            cls: `${hasCpu ? "table-color-yes" : "table-color-no"} d-none d-lg-table-cell`,
            text: hasCpu ? "✔️" : "❌",
        }));

        // GPU column — vendor badges or red X.
        const hasGpu = staticData.gpu !== "no" && (
            staticData.nvidia === "yes" || staticData.amd === "yes" || staticData.intel === "yes"
        );
        const gpuCell = document.createElement("td");
        gpuCell.className = `${hasGpu ? "table-color-yes" : "table-color-no"} d-none d-lg-table-cell`;
        if (hasGpu) {
            if (staticData.nvidia === "yes") gpuCell.appendChild(vendorBadgeImg("/assets/img/nvidia_badge.png", 40));
            if (staticData.amd    === "yes") gpuCell.appendChild(vendorBadgeImg("/assets/img/amd_badge.png", 50));
            if (staticData.intel  === "yes") gpuCell.appendChild(vendorBadgeImg("/assets/img/intel_badge.png", 40));
        } else {
            gpuCell.textContent = "❌";
        }
        tr.appendChild(gpuCell);

        // GDPR — driven dynamically from the API's gdpr_controls field,
        // with static data providing the project-specific enable-steps
        // link. Falls back to the general GDPR guide if no project-
        // specific link.
        const gdprRequired = proj.gdpr_controls === true;
        const gdprCell = document.createElement("td");
        gdprCell.className = `${gdprRequired ? "table-color-gdpr-yes" : ""} d-none d-xl-table-cell`;
        if (gdprRequired) {
            const link = makeLink(
                staticData["gdpr-enable-steps"] || "/guides/gdpr-stats-export.htm",
                "required ",
            );
            const warn = document.createElement("span");
            warn.className = "oi oi-warning";
            link.appendChild(warn);
            gdprCell.appendChild(link);
        } else {
            gdprCell.textContent = "not required";
        }
        tr.appendChild(gdprCell);

        // Greylist health — ZCD/WAS not available until v13 hardfork
        // activates autogreylisting. If no projects have greylist data,
        // show N/A.
        let healthText = "N/A";
        if (proj.zcd !== undefined) {
            const wasDisplay = proj.was !== undefined ? proj.was.toFixed(2) : "—";
            healthText = `ZCD: ${proj.zcd} / WAS: ${wasDisplay}`;
        }
        tr.appendChild(makeCell({ cls: "d-none d-xl-table-cell", text: healthText }));

        // Links: team + stats.
        const linksCell = document.createElement("td");
        if (staticData.team) {
            linksCell.appendChild(makeLink(staticData.team, "📊", "Gridcoin Team"));
        }
        const statsHref = staticData.stats || proj.stats_url;
        if (statsHref) {
            if (linksCell.childNodes.length) linksCell.appendChild(document.createTextNode(" "));
            linksCell.appendChild(makeLink(statsHref, "📈", "Project Stats"));
        }
        tr.appendChild(linksCell);

        tbody.appendChild(tr);
    }
}

/**
 * Main: fetch API data and render the dynamic table.
 */
function initWhitelist() {
    const staticLookup = buildStaticLookup();
    const dynamicTable = document.getElementById("dynamic-whitelist");
    const staticTable = document.getElementById("static-whitelist");
    const apiError = document.getElementById("api-error");

    fetch(whitelistApiUrl())
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
