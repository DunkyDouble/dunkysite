const deleted = [
    `classwork188.github.io`,
    `bonbang.github.io`,
    `shawn43.github.io`,
    `math-lessons.online`,
    `biologyedu1808.github.io`,
];
const unavailable = [
    `html5.gamedistribution.com`,
];
const cantEmbed = [ 

];
const suspicious = [ // comment why its suspicious
    `zayaruzostreetorgan.com`,
];

const getGamesStatusCount = (statusList, gamesList) => {
    if (statusList === "all") {
        const allList = [].concat(deleted, unavailable, cantEmbed, suspicious);
        const allStatusesList = gamesList.filter(game => allList.includes((new URL(game.url)).hostname));
        return gamesList.length - allStatusesList.length;
    }
    return gamesList.filter(game => statusList.includes((new URL(game.url)).hostname)).length;
};

export default {
    deleted,
    unavailable,
    cantEmbed,
    suspicious,
    
    getGamesStatusCount,
};