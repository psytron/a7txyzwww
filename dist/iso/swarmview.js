

import * as THREE from '../web_modules/three.js'
import { XCOLORS } from '../x_modules/xcolors.js'
import { NodeMenu } from './nodemenu.js'
import { MetaView } from './metaview.js'
import { AvatarX } from './avatarx.js'
import { Linkx } from './linkx.js'
import * as globe from '../factory/globe.js'
import { factory3d } from '../factory/factory3d.js'
// THREE.SceneUtils.traverseHierarchy( object, function ( object ) { object.visible = false; } );



// MAIN 
class SwarmView extends THREE.Mesh { 

    constructor( initObj ){
        super(  );
        this.type = 'SwarmView';
        this.interactionManager = initObj.interactionManager;
        
        // LAYER 1: // NODES 
        this.subspace = new THREE.Group();
        this.subspace.name='subspace';
        this.add( this.subspace )
        
        // LAYER 2: // ACCESSORY
        this.metaspace = new THREE.Group();
        this.metaspace.name='metaspace'
        this.add( this.metaspace )
    
        // MAP OBJECTS 
        this.node_sprites = {};
        this.link_sprites = {};    
        this.plane;
        this.interval = 0;
        this.central_node; // USED FOR SELECTED CENTERS 
        this.last_click_time = new Date();
        window.sv = this; // debug
        this.ntrvl = 0; // WAS USED FOR INERTIA 


                // CAVEMAN RESCOPE
        this.onDataUpdate = this.onDataUpdate.bind( this )
        this.onArrangeChangeEvent= this.onArrangeChangeEvent.bind( this )
        this.onReportRequestEvent = this.onReportRequestEvent.bind( this )
        this.update = this.updateBlank;

        //you are here 
        // meed to add this.im.add( btn )
        

        
        // l l \\
    }

    onDataAppendEvent(e){
        console.log('Append ', e.detail.diff )
        
        // ITERATE ONLY DIFF OF NEW ELEMENTS 
        // Yet must till ignore existing ?
        
        var diff = e.detail.diff;
        for( var n in diff.nodes ){
            var nd = this.model.graph.getNode(n);         
        }
        for( var lx in diff.links ){
            var lxn = this.model.graph.getLink( lx.split(',')[0] , lx.split(',')[1] );
        }

    }
    
