import { gsap } from '../web_modules/gsap.js'
import { TweenMax , Expo } from '../web_modules/gsap.js'
import gluemapper from '../util/gluemapper.js'

import { Qr } from '../x_modules/apps/qr/qr.js'
import { Outline } from '../x_modules/apps/outline/outline.js'
import { Detail } from '../x_modules/apps/detail/detail.js'
import { Buysell } from '../x_modules/apps/buysell/buysell.js'
import { List } from '../x_modules/apps/list/list.js'
import { Pricelist } from '../x_modules/apps/pricelist/pricelist.js'
import { Timeseries } from '../x_modules/apps/timeseries/timeseries.js'
import { Xfer } from '../x_modules/apps/xfer/xfer.js'
import { Terminal } from '../x_modules/apps/terminal/terminal.js'
import { Lwc } from '../x_modules/apps/lwc/lwc.js'
import { Cex } from '../x_modules/apps/cex/cex.js'
import { Hexframe } from '../x_modules/apps/hexframe/hexframe.js'
import { Shim } from '../x_modules/apps/shim/shim.js'
import Funbay from '../x_modules/apps/funbay/funbay.js'
import Grid from '../x_modules/apps/grid/grid.js'
import { factory2d } from '../factory/factory2d.js'
import validator from '../util/validator.js'
// FOR rendering inline avatar of selected item: temp removed
// import { startGlyph } from '/x_modules/miniglyph.js'
   

