import * as stores from 'svelte/store';

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
    /**
     * Makes a hidden tab using about:blank
     * @param {"generic"|"menu"|"game"|"gamedunky"}} windowType 
     */
    constructor(windowType = "generic") {
        /**
         * @type {Window} The window of this tab if it exists.
         */
        this.window = null;

        /**
         * @type {"generic"|"menu"|"game"|"gamedunky"}
         */
        this.windowType = windowType;
    }
    /**
     * Makes or edits a URL based on the specified windowType
     * @param {string?} url The target URL, if needed.
     */
    makeUrl(url) {
        const settings = stores.get(Settings);
        if ((this.windowType === "game" || this.windowType === "gamedunky") && url.startsWith('/')) {
		    url = String(`${window.origin}/${url}`);
        }
        if (this.windowType === "menu") {
            const menuUrl = new URL(window.origin);
            menuUrl.pathname = `/menu`;
            return menuUrl;
        } else if (this.windowType === "test1") {
            return "https://example.com/";
        } else if (this.windowType === "gamedunky") {
            const gameUrl = new URL(gameUrl);
            gameUrl.searchParams.set("dunky-username", settings.username);
            gameUrl.searchParams.set("dunky-server", settings.externalServer);
            return gameUrl;
        }
        return url;
    }
    /**
     * Opens the games tab if it is not already open.
     * @param {string} url Will open a new tab with the URL, but with all of the tab hider data.
     * @param {boolean?} showButton Shows a button to open the iframe.
     */
    open(url, showButton) {
        if (this.window) return this.window;

        // try to open a window
        this.window = window.open();
        if (!this.window) return;

        // fill out info
        const settings = stores.get(Settings);
        // generate title
        const application = pickRandomArray(Object.keys(windowNames));
        const applicationName = windowNames[application];
        const applicationIcon = windowIcons[application];
        const applicationSubtitle = pickRandomArray(windowTitles[application]);
        // create document
        this.window.document.head.innerHTML = `<title>${applicationSubtitle} - ${applicationName}</title>`
            + `<link rel="icon" href="${applicationIcon}">`;
        this.window.document.body.style.margin = "0";
        this.window.document.body.style.filter = `grayscale(${Math.min(settings.reflectionDisguiseIntensity, 0.5) * 2}) contrast(${0.5 + (0.5 - (Math.max(0.5, settings.reflectionDisguiseIntensity) - 0.5))})`;
        // create iframe
        const makeIframe = () => {
            const iframe = this.window.document.createElement('iframe');
            iframe.style = "position:absolute;left:0;top:0;width:100%;height:100%;"
                + "border-width:0;";
            iframe.src = url;
            this.window.document.body.appendChild(iframe);
        };
        if (!showButton) {
            makeIframe();
        } else {
            const div = this.window.document.createElement("div");
            div.style = "position:absolute;left:0;top:0;width:100%;height:100%;"
                + "display:flex;flex-direction:column;align-items:center;justify-content:center;";
            const button = this.window.document.createElement("button");
            button.innerHTML = "Open";
            button.style = "font-size:32px;padding:8px;";
            this.window.document.body.appendChild(div);
            div.appendChild(button);

            let buttonClicked = false;
            button.onclick = () => {
                if (buttonClicked) return;
                buttonClicked = true;
                
                button.remove();
                div.remove();
                makeIframe();
            };
        }
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