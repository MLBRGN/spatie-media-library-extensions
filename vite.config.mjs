import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import path from 'path'
import fs from 'fs'

const jsDir = path.resolve(__dirname, 'resources/js')
const sharedDir = path.resolve(jsDir, 'shared')

function getJsFiles(dir) {
    return fs
        .readdirSync(dir)
        .filter(file => file.endsWith('.js') && fs.statSync(path.join(dir, file)).isFile())
        .map(file => path.relative(__dirname, path.join(dir, file)))
}

const faviconPath = path.resolve(__dirname, 'resources/assets/images/favicon.ico');

const inputFiles = [
    ...getJsFiles(jsDir),
    ...getJsFiles(sharedDir),
    faviconPath,
]

export default defineConfig({
    plugins: [
        laravel({
            input: inputFiles,
            publicDirectory: 'public',
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources'),
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                // entryFileNames: '[name].js',
                // assetFileNames: '[name].css',
                entryFileNames: '[name].js',      // for entry points
                chunkFileNames: '[name].js',      // for code-split chunks
                assetFileNames: '[name][extname]',

            },
        },
        manifest: false,
    },
})
