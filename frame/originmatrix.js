import * as ids from '../util/ids.js';
import * as tools from './origintools.js';
import createGraph from '../web_modules/ngraph.graph.js';
import gluemapper from '../util/gluemapper.js'
import originglue from './originglue.js'



 


class OriginMatrix extends EventTarget {

    // ORIGIN MATRIX PARAMS COULD BE ROUTES FOR THIS ORIGIN: 
    constructor( obj={origin:''} ){
        super();
        this.extractors={
            neo:{
                node( o ){},
                edge( o ){}
            },
            keycache:{
                node(o){ } 
            }
        };       
        this.resetMap(); 
        this.nodes; 
        this.links;
        this.nodes_by_uuid={};
        this.links_by_uuid={};
        this.links_by_ab={};
    }


    // Start New Map();
    resetMap( map_in={ nodes:[] , links:[] , meta:{origin:'general' , foreign_id_name:'elementId'} }  ){
        this.graph = createGraph();
        this.nodes= new Map();
        this.links= new Map();
        this.meta = { layouts:{} }
        this.link_foreign_to_slot={}
        this.node_foreign_to_slot={}
        this.nodes_by_uuid={};
        this.links_by_uuid={};
        this.links_by_ab={};        
        this.mergeMap( map_in );
    };

    appendMap( map_in ){


        // CONCAT LAYOUTS ONE BY ONE
        // KEEP CURRENT POSITION FOR EXISTING 

        // LATER: 
        // USE CASE TWO MAPS WITH DIFFERENT SLOTS HAVE THE SAME UNDERLYING NODE
        // TWO LAYOUTS WITH DIFFERENT SLOTS ARE POINTING TO SAME NODE 
        // how would "same node be identified , same origin plus same ID ? "
        // ALSO GLOBAL COLLECTION WITH REUSABLE OBJECTS CREATED 

        if( map_in.nodes )
            this.nodes = tools.concatNodes( this.nodes , map_in.nodes );

        if( map_in.links )
            this.links = tools.concatLinks( this.links  , map_in.links );

        if( map_in.meta )
            this.meta.layouts = tools.concatLayouts( this.meta.layouts , map_in.meta.layouts );

        var e=3;

    }

    incomingFromAuxFeeds(  diff_in={} ){

        // price Feeds + data streams
        // routed by symnol + function xclass + label 
        // scam local slots for incomingdomains
        ///////////////////////////////////////
        // later create cache index 
        ////////////////////////////////////
        
        
    }

    
    extractNodeKeycache( o ){
        var outX;
        // flatten properties into payload
        if(o.slot && o.payload ){
            outX = o;
            outX.type='object'
        }else{
            outX = {
                origin:'neo',   
                slot:ids.uuidv4(),
                type:'object',
                payload:o
            }
        }
        return outX; 
    } 

    
    transformExtract( map_in={ nodes:[] , links:[] , meta:{} }  ){

        this.extractors[ map_in.meta.origin ]( map_in )
    }
    incomingDiffWithMetadata( map_in={ nodes:[] , links:[] , meta:{} } ){ 

        var structuredDiff = this.transformExtract( map_in );
    }
    
