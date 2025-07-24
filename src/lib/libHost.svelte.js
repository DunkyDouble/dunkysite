import { browser } from "$app/environment";
import { page } from "$app/state";

const shouldOverwriteHostsOnLocal = true;
class ServerHosts {
    static library = browser && page.url.hostname === 'localhost' && shouldOverwriteHostsOnLocal ?
        'http://localhost:6781/content'
        : 'https://mcontent-physics1433-simulations-dd.vercel.app/content';
}

export default ServerHosts;