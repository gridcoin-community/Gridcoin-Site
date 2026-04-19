/**
 * fetch-cpid-churn.js — Daily CPID activity time-series chart.
 *
 * Pulls summary_cpid_churn data from the analytics API and renders an
 * active / churn-in / churn-out line chart with Chart.js.
 */

const CHURN_API_URL = (function() {
    const host = window.location.hostname;
    const port = window.location.port;
    // Production: gridcoin.us uses the dedicated API subdomain.
    if (host === "gridcoin.us" || host === "www.gridcoin.us") {
        return "https://api.gridcoin.us/api/v1/history/cpid-churn";
    }
    // Jekyll dev server binds to port 4001 and has no reverse-proxy of
    // its own — hop sideways to the FastAPI proxy on :5000 of the same
    // host. Works for 127.0.0.1/localhost and for any LAN hostname the
    // dev server has been bound to.
    if (port === "4001") {
        return `${window.location.protocol}//${host}:5000/api/v1/history/cpid-churn`;
    }
    // Everything else (Caddy staging on :81, same-origin prod reverse-proxy)
    // serves the API under the same origin via /api/v1/*.
    return "/api/v1/history/cpid-churn";
})();

function renderCpidChurnChart(records) {
    const canvas = document.getElementById("cpid-churn-chart");
    if (!canvas || !window.Chart) return;

    const labels = records.map(r => r.obs_date);
    const active = records.map(r => r.active_cpids);
    const churnIn = records.map(r => r.churn_in);
    const churnOut = records.map(r => r.churn_out);

    new Chart(canvas, {
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
            },
            scales: {
                x: {
                    ticks: { maxTicksLimit: 12, autoSkip: true },
                    title: { display: true, text: "Date" },
                },
                y: {
                    beginAtZero: false,
                    position: "left",
                    title: { display: true, text: "Active CPIDs" },
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
}

function initCpidChurn() {
    const errBanner = document.getElementById("analytics-error");
    fetch(CHURN_API_URL)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            if (!payload || !Array.isArray(payload.data)) {
                throw new Error("Unexpected API payload");
            }
            renderCpidChurnChart(payload.data);
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