    incomingDiffFromKeyCache( map_in={ nodes:[] , links:[] , meta:{} } ){

        // u are here 
        // this is wrecking llm saved nodes 
        var diff_out={ nodes:[] , links:[] , meta:{}  }
        
        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var inObj = map_in.nodes[ni];

            if( ! inObj.payload ){ 
                inObj.payload = { ...inObj }  
            };
        
            var uuiidd = ( inObj.payload ) ? inObj.payload.uuid : inObj.uuid;
            var existingNode = this.getNodeByForeignKey( 'uuid' , uuiidd )
        
            if( existingNode ){
                existingNode.payload = inObj.payload;

            }else{
                existingNode = this.extractNodeKeycache( inObj );  
                this.nodes.set( existingNode.slot , existingNode );
                this.node_foreign_to_slot[ existingNode.payload['uuid'] ]= existingNode.slot;                             
            }
            
            diff_out.nodes.push( existingNode );
        }

        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];

            if( ! liObj.payload ){
                liObj.payload =liObj.data;
            }
            //var existingLink = this.getOrCreateLinkByForeignKey( 'uuid' , liObj.payload.uuid , liObj );
            var uuiidd = liObj.payload ? liObj.payload.uuid : ( liObj.data ) ? liObj.data.uuid : liObj.uuid; 
            var existingLink =  liObj;  // this.getLinkByForeignKey( 'uuid' ,  uuiidd )
            if( existingLink ){
    
                //existingLink.payload = liObj.payload;    
            }else{
    
                existingLink = this.extractLinkKeycache( liObj );
            }
            this.links.set( [existingLink.slota,existingLink.slotb] , existingLink )
            
            diff_out.links.push( existingLink );
        }

        diff_out.meta = map_in.meta ;
        // merge nodes by uuid 

        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 

    }    

    incomingDiffFromExtractor( map_in={ nodes:[] , links:[] , meta:{} } ){

        var diff_out={ nodes:[] , links:[] , meta:{}  }

        // iter nodes, check if elementId /uuid exists in mem
        
        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var payloadIn = this.extractNodeNeo( map_in.nodes[ni] ).payload;
            
            var prepayload= payloadIn; /// { ...o , ...o.properties }
            var origin = 'extractor';
            delete prepayload.properties
            var x = {
                origin:origin,   
                slot: origin+'_'+prepayload.uuid,//ids.uuidv4(),
                type:'object',
                payload:prepayload
            }
            //return x;           
            
            
            var existingNode =  x; //  this.extractNodeNeo( payloadIn )  
            diff_out.nodes.push( existingNode );
        }

        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];
            
            //var existingLink = this.extractLinkNeo( liObj );

            var x = {
                origin:'neo',   
                slota:'neo_'+liObj.uuid ,
                slotb:'neo_'+liObj.uuid  ,                 
                type:liObj.type,
                payload:liObj
            }
            
             diff_out.links.push( x );
        }

        diff_out.meta =( 'meta' in map_in ) ? map_in.meta : {};
        // merge nodes by uuid 
        
        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 

    }    

    incomingDiffFromOai( map_in={ nodes:[] , links:[] , meta:{} } ){


        // YOU ARE HERE HOW DO YOu MAP DIFFERENT KEYS from
        // varied responses to local 
        
        var f =3;
        var diff_out={ nodes:[] , links:[] , meta:{}  }

        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var payloadIn = map_in.nodes[ni];
            
            //var prepayload= payloadIn; /// { ...o , ...o.properties }
            var origin = 'oai';

            payloadIn.label='tag';
            payloadIn.uuid =  origin+'_'+payloadIn.name+'o'
            var x = {
                origin:origin,   
                slot: payloadIn.id,//ids.uuidv4(),
                type:'object',
                payload:payloadIn
            }
            //return x;           
            
            
            var existingNode =  x; //  this.extractNodeNeo( payloadIn )  
            diff_out.nodes.push( existingNode );
        }
        
        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];
            
            var existingLink = {};
            existingLink.name='lnk'
            existingLink.slota = liObj.source;
            existingLink.slotb = liObj.target;
            existingLink.payload = { label :liObj.type };
            diff_out.links.push( existingLink );
        }        

        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 
    }
    
    updateCache(  nodes_in , links_in ){

        for (let node of nodes_in) {
            if (node && node.slot) {
                this.nodes_by_uuid[node.slot] = node;
            }
        }

        for(let link of links_in ){
            if( link && link.slota && link.slotb ){
                this.links_by_ab[ link.slota , link.slotb ]= link; 
            }
        }
    }

    getCache(){

        var node_list=[];
        var link_list=[];
        for(let n in this.nodes_by_uuid  ){
            let node = this.nodes_by_uuid[n];
            node_list.push( node.payload )
        }
        for(let l in this.links_by_ab ){
            let link = this.links_by_ab[l];
            link_list.push( link.payload )
        }        
        return { nodes:node_list , links: link_list }
    }    

    incomingDiffFromGeneric( map_in={ nodes:[] , links:[] , meta:{} } ){


        // YOU ARE HERE 
        // LOGGED IN: 
        // LOADING DATA FROM REMOTE AI 
        // Now just map the remote ai nodes and edges to internal : 
        var map_in_temp = map_in; 
        map_in = {  
            nodes:map_in_temp['payload']['nodes'] , 
            links:map_in_temp['payload']['edges'] ,
            meta:{ type:"query", source:"glad"}
        }
        
        var f =3;
        var diff_out={ nodes:[] , links:[] , meta:{}  }

        function shrink( nin ){
            // here strip drop all spaces and special characters from nin adn return
            if (typeof nin === 'string') {
                return nin.replace(/[^a-zA-Z0-9]/g, '');
            }
            return nin;
        }
        var ids_to_uuids={};
        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var payloadIn = map_in.nodes[ni];
            
            //var prepayload= payloadIn; /// { ...o , ...o.properties }
            var origin = 'oai';

            
            payloadIn.label='tag';
            payloadIn.uuid =  origin+'_'+ shrink(payloadIn.name)+'_oid'; //+payloadIn.id
            ids_to_uuids[payloadIn.id]=payloadIn.uuid;
            var contained_node = {
                origin:origin,   
                slot: payloadIn.uuid,  //ids.uuidv4(),
                type:'object',
                payload:payloadIn
            }
            
            
            var x  =  contained_node; //  this.extractNodeNeo( payloadIn )  
            diff_out.nodes.push( contained_node  );
        }
        
        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];
            
            var existingLink = {};
            existingLink.name='lnk';
            // you are here 
            // the a and be need to be 
            // converted from id to derived_uuid 
            existingLink.slota = ids_to_uuids[ liObj.from ];
            existingLink.slotb = ids_to_uuids[ liObj.to ];
            existingLink.payload = liObj;
            diff_out.links.push( existingLink );
        }        

        this.updateCache(  diff_out.nodes , diff_out.links  );

        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 
    }
    

    incomingDiffFromNeo( map_in={ nodes:[] , links:[] , meta:{} } ){

        var diff_out={ nodes:[] , links:[] , meta:{}  }

        // iter nodes, check if elementId /uuid exists in mem
        
        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var payloadIn = this.extractNodeNeo( map_in.nodes[ni] ).payload;
            var existingNode = this.extractNodeNeo( payloadIn )  
            diff_out.nodes.push( existingNode );
        }

        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];
            
            var existingLink = this.extractLinkNeo( liObj );
            diff_out.links.push( existingLink );
        }

        diff_out.meta = map_in.meta;
        // merge nodes by uuid 
        
        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 

    }
    
    incomingDiffFromNeo_DualDiff( map_in={ nodes:[] , links:[] , meta:{} } ){

        var diff_out={ nodes:[] , links:[] , meta:{}  }

        // iter nodes, check if elementId /uuid exists in mem
        
        for( var ni in map_in.nodes ){
                                                                // for every incoming neo node check if it exists by UUID merge payload if it does, create new if not 
            var payloadIn = this.extractNodeNeo( map_in.nodes[ni] ).payload;
            var existingNode;
            // in objs from neo will always have elementID  but local in Mem
            
            existingNode = this.getNodeByForeignKey( 'uuid' , payloadIn.uuid )

            if( existingNode ) {
                existingNode.payload = { ...existingNode.payload , ...payloadIn };  
                diff_out.nodes.push( existingNode );
            }else{
                existingNode = this.extractNodeNeo( payloadIn )  
                this.nodes.set( existingNode.slot , existingNode );
                this.node_foreign_to_slot[ existingNode.payload['elementId'] ]= existingNode.slot;    
            }
            
            diff_out.nodes.push( existingNode );
        }

        
        for( var li in map_in.links ){
            var liObj = map_in.links[li];
            //var existingLink = this.getOrCreateLinkByForeignKey( 'uuid' , liObj.properties.uuid , liObj );
            //var existingLink = this.getLinkByForeignKeys( 'elementId'  , liObj.startNodeElementId , liObj.endNodeElementId  )
            
            // GET OR CREATE LINK BY Elid 
            var slota = this.node_foreign_to_slot[ liObj.startNodeElementId ]; 
            var slotb = this.node_foreign_to_slot[ liObj.endNodeElementId ]; 
            var existingLink = this.links.get( [slota,slotb] )
            
            if( existingLink ){
                existingLink.payload = liObj;
            }else{
                existingLink = this.extractLinkNeo( liObj );
                this.links.set( [existingLink.slota,existingLink.slotb] , existingLink )
            }
            diff_out.links.push( existingLink );
        }

        diff_out.meta = map_in.meta;
        // merge nodes by uuid 
        
        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 

    }
    // EXTRACTORS  FIRST WAVE 
    extractNodeNeo( o ){
        
        // flatten properties into payload
        var prepayload= { ...o , ...o.properties }
        var origin = 'neo';
        delete prepayload.properties
        var x = {
            origin:origin,   
            slot: origin+'_'+prepayload.elementId,//ids.uuidv4(),
            type:'object',
            payload:prepayload
        }
        return x; 
    }
   
    extractLinkNeo( o ){
        var x = {
            origin:'neo',   
            slota:'neo_'+o.startNodeElementId ,
            slotb:'neo_'+o.endNodeElementId ,                 
            type:o.type,
            payload:o
        }
        return x;
    }
    extractLinkNeoList( o ){
        var x = {
            origin:'neo',   
            slota:this.node_foreign_to_slot[ o.startNodeElementId ],
            slotb:this.node_foreign_to_slot[ o.endNodeElementId ],                 
            type:o.type,
            payload:o
        }
        return x;
    }    
    extractLinkKeycache( o ){
        var x = o;
        if( ! o.slota && o.a ) o.slota=o.a;
        if( ! o.slotb && o.b ) o.slotb=o.b;
        x.type=o.type?o.type:'added';
        x.origin='internal';
        return x;
    }    
    transformEdgeToNeo( diffIn ){

        // check for slot a and slot b 
        // find Object A and B 
        // check if A and B have element ID 
        // formulate sabric with 
        
        var obj = diffIn.params;
        //var node_a = this.nodes.get( obj.a )
        //var node_b = this.nodes.get( obj.b )

        //var a_elId = node_a.payload.elementId;
        //var b_elId = node_b.payload.elementId;
        var props = obj.payload;
        var l_type = obj.type;
        var c =0;

        // check if exists //:
        
        

        return {

            startElementId:obj.startElementId,
            endElementId:obj.endElementId,
            type:l_type,
            properties:props
        }
        
        
    }

    spawnInsertObjectType( type_in  ){
        
        var props = gluemapper.xclass_props( type_in );        
        props['uuid']=ids.uuidv4();

        var origin = 'internal';
        // MERGE 
        //var payload = { labels:[type_in] , properties:props }
        var payload = { labels:[type_in] , ...props }
        
        var final_obj = {
            origin:origin,   
            slot: origin +'_'+payload.uuid ,    // ids.uuidv4(),
            type:'object',
            payload: payload
        }
        this.appendDiff( { nodes:[ final_obj ] });
        var r=3;
    }

    appendDiff( map_in={ nodes:[] , links:[] , meta:{} } ){

        // this should iterate incoming nodes 
        // check origin for each node , get ID per origin 
        // merge into existing slot by origin id or temp iD ?
        // use case: push freshNode  push neoMerged
        var diff_out={}
        
        if( map_in.nodes )
            this.nodes = tools.concatNodes( this.nodes , map_in.nodes );
            diff_out.nodes = map_in.nodes;

        if( map_in.links )
            this.links = tools.concatLinks( this.links  , map_in.links );

        if( map_in.meta )
            this.meta.layouts = tools.concatLayouts( this.meta.layouts , map_in.meta.layouts );

        var e=3;
        this.dispatchEvent( new CustomEvent('freshDiffEvent' , { detail:diff_out } ) ); 

    }
    
    pushDiff( map_in={ nodes:[] , links:[] , meta:{} } ){

        // this should iterate incoming nodes 
        // check origin for each node , get ID per origin 
        // merge into existing slot by origin id or temp iD ?
        // use case: push freshNode  push neoMerged
        if( map_in.nodes )
            for( var n in map_in.nodes ){

                getNodeByForeignKey( foreign_name_in ,id_in )
            }
            this.tryMergeByUUID( )


            this.nodes = tools.concatNodes( this.nodes , map_in.nodes );

        if( map_in.links )
            this.links = tools.concatLinks( this.links  , map_in.links );

        if( map_in.meta )
            this.meta.layouts = tools.concatLayouts( this.meta.layouts , map_in.meta.layouts );

        var e=3;

    }

    tryMergeByUUID(  ){

        for( var n in this.nodes ){

            
        }
    }

    unwrapExtract( obj ){

        
    }
    mergeDiff(  map_in={ nodes:[] , links:[] , meta:{origin:'general' , foreign_id_name:'elementId'}} ){   
        
    }

    // THIS SHOULD MERGE FOREIGN SCHEMAS AND NORMALIZE ALL NODES AND LINKS TO SLOTS 
    mergeMap( map_in={ nodes:[] , links:[] , meta:{origin:'general' , foreign_id_name:'elementId'}} ){
        console.log( 'scanning incoming n');
        var foreign_id_name = map_in.meta.foreign_id; 
        var foreign_a_name = map_in.meta.foreign_a;
        var foreign_b_name = map_in.meta.foreign_b;

        var diff_nodes={}
        var diff_links={}
        var diff_meta={}
                

        // RUN THROUGH INCOMINB NODES AND CHECK IF EACH INCOMIN 
        // FOREIGN_ID ALREADY EXISTS IN SLOT 
        // USE EXISTING SLOT IF ALREADY LOADED INSERT IF NOT 
        for( var i in map_in.nodes )
        {
            var n = map_in.nodes[i];
            var foreign_id = n[foreign_id_name];
            var existing_object = this.getNodeByForeignId( foreign_id_name , foreign_id );
            
            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_node = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    payload:n }
                this.nodes.set( new_slot , new_node );
                existing_object = this.nodes.get( new_slot );
                diff_nodes[ new_slot ]=existing_object;
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.node_foreign_to_slot[ foreign_id ]= existing_object.slot;
        }

        // SCAN INCOMING RELATIONSHIPS AND MAP INCOMING FOREIGN_IDS TO EXISTING SLOTS 
        // THEN MAP 
        for( var i in map_in.links ){

            var l = map_in.links[i];
            var foreign_id = l[foreign_id_name];
            var existing_object = this.getLinkByForeignKey( foreign_id_name , foreign_id );

            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_link = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    slota:this.node_foreign_to_slot[ l[foreign_a_name] ],
                    slotb:this.node_foreign_to_slot[ l[foreign_b_name] ],
                    payload:l 
                } 
                this.links.set( new_slot , new_link );
                existing_object = this.links.get( new_slot );
                diff_links[ new_slot ]=existing_object;
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.link_foreign_to_slot[ foreign_id ]= existing_object.slot;    
        }

        // MERGE LAYOUTS:
        if( 'layouts' in map_in.meta ){
            
            // GO THROUGH EVERY INCOMING LAYOUT 
            for( var l in map_in.meta.layouts ){
                var lyt_in = map_in.meta.layouts[l];

                // CONVERT FOREIGN IDS TO SLOTS 
                // var remapped_layout_in = {}
                // for( var nd in lyt_in ){    
                //     if(  this.node_foreign_to_slot[ nd ]   ){
                //         remapped_layout_in[ this.node_foreign_to_slot[ nd ] ]=lyt_in[ nd ];
                //     } 
                // }  
                
                // MERGE
                if( ! this.meta.layouts[l] ) this.meta.layouts[l]={};
                this.meta.layouts[l]={ ...this.meta.layouts[l] , ...lyt_in }            
            }
            
        }

        return { nodes:diff_nodes , links: diff_links }
        var object_emitter = '';
        // AFTER MERGE DISPATCH  
        //this.dispatchEvent( new CustomEvent('freshDataEvent', { detail: {model:this } } ) )  
        // in future this dispatch can be batched with timeout 

    }    
    
    // THIS SHOULD MERGE FOREIGN SCHEMAS AND NORMALIZE ALL NODES AND LINKS TO SLOTS 
    mergeMapOg( map_in={ nodes:[] , links:[] , meta:{origin:'general' , foreign_id_name:'elementId'} }  ){
        console.log( 'scanning incoming n');
        var foreign_id_name = map_in.meta.foreign_id; 
        var foreign_a_name = map_in.meta.foreign_a;
        var foreign_b_name = map_in.meta.foreign_b;

        // RUN THROUGH INCOMINB NODES AND CHECK IF EACH INCOMIN 
        // FOREIGN_ID ALREADY EXISTS IN SLOT 
        // USE EXISTING SLOT IF ALREADY LOADED INSERT IF NOT 
        for( var i in map_in.nodes )
        {
            var n = map_in.nodes[i];
            var foreign_id = n[foreign_id_name];
            var existing_object = this.getNodeByForeignId( foreign_id_name , foreign_id );
            
            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_node = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    payload:n }
                this.nodes.set( new_slot , new_node );
                existing_object = this.nodes.get( new_slot );
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.node_foreign_to_slot[ foreign_id ]= existing_object.slot;
        }

        // SCAN INCOMING RELATIONSHIPS AND MAP INCOMING FOREIGN_IDS TO EXISTING SLOTS 
        // THEN MAP 
        for( var i in map_in.links ){

            var l = map_in.links[i];
            var foreign_id = l[foreign_id_name];
            var existing_object = this.getLinkByForeignId( foreign_id_name , foreign_id );

            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_link = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    slota:this.node_foreign_to_slot[ l[foreign_a_name] ],
                    slotb:this.node_foreign_to_slot[ l[foreign_b_name] ],
                    payload:l 
                } 
                this.links.set( new_slot , new_link );
                existing_object = this.links.get( new_slot );
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.link_foreign_to_slot[ foreign_id ]= existing_object.slot;    
        }

        // MERGE LAYOUTS:
        if( 'layouts' in map_in.meta ){
            
            // GO THROUGH EVERY INCOMING LAYOUT 
            for( var l in map_in.meta.layouts ){
                var lyt_in = map_in.meta.layouts[l];

                // CONVERT FOREIGN IDS TO SLOTS 
                // var remapped_layout_in = {}
                // for( var nd in lyt_in ){    
                //     if(  this.node_foreign_to_slot[ nd ]   ){
                //         remapped_layout_in[ this.node_foreign_to_slot[ nd ] ]=lyt_in[ nd ];
                //     } 
                // }  
                
                // MERGE
                if( ! this.meta.layouts[l] ) this.meta.layouts[l]={};
                this.meta.layouts[l]={ ...this.meta.layouts[l] , ...lyt_in }            
            }
            
        }

        var object_emitter = '';
        // AFTER MERGE DISPATCH  
        //this.dispatchEvent( new CustomEvent('freshDataEvent', { detail: {model:this } } ) )  
        // in future this dispatch can be batched with timeout 

    }    

    // THIS SHOULD MERGE FOREIGN SCHEMAS AND NORMALIZE ALL NODES AND LINKS TO SLOTS 
    transformMap( map_in={ nodes:[] , links:[] , meta:{origin:'general' , foreign_id_name:'elementId'} }  ){
        console.log( 'scanning incoming n');
        var foreign_id_name = map_in.meta.foreign_id; 
        var foreign_a_name = map_in.meta.foreign_a;
        var foreign_b_name = map_in.meta.foreign_b;

        var diff_nodes={}
        var diff_links={}
        var diff_meta={}
        
        // RUN THROUGH INCOMINB NODES AND CHECK IF EACH INCOMIN 
        // FOREIGN_ID ALREADY EXISTS IN SLOT 
        // USE EXISTING SLOT IF ALREADY LOADED INSERT IF NOT 
        for( var i in map_in.nodes )
        {
            var n = map_in.nodes[i];
            var foreign_id = n[foreign_id_name];
            var existing_object = this.getNodeByForeignId( foreign_id_name , foreign_id );
            
            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_node = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    payload:n }
                diff_nodes[new_slot] = new_node;
                existing_object = diff_nodes[new_slot];
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.node_foreign_to_slot[ foreign_id ]= existing_object.slot;
        }

        // SCAN INCOMING RELATIONSHIPS AND MAP 
        // INCOMING FOREIGN_IDS TO EXISTING SLOTS 
        // THEN MAP 
        for( var i in map_in.links ){

            var l = map_in.links[i];
            var foreign_id = l[foreign_id_name];
            var existing_object = this.getLinkByForeignId( foreign_id_name , foreign_id );

            if( ! existing_object ){
                var new_slot = ids.uuidv4();
                var new_link = { 
                    origin:map_in.meta.origin , 
                    slot:new_slot , 
                    //uuid:new_slot ,
                    slota:this.node_foreign_to_slot[ l[foreign_a_name] ],
                    slotb:this.node_foreign_to_slot[ l[foreign_b_name] ],
                    payload:l 
                } 
                diff_links[ new_slot ]= new_link;
                existing_object = diff_links[ new_slot ];
            }
            //console.log(' scanning incoming nodes: ', foreign_id_name , foreign_id , existing_object.slot );
            this.link_foreign_to_slot[ foreign_id ]= existing_object.slot;    
        }

        // MERGE LAYOUTS:
        if( 'layouts' in map_in.meta ){
            
            // GO THROUGH EVERY INCOMING LAYOUT 
            for( var l in map_in.meta.layouts ){
                var lyt_in = map_in.meta.layouts[l];

                // CONVERT FOREIGN IDS TO SLOTS 
                // var remapped_layout_in = {}
                // for( var nd in lyt_in ){    
                //     if(  this.node_foreign_to_slot[ nd ]   ){
                //         remapped_layout_in[ this.node_foreign_to_slot[ nd ] ]=lyt_in[ nd ];
                //     } 
                // }  
                
                // MERGE
                if( ! this.meta.layouts[l] ) this.meta.layouts[l]={};
                this.meta.layouts[l]={ ...this.meta.layouts[l] , ...lyt_in }            
            }
            
        }

        var object_emitter = '';
        // AFTER MERGE DISPATCH  
        //this.dispatchEvent( new CustomEvent('freshDataEvent', { detail: {model:this } } ) )  
        // in future this dispatch can be batched with timeout 

        return { nodes:diff_nodes , links:diff_links }

    }       

    getMap(){
        // map slot to uuid 
        
        return {
            meta: { origin:'int' , name:'merged' , layouts:this.meta.layouts },
            nodes: Object.fromEntries(  this.nodes.entries() ),
            links: Object.fromEntries(  this.links.entries() )
        }
    }
    getNode( slot ){
        return this.nodes.get( slot );
    } 


        
    // AUTO CREATE 
    getOrCreateNodeByForeignKey( foreign_name_in , id_in , obj ){

        
        var existingNode = this.getNodeByForeignKey( foreign_name_in , id_in )
        if( existingNode ){

            existingNode.payload = { ...existingNode.payload , ...obj };    
        }else{

            existingNode = this.extractNodeNeo( obj ) 
        }
        this.nodes.set( existingNode.slot , existingNode );
        this.node_foreign_to_slot[ existingNode.payload[ foreign_name_in] ]= existingNode.slot; 
        return existingNode; 
    }

    getOrCreateLinkByForeignKey( foreign_name_in , id_in , obj ){

        var existingLink = this.getLinkByForeignKey( foreign_name_in , id_in )
        if( existingLink ){

            existingLink.payload = obj;    
        }else{

            existingLink = this.extractLinkNeo( obj );
        }
        this.links.set( [existingLink.slota,existingLink.slotb] , existingLink )
        return existingLink;

    }
    
    // FIND NODE BY KEY
    getNodeByForeignKey( foreign_name_in ,id_in ){
        var existing = false;
        for( var [k,n] of this.nodes ){
            if ( n.payload && n.payload[ foreign_name_in ] == id_in ){
                existing = n;
                break;
            }else{
                var f=0;
            }
        }
        return existing; 
    }


    // FIND FOREIGN LINK 
    getLinkByForeignKey( foreign_name_in ,id_in ){
        var existing = false;
        for( var [k,n] of this.links ){
            if ( n.payload[ foreign_name_in ] == id_in ){
                existing = n;
                break;
            }else{
                var f=0;
            }
        }
        return existing; 
    }    

    getLinkByForeignKeys( foreign_name_in , id1 , id2 ){
        var existing = false;
        var slota = this.node_foreign_to_slot[ id1 ]; 
        var slotb = this.node_foreign_to_slot[ id2 ]; 
        var link = this.links.get( [slota,slotb] )
        
        if( link ){
            existing = link;
        }else{
            var f=0;
        }
        
        return existing; 
    }    
        

    // SHOW ALL MAPPINGS 
    printInventory(){
        console.log('MATRIX: \n')
        console.log('NODES: ')
        for( var [k,o] of this.nodes ){
            
            //console.log( o.slot.slice(0,12),' @ ', o.origin.slice(0,3) ,' :  (','o.payload',')')
        }
        console.log('LINKS: ')
        for( var [k,o] of this.links ){
            
            //console.log( o.slot.slice(0,12),' @ ', o.origin.slice(0,3) ,' :   (',o.slota.slice(0,6) ,')---(', o.slotb.slice(0,6),')' )
        }        
    }

    
}

