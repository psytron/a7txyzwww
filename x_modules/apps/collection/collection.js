




import { Kvs } from '../../../x_modules/apps/kvs/kvs.js'
import { Elx } from '../../../x_modules/elx.js'

import VanillaQR from "../../../web_modules/vanillaqr.js"

import gluemapper from '../../../util/gluemapper.js'
//import { factory2d } from '../../../factory/factory2d.js'


                         // ELX is Viewable Object , 
                         // can nest children , 
                         // can emit events , 
                         // has own level discovery ,
                         // MovieClip 

class Collection extends Elx{

    constructor( initObj={ stack:'vert' , elem:'wer' , items:[] }) {
        // RECEIVE INIT OBJECT has ITEMS and Various instructions 
        // attach the items to container 
        // and register event listeners for clicks  , 
        // render and display the items 
        
        super( initObj )
        this.initObj = initObj;

        var tile = ( 'tile' in initObj ) ? initObj.tile : 'appItemTile';

        var functionality_map_of_fields = {
            'xclass':{ 'display1':'name' , 'display2':'price'},
            'alias':{ 'display1':'name' , 'display2':'price'},
            'repo':{ 'display1':'name' , 'display2':'label'}
        }

        var vnode = factory2d.renderNodeSync( tile , {} )
        for (var i = 0; i < this.initObj.items.length; i++) {
            var obj = this.initObj.items[i];
            
            var clonedNode = vnode.cloneNode(true);
            this.container.appendChild(clonedNode);
            gluemapper.pushx( obj , clonedNode );

            // IMAGE 
            // ONLY 
            let imageUrl;
            if ('img' in obj) {
                imageUrl = `url('../media/domain/${obj.img}.png')`;
            } else if ('name' in obj) {
                imageUrl = `url('../media/domain/${obj.name}.png')`;
            } else {
                imageUrl = 'url(\'../media/domain/undefined.png\')';
            }

            try{
                var img = clonedNode.querySelector("#image");
                img.style.backgroundImage = imageUrl;
            }catch( e ){}
            
            try{
                clonedNode.setAttribute('fn', obj.fn);
            }catch(e){}
            
            // also works; 
            // var resNode = factory2d.renderNodeSync('appItemTile' , obj ); 
            //this.container.appendChild(resNode);
        }
        

    }

    itemTemplate2( obj_in ){
        let template_item=`
            <div class="griditem">
                <div class="griditemcolumn">
                    ${obj_in.symbol}
                </div>
                <div  class="griditemcolumn">
                    (${obj_in.price})
                </div>
                <div  class="griditemcolumn">
                    [${obj_in.price}]
                </div>                    
                
                <div  class="griditemcolumn">
                    <img src="img/icons/angle-down-solid.svg" class="redarrow" style=" vertical-align:middle;"/>
                    ${obj_in.price}
                </div>
            </div>`
        return template_item
    }
  
    onDataUpdate( data_in ){
        
    }

}

