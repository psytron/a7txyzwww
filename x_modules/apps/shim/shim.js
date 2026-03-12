import { factory2d } from '../../../factory/factory2d.js'

class Shim{

    constructor( initObj ) {
        
        var dat = initObj.data;
        var container_in = initObj.target;

        var shimhtml = `
            <body style="background-color:#010101;">
                <div id="shimcont" style="width:100%; min-width:300px; color:#9cff00; border:solid black 0.3px;">
                    <style>
                        #shimframe {
                            width: 100%;
                            height: 100%;
                            border: none;
                            margin: 0;
                            padding: 0;
                            display: block;
                        }
                    </style>
                    <iframe id="shimframe" src="http://192.168.1.251:7777/gui"> 
                    </iframe>

                </div>
            </body>        
        `
        this.bogel = { "wow":"3000" }
        container_in.insertAdjacentHTML( 'beforeend' , shimhtml );

        const shimframe = container_in.querySelector('#shimframe');
        if (shimframe && dat && dat.data && dat.data['url']) {
            shimframe.src = dat.data['url'];
        }

        const iframe = container_in.querySelector('#shimframe');
        iframe.addEventListener('load', function( e ){
            const domain = window.location.hostname;
            iframe.contentWindow.postMessage({ domain: domain }, '*');
        }.bind(this));
    }

    onDataUpdate( data_in ){


    }

}

export { Shim }