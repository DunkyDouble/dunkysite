import { writable } from 'svelte/store';
import localforage from 'localforage';

const defaultSettings = {
    showDebugMenu: false,
    showAllGamesNeeded: false,
};

const settings = writable(defaultSettings);
localforage.getItem('dunky:settings').then((saved) => {
    if (saved) {
        settings.set(saved);
    }
});
settings.subscribe((value) => {
    localforage.setItem('dunky:settings', value);
});

export default settings;
