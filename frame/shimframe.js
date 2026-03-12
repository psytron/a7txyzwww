
import $ from '../web_modules/jquery.js';
import { Util , session_fragment, official_base } from '../util/util.js';
import { Elx } from '../x_modules/elx.js'

class ClearFrame extends Elx {
    

    constructor( initObj ) {
        super( initObj );
        this.onNavEvent = this.onNavEvent.bind(this);
        this.onFabricEvent = this.onFabricEvent.bind(this);
        this.onFreshDataEvent = this.onFreshDataEvent.bind(this);
        this.selected_object = {};
        //console.log('booting clear frame : this',this)
        this.leframe = document.querySelector('#afx');
        this.leframe.onload = this.onFrameReset;
        //this.driver = neo4j.driver('bolt://0.0.0.0', neo4j.auth.basic('neo4j', 'loc'))
    }

    onFrameReset( o ){
        // check states and push or load //
        console.log(' - 008 <> VANILLA - ',o);
        console.log('Browser Version:', navigator.userAgent);
    }

    onFabricEvent( e ){
        // this for real-time feed updates like price feeds
        console.log(' Fabric Event should update clear frame: ');
        this.pushMessage( e.detail );
    }
    onFreshDataEvent( e ){
        // this for real-time feed updates like price feeds
        console.log(' Fresh data  Event should update clear frame: ');
        this.pushJSONintoFrame( e.detail );
        //this.pushMessage( e.detail );
    }  
    
    onNavEvent( e ){
        this.model = e.detail.model;
        var obj = e.detail
        this.selected_object = e.detail;

        var routable_key_fn = ( 'type' in obj ) ? obj['type'] : obj['fn']
        if( routable_key_fn == undefined ){
            routable_key_fn = obj.method ;
        }

        
        switch ( routable_key_fn ){
            case 'freesearch':

                // here instead of freesearch ftriggering fetch fragmebt 
                // it will instead pushIntent( )
                // push intent //
                // but maybe not in here 
                
                //this.fetchFragment( obj['qry'] )
                break;
            case 'map':
                this.fetchFragment( obj['fragment'] )
                break;
            case 'query':
                //this.fetchQuery( obj['fragment'] )
                if( obj.payload ){
                    this.pushJSONintoFrame( obj.payload );
                    //this.loadFreshMap( obj.payload );
                }
                break;                
            case 'open':
            case 'new':
                this.pushMessage( obj )
                break;                
            case 'cred_merge':
                var this_node = this.model.keycache.keySelect( 'uuid', obj.uuid )[0];
                this.pushJSONintoFrame( this_node.dat );
                break;      
            case 'cred_launch':
                var this_node = this.model.keycache.keySelect( 'uuid', obj.uuid )[0];         
                this.loadFreshMap( this_node.dat  )
                break;        
            case 'create_map':
                this.loadBlankMap()
                break;                        
            case 'file':
                this.fetchFragment( obj['fragment'] ,  obj['renderer'] )
                break;
            default:
                //this.fetchPage( obj['fragment'] )    
                break;
        }
    }

    //=================== internal =====================

    fetchPage( url_in ){
        console.log(' Fetch Page : ', new Date())
        var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
        var leframe = document.getElementById('afx')
        leframe.src=url_in;
    }
    pushJSONintoFrame( initObj ){

        var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
        var ifr = document.getElementById('afx'); 
        var iframe = document.getElementById('afx');
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
        function checkIframeLoaded() {

            console.log(' * * * * * * * * * check check ')
            var a = iframe.contentWindow;
            var b = iframeDoc;
            var xvar = a.xvar;

            if (  iframeDoc.readyState  == 'complete' && xvar == 9999 ) {
                wn.postMessage(initObj); //wn.postMessage(initObj ,"*" );

                // wow so this workss
                // wn.directCallFunction( initObj );
                // is this safer?
                
                window.clearTimeout(checkIframeLoaded);
            }else{
                window.setTimeout(checkIframeLoaded, 300);                
            }
        }
        checkIframeLoaded();
    }    
    

