

import * as THREE from '../web_modules/three.js'
import { gsap , Expo } from '../web_modules/gsap.js'
import { Util } from '../util/util.js'
//import { connector } from '../util/connector.js'
import * as ids from '../util/ids.js'
import { sleep } from '../util/sleep.js'
import gluemapper from '../util/gluemapper.js'


// import  fabric  from '../fabric/fabric.js'
// import createLayout from '/web_modules/ngx.js'
import createGraph from '../web_modules/ngraph.graph.js'
import createLayout from '../web_modules/ngraph.forcelayout.js'
import ngraphPath from '../web_modules/ngraph.path.js'
// ('ngraph.path');


function IsoModel(){
    // SUB BUNDLE     
    //this.physicsSettings = { springLength:30, gravity: -0.01,   theta:0.8, integrator: 'euler',springCoefficient:0.0008, dragCoefficient:0.02, timeStep:20 }; //'verlet'
    var physicsSettingss = {
        timeStep: 0.5,
        dimensions: 2,
        gravity: -12,
        theta: 0.8,
        springLength: 10,
        springCoefficient: 0.8,
        dragCoefficient: 0.9,
    };
    this.physicsSettings = {
        dimensions: 3,
        timeStep: 0.5,
        gravity: -1,
        theta: 0.8,
        springLength: 20,
        springCoefficient: 0.8,
        dragCoefficient: 0.9
    };
    var path = ngraphPath;
    //var path = window.isostack.ngraphPath;
    //this.graph = window.isostack.createGraph();
    this.graph = createGraph();
    //this.layout = window.isostack.createLayout( this.graph , this.physicsSettings );
    //this.layoutOG = ngraphCreateLayout( this.graph , this.physicsSettings );
    this.layout = createLayout( this.graph , this.physicsSettings );
    window.physicsSettings = this.physicsSettings;
    window.layout = this.layout;
    window.graph = this.graph;
    
    this.layouts = {}; // Highorder Layout hash 
    this.layouts['0'] = { mode:'manual' }
    this.layouts['1'] = { mode:'force' }
    this.focusnode = 0;
    this.hovernode = 0;
    this.cur_map = 0;
    this.cur_arrange = 'random';
    this.stop = false;
    this.nodes = []
    this.links = []
    this.mode = 'normal'
    this.meta = {}
    this.meta = { layout:0 , layouts:{} , name:'set' , elements:[] }
    this.maps = [];
    this.modes = [];
    this.focusobject = false;
    this.rawData={ links:[] , nodes:[] };
    this.diff = { nodes:{} , links:{} } 

    this.parseDiff=function( diff ){
        // INCORPORATE META 
        if( diff.meta ){
            
        }

        // INCORPORATE NODES 
        if( diff.nodes ){
            
        }

        // INCORPORATE LINKS 
        if( diff.links ){
            
        }
    }    

    /// IMPORT DATA INTO RUNTIME ///
    this.parseCluster = function(objIn) {

        
        objIn = this.updateSchema( objIn )
        
        this.graph.forEachNode( function(node) {
            //console.log('e node: ',node); // logging loaded nodes for debug 
        });
        var nodco1 = this.graph.getNodesCount() ; 
        ///////  MERGE META 
        if('meta' in objIn){
            // TODO: Here we need to figure out how to merge metas 
            // maybe initially if it exists DO X 
            // if key doesn't exist insert into meta 
            if( 'layouts' in objIn.meta ){
                for( l in objIn.meta.layouts ){
                    if( ! this.meta.layouts[l] ){ this.meta.layouts[l]={} };
                    this.meta.layouts[l]={ ...this.meta.layouts[l] , ...objIn.meta.layouts[l]}
                } 
            }
            if('name' in objIn.meta){
                this.meta.name = objIn.meta.name;
            }
            
            
            // INSERT NON-EXIST META KEYS and Start SETTINGS 
            for( var m in objIn.meta ){
                if( m in this.meta ){
                    // merge 
                    var d=0;
                }else{   
                    // insert 
                    this.meta[m]=objIn.meta[m];
                }
            }

            if('props' in this.meta){
                // maybe not necessary to reparse 
                // this.meta.props = JSON.parse( objIn.meta.props );
                if( typeof( this.meta.props ) =='string'  ){
                    if( this.meta.props.includes('[') || this.meta.props.includes('{')){
                        this.meta.props = JSON.parse( this.meta.props );
                    }else{
                        this.meta.props = [this.meta.props];
                    }
                }
            }            
            

            
            
        }else{
            this.meta = { layout:0 , layouts:{} }
        }

        /////// ADD NODES
        for ( var i in objIn.nodes) {
            var nd=objIn.nodes[i];
            this.insertNode( nd );
        } 

        ////// ADD LINKS
        for ( var l in objIn.links ) {
            var o = objIn.links[l];
            this.insertLink(o);
        }

        //window.dispatchEvent(new CustomEvent('dataAppendEvent',{detail: {model: this, diff:diff }}))
        //this.links = [];
        var countt=0;
        var nodco = this.graph.getNodesCount() ; 
        
        this.nodes = this.graph;
        this.graph.forEachNode( function(node) {
            console.log('e node: ',node); // logging loaded nodes for debug 
        });
        this.graph.forEachLink( function(link) {
            console.log(link); // logging loaded nodes for debug 
        });
        

        // merge arrays // (  this should ensure uuid and props don't overlap )
        // so probably hash here 
        // these were used to rejoin the links after fragmenting 
        // can we store this on session host ? 
        this.rawData.nodes = this.rawData.nodes.concat( objIn.nodes ); 
        this.rawData.links = this.rawData.links.concat( objIn.links );        
        
        //this.reuuid()
        ////// DISPATCH FINAL
        window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this, from:'parse' }}))




        // IF Default RENDER CzonfigURED 
        if( 'render' in this.meta && this.meta['render'] == 'force' ){
            this.cur_arrange = 'force';
            window.dispatchEvent(new CustomEvent('arrangeChangeEvent',{detail: { model:this } }));
        }
        // IF Entry Node 
        if( 'entry' in this.meta && this.meta['entry'] == 'node' ){
            
        }


        //this.setFocusObject( this.rawData.nodes[0] )
        
    }   
    this.updateSchema =function( objIn ){

        // LINKS IF SLOTA SLOTB --> a b
        
        // console.log updating schema 
        // first check if node.slots are uuid from data 
        //    if yes do nothing 
        // else 
        //    find 

        for ( var i in objIn.nodes) {
            var nd=objIn.nodes[i];

            if( nd.slot ){
                console.log('yes! slot')
            }else{
                nd.slot = nd.payload.uuid; 
            }

            // get this nodes slot if exists and is different than uuid 
            // if( nd.slot != nd.payload.uuid ){

            //     // if slot isn't a uuid we need to map the uuid to the current slot 
            //     // 
            //     var pre_ref_links_by_uuid = {}
                
            //     this.graph.forEachLink(function( lnk ){
            //         //console.log( 'POST PARSE: ',node )
            //         //node.payload.label='oi';
            //         var j=8;
            //         if( lnk.a == nd.slot || lnk.b== nd.slot ){
            //             pre_ref_links_by_uuid[nd.payload.uuid]=lnk
            //         }
            //         //this.graph.getNode( node.slot );
            //     });
            //     var prev_slot = nd.slot;
            //     // find links which have prev_slot as either a or b 
                
            //     var g=78;
                
            //     // find all links which link to this node by slot 
            //     // 
            // }
            
            // if(nd.payload && 'uuid' in nd.payload )
            // {
            //     // 
            //     //  check if existing links have slot of node 
            //     //   
            //     var f=99;
            //     // find links by original slot 
            // };
        } 

        ////// UPDATE LINKS
        for ( var l in objIn.links ) {
            //var o = objIn.links[l];
            //this.insertLink(o);
        }

        return objIn; 
        
    }
    ////// ADD NODE 
    this.createNode = function( n_type ){

        // CLASS LABEL 
        var caplabel = n_type.charAt(0).toUpperCase() + n_type.slice(1); // capitalize label for neo convention 
        
        // BARE NODE 
        var new_node= { uuid: ids.uuidv4() , label: caplabel}; 
        
        // GET DEFAULT INITIALIZERS 
        var props = gluemapper.xclass_props( n_type );
        
        // MERGE 
        var payload = { ...new_node , ...props }

        var final_obj = {
            origin:'internal',   
            type:'object',
            payload: payload
        }

        // NEW DIFF CREATE 
        var nodeDiff = this.newNodeAsDiff( ids.uuidv4()  , caplabel , payload )
        this.parseCluster( nodeDiff )

        // OG CREATE DIRECT 
        // UPDATE LOCAL 
        //this.insertNode( final_obj )
        // SERVER SYNC PREV VERS
        //this.updateRemoteNode( final_obj ); // Node update temp only into kernel: // 
        //window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this}}))     
    }.bind( this )      


    
    /// ADD NODE 
    this.insertNode = function( node_in ){

        // NODE UPDATE REQUESTING INSERT  
        // COULD BE RETURNING NEO NODE ORIGINATED AS INTERNAL UUID

        let existing = this.graph.getNode( node_in.slot );
        if(  existing  ){
            var dd=4;
            existing.payload = node_in.payload; 
        }else if( ! existing && this.getNodeByUUID( node_in.payload.uuid ) ){

            existing = this.getNodeByUUID( node_in.payload.uuid )
            existing.payload = node_in.payload; 
        }
        else
        {
            if( !('slot' in node_in ) ){
                node_in['slot'] = ids.uuidv4();
            }
            // HERE WE SET SLOT as UUID from PROPERTY 
            // THIS WAS WORK AROUND FOR NODES BEING INSERTED TWICE
            // ( INSERTED AGAIN DURING EDGE CREATION SINCE THE UUID WAS NOt the SLot A / B )
            if( node_in.payload && 'uuid' in node_in.payload ){
                // THIS IS BREAKING oceaan schema 
                // node_in['slot']=node_in.payload.uuid
                // likely because they are not updated 
            }
            
            this.graph.addNode( node_in.slot , node_in.payload );   
            var node=this.graph.getNode( node_in.slot);
            node.slot = node.id;
            node.origin = node_in.origin;
            node.payload = node.data;
            node.type = 'object';
            node.model = this;
            this.diff.nodes[ node_in.slot ]=true;
        }        
 

        this.graph.forEachNode(function(node){
            //console.log( 'POST PARSE: ',node )

            //node.payload.label='oi';
            var j=8;
            //this.graph.getNode( node.slot );
        });

        // this to start data feeds:
        //this.requestInterestsPerClass( cur_node );
        //var c = this.graph.getNodesCount()
        //var er = 0;
    }        
    this.insertLink = function( o ){
        
        // var datObj = 'data' in lnk ? lnk.data : {};
        // o.model = this;
        // datObj.label = lnk.label;
        // datObj.uuid = lnk.uuid || lnk.id;
        // ,datObj.id = lnk.uuid || lnk.id;
        // var portable_start_id = trapped_ids[ lnk.start.id ];
        // var portable_end_id = trapped_ids[ lnk.start.id ];
        // now every single time a map is loaded from NEO4J it has to go through this mapping 
        if( o.origin =='neo'){

            // find link by uuid and update ?
            // if not exist create?
    
            // find nodes by elementId or UUID 
            var strtEl = o.payload.startNodeElementId;
            var endEl = o.payload.endNodeElementId;

            var slota = this.getNodeByKey('elementId', strtEl ).slot;
            var slotb = this.getNodeByKey('elementId', endEl ).slot;            
            // use their local slot id to make link
            
            if( this.graph.getLink(slota,slotb) ){
                var link = this.graph.getLink( slota , slotb );
                link.payload = o.payload;
                this.diff.links[ [slota,slotb] ] = true;
            }else{
                
                this.graph.addLink( slota , slotb , o.payload  )
                var link = this.graph.getLink( slota , slotb );
                link.model =this;
                link.origin = o.origin;
                link.a = link.fromId;
                link.b = link.toId;
                link.type = o.type;
                link.payload = link.data;
                this.diff.links[ [slota,slotb] ] = true;
            }            
            
        }else{

            if( ! this.graph.getLink(o.slota,o.slotb) ){
                this.graph.addLink( o.slota , o.slotb , o.payload  )
                var link = this.graph.getLink( o.slota , o.slotb );
                link.model =this;
                link.origin = o.origin;
                link.a = link.fromId;
                link.b = link.toId;
                link.type = o.type;
                link.payload = link.data;
                this.diff.links[ [o.slota,o.slotb] ] = true;
            }
            
        }

        

    }

    this.printNodes=function(){
        this.graph.forEachNode(function(node){
            console.log( node );    
        });
    }

    this.newNodeAsDiff=function( slot , type_in , valsObj ){
        return {
            nodes:[
                { 
                    slot:slot , 
                    origin:'int',
                    type:type_in , 
                    payload:valsObj 
                }                
            ],
            links:[]
        }
    }    
    this.newLinkAsDiff=function( startSlot, endSlot , type_in , valsObj ){
        return {
            nodes:[],
            links:[
                { 
                    slota:startSlot , 
                    slotb:endSlot , 
                    origin:'int',
                    type:type_in , 
                    payload:valsObj 
                }
            ]
        }
    }

    // EXPORT DATA OUT OF RUNTIME //
    this.syncMap=function(){
        console.log(' map to push to server')
        console.log(' ',this.cur_map )
        var final_json={}


        // PREPARE LAYOUTS
        var meta = Object.assign( {} , this.meta )
        meta['layout']=0;
        meta['encoder']='array'
        meta['encoder_version']='0.1' // June 3 2022 
        var outbound_layouts = []
        for( var l in this.meta.layouts){
            var obj = this.meta.layouts[l];
            outbound_layouts.push( obj )
            //console.log( JSON.stringify( obj) ); 
        }
        meta['layouts']=outbound_layouts;
        console.log( meta )



        // PREPARE NODES
        var nodes=[] //{} //[]{}refactor
        var nodes2=[];
        this.graph.forEachNode(function(node){
            
            var out_obj = { 
                origin:node.origin,
                slot:node.id ,
                payload:node.payload 
            }
            
            nodes.push( out_obj );    
        });
        //console.log( nodes )
        


        // PREPARE LINKS 
        var links=[] 
        this.graph.forEachLink(function(link) {
            var outlink = { 
                slota:link.fromId , 
                slotb:link.toId , 
                payload:link.payload 
            }
                  
            links.push( outlink ) 
        });

        final_json['action']='savemap'
        final_json['fn']='savemap';
        final_json['payload']= { meta , nodes , links }
        
        // this ensures no unsendable characters //
        var trs = JSON.parse( JSON.stringify( final_json ) );

        this.generateChannelEvent( trs );
        //console.log( JSON.stringify( final_json ))
        //connector.postProc( final_json ).then( function(obj){
        //      console.log(' POST SAVE MAP ')
        //})
        /*
        connector.savemap( final_json ).then( function(obj){

            console.log(' POST SAVE MAP ')
        })*/
    }

    


    this.onSelfReportEvent = function( posHash ){
        console.log(' position Update Hash Arrives in Model for this map: ', this.cur_map,'   posHash ',posHash )
        
        var mapprint = {}
        for( var m in posHash.detail ){
            
            var obj = posHash.detail[m]
            mapprint[m]={ x:obj.x, y:obj.y , z:obj.z }
        }
        
        this.maps[ this.cur_map ]=mapprint;
        this.meta.layouts[ this.meta.layout ]=mapprint;


        //var outbound_map = this.maps[ this.cur_map ]
        this.syncMap();

    }    


    
    // FIRE OFF REQUESTS BASED ON INTERESTS
    this.requestInterestsPerClass = function( cur_node ){

        // REGISTER SERVICES to FABRIC based on INTEREST: 
        
        var interests = [] 
        if( 'label' in cur_node ){
            var label = cur_node.label.toLowerCase();
            interests = gluemapper.xclass_interests( label );
        }
            
        console.log( label, ': would BOot and broadcast interest in: ',interests)
        var od = Object.assign( {} , cur_node )
        delete od.model;
        var px2 = JSON.parse(JSON.stringify( od ));
        for( var ntr in interests ){
            px2.method = interests[ntr]; 
            //if( px2.method !='display') 
            // THIS IN TEST MODE FOR BARE MAP 
            // IS LOOPING ITSELF POST MESSAGR
            // SHOULD BE this.updateUpstream( ) //(checks frame level )

            // YOU ARE HERE 
            // FIND OUT WHERE THE OTHER UUID IS COMING FROM 
            // HELLO THURSDAY MORNING
            window.parent.postMessage( px2 );
        }
    }   
    


    /// OBJECT SELECTED 
    this.setFocusObject = async function( obj ) {
        
        // INCOMING OBJECT WILL HAVE TO BE LINK or NODE: 
        // How to Tell most efficiently... Look up iD? 
        if( typeof(obj)=='object' && 'label' in obj ){
            var dom = obj['domain'];
        }
        

        if( obj != false ){
            // HERE IF UUID doesn't EXIST IN NODES, Search LINKS?
            if( 'fromId' in obj ){
                this.focusnode = obj.slot;
                this.focusobject = this.graph.getLink(obj.fromId ,obj.toId);            
                this.focusobjecttype=1;
            }
            // IF INDEX IT SHOULD SELECT RANGE OF OBJECTS to DISPLAY 
            else if(  'type' in obj && obj.type =='index' || obj.type =='object' ){

                // if INDEX 
                this.focusIndex=[];
                this.nodes.forEachNode(function(node) {
                    if (node.data && 'label' in node.data && node.data.label=='locale') {
                        this.focusIndex.push(node);
                    }
                }.bind(this) );
                var se = 3 
                this.focusnode = obj.slot;
                this.focusobject = this.getNodeByUUID(obj.slot);            
                this.focusobjecttype=0;


            }else{
                this.focusnode = obj.slot;
                this.focusobject = this.getNodeByUUID(obj.slot);            
                this.focusobjecttype=0;

                // Regular Node is Selected:: 
                
            }
        }else{
            this.focusnode = obj;
            this.focusobject = this.getNodeByUUID(obj.slot);
            this.focusobjecttype=false;
        }

        // Detect if Focus Event is INDEX: 
        // if event is Index: 
        //           insert Array into Index Node  ? 
        //           then dispatch Event 
        

        
        window.dispatchEvent( new CustomEvent( 'focusEvent',{ model: this, detail: { model: this } }))

        // AWAKEN FABRIC SERVICES AGAIN IF OBJECT: 
        if( this.focusobject ){
            this.requestInterestsPerClass( this.focusobject.data )    
        }
        
    }
    this.resetFocusObject = function(){
        this.focusnode = false;
        this.focusobject = false;
    }    

    this.subgraphRequest = function (){

        console.log( 'ask to expand: ' , this.focusobject );

        var node = this.focusobject;
        var obj = {
            method:'subgraph',
            slot:node.slot,
            data:node.data,
            elementId:node.payload.elementId,
            origin: node.origin
        }
        this.generateChannelEvent( obj );
    }

    this.configReuuid = function( ty ){

        
        // SCAN
        this.graph.forEachNode(function(node){
            console.log( node )
        });
        
        this.graph.forEachLink(function(link) {
            console.log( link )
        });        
        
        // RE
        var originals={}      

        this.graph.forEachNode(function(node){

            var future_id = ids.uuidv4() 
            originals[ node.id ]= future_id;
            if( ! 'data' in node || node.data == undefined ){
                node.data = {}
            }
            node.data.uuid = future_id;
            node.data.id = future_id;
            
            this.graph.updateKey( node.id , future_id );
            node.id=future_id;
            console.log( node )
        }.bind(this));
        
        this.graph.forEachLink(function(link) {
            
            link.fromId = originals[ link.fromId ];
            link.toId = originals[ link.toId ];
            var luuid = ids.uuidv4();
            link.data.uuid = luuid;
            link.id=luuid;
            var g=44;
            console.log( link )
        });        

        for( var l in this.meta.layouts )
        {
            var lt = this.meta.layouts[l];
            for ( var n in lt ){
             console.log( n )          
            }
             
        }
        
    }.bind(this)     
    
    this.configReuuidOg = function( ty ){

        
        // SCAN
        this.graph.forEachNode(function(node){
            console.log( node )
        });
        
        this.graph.forEachLink(function(link) {
            console.log( link )
        });        
        
        // RE
        var originals={}        
        this.graph.forEachNode(function(node){

            var future_id = ids.uuidv4() 
            originals[ node.id ]= future_id;
            if( ! 'data' in node || node.data == undefined ){
                node.data = {}
            }
            node.data.uuid = future_id;
            node.data.id = future_id;
            node.id=future_id;
            console.log( node )
        });
        
        this.graph.forEachLink(function(link) {
            
            link.fromId = originals[ link.fromId ];
            link.toId = originals[ link.toId ];
            var luuid = ids.uuidv4();
            link.data.uuid = luuid;
            link.id=luuid;
            var g=44;
            console.log( link )
        });        

        for( var l in this.meta.layouts )
        {
            var lt = this.meta.layouts[l];
            for ( var n in lt ){
             console.log( n )          
            }
             
        }
        
    }.bind(this) 

    this.reuuid = function( ){

        // ITERATES AlL NODES and ADDS NEW-GEN UUIDS ( maybe even friendly clues )
        // PREPARE NODES
        this.graph.forEachNode(function(node){
            console.log( node )
            var g=44;
            var fuuid = 'NU'+ids.uuidv4() 
            if( ! 'data' in node || node.data == undefined ){
                node.data = {}
            }
            node.data.uuid = fuuid;
            node.data.id = fuuid;
        });
        
        this.graph.forEachLink(function(link) {
            console.log( link )
            link.data.uuid = ids.uuidv4()
            var g=44;
        });        
        
    }
        

    
    this.ingestMethod = function( o ){

        var future_nodes = o.payload;
        console.log( future_nodes )
        for (var i in future_nodes) {
            var cur_node = future_nodes[i];
            cur_node.uuid = ids.uuidv4()
            
            cur_node.label = 'Token'
            this.insertNode( cur_node )
        }
        window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this, from:'parse' }}))
    }
    
    this.updateMapSchema = function(){

        console.log('migrate schema ')
        // iterate all objects 
        // check version and add version
        // go through rules per label xclass 
        // gluemapper.rescheme( obj )
        // cex 
    }
    this.broadcastReportRequest = function(){
        window.dispatchEvent(new CustomEvent('reportRequestEvent',{ detail: {model: this}}))
        /*
        this.maps[ this.cur_map ]=mapsHash;
        window.dispatchEvent(new CustomEvent('linkFlowEvent',{
            detail: {
                model: this
            }
        }))*/
    }
    
    
    this.outflowFromFocused = function() {

        // find which object it is connected to
        console.log(' focused Object : ', this.focusobject)
        var focused_id = this.focusobject.id;
        let path = require('ngraph.path');
        let pathFinder = path.aStar(this.graph);
        // graph is https://github.com/anvaka/ngraph.graph

        let fromNodeId = focused_id;
        let toNodeId = 4129;
        let foundPath = pathFinder.find(fromNodeId, toNodeId);
        var stpyo = foundPath;

        for (var x = foundPath.length - 1; x > 0; x--) {
            var a = ''+foundPath[x].id
            var b = ''+foundPath[x - 1].id

            if (this.graph.getLink(a, b)) {
                var curlink = this.graph.getLink(a, b)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            } else {
                var curlink = this.graph.getLink(b, a)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            }
        }

        window.dispatchEvent(new CustomEvent('linkFlowEvent',{
            detail: {
                model: this
            }
        }))

    }
    this.outflowFromFocusedWorks = function() {

        // find which object it is connected to
        console.log(' focused Object : ', this.focusobject)
        var focused_id = this.focusobject.id;
        let path = require('ngraph.path');
        let pathFinder = path.aStar(this.graph);
        // graph is https://github.com/anvaka/ngraph.graph

        let fromNodeId = focused_id;
        let toNodeId = 89;
        let foundPath = pathFinder.find(fromNodeId, toNodeId);
        var stpyo = foundPath;

        for (var x = 0; x < foundPath.length - 1; x++) {
            var a = foundPath[x].id
            var b = foundPath[x + 1].id

            if (this.graph.getLink(a, b)) {
                var curlink = this.graph.getLink(a, b)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            } else {
                var curlink = this.graph.getLink(b, a)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = b;
                curlink.data.flowTo = a;
            }
        }
        console.log( 'outflow from focused ')
        console.log( this )

        window.dispatchEvent(new CustomEvent('linkFlowEvent',{
            detail: {
                model: this
            }
        }))

    }
    this.selectArrange = async function( shape_in ){
        this.cur_arrange = shape_in;

        switch( shape_in ){
            case 'grid':
                break;
            case 'circle':
                break;
            case 'globe':
                break;   
            case 'partial_pin':

                var ndx=0
                for ( var s in this.layout.simulator.springs )
                {
                    if( Number("2")%2 == 0 ){
                    }
                }
                this.graph.forEachNode( function(nod){
                    nod.data.ndx=ndx;
                    //var node = this.layout.simulator.getNode( );
                    if( Number(nod.data.id) > 80 ){
                        layout.pinNode(nod, true);
                        //gsap.to( nod.sprite.position , { x:20+Math.random()*8 }) 
                    }
                    ndx++;
                }.bind(this))     
                
                break;
            case 'sphere':
                var n_count = this.graph.getNodesCount()
                var ndxx = 0;
                this.graph.forEachNode( function(nod){
                    
                    //nod.data.ndx=ndx;
                    //var node = this.layout.simulator.getNode( );
                    //if( Number(nod.data.id) > 80 ){
                    //    layout.pinNode(nod, true);
                        //
                    //}
                    //ndx++;
                    var thisvec = fibonacciSphere( n_count , ndxx ) ;
                    var diam = 70;
                    gsap.to( nod.data.sprite.position , {  duration:2.5, ease:Expo.easeInOut , x:thisvec.x * diam , y:thisvec.y * diam, z:thisvec.z * diam}) 
                    ndxx ++;
                }.bind(this))                      
                break;                
            case 'force':
                for ( var s in this.layout.simulator.springs )
                {
                    //var elspring = this.layout.simulator.springs[s]
                    //elspring.springLength = Math.random()*80;
                    //elspring.weight = Math.random();
                }
                break;    
            case 'fragment':
                
                this.graph.forEachLink( function(lnk){    
                    //layout.pinNode(nod, false );
                    this.graph.removeLink( lnk );
                    // HERE DOES IT NEED TO REMOVE THE NODE FROM LAYOUT SIMULATOR TOO?
                    
                }.bind(this))
                // for ( var s in this.layout.simulator.springs )
                // {
                //     var sp=s;
                // }
                break;     
            case 'fragment12':

                var ndx =0;
                this.graph.forEachLink( function(lnk){    
                    //layout.pinNode(nod, false );

                    
                    // setTimeout( () => {
                    //     console.log( 9 );
                    // }, 1000 * ndx );
                    ndx ++;
                    this.graph.removeLink( lnk );
                    window.dispatchEvent(new CustomEvent('arrangeChangeEvent',{detail: { model:this } }));
                    //await sleep(1000);
                    var l = 8;
                }.bind(this))

                break;
                
    
            case 'rejoin':
                var count=0;
                var prevLink=false;
                          
                for( var l in this.rawData.links ){
                    var ln = this.rawData.links[l];
                    
                    setTimeout( function (ln) {

                        this.insertLink( ln );
                        //console.log(' x: '+i);
                        window.dispatchEvent(new CustomEvent('arrangeChangeEvent',{detail: { model:this } }))
                    }.bind(this), 40 * l, ln );                      
                }
                break;                      
                
            case 'springswap':
                this.graph.forEachNode( function(nod){
                    layout.pinNode(nod, false );
                })
                for ( var s in this.layout.simulator.springs )
                {
                    if( Number("2")%2 == 0 ){
                        var elspring = this.layout.simulator.springs[s]
                        elspring.length = 80;//3+Math.random()*8;
                        //gsap.to( elspring , { duration:30+Math.random()*8 , length:Math.random()*75})                         
                    }else{
                        var elspring = this.layout.simulator.springs[s]
                        elspring.length = 20;// 3+Math.random()*8;
                        //gsap.to( elspring , { duration:Math.random()*4 , length:Math.random()*75})    
                        
                    }

                }
                break;
            case 'springlong':
                this.graph.forEachNode( function(nod){
                    layout.pinNode(nod, false );
                })
                for ( var s in this.layout.simulator.springs )
                {
                    if( Number("2")%2 == 0 ){
                        var elspring = this.layout.simulator.springs[s]
                        elspring.length = 90;//3+Math.random()*8;
                        //gsap.to( elspring , { duration:30+Math.random()*8 , length:Math.random()*75})                         
                    }else{
                        var elspring = this.layout.simulator.springs[s]
                        elspring.length = 80;// 3+Math.random()*8;
                        //gsap.to( elspring , { duration:Math.random()*4 , length:Math.random()*75})    
                        
                    }

                }
                break;
            case 'springshort':

                for ( var s in this.layout.simulator.springs )
                {
                    var elspring = this.layout.simulator.springs[s]
                    elspring.length = 5;//+Math.random()*8;
                    
                    //gsap.to( elspring , { duration:20+Math.random()*8 , length:Math.random()*75}) 
                }
                break;
        }
        window.dispatchEvent(new CustomEvent('arrangeChangeEvent',{detail: { model:this } }));

    }.bind( this )
    this.selectMap = function(map_in) {
        
        console.log('TJ',this )
        this.cur_map = map_in;
        this.meta.layout = map_in;
        this.resetFocusObject();

        // this switch is unnecessary now//
        // only thing that matters is map number and changedEvent: 
        // just here for fun overrides when experimenting 
        switch (map_in) {
            case "0":
                break;
            case "1":
                break;
            case "2":
                break;
            case "2":
                break;
            case "4":
                break; 
            case "5":
                break;
            default:
                
        }
        // event fired regardless 
        window.dispatchEvent(new CustomEvent('mapChangeEvent',{ detail:{ model: this } }))
        /*for ( var b in this.layout.simulator.nodes ){
            console.log( ' CONSOELLE layout ', b )
        }*/
        // Next RANDOMIZE INVIDIVUDAL SPRING LENGTHS 
        //this.dispatchEvent( { type: 'mapChangeEvent', detail:{model:this}  } )

    }.bind(this)
    this.setLinearIndex = function() {
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.subindex = n;
        };
    }
    this.setDemandIndexes = function() {
        var stars_hash = {};
        var iter_inner = 1;
        var iter_outer = 1;
        this.nodes = this.nodes.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            // ignore upper and lowercase
            var nameB = b.name.toUpperCase();
            // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
            // names must be equal
        });
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            if (cur_node.type == 'hub' || cur_node.type == 'market_index' || cur_node.type == 'asset_index') {
                cur_node.subindex = iter_inner;
                iter_inner++;
            } else if (cur_node.type == 'market') {
                cur_node.subindex = iter_outer;
                iter_outer++;
            }
        };
        var g = 'yo';
    }
    this.setGridEnumerateIndexes = function() {
        var iter_inner = 1;
        var iter_outer = 1;
        //this.nodes.sort( function(a,b){ return a.risk-b.risk; } );
        this.nodes.sort((a,b)=>(a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        for (var s in this.nodes) {//this.nodes[s]['ndx']=s;
        //this.layout_getNodePosition( node.id )
        }
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.positions['futurex'] = pointOnSphere(n / 3, n % 3, 140.0)
        }
    }
    this.setGridEnumerateIndexesWorkingRings = function() {
        var iter_inner = 1;
        var iter_outer = 1;
        this.nodes.sort((a,b)=>(a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        for (var s in this.nodes) {
            this.nodes[s]['ndx'] = s;
        }
        ;for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.positions['futurex'] = pointOnSphere(n / 3, n % 3, 140.0)
        }
        ;console.log('whatever')
    }
    this.setStarIndexes = function() {
        var center_possibles = ["Xindex", "Company"]
        var stars_hash = {};
        for (var l in this.links) {
            var cur_link = this.links[l];
            var a_node = this.getNodeByUUID(cur_link.a);
            var b_node = this.getNodeByUUID(cur_link.b);
            if (center_possibles.indexOf(a_node.label) != -1) {
                if (!stars_hash[a_node.uuid]) {
                    stars_hash[a_node.uuid] = []
                }
                a_node.central = true;
                stars_hash[a_node.uuid].push(b_node)
            };
            if (center_possibles.indexOf(b_node.label) != -1) {
                if (!stars_hash[b_node.uuid]) {
                    stars_hash[b_node.uuid] = []
                }
                stars_hash[b_node.uuid].push(b_node)
                b_node.central = true;
            };
        };
        var hubcount = 0;
        for (var s in stars_hash) {
            hubcount += 1;
            m_node = this.getNodeByUUID(s);
            m_node.star = hubcount;
            subs_arr = stars_hash[s]
            for (var ss in subs_arr) {
                subs_arr[ss].subindex = ss;
                subs_arr[ss].star = m_node.star;
                subs_arr[ss].starparent = m_node;
            }
        }
        var g = 'yo';
    }
    this.updateStop = function() {
        this.stop = true;
        console.log("Dispatch the event.");
        window.dispatchEvent(event);
    }
 
    //// SELECTS
    this.getNodeByUUID = function(guuid_in) {

        var nod ;
        this.graph.forEachNode( function(node) {
            //console.log(node); // logging loaded nodes for debug 
            if( node.payload && node.payload.uuid && node.payload.uuid == guuid_in){
                nod = node; 
            }
            var d=3;
        });
        this.graph.forEachLink( function(link) {
            //console.log(link); // logging loaded nodes for debug 
        });

        if( ! nod ){
            nod = this.graph.getNode(guuid_in);     
        }
        
        return nod;
        //return this.nodes[uuid_in];
    }
    this.getNodeByKey = function( keyin, idin ) {

        var nod ;
        this.graph.forEachNode( function(node) {

            if( node.payload && node.payload[ keyin ] == idin ){
                nod = node; 
            }
            var d=3;
        });
        this.graph.forEachLink( function(link) {
            //console.log(link); // logging loaded nodes for debug 
        });
        
        return nod;
        //return this.nodes[uuid_in];
    }    
 
    ///////// IN   ////////\ 
    //////// DATA //////////
    this.setData = function(objIn) {
        window.dispatchEvent(new CustomEvent('dataUpdate',{
            detail: {
                model: this
            }
        }))
    }
    this.clearData = function(objIn) {
        this.nodes = {}
        this.links = {}
        window.dispatchEvent(new CustomEvent('clearUpdate',{
            detail: {
                model: this
            }
        }))
    }
    this.pushTimeseries=function( hash_in ){

    }    
  
    this.updateRemoteNode=function( obj ){
        var out_obj  = Object.assign({}, obj);
        delete out_obj.body;
        delete out_obj.model;
        delete out_obj.links;
        delete out_obj.tele;
        delete out_obj.plane;
        delete out_obj.sprite;        
        //connector.updateNodeAsync( out_obj );  
    }

    this.mapAttributeUpdate = function( obj ){
        if( 'name' in obj  ){
            this.meta.name = obj.name; 
        }
        if( 'mapchannel' in obj  ){
            this.meta.mapchannel = obj.mapchannel; 
        }        
    }
    this.mergeUpdates=function( obj ){

        // either selectively merge in some changes into iso model 
        // OR 
        //dispatchEvent( dataUpdate )
        /// multi-object events need multi-object updates 
        // e.g. event which creates lots of new nodes like loadMarkets method 

        window.dispatchEvent(new CustomEvent('fabricEvent',{ model: this, detail: { model: this , obj:obj } }))
        
    }
    this.updateObject=function( node , obj ){
        var nodeRef = node.payload;
        //var node = this.getNodeByUUID( uuid )
        //const target = { a: 1, b: 2 };
        //const source = { b: 4, c: 5 };
        //const returnedTarget = Object.assign(target, source);        
        nodeRef = Object.assign( nodeRef , obj )
        try{
            if( 'name' in obj || 'brand' in obj ){
                // WOW THIS IS HOW OBJECT IS GETTING UPDATEd: 
                // Weird shortcut not gonna work for long: 
                //node.data.sprite.updateTitle( obj.name );
                obj['method']='display'
                obj['uuid']=nodeRef.uuid;
                obj.node=node;
                window.dispatchEvent(new CustomEvent('fieldEvent',{  detail: { model: this , obj:obj , method:'display' } }))
            }

            console.log(' updating node: ', nodeRef , ' with ' , obj )
            console.log('    after data: ', nodeRef )
        
        }catch{}

    }
    this.saveObject = function( nodeRef ){

        // DEPENDING ON OBJECT PARAMS THE SAVE 
        // DESTINATION WILL BE SPECITIC SO:
        // SHOULD JUST BE 
        var final_json={};
        final_json['method']='mergeobject';
        final_json['params']=this.snapshotNode( nodeRef )
        var trs = JSON.parse( JSON.stringify( final_json ) );
        this.generateChannelEvent( trs );
    }
    this.saveLink = function( slota , slotb ){

        var link = this.graph.getLink( slota , slotb );

        var node_a = this.graph.getNode( slota );
        var node_b = this.graph.getNode( slotb );

        var startElementId = node_a.payload.elementId;
        var endElementId = node_b.payload.elementId;
        
        var final_json={};
        final_json['method']='mergelink';
        final_json['params']=this.snapshotLink( link )
        var o = JSON.parse( JSON.stringify( final_json ) );
        this.generateChannelEvent( o );
    }    
    this.getLinkBySlots=function( a , b ){
        return this.graph.getLink( a,b)
        
    }
    this.snapshotNode=function( node ){

        var nodeOut = {};
        nodeOut.slot = node.slot;
        nodeOut.origin = node.origin;
        nodeOut.type = node.type;
        nodeOut.payload = node.payload;
        
        return nodeOut;
    }
    this.snapshotLink=function( link ){

        var linkOut = {};
        //linkOut.slot = link.slot;
        linkOut.origin = link.origin;

        var node_a = this.graph.getNode( link.a );
        var node_b = this.graph.getNode( link.b );
        var fromElementId = node_a.payload.elementId;
        var toElementId = node_b.payload.elementId;
        
        linkOut.a = link.a;
        linkOut.b = link.b;
        linkOut.startElementId = node_a.payload.elementId;
        linkOut.endElementId = node_b.payload.elementId;        
        linkOut.type = link.type;
        linkOut.payload = link.payload;
        
        
        return linkOut;
    }    
    this.updateLink=function( fromId, toId , obj ){
        
        // YOURE HERE UPDATE LINK : 
        //const target = { a: 1, b: 2 };
        //const source = { b: 4, c: 5 };
        //const returnedTarget = Object.assign(target, source);        
        var link = this.graph.getLink( fromId , toId);            
        link.data = Object.assign( link.data , obj )
        /*()

        try{
            node.data.sprite.updateTitle( obj.name )
        }catch{ }
        console.log(' updating node:  ',node , ' with ' , obj )
        console.log(' after data ',node.data ) */
    }     


    this.mergeUpdates=function( obj ){

        // either selectively merge in some changes into iso model 
        // OR 
        //dispatchEvent( dataUpdate )
        window.dispatchEvent(new CustomEvent('fabricEvent',{ model: this, detail: { model: this , obj:obj } }))
        
    }


   
    this.loadDataLocal = function(objIn){ }


    this.setPacket = function(objIn) {
        window.dispatchEvent( new CustomEvent( 'packetEvent',{
            detail: {
                model: this
            }
        }))
    }
    this.setAction = function(objIn) {
        this.action = objIn.action;

        switch (objIn.action) {
        case 'demand':
            this.setDemandIndexes();
        case 'samples':
            this.setLinearIndex();
        }

        window.dispatchEvent(new CustomEvent('actionEvent',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }
    this.setMode = function(map_in) {
        this.cur_map = map_in
        this.setStarIndexes();

        /*
        if( map_in == 6 )
        {
            var starcenter = 0;
            for( var s in this.nodes){

                if( this.nodes[s].links.length >= 1 )
                {
                    this.nodes[s].star = starcenter;
                    starcenter++;
                };
            };
        }*/

        window.dispatchEvent(new CustomEvent('mapChanged',{ detail:{ model: this }}))
    }
    this.setSort = function(objIn) {

        this.nodes.sort(function(a, b) {
            return a.risk - b.risk;
        });
        for (var s in this.nodes) {
            this.nodes[s]['ndx'] = s;
        }
        window.dispatchEvent(new CustomEvent('sortEvent',{
            detail: {
                model: this
            }
        }))

    }    
    this.saveMap = function( obj ) {
        window.dispatchEvent(new CustomEvent('mapSaveEvent',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }
    this.updatePointerState = function(event) {
        // slick new functions
        console.log(' updatePointer state,  Moue going through model')
    }
    this.addActor = function() {
        var l = this.graph;
        this.graph.addNode( 'unxid',{ name:'new name'})
        window.dispatchEvent(new CustomEvent('dataUpdate',{detail: {model: this}}))
    }
    this.activateLinkSelection = function(){
        this.mode='select'
        console.log( 'targeting link from: ' , this.focusnode ,  ' to: ', 'tbd' );
        window.dispatchEvent(new CustomEvent('selectModeEvent',{detail: {model: this}}))
    }
    this.setHoverSelect=function(id_in) {

        console.log(' model has hover node: ' , id_in );
        this.hovernode = this.getNodeByUUID(id_in);
        window.dispatchEvent(new CustomEvent('selectHoverEvent',{detail: {model: this}}))
    }
    this.traceNodes = function(){
        console.log('traceNodes:');
        this.graph.forEachNode(function(node){
            console.log('ND:',node.id );
        });
        
    }
    this.removeNode = function(){
        console.log(' rem:',this.focusobject.id);
        //this.traceNodes();
        this.graph.removeNode( this.focusobject.id );
        //this.traceNodes()
        // Removing link is a bit harder, since method requires actual link object:
        this.graph.forEachLinkedNode( this.focusobject.id, function(linkedNode, link){
            this.graph.removeLink(link);
        });
        this.setFocusObject( false );
        window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this}}))     
    }
    this.expandNode = function (){
        
        console.log(' expand:',this.focusobject.id);
        // YOU ARE HERE 
        // THIS SHOULD FIND ACTIVE NODE TYPE 
        // BASED ON NODE TYPE IT WILL PERFORM DIFFERENT EXPANSION 
        // FOR CEX IT WILL FIRE EVENT TO HOST FRAME  elementAppendDesired 
        // Basically it will call a function in driver that lists available tokens-vehicles 
        // then it will return list of ctokens for the exchange + containment edges + 
        // when event arrives at map as list , it will have to insert the elements into iso model map 
        // then it will fan them out in circle or multiple circles 
        // so as step one it will just call expand function ? 
        // so maybe model trip is not useful , it could just call it from controller 
        // frame.postMessage( { method:expand } )
        var exObj = {
            uuid:this.focusobject.id,
            method:'currencies' 
        }
        var px2 = JSON.parse(JSON.stringify( exObj ));
        window.parent.postMessage( px2 );        
        // future this will be :        
        // var ds = gluemapper.xclass_expand( this.focusobject.label )
        // console.log(' should expand node ')
        // 
    }
    this.removeLink = function( fromId , toId ){
        var l = 3;

        var lnk = this.graph.getLink( fromId , toId );           
        this.graph.removeLink( lnk );        
        //this.graph.removeLink( fromId , toId )
        //this.graph.addLink( this.focusobject.id , id_in , {type:'fresh',label:'CONNECTS', uuid:uuid } );
        window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this}}))
        this.mode = 'normal'
        window.dispatchEvent(new CustomEvent('clearViewsEvent',{detail: {model: this}}))
                
    }
        
    this.setNewLink=function( id_in ){
        var u = new Util();
        var uuid = u.uuidv4();

        // THIS WOULD BE BETTER TO GENERATE A DIFF and then HAVE IT ADDED WITH THE SAME ROUTE: 
        // generateLinkDiff(  startNode , endNode , obj );

        // NEW ADD VIA PARSE DIFF 
        var newLinkDiff = this.newLinkAsDiff( this.focusobject.id, id_in, 'CONNECTS', { weight:0 , uuid:uuid } )
        this.parseCluster( newLinkDiff );
        
        // PREVIOUS DIRECT ADD: 
        //this.graph.addLink( this.focusobject.id , id_in , {type:'fresh',label:'CONNECTS', uuid:uuid } );
        //window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this}}))
        
        this.mode = 'normal'
        window.dispatchEvent(new CustomEvent('clearViewsEvent',{detail: {model: this}}))
        window.dispatchEvent(new CustomEvent('selectModeEvent',{detail: {model: this}}))        
    }


    this.arrangeAround=function(){

        //this.focusobject.sprite.arrangeAround()
        var related_nodes = this.graph.getLinks( this.focusnode )
        var focused_sprite = this.getNodeByUUID( this.focusnode ).data.sprite;
        
        // all future pos : reset 
        // only relevant future pos set to COS * index   focused_sprite.position.x
        this.graph.forEachNode( function( node ){
            node.data.futurepos = false;
        })
        
        var ndx = 0;
        this.graph.forEachLinkedNode( this.focusnode , function(linkedNode, link){
            var yo= 3;

            var linkedNodeX = this.getNodeByUUID( link.toId )
            if( ! linkedNodeX.data.futurepos ){ linkedNodeX.data.futurepos={} }
            linkedNodeX.data.futurepos.x = focused_sprite.position.x + (Math.cos(ndx)*12);
            linkedNodeX.data.futurepos.y = 0;
            linkedNodeX.data.futurepos.z = focused_sprite.position.z + (Math.sin(ndx)*12);            
            ndx++;
        }.bind(this))
        window.dispatchEvent( new CustomEvent('somePositionsUpdatedEvent' , {detail: {model: this} }))
        

        /*
        for ( var xn in related_nodes ){

            var cur_link = related_nodes[xn]
            var related_node = this.getNodeByUUID( cur_link.toId )
            
            if( ! related_node.data.futurepos ){ related_node.data.futurepos={} }
            related_node.data.futurepos.x = 12;
            related_node.data.futurepos.y = 42;
            related_node.data.futurepos.z = 52;

        }*/

        
    }
    this.generateUpstreamDiff=function( obj ){
        
        // GENERATES CHANNEL EVENT FOR SAVES 
        window.parent.postMessage( obj );
        var a = 1;
        var c = 9;
    }
    this.generateChannelEvent=function( obj ){
        
        // GENERATES CHANNEL EVENT FOR SAVES 
        window.parent.postMessage( obj );
        var a = 1;
        var c = 9;

    }
    function randSphereSurface(r) {
        var TWOPI = 2.0 * Math.PI;
        var phi = TWOPI * Math.random();
        var theta = 2.0 * Math.asin(Math.sqrt(Math.random()));
        var x = r * Math.sin(theta);
        var y = x * Math.sin(phi);
        //x*= x*Math.cos(phi);
        var z = r * Math.cos(theta);
        return {
            x: x,
            y: y,
            z: z
        };
    }
    function pointOnSphere(lat, long, r) {
        phi = lat;
        theta = long;
        radius = r;
        return {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(theta) * Math.sin(phi)
        };
    }

    function fibonacciSphere(numPoints, point) {
      const rnd = 1;
      const offset = 2 / numPoints;
      const increment = Math.PI * (3 - Math.sqrt(5));
    
      const y = ((point * offset) - 1) + (offset / 2);
      const r = Math.sqrt(1 - Math.pow(y, 2));
    
      const phi = (point + rnd) % numPoints * increment;
    
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
    
      return new THREE.Vector3(x, y, z);
    }    

}
    
