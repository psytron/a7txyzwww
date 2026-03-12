

import { Kvs } from '../../../x_modules/apps/kvs/kvs.js'
import { Elx } from '../../../x_modules/elx.js'

import VanillaQR from "../../../web_modules/vanillaqr.js"

import gluemapper from '../../../util/gluemapper.js'

import { factory2d } from '../../../factory/factory2d.js'


var count=11;
class Buysell extends Elx{

    constructor( initObj ) {
        super( initObj )
        // better to have initObj ? 
        // if 'container' in initObj else 'body'
        // if 'data' in initObj else {}
        // if 'id' in initObj else 'qr'
        this.count = 1000;
        var obj = initObj.data;
        this.initObj = initObj;
        this.uuid = initObj.data.data.uuid;
        
        this.model = obj.data.model;

        var label = "inserted"
        if( 'label' in obj.data ){
            label = obj.data.label.toLowerCase();    
        }
        
        
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


        var vnode = factory2d.renderNodeSync( 'buysell', obj.data )
        
        var functionality_map_of_fields = {
            'xclass':{ 'display1':'name' , 'display2':'price'},
            'alias':{ 'display1':'name' , 'display2':'price'},
            'repo':{ 'display1':'name' , 'display2':'label'}
        }

        
       
        //this.inject( vnode , obj.data )
        // TEMP SUSPEND GLYPH INJECT UNTIL PERFORMANCE FIX FOR ICONS: 
        //vnode.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';
        //vnode.querySelector('#qrbox').insertAdjacentHTML( 'afterbegin' , '<qr-code data="'+label+'" margin="0" modulesize="2"></qr-code>' );

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
        //vnode.querySelector('#qrbox').appendChild(qr.domElement);

        // ITEM LOGO
        if( 'domain' in obj.data ){
            var domain_elem = document.createElement("img");
            domain_elem.src = 'media/domain/'+obj.data.domain+'.png';
            domain_elem.style.display='block';
            domain_elem.style.marginLeft = "4px";
            domain_elem.style.width=vnode.querySelector('#qrbox').children[0].width+'px';
            vnode.querySelector('#domainbox').appendChild(domain_elem);
        }

        // POPULATE FIELDS: ( here bi-modal-destructure[]{} didnt work. )
        var disps = gluemapper.xclass_method_object( label , 'display', obj.data  )
        
        //vnode.querySelector('#display1').value = disps[0]
        //vnode.querySelector('#display2').value = disps[1]

        // FLIP TOP ICONS
        //if( 'ndx' in initObj && initObj.ndx >1 ){
        //    vnode.querySelector('.iditemholder').style.flexDirection='row-reverse';    
        //}
        

        // vnode.querySelector('#display1').addEventListener('input', function(e){
        //     // console.log('what input',e.target.value,data_in.uuid, this.model )
        //     // var updateObj = {} // updateObj[ field_aliases[ data.label ][ 'display1'] ] = e.target.value;
        //     // would resolve to: field_aliases[ 'repo' ]['display1'] => 'name'; 
        //     // => updateObject=> { 'name':e.target.value }
        //     this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        // }.bind(this))        
        

        // PASS THE NODE MODIFIABLE DATA ONLY 
        const { body, links,plane,sprite,tele, ...allExceptThe } = obj.data;
        var trobj = { trans:'NCNC1' , id:'0x0a3e2a436a'}
        this.kvs = new Kvs( { container: vnode.querySelector('#qr_keyval') , data:trobj  }  )

        this.kvs.addEventListener( 'kvInputEvent' , function(e){
            console.log(' QR hears kvInputEvent ')
            this.model.updateObject( this.uuid , e.detail  )
        }.bind(this));
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

export { Buysell }



        //var gl = new gluemapper( { fieldname: })

        //var DISP1 = gluemapper.pull( obj.data , label , 0 )
        //var DISP2 = gluemapper.pull( obj.data , label , 1 )
        
        // THIS WILL SHORTLY REPLACE THE TWO LINES ABOVE: 
        //