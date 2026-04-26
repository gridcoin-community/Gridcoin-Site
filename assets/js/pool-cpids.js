/**
 * pool-cpids.js — known Gridcoin pool CPIDs, mirrored from the
 * hardcoded list in src/gridcoin/researcher.h:86-90 (MiningPools
 * constructor) of the Gridcoin-Research repo.
 *
 * Used by fetch-top-cpids.js to badge pool entries on the leaderboard
 * and by the "Hide pools" toggle to filter them out.
 *
 * The Gridcoin codebase has a TODO to turn this into a fully
 * functional registry (see the comment on the MiningPools class). Once
 * that registry exists and is exposed via RPC / a new API endpoint,
 * this file should switch from a static map to an async fetch — no
 * other consumer changes needed because they all read window.POOL_CPIDS
 * after a known-resolved point.
 */
window.POOL_CPIDS = new Map([
    ["7d0d73fe026d66fd4ab8d5d8da32a611", { name: "grcpool.com",      url: "https://grcpool.com/" }],
    ["a914eba952be5dfcf73d926b508fd5fa", { name: "grcpool.com-2",    url: "https://grcpool.com/" }],
    ["163f049997e8a2dee054d69a7720bf05", { name: "grcpool.com-3",    url: "https://grcpool.com/" }],
    ["f1f4d4e93b5b319b0a54b09dd47f1486", { name: "grcpool.com-5",    url: "https://grcpool.com/" }],
    ["326bb50c0dd0ba9d46e15fae3484af35", { name: "grc.arikado.pool", url: "https://gridcoinpool.ru/" }],
]);

window.isPoolCpid = function(cpid) {
    return window.POOL_CPIDS && window.POOL_CPIDS.has(cpid);
};