function DetailDisplayV2(){
    
    this.constructor=function (){
        var parent = this;
        this.model; 
        this.drawer;
        this.drawer2;
        this.drawer_open = 0;
        this.iter = 0;
        this.panels = []

        // Drag state variables
        this.isDragging = false;
        this.dragStartY = 0;
        this.dragStartTop = 0;
        this.dragStartBottom = 0;
        this.currentTop = -600;
        this.currentBottom = -600;


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
           Qr, Timeseries, Xfer, Terminal, Hexframe, List , Pricelist ,  Funbay , Cex, Buysell, Detail,Shim, Outline
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
            ['/uix/prices.html',
             '/uix/poutline.html',
             '/uix/pricetiles.html']
            ).then( ( libx )=>{  console.log('library loaded in DDV2') }  );
        //window.factory2d = factory2d;
        
        //this.onLogEvent = this.onMapChangeEvent.bind(this)
        //this.printTerm = this.printTerm.bind(this)
    }
    this.onFocusEvent=function( eventObj ){
        this.model = eventObj.detail.model;
        if( model.focusobject ){
            //var thegoods = ; 
            this.buildControls( this.model.focusobject )
            // SLIDE PANEL 
            // this.drawer_open=1;
            // TweenMax.to(this.drawer, 2, {top:10 ,ease:Expo.easeOut});
            // TweenMax.to(this.drawer2, 2, {bottom:50 ,ease:Expo.easeOut});
        }else{
            this.drawer_open=0;
            TweenMax.to(this.drawer, 2, {top:-400 , ease:Expo.easeOut} );
            TweenMax.to(this.drawer2, 2, {bottom:-400 , ease:Expo.easeOut} );
            //this.reset();
        }
    }.bind(this)
    this.onDetailEvent=function( eventObj ){

        //var con1 = this.con.querySelector('#detailpanel2')        

        var model = eventObj.detail.model;
        eventObj = eventObj.detail.params; 
        if( eventObj ){
            // BUILD INITIAL UI 
            //this.buildControls( eventObj )

            this.con.innerHTML='';
            var cl = this.newClass( this.con , 'Outline' , eventObj , 'bigcontent_id1' ,  0);
            //       this.newClass( con1 , 'Qr' ,      fromObj , 'some_id1' ,  0);            
            
            // Find the element with class 'summary-column' inside this.con and assign it to 'outlineholder'
            var outlineholder = this.con.querySelector('#summary_column');
            // Iterate all key-values in eventObj and render them as summary sections
            if (eventObj && typeof eventObj === 'object') {
                for (let key in eventObj) {
                    if (eventObj.hasOwnProperty(key)) {
                        // Create the summary section node
                        var section = document.createElement('div');
                        section.className = "summary-section";
                        section.style.display = "flex";
                        section.style.alignItems = "center";
                        section.style.gap = "8px";
                        section.style.borderBottom = "1px solid #f2f2f2"; // very subtle line

                        // Label
                        var labelSpan = document.createElement('span');
                        labelSpan.className = "summary-label";
                        labelSpan.style.fontWeight = "bold";
                        labelSpan.style.marginRight = "5px";
                        labelSpan.style.whiteSpace = "nowrap";
                        labelSpan.textContent = key + ":";

                        // Value
                        var valueSpan = document.createElement('span');
                        valueSpan.className = "summary-value";
                        valueSpan.style.marginLeft = "2px";
                        valueSpan.style.whiteSpace = "nowrap";
                        let val = eventObj[key];
                        if (typeof val === 'object' && val !== null) {
                            valueSpan.textContent = JSON.stringify(val);
                        } else {
                            valueSpan.textContent = (val !== null && val !== undefined) ? val.toString() : '';
                        }
                        // Compose
                        section.appendChild(labelSpan);
                        section.appendChild(valueSpan);
                        outlineholder.appendChild(section);                        
                    }
                }
            }

            // REQUEST ADDITIONAL DATA
            // here merge the eventObj with 
            // init object requesting ai 
            //this.fabric.intent( {  HERE USE node.data to get deep report } )
            //  , how'd u learn about this 
            // SLIDE PANEL 
            this.drawer_open=1;
            TweenMax.to(this.drawer, 2, {top:10 ,ease:Expo.easeOut});
            TweenMax.to(this.drawer2, 2, {bottom:0 ,ease:Expo.easeOut});
            // Update current position state //
            this.currentTop = 10;
            this.currentBottom = 0;
        }else{
            this.drawer_open=0;
            TweenMax.to(this.drawer, 2, {top:-400 , ease:Expo.easeOut} );
            TweenMax.to(this.drawer2, 2, {bottom:-400 , ease:Expo.easeOut} );
            // Update current position state //
            this.currentTop = -400;
            this.currentBottom = -400;
            //this.reset();
        }
    }.bind(this)  
    this.mapMessage = function( e ){

        if( e.data && e.data.fn && e.data.fn == 'detailEvent'){

            console.log(' map message ok ')
            this.onDetailEvent( e.data );
        }
        var obj = e.data; 
        
        var r =3 ;
    }.bind(this)    
    this.constructor();

    // Drag event handlers
    this.onMouseDown = function(e) {
        // Only allow dragging on the background, not on interactive elements
        if (e.target.closest('#closebuttonxl') || e.target.closest('#detailpanelholder') || e.target.closest('input')) {
            return;
        }
        
        this.isDragging = true;
        this.dragStartY = e.clientY || e.touches[0].clientY;
        this.dragStartTop = this.currentTop;
        this.dragStartBottom = this.currentBottom;
        
        // Add dragging class for visual feedback
        this.drawer.classList.add('dragging');
        this.drawer2.classList.add('dragging');
        
        // Prevent text selection during drag
        e.preventDefault();
        
        // Add event listeners for drag
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('touchmove', this.onMouseMove.bind(this));
        document.addEventListener('touchend', this.onMouseUp.bind(this));
    }.bind(this);

    this.onMouseMove = function(e) {
        if (!this.isDragging) return;
        
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const deltaY = clientY - this.dragStartY;
        
        // Calculate new positions with bounds
        let newTop = this.dragStartTop + deltaY;
        let newBottom = this.dragStartBottom - deltaY;
        
        // Constrain the panels // allow unlimited upward movement, limit downward movement
        newTop = Math.max(-600, newTop); // Only limit downward movement
        newBottom = Math.max(-600, newBottom); // Only limit downward movement
        
        // Update current positions
        this.currentTop = newTop;
        this.currentBottom = newBottom;
        
        // Apply the new positions smoothly
        this.drawer.style.top = newTop + 'px';
        this.drawer2.style.bottom = newBottom + 'px';
    }.bind(this);

    this.onMouseUp = function(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        
        // Remove dragging class
        this.drawer.classList.remove('dragging');
        this.drawer2.classList.remove('dragging');
        
        // Remove event listeners
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        document.removeEventListener('mouseup', this.onMouseUp.bind(this));
        document.removeEventListener('touchmove', this.onMouseMove.bind(this));
        document.removeEventListener('touchend', this.onMouseUp.bind(this));
        
        // Snap to nearest position or animate to final position
        this.snapToPosition();
    }.bind(this);

    this.snapToPosition = function() {
        // Determine if panels should be open or closed based on current position
        const topThreshold = -300; // If top panel is above this, consider it closed
        const bottomThreshold = -300; // If bottom panel is below this, consider it closed
        
        let targetTop, targetBottom;
        
        if (this.currentTop > topThreshold && this.currentBottom > bottomThreshold) {
            // Snap to open position - but respect if user dragged higher
            targetTop = Math.max(10, this.currentTop); // Keep higher position if dragged up
            targetBottom = Math.max(0, this.currentBottom); // Keep higher position if dragged up
            this.drawer_open = 1;
        } else {
            // Snap to closed position
            targetTop = -600;
            targetBottom = -600;
            this.drawer_open = 0;
        }
        
        // Animate to target position
        TweenMax.to(this.drawer, 0.5, {top: targetTop, ease:Expo.easeOut});
        TweenMax.to(this.drawer2, 0.5, {bottom: targetBottom, ease:Expo.easeOut});
        
        // Update current positions
        this.currentTop = targetTop;
        this.currentBottom = targetBottom;
    }.bind(this);


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

    this.onDeepreportEvent=function( e ){

        
        var essayContainer = this.con.querySelector('.essay-column');
        var bodyitems = e.detail.payload.body;

        // INSERT_YOUR_CODE
        if (essayContainer) {
            essayContainer.innerHTML = '';
        }
        // INSERT_YOUR_CODE
        if (essayContainer && Array.isArray(bodyitems)) {
            // Clear previous content if needed
            essayContainer.innerHTML = '';
            bodyitems.forEach(item => {
                // Create heading
                const headingElem = document.createElement('div');
                headingElem.className = 'essay-section-title';
                headingElem.textContent = item.heading || '';
                // Create body
                const bodyElem = document.createElement('div');
                bodyElem.className = 'essay-section-body';
                bodyElem.textContent = item.body || '';
                // Append to essay container
                essayContainer.appendChild(headingElem);
                essayContainer.appendChild(bodyElem);
            });
        }


        var o= 0;
    }.bind( this );

    this.toggleDrawer=function(){
        if( this.drawer_open){
            this.drawer_open=0;
            TweenMax.to(this.drawer, 2, {top:-580 , ease:Expo.easeOut} );
            TweenMax.to(this.drawer2, 2, {bottom:-580 , ease:Expo.easeOut} );
            // Update current position state
            this.currentTop = -580;
            this.currentBottom = -580;
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
        
        var obj = { target:container_in , data:dat , id_in:id_in , ndx:ndx_in };
        var p;
        if( typeof( class_ref ) == 'function' ){
            p =  new class_ref( { 'data':obj } );    
        }else{
            p = class_ref;
            p.init( obj )
        }
        return p;
    }

    this.buildControls=function( obj ){

        var con1 = this.con;
        con1.innerHTML='';
       
        // RESET ACTIVE PANELS 
        this.panels = []; 
        var label;
        if( obj.payload && 'labels' in obj.payload ){
            label =  obj.payload.labels[0];
        }else{
            label = 'connects'; 
        }

        // HERE HOW DO WE ATTACH THE ENCYCLOPEDIA TEMPLATE 
        // WHAT IS IDEAL TEMPLATE 
        // OUTLINE ON LEFT AND TEMPLATE ON THE right
        // AND ITs UPdateable 
        
        var y = factory2d.renderNodeSync('poutline',{});
        var x = factory2d.renderNodeSync('prices',{});
        // --- Example: Attach three equally wide columns of cool informational content ---

        // were heree , depending on node attributes it attaches su b-website
        // what attributes are the best : 
        //  subwebsite  :   xclass ?  label ? 
        // glue mapper ? 

        var z = 0;
        if( 'name' in obj && obj.name == 'Lithium'){
            z = y;
        }
        else if (Math.random() < 0.5) {
            z = y;
        } else {
            z = x;
        }
 
        con1.appendChild( z )
        
        // OK IS IT HERE THAT WE ADD INJECTION OF IFRAME PARANMETERS ? 
        // OR DO WE PUT IT IN THE TERMINAL MODULE 
        // HOW DOES IT GO FROM DATA TO TERMINAL MODULE 
        // Eventuall map this to the module itself
        // E.g. module knows its best arrangement | soon xclasss 
        
        var detected_xclass = label.toLowerCase(); 
        label = detected_xclass;
        


    }


    this.render=function() {
        //var con = document.createElement('div')
        this.con = document.getElementById('twodstage');
        this.con1 = this.con;
        //this.con=con;
        this.con.setAttribute("id", "detailpanel2");
        //document.body.appendChild( con );
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
                .container{
                    max-width:1400px;
                }
                .draggable-panel {
                    cursor: grab;
                }
                .draggable-panel:active {
                    cursor: grabbing;
                }
                .draggable-panel.dragging {
                    cursor: grabbing;
                }                  
            </style>
            <div id="basecontent" class="draggable-panel" style="width:100%; background:#000000de;">

            </div>`;
        // this.drawer = this.con.querySelector('#slide_drawer')
        // this.drawer2 = this.con.querySelector('#slide_drawer2')
        
        // Add drag event listeners to both panels
        //this.drawer.addEventListener('mousedown', this.onMouseDown.bind(this));
        //this.drawer2.addEventListener('mousedown', this.onMouseDown.bind(this));
        //this.drawer.addEventListener('touchstart', this.onMouseDown.bind(this));
        //this.drawer2.addEventListener('touchstart', this.onMouseDown.bind(this));
        
        // this.drawer2.querySelector('#closebuttonxl').addEventListener('click', function(event) {
        //     //window.controller.setFocusObject( false )
        //     window.dispatchEvent( new CustomEvent( 'focusRemovedEvent' , { detail:{} }) )
        // })
        //startGlyph( { label:'alias'  , campos:[0,0,2.5] , camlook:[0,0,0], objrot:[Math.PI/4], holder:this.con.querySelector('#glyphbox') } )

        
    }
    this.render(); 
}

export { DetailDisplayV2 }







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


        
//label = ('label' in obj.payload )?  : 'connects';
// GET ARRAY OF CAPABILITY DEMANDS FOR THIS XCLASS 
// var caplist = gluemapper.xclass_caps( label , 'caps' , obj );
// 
// // ATTACH PANELS 
// if( obj.label == 'Module' ){
//     var winds=[];
//     console.log('Module clicked: ')
//     caplist.forEach( function(item, index){
//         var nc = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
//         var a = nc;
//         winds.push( nc );
//     }.bind(this));       
//     var j=3;      
// }
// else{
//     caplist.forEach( function(item, index){
//         var ncyo = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
//         this.panels.push( ncyo )
//         var k = 9; 
//     }.bind(this)); 
// } 