import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Static build for GitHub Pages (served at /motion/).
export default defineConfig({
	root: 'web',
	base: '/motion/',
	plugins: [react()],
	build: {
		outDir: '../docs',
		emptyOutDir: true,
	},
});
