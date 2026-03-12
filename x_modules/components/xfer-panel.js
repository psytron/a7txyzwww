

class XferPanel {

    constructor( container_in ,  obj  , desired_id ) {

        container_in.insertAdjacentHTML( 'beforeend' , factory2d.render( 'xfer', obj ) );
        // attach custom listeners 
        // fil in the image from obj
        // con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        var model = obj.data.model;
        var fromId = obj.fromId;
        var toId = obj.toId;

        var tmplt = container_in.querySelectorAll('#xfer_keyval')[0].innerHTML;

        console.log( tmplt )
        container_in.querySelector('#xfer_name').value=obj.data.name;
        container_in.querySelector('#xfer_name').addEventListener('input', (e)=>{
            model.updateLink( fromId , toId , { name:e.target.value } )
        })
        container_in.querySelector('#xfer_tag').value=obj.data.tag;
        container_in.querySelector('#xfer_tag').addEventListener('input', (e)=>{
            model.updateLink( fromId , toId , { tag:e.target.value } )
        })
        
    }

    onDataUpdate( data_in ){
        
    }

}

export { XferPanel }




/*
var dat= obj.dat;
this.model = obj.data.model;
container_in.insertAdjacentHTML( 'beforeend' , factory2d.render( 'qr', obj.data ) );
var qr_panels = container_in.querySelectorAll('#qr')

var label= obj.data.label.toLowerCase();
var panel = qr_panels[ qr_panels.length-1 ] 
panel.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';



panel.querySelector('#supereditabletitle').addEventListener('input', function(e){
    //console.log('what input',e.target.value,data_in.uuid, this.model )
    this.model.updateObject( obj.data.uuid , { name:e.target.value } )
}.bind(this))
*/