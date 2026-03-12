
import { GameObject } from '/x_modules/gameobject/index.js'
class Xcollection extends GameObject {


    constructor( initObj ){
        super( initObj )
        //this.template= initObj.template;

        this.container.innerHTML='<div id="collection" style="display:flex;flex-wrap: wrap;"></div>';

        var col_target= this.container.querySelector('#collection')

        for ( const x in initObj.data ){

            //console.log(' : ',initObj.data[x] )
            //var vnode = this.renderNode( 'backer' ,initObj.data[x] );
            var vnode = new GameObject( { target:col_target , ui:'backer' , data:initObj.data[x] } )
            console.log(' svinaod')

        }

    }

}

export { Xcollection }