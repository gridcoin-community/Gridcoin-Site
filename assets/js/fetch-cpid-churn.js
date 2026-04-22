/**
 * fetch-cpid-churn.js — Daily CPID activity time-series chart.
 *
 * Pulls summary_cpid_churn data from the analytics API and renders an
 * active / churn-in / churn-out line chart with Chart.js.
 */

const CHURN_API_URL = window.analyticsApi
    ? window.analyticsApi("/api/v1/history/cpid-churn")
    : "/api/v1/history/cpid-churn";

function renderCpidChurnChart(records, releases) {
    const canvas = document.getElementById("cpid-churn-chart");
    if (!canvas || !window.Chart) return;

    const labels = records.map(r => r.obs_date);
    const active = records.map(r => r.active_cpids);
    const churnIn = records.map(r => r.churn_in);
    const churnOut = records.map(r => r.churn_out);

    const grid = window.softGridStyle ? window.softGridStyle() : { xGrid: {}, yGrid: {} };
    const annotations = window.buildChartAnnotations
        ? window.buildChartAnnotations(labels, releases)
        : {};

    const chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Active CPIDs",
                    data: active,
                    borderColor: "#2d6cdf",
                    backgroundColor: "rgba(45, 108, 223, 0.1)",
                    yAxisID: "y",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    tension: 0.2,
                    fill: true,
                },
                {
                    label: "Churn in",
                    data: churnIn,
                    borderColor: "#2ca02c",
                    yAxisID: "y1",
                    borderWidth: 1,
                    pointRadius: 0,
                    tension: 0.2,
                },
                {
                    label: "Churn out",
                    data: churnOut,
                    borderColor: "#d62728",
                    yAxisID: "y1",
                    borderWidth: 1,
                    pointRadius: 0,
                    tension: 0.2,
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
                    text: "Daily active CPIDs (left axis) and daily churn in/out (right axis)",
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
                    beginAtZero: false,
                    position: "left",
                    title: { display: true, text: "Active CPIDs" },
                    grid: grid.yGrid,
                },
                y1: {
                    beginAtZero: true,
                    position: "right",
                    title: { display: true, text: "Churn (CPIDs/day)" },
                    grid: { drawOnChartArea: false },
                },
            },
        },
    });
    if (window.registerAnalyticsChart) window.registerAnalyticsChart(chart);
}

function initCpidChurn() {
    const errBanner = document.getElementById("analytics-error");
    // Fetch the data and the release list in parallel; releases may arrive
    // slightly later but that's fine — the chart will render without the
    // annotation overlay if the releases request fails.
    Promise.all([
        fetch(CHURN_API_URL).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }),
        window.analyticsReleasesPromise || Promise.resolve([]),
    ])
        .then(([payload, releases]) => {
            if (!payload || !Array.isArray(payload.data)) {
                throw new Error("Unexpected API payload");
            }
            renderCpidChurnChart(payload.data, releases || []);
        })
        .catch(err => {
            console.error("Failed to load cpid-churn:", err);
            if (errBanner) {
                errBanner.textContent =
                    "Couldn't load live analytics data. Please try again later.";
                errBanner.style.display = "";
            }
        });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCpidChurn);
} else {
    initCpidChurn();
}
