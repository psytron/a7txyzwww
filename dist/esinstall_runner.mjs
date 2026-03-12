import {install, printStats} from 'esinstall';

// Feature: Handle CJS packages with ease, converting everything to ESM!
//await install(['react', 'react-dom', 'react-redux', 'react-router']);

// Feature: Handle CSS!
//await install(['bootstrap/dist/css/bootstrap.min.css']);

// Feature: Handle Non-standard packages!
//await install(['some-svelte-component'], {rollup: {plugins: [require('rollup-plugin-svelte')()]}});

await install(['@walletconnect/qrcode-modal','@walletconnect/client'], {
     polyfillNode:true 
  });

// Feature: Print detailed install stats to the console, including installed file sizes.
const {success, stats} = install([
    'yaml',
    'three',
    'three/addons',
    'three.interactive',
    'stats-js',
    'lightweight-charts',
    'jquery',
    'ngraph.graph',
    'ngraph.path',
    'ngraph.physics.simulator',
    'ngraph.merge',
    'ngraph.forcelayout',
    'ngraph.quadtreebh',   
    'vanillaqr',
    'gsap',
    'topojson-client',
    'idb',
    'idb-keyval',
    'ethers',
    //'ccxt',
    '@walletconnect/qrcode-modal',
    '@walletconnect/client',
    'buffer',
    //'dataframe-js',
    //'danfojs',
    //'@octokit/core',
    'ccxt',
    'ngraph.graph',
    'ngraph.forcelayout',
    'ngraph.kruskal'
] , { polyfillNode:true });




if (success) {
    printStats(stats);
}else{
    console.log( success, stats );
}

// Feature: Tree-shaking! Get a smaller final build by providing more detailed install targets.
// await install(
//   [{specifier: 'preact/hooks', all: false, default: false, namespace: false, named: ['useState', 'useEffect']}],
//   {treeshake: true}
// );