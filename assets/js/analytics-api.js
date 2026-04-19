/**
 * analytics-api.js — shared API URL resolver for the network-analytics
 * page scripts. Mirrors the logic in fetch-whitelist.js / fetch-cpid-churn
 * so that all plots follow the same host/port routing rules.
 */

window.analyticsApi = function(path) {
    const host = window.location.hostname;
    const port = window.location.port;
    if (host === "gridcoin.us" || host === "www.gridcoin.us") {
        return `https://api.gridcoin.us${path}`;
    }
    if (port === "4001") {
        return `${window.location.protocol}//${host}:5000${path}`;
    }
    return path;
};

window.analyticsError = function(message) {
    const el = document.getElementById("analytics-error");
    if (!el) return;
    el.textContent = message;
    el.style.display = "";
};
