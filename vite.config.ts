import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from "node:child_process";

export default defineConfig({
	plugins: [
	  sveltekit(),
	  {
	    name: "generate-css",
	    buildStart: async () => {
	      try {
	        execSync("node src/scripts/generate-css.ts", { stdio: "inherit" });
	      } catch (e) {
	        console.error("Failed to generate CSS:", e);
	        process.exit(1);
	      }
	    }
	  }
	]
});
