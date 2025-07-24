import { browser } from "$app/environment";
import { dev } from '$app/environment';
import { page } from "$app/state";

const shouldOverwriteHostsOnLocal = true;
class ServerHosts {
    static get library() {
        const prodUrl = 'https://mcontent-physics1433-simulations-dd.vercel.app/content';
        const locaUrl = 'http://localhost:6781/content';
        return dev && shouldOverwriteHostsOnLocal ? locaUrl : prodUrl;
    }
}

export default ServerHosts;