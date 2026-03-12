
class Platform{

    constructor(){

        ////// SESSIONS ////
        window.jtkn = 'blank' // JTKN
        window.session_fragment = Math.round( Math.random()*99999 )
        window.official_base = window.location.protocol + "//" + window.location.host;
        //var official_base ='https://signalmesh.io'
        window.official_base ='https://api.signalmesh.io'
        //var official_base = window.location.protocol + "//" + window.location.host;
        if( window.location.host.includes("localhost") || 
            window.location.host.includes("xcore.love") || 
            window.location.host.includes("0.0.0.0")  ){ 
            window.official_base ='http://localhost:8851' 
        }

        window.term=function( min ){
            this.dispatchEvent( new CustomEvent('statusEvent', { detail:{'message':min} }) )
        }
    }

    isElectron() {
        // Renderer process
        if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
            return true;
        }
    
        // Main process
        if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
            return true;
        }
    
        // Detect the user agent when the `nodeIntegration` option is set to true
        if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
            return true;
        }
    
        return false;
    }

    isElectron() {
        // Renderer process
        if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
            return true;
        }
    
        // Main process
        if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
            return true;
        }
    
        // Detect the user agent when the `nodeIntegration` option is set to true
        if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
            return true;
        }
    
        return false;
    }

    inspect(){
        function isElectron() {
            // Renderer process
            if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
                return true;
            }
        
            // Main process
            if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
                return true;
            }
        
            // Detect the user agent when the `nodeIntegration` option is set to true
            if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
                return true;
            }
        
            return false;
        }        

    }

    domain(){
        
        var hn = window.location.hostname;
        if( hn =='')
        {
            hn = 'filehost'
        }
        return hn; 
    }

    color(){

        var colors = {
            wo:'#4444FF',
            lo:'#FF00FF',
            sig:'#88ff88'
        }
        var hn = window.location.hostname

        if( hn.includes('wo') ){

        }else if( hn.includes('sig') ){

        }
    }

}
var platform = new Platform()

export { platform }