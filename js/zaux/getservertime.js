
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
function fillx( e ){
    $('#username').val('miccco@gmail.com')
    $('#password').val('')
    auth()
    
}



///  URL READING //
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






// iFRAME BUBBLE RECEIVING 
function handleMessage(e) {
    // Reference to element for data display
    console.log('REZ IFR',e.data, new Date())
    var el = document.getElementById('display');
    var tempObj = {
        'nodes':[ {'domain':'default' , 'name':'def'} , {'domain':'default' , 'name':'def'}],
        'links':[ {'type':'CONNECTS'},{'type':'CONNECTS'}]
    }
    var wnxx = document.getElementById('afx').contentWindow; // get reference to window inside the iframe
    console.log( 'WNXX: ',wnxx)
    //getServerTime()
    //wn.postMessage( tempObj );
}
// iFRAME CONFIRMATION 
//window.addEventListener('message', handleMessage, false);
