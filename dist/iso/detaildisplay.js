import { gsap } from '../web_modules/gsap.js'
import { TweenMax , Expo } from '../web_modules/gsap.js'
import gluemapper from '../util/gluemapper.js'

import { Qr } from '../x_modules/apps/qr/qr.js'
import { Detail } from '../x_modules/apps/detail/detail.js'
import { Buysell } from '../x_modules/apps/buysell/buysell.js'
import { List } from '../x_modules/apps/list/list.js'
import { Pricelist } from '../x_modules/apps/pricelist/pricelist.js'
import { Timeseries } from '../x_modules/apps/timeseries/timeseries.js'
import { Xfer } from '../x_modules/apps/xfer/xfer.js'
import { Terminal } from '../x_modules/apps/terminal/terminal.js'
import { Cex } from '../x_modules/apps/cex/cex.js'
import { Hexframe } from '../x_modules/apps/hexframe/hexframe.js'
import Funbay from '../x_modules/apps/funbay/funbay.js'

import { factory2d } from '../factory/factory2d.js'
import validator from '../util/validator.js'
// FOR rendering inline avatar of selected item: temp removed
// import { startGlyph } from '/x_modules/miniglyph.js'
   

function DetailDisplay(){
    
        
    this.constructor=function (){
        var parent = this;
        this.model; 
        this.drawer;
        this.drawer2;
        this.drawer_open = 0;
        this.iter = 0;
        this.panels = []

        // SELECT PANELS PER XCLASS AVATAR TYPE 
        // token needs:  buy sell swap xfer display 
        // address: SEND , Receive Display , Route Receive 
        this.capability_matrix = {
            alias:
            {
                init:(o)=>{    return []  }
                    
            }
        }


        // THIS HAS TO BE DONE FOR BUNDELER NOT TO SHAKE OFF CLASSES
        // SINCE THEY ARENT INLINE INSTANTIATED
        this.futureclasses = {
           Qr, Timeseries, Xfer, Terminal, Hexframe, List , Pricelist ,  Funbay , Cex, Buysell, Detail 
        };
        // FUTURE PANELS UI NEEDED: ( cache it )
        //function logLoaded( lib_in ){ console.log( lib_in +' Loaded.' )}
        //factory2d.load( 'qr' ).then( ( libx  ) =>{ console.log('qr loaded')} );   
        //factory2d.load( 'kvs' ).then( ( libx  ) =>{ console.log('kvs loaded ')} );           
        //factory2d.load( 'xfer' ).then( ( libx  ) =>{ console.log('xfer loaded')} );   
        //factory2d.load( 'terminal' ).then( ( libx  ) =>{ console.log('terminal loaded')} );   
        //factory2d.load( 'timeseries' ).then( ( libx  ) =>{ console.log('tiemseries loaded ')} );    
        // TODO: DATABASE LIST INPUT with AUTHENTICATED GLUEMAPPER 
        factory2d.loadAll( 
            ['x_modules/apps/qr/qr.html',
             'x_modules/apps/kvs/kvs.html',
             'x_modules/apps/list/list.html',
             'x_modules/apps/xfer/xfer.html',
             'x_modules/apps/list/listitem.html',
             'x_modules/apps/terminal/terminal.html',
             'x_modules/apps/funbay/funbay.html',
             'x_modules/apps/timeseries/timeseries.html',
             'x_modules/apps/cex/cex.html',
             'x_modules/apps/buysell/buysell.html']
            ).then( ( libx )=>{  console.log('library loaded') }  );   
        window.factory2d = factory2d;
        
        //this.onLogEvent = this.onMapChangeEvent.bind(this)
        //this.printTerm = this.printTerm.bind(this)

        this.onFocusEvent=function( eventObj ){
            this.model = eventObj.detail.model;
            if( model.focusobject ){
                //var thegoods = ; 
                this.buildControls( this.model.focusobject )
                
                // SLIDE PANEL 
                this.drawer_open=1;
                TweenMax.to(this.drawer, 2, {top:10 ,ease:Expo.easeOut});
                TweenMax.to(this.drawer2, 2, {bottom:50 ,ease:Expo.easeOut});
            }else{
                this.drawer_open=0;
                TweenMax.to(this.drawer, 2, {top:-400 , ease:Expo.easeOut} );
                TweenMax.to(this.drawer2, 2, {bottom:-400 , ease:Expo.easeOut} );
                //this.reset();
            }
        }.bind(this)
    }
    this.constructor();

    this.onFabricEvent = function ( e ){
        var focusObject = e.detail.model.focusobject;
        console.log(' Fabric Event in Detail Display: : ', e.detail )
        // THIS METHOD DISTRIBUTES THE CALL TO ALL PANELS 
        // IF ACTIVE ID IN DETAIL IS RECEIVED 
        if( focusObject && focusObject.id == e.detail.obj.uuid ){

            console.log( ' RELEVENT EVENT')
            console.log( this.panels ) 

            for( var p in this.panels ){
                console.log(" detail panel: ",p)
                try{
                    this.panels[p][e.detail.obj.method ]( e.detail.obj )
                }catch(e){
                    
                }
            }
        }

        // if( e.detail.obj.method == 'fetchBalances' ){

        //     console.log( e.detail.obj )
        // }

        // if( e.detail.obj.method == 'timeSeries' && focusObject.id == e.detail.obj.uuid ){

        //     console.log( e.detail.obj )
        //     this.panels[2][ e.detail.obj.method ]( e.detail.obj )
        // }
        // if( e.detail.obj.method == 'pricedBalances' && focusObject.id == e.detail.obj.uuid ){

        //     console.log( e.detail.obj )
        //     this.panels[1][ e.detail.obj.method ]( e.detail.obj )
        // }        
        
    }.bind( this )

    this.toggleDrawer=function(){
        if( this.drawer_open){
            this.drawer_open=0;
            TweenMax.to(this.drawer, 2, {top:-580 , ease:Expo.easeOut} );
            TweenMax.to(this.drawer2, 2, {bottom:-580 , ease:Expo.easeOut} );
            //TweenMax.to(sortmenu, 2, {right:-580 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{
            //TweenMax.to(sortmenu, 2, {right:0 , ease:Expo.easeOut} );
        }
    }


    this.headerTemplateBLANK=function( vl ){
        var tmpl =`<div class='coltitle' style="border-top:solid #0075a7 1px;"></div>`
        return tmpl
    }
    this.headerTemplate=function( val ){
        var tmpl =`<div class='coltitle' style=" border-bottom:solid #0093ad 1px;">${val}</div>`
        return tmpl
    }    
    this.updateControls=function( data_in ){

    }
    this.selfContain=function( xclass_in , data_in ){
        // this will be inside component 
        //factory2d.render('qr', data_in ) 
        //factory2d.render('anglezone', data_in )
        //factory2d.render('greenlogo', data_in )
    }

    this.newClass=function( container_in , xclass_in , dat , id_in , ndx_in ){
        // Auto cap 
        // var xclass = ( xclass_in.charAt(0).toUpperCase() + xclass_in.slice(1) ) + 'Panel';
        var xclass = ( xclass_in.charAt(0).toUpperCase() + xclass_in.slice(1) ); // Capitalize Class name
        var class_ref = this.futureclasses[ xclass ]
        
        var obj =  { target:container_in , data:dat , id_in:id_in , ndx:ndx_in };
        var p;
        if( typeof( class_ref ) == 'function' ){
            p =  new class_ref( obj );    
        }else{
            p = class_ref;
            p.init( obj )
        }
        
        return p;
    }

    this.buildControls=function( obj ){

        var con1 = this.con.querySelector('#detailpanelholder')        
        con1.innerHTML='';

        
        // RESET ACTIVE PANELS 
        this.panels = []; 

        var label;
        if( 'labels' in obj.payload ){
            label =  obj.payload.labels[0];
        }else if( 'label' in obj.payload ){
            label = obj.payload.label; 
        }else{
            label = 'connects'; 
        }
        

        // Eventuall map this to the module itself
        // E.g. module knows its best arrangement. 

        // soon xclasss 
        var detected_xclass = label.toLowerCase(); 
        label = detected_xclass;
        
        //label = ('label' in obj.payload )?  : 'connects';
        // GET ARRAY OF CAPABILITY DEMANDS FOR THIS XCLASS 
        var caplist = gluemapper.xclass_caps( label , 'caps' , obj.payload );
        
        // ATTACH PANELS 
        if( model.focusobjecttype == 1){
            var fromObj = model.getNodeByUUID( obj.fromId )
            var toObj = model.getNodeByUUID( obj.toId )
            this.newClass( con1 ,  caplist[0] , fromObj , 'some_id1', 0)
            this.newClass( con1 ,  caplist[1] , obj ,     'some_id2', 1)
            this.newClass( con1 ,  caplist[2] , toObj ,   'some_id3', 2)
        }else if( model.focusobject.payload.label == 'Module' ){
            var winds=[];
            console.log('Module clicked: ')
            caplist.forEach( function(item, index){
                var nc = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
                var a = nc;
                winds.push( nc );
            }.bind(this));       
            var j=3;      
        }
        else{
            caplist.forEach( function(item, index){
                var ncyo = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
                this.panels.push( ncyo )
                var k = 9; 
            }.bind(this)); 
        } 
    }


    this.render=function() {
        var con = document.createElement('div')
        this.con=con;
        con.setAttribute("id", "detailpanel2");
        document.body.appendChild( con );
        this.con.innerHTML = `
            <style>
                .confpanel{
                    width:32%;
                    min-width:300px; 
                }
                .submenutitle{
                    font-size:10px;
                    color:white;
                    border: none;                        
                    outline: none;
                    background: transparent;
                    border: none transparent;
                    border-color: transparent;
                }        
                .noselect {
                  -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Safari */
                     -khtml-user-select: none; /* Konqueror HTML */
                       -moz-user-select: none; /* Old versions of Firefox */
                        -ms-user-select: none; /* Internet Explorer/Edge */
                            user-select: none; /* Non-prefixed */
                }    
                input{
                    font-size:10px;
                }                         
            </style>
            <div id="slide_drawer" style="position:absolute; display:flex; width:100%; height:0px; top:-600px; text-align:right; background:#000000de;">
                <input type='text' id='mapname' class='submenutitle' style="" value="MAP NAME"></input>
            </div>
            <div id="slide_drawer2" class='noselect' style="position:absolute; width:100%; height:300px; bottom:-600px;  background:#000000de; padding-top:6px; border-top:solid #0e2f33 1px;">
                <div id="closebuttonxl" style="position:relative; top:0px; right:0px;  width:70px; cursor:pointer; " class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width='64' height='40'
                        style='overflow:hidden; border:solid green 1px;'>
                        <line x1="0" y1="-10" x2="62" y2="50" style="stroke:rgb(25,248,0);stroke-width:11" />
                        <line x1="0" y1="50"  x2="62" y2="-10" style="stroke:rgb(25,248,0);stroke-width:11" />
                    </svg>
                </div>
                <div class="containerfx" style="color:red;">
                    <div id="detailpanelholder" style="display:flex;">
                    </div>    
                </div>
                <div id="glyphbox" style="">

                </div>
            </div>`;
        this.drawer = this.con.querySelector('#slide_drawer')
        this.drawer2 = this.con.querySelector('#slide_drawer2')
        this.drawer2.querySelector('#closebuttonxl').addEventListener('click', function(event) {
            window.controller.setFocusObject( false )
            window.dispatchEvent( new CustomEvent( 'focusRemovedEvent' , { detail:{} }) )
        })


        //startGlyph( { label:'alias'  , campos:[0,0,2.5] , camlook:[0,0,0], objrot:[Math.PI/4], holder:this.con.querySelector('#glyphbox') } )

        
    }
    this.render(); 
}