export { Collection }





        
        // initObj.elem.appendChild( vnode )
        
            // incoming looks like // 
        /*

        {
            "meta":{  "type" :"vert"  },

            OR 

            [ { "type":"map" } , {} ]  // bit multiple types cn be both row and grid   |   icon or line 
              // hmm it HAS to be native original type and xclass ,
              // display and view configurtion is separate 
        
        }
        */
        // better to have initObj ? 
        // if 'container' in initObj else 'body'
        // if 'data' in initObj else {}
        // if 'id' in initObj else 'qr'
        
        
        
        
        
        //this.model = obj.data.model;
        //var xclass = obj.data.label.toLowerCase();
        
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






        

        

        
       
        //this.inject( vnode , obj.data )
        // TEMP SUSPEND GLYPH INJECT UNTIL PERFORMANCE FIX FOR ICONS: 
        //vnode.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        //vnode.querySelector('#qrbox').insertAdjacentHTML( 'afterbegin' , '<qr-code data="'+label+'" margin="0" modulesize="2"></qr-code>' );

        /*
        // ITEM QR 
        var qr = new VanillaQR({
            //url: "https://github.com/chuckfairy/VanillQR.js",
            url: 'http://vi55ti'+obj.data.uuid,
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
        if( 'domain' in obj.data ){
            var domain_elem = document.createElement("img");
            domain_elem.src = 'media/domain/'+obj.data.domain+'.png';
            domain_elem.style.display='block';
            domain_elem.style.marginLeft = "4px";
            domain_elem.style.width=vnode.querySelector('#qrbox').children[0].width+'px';
            vnode.querySelector('#domainbox').appendChild(domain_elem);
        }

        //var gl = new gluemapper( { fieldname: })

        var DISP1 = gluemapper.pull( obj.data , label , 0 )
        var DISP2 = gluemapper.pull( obj.data , label , 1 )

        vnode.querySelector('#display1').value= DISP1
        vnode.querySelector('#display2').value= DISP2
        vnode.querySelector('#display1').addEventListener('input', function(e){
            // console.log('what input',e.target.value,data_in.uuid, this.model )
            // var updateObj = {} // updateObj[ field_aliases[ data.label ][ 'display1'] ] = e.target.value;
            // would resolve to: field_aliases[ 'repo' ]['display1'] => 'name'; 
            // => updateObject=> { 'name':e.target.value }
            this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        }.bind(this))        
        
        */

        // FLIP TOP ICONS
        //if( 'ndx' in initObj && initObj.ndx >1 ){
        //    vnode.querySelector('.iditemholder').style.flexDirection='row-reverse';    
        //}
        
        //var sym = '3f';
        //var vll = 'X'
        // let dv2 = document.createElement('div');
        // dv2.innerHTML = this.itemTemplate2( { symbol:sym, price:vll } );
        // vnode.insertAdjacentHTML( 'beforeend', dv2.innerHTML );

        /*
        var vnode = factory2d.renderNodeSync( 'appItemTile', {} )
        obj.data.price = Math.random();
        var objlist = obj.model.focusIndex;
        var subnode; 

        for( var o in objlist ){

                var nod = objlist[o];
                subnode = factory2d.renderNodeSync( 'listitem', nod.data );
                vnode.appendChild( subnode );    
                
        }*/

            
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'Hong Kong', price:'$32,000 / CM' } );
        // vnode.appendChild( subnode );

        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'Argentina', price:'$36,000 / Cap M' } );
        // vnode.appendChild( subnode );        
        
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'United States', price:'$11,000 / cap' } );
        // vnode.appendChild( subnode );      
        
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'China', price:'$12/cap' } );
        // vnode.appendChild( subnode );        
        
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'South Korea', price:'$11/cap' } );
        // vnode.appendChild( subnode );     
        
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'Tritun', price:'$30,000/gram' } );
        // vnode.appendChild( subnode );       
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'GOLD', price:'$1,400/gram' } );
        // vnode.appendChild( subnode );    
        
        
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'Water Liter', price:'$10/liter' } );
        // vnode.appendChild( subnode );       
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'Silver AG', price:'$1,400/gram' } );
        // vnode.appendChild( subnode );                             
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'StarLINK', price:'$532/share' } );
        // vnode.appendChild( subnode );       
        // obj.data.price = Math.random();
        // subnode = factory2d.renderNodeSync( 'listitem', {name:'AIR METER', price:'$1,400/m3' } );
        // vnode.appendChild( subnode );                             
        

        
        //initObj.target.appendChild( vnode )

        // PASS THE NODE MODIFIABLE DATA ONLY 
        /*
        const { body, links,plane,sprite,tele, ...allExceptThe } = obj.data;
        this.kvs = new Kvs( { container: vnode.querySelector('#qr_keyval') , data:allExceptThe  }  )

        this.kvs.addEventListener( 'kvInputEvent' , function(e){
            console.log(' QR hears kvInputEvent ')
            this.model.updateObject( this.uuid , e.detail  )
        }.bind(this));
        */
        
        //var shadow = this.attachShadow({mode: 'open'});
        //shadow.innerHTML = `<p>Hello, ${ wot }</p>`;
        // attach custom listeners 
        //con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        // fil in the image from obj
        // con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';