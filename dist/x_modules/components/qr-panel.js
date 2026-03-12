

class QrPanel {

    constructor( container_in ,  obj  , desired_id ) {
        
        // better to have initObj ? 
        // if 'container' in initObj else 'body'
        // if 'data' in initObj else {}
        // if 'id' in initObj else 'qr'

        

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
        //var shadow = this.attachShadow({mode: 'open'});
        //shadow.innerHTML = `<p>Hello, ${ wot }</p>`;
        // attach custom listeners 
        console.log(' parent log in dynamic QR subclass: ', parent)
        //con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        // fil in the image from obj
        // con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
    }

    onDataUpdate( data_in ){
        
    }

}

export { QrPanel }