import { gsap , Expo } from '../web_modules/gsap.js'
import { platform } from "../util/platform.js"
//import { factory2d } from '../../x_modules/factory/factory2d.js';
import VanillaQR from "../web_modules/vanillaqr.js"
import YAML from '../web_modules/yaml.js'
import { Kvs } from '../x_modules/apps/kvs/kvs.js'

class QNav{
    constructor() {
        this.con={};
        this.drawer_open = 0;
        this.drawer = 0
        const title = this.title;               
        
        // plain screen asks 
        // local or cloud  
        // vault    vault  
        // each option has explanation bubble )
        // if local vault is detected its listed above as cube to select later 
        this.onSessionEvent = this.onSessionEvent.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind( this )
        this.onNavEvent = this.onNavEvent.bind( this )
        this.onAnyClickEvent = this.onAnyClickEvent.bind(this)   
        this.render();     
    }

    
    render() {
        this.con=document.createElement('div');
        this.con.setAttribute("id", "qnav_con");
        document.body.appendChild( this.con );
        this.con.innerHTML = `
            <script src='js/TweenMax.min.js'></script>
            <base href="/uix/">
            <style>
                .xnavicon {
                    font-size:30px;
                    position: absolute;
                    font-family: 'Roboto Condensed', sans-serif;
                    cursor: pointer;
                    top:0;
                    right:0;
                    padding:15px;
                    margin-top:-3px;
                    -webkit-user-select: none; /* Safari */        
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* IE10+/Edge */
                    user-select: none; /* Standard */
                    color: #EEEEEE;
                }
                .xnavitem{
                    margin:10px;
                    color:white;
                    font-weight:bold;
                    font-family: 'Roboto Condensed', sans-serif;
                    cursor:pointer;
                }   
                .frmlabel{
                    color:#FFFFFF;
                    font-size:11px;
                } 
                .logerout{
                    
                    text-align:center; 
                    margin-bottom:5px;
                    font-size:11px;
                }
                #slide_drawer2{
                    position:absolute; 
                    top:0px; width:300px; height:100%; right:-400px; 
    
                    pointer-events: auto;
                }
                .slide_container{
                    width:300px; 
                    height:400px; 
                    position:fixed; 
                    top:0px; 
                    right:0px; 
                    overlay:hidden; 
                    pointer-events: none;
                }

            </style>

            <div id="slide_container" class="slide_container" style="">
                <div id="slide_drawer2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="310" height="440" style="position:absolute; overflow:hidden; z-index: -1;">                        
                        <polygon 
                            id="jagged" 
                            fill="#000000CC"
                            stroke="#555555"
                            stroke-width="0.3"
                            points="0,4 , 4,0  ,  310,0  ,  310,520  ,  20,520  ,  0,500" 
                            style="vector-effect:non-scaling-stroke; background-color:#440000;"/>
                    </svg>
                    
                    <div class="form-group" style="cursor:pointer; position:relative; margin:10px; height:50px; " fn="check_status">
                        <style >
                            .minilogg0{
                                font-size:7px;
                                color:white;
                            }
                        </style>
                        <div class="form-groupXL" style="position:absolute; border:solid blue 1px;" incomponent="true">
                            <!--<input id="searchbox" type="text" class="form-control input-lg" autocomplete="off" spellcheck="false" incomponent="true">-->
                            <!--<img class="spin" src="/img/spinoff.png">-->
                            <!--<img class="spin active" src="/img/spinner.gif" incomponent="true">-->
                        </div>
                        <div class="form-groupXL" style="position:absolute; margin-left:42px; margin-top:4px;" incomponent="true">
                            <div class='minilogg0' style='color:gray;'>Session Alias:</div>
                            <div class='minilogg0'  id='ip' class='minilogg'>VAULT ACTIVE</div>
                            <div class='minilogg0' id='lastlogin' class='minilogg'>LOG STATUS</div>      
                        </div>                        
                        <img id="qnavlogo" src="img/ethmap.io.png" style="position:absolute; width:32px; height:32px; margin-left:4px; margin-top:4px;" fn="check_status"/>
                       
                    </div>      
                                   
                    <div id='displaystage' style="margin:14px;">
                        <!-- CURRENT Panel Goes Here --> 
                        <div>Local or Remote</div>
                    </div>
                </div>
            </div>
            <span class="xnavicon">&#9776;</span>`;

        this.con.addEventListener('click', this.onAnyClickEvent.bind(this) )        
        this.con.querySelector(".xnavicon").onclick = function(event) {

            this.toggleDrawer()
            
            var eventObj = { 'action':'burgerClick' }
            window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) );
        }.bind(this)

        // CHANGE LOGO 
        this.con.querySelector("#qnavlogo").src="img/"+platform.domain()+".png"
    }

    // CLICKS 
    onAnyClickEvent( e ){

        var nd = this.con.querySelector("#displaystage")
        
        if( 'fn' in e.target.attributes ){
            var fn = e.target.attributes['fn'].textContent;
            var tokens = fn.split('/')
            fn = tokens[0];
            var authEventObj={}
            var eventObj={ fn:fn , action:fn };
            switch( fn ){

                case 'create':
                    //console.log(' click create object '+tokens[2] )
                    eventObj['fn']='createObject'
                    eventObj['type']=tokens[2];
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) );                            
                    break;
                            
                case 'show_unlock':
                    eventObj['domain'] = e.target.querySelector("#domain").innerHTML;
                    eventObj['stamp'] = e.target.querySelector("#stamp").innerHTML;
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) );                            
                //  this.dispatchEvent( {  method:'userInput' , subject:{ uuid:7070707 , domain:"xyz"} }  })
                //  this.dispatchEvent( {  method:'userInput' , subject:{ uuid:7070707 , domain:"xyz"} }  })                
                    break;
                case 'show_file_unlock':
                    //eventObj['domain'] = e.target.querySelector("#domain").innerHTML;
                    //eventObj['stamp'] = e.target.querySelector("#stamp").innerHTML;
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) );                            
                //  this.dispatchEvent( {  method:'userInput' , subject:{ uuid:7070707 , domain:"xyz"} }  })
                //  this.dispatchEvent( {  method:'userInput' , subject:{ uuid:7070707 , domain:"xyz"} }  })                
                    break;                            

                case 'show_download_map':
                    this.clearContent();
                    this.updatePanel('downloadMapPanel' , {} )   
                    break;                               
                case 'show_create':
                    this.clearContent();
                    var vnode = factory2d.renderNodeSync( 'createPanel', { label:'TEST'} )
                    var vault_item = factory2d.renderNodeSync( 'vaultItemNew', { vaultname:'Vault1'} )
                    nd.appendChild(vault_item);  
                    nd.appendChild( vnode );   
                    break;   
                case 'cred_launch':
                case 'cred_del':
                case 'cred_merge':
                    var dom = e.target.closest('#credItem').getAttribute('dom');
                    var uuid = e.target.closest('#credItem').getAttribute('uuid');
                    eventObj['domain'] = dom;                    
                    eventObj['uuid'] = uuid;                    
                    eventObj['action'] = fn;
                    eventObj['fn'] = fn;
                    window.dispatchEvent( new CustomEvent('uiEvent', {detail:eventObj} ) )                                      
                    break;                    

                case "show_cred":
                    var holder = e.target.parentNode.querySelector("#holder");
                    if( holder.children.length > 0 ){
                        holder.innerHTML='';
                    }else{    
                        var dom = e.target.parentNode.querySelector("#f1").textContent;
                        //eventObj['domain']=dom;
                        eventObj['uuid'] = e.target.closest("#credItem").getAttribute("uuid")
                        window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )                          
                        /*
                        var kobj= { title:"wut" , meta:"zao" , nice:3 };
                        var dom = e.target.parentNode.querySelector("#f1").textContent;
                        var holder = e.target.parentNode.querySelector("#holder");
                        holder.innerHTML="";//empty holder 
                        this.kvs = new Kvs( { container:holder , data:kobj  }  )
                        this.kvs.addEventListener( 'kvInputEvent' , function(e){
                            console.log(' QR hears kvInputEvent ')
                            this.model.updateObject( this.uuid , e.detail  )
                        }.bind(this));
                        */
                    }
                    break;  

                case 'create_vault':
                    console.log(' logout in QNav ')
                    var eventObj={};
                    eventObj['action'] = fn;
                    eventObj['domain'] = this.con.querySelector("#domain").value;
                    eventObj['passphrase1'] = this.con.querySelector("#passphrase1").value;
                    eventObj['passphrase2'] = this.con.querySelector("#passphrase2").value;
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )                    
                    break;
                case 'register':
                    authEventObj['un'] = this.con.querySelector("#un").value;
                    authEventObj['ac'] = this.con.querySelector("#ac").value;
                    authEventObj['pw'] = this.con.querySelector("#pw1").value;
                    authEventObj['pw2'] = this.con.querySelector("#pw1").value;
                    authEventObj['fn'] = e.target.attributes['fn'].textContent
                    authEventObj['action'] = fn
                    authEventObj['module'] = 'generic'
                    authEventObj['method'] = fn
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;                    
                case 'reset':
                    authEventObj['un'] = this.con.querySelector("#username").value;
                    authEventObj['fn'] = e.target.attributes['fn'].textContent
                    authEventObj['action'] = fn
                    authEventObj['method'] = fn
                    authEventObj['module'] = 'generic'
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;     
                case 'logout':
                    console.log(' logout in QNav ')
                    authEventObj['action'] = fn
                    authEventObj['module'] = 'generic'
                    authEventObj['method'] = 'generic'
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;                    

                case 'login':
                    authEventObj['un'] = this.con.querySelector("#username").value;
                    authEventObj['pw'] = this.con.querySelector("#password").value;
                    authEventObj['fn'] = e.target.attributes['fn'].textContent
                    authEventObj['action'] = fn
                    authEventObj['method'] = fn
                    authEventObj['module'] = 'generic'
                            
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;

                case 'login_vault':
                    authEventObj['domain'] = this.con.querySelector("#domain").innerHTML;
                    authEventObj['pw'] = this.con.querySelector("#password").value;
                    authEventObj['fn'] = e.target.attributes['fn'].textContent
                    authEventObj['action'] = fn
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;

                case 'unlockimport_vault':
                    //authEventObj['domain'] = this.con.querySelector("#domain").innerHTML;
                    authEventObj['pw'] = this.con.querySelector("#password").value;
                    //authEventObj['fn'] = e.target.attributes['fn'].textContent
                    authEventObj['action'] = fn
                    authEventObj['raw'] = this.raw_import
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;

                                  
                case 'appendObject':                
                    authEventObj['dom'] = this.con.querySelector("#dom").value;
                    authEventObj['ke'] = this.con.querySelector("#ke").value;
                    authEventObj['se'] = this.con.querySelector("#se").value;
                    authEventObj['fn'] = e.target.attributes['fn'].textContent;
                    authEventObj['action'] = fn;

                            if( this.con.querySelector("#url").value )
                            {
                                authEventObj['url'] =this.con.querySelector("#url").value;
                            }
                            
                    authEventObj['ty'] = this.con.querySelector("#ty").value;
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:authEventObj }) )                    
                    break;                                                        
                case 'show_settings':
                    this.updatePanel('settingsPanel' , {} )
                    break;                             
                case 'show_reg':
                    this.updatePanel('registerPanel' , {} )                 
                    break;               
                case 'show_elements':
                    this.updatePanel('elementsPanel' , {} )                 
                    break;                                           
                case 'show_login':
                    this.updatePanel('loginPanel' , {} )                 
                    break;       
                case 'show_reset':
                    this.updatePanel('resetPanel' , {} )                 
                    break;    
                case 'show_add':
                    this.updatePanel('addPanel' , {} )                 
                    break;    
                case 'show_import':
                    this.updatePanel('importPanel' , {} )                 
                    break;                            
                case 'help':
                    this.updatePanel('helpPanel' , {} )   
                    break;                                                                               
                case 'show_local':
                    this.updatePanel('localPanel' , {} )                 
                    break;    
                case 'exit_vault':
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )   
                    break;                                             
                case 'check_status':
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )  
                    break;                    
                case 'show_collections':
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )  
                    break;                                       
                default:
                    window.dispatchEvent( new CustomEvent('uiEvent', { detail:eventObj }) )  
                    break;

            }
        }

    }
    
    // MODEL EVENTS
    onNavEvent( e ){
        console.log( e )
        
        var model = e.detail.model;
        var nd = this.con.querySelector("#displaystage")
        
        //if( model.session.state_change == 'check_status'){
            //this.drawer_open=0;
            //gsap.to( this.drawer , { duration:1, right:-350 , ease:Expo.easeOut , delay:1} );        
        //}

        switch( model.session.state_change ){        
            case "check_status":
                //var n = 'newcode'
                if( model.session.state==1 ){
                    this.updatePanel('statusPanel' , model );  
                }else if( model.session.state==2 ){
                    this.updatePanel('loginPanel' , model );  
                }
                else{
                    
                    
                        if(location.hostname === 'localhost' || location.hostname === '127.0.0.1'){
                                this.updatePanel('landingPanel' , model );                    
                        }
                        else{
                                this.updatePanel('loginPanel' , model );  
                        }
                }
                break;
            case "show_status":
                //var n = 'newcode'
                //if( model.state )
                this.updatePanel('seedPanel' , model );
                break;   
            case "show_procs":
                //var n = 'newcode'
                this.clearContent();
                var ftyp = model.session.state_change.split("_").pop();
                //var vnode = factory2d.renderNodeSync( 'collectionsPanel', { label:'TEST'} )
                //var avail = model.keycache.itemsByScope( 'ty', ftyp );
                var avail = model.getProcs();
                for ( var i in avail ){  
                    var cred_item = factory2d.renderNodeSync( 'credItem', { vaultname:'Vault1'} )
                    var obj = avail[i];
                    var ty = ( 'ty' in obj )? obj['ty'] : 'unknown'
                    
                    //var dom = ( obj.uuid && obj.dom != '') ? obj.dom : crypto.randomUUID();
                    cred_item.querySelector("#ftyp").src='/img/'+ty+'.png';
                    cred_item.querySelector("#f1").innerHTML= ''+i.slice(0,12) // obj.domain;
                    cred_item.querySelector("#f3").innerHTML= 'PROC'
                    nd.appendChild(cred_item);
                }
                //nd.appendChild( vnode ); 
                break;                    
            case "show_collections": 
            case "showcol_object":
            case "showcol_map":
            case "showcol_maps":
            case "showcol_key":
            case "showcol_vault":
            case "showcol_device":
                this.clearContent();
                var ftyp = model.session.state_change.split("_").pop();
                var vnode = factory2d.renderNodeSync( 'collectionsPanel', { label:'TEST'} )
                var avail = model.keycache.itemsByScope( 'ty', ftyp );

                for ( var i in avail ){  
                    var cred_item = factory2d.renderNodeSync( 'credItem', { vaultname:'Vault1'} )
                    var obj = avail[i];
                    var ty = ( 'ty' in obj )? obj['ty'] : 'unknown'
                    
                    //var dom = ( obj.uuid && obj.dom != '') ? obj.dom : crypto.randomUUID();
                    cred_item.querySelector("#ftyp").src='/img/'+ty+'.png';
                    cred_item.querySelector("#f1").innerHTML=obj.dom;
                    cred_item.setAttribute('dom', obj.uuid );
                    cred_item.setAttribute('uuid', obj.uuid );
                    cred_item.setAttribute('fn','nav_'+ty);

                    // { type: 'map', title: 'miccco/Vission', fragment: 'miccco/vission', searchable: 'map miccco/vission', color: '#341661', …}
                    cred_item.querySelector("#f3").innerHTML=ty;
                    cred_item.querySelector("#f1").innerHTML= ( 'dom' in obj ) ? obj['dom'] :  ( 'domain' in obj ) ? obj['domain']  : 'UNKN';
                    //cred_item.querySelector("#f2").innerHTML= ( 'ke' in obj ) ? obj['ke'] : '# # # #' ;                    
                    //vault_item.querySelector("#domain").innerHTML=item.dom;
                    //vault_item.querySelector("#stamp").innerHTML=item.update_date.toISOString();
                    //vault_item.setAttribute("domain", item.dom );
                    vnode.querySelector("#app_tray").appendChild(cred_item);
                }
                nd.appendChild( vnode );    
                break;
            case "show_cred":

                var obja = model.session.selected_object;
                var sel_dom = model.session.selected_object.uuid;
                var sel_uid = model.session.selected_object.uuid;
                // how to get right item by domain ? 
                var holder= nd.querySelector('[uuid="'+sel_dom+'"]').querySelector('#holder');
                //var kobj = model.keycache.items[ sel_dom ];
                var kobj = model.keycache.keySelect( 'uuid' , sel_dom )[0];
                this.kvs = new Kvs( { container:holder , data:kobj  }  )
                // COOL TEMP WAY DEFAULT FUNC INIT TO WRITE UPDATE
                // LATER CHANGE TO BUBBLE EVENT 
                this.kvs.addEventListener( 'kvInputEvent' , function(e , uid=sel_uid , dat = model.keycache ){
                        console.log(' QR hears kvInputEvent ')

                        dat.keyUpdate( 'uuid' , uid , e.detail )
                    // this.model.updateObject( this.uuid , e.detail ) //
                }.bind( this ));
                var cred_options = factory2d.renderNodeSync( 'credOptions', { vaultname:'Vault1'} )
                holder.appendChild( cred_options );
                break;

            case "show_unlock":
                this.clearContent();
                var vnode = factory2d.renderNodeSync( 'unlockPanel', { label:'TEST'} )
                var inode = factory2d.renderNodeSync( 'vaultItem', { label:'TEST'} )
                //inode.querySelector('#domain')( 'domain', model.selected_object.domain)
                inode.querySelector("#domain").innerHTML=model.session.selected_object.domain;
                inode.querySelector("#stamp").innerHTML=model.session.selected_object.stamp;
                vnode.querySelector('#app_tray').appendChild(inode);
                nd.appendChild( vnode );    
                break;
            case "keyImport":
            case "downloadBlob":            
                this.clearContent();
                var vnode = factory2d.renderNodeSync( 'unlockPanel', { label:'TEST'} )
                var inode = factory2d.renderNodeSync( 'vaultItem', { label:'TEST'} )
                //inode.querySelector('#domain')( 'domain', model.selected_object.domain)
                inode.querySelector("#domain").innerHTML=model.session.file.dom; //"IMPORTED FILE";//model.session.selected_object.domain;
                inode.querySelector("#stamp").innerHTML=model.session.file.update_date;
                vnode.querySelector('#app_tray').appendChild(inode);
                nd.appendChild( vnode );    
                break;                        
            case "cred_del":
                var seluuid = model.session.selected_object.uuid;
                var holder= nd.querySelector('[uuid="'+seluuid+'"]');
                holder.parentNode.removeChild( holder );
                var k=4;
                break;
            default:
                console.log(' default click in Qnav ')
                break;

        }

        var a=0
        var b=2


    }
    onSessionEvent( obj ){
        var model = obj.detail.model;
        switch( obj.detail.module ){

                case 'generic':
                        console.log('def ')
                        // YOU ARE HERE: 
                        // register / reset / login / logout 
                        // evaluate session and update the panels 
                        this.con.querySelector('#sessionfeedback').innerHTML = obj.detail.payload.message;
                break;

                default:

                        if( model.session.state == 0 ){
                            this.updatePanel('loginPanel' , model.session )
                            this.openPanel()
                            //this.closePanel()
                        }
                        else if( model.session.state == 1 ){
                            this.updatePanel('statusPanel' , model.session )         
                            //this.closePanel()
                        }else if( model.session.state == 2 ){
                            this.updatePanel('landingPanel' , model )    
                            this.openPanel()
                        }
                        else{
                
                            if( obj.detail.message )
                            {
                                this.con.querySelector('#sessionfeedback').innerHTML = obj.detail.message;
                            }else{
                                
                                if( platform.isElectron() ){
                                    this.updatePanel('landingPanel' , model )
                                    this.openPanel()                                        
                                }else{
                                    this.updatePanel('registerPanel' , model.session )
                                    this.openPanel()                              
                                }
                
                
                            }
                        }
                break;
                        
        }

    }
    onAuthEvent( obj ){
        //this.updatePanel('loginPanel')
    }


    // PANEL UPDATES
    clearContent(){
        var nd = this.con.querySelector("#displaystage")
        while (nd.firstChild) {
            nd.removeChild(nd.lastChild);
        }
    } 
    async updatePanel( panel_in  , model ){
        
        var nd = this.con.querySelector("#displaystage")
        var obj = model.session;
        this.clearContent();

        // ATTACH PANEL
        var vnode = factory2d.renderNodeSync( panel_in, { label:'TEST'} )
        nd.appendChild( vnode );


        if( panel_in == 'unlockPanel'){   
            var vault_item = factory2d.renderNodeSync( 'vaultItem2', { vaultname:'Vault1'} )
            vault_item.querySelector("#vaultname").innerHTML="DAO Local";
            nd.querySelector("#app_tray").appendChild(vault_item);  
            
        }


        if( panel_in == 'landingPanel'){   

                // ADD EXISTING IN MEMORY VAULTS
            var avail = await model.keycache.discoverVaults();
            avail.forEach( function( item ){
                var vault_item = factory2d.renderNodeSync( 'vaultItem', { vaultname:'Vault1'} )
                vault_item.querySelector("#domain").innerHTML=item.dom;
                vault_item.querySelector("#stamp").innerHTML=item.update_date.toISOString();
                vault_item.setAttribute("domain", item.dom );
                nd.querySelector("#app_tray").appendChild(vault_item);

            })
                // OPTION TO IMPORT VAULT 
                console.log(' future import ')
                
                // OPTION TO CREATE NEW VAULT FROM SCRATC 
                var import_item = factory2d.renderNodeSync( 'vaultItemImport', { vaultname:'Vault1'} )
                nd.querySelector("#app_tray").appendChild(import_item);                                        
            
                // OPTION TO CREATE NEW VAULT FROM SCRATC 
                var vault_item = factory2d.renderNodeSync( 'vaultItemNew', { vaultname:'Vault1'} )
            nd.querySelector("#app_tray").appendChild(vault_item);                        
        }

        // CUSTOM LOGIC PANELS 
        if( panel_in == 'importPanel'){   
            // nd.querySelector('#lastlogin').innerHTML=obj['lastlogin']
            // nd.querySelector('#ip').innerHTML=obj['un']+' @ '+obj['ip']
            
            var l =3;

        
            function onReaderLoad(event){
                // var obj = JSON.parse(event.target.result);
                // ( if yaml else json ) //
                // should try to parse as text OR yaml 
                // bubble event with blob to session model  ?
                // 
                // should move to process
                this.raw_import = event.target.result;
                var conf_obj = YAML.parse( this.raw_import );
                conf_obj['action']='keyImport'
                conf_obj['fn']='keyImport'
                window.dispatchEvent( new CustomEvent('uiEvent', { detail:conf_obj } ) ); 
                var x = 0;
            }
            function onChange(event) {
                var reader = new FileReader();
                reader.onload = onReaderLoad.bind(this);
                reader.readAsText(event.target.files[0]);
            }
            nd.querySelector('#xfile').addEventListener('change', onChange.bind(this));
                        
        }   




        // CUSTOM LOGIC PANELS 
        if( panel_in == 'settingsPanel'){   
            
                //nd.querySelector('#lastlogin').innerHTML=obj['lastlogin']
                //nd.querySelector('#ip').innerHTML=obj['un']+' @ '+obj['ip']
            var qr = new VanillaQR({
                url: "https://apdex.com/connect",
                size: 80,
                colorLight: "#00000000",
                colorDark: "#EEEEFF",
                toTable: false, // output to table or canvas
                ecclevel: 1,    // Ecc correction level 1-4
                noBorder:true,  // Use a border or not
                borderSize: 0   // Border size to output at
            });
            nd.querySelector('#qr').appendChild(qr.domElement);//Canvas or table is stored in domElement property

            function onChange(event) {
                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(event.target.files[0]);
            }
        
            function onReaderLoad(event){
                // var obj = JSON.parse(event.target.result);
                // ( if yaml else json ) //
                var conf_obj = YAML.parse( event.target.result );
                window.dispatchEvent( new CustomEvent('keyImportEvent', { detail:conf_obj } ) ); 
                var x = 0;
            }

            //nd.querySelector('#xfile').addEventListener('change', onChange);
        }   
    }
    toggleDrawer(){
        if( this.drawer_open){
            this.closePanel()
        }else{
            this.openPanel()
        }
    }
    openPanel(){
        this.drawer_open=1;
        this.drawer = this.con.querySelector('#slide_drawer2')
        gsap.to( this.drawer, {duration: 1, right:0, ease:Expo.easeOut });        
    }
    closePanel(){
        this.drawer_open=0;
        this.drawer = this.con.querySelector('#slide_drawer2')
        gsap.to( this.drawer, {duration: 1, right:-350, ease:Expo.easeOut });
    }
}

export default QNav