    // MERGE SPRITES UPON PRESENCE 
    onDataUpdate(e){

        this.model = e.detail.model;
        this.layout = this.model.layout;

        // ADD VISUAL HELPERS BASED ON MAP TYPE 
        if( this.metaspace.children.length <= 0 ){
            this.drawCoordinates();
        }
        var reuuid=0;
        if( reuuid ){}
        
        // CACHE PRESENCE NOW THINGS ARE BEING ADDED TO GRAPH CHECK WHAT NEW ADDITIONS LOOK LIKE in Model.Graph 
        // SEE IF addions to Graph are reflected in LAYOUT: ADD ONLY IF THEY DON'T ALREADY EXIST I
        var alive = {}
        var present_in_model = {}
        for( var c in this.subspace.children ){
            if( this.subspace.children[c].node ){
             alive[this.subspace.children[c].node.id ]=true;               
            }
        }

        // ADD NODES MANAGE NODES 
        this.model.graph.forEachNode(function (node) {
            // ADD NODE IF IN model NOT ALREADY in ALIVE 
            if( node.data && !(node.id in alive) ){ // (node.id in this.node_sprites == false )

                // INTERATION PLANE AND BODY NEEDED BY AVATAR NEW 
                node['plane'] = this.plane;
                node['body'] = this.layout.getBody( node.id )
                //node.data['spriteid']

                // HERE THE gluemap.capability_matrix 
                // CAN BE USED TO Attach ALT-AVATARS ( AvatarZ , ParkedAvatar etc. )
                var cur_sprite = new AvatarX( node );
                node.sprite = cur_sprite;
                this.node_sprites[node.id] = cur_sprite;
                
                // POSITION
                if( this.model && 'layouts' in this.model.meta ){
                    var lo = this.model.meta.layout;
                    var layout = this.model.meta.layouts[ lo ] ? this.model.meta.layouts[ lo ] : {}
                    if( node.id in layout ){
                        var local_layout = layout[node.id];
                        cur_sprite.position.set( local_layout['x'] , local_layout['y'] , local_layout['z'] )
                    }
                    else if( this.model.focusobject && !('a' in this.model.focusobject) ){
                        // SET POSITIN IF OBJECT SELECTED IS NOT EDGE 
                        var i =9;
                        
                        cur_sprite.position.set( this.model.focusobject.sprite.position.x , this.model.focusobject.sprite.position.y , this.model.focusobject.sprite.position.z );
                        cur_sprite.node.body.pos = { x:this.model.focusobject.sprite.position.x , y:this.model.focusobject.sprite.position.y , z:this.model.focusobject.sprite.position.z };
                        var j = 8;
                    }                    
                }    
                // THIS WAS ATTEMPTED FIX FOR ALL EVENTS FIRING 
                // cur_sprite.name = cur_sprite.node.slot;
                
                this.subspace.add( cur_sprite );
                this.interactionManager.add( cur_sprite );
                // for( var s in this.subspace.children ){
                //     var subo = this.subspace.children[s];
                //     console.log( this.subspace[s] )
                // }
            }
            present_in_model[ node.id ]=node;
            
        }.bind(this));

        // REMOVE NODE IF in ALIVE BUT NOT in MODEL 
        for( var c in this.subspace.children ){
            if( 'node' in this.subspace.children[c] ){
                var cur_id = this.subspace.children[c].node.id;
                if( ! (cur_id in present_in_model) ){
                    this.subspace.remove( this.node_sprites[cur_id] )
                }                
            }

        }

        // ADD LINKS 
        // var dlinks={}
        // model.graph.forEachLink( function( link ){
        //     dlinks[ link.id ]=link;
        // })

        // // YOU ARE HERE //
        // // if LINKS in SpriteList ! in Model->remove  PASS add non existant 
        // model.graph.forEachLink( function( link ){
        //     //if( link.fromId && (link.id in this.link_sprites == false )) {
        //     if( ! (link.id in this.link_sprites) ) {
        //         link.mesh = this.subspace;
        //         link.data.model = this.model;
        //         var newlink = new Linkx( link );
        //         link.sprite = newlink;
        //         this.link_sprites[link.id] = newlink
        //     }
        // }.bind(this))

        // // PASS remove unlisted 
        // for ( var ld in this.link_sprites ){
        //     if( !( ld in dlinks ) ){
        //         this.link_sprites[ld].destroySelf()
        //         delete this.link_sprites[ld]
        //     }
        // }
        this.updateLinkExist();

        // TEST TRIGGER AFTER ATTACHED SPRITES 
        //controller.setMap({map:6});
        //controller.setRoute('select/map/6');

        if( this.model.meta['mode'] == '0' || this.model.meta['mode'] == '1'){
            //this.update = this.updateForceDirected; 
        }else{
            //this.update = this.updateBlank;
        }
        //this.update = this.updateBlank;
        // UPDATE PHYSICS SETTINGS BASED ON DENSITY 
        //var node_count = model.graph.getNodesCount()
        //this.layout.simulator.springLength=30+(node_count/3);
        //physicsSettings.springLength=30+(node_count/3);

    }

