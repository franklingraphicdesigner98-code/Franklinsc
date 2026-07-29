import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prerender from '@prerenderer/rollup-plugin'

// Rutas reales de src/router/index.js. Si agregas una página nueva,
// añádela aquí también para que se genere su HTML estático.
const ROUTES = [
  '/',
  '/identidad-marca',
  '/diseno-grafico',
  '/diseno-empaques',
  '/impresion-3d',
  '/comunicacion-corporativa',
  '/consultoria-digital',
  '/desarrollo-software',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prerender({
      routes: ROUTES,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        // Vue no hace fetch de datos antes de montar, así que un margen fijo
        // es suficiente y más simple que depender de una marca en el DOM.
        renderAfterTime: 1000,
      },
    }),
  ],
})
