import { defineConfig, loadEnv } from 'vite'
import React from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import Inspect from 'vite-plugin-inspect'
import path from 'path'
import { presetAttributify } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: {
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_SERVER_BASE_URL]: {
          target: `${env.VITE_PROXY_SERVER_HOST}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      UnoCSS(),
      Pages(),
      React(),
      Inspect(),
      visualizer({
        filename: './_report.html',
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.md$/, // .md
        ],
        imports: [
          'ahooks',
          'react',
          'react-router-dom',
          {
            dayjs: [['default', 'dayjs']],
          },
        ],
        dirs: ['src/hooks'],
        defaultExportByFilename: false,
        dts: true,
        eslintrc: {
          enabled: true,
          filepath: './eslintrc-auto-import.json',
        },
      }),
    ],
  }
})
