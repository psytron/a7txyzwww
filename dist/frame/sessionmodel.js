import KeyCache from './../keycache/keycache.js';
import { platform } from './../util/platform.js';
import validator from '../util/validator.js';
import * as ids from '../util/ids.js';
import gluemapper from '../util/gluemapper.js'
import fabric from '../fabric/fabric.js'
import { OriginMatrix } from './originmatrix.js'
import * as convert from '../util/convert.js'
import createGraph from '../web_modules/ngraph.graph.js'    
import { sleep } from './../util/sleep.js'


class SessionModel extends EventTarget {

    constructor( initObj ){
        super();

        
        // SESSION
        this.session = {
            state:0 ,
            state_change:'start',
            selected_object:false,
            navstate:{},
            genesis_object:{},
            display:'',
            file:0,
            urlks:{}, 
            panels_open:false
        }

        
        // KEYCACHE
        this.keycache = new KeyCache({});
        this.keycache.set_imkey( 'blank' , 'blank' );

        // ORIGIN MATRIX
        this.matrix = new OriginMatrix({});
        this.matrix.addEventListener( 'freshDiffEvent' , function(e){ 
            
            console.log('fresh  *  *  * ')
            this.dispatchEvent( new CustomEvent('freshDataEvent' , { detail:e.detail } ) );
        
        }.bind(this));

        this.sessiongraph = createGraph();

        // FABRIC
        fabric.init( { creds:this.keycache });
        fabric.addEventListener( 'fabricEvent' , this.onFabricEvent.bind(this) )
        this.fabric = fabric;

    }

    async onFreshDataEvent( e ){
        console.log('  matrix fires on fresh data  ')
    }
    async evaluateSessionStatus(){


        // CHECK FRAGMENT 
        var lochash = window.location.hash.substr(1);
        if( lochash ) {

                // INDIVIDUAL VARIABLES 
                var urlks = {}
                var q = lochash.split('&');
                for(var i = 0; i < q.length; i++) {
                    var kv = q[i].split('=');
                    this.session.urlks[ kv[0] ] = kv[1];
                }
        };

                

        var session_stub = this.getLocal('loc');

        var vfound = await this.keycache.discoverVaults()

        if( vfound.length == 0 && platform.isElectron()  ){ // platform.domain() == 'localhost'

            this.session.state=2;
            this.dispatchEvent( new CustomEvent('sessionEvent', { detail: {model:this } } ) )  

        }else if( 'domain' in session_stub  ){

            this.loginVault( session_stub );
            //this.session = session};
            //this.dispatchEvent( new CustomEvent('sessionEvent', { detail: {model:this } } ) )        
        }
        else{

            this.dispatchEvent( new CustomEvent('sessionEvent', { detail: {model:this} } ) )    
            var index_stub = 'uix/index_dyn.html';
            var g = 3;
            var sel_obj={  type:'x' , fragment:index_stub , model:this }
            this.dispatchEvent( new CustomEvent('navEvent' , { detail:sel_obj } ) )
        }        
        


        // HASH URL OPS IF NOT EMPTY: 
        if( lochash != '' ){
            
            // INDIVIDUAL VARIABLES 
            var urlks = {}
            var q = lochash.split('&');
            for(var i = 0; i < q.length; i++) {
                var kv = q[i].split('=');
                this.session.urlks[ kv[0] ] = kv[1];
            }

            var urlks = this.session.urlks;

            // U domain + pw EXISTS ENTER valult : 
            if( 'u' in urlks){
                this.loginVault( {domain: urlks.u, pw:urlks.u, fn: 'login_vault', action: 'login_vault'} )
            }

            // PATH EXISTS TRY FILE OR VAULT LOAD 
            if( 'p' in urlks ){
                //await sleep(100);
                
                // check if path has '/'
                if( urlks.p.includes('/') ){
                    this.pushNavState( {type:'map', fragment:urlks.p , title:'URLIN'} )        
                }else{
                    this.pushNavState( {fn: 'cred_launch', action: 'cred_launch', domain:urlks.p, uuid: urlks.p } )
                }
                
            }
            // BLOB 
            if( 'b' in urlks ){
                //await sleep(1000);
                fabric.mergeIntent( { module:'extractor',method:'downloadBlob' , url:urlks.b, uuid:urlks.b+'f132' } ); 
                //this.pushNavState( {fn: 'downloadBlob', action:  'downloadBlob',  } )
                
            }   

            // MAP ( may need login ,  so requested map should  update modeel )
            if( 'm' in urlks ){
                //await sleep(1500);
                

                var eventObj={}
                eventObj['uuid'] = urlks.m;   
                eventObj['requested_uuid'] = urlks.m;   
                eventObj['fn'] = 'cred_launch';
                
                this.pushNavState( eventObj  );
                
            }                   
            var l = 3;   
        }

        


        //this.dispatchEvent( new CustomEvent('logEvent', { detail:{ 'message':'KEY CA:  count: '+this.keycache.count()} }) )
    }
    
