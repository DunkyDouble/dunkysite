import Settings from '$lib/stores/settings.js';

const windowNames = {
    docs: 'Google Docs',
    slides: 'Google Slides',
};
const windowIcons = {
    docs: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    slides: 'https://ssl.gstatic.com/docs/presentations/images/favicon6.ico',
};
const windowTitles = {
    docs: [
        "Untitled Document",
        "Draft Paper",
        "Front Quiz",
        "Quiz B1",
        "Instructions for M1 - This year",
        "Quiz B2",
        "Instructions for M2 - This year",
        "Quiz B3",
        "Instructions for M3 - This year",
        "Quiz B4",
        "Quiz B5",
        "Quiz B6",
        "Quiz B7",
        "Quiz B8",
        "Activity Log",
        "Research - How the world moves",
        "Research - How the fundamentals work",
        "To Kill a Mockingbird' Analysis",
        "World War II Timeline",
        "Chemical Reactions",
        "Algebra Practice Problems",
        "Research - Human Genetics",
        "Research - Newton's Laws of Motion",
        "Class Reflection",
        "Study - Capitals of Europe",
        "Research - Environmental Issues",
        "Analysis: Robert Frost's 'The Road Not Taken'",
        "Review - Our Environmental Action",
        "Peer Schedules",
        "Preview - Student Proposal",
        "Review - Mock Trial Brief",
    ],
    slides: [
        "Properties of Shapes and Angles",
        "Graphing and Linear Equations",
        "Probability and Statistics: Data Analysis",
        "Math Puzzles and Brain Teasers",
        "View - Basics and Applications",
        "Preview: Derivatives and Integrals",
        "Mathematical Proofs and Theorems",
        "Math Strategies for Learning",
        "Chemical Reactions: Types and Examples",
        "The Solar System: Planets and Their Moons",
        "Introduction to Genetics and Heredity",
        "Ecosystems and Food Webs",
        "Newton's Laws of Motion Explained",
        "Human Body Systems - A Comprehensive Overview",
        "Environmental Issues and Conservation Efforts",
        "The Periodic Table - Elements and Properties",
        "Climate Change and Its Effects",
        "The Elements of Plot in Fiction",
    ],
};

const pickRandomArray = (array) => {
    return array[Math.round(Math.random() * (array.length - 1))];
};

class GamesTab {
    constructor(windowType) {
        /**
         * @type {Window} The window of this tab if it exists.
         */
        this.window = null;

        /**
         * @type {"generic"|"menu"|"dunkygame"}
         */
        this.windowType = windowType || "generic";
    }
    /**
     * Opens the games tab if it is not already open.
     * @param {string} url Will open a new tab with the URL, but with all of the tab hider data.
     */
    open(url) {
        if (this.window) return this.window;
        this.window = window.open();
        // fill out info
        // generate title
        const application = pickRandomArray(Object.keys(windowNames));
        const applicationName = windowNames[application];
        const applicationIcon = windowIcons[application];
        const applicationSubtitle = pickRandomArray(windowTitles[application]);
        // create document
        this.window.document.head.innerHTML = `<title>${applicationSubtitle} - ${applicationName}</title>`
            + `<link rel="icon" href="${applicationIcon}">`;
        const iframe = this.window.document.createElement('iframe');
        iframe.style.borderWidth = "0px";
        iframe.style.position = "absolute";
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        if (this.windowType === "menu") {
            const menuUrl = new URL(window.origin);
            menuUrl.pathname = `/menu`;
            iframe.src = menuUrl;
        } else if (this.windowType === "dunkygame") {
            const gameUrl = new URL(gameUrl);
            gameUrl.searchParams.set("dunky-username", $Settings.username);
            gameUrl.searchParams.set("dunky-server", $Settings.externalServer);
            iframe.src = gameUrl;
        } else {
            iframe.src = url;
        }
        this.window.document.body.appendChild(iframe);
        return this.window;
    }
    /**
     * Closes the games tab if possible and allows it to be opened again.
     */
    close() {
        if (this.window) {
            this.window.close();
        }
        this.window = null;
    }
}

export default GamesTab;