

import { BaseAvatar } from './baseavatar.js'
import * as THREE from '../web_modules/three.js'
import { XCOLORS } from '../x_modules/xcolors.js'
import { gsap , Expo } from '../web_modules/gsap.js'
import gluemapper from '../util/gluemapper.js'
import { factory3d } from '../factory/factory3d.js'
import * as globe from '../factory/globe.js'


//import { DragControls } from '/jsm/controls/DragControls'

// surrender of grievences 
// forfeiture of surplus commerce in favor of nature 


class AvatarX extends THREE.Mesh{

    
    constructor( node ){
        super()

        var objIn = node.data;
        this.node=node; 
        var timefloss = 0;
        var controller = objIn.controller;
        this.mouse = new THREE.Vector2();
        this.last_x= 0;
        this.last_z= 0;
        this._velocity = 0.0;
        this.x_velocity = 0.0;
        this.z_velocity = 0.0;
        this.smooth_step = 0.1;
        this.SmoothTime = 5.0;
        this._time = 0.1
        this.initObj = objIn;
        this.earthRadius = globe.getEarthRadius();
        this.random_offset = Math.random() * 1.4;
        this.uuid = objIn['uuid'];
        this.looklock = false;
        //this.node = objIn;
        this.data = objIn;
        //this.id = objIn.id;
        this.model = node.model;
        this.subspace = new THREE.Object3D();
        this.add( this.subspace );
        this.last_click_time = new Date();
        this.last_drag_start_time = new Date();
        this.dragHoldTime = 0;
        this.plane = objIn.plane;
        this.mode = 'normal';
        this.lastpinned = false;
        var self = this;
        this.posobj = { x:0 , y:0 , z:0 }
        var colors = [0xFF0000,0x00bd39,0x93ff00,0x00FF00,0xFFFFFF]
        this.color = colors[Math.round( Math.random() *3)];
        this.icon; 
        this.display1;
        this.display2;
        this.display3;

        this.movingMouse = this.movingMouse.bind(this);
        this.updateTossScroll = this.updateTossScroll.bind(this);
        this.onUpEvent = this.onUpEvent.bind(this);
        this.onTouchUpEvent = this.onTouchUpEvent.bind(this);
        this.fireTouchEvent = this.fireTouchEvent.bind(this);
        this.fireClickEvent = this.fireClickEvent.bind(this);
        this.fireTouchStarting = this.fireTouchStarting.bind(this);
        this.fireClickStarting = this.fireClickStarting.bind(this);

        window.addEventListener('somePositionsUpdatedEvent', this.onSomePositionsUpdated.bind(this), true);
        window.addEventListener('mapChangeEvent', this.onMapChangeEvent.bind(this), true);
        window.addEventListener('arrangeChangeEvent', this.onArrangeChangeEvent.bind(this), true);
        window.addEventListener('mapSaveEvent', this.onMapSaveEvent.bind(this), true);
        window.addEventListener('sortEvent', this.onSortEvent.bind(this), true);
        window.addEventListener('actionEvent', this.onActionEvent.bind(this), true);
        window.addEventListener('selectModeEvent', this.onSelectModeEvent.bind(this), true);
        window.addEventListener('fabricEvent', this.onFieldUpdateEvent.bind(this), true);
        window.addEventListener('fieldEvent', this.onFieldUpdateEvent.bind(this), true);        
        this.rebuildInternals();

        this.addEventListener('mousedown', this.fireClickStarting.bind(this) );



    }
    // INCOMING DATA-FIELD UPDATES ,  FABRIC UPDATES, INPUT UPDATES
    // HOW DOES EACH FIELD GET SELECTED FOR UPDATE 
    // FOR EXAMPLE: HOW DOES PRICE GET ROUTED TO LINE1 FOR ASSET BUT LINE 2 FOR ADDRESS
    // THERES GOTTA BE A MAPPING : IS IT xclass_to_fields_map ?? 
    // xclass_to_fields_map[ object_type ][ method ]( obj ) ?? 
    // xclass_to_fields_map[ 'token' ][ 'fetchTicker' ]( obj )
    // var write_obj = xclass_to_fields_map[ 'defi_token' ][ 'getPrice' ]( obj );
    // write_obj => { line1:price , line2:domain };
    // updateFields( write_obj );
    onFieldUpdateEvent( e ){
        var obj = e.detail.obj;
        var node = obj.node;
        
        // PUSH UPDATE INTO RELEVANT AVATAR ONLY: 
        if( obj.uuid == this.initObj.uuid ){
            var label = this.initObj.label ? this.initObj.label : this.initObj.labels[0];
            
            label = label.toLowerCase();
            var insertion_list = gluemapper.xclass_method_object( label , obj.method , obj );
            //var insertion_list = gluemapper.xclass_method_object( label , obj.method , obj );
            //this.updateFields( insertion_list ); 

            this.rebuildInternals();

            // you are here 
            // change icon 
            // while typing , unresolved mesh is blank sphere 
            //if( obj.name ){
             //   console.log( obj , ' aatr ')
             //   this.remove( this.icon )
             //   this.rebuildIcon();
                // brand skin
                // model swap 
            //}
        }

        
    }

