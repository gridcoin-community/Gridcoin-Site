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

// Reject any CPID that isn't 32 hex characters before letting it touch
// the DOM. Lenient (returns the input as-is for valid hex, "" otherwise)
// so the row simply omits the badge / data-cpid affordance for malformed
// values rather than blowing up the whole table.
function sanitizeCpid(cpid) {
    return typeof cpid === "string" && /^[0-9a-fA-F]{32}$/.test(cpid) ? cpid : "";
}

// Allow only http(s) URLs for pool badge links — defensive against
// `javascript:` etc. if window.POOL_CPIDS is ever sourced from outside
// the in-page hardcoded list.
function safePoolUrl(url) {
    if (typeof url !== "string") return null;
    return /^https?:\/\//i.test(url.trim()) ? url.trim() : null;
}

// Pool badge renderer — small Bootstrap badge linking to the pool's
// site, shown next to the CPID hex. Returns a DOM node or null for
// non-pool CPIDs (caller appends only when non-null).
function poolBadgeNode(cpid) {
    if (!window.POOL_CPIDS) return null;
    const pool = window.POOL_CPIDS.get(cpid);
    if (!pool) return null;
    const url = safePoolUrl(pool.url);
    if (!url) return null;
    // Inline-block, ms-2 separates from the CPID code, link opens the
    // pool's site in a new tab. text-decoration-none keeps it visually
    // a badge rather than an underlined link.
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "badge bg-info text-dark text-decoration-none ms-2";
    a.title = `Pool — opens ${url}`;
    a.textContent = pool.name || "";
    return a;
}

// Cache the most recent payload so the "Hide pools" toggle can
// re-render without re-fetching.
let lastTopCpidsRows = [];

function renderTopCpidsRows(rows) {
    lastTopCpidsRows = rows || [];

    const tbody = document.getElementById("top-cpids-tbody");
    if (!tbody) return;
    tbody.replaceChildren();

    const hidePools = !!document.getElementById("top-cpids-hide-pools")?.checked;
    const filtered = hidePools
        ? lastTopCpidsRows.filter(r => !window.isPoolCpid(r.cpid))
        : lastTopCpidsRows;

    // The CPID cell is rendered as a link styled `<code>` so it's
    // discoverable as clickable. Click drops the full CPID into the
    // sand-chart input below and triggers a render. A descriptive
    // title ("...click to plot below") is appended to the existing
    // tooltip-of-full-CPID so screen readers and hover users see both
    // the value and the affordance. For pool CPIDs an inline badge
    // follows the code, linking to the pool's site. Every API field
    // goes through textContent or a sanitizing helper before reaching
    // the DOM (no innerHTML on row HTML).
    filtered.forEach((row, i) => {
        const tr = document.createElement("tr");
        const cpid = sanitizeCpid(row.cpid);

        const idxCell = document.createElement("td");
        idxCell.className = "text-muted";
        idxCell.textContent = String(i + 1);
        tr.appendChild(idxCell);

        const cpidCell = document.createElement("td");
        if (cpid) {
            const link = document.createElement("a");
            link.href = "#cpid-sand-section";
            link.className = "cpid-link";
            link.title = `${cpid} — click to plot below`;
            link.dataset.cpid = cpid;
            const code = document.createElement("code");
            code.textContent = shortCpid(cpid);
            link.appendChild(code);
            cpidCell.appendChild(link);
            const badge = poolBadgeNode(cpid);
            if (badge) {
                cpidCell.appendChild(document.createTextNode(" "));
                cpidCell.appendChild(badge);
            }
        }
        tr.appendChild(cpidCell);

        const numCell = (text) => {
            const td = document.createElement("td");
            td.className = "text-end";
            td.textContent = text;
            return td;
        };
        tr.appendChild(numCell(formatNumber(row.days_active, 0)));
        tr.appendChild(numCell(formatNumber(row.lifetime_mag_sum, 2)));
        tr.appendChild(numCell(formatNumber(row.lifetime_mag_avg_active, 2)));
        tr.appendChild(numCell(formatNumber(row.lifetime_mag_avg_elapsed, 2)));

        const firstCell = document.createElement("td");
        firstCell.textContent = row.first_seen || "";
        tr.appendChild(firstCell);
        const lastCell = document.createElement("td");
        lastCell.textContent = row.last_seen || "";
        tr.appendChild(lastCell);

        tbody.appendChild(tr);
    });
}