    loadBlankMap(){
        
        this.leframe.src='/map.html'+'?embk='+session_fragment;
        this.pushJSONintoFrame( { meta:{} , nodes:{} , edges:{} } )
    }
    loadFreshMap(  dat  ){
        
        this.leframe.src='/map.html'+'?embk='+session_fragment;
        this.pushJSONintoFrame( dat )
    }    
    fetchFragment( url_in , renderer='/map.html' ){
        
        this.leframe.src=renderer+'?embk'+session_fragment;
        var starttime = new Date()
        var cache_buster = Math.round( Math.random() * 9999 )

        url_in = url_in.replace(".json", "");
        var url_chunk = url_in.replace(/^[\\/]+|[\\/]+$/g, '')
        var dat_url = '/static/vdisk/'+url_chunk+'.json'+'?cb='+cache_buster;
        var urla = official_base+dat_url;
 
        urla = '/data/'+url_chunk+'.json'+'?cb='+cache_buster;;


        // UPDATE URL FRAGMENT //
        // THIS SHOULD PUSH FRAGMENT INTO URL 
        /*                
        try{
            window.location.hash = '/'+url_chunk;
        }catch(e){ console.log(' hash fregment set except in search') }  */
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState==4 ) {
                if( xhttp.status == 200){
                    var resObj = JSON.parse(xhttp.responseText);
                    var outmessage =resObj.message;
                    var jtkn = resObj.tkn
                    this.pushJSONintoFrame( resObj )

                }else{
                    console.log( 'error in login ')
                } //window.location.replace('/');
            }
        }.bind(this);
        // xhttp.open("POST", official_base+"/jxtavail", true);
        //xhttp.withCredentials = true;
        xhttp.open("GET", urla , true);
        xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
        xhttp.setRequestHeader('Authorization', jtkn);
        xhttp.send();

    }
    async fetchQuery( url_in ){

        // realistically for new model 
        // try to check if it has complete stuff ? 
        // or append JSON apoc , or insert the json apoc ?
        // froz sd
        
        var leframe = document.getElementById('afx')
        leframe.src='/map.html'+'?embkey='+session_fragment;
        var starttime = new Date()
        //var urla = official_base+"/mapqrx?"+url_in
        
        var cache_buster = Math.round( Math.random() * 9999 )
        // DAT URL will be once user names have own folder
        // for that first need to access user_id in clear-frame-view
        url_in = url_in.replace(".json", "");
        var url_chunk = url_in.replace(/^[\\/]+|[\\/]+$/g, '')
        var dat_url = '/'+url_chunk+'&cb='+cache_buster; // moved to inside URL for ability to multiple queries 
        //var dat_url = ''+url_chunk+'&cb='+cache_buster;
        var urla = official_base+dat_url;
        var er = 0;

        
        var session = this.driver.session()
        var result = await session.run("MATCH (x)-[r]-(y) WITH collect(x) + collect(y) as nds, collect(r) as rls CALL apoc.export.json.data(nds,rls, null, { stream: true , jsonFormat:'JSON' }) YIELD data RETURN data")
        var resObj =  JSON.parse( result.records[0]._fields[0] )

        resObj.links = resObj.rels;
        delete resObj.rels;

        // example loads from Arcade !! Yay . 
        var resm = await fetch('http://localhost:8080');
        var movies = await resm.json();        
        
        this.pushJSONintoFrame( movies )

        // UPDATE URL FRAGMENT //
        // THIS SHOULD PUSH FRAGMENT INTO URL 
        
        /*                
        try{
            window.location.hash = '/'+url_chunk;
        }catch(e){ console.log(' hash fregment set except in search') }  */
        
        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function() {
        //     if (xhttp.readyState==4 ) {
        //         if( xhttp.status == 200){
        //             var resObj = JSON.parse(xhttp.responseText);
        //             var outmessage =resObj.message;
        //             var jtkn = resObj.tkn
        //             this.pushJSONintoFrame( resObj )

        //         }else{
        //             console.log( 'error in login ')
        //         } //window.location.replace('/');
        //     }
        // }.bind(this);
        // // xhttp.open("POST", official_base+"/jxtavail", true);
        // //xhttp.withCredentials = true;
        // xhttp.open("GET", urla , true);
        // xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
        // xhttp.setRequestHeader('Authorization', jtkn);
        // xhttp.send();

    }    
    fetchQueryThroughP( url_in ){
        
        var leframe = document.getElementById('afx')
        leframe.src='/map.html'+'?embkey='+session_fragment;
        var starttime = new Date()
        //var urla = official_base+"/mapqrx?"+url_in
        
        var cache_buster = Math.round( Math.random() * 9999 )
        // DAT URL will be once user names have own folder
        // for that first need to access user_id in clear-frame-view
        url_in = url_in.replace(".json", "");
        var url_chunk = url_in.replace(/^[\\/]+|[\\/]+$/g, '')
        var dat_url = '/'+url_chunk+'&cb='+cache_buster; // moved to inside URL for ability to multiple queries 
        //var dat_url = ''+url_chunk+'&cb='+cache_buster;
        var urla = official_base+dat_url;
        var er = 0;

        // UPDATE URL FRAGMENT //
        // THIS SHOULD PUSH FRAGMENT INTO URL 
        
        /*                
        try{
            window.location.hash = '/'+url_chunk;
        }catch(e){ console.log(' hash fregment set except in search') }  */
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState==4 ) {
                if( xhttp.status == 200){
                    var resObj = JSON.parse(xhttp.responseText);
                    var outmessage =resObj.message;
                    var jtkn = resObj.tkn
                    this.pushJSONintoFrame( resObj )

                }else{
                    console.log( 'error in login ')
                } //window.location.replace('/');
            }
        }.bind(this);
        // xhttp.open("POST", official_base+"/jxtavail", true);
        //xhttp.withCredentials = true;
        xhttp.open("GET", urla , true);
        xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
        xhttp.setRequestHeader('Authorization', jtkn);
        xhttp.send();

    }
    pushMessage( obj ){
        var ifr = document.getElementById('afx')    
        var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
        //wn.postMessage( JSON.stringify(obj) ,"*" );
        var ob = {}
        const target = ob;
        const source = obj;
        const returnedTarget = Object.assign(target, source);
        delete returnedTarget['element'];  // DOM References throw exceptions passed between iframes
        wn.postMessage( returnedTarget ,"*" );
    }    
    pushJSON( json_in ){
        var starttime = new Date()
        var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
        var ifr = $('#afx')
        this.onIframeReady( ifr  , function(){
            var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
            wn.postMessage(initObj ,"*" ); // postMessage arguments: data to send, target origin

            var completed = new Date() - starttime;                            
            //printTerm(' Loaded Content in '+completed+' ms' )
            //printTerm(' Happy Trails...' )
            
        } , function(){ console.log('errroriframe')})
        wn.postMessage(initObj ,"*" ); // postMessage arguments: data to send, target origin
    }

    async onFrameReady(){

        return new Promise( ( resolve , err )=>{

            var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
            var ifr = document.getElementById('afx'); 
            var iframe = document.getElementById('afx');
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
            function checkIframeLoaded() {
    
                console.log(' * * * * * * * * * check check ')
                var a = iframe.contentWindow;
                var b = iframeDoc;
                var xvar = a.xvar;
    
                if (  iframeDoc.readyState  == 'complete' && xvar == 9999 ) {
                    wn.postMessage(initObj ,"*" );
                    window.clearTimeout(checkIframeLoaded);
                }else{
                    window.setTimeout(checkIframeLoaded, 300);                
                }
            }
            checkIframeLoaded();

        })
        
    }
 
    //*  Just listening for the load event will only work if the iframe is not already loaded. If so, it is necessary
    //* to observe the readyState. The issue here is that Chrome will initialize iframes with
    //* "about:blank" and set its readyState to complete. So it is furthermore necessary to check if it's
    //* the readyState of the target document property.
    //* Errors that may occur when trying to access the iframe (Same-Origin-Policy) will be catched and the error
    //* function will be called.
    //* @ param {jquery} $i - The jQuery iframe element
    //* @ param {function} successFn - The callback on success. Will
    //* receive the jQuery contents of the iframe as a parameter
    //* @ param {function} errorFn - The callback on error
    onIframeReady($i, successFn, errorFn){
        console.log(' trying iframe ready ')
        try {
            const iCon = $i.first()[0].contentWindow,
                bl = "about:blank",
                compl = "complete";
            const callCallback = () => {
                try {
                    const $con = $i.contents();
                    if($con.length === 0) { // https://git.io/vV8yU
                        throw new Error("iframe inaccessible");
                    }
                    successFn($con);
                } catch(e) { // accessing contents failed
                    console.log( ' error 1 ',e)
                    errorFn();
                }
            };
            const observeOnload = () => {
                $i.on("load.jqueryMark", () => {
                    try {
                        const src = $i.attr("src").trim(),
                            href = iCon.location.href;
                        if(href !== bl || src === bl || src === "") {
                            $i.off("load.jqueryMark");
                            callCallback();
                        }
                    } catch(e) {
                        console.log( ' error 2 ',e)
                        errorFn();
                    }
                });
            };
            if(iCon.document.readyState === compl) {
                const src = $i.attr("src").trim(),
                    href = iCon.location.href;
                if(href === bl && src !== bl && src !== "") {
                    observeOnload();
                } else {
                    callCallback();
                }
            } else {
                observeOnload();
            }
        } catch(e) { // accessing contentWindow failed
            console.log('catching exception ', e )
            errorFn();
        }
    };

}
 
