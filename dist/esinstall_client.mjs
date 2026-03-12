import {install, printStats} from 'esinstall';
 
//import rollupPluginNodePolyfills from 'rollup-plugin-node-polyfills';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { Buffer } from 'buffer';
 
const {success, stats} = await install(['@walletconnect/qrcode-modal','@walletconnect/client','buffer'], {
    polyfillNode:true ,
    globals: {
        buffer: 'Buffer',
        xvovx:88
    },    
    rollup:{
        plugins: [
            nodePolyfills( { include:["buffer"] } )
        ],
        globals: {
            buffer: 'Buffer',
            xvovx:88
        }
    }
});
 
 

if (success) {
    printStats(stats);
}else{
    console.log( success, stats );
}
 