    updateLinkExist(){ 

        // ADD LINKS 
        var dlinks={}
        this.model.graph.forEachLink( function( link ){
            dlinks[ link.id ]=link;
        })

        // YOU ARE HERE //
        // if LINKS in SpriteList ! in Model->remove  PASS add non existant 
        this.model.graph.forEachLink( function( link ){
            //if( link.fromId && (link.id in this.link_sprites == false )) {
            if( ! (link.id in this.link_sprites) ) {
                link.mesh = this.subspace;
                link.model = this.model;
                var newlink = new Linkx( link );
                link.sprite = newlink;
                this.link_sprites[link.id] = newlink
            }
        }.bind(this))

        // PASS remove unlisted 
        for ( var ld in this.link_sprites ){
            if( !( ld in dlinks ) ){
                this.link_sprites[ld].destroySelf()
                delete this.link_sprites[ld]
            }
        }
    }

    /// OBJECT FOCUSED ON MAP CAN ADJUST META OBJECTS 
    onFocusEvent(e){
        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        var model = e.detail.model;
        var clicked_id = model.focusnode;
        //var selected_node = model.getNodeByUUID( id_in )
        var clicked_node= model.getNodeByUUID( clicked_id )
        if( clicked_node ){
            var clicked_sprite = clicked_node.sprite;
        }
        if( model.focusobject ){
            //var spos = clicked_sprite.position;
            //var tpos = this.position;
            //var vector = new THREE.Vector3();
            //vector.setFromMatrixPosition( clicked_sprite.matrixWorld );
            //var spos = vector;
            // HERE THIS IS REPEATING THE OFFSET OVER AND OVER , IT MUST BE FIXED SOMWHOEW
            //TweenMax.to( this.position , 1.6 , { ease:Expo.easeInOut , delay:0 , y:(0-spos.y) , x:(0-spos.x), z:(0-spos.z) } )
            //TweenMax.to( this.rotation , 1.6 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )
            //TweenMax.to( this.subspace.position , 1.6 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )
            if( elapsed_since_last_tap < 20000 ){ }
            this.last_click_time = new Date()
            // selected_node.sprite.position
        }else{
            //TweenMax.to( this.position , 2.1 , { ease:Expo.easeInOut , delay:0 , y:0, x:0, z:0 } )
            //TweenMax.to( this.rotation , 2.1 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )
        }
        // attach background_tap listener here ?
    }

    /// MAIN MAP SPACE GRAPHICS: 
    drawCoordinates(){
        
        // INTERACTION SENSOR PLANE  // 
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(600, 600, 4, 4),
            new THREE.MeshBasicMaterial( {color: 0x222222, alphaTest: 0, wireframe:true, visible: false }));
        this.plane.position.set( 0,-0.15,0)
        this.plane.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.metaspace.add( this.plane );
        
        // NODE MODIFY HELPER GRAPHICS 
        this.metaspace.add( new NodeMenu( {floor:this.plane , im:this.interactionManager}) )
        this.metaspace.add( new MetaView() )      // THIS POWERS MOUESOVER IN LINKING MODE  


        // META.MAP_TYPE THEN FACTORY RENDER // OPTIONS: GLOBE , GRID , FRAMES 
        if( this.model.meta.name == 'global'){
            
            // GLOBAL MAP 
            //var globe1 = factory3d.getClone('globe') 
            //this.metaspace.add( globe1 ) // VERIFY/REPLACE: 
        }else if( this.model.meta.name == 'frame'){
            
            // CYBERFRAME MAP

        }else{
            

        }

