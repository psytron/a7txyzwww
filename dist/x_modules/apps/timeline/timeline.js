

import { Elx } from '/x_modules/elx.js'
import { GameObject } from '/x_modules/gameobject/index.js'


class Timeline extends GameObject{

    constructor( initObj ) {
        super( initObj )
        
        var dataObj = initObj;
        
        //var vnode = factory2d.renderNodeSync( 'timeline', initObj.data )                
        //var anode = this.container.appendChild( vnode ) // append vnode after all mutations         

        var anode = this.renderNode( 'timeline', dataObj )

    }


}

export { Timeline }