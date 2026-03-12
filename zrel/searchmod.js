var rez;
var spinr;

var selected_index=-1;
var loaded_indexes=[];
var runstate=0;
var session_fragment = Math.round( Math.random()*99999 )
var leframe = document.getElementById('afx')
var winloc = window.location;
var official_base = window.location.protocol + "//" + winloc.host;
var jtkn = 'blank'
//var official_base = window.location.protocol + "//" + window.location.host;
var official_base ='https://signalmesh.io'
if( window.location.host.includes("localhost") ){ official_base ='http://localhost:8851' }


function updateTossScroll(){
    if( runstate == 'loading')
    {
        requestAnimationFrame( this.updateTossScroll )
        if( new Date().getMilliseconds() >500){
            printTerm(' Load DX: '+Math.random()*1000+new Date() )
        }else
        {
            printTerm('::')
        }
    }else{
        printTerm(' LOAD XE: Complete: '+new Date() )
        _time = 0.0;
    }
}
var type_colors = {
    'connect':'#1f4554',
    'receive':'#1f4554',
    'map':'#311e4e',
    'bank':'#444444',
    'settings':'#444444',
    'add':'#0f3500',
    'command':'#a0008b',
    'coin':'#c58100'
}
// SOON we will read this into the session from the DB under a USER
// Frame will Try to OPEN Session or
var local_aliases = [
    { 'type':'connect' , 'title':'204.157.123.12'},
    { 'type':'connect' , 'title':'signalmesh.io'},
    { 'type':'bank' , 'title':'Wellsfargo'},
    { 'type':'bank' , 'title':'CHASE'},
    { 'type':'settings' , 'title':'Profile Settings'},
    { 'type':'coin' , 'title':'Litecoin LTC'},
    { 'type':'coin' , 'title':'Bitcoin BTC'},
    { 'type':'add' , 'title':'New Identity'},
    { 'type':'add' , 'title':'New BTC Address'},
    { 'type':'add' , 'title':'New LTC Address'},
    { 'type':'command' , 'title':'hosts'},
    { 'type':'command' , 'title':'reset'},
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
    { 'type':'map' , 'title':'System Dependency Graph'},
    { 'type':'map' , 'title':'Correlation strength each LINK'},
    { 'type':'map' , 'title':'Blocks and Miners, '},
    { 'type':'query' , 'title':'only_transfers' ,    'fragment':'qrx=MATCH(x0:Vehicle)-[r0:TRANSFERS]-(x1:Vehicle)return x0,r0,x1'},
    { 'type':'query' , 'title':'west_coast_connect' ,'fragment':'qrx=MATCH(x0:Vehicle)-[r0:TRANSFERS|:CONVERTS]-(x1:Vehicle)return x0,r0,x1'},
    { 'type':'query' , 'title':'conversion_only' ,  'fragment':'qrx=MATCH(x0:Vehicle)-[r0:CONVERTS]-(x1:Vehicle)return x0,r0,x1'},
    { 'type':'query' , 'title':'Apps per Domain' ,  'fragment':'qrx=MATCH(x0:App)-[r0]-(x1:Domain)return x0,r0,x1'},
    { 'type':'map' , 'title':'Single Frag' ,  'fragment':'qrx=MATCH(x0:App)return x0'},
    { 'type':'map' , 'title':'Actor Company' ,  'fragment':'qrx=MATCH(x0:Actor)-[r0]-(x1:Company)return x0,r0,x1'},
    { 'type':'query' , 'title':'assets_world' ,  'fragment':'qrx=MATCH(x0:Asset)-[r0]-(x1:Asset)return x0,r0,x1'},
    { 'type':'map' , 'title':'qrx=MATCH(x0:User)return' ,  'fragment':'qrx=MATCH(x0:User)return x0'},
    { 'type':'map' , 'title':'MATCH( x0:Actor )return x0' ,  'fragment':'qrx=MATCH(x0:Actor)-[r0]-(x1)-[r1]-(x2)return x0'},
    { 'type':'map' , 'title':'MATCH( x0:Block )return x0' ,  'fragment':'qrx=MATCH(x0:Block)return x0'},
    { 'type':'map' , 'title':'MATCH( x0:User )-( x1:World)' ,  'fragment':'qrx=MATCH( x0:User)-[r0:HAS]-( x1:World) return x0,r0,x1'},
    { 'type':'map' , 'title':'MATCH( x0:World )-[r0:HAS]' ,  'fragment':'qrx=MATCH(x0:World)-[r0]-(x1:User)-[r1]-(x2:Credential)return x0,r0,x1,r1,x2'}
] // populate the 'searchable' property
for ( var l in local_aliases ){
    var obj = local_aliases[l]
    obj['searchable']=''+obj['type']+' '+obj['title'].toLowerCase()
}
var available_functions={}
function process_found_command( command_in , identifier_in ){
    console.log('   ',command_in , identifier_in )
};
for( var i in local_aliases){
    var obj = local_aliases[i]
    obj['color']=type_colors[ obj['type'] ]
}