Object.assign( IsoModel.prototype, THREE.EventDispatcher.prototype );

export { IsoModel }



    // this.loadSignals = function() {
    //     var rnd = Math.round(Math.random() * 9999);
    //     var requestURL = '/unique_signals' + '?rnd=' + rnd;
    //     var request = new XMLHttpRequest();
    //     //
    //     request.open('GET', requestURL);
    //     request.onload = function() {
    //         var superHeroes = request.response;
    //         console.log(superHeroes)
    //     }
    //     request.responseType = 'json';
    //     request.send();
    // }
    // this.loadDataNetwork = function(objIn) {
    //     var requestURL = '/unique_signals' + '?rnd=' + Math.round(Math.random() * 9999);
    //     var request = new XMLHttpRequest();
    //     request.open('GET', requestURL);
    //     request.onload = function() {
    //         var res = request.response;
    //         for (var r in res) {
    //             var curitem = res[r];
    //             var obj = {
    //                 uuid: "n01",
    //                 class: '',
    //                 name: "x",
    //                 star: 0,
    //                 subindex: 0,
    //                 risk: 5,
    //                 links: [],
    //                 ndx: 1,
    //                 futurepos: {
    //                     x: 0,
    //                     y: 0,
    //                     z: 0
    //                 },
    //                 positions: {
    //                     default: {
    //                         x: 0,
    //                         y: 0,
    //                         z: 0
    //                     }
    //                 }
    //             };
    //         }
    //         window.dispatchEvent(new CustomEvent('dataUpdate',{
    //             detail: {
    //                 model: this
    //             }
    //         }))

    //     }
    //     .bind(this)
    //     request.responseType = 'json';
    //     request.send();
    // }



        /* THIS FRAGMENT ONLY WORKS IF MAP IS BARE 
        try{
            window.location.hash = ''+'LOADEDMAP';
        }catch(e){ console.log(' hash fregment set except in search') }  */

            // update map position on landing
        //if( 'layout' in this.meta  && this.meta.layout == 0 ){
            //this.cur_map = 0;
            //window.dispatchEvent(new CustomEvent('mapChanged',{ detail:{ model: this }}))
        //}


    // var labels_radiuses = {
    //     'App': 1,
    //     'Domain': 2.5
    // }


    //var maps = []
    //var maps = {}

        
        // UPDATE NEO4J--> 
        // var out_obj = {} // new clean server version 
                //var evObj = { ...{ type:'channel',  met:'channel', fn:'spawn' , uuid:cur_node.uuid } , 
                //              ...{ carrier:cur_node.carrier, driver:cur_node.driver} };

    //this.positions = []

       
        //cur_node.id = cur_node.guuid; // HERE WAS USING GUUID INSERTED ON SERVERSIDE
        // if( 'uuid' in cur_node == false){
        //     cur_node['uuid'] = ids.uuidv4(); //cur_node.name+'_'+Math.round( Math.random()*9999 );
        // }

        // SELF INSERT NODE: // Next Switch TYpe 
        //console.log(' create node ')
        //var r=3; var k=4;
        //var rnduuid = Math.round( Math.random()*9999) +'gc';



            //if( cur_node.carrier && cur_node.driver){
            //    var px2 = JSON.parse(JSON.stringify( cur_node ));
            //    window.parent.postMessage( px2 ); // THIS Should Bubble later 

                // HERE IT SOULD FIND INTERESTS AND FIRE PER INTEREST: 
                //var k=4;
            //}

            // var veh = ccxt[ dom ]
            // var v = new veh();
            // v.fetchTicker('BTC/USD').then( function( tick ){

            // console.log( tick );
            // var meth = Object.keys( v )
            // console.log( meth );
            // });
            // this slows open 
            //var tick = await v.fetchTicker('BTC/USD');
            //var meth = Object.keys( v )
            //var o =   33;

     // this.updateObjectOG=function( uuid , obj ){
    //     var node = this.getNodeByUUID( uuid )
    //     //const target = { a: 1, b: 2 };
    //     //const source = { b: 4, c: 5 };
    //     //const returnedTarget = Object.assign(target, source);        
    //     node.data = Object.assign( node.data , obj )
    //     this.updateRemoteNode( node.data );
    //     try{
    //         if( 'name' in obj ){
    //             // WOW THIS IS HOW OBJECT IS GETTING UPDATEd: 
    //             //node.data.sprite.updateTitle( obj.name +' WWOWOOOOP' )    
    //             window.dispatchEvent(new CustomEvent('fieldEvent',{  detail: { model: this , obj:node.data } }))
    //         }
    //     }catch{}
        
    //     console.log(' after data ',node.data )
    // }



            // case 'rejoin_OG':
            //     var count=0;
            //     var prevLink=false;
            //     for( var l in this.rawData.links ){
            //         var ln = this.rawData.links[l];
            //         this.insertLink( ln );
            //     }
            //     // this.graph.forEachNode( function(lnk)
            //     //     this.graph.addLink( lnk )
            //     // }.bind(this))
            //     // for ( var s in this.layout.simulator.springs )
            //     // {
            //     //     var sp=s;
            //     // }
            //     break;  


                // this.graph.forEachNode( function(lnk)
                //     this.graph.addLink( lnk )
                // }.bind(this))
                // for ( var s in this.layout.simulator.springs )
                // {
                //     var sp=s;
                // }



    // /// LOAD MAP 
    // this.parseClusterV1 = function(objIn) {


    //     /////// MAP META 
    //     if('meta' in objIn){
    //         this.meta = objIn.meta;
    //         this.meta['layout']  = this.meta['layout'] ? this.meta['layout'] : 0;
    //         this.meta['layouts']  = this.meta['layouts'] ? this.meta['layouts'] : {};
    //     }else{
    //         this.meta = { layout:0 , layouts:{} }
    //     }
        
    //     /////// ADD NODES
    //     for (var i in objIn.nodes) {
    //         this.insertNode( objIn.nodes[i] );
    //     } 

    //     /////// ADD LINKS
    //     for (var l in objIn.links ) {
    //         this.insertLink( objIn.links[l] );
    //     }
        
    //     //this.links = [];
    //     this.nodes = this.graph;
    //     this.graph.forEachNode( function(node) {
    //         console.log(node); // logging loaded nodes for debug 
    //     });
    //     this.graph.forEachLink( function(link) {
    //         console.log(link); // logging loaded nodes for debug 
    //     });
        

    //     // merge arrays: (  this should ensure uuid and props don't overlap )
    //     this.rawData.nodes = this.rawData.nodes.concat( objIn.nodes ); 
    //     this.rawData.links = this.rawData.links.concat( objIn.links );        
    //     //this.reuuid()
    //     ////// DISPATCH FINAL
    //     window.dispatchEvent(new CustomEvent('dataUpdateEvent',{detail: {model: this, from:'parse' }}))
    // }    