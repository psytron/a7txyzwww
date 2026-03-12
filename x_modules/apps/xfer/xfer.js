//import { Kvs } from '/x_modules/kvs.js'
import { Kvs } from '../../../x_modules/apps/kvs/kvs.js';
import { factory2d } from '../../../factory/factory2d.js';

class Xfer{

    constructor( initObj ) {
        
        var obj = initObj.data
        var container_in = initObj.target;
        var vnode = factory2d.renderNodeSync( 'xfer', obj )
        var model = obj.model;
        var fromId = obj.fromId;
        var toId = obj.toId;
        this.initObject = initObj;
        this.holder = vnode.querySelector('#xfer_keyval');

        var kvals = { origin:obj.origin||'NEW' , type:obj.type||'unknown' , slota:obj.a||'00000001' , slotb:obj.b||'00000001'} ;
        this.kvs = new Kvs( { container: vnode.querySelector('#xfer_keyval') , data:kvals }  )

        this.kvs2 = new Kvs( { container: vnode.querySelector('#xfer_keyval') , data:obj.data , color:true }  )

        vnode.querySelector('#delete_edge').addEventListener('click', function(e){

            console.log(' delete edge ');
            model.removeLink( fromId , toId )
            var a=1

        }.bind(this))
        vnode.querySelector('#sync_edge').addEventListener('click', function(e){

            console.log(' sync edge ');
            model.saveLink( fromId , toId )
            var a=1

        }.bind(this))        

        this.kvs.addEventListener( 'kvInputEvent' , function(e){
            console.log(' XFER hears kvInputEvent ')
            model.updateLink( fromId, toId , e.detail  )
            //this.model.updateObject( this.uuid , e.detail  )
        }.bind(this));
        
        var anode = container_in.appendChild( vnode ) // append vnode after all mutations         
    }

    /*
    constructorOG( container_in ,  obj  , desired_id ) {

        //container_in.insertAdjacentHTML( 'beforeend' , factory2d.renderSync( 'xfer', obj ) );
        var vnode = factory2d.renderNodeSync( 'xfer', obj )
        var model = obj.data.model;
        var fromId = obj.fromId;
        var toId = obj.toId;
        
        this.holder = vnode.querySelectorAll('#xfer_keyval')[0]
        this.kvs = new Kvs( { container:this.holder }  )
        this.tmplt = this.holder.querySelector('.item').cloneNode(true);
        var tmp = this.tmplt;
        this.holder.innerHTML='';
        for( var i in obj.data ){    
            this.addKvItem( i , obj.data[i])
        }

        // How do we determine what is a graph and what is an edge // 
        // Vission ( Visual Mission Control ) https://vission.ai
        vnode.querySelector('#xfer_plus').addEventListener('click', (e)=>{
            console.log(' add keyval ')
            this.addKvItem('','')
            //model.updateLink( fromId , toId , { tag:e.target.value } )
        })  
        
        // append vnode to dom only after all mutations 
        var anode = container_in.appendChild( vnode )
        
    }

    addKvItem( k ,v ){
        var toins = this.tmplt.cloneNode(true);
        toins.querySelector('#xfer_key').value=k;
        toins.querySelector('#xfer_key').addEventListener('input', (e)=>{
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            console.log('typing key ')
            //this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        })              

        toins.querySelector('#xfer_removeitem').setAttribute("kvid", k);
        toins.querySelector('#xfer_removeitem').addEventListener('click', (e)=>{
            this.id = k;
            e.target.yoyo=k;
            console.log(' Remove keyval ',k , this.id ,e.target.getAttribute("kvid") )
            e.target.parentElement.remove()
            //this.removeItem()
            //model.updateLink( fromId , toId , { tag:e.target.value } )
        })  

        toins.querySelector('#xfer_val').value=v;
        toins.querySelector('#xfer_val').addEventListener('input', (e)=>{
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            console.log('typing val ')
            //this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        })                      
        this.holder.appendChild( toins )
    } 

    removeKvItem( k ){}
    onDataUpdate( data_in ){}

    */
    


}

export { Xfer }




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




/*
vnode.querySelector('#xfer_key').value=obj.data.name;
vnode.querySelector('#xfer_key').addEventListener('input', (e)=>{
    model.updateLink( fromId , toId , { name:e.target.value } )
})
vnode.querySelector('#xfer_val').value=obj.data.tag;
vnode.querySelector('#xfer_val').addEventListener('input', (e)=>{
    model.updateLink( fromId , toId , { tag:e.target.value } )
})*/  

//var tclone =  vnode.cloneNode(true);
//var zclone =  vnode.cloneNode();
// attach custom listeners 
// fil in the image from obj
// con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';        
/*
for( var i in obj.data ){    

    var toins = tmp.cloneNode(true);
    toins.querySelector('#xfer_key').value=i;
    // YOU ARE HERE 
    // ATTACH LISTENER FOR REMOVE: 
    toins.querySelector('#xfer_removeitem').setAttribute("kvid", i);
    toins.querySelector('#xfer_removeitem').addEventListener('click', (e)=>{
        this.id = i;
        e.target.yoyo=i;
        console.log(' remove keyval ',i , this.id ,e.target.getAttribute("kvid") )
        e.target.parentElement.remove()
        //this.removeItem()
        //model.updateLink( fromId , toId , { tag:e.target.value } )
    })  

    toins.querySelector('#xfer_val').value=obj.data[i];
    this.holder.appendChild( toins )
    //holder.insertAdjacentHTML('beforebegin' , '<div style="display:flex; justify-content:space-between;">'+'<input value="'+i+'"></input>'+'<input value="'+obj.data[i]+'"></input>'+'</div>' )
}*/