var searchMod = {}
searchMod.pushResultItem=function( obj_in, ndx ){
    var collrr = 0 + Math.round(Math.random() * 1)
    var template = $("#templates #result").clone();

    var file_name_yo= obj_in["type"]
    if( obj_in["type"]=='bank'){
        obj_in["type"]
        file_name_yo= obj_in["type"]+obj_in["title"].toLowerCase()
    }
    template.find('.field1').html('<img src="img/'+file_name_yo+'.png"/>')
    template.find('.field2').html( obj_in['type'])
    //template.find('.field2').addClass('function_option_' + collrr)
    template.find('.resu').attr('ndx' , ndx )
    //template.find('.field2').css("background-color", obj_in['color']);
    template.find('.field3').html( obj_in['title'])
    obj_in.element = template.find('.resu')
    loaded_indexes.push( obj_in )
    template.appendTo(rez)
}
searchMod.setSearchClick= function(e){
    console.log(' click event ')
    resultdiv = $(e.target).closest(".resu")[0]
    if( resultdiv ){
        node = $(e.target).closest('.resu')
        var whatndx = node.attr( "ndx");
        selected_index=whatndx;
        var name = node.find('.field2').html()
        var letype = node.find('.field3').html()
        var uuid = 'notherecauseclicked'

        var selected_obj = loaded_indexes[ selected_index ]
        loadResult(e)
        //if( selected_obj['type']=='map'){
        //    loadResult(e)
        //}else if( selected_obj['type']=='command'){
            /////window.location.replace(official_base+selected_obj['fragment'] );
            /////fetchPage(selected_obj['fragment'])
            ///loadResult(e)
            ///////////////////////
        //}
        /*
            spinr.fadeOut();
            rez.empty();
            e.target.value="";
            leframe.src='/static/mapc.html';
            fetchResults( letype , name)
        */
        e.stopPropagation()
    }
};
searchMod.setSearchKeyDownPaste=function(e){
    spinr.show()
    rez.find('.resu').css("background-color", "rgba(14,14,14,0.7)")
    e = e || window.event;
    if (e.keyCode == '38') {      // UP ARROW
        selected_index= selected_index >=1 ? selected_index-1 : selected_index;
        e.target.value=loaded_indexes[ selected_index ]['type']
        loaded_indexes[ selected_index ].element.css("background-color", "rgba(254,0,0,0.5)")
        e.stopPropagation()
    }else if (e.keyCode == '40') {   // DOWN ARROW
        selected_index= selected_index + 1
        e.target.value=loaded_indexes[ selected_index ]['type']
        loaded_indexes[ selected_index ].element.css("background-color", "rgba(254,0,0,0.5)")
        e.stopPropagation()
    }else if (e.keyCode == '13') {   // ENTER KEY
        loadResult(e)
        runstate = 'loading'
        requestAnimationFrame( updateTossScroll )
        e.stopPropagation()
    }
};
searchMod.setSearchInput=function(e){
    spinr.show();
    rez.empty()
    tosearch = $(e.target).val().toLowerCase();
    loaded_indexes=[];
    selected_index=-1;
    var this_pass_index=0;
    var search_tokens = tosearch.split(" ");
    if( tosearch != ''){
        try{
            for( var i in local_aliases ){
                var valx = local_aliases[i]
                //if( valx['type'].indexOf( tosearch ) !== -1 || valx['title'].indexOf( tosearch ) !== -1) {
                if( valx['searchable'].indexOf( tosearch ) !== -1 || valx['title'].indexOf( tosearch ) !== -1){
                    searchMod.pushResultItem( valx , this_pass_index )
                    this_pass_index ++;            
                }
            }
        }catch( e){
            console.log(' no keys ')
        }
    }

    zurl = "q="+tosearch+"&r="+Math.random()*9999;
    if (['view', 'list', 'vehicle', 'asset'].indexOf( search_tokens[0]) >= 0) {
        if( search_tokens[1] && !isNaN(search_tokens[1])  )
        spinr.fadeOut();
    }else{
        var rnd = Math.round( Math.random()*9999 );
        var requestURL = official_base+"/search?"+zurl+'?rnd='+rnd;
        var request = new XMLHttpRequest();//
        request.onload = function() {
            spinr.fadeOut();
            var data = request.response;
            var items = [];
            var restring ='';
            if( data ){
                data.forEach( function( obj , indx){
                    searchMod.pushResultItem( obj , this_pass_index )
                    this_pass_index++;
                }.bind(this), this);
            }
        }.bind(this);
        request.responseType = 'json';
        request.open('GET', requestURL);
        request.setRequestHeader('Authorization', jtkn);
        request.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
        request.send();
    }
};//