export { OriginMatrix }




        
        ////// EXAMPS 
        // this.nodes.set( '0x2av8a8v00711', {
        //         origin:'int',
        //         slot:'0x2av8a8v00711',
        //         payload:{
        //             id:'2323',
        //             name:'fsfjd'
        //         }
        //     });
        // this.nodes.set('0x1a2b3c4d5f0a3d',{
        //         origin:'int',
        //         slot:'0x1a2b3c4d5f0a3d',
        //         payload:{
        //             elementId:'0x1a2b3c4d5f0a3d',
        //             id:'1112323',
        //             name:'a3b3c2e5',
        //             a:'uuid-v3-'
        //         }
        //     });      


        

        // SHOULD THIS BE IN META ? 
        // this.identity_router = {
        //     neo:{
        //         foreign_id:'elementId'
        //     },
        //     internal:{
        //         foreign_id:'uuid'
        //     }
        // }
        //         this.origins = {
        //     'neo':'https' 
        // }










    // wrapMergeNode( obj , origin='internal' , uuid= ids.uuidv4() ){
    //     if( ! uuid ){ }
        

    //     // find  origin  e.g.  NEO /  Keycache  / Local / Created 
        
    //     var n = this.nodes;

    // }





    // addOrigin( obj ){

    // }

    // wrapMergeNodes( nodes , origin='general' , id_key = false ){
    //     for( var n of nodes ){
    //         var origin_id = n[ id_key ]; // extrinsic 
    //         //var origin_id = ids.uuidv4;    // intrinsic 
    //         this.nodes.push( { origin , uuid:origin_id , payload:n } )
    //     }
    // }

        
        //var nodes = map.nodes;
        //var links = map.links; 
        //var meta = map.meta; 
        // finds existing nodes by their internal primary mapping 
        // then it uses existing UUID 
        //for( var n of map.nodes ){
            // var origin_id = n[ id_key ]; // extrinsic 
            //var origin_id = ids.uuidv4();    // intrinsic 
            //this.nodes.push( { origin , uuid:origin_id , payload:n } )
        //}