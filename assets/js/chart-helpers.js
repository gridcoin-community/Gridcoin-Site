/**
 * chart-helpers.js — shared Chart.js options + annotations for the
 * network-analytics time-series charts.
 *
 * Provides:
 *   window.analyticsReleasesPromise   — single fetch of /api/v1/history/releases
 *   window.buildReleaseAnnotations()  — Chart.js annotation objects for
 *                                       mandatory + leisure release markers
 *   window.buildQuarterlyAnnotations()— quarterly + annual vertical guides
 *   window.softGridScales()           — softer horizontal grid defaults
 *   window.registerAnalyticsChart()   — so the leisure-toggle can redraw all
 *
 * Chart.js v4 + chartjs-plugin-annotation v3 are pinned via CDN on the
 * consuming page (guides/analytics.htm).
 */

// Single in-flight promise — all per-chart modules that await this share
// the same fetch so we don't hammer the API proxy with N parallel requests
// on page load. Resolved array is cached on window.analyticsReleases for
// consumers that re-render charts after the initial page load (e.g. the
// sand chart, which re-instantiates on every CPID change).
window.analyticsReleases = [];
window.analyticsReleasesPromise = (function() {
    if (!window.analyticsApi) {
        // analytics-api.js must load before this file.
        return Promise.resolve([]);
    }
    return fetch(window.analyticsApi("/api/v1/history/releases"))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            const data = Array.isArray(payload.data) ? payload.data : [];
            window.analyticsReleases = data;
            return data;
        })
        .catch(err => {
            // A chart failure is non-fatal — we still want the underlying
            // data to render without release markers.
            console.warn("Failed to load release annotations:", err);
            return [];
        });
})();

// Global toggle state; driven by the "Show leisure releases" checkbox in
// analytics.htm. Each release-annotation object reads this via its
// `display` callback, so toggling doesn't require rebuilding the chart —
// a cheap chart.update() is enough.
window.analyticsShowLeisure = false;

// Chart registry so the leisure toggle can ripple an update() across every
// chart on the page.
window.analyticsCharts = window.analyticsCharts || [];
window.registerAnalyticsChart = function(chart) {
    window.analyticsCharts.push(chart);
};

/**
 * Nearest-label lookup. Chart.js time-series charts use a category x-axis
 * (string labels), so an `xMin` that isn't *exactly* one of the data
 * labels gets placed unpredictably by the annotation plugin (in practice:
 * piled at an edge). Snap every annotation date to the closest existing
 * label. Returns null for dates outside the chart's date range so those
 * annotations are skipped entirely (rather than collapsing onto the first
 * or last data point).
 *
 * labels must be sorted ascending (ISO-8601 lex-sortable — guaranteed
 * by our `ORDER BY obs_date` queries).
 */
function nearestLabel(labels, isoDate) {
    if (!labels || labels.length === 0) return null;
    if (isoDate < labels[0]) return null;
    if (isoDate > labels[labels.length - 1]) return null;
    // Binary search.
    let lo = 0, hi = labels.length - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (labels[mid] === isoDate) return labels[mid];
        if (labels[mid] < isoDate) lo = mid + 1;
        else hi = mid - 1;
    }
    // lo is the insertion point; pick the closer neighbour.
    if (lo === 0) return labels[0];
    if (lo >= labels.length) return labels[labels.length - 1];
    const prev = labels[lo - 1];
    const next = labels[lo];
    const distPrev = Math.abs(new Date(isoDate) - new Date(prev));
    const distNext = Math.abs(new Date(isoDate) - new Date(next));
    return distPrev <= distNext ? prev : next;
}

/**
 * Chart.js-annotation-plugin objects, one per non-prerelease GitHub
 * release whose publication date falls within the chart's label range.
 * Mandatory releases are solid orange, leisure/unknown are dotted light
 * gray (and hidden unless the global toggle is on).
 */
// Snap window: a mandatory release within this many days *before* the
// chart's first data point is snapped to the leftmost label with a "←"
// prefix so the reader can see that the data window opens just after
// that release (e.g. the 5.0.0.0 mandatory on 2020-09-04 vs. data start
// on 2020-09-09). Non-mandatory pre-data releases are still skipped.
const PRE_DATA_SNAP_DAYS = 30;