// UI ELEMENTS 
var term = document.getElementById("overflowterm")
function printTerm( message_in ){
    term.innerHTML+= "<div class='loggert'>"+message_in+"</div>"

    $( "#overflowterm").children().first().remove()
}
var searchopen = 1;
function searchToggle( e){
    if( searchopen){
        searchopen=0;
        TweenMax.to('.searchholder', 1, { ease:Expo.easeOut, top: -86+'px'});
    }else{
        searchopen=1;
        TweenMax.to('.searchholder', 1, { ease:Expo.easeOut, top: 0+'px'});
    }
}
function fillx( e ){
    $('#username').val('miccco@gmail.com')
    $('#password').val('')
    auth()

}

// NETWORK AND DATA LOADS
function getServerTime(){
    //print local time: 
    var d = new Date();
    var n = d.getTimezoneOffset();
    printTerm( 'CXC: '+d )
    printTerm( 'Client UTC Offset: '+n+'  '+ (n/60)+":" )
    var rnd = Math.round( Math.random()*9999 );
    var requestURL = official_base + "/servertime?rnd="+rnd;
    var request = new XMLHttpRequest();//
    request.onload = function() {
        var data = request.response;

        printTerm( data['server'] )
        var curdate= new Date( data['server'] )
        printTerm('CXS: '+curdate )
    }.bind(this);
    request.responseType = 'json';
    request.open('GET', requestURL);
    request.setRequestHeader('Authorization', jtkn);
    request.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    request.send();
}
function loadResult(e){
    spinr.fadeOut();
    rez.empty();
    e.target.value="";
    var leframe = document.getElementById('afx')
    leframe.onload = function() {
        //this.contentWindow.controller.setMap( {map:9} )
    };

    var selected_obj = loaded_indexes[ selected_index ]

    if( selected_obj['type']=='map' ){
        fetchFragment( selected_obj['fragment'] )
    }else{
        console.log(' no fragment for this entry ')
        fetchPage( selected_obj['fragment'] )
    }

}
function fetchPage( url_in ) {
    console.log(' Fetch Page : ', new Date())
    var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
    var leframe = document.getElementById('afx')
    leframe.src='loginjwt.html';
}
function fetchFragment( url_in ){
    console.log(' REQUEST DATA in Frame: ', new Date())
    var leframe = document.getElementById('afx')
    leframe.src='map.html'+'?'+session_fragment;
    var starttime = new Date()
    var urla = official_base+"/mapqrx?"+url_in
    printTerm('REQUEST: '+urla+' :: '+starttime)
    $.ajax({
            url: urla,
            beforeSend: function(xhr){
                    xhr.setRequestHeader('Authorization', jtkn);
                    xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
                },
            dataType: 'json',
            error: function( errObj ){
            console.log(' WOW AJAX ERROR LOCAL ')
        },
        success:function( initObj ) {
            console.log(' Loaded Results in SearchFrame  ', new Date())
            //controller.processCluster( initObj )

            var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
            var ifr = $('#afx')
            onIframeReady( ifr  , function(){
                var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
                wn.postMessage(initObj ,"*" ); // postMessage arguments: data to send, target origin

                var completed = new Date() - starttime;                            
                printTerm(' Loaded Content in '+completed+' ms' )
                printTerm(' Happy Trails...' )
                runstate = 'done'
            } , function(){ console.log('errroriframe')})
            wn.postMessage(initObj ,"*" ); // postMessage arguments: data to send, target origin
        }
    });
}
function handleMessage(e) {
    // Reference to element for data display
    console.log('Response received in Frame ',e.data, new Date())
    var el = document.getElementById('display');
    
    var tempObj = {
        'nodes':[ {'domain':'default' , 'name':'def'} , {'domain':'default' , 'name':'def'}],
        'links':[ {'type':'CONNECTS'},{'type':'CONNECTS'}]
    }
    var wn = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
    //getServerTime()
    //wn.postMessage( tempObj );
}
// iFRAME COMMUNICATION
window.addEventListener('message', handleMessage, false);

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}
var map_in =getUrlParam('map','default')
if( map_in != 'default'){
    // search lo
    for( var lx in local_aliases){
        if( local_aliases[lx]['title']==map_in){
            fetchFragment( local_aliases[lx]['fragment'])
        }
    }
}


