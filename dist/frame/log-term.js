import $ from '../../web_modules/jquery.js'
class LogTerm extends HTMLElement {

    constructor() {
        super();
        this.iter = 0;
        this.onLogEvent = this.onLogEvent.bind(this)
        this.printTerm = this.printTerm.bind(this)
        this.render(); }
    
    onSessionEvent(e){
        if( e.detail.model.session==1){
            this.style.display='inline'
        }else{
            this.style.display='none'
        }
    }

    
    onLogEvent( eventObj ){
        //console.log(' logger term ' , eventObj )
        var mes='';
        try{
            mes = eventObj.detail.message;
        }catch{
            mes = 'Blank '
        }
        this.printTerm( mes )
    }

    updateTossScroll(){
        if( runstate == 'loading'){
            requestAnimationFrame( this.updateTossScroll )
            if( new Date().getMilliseconds() >500){
                printTerm(' Load DX: '+Math.random()*1000+new Date() )
            }else{
                printTerm('::')
            }
        }else
        {
            printTerm(' LOAD XE: Complete: '+new Date() )
            _time = 0.0;
        }
    }

    printTerm( message_in ){
        
        var output_message = this.iter+':'+message_in;
        this.termb.innerHTML+= "<div class='loggert'>"+output_message+"</div>"  
        this.termb.removeChild( this.termb.firstChild )
        this.iter++;
    }    

    render() {
        this.innerHTML = `
            <!-- LOGGER TERM 1 -->
            <style>
                .loggert{
                    width:100%; font-size:8px; color:rgb(128, 220, 0);
                }
                b.loggert{ color:green; }
            </style>
            <div id="overflowterm" style="position:absolute; margin-left:6px; margin-top:49px; width:33%; height:80px; pointer-events:none; ">
                <div id="lineitemtemplate" class='loggert' style=""></div>
                <div id="lineitemtemplate" class='loggert' style="">System Ready...</div>
                <div id="lineitemtemplate" class='loggert' style="">_[]</div>
                <div id="lineitemtemplate" class='loggert' style=""> </div>
                <div id="lineitemtemplate" class='loggert' style=""> </div>
            </div> `;
        // UI ELEMENTS 
        this.term = $( this.querySelector("#overflowterm") ) 
        this.termb = this.querySelector("#overflowterm")
    }
}

customElements.define('log-term', LogTerm );