    redrawMesh( ){
  
    }
    // TODO: SHOULD UPDATE THESE TO STRINGIFY THE INCOMING CHARS
    // OFFICIAL TEXT FIELD DISPLAYS ( display1 & display2 )
    updateFields( field_list ){
        
        
        if( field_list[0] ){
            this.remove( this.display1 )
            factory3d.getSuperTextAsync( field_list[0] , 0xEEEEEE ).then( ( vec_text ) => {    
                
                var labelheight=0;
                this.display1 = vec_text;
                this.display1.scale.set(0.009,0.009,0.009)
                this.display1.position.set(2, labelheight+1.3,0)

                if( 'props' in this.model.meta && this.model.meta.props.includes("globe") ){
                    // orient fields upwards 
                    this.display1.rotation.set(- Math.PI / 2, 0, 0)
                    this.display1.position.set(1, 0,0)

                }                
        
                this.add( this.display1 )
            }) 
        };
        if( field_list[1] ){
            this.remove( this.display2 )
            factory3d.getSuperTextAsync( field_list[1] , 0xAABBFF ).then( ( vec_text ) => {    
                
                var labelheight=0;
                this.display2 = vec_text;
                this.display2.scale.set(0.007,0.007,0.007)
                this.display2.position.set(2, labelheight+0.5,0)

                if( this.model.meta.props && this.model.meta.props.includes("globe") ){
                    // orient fields upwards 
                    this.display2.rotation.set(- Math.PI / 2, 0, 0)
                    this.display2.position.set(1, 0,1)
                }                                
                this.add( this.display2 )
            }) 
        };        
        if( field_list[2] ){
            this.remove( this.display3 )
            factory3d.getSuperTextAsync( field_list[2] , 0x44CC66 ).then( ( vec_text ) => {    
                
                var labelheight=0;
                this.display3 = vec_text;
                this.display3.scale.set(0.004,0.004,0.004)
                this.display3.position.set(2, labelheight+0 ,0)
                this.add( this.display3 )
            }) 
        };            




    }
    updateTitle ( TITLE_IN ){
        
        this.remove( this.display1 )
        factory3d.getSuperTextAsync( TITLE_IN , 0xEEEEEE ).then( ( vec_text ) => {    
            
            var labelheight=0;
             this.display1 = vec_text;
             this.display1.scale.set(0.009,0.009,0.009)
             this.display1e.position.set(2, labelheight+1.1,0)
            this.add(  this.display1 )
        }) // LABEL 

    }    
    getNodeId(){
        return this.node['uuid'];
    }
    update(){
        var timestamp = new Date() * 0.0003 * this.random_offset;
        
    }
    updateLook(){
        var timestamp = new Date() * 0.0003 * this.random_offset;
        
        // WOW this just WORKED by SURPRISE :)
        this.lookAt( camera.position );
    }    
    updatelocked (){
        var timestamp = new Date() * 0.0003 * this.random_offset;
        // WOW this just WORKED by SURPRISE :)
        //this.lookAt( camera.position );
    }
    onSomePositionsUpdated ( evt ){
        console.log(" event fired ")
        if( this.data.futurepos && this.position.x != this.data.futurepos.x ){
            var fupos = this.data.futurepos;
            gsap.to( this.position , 1.5, { ease: Expo.easeOut, x:fupos.x , y:fupos.y, z:fupos.z })
        }
    }  
    iconOn ( model ){
        var objx = new SubGraphVert( {} );
        this.subspace.add( objx )
    }
    iconOff ( model ){
        for (var i = this.subspace.children.length - 1; i >= 0; i--) {
            this.subspace.remove(this.subspace.children[i]);
        }
    }
    /// WARPS ///
    warp (){
        scl = Math.random()*20
        pcl = -100 + Math.random()*100
        gsap.to( this.position , 2 , { ease:Expo.easeInOut, x:0, y:0, z:0 } )
        console.log('About to warp: ',this.model,this.node.id,this.model.maps )
        
        // this.data.lat , this.data.lon
        var pobj = globe.calcPosFromLatLonRad( 1,1,19 ); // model.meta.radius // 
        //  console.log("should warp", pobj );
        // TWEEN.removeAll();
        //   new TWEEN.Tween( lemesh.position )
        //   .to( { x:0 ,y:0 , z:0 }, 5000 )
        //   .onUpdate( render )
        //   .start();
        //gsap.to( lemesh.position, 2 , { ease: Expo.easeOut, x:pcl, y:0, z:pcl } )
        //gsap.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    warpRandom (){
        var scl = Math.random()*20
        var pclx = Math.random()*60 - Math.random()*60
        var pcly = Math.random()*1 ;
        var pclz = Math.random()*40 - Math.random()*40
        // TweenMax.to( this.position, 2 , { ease: Expo.easeInOut, x:pclx, y:pcly, z:pclz } )
        // if( this.initObj.base == 'BTC' || this.initObj.base == 'ETH' || this.initObj.name == 'ETH'|| this.initObj.name == 'BTC'|| this.initObj.name == 'USDT'|| this.initObj.name == 'BNB')
        this.rotation.set(0,0,0);
        gsap.to( this.position ,  { duration:2 , ease: Expo.easeInOut, x:pclx, y:pcly, z:pclz } )
        var l =3;
    }
    
