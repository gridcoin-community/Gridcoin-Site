/**
 * fetch-mrc-daily.js — daily MRC (Manual Research Claim) payment chart.
 *
 * Stacked area on the primary y-axis decomposes each day's gross
 * research-reward MRC volume into its three end-of-flow buckets:
 *   net-to-researcher + foundation fees + staker fees
 * (the stacked total reproduces gross_research). On the secondary
 * y-axis a thin line shows the per-day MRC count, which is order-of-
 * magnitude smaller than the GRC amounts and benefits from its own
 * scale.
 *
 * Source: /api/v1/history/mrc-daily, populated by ingest_mrc.py from
 * `getmrcinfo false * <first_height> <last_height>` calls bracketed
 * by daily_block_boundaries.
 */

const MRC_API_URL = window.analyticsApi
    ? window.analyticsApi("/api/v1/history/mrc-daily")
    : "/api/v1/history/mrc-daily";

// Rolling-mean window. Trailing (each point is the average of the
// preceding `MA_WINDOW` days including itself), so the right edge is
// "honest" rather than running ahead in time. The first MA_WINDOW-1
// days are computed over the available history (a partial window) so
// the series starts at the data's start rather than `MA_WINDOW` days
// later — visually cleaner and the partial-window distortion is small
// against the noise we're trying to suppress.
const MA_WINDOW = 7;

function rollingMean(arr, window) {
    const out = new Array(arr.length);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (i >= window) sum -= arr[i - window];
        const denom = Math.min(i + 1, window);
        out[i] = sum / denom;
    }
    return out;
}

function renderMrcDailyChart(records, releases) {
    const canvas = document.getElementById("mrc-daily-chart");
    if (!canvas || !window.Chart) return;

    const labels = records.map(r => r.obs_date);
    const netToResearcher = rollingMean(records.map(r => r.net_to_researcher), MA_WINDOW);
    const foundationFees  = rollingMean(records.map(r => r.foundation_fees),   MA_WINDOW);
    const stakerFees      = rollingMean(records.map(r => r.staker_fees),       MA_WINDOW);
    const mrcsPaid        = rollingMean(records.map(r => r.mrcs_paid),         MA_WINDOW);

    const grid = window.softGridStyle ? window.softGridStyle() : { xGrid: {}, yGrid: {} };
    const annotations = window.buildChartAnnotations
        ? window.buildChartAnnotations(labels, releases)
        : {};

    const chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                // Stacked-area: bottom is net-to-researcher (the bulk),
                // then foundation fees, then staker fees on top. Stack
                // total = gross MRC research reward for that day.
                {
                    label: "Net to researcher",
                    data: netToResearcher,
                    borderColor: "#2d6cdf",
                    backgroundColor: "rgba(45, 108, 223, 0.45)",
                    yAxisID: "y",
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true,
                    stack: "amounts",
                },
                {
                    label: "Foundation fees",
                    data: foundationFees,
                    borderColor: "#7e57c2",
                    backgroundColor: "rgba(126, 87, 194, 0.55)",
                    yAxisID: "y",
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true,
                    stack: "amounts",
                },
                {
                    label: "Staker fees",
                    data: stakerFees,
                    borderColor: "#ef6c00",
                    backgroundColor: "rgba(239, 108, 0, 0.55)",
                    yAxisID: "y",
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true,
                    stack: "amounts",
                },
                // Secondary axis: per-day MRC count. Two-decade smaller
                // than the amounts so it gets its own scale; rendered
                // as a thin dotted line behind the stacked areas.
                {
                    label: "MRCs paid",
                    data: mrcsPaid,
                    type: "line",
                    borderColor: "#d62728",
                    backgroundColor: "transparent",
                    yAxisID: "y1",
                    borderWidth: 1.25,
                    borderDash: [4, 3],
                    pointRadius: 0,
                    tension: 0.2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                title: {
                    display: true,
                    text: "Daily MRC payments (7-day moving average) — net-to-researcher / foundation fees / staker fees (stacked, left); MRCs/day count (right)",
                },
                legend: { position: "bottom" },
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
                    position: "left",
                    title: { display: true, text: "GRC paid via MRC" },
                    grid: grid.yGrid,
                },
                y1: {
                    beginAtZero: true,
                    position: "right",
                    title: { display: true, text: "MRCs / day (count)" },
                    grid: { drawOnChartArea: false },
                    ticks: { stepSize: 1 },
                },
            },
        },
    });
    if (window.registerAnalyticsChart) window.registerAnalyticsChart(chart);
}

function initMrcDaily() {
    const canvas = document.getElementById("mrc-daily-chart");
    if (!canvas) return;

    Promise.all([
        fetch(MRC_API_URL).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }),
        window.analyticsReleasesPromise || Promise.resolve([]),
    ])
        .then(([payload, releases]) => {
            if (!payload || !Array.isArray(payload.data)) {
                throw new Error("Unexpected API payload");
            }
            renderMrcDailyChart(payload.data, releases || []);
        })
        .catch(err => {
            console.error("Failed to load mrc-daily:", err);
            if (window.analyticsError) {
                window.analyticsError("Couldn't load MRC payment data.");
            }
        });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMrcDaily);
} else {
    initMrcDaily();
}