/**
 * Will wait for an iframe to be ready
 * for DOM manipulation. Just listening for
 * the load event will only work if the iframe
 * is not already loaded. If so, it is necessary
 * to observe the readyState. The issue here is
 * that Chrome will initialize iframes with
 * "about:blank" and set its readyState to complete.
 * So it is furthermore necessary to check if it's
 * the readyState of the target document property.
 * Errors that may occur when trying to access the iframe
 * (Same-Origin-Policy) will be catched and the error
 * function will be called.
 * @param {jquery} $i - The jQuery iframe element
 * @param {function} successFn - The callback on success. Will
 * receive the jQuery contents of the iframe as a parameter
 * @param {function} errorFn - The callback on error
 * */
var onIframeReady = function($i, successFn, errorFn) {
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
        errorFn();
    }
};
var register= function(){
    document.getElementById("logerrout").innerHTML='Registering Flow...';
    if( document.getElementById("password").value.length < 8){
        document.getElementById("password").value=''
        document.getElementById("logerrout").innerHTML='Password Minimum 8 Characters';
        return false;
    }
    data={
        un:document.getElementById("username").value,
        pw:document.getElementById("password").value
    }
    //XHTTP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 && xhttp.status==200) {
            var response = JSON.parse(xhttp.responseText);
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
            //document.getElementById("token").innerHTML = response.token;
            //document.getElementById("token").value = response.token;
        }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
        }
        if(xhttp.readyState==4 && xhttp.status==400){
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
        }
    };
    xhttp.open("POST", official_base+"/jxtreg", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
var auth= function(){
    document.getElementById("logerrout").innerHTML='Auth Flow...';
    data={
        un:document.getElementById("username").value,
        pw:document.getElementById("password").value
    }/*
    function leftPad (str, len, ch) {
        str = String(str);
        var i = -1;
        if (!ch && ch !== 0) ch = ' ';
        len = len - str.length;
        while (++i < len){
        str = ch + str; }
        return str;}
    var valin = document.getElementById("password").value
    data['pwh']= Web3.sha3((valin).toString(16), { encoding: 'hex' })*/

    //XHTTP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 ) {
            var resObj = JSON.parse(xhttp.responseText);
            if( xhttp.status == 200){
                document.getElementById("logerrout").innerHTML=resObj.message;
                jtkn = resObj.tkn
                $('#loginholder').hide()
                $('.searchholder').load( "subhtml/searchfield.html", function() {
                    //alert( "Load was performed." );
                    $( document ).on('click',           searchMod.setSearchClick  )
                    $("#searchbox").on('keydown paste', searchMod.setSearchKeyDownPaste )
                    $("#searchbox").on('input',         searchMod.setSearchInput )
                    rez = $('#search_results');
                    spinr = $('.active');
                }.bind(this));                
            }else{
                document.getElementById("logerrout").innerHTML=resObj.message;
            } //window.location.replace('/');
        }
    };
    // xhttp.open("POST", official_base+"/jxtavail", true);
    //xhttp.withCredentials = true;
    xhttp.open("POST", official_base+"/jxtlogin", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
var test= function(){
    console.log(' test ')
    // data={token:document.getElementById("token").value}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4) {
            if( xhttp.status==200 ){
                resObj = JSON.parse(xhttp.responseText)
                document.getElementById("logerrout").innerHTML=resObj.message;
            }else{
                document.getElementById("logerrout").innerHTML='Session Reset';
            }
        }
    };
    xhttp.open("POST", official_base+"/jxttest", true);
    xhttp.setRequestHeader('Authorization', jtkn);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send();
}
var logout= function(){
    console.log(' test ')
    // data={token:document.getElementById("token").value}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        resObj = JSON.parse(xhttp.responseText)
        if (xhttp.readyState==4 && xhttp.status==200){
            var response = JSON.parse(xhttp.responseText);
            document.getElementById("logerrout").innerHTML=resObj.message; }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("logerrout").innerHTML=resObj.message; }};
    
            xhttp.open("POST", official_base+"/jxtlogout", true);
    //xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send();
}


$( "#loginholder" ).load( "/loginpanel.html", function() {
    //alert( "Load was performed." );
});

$('.searchholder').load( "subhtml/searchfield.html", function() {
    //alert( "Load was performed." );
    $( document ).on('click',           searchMod.setSearchClick  )
    $("#searchbox").on('keydown paste', searchMod.setSearchKeyDownPaste )
    $("#searchbox").on('input',         searchMod.setSearchInput )
    rez = $('#search_results');
    spinr = $('.active');
}.bind(this));


/*
$( ".chatholder" ).load( "http://localhost:3000/b", function() {
    //alert( "Load was performed." );
    console.log(' loading chat ')
}); */
