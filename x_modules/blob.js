
import { ElementX } from '/x_modules/elx.js'
class Blob extends ElementX {
    constructor( initObj ){
        super( initObj );
        //this.render();
        console.log(' RNTS: ')
        console.log( this.whoIsMyParent() )
        
    }
    ping(){
        //this.dispatchEvent( 'flyEvent' , {'detail':{'x':'111','y':'222'}} )        
    }
    render(){
        this.innerHTML= `<span>BLobspan</span>`;
    }    
}

export { Blob };