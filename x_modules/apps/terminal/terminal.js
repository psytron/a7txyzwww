import { factory2d } from '../../../factory/factory2d.js'

class Terminal{

    constructor( initObj ) {
        
        var dat = initObj.data;
        var container_in = initObj.target;
        container_in.insertAdjacentHTML( 'beforeend' , factory2d.renderSync( 'terminal', dat ) );

        const iframe = container_in.querySelector('#termframe');
        iframe.addEventListener('load', () => {
            const domain = window.location.hostname;
            iframe.contentWindow.postMessage({ domain: domain }, '*');
        });
    }

    onDataUpdate( data_in ){


    }

}

export { Terminal }