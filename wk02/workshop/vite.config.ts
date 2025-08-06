/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        // globals: true,
        include: ["./test/flip.test.ts", "./test/conslists.test.ts","./test/conslistexperiments.test.ts"],
    },
    plugins: [pluginChecker({ typescript: true, overlay: false })],
});
