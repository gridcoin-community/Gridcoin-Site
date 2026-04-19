/**
 * fetch-project-churn.js — mixed chart of daily project count in the
 * superblock (line, left axis) plus in/out bars (right axis).
 */

function initProjectChurn() {
    const canvas = document.getElementById("project-churn-chart");
    if (!canvas) return;

    fetch(window.analyticsApi("/api/v1/history/project-churn"))
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(payload => {
            const rows = payload.data || [];
            const labels    = rows.map(r => r.obs_date);
            const total     = rows.map(r => r.total_projects);
            const inCount   = rows.map(r => r.projects_in);
            const outCount  = rows.map(r => r.projects_out);

            new Chart(canvas, {
                data: {
                    labels: labels,
                    datasets: [
                        {
                            type: "line",
                            label: "Projects in superblock",
                            data: total,
                            borderColor: "#2d6cdf",
                            backgroundColor: "rgba(45, 108, 223, 0.1)",
                            yAxisID: "y",
                            borderWidth: 1.5,
                            pointRadius: 0,
                            tension: 0.2,
                            fill: true,
                        },
                        {
                            type: "bar",
                            label: "Projects added",
                            data: inCount,
                            backgroundColor: "#2ca02c",
                            yAxisID: "y1",
                            barThickness: 2,
                        },
                        {
                            type: "bar",
                            label: "Projects dropped",
                            data: outCount,
                            backgroundColor: "#d62728",
                            yAxisID: "y1",
                            barThickness: 2,
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
                            text: "Projects in superblock (left) and daily adds/drops (right)",
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
                            title: { display: true, text: "Projects" },
                        },
                        y1: {
                            beginAtZero: true,
                            position: "right",
                            title: { display: true, text: "Adds / drops / day" },
                            grid: { drawOnChartArea: false },
                            ticks: { stepSize: 1 },
                        },
                    },
                },
            });
        })
        .catch(err => {
            console.error("Failed to load project-churn:", err);
            window.analyticsError("Couldn't load project churn data.");
        });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectChurn);
} else {
    initProjectChurn();
}
