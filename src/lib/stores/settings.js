import { writable } from 'svelte/store';
import localforage from 'localforage';

const defaultSettings = {
    username: "",
    usernameSetup: false,
    showDebugMenu: false,
    showAllGamesNeeded: false,
    openTabCount: 1,
    openTabCountConfirmPopup: false,
    reflectionDisguiseIntensity: 0,
    externalServer: "",
};

const settings = writable(defaultSettings);
localforage.getItem('dunky:settings').then((saved) => {
    if (saved) {
        settings.set({
            ...defaultSettings,
            ...saved,
        });
    }
});
settings.subscribe((value) => {
    localforage.setItem('dunky:settings', value);
});

export default settings;