        if( 'props' in this.model.meta && this.model.meta.props.length >0 ){
            
            // HERE WE COULD for in props add all 
            for( var p in this.model.meta.props ){
                var c = this.model.meta.props[p];
                var el = factory3d.getClone(c); 
                this.metaspace.add( el ); 
            }
            //var globe1 = factory3d.getClone('globe') 
            //this.metaspace.add( globe1 ) // VERIFY/REPLACE: 
        }else{
            
            // DEFAULY to GRID MAP  if no meta.ptops
            var grid1 = factory3d.getClone('grid');
            this.metaspace.add( grid1 );  
            
        }



        

    }      

    /// REPORT OWN MAP META DATA FOR SAVES
    onReportRequestEvent(e){
        console.log(' save position in SwarmView: ',this.uuid , ' : ', this.position )
        console.log(' iterating nodes; ')
        var posHash={}
        for( var n in this.subspace.children ){
            var nod = this.subspace.children[n];
            if( nod.type=='Mesh' ){
                //console.log( n , nod , nod.uuid)
                posHash[nod.node.id]=nod.position;
            }
        }
        window.dispatchEvent( new CustomEvent('selfReportEvent' , {detail:posHash }))
    }
    onArrangeChangeEvent(e){
        
        // CHANGE RENDER MODES 

        switch( e.detail.model.cur_arrange ){
            case "force":
                // RESET SIMULATOR BASED ON VIEW
                this.model.graph.forEachNode( function( n ){ 
                    var cbody = this.model.layout.getBody( n.id )
                    //var n_pos = this.model.layout.getNodePosition(n.id);
                    if( n.sprite ){
                        var cur_pos = n.sprite.position;
                        cbody.pos = {'x':cur_pos['x'] ,'y':cur_pos['y'] ,'z':cur_pos['z']};
                        n.sprite.update()                        
                    }

                }.bind(this));            
                
                // RESTART UPDATOR 
                this.update = this.updateForceDirected; 
                break;                
            case "springshort":
            case "springlong":   
            case "springswap":   
                //this.update = this.updateForceDirected; 
                break;
            case "fragment":
            case "rejoin":                
                this.updateLinkExist();
                break;

            case "sphere":
                this.update = this.updateBlank;                
                break;

            default:
                //this.update = this.updateBlank;    
                // default does nothing now 
                // shouldn't update the refresh mode if something else changes 

                
        } 
        

    }
    onMapChanged(e) {
        var model = e.detail.model;
        var map = model.cur_map;
        if( map == 0 ){
            TweenMax.to( this.rotation , 1.0 , { ease:Expo.easeInOut , delay:0 , x:0 , y:0 , z:0 } )
            TweenMax.to( this.position , 1.0 , { ease:Expo.easeInOut , delay:0 ,x:0, y:0 , z:0 } )
            TweenMax.to( this.subspace.position , 1.0 , { ease:Expo.easeInOut , delay:0 ,x:0, y:0 , z:0 } )
            this.update = this.updateGridEnumerate;
        }else if( map==1){
            TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:1.1 } )
            this.update = this.updateRandom;
        }else if( map==3){
            TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            this.update = this.updateBlank;
        }else if( map==6){
            TweenMax.to( this.rotation , 2.4 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            //this.update = this.updateGridEnumerate;
            this.update = this.updateForceDirected;
        };

    }
    onClearUpdate(e){  //Listen for the event.
        for (var i = this.swarm_holder.children.length - 1; i >= 0; i--) {
            var cur_sprite = this.swarm_holder.children[i];
            try{
                cur_sprite.deallocate();
            }catch(err){};
            this.swarm_holder.remove( cur_sprite );
        }
        this.nodes=[];
        this.links=[];
    }
    updateForceDirected(){
        // XFER SIMULATOR TO 3D
        this.layout.step();
        //this.layout.forEachBody(body => {
            //body.pos.y = 0;
        //})
        //this.rotation.y += 0.0006;

        // USE FROM INSIDE AVATAR to REMOVE FROM LAYOUT PATHWAY : 
        //this.layout.pinNode( nodeId , !layout.isNodePinned(node));
        var weights=[100 ,3,1,1];
        // TRANSFER POSITIONS FROM SIMULATOR 
        this.model.graph.forEachNode( function( n ){ 
            //n.body.pos.y = 0;


            // if( n.data.level ){
            //     n.body.pos.y =  n.data.level * 20 ;
            //     n.body.mass =weights[n.data.level];
            // }

            /*
            if(n.data.labels[0] == 'dex' || n.data.labels[0] == 'cex'){
                n.body.pos.y = 20;
            }
            if(n.data.labels[0] == 'dex'){
                n.body.pos.y = 40;
            } */           
            var n_pos = this.model.layout.getNodePosition(n.id);
            n.sprite.position.set(n_pos['x'],n_pos['y'],n_pos['z'])
            n.sprite.update()
        }.bind(this));
        
        // UPDATE LINK ANIM S
        for (var key in this.link_sprites) {
            var cube = this.link_sprites[key];
            cube.update()
        }
        
        //this.model.graph.forEachLink( function( link ){
            // SHOULD UPDATE HERE INSTEAD 
            //if( link.fromId && (link.id in this.link_sprites == false )) {
            //    link.mesh = this.subspace;
            //    var newlink = new Linkx( link );
            //    this.link_sprites[link.id] = newlink
            //}
        //});


        // TIMEOUT 
        if( this.ntrvl>850){
            //this.update = this.updateBlank;
            this.ntrvl=0;
        }this.ntrvl++;
    }    
    updateForceDirectedPREBODY(){
        // XFER SIMULATOR TO 3D
        this.layout.step();
        this.layout.forEachBody(body => {
            //body.pos.y = 0;
        })
        //this.rotation.y += 0.0006;

        // USE FROM INSIDE AVATAR to REMOVE FROM LAYOUT PATHWAY : 
        //this.layout.pinNode( nodeId , !layout.isNodePinned(node));
        var weights=[100 ,3,1,1];
        // TRANSFER POSITIONS FROM SIMULATOR 
        this.model.graph.forEachNode( function( n ){ 
            n.body.pos.y = 0;

            if( n.data.level ){
                n.body.pos.y =  n.data.level * 20 ;
                n.body.mass =weights[n.data.level];
            }

            /*
            if(n.data.labels[0] == 'dex' || n.data.labels[0] == 'cex'){
                n.body.pos.y = 20;
            }
            if(n.data.labels[0] == 'dex'){
                n.body.pos.y = 40;
            } */           
            var n_pos = this.model.layout.getNodePosition(n.id);
            n.sprite.position.set(n_pos['x'],n_pos['y'],n_pos['z'])
            n.sprite.update()
        }.bind(this));
        
        // UPDATE LINK ANIM S
        for (var key in this.link_sprites) {
            var cube = this.link_sprites[key];
            cube.update()
        }
        
        //this.model.graph.forEachLink( function( link ){
            // SHOULD UPDATE HERE INSTEAD 
            //if( link.fromId && (link.id in this.link_sprites == false )) {
            //    link.mesh = this.subspace;
            //    var newlink = new Linkx( link );
            //    this.link_sprites[link.id] = newlink
            //}
        //});


        // TIMEOUT 
        if( this.ntrvl>850){
            //this.update = this.updateBlank;
            this.ntrvl=0;
        }this.ntrvl++;
    }
    updateGridEnumerate(){
        //this.rotation.y -= 0.0002;
        for( n in this.nodes ){
            var fu_vec = this.nodes[n].positions['futurex']
            var cur_vec = this.nodes[n].sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/50
            cur_vec.y  += ((  fu_vec.y  ) - cur_vec.y )/20
            cur_vec.z  += ((  fu_vec.z  ) - cur_vec.z )/100
        }
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
        //        this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
            //    this.links[l].sprite.update();
            }catch( e ){};
        }        
    }
    updateGridEnumerateRand() {
        //this.rotation.y -= 0.0002;
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            fu_point = cur_node.positions['futurex']

            // iterate over virtual springs
            // each spring connects two nodes
            // iteration is in fixed order so that one always starts first one ends last
            // move node at one end of spring to some relative position of first end of spring 
            var orig_n = n
            var remlen = 6 % Math.max( 1,n)
            var lenrem = 1 + n % 6
            var offset = 5 - n % 6;
            var xclass = cur_node.label;
            //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            fu_vec = this.nodes[remlen].sprite.position
            
            cur_vec = cur_node.sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/100
            cur_vec.y  += ((  (n)+fu_vec.y  ) - cur_vec.y )/100
            cur_vec.z  += (fu_vec.z - cur_vec.z )/100

        }
    }
    pdateGridEnumerateMoveTowards() {
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            if( n > 0 ){
                cur_node = this.nodes[n]
                //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
                //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
                //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
                //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
                fu_point = cur_node.positions['futurex']
                random_x = Math.random()*10-Math.random()*10
                random_y = Math.random()*10-Math.random()*10
                random_z = Math.random()*10-Math.random()*10
                //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
                //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position

                cur_vec = cur_node.sprite.position
                //cur_node.sprite.translateOnAxis( fu_vec ,0.001)
                cur_vec.x  += ( fu_vec.x - cur_vec.x )/100
                cur_vec.y  += ( fu_vec.y - cur_vec.y )/100
                cur_vec.z  += ( fu_vec.z - cur_vec.z )/100
                //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
                //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            }; 
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }
        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }
    updateGridEnumerateSliding () {
        //this.rotation.y -= 0.0002;
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
            //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
            //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
            fu_point = cur_node.positions['futurex']
            random_x = Math.random()*10-Math.random()*10
            random_y = Math.random()*10-Math.random()*10
            random_z = Math.random()*10-Math.random()*10
            fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            cur_node.sprite.translateOnAxis( fu_vec ,0.001)
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }

        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }
    updateElastic(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                // calculate the net force on this sprite from surrounding sprites?
                var center_sprite = this.nodes[i].sprite;
                for( var gx in this.nodes ){
                    var related_sprite = this.nodes[gx];
                }
                //this.nodes[i].sprite.position.y -= this.nodes[i].sprite.position.y / 12;
                //this.nodes[i].sprite.position.x = ( this.nodes[i].sprite.position.x - (this.central_node.sprite.position.x/22) ) ;

                this.central_node.sprite.position.x = this.central_node.sprite.position.x +( (0-this.central_node.sprite.position.x ) / this.intrvl );
                this.central_node.sprite.position.z = this.central_node.sprite.position.z +( (0-this.central_node.sprite.position.z ) / this.intrvl );
                this.central_node.sprite.position.y = this.central_node.sprite.position.y +( (0-this.central_node.sprite.position.y ) / this.intrvl );

                for( var cx in this.central_nodes ){
                    var periphery_node = this.central_nodes[cx];
                    periphery_node.sprite.position.x = this.central_node.sprite.position.x;
                    periphery_node.sprite.position.z = this.central_node.sprite.position.z;// + ( (this.central_node - periphery_node.sprite.position.x)/intrvl );
                }
            }catch( e ){};
        }

        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
                // link get a <-( distance / force )-> b
                // a.moveTowards / Away
                // b.moveTowards / Away
            }catch( e ){};
        }
    }
    updateRandom(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                this.nodes[i].sprite.position.x += i / 30;
                this.nodes[i].sprite.position.z -= i / 50;
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }
    updateBlank(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for (var key in this.link_sprites) {
            var cube = this.link_sprites[key];
            cube.update()
        }
    }
    updateOriginal(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;

        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }
    onCamReset(){}
    selfUpdate(){
        requestAnimationFrame( this.selfUpdate );
        var timestamp = new Date() * 0.0005;
        nodes[0].position.x+=Math.sin(timestamp) * 3;
        nodes[0].position.z+=Math.cos(timestamp) * 3;
        nodes[1].position.x+=Math.cos(timestamp) * 3;
        nodes[1].position.z+=Math.sin(timestamp) * 3;
        linexx.geometry.verticesNeedUpdate = true;
    }
    //this.update = this.updateBlank;
}
// SwarmView.prototype = Object.create( THREE.Mesh.prototype );
// SwarmView.prototype.constructor = SwarmView;
// SwarmView.prototype.getMesh = function() {
//     return this.mesh;
// }

export { SwarmView }