    warpGlobe  ( model ){

        var erad = this.earthRadius;//globe.getEarthRadius();

        var coords;

        if( this.data.coordinates ){
            coords = [ this.data.coordinates[1] ,  this.data.coordinates[0] ];    
        }else if( this.data.lat ){
            coords = [ Number(this.data.lng) , Number(this.data.lat) ];    
        }else{
            coords = [0,0];
        }
        
        
        if( this.data.label =='coord'){
            var ee=7;
        
            var pobj = globe.calcPosFromLatLonRad( coords[0] , coords[1] , erad ); // model.meta.radius //  
            gsap.to( this.position,  { duration:2, ease:Expo.easeOut , delay:0 , x:pobj.x , y:pobj.y , z:pobj.z } )


            // POINT AWAY FROM CENTER using update callback 
            gsap.to( {}, {
                duration: 5,
                onUpdate: function() {
                    //camera.quaternion.copy(startOrientation).slerp(targetOrientation, this.progress());
                    //this.rotation.x = 
                    
                    this.lookAt( this.position.x * 2 ,  this.position.y * 2 ,  this.position.z * 2)
                    this.rotateX(Math.PI / 180 * 90)
                    //this.quaternion.x = Math.PI / 2; // warps stuff 
                    
                }.bind(this)
            } );            

        }
        // Quaternion stuff maybe necessary later 
        //var v1 = new THREE.Vector3( 0, 0, 0 )
        //var v2 = new THREE.Vector3( pobj.x , pobj.y , pobj.z )
        //var quaternion = new THREE.Quaternion(); // create one and reuse it
        //var q1 = quaternion.setFromUnitVectors( v1,  );
        //const q = new THREE.Quaternion().setFromUnitVectors( v2 , v1.normalize())
        //this.rotation.setFromQuaternion(q)
    }
    warpSort ( model ){
        var scl = Math.random()*320
        var rowz = 8;
        var youuid = this.node.id;
        var nod = this.model.getNodeByUUID( this.node.id );
        var spacer=30;
        var xg = -spacer*3+(nod.ndx%rowz)*spacer;
        var zgo = -spacer*2 + Math.round( ( nod.ndx/rowz) ) * spacer;
        var dly = nod.ndx / 34;
        gsap.to( this.position,  { duration:2, ease:Expo.easeOut , delay:dly , y:5 , x:xg , z:zgo } )
    }
    warpPhase1 ( model ){

        var spacer = 6;
        var node = this.model.getNodeByUUID( this.node.id );
        var links = node.links;
        var rowz = 3;
        var spacer=170;
        var star = node.star;
        var xg = - ( spacer )+(node.star%rowz)*spacer;
        var zg = -spacer + Math.round( ( node.star/rowz) ) * spacer;
        var radius= 70;
        if( node.central ) {
            gsap.to( this.position, {
                duration:2,
                ease:Expo.easeOut ,
                y:5 ,
                x:xg ,
                z:zg,
                delay:star/22
            })
        }else{
            gsap.to( this.position, { 
                duration:2,
                ease: Expo.easeInOut,
                x:xg+Math.sin( parseInt( node.subindex )/1.5)*radius,
                z:zg+Math.cos( parseInt( node.subindex)/1.5)*radius,
                delay:node.subindex/12,
                y: Math.max(0,0)
            })
        }
    };
    warpPhaseDemand ( model ){
        var node = model.getNodeByUUID( this.node.id );
        var links = node.links;
        var rowz = 3;
        var spacer=270;
        var star = node.star;
        var xg = - ( spacer )+(node.star%rowz)*spacer;
        var zg = -spacer + Math.round( ( node.star/rowz) ) * spacer;
        var radius= 210;
        if( node.type=='hub' || node.type=='market_index'|| node.type=='asset_index'){
            gsap.to( this.position, 2 ,{
                ease:Expo.easeOut ,
                y:5 ,
                x:0+Math.sin( parseInt( node.subindex )/1.2)*radius/2.4,
                z:0+Math.cos( parseInt( node.subindex)/1.2)*radius/2.4,
                delay:star/22
            })
        }else{
            gsap.to( this.position , 2 ,
            {
                ease: Expo.easeInOut,
                x:0+Math.sin( parseInt( node.subindex )/6.8)*radius*0.8,
                z:0+Math.cos( parseInt( node.subindex)/6.8)*radius*0.8,
                delay:node.subindex/12,
                y: Math.max(0,0)
            })
        }
    };
    warpSortLine ( model ){
        scl = Math.random()*320;
        var youuid = this.node.id;
        var nod = model.getNodeByUUID( this.node.id );
        var spacer=170;
        var xg = -100+(nod.ndx%4)*spacer;
        var zgo = -4;//-1150 + Math.round( ( nod.ndx/4) ) * spacer;
        var dly = nod.ndx / 34;
        gsap.to( this.position, 2 , { ease:Expo.easeOut , delay:dly , y:0 , x:xg , z:zgo } )
    }
    warpSortCharts ( model ){
        // THIS SHOULD SHOW THE CHARTS:
        scl = Math.random()*320;
        var youuid = this.node.uid;
        var nod = model.getNodeByUUID( this.uuid );
        var spacer=25;
        var xg = 0;
        var zgo = nod.ndx *2;// -1 + Math.round( ( nod.subindex*1) ) * spacer;
        var dly = nod.ndx / 34;
        gsap.to( this.position, 2 , { ease:Expo.easeOut , delay:dly , y:0 , x:xg , z:zgo } )
        var colors = ["#330000","#002200","#395512","#6a7fd4"]
        this.color = Math.random() * 999999;//colors[Math.round( Math.random() *3)];
        var spanl=119
        geometry = new THREE.ShapeGeometry();
        trendrnd = Math.random()*10 - Math.random()*10;
        var points = this.initObj.history;
        var range = points[0].last;
        var multiplier = 14000 / range;
        var last_sample_date = points[points.length-1].create_date;
        var first_date = points[0].create_date
        for( var i=0; i<points.length; i++){
            var new_x =  ( -first_date +  points[i].create_date ) / 59;
            var new_x2 = i;
            offsety =-209 + ( (points[i].last)  * multiplier ) / 64 ;
            geometry.vertices.push( new THREE.Vector3(new_x, offsety ,0) );
        }
        material = new THREE.LineBasicMaterial( { color:this.color , linewidth:1 } );
        xyzline = new THREE.Line(geometry, material);
        this.add(xyzline);
    }
    warpFlat (){
        TweenMax.to( this.position, 2 , { ease: Expo.easeOut, y:1 } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    warpWall (){
        TweenMax.to( this.position, 2 , { ease: Expo.easeInOut, x:-50+(this.initObj.ndx%8)*20 ,y:(this.initObj.ndx%9)*15 ,z:5   } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    warpY (){
        scl = Math.random()*220
        var yess = Math.round( Math.random()*1)
        if( yess )
            TweenMax.to( this.position, 2 , { ease: Expo.easeOut, y:scl+200 } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    warpStar ( model ){
        var node = model.getNodeByUUID( this.node.id );
        var links = node.links;
        for( var nd in links ){
            var targsprite = model.getNodeByUUID( links[nd] ).sprite;
            var dly = nd / 9;
            TweenMax.to( targsprite.position,2,{
            ease: Expo.easeOut,
            delay:dly,
            x:this.position.x+Math.sin( parseInt(nd))*72,
            z:this.position.z+Math.cos( parseInt(nd))*72,
            y: Math.max(0,this.position.y) })
        }
        /*
        TweenMax.to( this.scale ,2,{
            ease: Expo.easeIn,
            x:0.001,
            z:0.001,
            y:0.001,
        })*/
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    /// INTERACTIVE /// 
    getIntersection  ( ev ){
        this.mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( this.mouse, camera );
        var intersects = raycaster.intersectObjects( [this.node.plane] ,true );  // c , recursive
        return intersects[0]
    }
    getIntersectionTouch  ( ev ){
        mouse.x = ( ev.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( ev.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [this.node.plane] ,true );  // c , recursive
        return intersects[0]
    }    
    movingMouse (ev){
        console.log('movmos')
        var intersect;
        if( ev.touches ){
            ev.preventDefault();
            ev = event.changedTouches[ 0 ];
            intersect = this.getIntersectionTouch(ev)
        }else
        {
            intersect = this.getIntersection(ev)
        }
        //console.log( intersect.point.x , intersect.point.z );
        this.x_velocity = intersect.point.x - this.last_x
        this.z_velocity = intersect.point.z - this.last_z
        try{
            this.node.body.pos.x = intersect.point.x; //  this.x_velocity
            this.node.body.pos.z = intersect.point.z; //  this.z_velocity

            this.position.x = this.node.body.pos.x;
            this.position.z = this.node.body.pos.z;
            console.log('movmos ',this.node.body.pos.x )
            // can set with 
            // layout.setNodePosition(nodeId, x, y);
            // but is that better since we can't += ??
        }catch(err){}
        this.last_x = intersect.point.x
        this.last_z = intersect.point.z

    }
    updateTossScroll (){
        if( this._time <= this.SmoothTime){
            this.x_velocity = this.x_velocity/1.13;
            this.z_velocity = this.z_velocity/1.13;
            this.position.x += this.x_velocity;
            this.position.z += this.z_velocity;
            this.node.body.pos.x = this.position.x
            this.node.body.pos.z = this.position.z
            this._time += this.smooth_step;
            requestAnimationFrame( this.updateTossScroll )
        }else{
            var _underInertia = false;
            this._time = 0.0;
            this.x_velocity = 0;
            this.z_velocity = 0;
            this.last_x = this.position.x;
            this.last_z = this.position.z;
        }
    }
    onUpEvent ( ev ){
        controls.enabled = true;
        document.removeEventListener('mousemove' , this.movingMouse );
        document.removeEventListener('mouseup' , this.onUpEvent );


        
        var dragHoldTime = (new Date() - this.last_drag_start_time )
        if( dragHoldTime > 1150 ){
            //Boolean( Math.round( Math.random()*1) )
            //this.lastpinned = ! this.lastpinned;
            //this.model.layout.pinNode( nodeToPin , this.lastpinned );            
            var nodeToPin = this.model.graph.getNode( this.node.id );
            this.model.layout.pinNode( nodeToPin , true );            
            requestAnimationFrame( this.updateTossScroll );    
        }else if( dragHoldTime > 250 ){
            var nodeToPin = this.model.graph.getNode( this.node.id );
            this.model.layout.pinNode( nodeToPin , false );            
            requestAnimationFrame( this.updateTossScroll );   
            
        }
        else{
            
 
        }



        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        console.log(' time   elapsted: ',elapsed_since_last_tap )
        
        if( elapsed_since_last_tap < 200 ){
            // refactor to event bubble 
            window.controller.setFocusObject( this.node )
            document.addEventListener('mouseup' , this.onUpEvent );
        }

        this.last_click_time = now;

                
        
    }
    onTouchUpEvent ( ev ){
        controls.enabled = true;
        document.removeEventListener('touchmove' , this.movingMouse );
        document.removeEventListener('touchend' , this.onTouchUpEvent );
        var dragHoldTime = (new Date() - this.last_drag_start_time )
        if( dragHoldTime > 200 ){
            requestAnimationFrame( this.updateTossScroll );
        }


        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        console.log(' time elapsted: ',elapsed_since_last_tap )
        
        if( elapsed_since_last_tap < 200 ){
            window.controller.setFocusObject( this.node )
            document.addEventListener('mouseup' , this.onUpEvent );
        }

        this.last_click_time = now;

        

    }
    
    onSelectHover  (e){
        console.log(' selecting: ',this.node.id )
        window.controller.setHoverSelect(this.node.id)
    }
    onSelectSelect  (e){
        console.log(' Select Select Event ', this)
        if( this.model.mode == 'select'){
            window.controller.setNewLink(this.node.id)
        }

    }
    onSelectModeEvent (e){

        console.log(' select Mode event in : ', this)
        if( this.model.mode == 'select' ){
            this.mode = 'select'
            this.addEventListener('mouseenter', this.onSelectHover )
            this.addEventListener('mouseup', this.onSelectSelect )
            this.addEventListener('touchend', this.onSelectSelect )            
        }else{
            this.mode = 'normal'
            this.removeEventListener('mouseenter', this.SelectHover )
            this.removeEventListener('mouseup', this.onSelectSelect )
            this.removeEventListener('touchend', this.onSelectSelect )            
        }
    }
    
    fireTouchEvent (e){
        console.log("fireTouchEvent in AvatarX:  uuid: ",this.node.id)
        e.stopPropagation() //
        //e.preventDefault() //
        this.update = this.updateDrag;
        
        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        console.log(' time elaps: ',elapsed_since_last_tap )
        if( elapsed_since_last_tap < 200 ){
            window.controller.setFocusObject( this.initObj )
            document.addEventListener('mouseup' , this.onUpEvent );
        }
        if( this.model.mode == 'select'){
            window.controller.setNewLink( this.node.id )
        }
        this.last_click_time = now;
        //start()
    }
    fireClickEvent (e){
        console.log("fireTouchEvent in AvatarX:  uuid: ",this.node.id)
  
        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        console.log(' timeelapsted: ',elapsed_since_last_tap )
        if( elapsed_since_last_tap < 200 ){
            window.controller.setFocusObject( this.initObj )
            document.addEventListener('mouseup' , this.onUpEvent );
        }
        if( this.model.mode == 'select'){
            window.controller.setNewLink(this.node.id)
        }
        this.last_click_time = now;
    }  
    fireTouchStarting (ev){
        this.last_drag_start_time=new Date();
        controls.enabled = false;
        console.log( ' touch starting ')
        // TEMP PIN DURING DRAG 
        var nodeToPin = this.model.graph.getNode( this.node.id );
        this.model.layout.pinNode( nodeToPin , true);
        
        this.x_velocity = 0;
        this.z_velocity = 0;
        this.last_x = this.position.x;
        this.last_z = this.position.z;

        
        //mousedown === touchstart
        //mousemove === touchmove
        //mouseup === touchend

        document.addEventListener('touchmove' , this.movingMouse );
        document.addEventListener('touchend' , this.onTouchUpEvent );        
    }
    fireClickStarting (ev){
        this.last_drag_start_time=new Date();
        controls.enabled = false;
        // this.model.layout.pinNode( this.node.id , true);
        // TEMP PIN DURING DRAG 
        var nodeToPin = this.model.graph.getNode( this.node.id );
        this.model.layout.pinNode( nodeToPin , true);

        var intersect;
        if( ev.touches ){
            ev.preventDefault();
            ev = event.changedTouches[ 0 ];
            intersect = this.getIntersectionTouch(ev)
        }else
        {
            intersect = this.getIntersection(ev)
        }
        //console.log( intersect.point.x , intersect.point.z );
        var nx =  intersect.point.x;
        var nz =  intersect.point.z;
        
        this.x_velocity = 0;
        this.z_velocity = 0;
        this.last_x = this.position.x;
        this.last_z = this.position.z;
        
        //this.node.body.pos.x= nx;
        //this.node.body.pos.z= nz;        
        //this.position.x = nx;
        //this.position.z = nz;
        
        // MOVE PLANE TO OBJECT LEVEL?
        // this.node.plane.position.copy( this.position );
        if( this.model.mode == 'select'){
            window.controller.setNewLink(this.node.id)
        }
        
        //this.fireClickEvent( ev )
        
        document.addEventListener('mousemove' , this.movingMouse );
        document.addEventListener('mouseup' , this.onUpEvent );        
    }
    //this.on('mouseup', this.onUpEvent );
    //this.on('touchend', this.onTouchUpEvent );
    //this.on('mousedown', this.fireClickStarting );
    //this.on('touchstart', this.fireTouchStarting );    
    onSortEvent  (e) {
        var model = e.detail.model;
        this.warpSort( model )
    };
    onActionEvent  (e) {
        var model = e.detail.model;
        var model = e.detail.model;
        var map = model.cur_map;
    
        if( model.action =='yzero'){
            this.warpFlat( model )
        }else if( model.action == 'demand'){
            this.warpPhaseDemand( model )
        }else if( model.action == 'samples'){
            this.warpSortCharts( model )
        }
    };
    onMapSaveEvent  (e ){
    
        console.log(' save position in ',this.node.id , ' : ', this.position )
    }
    onMapChangeEvent  (e) {
        
        var model = e.detail.model;
        var map = model.cur_map;
        var lyt = model.meta.layout;
        
        try{
            var position_object = model.meta.layouts[ model.meta.layout ][ this.node.id ]
            position_object['ease']=Expo.easeInOut;
            position_object['delay']=Math.random() *0.5;
            position_object['duration']=0.8;
            gsap.to(  this.position, position_object  )
        }catch{
            //console.log(' oops no map yet ')
        } 
    
    };
    onArrangeChangeEvent  (e) {
        var model = e.detail.model;
        var map = model.cur_map;  
       
        switch( model.cur_arrange ){
            case 'random':
                this.warpRandom()
                break;
            case 'grid':
                this.warpPhase1()
                break;
            case 'circle':
                this.warpSort()
                break;        
            case 'sphere':
                break;
            case 'globe':
                this.warpGlobe()
                break;            
        }
    
    };
    deallocate (){
        window.removeEventListener('dataUpdate' , this.onMapChangeEvent.bind(this) , false);
        window.removeEventListener('sortEvent' , this.onSortEvent.bind(this) , false);
        object.traverse( function ( child ){
            if ( child.geometry !== undefined ) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
        this.geometry.dispose();
        this.geometry = null; // or undefined
        delete this.geometry
    }
    
    rebuildIcon () {
        
        var label = this.node.payload.label ? this.node.payload.label : this.node.payload.labels[0];
        // MESH
        var meshObj = {}
        meshObj['mesh'] = gluemapper.xclass_mesh( label , 'mesh' , this.node.payload );  
        
        // BRAND
        meshObj['img'] = gluemapper.xclass_brand( label , 'brand' , this.node.payload );
    
        // BASE PLANE 
        var label_keys = { 'actor':true, 'user':true , 'alias':true , 'bot':true , 'simsuit':true , 'repo':true , 'admin':true , 'tag':true , 'dot':true }
        if( ('baseplane' in this.node ) || ( label.toLowerCase() in label_keys )  ){
            meshObj['baseplane'] = true
        }        
    
        
    
        // RENDER 
        if( ['globe','frame','coord','locale','moon','moonb'].includes( label ) ){
            var globe1 = factory3d.getClone( label ) 
            this.add( globe1 ) // VERIFY/REPLACE:         
        }else if(  label=='route'){
    
            //var col = defaulter.getOrCreate( color , this.node.payload );
            var col = ( 'color' in this.node.payload ) ? this.node.payload.color : '#FF0000';
            var path = factory3d.getClone( label , { j:this.node.payload.label , type:'multi' , geometry:this.node.payload.geometry , color:col } ) 
            this.add( path ) // VERIFY/REPLACE:    
            
        }
        else{
            factory3d.renderObject( meshObj ).then( ( objx ) =>{ 
                this.icon = objx;             
                this.add( this.icon ) 
            }).catch( ( er ) => {
                this.icon=factory3d.getClone('dot' , this.node.payload )
                this.add( this.icon )
            });
        }
    }
    
    // OFFICIAL BUILD AVATAR INTERNAL ICONS / LABELS 
    rebuildInternals (){
        
        //// AVATAR OBJECT 
        var label;
        var obj =  this.node.payload;
        if( 'labels' in obj ){
            label = obj.labels[0].toLowerCase();
        }else{
            label = ( obj.label ) ? obj.label.toLowerCase() : 'no label';
        }
     
    
        // first returns payload 
        var landing_fields = gluemapper.fieldListFromData(  this.node.payload  )
    
        // interest
        // bubbleSubjectsAndInterests
    
        // TITLE FIELDS: 
        this.updateFields( landing_fields ); 
        this.rebuildIcon();
        
        // // POSITION
        // if( this.model && 'layouts' in this.model.meta ){
        //     var lo = this.model.meta.layout;
        //     var layout = this.model.meta.layouts[ lo ] ? this.model.meta.layouts[ lo ] : {}
        //     if( this.node.id in layout ){
        //         var local_layout = layout[this.node.id];
        //         this.position.set( local_layout['x'] , local_layout['y'] , local_layout['z'] )
        //     }
        // }
    
        // LOCK 
        this.update = this.updatelocked    
    }
        

};


export { AvatarX }


    /* // SELF MANAGED ENTERFRAME REPLACEMENT
    var requestId = 0;
    function animate(time) {
        console.log(' animating ', time)
        requestId = window.requestAnimationFrame(animate);
        mouse.x =  ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        self.position.x =mouse.x;
    }
    function start() {
        animationStartTime = window.performance.now();
        requestId = window.requestAnimationFrame(animate);
    }
    function stop() {
        if (requestId)
            window.cancelAnimationFrame(requestId);
        requestId = 0;
    }*/


    /*
    
    if( label == 'actor' || label == 'user' || label == 'alias'  ){
        LAB_B = 'ACTIVE: 00:09:00'
        labelheight=5;
    }
    if( this.initObj.close && this.initObj.quote ){
        LAB_A = ''+this.initObj.close+'/'+this.initObj.quote +'@ '+this.initObj.domain + XCOLORS.sub_avatar_text
    }
    if( this.initObj.label =='asset'){
        LAB_A  = 'INDEX';
    }
    if( this.initObj.domain ){
        LAB_A = ''+this.initObj.domain;
    }
    */


    /*if( this.initObj.delta_x != undefined ){
        if( this.initObj.delta_x >0){
            var delta_color = 0x22FF22;
        }else{
            var delta_color = 0xFF2222;
        }
        LAB_A = ''+this.initObj.delta_x + delta_color;
        var locdate = this.initObj.update_date.toLocaleString('en-US', { timeZone: 'PST' })
        LAB_B= ''+locdate ;
    } */

    /*
    if( 'name' in this.initObj)
    LAB_A = this.initObj.name;
    if( 'email' in this.initObj )
        LAB_B = this.initObj.email;

    if( 'ke' in this.initObj)
        LAB_A = this.initObj.ke;
        */




    /*
    try{
        var position_object = model.maps[ model.cur_map ][ this..node.id ]
        position_object['ease']=Expo.easeInOut;
        position_object['delay']=Math.random() *0.5
        TweenMax.to(  this.position, 0.8, position_object  )
    }catch{
        console.log(' oops no map yet ')
    }*/
    
    /*
    if( map == 0 ){
        //
        this.warp()
    }
    else if( map==1)
    {   this.warp();
        this.warpRandom();
    }
    else if( map==2)
    {

        this.warpWall();
    }
    else if( map==3)
    {   this.warpPhase1( model );
    }else if( map==5) {
        this.warpStar( model );
        //this.warpY();
    }else if( map == 6)
    {   //this.warpPhase1( model );
    }else if( map == 7)
    {
        this.iconOn( model );

    }else if( map == 8)
    {
        this.iconOff( model );
    }*/

    //this.textcanvas = objIn.canvas;
    //this.HEADLINE_A=this.initObj.id ? this.initObj.id : " HA "
    //this.HEADLINE_B=this.initObj.label ? this.initObj.label :" HB "
    //this.HEADLINE_C=this.initObj.domain ? this.initObj.domain : " HC "
    //this.HEADLINE_D=this.initObj.name ? this.initObj.name : " HD "


    //WOW wait a minute this will be replaced with xclas ? 
    //it must pull upon initilization 
    // var DISP1 = gluemapper.pull( this.initObj , label , 0 )
    // var DISP2 = gluemapper.pull( this.initObj , label , 1 )
    
    // factory3d.getSuperTextAsync( DISP1 , 0xEEEEEE ).then( ( vec_text ) => {    
    //     this.display1 = vec_text;
    //     this.display1.scale.set(0.010,0.010,0.010)
    //     this.display1.position.set(2,labelheight+1.1,0)
    //     this.add(  this.display1 )
    // })
    // factory3d.getSuperTextAsync( DISP2 , 0x53a6ff ).then( ( vec_text ) => {    
    //     this.display2 = vec_text 
    //     this.display2.scale.set(0.007,0.007,0.007)
    //     this.display2.position.set(2,labelheight+0.2,0)
    //     this.add( this.display2 )
    // })

    //( this should extract from differnt sources)
    // for example for Token it could graby before slash of symbol: 
    // Should the glueMapper also somehow spit out brand inference scheme ``
    // if( 'domain' in this.initObj || 'domain' in this.initObj ){
    //     meshObj['img'] = 'media/domain/'+this.initObj['brand']+'.png'
    // }

    //var pre_obj = { ...this.initObj , ...{method:'init' } };


    
    // buildout 
    // var labelheight=0;
    // var icon_url = ''
    // var meshmap ={
    //     'xindex':'bluecube.glb',
    //     'domain':'bluecube.glb',
    //     'project':'bluecube.glb',
    //     'app':'greencube.glb',
    //     'world':'globe.glb',
    //     'credential':'key.glb',
    //     'barrel':'atm.glb',
    //     'atm':'atm.glb',
    //     'token':'simtoken.glb',
    //     'service':'simcube.glb',
    //     'actor':'subuser.gltf',
    //     'user':'subuser.gltf',
    //     'alias':'simsuit.glb',
    //     'zerox':'simsuit.gltf'
    // }
    //
    //icon_url = ( label in meshmap ) ? meshmap[label] : label+'.glb';
    //meshObj['mesh']='models3d/'+icon_url; // temp remove seed: +'?'+Math.round( Math.random()*9999 )        


// AvatarX.prototype.updateTitleB ( TITLE_IN ){
    
// }
