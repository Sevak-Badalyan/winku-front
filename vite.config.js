import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{port:5173}
  server: {
    // proxy: {
    //   "/api": {
    //     target: "https://winku-back.onrender.com/",
    //       //  ws: true,  // enable WebSocket proxying
    //           // logLevel: 'debug', // optional: enable debug logging
    //     changeOrigin: true,
     
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // },
    host: 'localhost',
  }
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import httpProxyMiddleware from 'http-proxy-middleware';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:7071',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/socket.io': {
//         target: 'http://localhost:7071',
//         ws: true,  // Enable WebSocket proxying
//         logLevel: 'debug', // Optional: enable debug logging
//         changeOrigin: true,
//       },
//     },
//     host: 'localhost',
//   },
// });
