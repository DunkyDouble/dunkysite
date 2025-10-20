const SiteState = $state({
    // Whether or not the site is in BETA mode
    beta: false,

    // The list of games on the front page (dependent on GamesComponent)
    // NOTE: This is also the apps list if we are told to use it
    shownGames: [],
});

export default SiteState;