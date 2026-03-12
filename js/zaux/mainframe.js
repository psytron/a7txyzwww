


console.log('booting mainframe new simple')
//document.querySelector('body').appendChild( searchMod )

//searchMod = SearchMod() 
//navMenu = NavMenu()
//viewFrame = ViewFrame() 
//level.add( [ searchMod , viewFrame , navMenu ])

//searchMod.addEventListener( 'navEvent' , viewFrame.onNavEvent ) // clears memory and displays OR sends Command 
//searchMod.addEventListener( 'navEvent' , navMenu.onNavEvent )   // closes itself 


var session_fragment = Math.round( Math.random()*99999 )
var winloc = window.location;
var official_base = window.location.protocol + "//" + winloc.host;
var jtkn = 'blank'
var official_base ='https://signalmesh.io'
//var official_base = window.location.protocol + "//" + window.location.host;
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

// UI ELEMENTS 
var term = document.getElementById("overflowterm")
function printTerm( message_in ){
    term.innerHTML+= "<div class='loggert'>"+message_in+"</div>"
    
    $( "#overflowterm").children().first().remove()
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


var leframe = document.getElementById('afx')
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



/*
$( ".chatholder" ).load( "http://localhost:3000/b", function() {
    //alert( "Load was performed." );
    console.log(' loading chat ')
}); */
