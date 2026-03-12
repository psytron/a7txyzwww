import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    return {
        root: './',
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        publicDir: '.',
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: {
                    main: './index.html',
                    map: './map.html',

                    list: './x_modules/apps/list/list.html',
                    qr: './x_modules/apps/qr/qr.html',
                    kvs: './x_modules/apps/kvs/kvs.html',
                    xfer: './x_modules/apps/xfer/xfer.html',
                    terminal: './x_modules/apps/terminal/terminal.html',
                    listitem: './x_modules/apps/list/listitem.html',
                    funbay: './x_modules/apps/funbay/funbay.html',
                    timeseries: './x_modules/apps/timeseries/timeseries.html',
                    cex: './x_modules/apps/cex/cex.html',
                    buysell: './x_modules/apps/buysell/buysell.html',
                    assetholder: './x_modules/apps/assetholder/assetholder.html'
                    // ...
                    // List all files you want in your build
                }
            }
        },
        // Add the static directory for fonts
        // The double asterisks (**) in the glob pattern match zero or more directories.
        // This pattern will include all files in any directory named 'fonts' at any level of the directory structure.
        assetsInclude: ['**/fonts/**']
    }
})

