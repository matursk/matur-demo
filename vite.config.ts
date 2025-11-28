import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [
		react(),
		imagetools(),
	],
	build: {
		target: 'esnext',
	},
	server: {
		host: true,
	},
});