export { DetailDisplay }







// cancel need for custom element due to 
//customElements.define('detail-panel', DetailPanel );


// PRELOAD PANEL COMPONENTS UNTIL ASYNC PROMISE WORKS ON ALL BROWSERS 
//import { QrPanel } from '/x_modules/components/qr-panel.js';
//import { TimeseriesPanel } from '/x_modules/components/timeseries-panel.js';
//import { XferPanel } from '/x_modules/components/xfer-panel.js';
//import { TerminalPanel } from '/x_modules/components/terminal-panel.js';

/*

    
    // THIS DOUBLE NESTS THE CUSTOM ELEMENT TAG and CAUSES RENDER PROBLEMS FOR DESIGNERS: 
    this.newComponent=function( container_in , xclass , dat , id_in ){
        // FUTURE USE ELIMINATES IMPORTS ON TOP 
        //import xclass from '/x_module/components/'+class+'-panel.js'.then( ( module )=>{ con1.insert( module ) } )
        //import('/x_modules/components/'+xclass+'.js').then( (module) => {
        container_in.insertAdjacentHTML('beforeend','<'+xclass+' id="'+id_in+'"></'+xclass+'>' )
        var app_ref = container_in.querySelector('#'+id_in+'');
        app_ref.onDataUpdate( dat )            
    }


    this.newClassDynamicWorking9999=function( container_in , xclass , dat , id_in ){
        xclass = ( xclass.charAt(0).toUpperCase() + xclass.slice(1) ) + 'Panel';
        var class_ref = eval(xclass);
        var p =  new class_ref( container_in, dat , id_in )
        return p;
        // THIS WORKS on 9999 but not in Parcel Bundle ( likely bundle can't follow eval )
    }
*/

        // this.cap_map={
        //     'repo':['qr','hexframe'],
        //     'tower':['qr','terminal'],
        //     'project':['qr','terminal'],            
        //     'alias':['qr','timeseries'],
        //     'module':['qr','qr','funbay'], 
        //     'token':['qr','qr','qr'], 
        //     'service':['qr','terminal'],
        //     'exchange':['qr','funbay'],
        //     'exchange1':['stored_key','time_series'],
        //     'wordpress1':['auth','anglezone','greenlogo'],
        //     'app1':['tags','app_domain','auth'],
        //     'connects':['qr','xfer','qr'],
        //     'owns':['qr','xfer','qr'],
        //     'transfers':['qr','xfer','qr'],
        //     'link':['qr','xfer','qr'],
        //     'listd':['list','list','list']
        // }

// Michal cooks, cleans for days deposits money from savings *
// Rafal response: " I want nothing to do with you on social level "
// Broccolli in your teeth: Insulting those that drain their life to help you
// Broccolli all over your face: Espouse virtue to fathers face, forsake legacy behind back. 
