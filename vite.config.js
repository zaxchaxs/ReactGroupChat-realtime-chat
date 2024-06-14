import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "ReactGroup Chat",
        short_name: "ReactGroup Chat",
        description: "Simple web realtime chat with React.js",
        theme_color: "#FFFFFF",
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],
});


