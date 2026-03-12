
import * as THREE from '../web_modules/three.js'
import { gsap , Expo } from '../web_modules/gsap.js'

function IsoController( initObj ) {
    
    this.model=initObj.model; //
    this.V1 = 'OCTOPUS.GRAPH';
    this.speed =  0.8;
    this.displayOutline = false;
    var renderer = initObj.renderer; // this.camera = initObj.camera; // this.target = initObj.target;
    var camera = initObj.camera;     // CAMERA STUFF NEEDS TO BE MOVED INTO HYPERCAMERA 
    camera.position.z = 105; 
    camera.position.y = 60;
    var target = initObj.target;
    var self = this;
    var mouseX = 0;
    var mouseY = 0;
    var mouse = new THREE.Vector2();
    var last_click_time = new Date()
    var windowHalfX = window.innerWidth /2; var dark_color=0xFFFFFF;
    var windowHalfY = window.innerHeight/2; var light_color=0xFFFFFF;    
    this.onWindowResize=function( event) {
        //if( windowHalfX != (window.innerWidth / 2) )
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }


    // START APP
    this.start=function(){
        if( ! this.detectFrame() ){ // LOAD EXAMPLE MAP IF BARE
            // ADD HashFragment paramter here--> 
            var lochash = window.location.hash.substr(1);
            if( lochash == '' ){
                //lochash='miccco/vission'
                //lochash='miccco/megaog'
                lochash='miccco/megaog'
                
            }
            //var urla = 'http://localhost:8851/static/vdisk/'+lochash+'.json'
            //var urla = 'media/vdisk/'+lochash+'.json'+'?'+Math.random()*9999
            var urla = 'data/'+lochash+'.json'+'?'+Math.random()*9999
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState==4 ) {
                    if( xhttp.status == 200){
                        var resObj = JSON.parse(xhttp.responseText);
                        var outmessage =resObj.message;
                        var jtkn = resObj.tkn
                        this.model.parseCluster( resObj );
                    }else{ console.log( 'error in login ') };
                }
            }.bind(this);
            // xhttp.open("POST", official_base+"/jxtavail", true);
            // xhttp.withCredentials = true;
            xhttp.open("GET", urla , true);
            xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
            //xhttp.setRequestHeader('Authorization', jtkn);
            xhttp.send();        
        }else{
            postMessage('map running')
        }

    }    

    // OFFICIAL INCOMING MESSAGE ROUTE 
    this.allIncomingMessages=function(e) {
        
        /// HERE DEALING WITH 
        /// REJECT CALLS BASED ON ORIGIN EXTERNAL  and         UNSIGNED CGM /// 
        // if (e.origin !== "localhost//?")               //    return;  //////
        // if (e.data.sig_etx === this.init_session_hash ) => return        ///
        
        //if (top.location.href != self.location.href)
        //    top.location.href = self.location.href;

        var qs = window.location.toString().split("?")[1];
        if( qs ){
            qs = qs.replace("name=", "");    
        }

        if( ! e.source ){
            return false 
        }
        initObj = e.data;
        //else if (top.location.href != self.location.href){
        //    initObj = e.data;
        //    console.log(')))  channelMessage incoming' , new Date() ,e.data  );
        // }
        //    top.location.href = self.location.href;

        //if( initObj.type == 'new'){ /////////////////////////////// ADD ELEMENT 
          //  this.model.createNode( initObj.fragment )  
        //}else 
            
        if( initObj && (initObj.nodes || initObj.links) ){ /////////////// LAUNCH MAP 
        
            this.model.parseCluster( initObj );

        }else{ //////////////////////////////////////////////////// TRAP ERROR 
            
            console.log(' ERRTrap Stray Message: '+initObj)
        }
        // RESTORE HERE FOR FEED UPDATE OR PUSH THROUHG DIFF ?
      // else if( initObj.method ){ /////////////////////////////// POST UPDATE 
            
        //     if( initObj.method == 'currencies'){
        //         this.model.ingestMethod( initObj ) //////////////// WOOP DOPS
        //     }else{
        //         this.model.mergeUpdates( initObj )    
        //     }
        // }
        
    }.bind(this);

    
    this.onClearUpdate = function(){
        reClear();
        container.innerHTML = '';
    }.bind(this)
    this.explode = function(){
        // Global Zero Event Comes in  "map0" -->
        this.model.updateStop();
    };
    this.arrangement1 = function(){
        console.log("wow explode");
        this.model.updateStop();
    };
    this.outflowFromFocused = function ( ){
        this.model.outflowFromFocused();
    }
    this.delete = function ( ){
        this.model.removeNode();
    }    
    this.expand = function ( ){
        this.model.expandNode();
    }        
    this.setHoverSelect = function( id_in ){
        this.model.setHoverSelect( id_in );
    }
    this.setNewLink= function( id_in ){
        this.model.setNewLink( id_in )
    }
    this.activateLinkSelection = function(){
        this.model.activateLinkSelection()
    }
    this.arrangeAround = function(){
        this.model.arrangeAround()
    }
    this.onFabricEvent = function(){
        console.log(' fabric event vector: x,y,z')
    }
    this.mapEditRequestEvent=function(e){
        //console.log( ' map Save Request in controller', e.detail.name )
        this.model.mapAttributeUpdate( e.detail )
    }
    this.onSelfReportEvent=function(e){
        console.log(' sprite positions arrive at controller',e.detail)
        //this.model.updateMapState( e.detail )
        this.model.onSelfReportEvent( e )
    }
    this.subgraphRequest = function(){
        this.model.subgraphRequest();
        
    }
    this.addActor=function(){
        this.model.addActor();
    }
    this.saveMap=function(){
        this.model.saveMap();
    }
    this.setPacket = function( objIn){
        this.model.setPacket();
    }
    this.setSort = function( objIn){
        this.model.setSort( objIn['sort'] );
    }
    this.setMode = function ( objIn){
        this.model.setMode(6)
    }    
    this.setFocusObject = function( obj ){
        //controls.reset();
        var now = new Date()
        this.model.setFocusObject( obj )
        var clicked_node= this.model.getNodeByUUID( obj.slot )
        var elapsed_since_last_tap = now - last_click_time;
        
        if( clicked_node ){
            var clicked_sprite = clicked_node.data.sprite;
        }
    };
    this.onClickEvent=function( e){
        console.log(' isocontroller: ',e,  e.detail )
        var objIn = e.detail;
        var route;

        if('fun' in objIn){
            route=objIn['fun']
        }else{
            route=objIn.map;
        }
        this.setRoute( route )
    }.bind(this)
    this.setRoute = function( route ){
        try{
            ///// AUTO-METHOD     //var x = Function('this.model.selectMap')JSTEST  //x(6) //this.model.selectMap(6)   JS TEST
            var tokens = route.split('/')        
            var met = tokens[0]
            var sub = tokens[1].replace(/^./, tokens[1][0].toUpperCase())
            var call_path = 'this.model.'+met+sub;
            var call_param = tokens[2];
            var methd = eval( call_path );
            methd( call_param );
        }catch{
            ///// MANUAL-METHOD
            switch( tokens[0] ){
                case 'reportrequest':
                    console.log(' sprite positions arrive at controller')
                    this.model.broadcastReportRequest()
                    break;
            }        
        }
    };
    this.run=function(){
        //this.model.setData( {} );
    }
    this.detectFrame=function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }    

}; // class IsoController

