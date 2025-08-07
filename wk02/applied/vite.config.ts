import pluginChecker from "vite-plugin-checker";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [
        pluginChecker({ typescript: true, overlay: false }),
        nodePolyfills(),
    ],
});
