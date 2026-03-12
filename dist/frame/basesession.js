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