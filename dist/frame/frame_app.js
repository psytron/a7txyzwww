
//import regeneratorRuntime from "./web_modules/regenerator-runtime/runtime.js";
import ClearFrame from './clearframe.js'; 
import LogTerm from './logterm.js';    // logTerm     
import { connector } from './../util/connector.js'
import QNav from './qnav.js'
import SessionModel from './sessionmodel.js'
import SessionController from './sessioncontroller.js'
import { Factory2d } from '../factory/factory2d.js'
import { platform } from "./../util/platform.js"
import SearchMod from "./searchmod.js"

//import driver from "./../../web_modules/neo4j-driver.js"

////// SESSIONS ////
window.jtkn = 'blank' // JTKN
window.session_fragment = Math.round( Math.random()*99999 )
window.official_base = window.location.protocol + "//" + window.location.host;

window.official_base ='https://api.apdex.com'
//var official_base = window.location.protocol + "//" + window.location.host;
if( window.location.host.includes("localhost") || 
    window.location.host.includes("xcore.love") || 
    window.location.host.includes("0.0.0.0")  ){ 
    // window.official_base ='http://localhost:8851' 
    window.official_base ='https://api.apdex.com'
}

window.term=function( min ){
    this.dispatchEvent( new CustomEvent('statusEvent', { detail:{'message':min} }) )
}

async function ready() {

    var factory2d = new Factory2d();
    await factory2d.loadAll( 
        ['./uix/qpanels.html',
         'x_modules/apps/kvs/kvs.html',
         'x_modules/apps/buysell/buysell.html']
        ).then( ( libx )=>{  console.log('library loaded') }  );  
    window.factory2d = factory2d;
    window.jtkn = 'blank'
    
    var model = new SessionModel( { connector:connector } )
    var controller = new SessionController( { model:model , connector:connector } )
    var clearframe = new ClearFrame( {target:document.querySelector('#ifh') } );
    var searchmod = new SearchMod();
    var qnav = new QNav();

    window.addEventListener('uiEvent',          controller.onUiEvent, true );
    window.addEventListener('message' ,         controller.onMapMessage.bind( controller ) , true );  
    window.addEventListener('navRequestEvent',  controller.onNavRequestEvent, true );
    window.addEventListener('unlockimportEvent',controller.onUnlockImportEvent, true );
    model.addEventListener('navRequestEvent',   controller.onNavRequestEvent, true );
    
    // temp work around for navRequestClick needed after actions like login 

    model.addEventListener('sessionEvent',    searchmod.onSessionEvent, true );
    model.addEventListener('initEvent',       searchmod.initEvent, true );
    
    model.addEventListener('sessionEvent',    qnav.onSessionEvent, true );
    model.addEventListener('navEvent',        qnav.onNavEvent , true );
    
    model.addEventListener('navEvent',        clearframe.onNavEvent , true );
    model.addEventListener('fabricEvent' ,    clearframe.onFabricEvent , true);
    model.addEventListener('freshDataEvent',  clearframe.onFreshDataEvent , true)

    controller.start()    
}

document.addEventListener( "DOMContentLoaded", ready );


















// addEventListener('registerEvent',  controller.onRegisterEvent, true );
//var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
//var eventer = window[eventMethod];
//var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
//eventer(messageEvent, controller.onChildBoot ,false);      
// alternate boot method 
//window.addEventListener('message' , controller.onChildBoot , true)
//var gx = new Glue()
//gx.push( {'finally':'finally'}
// omniGraph.load(  expected_context_nodes )
// omni.load( users_nodes  )
// omni.search(    ) returns nodes[] , links[]
// contracts input output apps  ,  
// exchanges input output apps
// needs to check self credentials omni / connector object space
// omni get nodes 
// check local nodes
// check omni nodes
// var allstubs = [ ...walletstubs, ...techtags ]
// searchmod.initStubs( allstubs )
// connector.objectSpace()
// var nowthis = this; 

// SETTING FRAME TITLE TO DOMAIN: 
//var capDom = platform.domain()[0].toUpperCase() + platform.domain().substring(1)
//document.title = capDom+ ' Map LX V0.44'

// import './frame/search-mod.js';  // searchMod  
// hyperFrame  import './js/clear-frame.js' 
// self clearing iFrame 

    
    //model.addEventListener('authEvent',    function(e){ console.log('BSE:',e,e.detail) },true )
    //model.addEventListener('sessionEvent', function(e){  console.log('>> sessionEvent .main.:',e,e.detail); },true )

    // var logterm = new LogTerm();
    // addEventListener('logEvent',    logterm.onLogEvent , true );
    // following 3 events could be userInputEvent ( authReq , keyImport , navReq )
    