export { IsoController }












        // this was using server embedded JSON : 
        /* // removed for async font load temporarily
        if( window.lefont ){
            this.processCluster( initObj )
        }else{
            window.preloaded = initObj;
        }*/

        //controls.update();
        //controls.target.set(30, 167, 81); // //Update target:
        //controls.update();
        // Reset camera To reset the camera to the initial position you can do:
        //controls.reset();


        // MOVED FROM TOP 
        // var el = document.getElementById('display');
        // TEMP OVERRIDE TESTING RECEIVE 
        // e.source.postMessage('PayLoad receives incoming message at ',"*");
        // send reply using e.source and e.origin properties
        // Check origin
        //if ( e.origin === 'http://www.example.com' ){
        //  Retrieve data sent in postMessage
        //  el.innerHTML = e.data;
        //  Send reply to source of message
        //  e.source.postMessage('Message received', e.origin);
        //}

        
        // MESSAGE OBJECT by OBJECT_VECTOR 
        // OBJECT UPDATE ( fresh data is incoming from stream for existing object )
        // OBJECT CREATE ( add new object with button? button could generate message instead of function call )




        // CAMERA FOLLOW FOCUS ZOOM 
        //if( clicked_node ){
            // WORKIGN CAMERA CLICK ZOOM
            // RENABLE TO ZOOM CAMERA TO FRONT of Clicked OBJECT
            // TweenMax.to( camera.position , 1.9 , { ease:Expo.easeInOut , delay:0 , x:clicked_sprite.position.x ,  y:clicked_sprite.position.y , z:clicked_sprite.position.z+150 } )
            // Tween ROTATION HERE
            // WORKS But clicking needs to interupt this to be legit.
            /*
            gsap.to( camera.position, {
                duration: 5.9,
                delay:0, 
                x:clicked_sprite.position.x ,  
                y:clicked_sprite.position.y+50 , 
                z:clicked_sprite.position.z+120,
                ease:Expo.easeInOut ,
                onUpdate: function() {
				    controls.update();
			     }
            }); 
            gsap.to( controls.target, {
                duration: 4.9,
                delay:0, 
                x:clicked_sprite.position.x,  
                y:clicked_sprite.position.y, 
                z:clicked_sprite.position.z,
                ease:Expo.easeInOut 
            });             
            */
            // TweenMax.to( camera.rotation , 1.9 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0 , z:0  } ); //,  onComplete:function(){
            // LOOK AT SPRITE:  ( works instant )
            // camera.lookAt(clicked_sprite.position )                    
            // console.log(this.target);
            // controls.update();
            // }})
            // if( elapsed_since_last_tap < 20000){ };
        //};



        //console.log(' map is starting up . ' , window.opener )
        //window.postMessage( 'wo' , {datum:"testyoyo"})
        //window.parent.postMessage( ' from iso map ' , {wow:'winyo'} )


    // this.onClearUpdate = function(){
    //     reClear();
    //     container.innerHTML = '';
    // }.bind(this)

    // this.setCam = function ( objIn){
    //     //this.model.map
    // }