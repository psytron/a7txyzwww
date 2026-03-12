 

// import ServicePool from './../frame/servicepool.js'
// import Alias from './../alias/alias.js'
import { sleep } from './../util/sleep.js'

class SessionController{
    // AGGREGATES APP INPUT
    
    constructor( obj ) {
        
        this.idt='basic0001'
        this.model = obj.model;
        this.connector = obj.connector;
        
        // CAVEMAN RESCOPE
        this.onLogEvent = this.onLogEvent.bind(this);
        this.onUiEvent = this.onUiEvent.bind(this);   
        this.onNavRequestEvent = this.onNavRequestEvent.bind(this);
        this.onFabricEvent = this.onFabricEvent.bind(this);
        this.onKeyImportEvent = this.onKeyImportEvent.bind(this);

        // TAB TITLE: 
        const getDomainName = () => {
            const url = window.location.hostname;
            const domainParts = url.split('.');
            if (domainParts.length > 2) {
                domainParts.shift(); // Remove subdomain if present
            }
            const domainName = domainParts[0];
            document.title = domainName.charAt(0).toUpperCase() + domainName.slice(1);
        };
        getDomainName();

        // omniGraph.load(  expected_context_nodes )
        // omni.load( users_nodes  )
        // omni.search(    ) returns nodes[] , links[]
        // contracts input output apps  ,  
        // exchanges input output apps
        // needs to check self credentials
        // omni get nodes 
        // this.alias = new Alias() // good bones 
        // var drivers_to_load = ['disk_authenticator' , 'network_authenticator' , 'extension_authenticator' , 'coinlock']
        // this.servicePool = new ServicePool( { drivers:drivers_to_load} )
    }

    async start(){
        // CHECK URL STATE PARSE: 
        this.model.evaluateSessionStatus()

        // searchmenu items
        this.model.initStubs()
    }
    
    // EVENTS X Y Z // 
    onMapMessage( e ){
        // fn = " "
        // domain.symbol.xclass 
        // PDR:   x.y.z.  
        console.log(' from map ',e.data )
        var obj = e.data ; 
        this.model.pushMessage( obj )
    }
    // USER INPUTS // 
    onUiEvent( e ){    
        
        var reqOp = e.detail.fn || e.detail.action || 'unknown';
        
        switch( reqOp ){
            case 'home':
                this.model.pushNavState( e.detail );
                break;
            case 'reset':
            case 'register':
            case 'login':
            case 'importComplete':
                //this.model.pushNavState( e.detail )
                this.model.pushMessage( e.detail )
                // here reset ui 
                break;
            case 'login':    
                this.model.sendOperation( e.detail )
                break;
                                
            case 'registerOG':
                this.model.pushReg( e.detail )
                break;
            
            case 'reset':
                this.model.pushOp( e.detail )
                break;
            
            case 'create_vault':
                this.model.newVault( e.detail )
                break;
            
            case 'login_vault':
                this.model.loginVault( e.detail )
                break;
            case 'unlockimport_vault':
                this.model.loginVault( e.detail )
                break;                
            
            case 'exit_vault':
                this.model.exitVault( e.detail )
                break;
            
            case 'appendObject':
                this.model.appendObject( e.detail )
                break;
            
            case 'keyImport':
            case 'save_items':
            case 'navState':
            case 'show_unlock':
            case 'show_cred':
            case 'show_procs':
            case 'check_status':
            case 'showcol_object':
            case 'showcol_device':                
            case 'showcol_key':
            case 'showcol_map':         
            case 'showcol_vault':                         
            case 'create_map':
            case 'export_backup': 
            case 'export_clear': 
            case 'cred_launch':
            case 'cred_del':
            case 'cred_merge':   
            case 'import_demos':                
            case 'create':
            case 'createObject':
            case 'destroy':    
            
                this.model.pushNavState( e.detail )
                break;
            case 'searchClick':
                console.log('  this model for session hears freesearch attempt  ')
                this.model.sendOperation( e.detail );
                break;
            case 'mapImport':
                this.model.pushMessage( e.detail )
                break;
            case 'burgerClick':
                
                // THIS NO LONGER NEEDS TO TOGGLE
                // NAVS AT THE HIGHEST LEVEL
                // BUT MAYBE LOGGING IT HERE WOULD BE USEFUL:
                //this.model.togglePanels();
                break;
            
            default:
                break;
        }

    }

    onUnlockImportEvent( e ){
        var tt  = 9;
    }
    onFabricEvent( e ){
        this.model.fabricEvent( e.detail );
    }
    onChildBoot( e ){
        console.log(' -> ))) Session controller parent received message!:  ',e.data);
    }
    onLogEvent( e ){
        //console.log(' controller input:  ',this)
    }        
    // SHOULD ALSO MOVE TO UI
    onNavRequestEvent( e ){
        var obj = e.detail;
        this.model.pushNavState( e.detail )
    }
    onKeyImportEvent( e ){
        var i=4;
        // was keyImport 
    }

}
export default SessionController