    pushNavState( obj ){
        
        this.session.navstate = obj;
        this.session.state_change = ( 'fn' in obj ) ? obj['fn'] : this.state_change;
        //this.session.state_change = ( 'action' in obj ) ? obj['action'] : this.state_change;
        this.session.selected_object=obj;
        obj['model']=this
        //if( this.session.state_change == undefined ){ return };
        
        switch( this.session.state_change ){
            case 'downloadBlob':

                // somehow pull JSON , then embed objects in keycache 
                // loop and then fire event to show populated collections 

                //fabric.mergeIntent( { module:'extractor',method:'downloadBlob' , url:obj.url } ); 
                break;            
            case 'import_demos':

                // somehow pull JSON , then embed objects in keycache 
                // loop and then fire event to show populated collections 
                 
                //fabric.mergeIntent( { module:'extractor',method:'rawMaps'} ); 
                fabric.mergeIntent( { module:'extractor',method:'features'} ); 
                // fabric.addEventListener( 'fabricEvent' , function(e){
                //     console.log('fabric event. ')
                // })
                break;
            case 'unlockimport_vault':
                var tt=0;
                this.model.keycache.importFileAndLogin( file , pw );
                break;
            case 'destroy':
            case 'selfdestruct':
                this.keycache.deleteBlob();
                break;
            case 'check_status':
                //this.keycache.save(); // b94f17e47b92382f8d70e71d363b615e@hous.craigslist.org //5bdopp
                obj['model']=this
                
                // HERE check first wave cookie  
                // reg pw ? 
                
                this.dispatchEvent(new CustomEvent('navEvent',{ detail:obj } ) ) 
            break;
            case 'save_items':
                this.keycache.save(); 
                obj['model']=this
                this.dispatchEvent(new CustomEvent('navEvent',{ detail:obj } ) ) 
            break;
            case 'cred_launch':
                obj['model']=this
                if('domain' in this.session.selected_object || 'uuid' in this.session.selected_object  ){
                    //var actobj = this.keycache.items[ this.session.selected_object.domain ]
                    
                    var kobj = this.keycache.keySelect('uuid', this.session.selected_object.uuid )[0]
                    if( ! kobj ) break;
                    
                    if( kobj.ty=='map' && 'nodes' in kobj.dat )
                    {   
                        if( 'meta' in kobj.dat ){ 
                            var n=987987;
                        }
                        kobj.dat.meta['origin']='int';
                        kobj.dat.meta['foreign_id']='uuid';
                        kobj.dat.meta['foreign_a']='a';
                        kobj.dat.meta['foreign_b']='b';
                        // this.matrix.mergeMap( actobj.dat );
                        this.matrix.incomingDiffFromKeyCache( kobj.dat );
                        
                        //this.matrix.printInventory();
                        //var map_out = this.matrix.getMap();
                        //this.session.selected_object['dat']=actobj.dat;
                        //this.session.selected_object['type']=this.session.selected_object.fn;
                        var o = 8;
                        this.dispatchEvent( new CustomEvent('freshDataEvent' , { detail:map_out } ) );
                    }

                    if( kobj.ty == 'key'){

                        // get funtion type from glue mapper ?
                        kobj.label= gluemapper.xclass_method_object( kobj.ty, 'launches', kobj );
                        var func_node={
                            origin:'wallet',
                            slot:ids.uuidv4(),
                            payload:kobj
                        }
                        
                        var wrapped = { nodes:[func_node] }
                        this.matrix.appendMap( wrapped );
                        var map_out = this.matrix.getMap();

                        var o = 8;
                        this.dispatchEvent( new CustomEvent('freshDataEvent' , { detail:map_out } ) ); 
                    }
                }
                break;                
            case 'cred_launch_og':
                obj['model']=this
                if('domain' in this.session.selected_object || 'uuid' in this.session.selected_object  ){
                    //var actobj = this.keycache.items[ this.session.selected_object.domain ]
                    var actobj = this.keycache.keySelect('uuid', this.session.selected_object.uuid )[0]
                    if( 'nodes' in actobj.dat )
                    {   /////////////
                        this.session.selected_object['dat']=actobj.dat;
                        this.session.selected_object['type']=this.session.selected_object.fn;
                        this.dispatchEvent( new CustomEvent('navEvent' , { detail:this.session.selected_object } ) );
                    }
                }
                break;
            case "cred_del":
                this.keycache.keyDelete( 'uuid' , this.session.selected_object.uuid );
                obj['model']=this
                this.dispatchEvent( new CustomEvent('navEvent' , { detail:this.session.selected_object } ) );
                break;
            case "create_map":
                // CLEAR PROCS CHAMP
                fabric.dropProcs();
                this.matrix.resetMap();
                obj['model']=this
                this.dispatchEvent( new CustomEvent('navEvent' , { detail:this.session.selected_object } ) );
                break;   
            case "export_backup":
                // ARCHIVE
                this.keycache.exportFile(); 
                //this.dispatchEvent\( new CustomEvent('navEvent' , { detail:this.session.selected_object } ) );
                break;     
            case "export_clear":
                // ARCHIVE
                this.keycache.exportClear(); 
                //this.dispatchEvent\( new CustomEvent('navEvent' , { detail:this.session.selected_object } ) );
                break;        
            case "createObject":

                this.matrix.spawnInsertObjectType( obj.type )
                //this.matrix.appendMap( { nodes:[final_obj] } )
                var d =3;

                break;
            case "keyImport":

                // should parse obj , 
                // find dat , 
                // and show unlock screen pointed at encrypted clyater
                //this.session.file = obj;
                this.dispatchEvent(new CustomEvent('navEvent',{ detail:obj } ) ) 
                var s =0;
                break;
            default:
                
                if( this.session.state == 1 ){
                    this.dispatchEvent(new CustomEvent('navEvent',{ detail:obj } ) )        
                }else{
                    this.dispatchEvent(new CustomEvent('navEvent',{ detail:obj } ) )
                }            
            break; 

        }

        switch( obj.type){

            case 'query' :

                //HERE DOES IT SELECT DOMAIN ?
                //are different search results for different urls ?
                // URL can BE encrypted blob 
                // URL Can be DB_query + DB_URL 
                
                console.log('qrx;')
                //this.dispatchEvent(new CustomEvent('navEvent',{ detail:{ reset:true } } ) )
                delete obj['model'];
                var intentObj = { brand:'neo', module:'neo',method:'process' , params:obj.item , uuid:'neowut' } 
                

                var o = this.keycache.mergeArtifacts( intentObj )
                
                fabric.mergeIntent( o ); 
                break;
            case 'linkadd':
                console.log('wut ')
                break;
        }
        

    }
    async pushMessage( obj ){
        
        // TODO: need another way that doesnt reject due to OR 
        // REJECT MESSAGES FROM OTHER PLUGINS 
        // if( !('fn' in obj) || !('method' in obj) ){ return; }
        
        
        if( obj.fn == 'savemap'){
            var wobj = {}
            wobj['dom']=obj.payload.meta.name;
            wobj['ty']='map';
            wobj['payload'] = obj.payload; //{ meta:obj.meta , nodes:obj.nodes , links:obj.links}

            // WRITES MAP TO ITEMS 
            //this.keycache.addItem( wobj )
            this.keycache.keyMerge('dom',obj.payload.meta.name, 
                                   { dom:obj.payload.meta.name ,
                                     dat:obj.payload,
                                      ty:'map' }   )

            // WRITES MAP TO JSON DEMOS 
            var jsonstring = JSON.stringify( obj.payload );
            

        }else if( obj.fn == 'spawn'){
            //var remove_merge_object = { ...obj , ...this.keycache.items[ obj.domain ]  }

            // WOWSERS DESIGN change 
            // YOU ARE HERE 
            // CAn we MERGE Credentials here more logically ? 
            //  { ...this.keycache.keySelect( 'dom' , obj.uuid )[0]  , ...obj } 
            // fabric.mergeIntent(  { ...this.keycache.keySelect( 'dom' , obj.uuid )[0]  , ...obj }  )
            
            fabric.mergeIntent( obj );     
        }else if( obj.method && obj.method == 'subgraph'){
            
            

            //var node = this.matrix.getNode( obj.slot);
            obj.identifier = obj.elementId;
            
            var intentObj = { brand:'neo', module:'neo',method:'process' , params:obj , data:obj.data } 
            
            var o = this.keycache.mergeArtifacts( intentObj )
            
            fabric.mergeIntent( o ); 

            var j= 8;
        }else if( obj.method && obj.method == 'mergeobject'){
            
            // find origin from object 

            //var node = this.matrix.getNode( obj.slot);
            //obj.identifier = node.payload.elementId;

            
            // IF ORIGIN == NEO 
            var intentObj = { 
                brand:'neo', 
                module:'neo',
                method:'process' , 
                params:{
                    object:obj.params.payload
                }
            } 
            
            var o = this.keycache.mergeArtifacts( intentObj )
            
            fabric.mergeIntent( o ); 

            var j = 8;
        }
        else if( obj.method && obj.method == 'mergelink'){
            
            // find origin from object 

            // var node = this.matrix.getNode( obj.slot);
            // obj.identifier = node.payload.elementId;

            // IF ORIGIN == NEO 


            var edge = this.matrix.transformEdgeToNeo( obj )
            var intentObj = { 
                brand:'neo', 
                module:'neo',
                method:'process' , 
                params:{
                    link:edge
                }
            }             
            // solve repeat artifacts 
            var o = this.keycache.mergeArtifacts( intentObj )
            fabric.mergeIntent( o ); 

            var j= 8;
        }            
        else{
            //var remove_merge_object = { ...obj , ...this.keycache.items[ obj.domain ]  }
            //fabric.mergeIntent( obj );            
        }

        var a = 1;
    }
    async sendOperation( obj ){
        
        // IN: module + method + payload 
        var sendcode = 0;

        switch( obj.method ){

            case 'login':
            case 'register':
                obj.pw = await this.keycache.digestMessage( obj.pw )
                break;
        }

        obj['uuid']='gen1'
        fabric.mergeIntent( obj )

    }
    togglePanels(){

        if( this.session.panels_open ){
            
            this.session.panels_open=false;
            
        }else{
            this.session.panels_open=true;
        }

        this.dispatchEvent(new CustomEvent('sessionEvent',{ detail: {model:this} } ) )            
    }

