/**
 * Sorts all the websites by A-Z and splits new games to the top.
 * @param {[object]} websitesList 
 * @returns {[object]}
 */
const sortWebsites = (websitesList) => {
    const listCopy = websitesList.slice();
    listCopy.sort((game, sgame) => game.name.localeCompare(sgame.name));
    return [].concat(
        listCopy.filter(game => game.new === true),
        listCopy.filter(game => game.new !== true),
    );
};

export default sortWebsites;