// Single delegated click handler on the tbody — survives table re-renders
// without re-binding per-row, and only attaches once.
function wireCpidClickToSandChart() {
    const tbody = document.getElementById("top-cpids-tbody");
    if (!tbody || tbody.dataset.cpidClickWired) return;
    tbody.dataset.cpidClickWired = "1";
    tbody.addEventListener("click", function(ev) {
        const link = ev.target.closest("a.cpid-link");
        if (!link) return;
        const cpid = link.dataset.cpid;
        if (!cpid) return;
        ev.preventDefault();
        const sandInput = document.getElementById("cpid-sand-input");
        if (sandInput) sandInput.value = cpid;
        if (typeof window.loadSandChart === "function") {
            window.loadSandChart();
        }
        const target = document.getElementById("cpid-sand-section")
            || document.getElementById("cpid-sand-input");
        if (target && target.scrollIntoView) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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

// Build the period/custom-range query-string fragment. Returns "" on
// invalid custom selection (and surfaces a status message via
// analyticsError) so the caller can short-circuit.
function topCpidsPeriodParams() {
    const periodSel = document.getElementById("top-cpids-period");
    const period = periodSel ? periodSel.value : "all";

    if (period === "custom") {
        const startEl = document.getElementById("top-cpids-start-date");
        const endEl   = document.getElementById("top-cpids-end-date");
        const start = startEl ? startEl.value : "";
        const end   = endEl   ? endEl.value   : "";
        if (!start || !end) {
            return { ok: false, msg: "Pick both a start and end date." };
        }
        if (start > end) {
            return { ok: false, msg: "Start date must be on or before end date." };
        }
        return { ok: true, qs: `&start_date=${start}&end_date=${end}` };
    }

    // "all" / "week" / "month" / "quarter" / "year" — pass period
    // through (backend treats period=all the same as omitting it).
    return { ok: true, qs: `&period=${encodeURIComponent(period)}` };
}

function loadTopCpids() {
    const projectSel = document.getElementById("top-cpids-project");
    const limitSel   = document.getElementById("top-cpids-limit");
    const loading    = document.getElementById("top-cpids-loading");

    const project = projectSel ? projectSel.value : "";
    const limit   = limitSel   ? limitSel.value   : "100";

    const periodParams = topCpidsPeriodParams();
    if (!periodParams.ok) {
        window.analyticsError(periodParams.msg);
        return;
    }

    let url = `/api/v1/history/top-cpids`
        + `?limit=${encodeURIComponent(limit)}`
        + `&order_by=${encodeURIComponent(topCpidsOrderBy)}`
        + periodParams.qs;
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
    const periodSel  = document.getElementById("top-cpids-period");

    if (projectSel) projectSel.addEventListener("change", loadTopCpids);
    if (limitSel)   limitSel.addEventListener("change", loadTopCpids);

    // Period selector — show/hide the custom-range inputs and reload.
    // For canned periods we reload immediately on change. For custom
    // we wait for the Apply button so the user can fill both dates
    // before firing a request.
    const customRangeEls = document.querySelectorAll(".top-cpids-custom-range");
    const showCustomRange = (show) => {
        customRangeEls.forEach(el => { el.style.display = show ? "" : "none"; });
    };
    if (periodSel) {
        periodSel.addEventListener("change", () => {
            const isCustom = periodSel.value === "custom";
            showCustomRange(isCustom);
            if (!isCustom) loadTopCpids();
        });
    }
    const applyBtn = document.getElementById("top-cpids-apply-range");
    if (applyBtn) applyBtn.addEventListener("click", loadTopCpids);

    // Pre-fill the custom date inputs with a sensible default (last
    // year ending today) so the picker isn't empty when first opened.
    const today = new Date();
    const yearAgo = new Date(today.getTime() - 365 * 86400 * 1000);
    const fmt = (d) => d.toISOString().slice(0, 10);
    const startEl = document.getElementById("top-cpids-start-date");
    const endEl   = document.getElementById("top-cpids-end-date");
    if (startEl && !startEl.value) startEl.value = fmt(yearAgo);
    if (endEl   && !endEl.value)   endEl.value   = fmt(today);

    // The hide-pools toggle re-renders from cached rows without
    // re-fetching — the filter is purely client-side.
    const hidePools = document.getElementById("top-cpids-hide-pools");
    if (hidePools) {
        hidePools.addEventListener("change", () => renderTopCpidsRows(lastTopCpidsRows));
    }

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
    wireCpidClickToSandChart();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTopCpids);
} else {
    initTopCpids();
}
