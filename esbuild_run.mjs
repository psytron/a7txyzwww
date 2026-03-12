import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import esbuild from 'esbuild';

esbuild
    .build({
        entryPoints: ['esinstall_esbuild_client.mjs'],
        outdir: 'web_modules/xx2',
        bundle: false,
        sourcemap: false,
        minify: true,
        splitting: true,
        format: 'esm',
        target: ['esnext']
    })
    .catch(() => process.exit(1));