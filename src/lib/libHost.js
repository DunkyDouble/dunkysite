import { browser } from "$app/environment";
import { page } from "$app/stores";

const shouldOverwriteHostsOnLocal = true;
class ServerHosts {
    static library = 'https://mcontent-physics1433-simulations-dd.vercel.app/content';
}

if (browser) {
    page.subscribe((page) => {
        if (!page) return;
        if (!page.url) return;
        if (page.url.hostname === 'localhost' && shouldOverwriteHostsOnLocal) {
            // overwrite server hosts
            ServerHosts.library = 'http://localhost:4000/content';
        }
    });
}

export default ServerHosts;