    /////AUTH
    setSession( objin){
        this.session = objin;
        this.dispatchEvent(new CustomEvent('sessionEvent',{ detail: {model:this} } ) )        
    }
    getProcs(){
        return fabric.getProcs();
    }    
    async intAuth( obj ){

        
        this.keycache.set_imkey( obj.un , obj.pw );

        //var resObj = await this.connector.postProc( obj )
        
        // re9aji 
        //const outboundObj = Object.assign( {}, resObj ,{ model:this } );
        //this.pushLocal( resObj )
        //this.setSession( resObj )
        //this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )
    }    
    async intReg( obj ){

        var intentObj={ ...obj , module:'generic'}
        intentObj['method']=obj.action;
        
        fabric.mergeIntent( intentObj ); 						

        // { 
        //     uuid:'0x0x0x',
        //     module:'generic',
        //     method:'reg',
        //     un:'x@gmail.com',
        //     ac:'x',
        //     pw:'x'
        // } 

    }
    async pushOp( obj ){

        var intentObj={ ...obj , module:'generic'}
        intentObj['method']=obj.action;
        
        fabric.mergeIntent( intentObj ); 						

        // { 
        //     uuid:'0x0x0x',
        //     module:'generic',
        //     method:'reg',
        //     un:'x@gmail.com',
        //     ac:'x',
        //     pw:'x'
        // } 

    }    
    async pushAuth( obj ){

        
        this.keycache.set_imkey( obj.un , obj.pw );

        var resObj = await this.connector.postProc( obj )
        
        // re9aji 
        const outboundObj = Object.assign( {}, resObj ,{ model:this } );
        this.pushLocal( resObj )
        this.setSession( resObj )
        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )
    }
    appendObject( o ){
        const outboundObj = Object.assign( {} ,{ model:this } );
        this.post_op = this.keycache.addItem( o )
        if( ! this.post_op ){
            outboundObj['message']='not saved: ';
        }
        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )              
    }
    
    //multiple creds 
    async pushNewCreds( objArr ){
        this.keycache.appendCollection( objArr )
    }
    async pushReg( obj ){
        
        obj.action = 'reg'
        var resObj = await this.connector.postProc( obj )
        const outboundObj = Object.assign( {}, resObj ,{ model:this } );

        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )  
    
    }
    async pushOpv1( obj ){
        
        var resObj = await this.connector.postProc( obj )
        //var resObj = await this.connector.proc( obj )
        const outboundObj = Object.assign( {}, resObj ,{ model:this } );
        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )  
    }    
    async exitVault( obj ){

        const outboundObj = Object.assign( {},{ model:this } )
        this.session.state=0;
        this.genesis_object={}
        this.keycache.exit
        localStorage.removeItem('loc');

        var selected_obj = { 'type':'map' , 'title':'NEW' , 'fragment':'blank'};
        
        //this.dispatchEvent\( event ) 
        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )         

        var selected_obj = { 'type':'map' , 'title':'NEW' , 'fragment':'blank'};
        var event = new CustomEvent('navRequestEvent', { detail:selected_obj , bubbles: true });
        this.dispatchEvent( event )

    }
    async loginVault( obj ){

        var logRes = '';
        var d = ( 'domain' in obj ) ? obj.domain : 'x'; 
        // encrypt and store creds 
        if( this.session.file && this.session.file.dat ){

            //var arbufdat = convert.str2ab( this.session.file.dat );
            var arbufdat = convert.base64ToArrayBuffer( this.session.file.dat );
            logRes=await this.keycache.loginAndLoad( d , obj.pw , arbufdat ); 
        }else{
            //this.pushLocal( 'loc', obj );
                   
            logRes=await this.keycache.loginAndLoad( d , obj.pw );
        }
        


        const outboundObj = Object.assign( {}, { res:logRes} ,{ model:this } )


        if( logRes ){
            
            this.session.message = 'success';
            this.session.tkn = 'success';
            this.session.state = 1,
            this.session.tkn= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNWRhYTI0NmI5N2NmNGIyMThkZTk4YmM0OWRjMDQ2NWIiLCJleHAiOjE2MzgwODAyNDd9.A32rX4DcTbxuPQ3Y3PPPI_jbGwyuMtFdiABza-ubF3I",
                
                // un: obj.domain            
                // = { 
                // state:1 ,
                // ip: "localstore",
                // lastlogin: "27-Nov-2021 (22:10:57)",
                // message: "Local Success",
                // state: 1,
                // tkn: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNWRhYTI0NmI5N2NmNGIyMThkZTk4YmM0OWRjMDQ2NWIiLCJleHAiOjE2MzgwODAyNDd9.A32rX4DcTbxuPQ3Y3PPPI_jbGwyuMtFdiABza-ubF3I",
                // un: obj.domain
            //};
            this.genesis_object = { domain:obj.domain , key:this.keycache.im_key }
            var selected_obj = { 'type':'map' , 'title':'NEW' , 'fragment':'blank'};
            var event = new CustomEvent('navRequestEvent', { detail:selected_obj , bubbles: true });
            this.dispatchEvent( event )
            this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )  

            if( 'm' in this.session.urlks  ){

                sleep(300)
                console.log( ' w ', 'requested_uuid' );
                var eventObj={}
                eventObj['uuid'] = this.session.urlks.m;   
                eventObj['requested_uuid'] = this.session.urlks.m;  
                eventObj['fn'] = 'cred_launch';
                this.pushNavState( eventObj  );                
            }
            
        }else{
            outboundObj.message = 'Incorrect Credentials';
            this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )  
        }
         
    }
    async newVault( obj ){

        var resObj ={ message:'phrase match' , state:0 }
        var report =  validator.inspect( obj );
        
        var avail = await this.keycache.available( obj.domain )

        if( report.error == 0 && avail ){
            
            // check if prev exists 
            this.keycache = new KeyCache({});
            this.session = { 
                state:1 ,
                ip: "localstore" ,
                lastlogin: "27-Nov-2021 (22:10:57)" ,
                message: "Local Success" ,
                state: 1 ,
                tkn: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNWRhYTI0NmI5N2NmNGIyMThkZTk4YmM0OWRjMDQ2NWIiLCJleHAiOjE2MzgwODAyNDd9.A32rX4DcTbxuPQ3Y3PPPI_jbGwyuMtFdiABza-ubF3I" ,
                un: obj.domain
            };
            await this.keycache.set_imkey( obj.domain , obj.passphrase1 );
            this.genesis_object = { domain:obj.domain , key:this.keycache.im_key }
            await this.keycache.save()

            var selected_obj = { 'type':'map' , 'title':'NEW' , 'fragment':'blank'};
            var event = new CustomEvent('navRequestEvent', { detail:selected_obj , bubbles: true });
            this.dispatchEvent( event )
        }
        
        if( avail == false ){
            report.message='Domain Already exists.'
        }
 
        const outboundObj = Object.assign( {}, report ,{ model:this } );
        this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:outboundObj } ) )  
            
    }
    resetAuth( obj ){
        //localStorage.clear();
        this.connector.logout().then( function( authObj ){
            this.setSession( {} )
        }.bind(this))
    }    
    onFabricEvent( e ){

        console.log(' fabric event reaches model: ' , e.detail );
        if( ('foreignMethod' in e.detail ) && (e.detail.foreignMethod =='rawMaps') ){
            for( var m in e.detail.payload ){
                console.log( m , e.detail.payload[m] )
                var mobj = e.detail.payload[m]
                mobj.dom = mobj.meta.name;
                mobj.ty = 'map'
                this.keycache.addItem( e.detail.payload[m] )
            }
        }

        switch( e.detail.module ){
                
            case 'generic':
                switch( e.detail.method ){
                    case 'register':
                    case 'reset':
                    case 'login':
                    case 'logout':
                        var response = {}
                        var okthen = 0
                        break;
                    case 'else':
                        break;
                }

                e.detail.model = this;
                this.dispatchEvent( new CustomEvent('sessionEvent',  { detail:e.detail } ) )              

                e.stopPropagation();
                break;
            case 'keycache':
                console.log(' kc.ogged ');
                e.stopPropagation();
                break;

            case 'neo':
                e.detail.model = this;
                e.stopPropagation();
                //this.dispatchEvent( new CustomEvent('navEvent' , { detail:e.detail } ) )
                //var map_out = t
                //this.matrix.incomingDiffFromNeo(  e.detail.payload  );
                this.matrix.incomingDiffFromNeo(  e.detail.payload  );
                //var map_out = this.matrix.getMap();

                //var o = 8;
                //this.dispatchEvent( new CustomEvent('freshDataEvent' , { detail:map_out } ) );                 
                break;

            case 'ccxt':

                break;
                
            case 'extractor':

                var d =5 ;
                switch( e.detail.method ){
                    case 'downloadBlob':
                        var blob = e.detail.payload;
                        this.session.file = blob[0];
                        this.pushNavState( { fn:'keyImport' }  )
                        //this.dispatchEvent(new CustomEvent('navEvent',{ detail:{fn:'keyImport', model:this } } ) )                         
                        break;
                    case 'features':

                        // here we insert geoJSON nodes 
                        var gjnds=2;
                        this.matrix.incomingDiffFromExtractor(  e.detail.payload  );
                        break;
                    case 'else':
                        break;
                }                
                // login and activate e.detail
                break;                
            
        }
        // WRITES MAP TO ITEMS 
        // this.keycache.addItem( wobj )
    }    
    scanServices(){
        service_mesh.scan() // returns  list of connection objects with drivers 
        
    }
    initStubs( e ){

        // THESE WILL EVENTUALLY LOAD BASED ON CONTEXT 
        //  So keycache get safe items 
        //  return list of functions 
        //  
        
        var walletstubs=[
            { 'type':'file' , 'title':'Render: retile_s' ,  'fragment':'miccco/vission', 'renderer':'./masonry/index.html' },
            { 'type':'connect' , 'title':'204.157.123.12' },
            { 'type':'connect' , 'title':'signalmesh.io' },
            { 'type':'bank' , 'title':'Wellsfargo' },
            { 'type':'bank' , 'title':'CHASE' },
            { 'type':'settings' , 'title':'Profile Settings' },
            { 'type':'coin' , 'title':'Litecoin LTC' },
            { 'type':'coin' , 'title':'Bitcoin BTC' },
            // here add to no4j 
            { 'type':'new' , 'title':'New Alias (V-Identity)', 'fragment':'Alias'   },
            { 'type':'new' , 'title':'GIT Repository'        , 'fragment':'Repo'    },
            { 'type':'new' , 'title':'Exchange',               'fragment':'Exchange'},
            { 'type':'new' , 'title':'New BTC Address'},
            { 'type':'new' , 'title':'New LTC Address'},
            { 'type':'map' , 'title':'ServerMap'     ,'fragment':'json/servermap.json'},
            { 'type':'command' , 'title':'hosts'},
            { 'type':'command' , 'title':'reset'},
            { 'type':'command' , 'title':'inventory'},
            { 'type':'command' , 'title':'inventory2'},
            { 'type':'command' , 'title':'keys'},
            { 'type':'command' , 'title':'logout'  , 'fragment':'jxtlogout'},
            { 'type':'command' , 'title':'authenticate' , 'fragment':'/loginjwt.html'},
            { 'type':'alias' , 'title':'micccco@gmail.com'},
            { 'type':'alias' , 'title':'BigHodler'},
            { 'type':'alias' , 'title':'PSYTRON'},       
            { 'type':'key' , 'title':'gdax'},
            { 'type':'key' , 'title':'bittrex'},
            { 'type':'key' , 'title':'coinbase'},
            { 'type':'key' , 'title':'localhost'},
            { 'type':'key' , 'title':'coinex (HK)'},
            { 'type':'key' , 'title':'okex (CN)'},        
            { 'type':'map' , 'title':'Bots and Banks' , 'fragment':'miccco/botsandbanks'},
            { 'type':'map' , 'title':'Poolside View' , 'fragment':'miccco/pools'},
            { 'type':'map' , 'title':'miccco/ShipItYo' , 'fragment':'miccco/shipityo'},
            { 'type':'map' , 'title':'miccco/Vission' ,  'fragment':'miccco/vission'},
            { 'type':'map' , 'title':'miccco/parimutuel', 'fragment':'miccco/parimutuel'},
            { 'type':'map' , 'title':'miccco/global', 'fragment':'miccco/global'},
            /*{ 'type':'map' , 'title':'miccco/People' , 'fragment':'miccco/people'},*/
            { 'type':'map' , 'title':'miccco/Pharmacology' , 'fragment':'miccco/pharma'},        
            { 'type':'substance' , 'title':'Probenesid' , 'fragment':'probenesid'},        
            { 'type':'substance' , 'title':'Codeine' , 'fragment':'probenesid'},        
            { 'type':'substance' , 'title':'Ketoconazol' , 'fragment':'probenesid'},        
            { 'type':'substance' , 'title':'Penecillin G' , 'fragment':'probenesid'},        
            { 'type':'substance' , 'title':'Ritonair' , 'fragment':'probenesid'},        
            { 'type':'map' , 'title':'NEW' , 'fragment':'blank' , 'fn':'create_map'}, // was 'blank' this actuall loaded blank.json ? 
            { 'type':'map' , 'title':'System Dependency Graph'},
            { 'type':'map' , 'title':'Correlation strength each LINK'},
            { 'type':'map' , 'title':'Blocks and Miners, '},
            { 'type':'query' , 'title':'All' ,               'fragment':'(x)-[r]-(y)'},
            { 'type':'query' , 'title':'A-stars' ,    'fragment':'(:Star)-[:SHINES]-(:Star)'},
            { 'type':'query' , title:'A-moves' ,        item:{'fragment':'(:Person)--()'}         },    
            { 'type':'query' , title:'A-Movie-Person' ,    item:{'pattern':'(:Movie)--(:Person)'}  },     
            { 'type':'query' , title:'ALLV2' ,    item:{'pattern':'(x)--(y)'}  },                 
            { 'type':'query' , title:'A-Related:Branch:6fb:1746' ,  item:{ 'identifier':'4:f1731dc5-74ac-401d-9312-d6481729f6fb:1746'} },     
            { 'type':'query' , title:'A-Related:Branch:6fb:37' ,  item:{ 'identifier':'4:f1731dc5-74ac-401d-9312-d6481729f6fb:6'} },                 
            { 'type':'query' , title:'Alias:f1731' ,             item:{ 'identifier':'4:f1731dc5-74ac-401d-9312-d6481729f6fb:33892'} },     
            { 'type':'query' , title:'Ocean' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:256'} },
            { 'type':'query' , title:'T64 ' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:248'} },
            { 'type':'query' , title:'NEO Home (db) ' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:241'} },
            { 'type':'query' , title:'Al Co. ' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:233'} },
            { 'type':'query' , title:'Exce. ' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:233'} },
            { 'type':'query' , title:'Alter Corp. 4:4f968e5' ,       item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:225'} },
            { 'type':'query' , title:'Bot 4:4f968e5a' ,         item:{ 'identifier':'4:4f968e5a-fb91-456b-8a18-18c1cf301f88:212'} },                             
            //{ 'type':'query' , 'title':'west_coast_connect' ,'fragme-[r0:TRANSFERS|:CONVERTS]-(x1:Vehicle)return x0,r0,x1'},
            { 'type':'query' , 'title':'conversion_only' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Vehicle)-[r0:CONVERTS]-(x1:Vehicle)return x0,r0,x1'},
            { 'type':'query' , 'title':'Apps per Domain' ,  'fragment':'/mapqrx?qrx=MATCH(x0:App)-[r0]-(x1:Domain)return x0,r0,x1'},
            { 'type':'query' , 'title':'(x)-[r]-(x1)' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Vehicle)-[r0]-(x1)return x0,r0,x1'},
            { 'type':'map' , 'title':'Single Frag' ,  'fragment':'/mapqrx?qrx=MATCH(x0:App)return x0'},
            { 'type':'query' , 'title':'Actor Company' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Actor)-[r0]-(x1:)return x0,r0,x1'},
            { 'type':'query' , 'title':'assets_world' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Asset)-[r0]-(x1:Asset)return x0,r0,x1'},
            { 'type':'map' , 'title':'qrx=MATCH(x0:User)return' ,  '/mapqrx?fragment':'qrx=MATCH(x0:User)return x0'},
            { 'type':'map' , 'title':'MATCH( x0:Actor )return x0' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Actor)-[r0]-(x1)-[r1]-(x2)return x0'},
            { 'type':'map' , 'title':'MATCH( x0:Block )return x0' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Block)return x0'},
            { 'type':'map' , 'title':'MATCH( x0:User )-( x1:World)' ,  'fragment':'/mapqrx?qrx=MATCH( x0:User)-[r0:HAS]-( x1:World) return x0,r0,x1'},
            { 'type':'map' , 'title':'MATCH( x0:World )-[r0:HAS]' ,  'fragment':'/mapqrx?qrx=MATCH(x0:World)-[r0]-(x1:User)-[r1]-(x2:Credential)return x0,r0,x1,r1,x2'},
            { 'type':'map' , 'title':'Project: Xynthx (GIT)' ,  'fragment':'/mapqrx?qrx=MATCH(x0:Project)-[r0]-(x1:Repo)-[r1]-(x2:Alias)return x0,r0,x1,r1,x2'},
            { 'type':'contract' , 'title':'Balancer V2',  'fragment':'la'},
            { 'type':'contract' , 'title':'Uniswap',  'fragment':'lo'}
        
        ] 
        var techtags =[ 
            { 'type':'python',     'fun':'add',  'title':'Python',   'fragment':'qrx=MATCH(x0:Project)-[r0]-(x1:Repo)-[r1]-(x2:Alias)return x0,r0,x1,r1,x2'},        
            { 'type':'python',     'fun':'add',  'title':'Tensorflow'   },        
            { 'type':'go',         'fun':'add',  'title':'Go'           },        
            { 'type':'neo4j',      'fun':'add',  'title':'NEO4J'        },        
            { 'type':'mysql',      'fun':'add',  'title':'MySQL'        },        
            { 'type':'postgresql', 'fun':'add',  'title':'PostgreSQL'   },        
            { 'type':'react',      'fun':'add',  'title':'React'        },        
            { 'type':'spark' ,     'fun':'add',  'title':'Spark'        },        
            { 'type':'docker' ,    'fun':'add',  'title':'Docker'       },        
            { 'type':'kubernetes', 'fun':'add',  'title':'Kubernetes'   } ]
        var allstubs = [ ...walletstubs, ...techtags ]
        //searchmod.initStubs( allstubs )
        this.dispatchEvent( new CustomEvent('initEvent', { detail: {model:this, stubs:allstubs} } ) )        
    }

    //// LOCAL STORAGE 
    getLocal( dom ){
        var item =  localStorage.getItem( dom );
        if( item ){
            var obj= JSON.parse( item )
            return obj;
        }else{
            return {};
        }
    }
    pushLocal( dom , obj ){
        var item = this.getLocal()
        var newlocal = { ...item , ...obj }   
        localStorage.setItem( dom , JSON.stringify(obj) );
        return newlocal;
    }  
    onLogEvent(){
        console.log(' state model hears log event ',this)
    }

}
export default SessionModel










// function LocalStore(){
//     this.push=function( obj ){
//         console.log(' push localstore')
//     }
// }


            // FOLLOW UP CHECK HTTP AND INVALIDATE IF NECESSARY 
            //this.connector.checkstatus().then( function(resObj){
                //this.setState( resObj )
            //}.bind(this))


        // YOU ARE HERE :  DOES ALIAS WRAP CYTHON ? 
        // this.alias.authenticate() 
        // Alias checks current auth and loads inventory blob ? 
        // 
        // ALIAS_PROXY   , ALIAS_WRAPPER()
        // a = AliasProxy()
        // a.authenticate( obj ) 
        // now token is in Cython  AliasProxy falls back on localstore
        // 
        // a.search( string )

        // v = a.vehicle( 'domain' ,'symbol')
        // map_object.vehicles = v ;
        // map talks to vehicle / object inside the map through alias. 
        // YOU ARE HERE :  DOES ALIAS WRAP CYTHON ? 
        // this.alias.authenticate() 
        // Alias checks current auth and loads inventory blob ? 
        // ALIAS_PROXY   , ALIAS_WRAPPER()
        // a = AliasProxy()
        // a.authenticate( obj )  
        // now token is in Cython  AliasProxy falls back on localstore
        // a.search( string )
        // v = a.vehicle( 'domain' ,'symbol')
        // map_object.vehicles = v ;
        // map talks to vehicle / object inside the map through alias. 




        // (async () => {

        //     const exchanges = [
        //         'bittrex',
        //         'poloniex',
        //     ]
        
        //     const symbol = 'BTC/USDT'
        //     const tickers = {}
        
        //     await Promise.all (exchanges.map (exchangeId =>
        
        //         new Promise (async (resolve, reject) => {
        
        //             const exchange = new ccxt[exchangeId] ({ enableRateLimit: true })
        
        //             while (true) {
        
        //                 const ticker = await exchange.fetchTicker (symbol)
        //                 tickers[exchangeId] = ticker
        
        //                 Object.keys (tickers).map (exchangeId => {
        //                     const ticker = tickers[exchangeId]
        //                     console.log (ticker['datetime'], exchangeId, ticker['bid'], ticker['ask'])
        //                 })
        //             }
        
        //         })
        
        //     ))
        
        // })(); 






//                         case 'connectmeta':
                    
//                     // DETECT META 
//                     console.log(' connect meta attempt: ')
//                     if (window.ethereum) {
//                         window.web3 = new Web3(ethereum);
//                         try {
//                             ethereum.enable();
//                         } catch (err) {
//                             //$('#status').html('User denied account access', err)
//                             console.log(' MM: user denied acccount access ')
//                         }
//                     } else if (window.web3) {
//                         window.web3 = new Web3(web3.currentProvider)
//                         console.log(' MM: enabled: ')
//                     } else {
//                         console.log(' MM: None dtecte ')
//                         alert(' No Wallet Detected')
//                     }                

//                     // LAUNCH PMNT
//                     web3.eth.getAccounts().then( o =>{ 

//                         const accountx = o[0] 
//                         const paymentAddress = '0xBe7518241bd2025c2E14B76eCf643b8A71f710C8' // ccc CB in
//                         const amountEth = "0.001"
//                         web3.eth.sendTransaction({
//                             from: accountx,
//                             to: paymentAddress,
//                             value: web3.utils.toWei(amountEth, 'ether')
//                         }, (err, transactionId) => {
//                             if (err) {
//                                 console.log('Payment failed', err)
//                                 this.con.querySelector("#ethstatus").innerHTML='<span style="color:red;">PAYMENT FAIL</div>';

//                             } else {
//                                 console.log('Payment successful', transactionId)
//                                 this.con.querySelector("#ethstatus").innerHTML='<span style="color:green;">PAYMENT SUCCESS: '+transactionId+'</div>';
//                             }
//                         })    

//                     })
//                     break;


        
        /* migrated to Fabric: 
        // DETECT 
        if (typeof window.ethereum !== 'undefined') {
            this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'MM DETECT: YES'} }) )
        }
        // CCXT 
        if( window.ccxt ){
            var ccxt = window.ccxt;
            this.dispatchEvent( new CustomEvent('logEvent', { detail:{ 'message':'CFI XT: YES  count: '+ccxt.exchanges.length } }) )
        }        
        // ETHERS 
        if( window.ethers ){
            this.dispatchEvent( new CustomEvent('logEvent', { detail:{ 'message':'ETHRS: YES  ' } }) )
        }                
        // CHECK ELECtRON 
        if( platform.isElectron() ){
            this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'ELCTR: YES'} }) )   
        }
        */
        // ADD LOCAL CLUSTERS TO THE LIST 
        // CHECK AVAIL LISTS ON SERVER PER THIS KEY AND SIG 
        // LOAD PUBLIC STUBS FOR SEARCH 
        // CHECK for STUBS IN NEO4J 
        // var neoJS_fast_service = {}; 
        // crypto graphically 
        // CHECK FOR ELECTRON CONTEXT - TWO WAY CONNECT  
        // if( window && window.process && window.process.type ){
        //     const { ipcRenderer } = require('electron')
        //     console.log('electron detected required');
        //     var sync_response = ipcRenderer.sendSync('synchronous-message', 'ping');
        //     console.log(' sync response: ', sync_response) // prints "pong"
        //     ipcRenderer.on('asynchronous-reply', (event, arg) => { console.log(arg) })// prints "pong"
        //     ipcRenderer.send('asynchronous-message', 'ping')
        //     ipcRenderer.send('xovent', 'xo ping')   
        //     this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'ELC: YES'} }) )
        // }else{
        //     this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'ELC: N0'} }) )
        // };


// function validator() {

//     this.reflex = function( obi){
//         return 7;
//     }
    
//     this.inspect = function( obj ){
//         return 1;
//     }
// }


//

        // NEEDED THIS TO CALL addEventListener on model
        //this.addEventListener = this.addEventListener
        //this.removeEventListener = this.removeEventListener
        //this.dispatchEvent = this.dispatchEvent