window.buildReleaseAnnotations = function(releases, labels) {
    const annotations = {};
    if (!labels || labels.length === 0) return annotations;
    const firstLabelDate = new Date(labels[0]);
    releases.forEach((rel, i) => {
        if (!rel.published_at || !rel.tag) return;
        const isoDate = rel.published_at.substring(0, 10);
        const isMandatory = rel.type === "mandatory";

        let xVal = nearestLabel(labels, isoDate);
        if (xVal === null && isMandatory && isoDate < labels[0]) {
            const daysBefore = (firstLabelDate - new Date(isoDate)) / 86400000;
            if (daysBefore >= 0 && daysBefore <= PRE_DATA_SNAP_DAYS) {
                // Snap one label inward from the edge (labels[1] not
                // labels[0]). An annotation exactly at labels[0] is
                // rendered clipped by the chart border — the line looks
                // half-width and the label anchor is displaced. One day
                // inward is visually identical at yearly tick resolution
                // but avoids the edge-clipping artifact.
                xVal = labels.length > 1 ? labels[1] : labels[0];
            }
        }
        if (xVal === null) return;

        const labelText = rel.tag;

        annotations[`release-${i}`] = {
            type: "line",
            xMin: xVal,
            xMax: xVal,
            borderColor: isMandatory
                ? "rgba(255, 165, 0, 0.85)"      // mandatory: vivid orange
                : "rgba(100, 180, 230, 0.70)",   // non-mandatory: soft blue (distinct from gridlines)
            borderWidth: isMandatory ? 1.5 : 1,
            borderDash: isMandatory ? [] : [5, 3],
            display: function() {
                return isMandatory || window.analyticsShowLeisure;
            },
            // Small always-on label for mandatory releases (only 17 —
            // they fit). Non-mandatory is marker-only to avoid clutter.
            // `position: "end"` puts labels at the TOP of each vertical
            // line, which keeps them away from the leftmost y-axis
            // tick-label area (where `position: "start"` was causing
            // the 5.0.0.0 edge-case label to be offset vs. interior
            // labels). `yAdjust: 30` pushes each label ~30px below the
            // chart top so they sit consistently within the plot area.
            label: {
                display: isMandatory,
                content: labelText,
                position: "end",
                yAdjust: 30,
                rotation: 270,
                backgroundColor: "rgba(20,20,20,0.55)",
                color: "#ffd27a",
                padding: { top: 2, bottom: 2, left: 4, right: 4 },
                borderRadius: 3,
                font: { size: 10 },
            },
        };
    });
    return annotations;
};

/**
 * Quarterly vertical guides snapped to the nearest data-label date.
 * Jan 1 gets a slightly brighter line (year boundary); Apr / Jul / Oct
 * are dimmer dotted. Both sit behind the data.
 */
window.buildQuarterlyAnnotations = function(labels) {
    const annotations = {};
    if (!labels || labels.length === 0) return annotations;
    const min = new Date(labels[0]);
    const max = new Date(labels[labels.length - 1]);
    if (isNaN(min) || isNaN(max)) return annotations;
    const startYear = min.getUTCFullYear();
    const endYear = max.getUTCFullYear();
    const quarterMonths = [0, 3, 6, 9];
    for (let y = startYear; y <= endYear; y++) {
        for (const m of quarterMonths) {
            const d = new Date(Date.UTC(y, m, 1));
            if (d < min || d > max) continue;
            const iso = d.toISOString().substring(0, 10);
            const xVal = nearestLabel(labels, iso);
            if (xVal === null) continue;
            const isYearBoundary = (m === 0);
            annotations[`q-${iso}`] = {
                type: "line",
                xMin: xVal,
                xMax: xVal,
                borderColor: isYearBoundary
                    ? "rgba(200, 200, 200, 0.28)"
                    : "rgba(200, 200, 200, 0.14)",
                borderWidth: 1,
                borderDash: isYearBoundary ? [] : [2, 4],
                drawTime: "beforeDatasetsDraw",
            };
        }
    }
    return annotations;
};

/**
 * Common scales styling: soft light-alpha horizontal gridlines that work
 * on both light and dark themes, and a very subtle x-axis grid so the
 * quarterly annotations dominate horizontally.
 */
window.softGridStyle = function() {
    return {
        xGrid: {
            // Hide the per-label vertical gridlines — with ~2000 daily
            // labels the cumulative stipple overwhelms the chart. The
            // quarterly and year-boundary annotations provide the
            // visual vertical grid.
            color: "transparent",
            drawTicks: false,
            drawOnChartArea: false,
        },
        yGrid: {
            color: "rgba(200, 200, 200, 0.32)",
            drawTicks: true,
            drawOnChartArea: true,
        },
    };
};

/**
 * Ticks config for a category x-axis of daily ISO-date labels. Replaces
 * Chart.js autoSkip sampling (which picked uneven dates like "2021-02-24")
 * with explicit Jan-1 year markers only, displayed as "1/1/yyyy". The
 * nearest existing label to each year's Jan 1 is used (data gaps around
 * the new year get the closest available label instead). The first
 * (partial) year in the series is skipped — if data starts in September
 * there's no sensible "1/1/<firstYear>" tick to show.
 *
 * Returned object is meant to be merged into `scales.x.ticks`.
 */
