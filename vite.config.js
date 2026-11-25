import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work on GitHub Pages (repo subpath), Vercel and Netlify.
export default defineConfig({ plugins: [react()], base: './' });
