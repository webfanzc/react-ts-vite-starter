import { defineConfig, loadEnv } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname)

	return {
		plugins: [
			UnoCSS(),
			Pages(),
			React(),
			AutoImport({
				imports: ['ahooks', 'react'],
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