window.yearlyXTicksConfig = function(labels) {
    const base = { autoSkip: false, maxRotation: 0 };
    if (!labels || labels.length === 0) return base;

    const displayByIndex = new Map();
    const firstYear = parseInt(labels[0].substring(0, 4), 10);
    const lastYear = parseInt(labels[labels.length - 1].substring(0, 4), 10);
    if (!Number.isFinite(firstYear) || !Number.isFinite(lastYear)) return base;

    for (let y = firstYear + 1; y <= lastYear; y++) {
        const jan1 = y + "-01-01";
        // Binary search for jan1 insertion index in labels.
        let lo = 0, hi = labels.length - 1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (labels[mid] === jan1) { lo = mid; break; }
            if (labels[mid] < jan1) lo = mid + 1;
            else hi = mid - 1;
        }
        // Prefer the label at-or-after jan1 if it's in year y, else the
        // one immediately before if it's in year y, else skip.
        let candidate = -1;
        if (lo < labels.length && labels[lo].startsWith(y + "-")) {
            candidate = lo;
        } else if (lo > 0 && labels[lo - 1].startsWith(y + "-")) {
            candidate = lo - 1;
        }
        if (candidate >= 0) {
            displayByIndex.set(candidate, "1/1/" + y);
        }
    }

    return {
        autoSkip: false,
        maxRotation: 0,
        callback: function(_value, index) {
            return displayByIndex.get(index) || "";
        },
    };
};

/**
 * Block-version activation markers — dotted orange verticals at the
 * dates each new block version actually went live on mainnet (post-
 * grace-period transitions, *not* the dates the binaries were
 * published). Same hue as mandatory-release markers but dashed and
 * unlabeled, so a reader can distinguish "binary available" from
 * "consensus rule live" — the gap between the two is the protocol
 * grace period (~6.5 days currently).
 *
 * Activation list is fetched lazily from
 * /api/v1/history/block-version-activations so the markers stay
 * empirical (derived from the block_version recorded alongside each
 * day's first_height) and never need code updates as new versions
 * activate on mainnet.
 */
window.analyticsBlockVersionsPromise = (function() {
    if (!window.analyticsApi) {
        return Promise.resolve([]);
    }
    return fetch(window.analyticsApi("/api/v1/history/block-version-activations"))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => Array.isArray(payload.data) ? payload.data : [])
        .catch(err => {
            // Best-effort: missing markers are not fatal.
            console.warn("Failed to load block-version-activations:", err);
            return [];
        });
})();

window.buildBlockVersionAnnotations = function(labels, activations) {
    const annotations = {};
    if (!labels || labels.length === 0 || !activations) return annotations;
    activations.forEach((entry) => {
        if (!entry.activation_date || entry.version == null) return;
        const xVal = nearestLabel(labels, entry.activation_date);
        if (xVal === null) return;
        annotations[`bv-${entry.version}`] = {
            type: "line",
            xMin: xVal,
            xMax: xVal,
            borderColor: "rgba(255, 165, 0, 0.85)",
            borderWidth: 1.5,
            borderDash: [5, 3],
            drawTime: "beforeDatasetsDraw",
        };
    });
    return annotations;
};

window.analyticsBlockVersions = [];
window.analyticsBlockVersionsPromise.then(arr => {
    window.analyticsBlockVersions = arr;
});

/**
 * Convenience: given an array of labels (ISO date strings), a release
 * list, and a block-version activation list, produce the
 * `plugins.annotation.annotations` object expected by
 * chartjs-plugin-annotation — releases + quarterly guides + block-
 * version-activation markers, ready to drop into a chart config.
 *
 * Block-version activations may not have arrived yet (the fetch is
 * lazy); pass `activations` explicitly if you've awaited the promise,
 * or rely on `window.analyticsBlockVersions` (cached after the promise
 * resolves) for the current best-effort list.
 */
window.buildChartAnnotations = function(labels, releases, activations) {
    if (!labels || labels.length === 0) {
        return {};
    }
    return Object.assign(
        {},
        window.buildQuarterlyAnnotations(labels),
        window.buildReleaseAnnotations(releases || [], labels),
        window.buildBlockVersionAnnotations(
            labels,
            activations || window.analyticsBlockVersions,
        ),
    );
};

// Wire the "Show leisure releases" checkbox once the DOM is ready.
(function() {
    function wire() {
        const cb = document.getElementById("show-leisure-releases");
        if (!cb) return;
        window.analyticsShowLeisure = !!cb.checked;
        cb.addEventListener("change", function(e) {
            window.analyticsShowLeisure = !!e.target.checked;
            (window.analyticsCharts || []).forEach(function(c) {
                if (c && typeof c.update === "function") c.update("none");
            });
        });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wire);
    } else {
        wire();
    }
})();
