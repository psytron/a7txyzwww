

import { Kvs } from '../../../x_modules/apps/kvs/kvs.js'
import { Elx } from '../../../x_modules/elx.js'

import VanillaQR from "../../../web_modules/vanillaqr.js"

import gluemapper from '../../../util/gluemapper.js'

import { factory2d } from '../../../factory/factory2d.js'


var count=11;
class Detail extends Elx{

    constructor( initObj ) {
        super( initObj )
        // better to have initObj ? 
        // if 'container' in initObj else 'body'
        // if 'data' in initObj else {}
        // if 'id' in initObj else 'qr'
        this.count = 1000;
        var node = initObj.data;
        this.node=initObj.data;
        this.initObj = initObj;
        this.uuid = initObj.slot;
        
        this.model = node.model;
        var label= node.payload.labels ? node.payload.labels[0] : node.payload.label.toLowerCase();
        
        /*
        container_in.insertAdjacentHTML( 'beforeend' , factory2d.renderSync( 'qr', obj.data ) );
        var qr_panels = container_in.querySelectorAll('#qr')
        var panel = qr_panels[ qr_panels.length-1 ] 
        panel.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        panel.querySelector('#qrbox').insertAdjacentHTML( 'afterbegin' , '<qr-code data="'+label+'" margin="1" modulesize="2"></qr-code>' );
        panel.querySelector('#supereditabletitle').addEventListener('input', function(e){
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        }.bind(this)) */


        var vnode = factory2d.renderNodeSync( 'qr', node.payload )
        
        var functionality_map_of_fields = {
            'xclass':{ 'display1':'name' , 'display2':'price'},
            'alias':{ 'display1':'name' , 'display2':'price'},
            'repo':{ 'display1':'name' , 'display2':'label'}
        }

       
        // YOU ARE HERE 
        // NEXT STEP IS  
        // 
       
        //this.inject( vnode , obj.data )
        // TEMP SUSPEND GLYPH INJECT UNTIL PERFORMANCE FIX FOR ICONS: 
        //vnode.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        //vnode.querySelector('#qrbox').insertAdjacentHTML( 'afterbegin' , '<qr-code data="'+label+'" margin="0" modulesize="2"></qr-code>' );

        // ITEM QR 
        var qr = new VanillaQR({
            //url: "https://github.com/chuckfairy/VanillQR.js",
            url: 'http://vi55ti'+'addhereIDandURL',
            size: 80,
            colorLight: "#00000000",
            colorDark: "#00FFFF",
            toTable: false,//output to table or canvas
            ecclevel: 1,//Ecc correction level 1-4
            noBorder:true,//Use a border or not
            borderSize: 4//Border size to output at
        });
        vnode.querySelector('#qrbox').appendChild(qr.domElement);

        // ITEM LOGO

        var brnd = gluemapper.xclass_brand( label , 'brand', node.payload )
        
        if( brnd ){
            var domain_elem = document.createElement("img");
            domain_elem.src = brnd;
            domain_elem.style.display='block';
            domain_elem.style.marginLeft = "4px";
            domain_elem.style.width=vnode.querySelector('#qrbox').children[0].width+'px';
            vnode.querySelector('#domainbox').appendChild(domain_elem);
        }

        // POPULATE FIELDS: ( here bi-modal-destructure[]{} didnt work. )
        var disps = gluemapper.xclass_method_object( label , 'display', node.data  )
        
        vnode.querySelector('#display1').value = disps[0]
        vnode.querySelector('#display2').value = disps[1]

        // FLIP TOP ICONS
        //if( 'ndx' in initObj && initObj.ndx >1 ){
        //    vnode.querySelector('.iditemholder').style.flexDirection='row-reverse';    
        //}
        
        vnode.querySelector('#display1').addEventListener('input', function(e){
            // console.log('what input',e.target.value,data_in.uuid, this.model )
            // var updateObj = {} // updateObj[ field_aliases[ data.label ][ 'display1'] ] = e.target.value;
            // would resolve to: field_aliases[ 'repo' ]['display1'] => 'name'; 
            // => updateObject=> { 'name':e.target.value }
            this.model.updateObject( node.id , { name:e.target.value } )
        }.bind(this))        

        vnode.querySelector('.mode_button').addEventListener('click', function(e){
            console.log('  SAVE OBJECT:   ')
            // WURD 
            this.model.saveObject( node )
        }.bind(this))                

        
        

        // PASS THE NODE MODIFIABLE DATA ONLY 
        const { body, links,plane,sprite,tele, ...allExceptThe } = node.data;

        // CONTAINER KVS 
        var kvals = { origin:node.origin||'NEW' , type:node.type||'unknown' , slot:node.slot||'00000001' } ;
        this.kvsc = new Kvs( { container: vnode.querySelector('#qr_keyval') , data:kvals }  )
        this.kvsc.addEventListener( 'kvInputEvent' , function(e){
            console.log(' QR hears kvInputEvent ')
            this.model.updateObject( this.node  , e.detail  )
        }.bind(this));                

        // PAYLOAD KVS 
        this.kvs = new Kvs( { container: vnode.querySelector('#qr_keyval1') , data:node.payload  }  )
        this.kvs.addEventListener( 'kvInputEvent' , function(e){
            console.log(' QR hears kvInputEvent ')
            this.model.updateObject( this.node , e.detail  )
        }.bind(this));


        // SHOW NESTED PROPERTIES 
        if( node.payload.properties ){
            this.kvs = new Kvs( { container: vnode.querySelector('#qr_keyval2') , data:node.payload.properties  }  )
            this.kvs.addEventListener( 'kvInputEvent' , function(e){
                
                this.model.updateObject( this.node.payload.properties , e.detail  )
            }.bind(this));      
            
        }
  


        initObj.target.appendChild( vnode )
        //var shadow = this.attachShadow({mode: 'open'});
        //shadow.innerHTML = `<p>Hello, ${ wot }</p>`;
        // attach custom listeners 
        //con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        // fil in the image from obj
        // con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
    }

    onDataUpdate( data_in ){
        
    }
    increment(){
        count+=1;
        return { count , thiscount:this.count };
    }
    increment2(){
        this.count+=1;
        return { count , thiscount:this.count }; 
    }    
}

export { Detail }



        //var gl = new gluemapper( { fieldname: })

        //var DISP1 = gluemapper.pull( obj.data , label , 0 )
        //var DISP2 = gluemapper.pull( obj.data , label , 1 )
        
        // THIS WILL SHORTLY REPLACE THE TWO LINES ABOVE: 
        //