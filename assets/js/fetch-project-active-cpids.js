/**
 * fetch-project-active-cpids.js — multi-line chart, one line per project,
 * showing daily distinct active-CPID count on that project.
 */

function hslColor(i, total) {
    // Evenly spread hues around the wheel; keep saturation/lightness constant
    // so adjacent lines contrast clearly.
    const h = Math.round((360 * i) / Math.max(total, 1));
    return `hsl(${h}, 65%, 48%)`;
}

function buildPerProjectSeries(records) {
    // Pivot the flat (date, project, count) list into {dates, series-per-project}.
    const dateSet = new Set();
    const perProject = new Map();
    for (const r of records) {
        dateSet.add(r.obs_date);
        if (!perProject.has(r.project)) perProject.set(r.project, new Map());
        perProject.get(r.project).set(r.obs_date, r.active_cpids);
    }
    const dates = Array.from(dateSet).sort();
    const projects = Array.from(perProject.keys()).sort();
    const datasets = projects.map((p, i) => ({
        label: p,
        data: dates.map(d => perProject.get(p).get(d) ?? null),
        borderColor: hslColor(i, projects.length),
        backgroundColor: hslColor(i, projects.length),
        borderWidth: 1.25,
        pointRadius: 0,
        tension: 0.2,
        spanGaps: false,
    }));
    return { labels: dates, datasets };
}

function initProjectActiveCpids() {
    const canvas = document.getElementById("project-active-cpids-chart");
    if (!canvas) return;

    Promise.all([
        fetch(window.analyticsApi("/api/v1/history/project-active-cpids")).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }),
        window.analyticsReleasesPromise || Promise.resolve([]),
        window.analyticsBlockVersionsPromise || Promise.resolve([]),
    ])
        .then(([payload, releases, activations]) => {
            if (!payload || !Array.isArray(payload.data)) {
                throw new Error("Unexpected payload");
            }
            const { labels, datasets } = buildPerProjectSeries(payload.data);
            const grid = window.softGridStyle ? window.softGridStyle() : { xGrid: {}, yGrid: {} };
            const annotations = window.buildChartAnnotations
                ? window.buildChartAnnotations(labels, releases, activations)
                : {};
            const chart = new Chart(canvas, {
                type: "line",
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: "index", intersect: false },
                    plugins: {
                        title: {
                            display: true,
                            text: "Active CPIDs by project",
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
                            beginAtZero: true,
                            title: { display: true, text: "Active CPIDs (mag > 0)" },
                            grid: grid.yGrid,
                        },
                    },
                },
            });
        })
        .catch(err => {
            console.error("Failed to load project-active-cpids:", err);
            window.analyticsError("Couldn't load per-project activity data.");
        });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectActiveCpids);
} else {
    initProjectActiveCpids();
}
