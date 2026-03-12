

class Tote{

    constructor( initObj ) {
        
        var obj = initObj.data
        var container_in = initObj.target;
        var vnode = factory2d.renderNodeSync( 'tote', obj )
        var model = obj.data.model;
        var fromId = obj.fromId;
        var toId = obj.toId;
        
        var anode = container_in.appendChild( vnode ) // append vnode after all mutations         
    }


}

export { Tote }