export default ClearFrame



    //render() {
        //this.container.innerHTML= ``;
        //this.leframe = document.getElementById('afx')

    //}

    //get myObj() { return this._myObj; }
    //set myObj(value) { this._myObj = value; this.render(); }

    // onNavEventNOTWorkingTHISisTextField( navObj ){
    //     console.log(' clearFrame hears nav update: ', navObj  )
    //     if( navObj['type']=='map' ){   
    //         this.fetchFragment( navObj['fragment'] )
    //     }else{
    //         this.fetchPage( navObj['fragment'] )
    //     }
    // }


    // onDataUpdate( data_in ){
    //     console.log(' incoming data: ',data_in )
    // }


    // loadResult(e){
    //     spinr.fadeOut();
    //     rez.empty();
    //     e.target.value="";
    //     var leframe = document.getElementById('afx')
    //     leframe.onload = function() {
    //         //this.contentWindow.controller.setMap( {map:9} )
    //     };

    //     var selected_obj = loaded_indexes[ selected_index ]
    //     if( selected_obj['type']=='map' || selected_obj['type']=='python'){
    //         fetchFragment( selected_obj['fragment'] )
    //     }else{
    //         console.log(' no fragment for this entry ')
    //         fetchPage( selected_obj['fragment'] )
    //     }

    // }


    // fetchFragmentJQ( url_in ){
    //     console.log(' REQUEST DATA in Frame: ', new Date())
    //     var leframe = document.getElementById('afx')
    //     leframe.src='map.html'+'?'+session_fragment;
    //     var starttime = new Date()
    //     //var urla = official_base+"/mapqrx?"+url_in
    //     var urla = official_base+url_in
    //    // printTerm('REQUEST: '+urla+' :: '+starttime)
    //     $.ajax({
    //             url: urla,
    //             beforeSend: function(xhr){
    //                 xhr.setRequestHeader('Authorization', jtkn);
    //                 xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    //             },
    //             dataType: 'json',
    //             error: function( errObj ){
    //                 console.log(' WOW AJAX ERROR LOCAL ',errObj )
    //             },
    //             success:function( initObj ) {
    //                 console.log(' Loaded Results in SearchFrame  ', new Date())
    //                 //controller.processCluster( initObj )
    //                 this.pushJSONintoFrame( initObj )
    //                 // POST FRAME AGAIN REGARDLESS of IFRAME STATE? 
    //                 //wn.postMessage(initObj ,"*" ); // postMessage arguments: data to send, target origin
    //             }.bind(this)
    //     });

    // }  

    // pushURL( url_in ){
    //     console.log(' Fetch Page : ', new Date())
    //     var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
    //     var leframe = document.getElementById('afx')
    //     leframe.src='loginjwt.html';
    // }   