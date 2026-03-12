

//TODO: unfactor $ jquery here 
import $ from '../web_modules/jquery.js'

import { Elx } from '../x_modules/elx.js'

import { gsap , Expo } from '../web_modules/gsap.js'


class SearchMod extends Elx {

    constructor( initObj ){
        super( initObj );
        // Bind Scope Listeners 
        this.setSearchClick = this.setSearchClick.bind(this);
        this.setSearchInput = this.setSearchInput.bind(this);
        this.setSearchKeyDownPaste = this.setSearchKeyDownPaste.bind(this);
        this.onSessionEvent = this.onSessionEvent.bind(this);
        this.initEvent = this.initEvent.bind(this)
        //const shadow = this.attachShadow( {mode: 'open'} );
        //this.shadow = shadow;
        //const xContainer = document.createElement('div');
        //xContainer.classList.add('search-mod');
        //shadow.appendChild(xContainer);
        //this.xinput = shadow.getElementById("inputfield")
        //this.xoutput = shadow.getElementById("outputfield")
        //this.xinput.addEventListener("keyup", this.termKeyUp );

        this.label_colors = {
            'connect':'#1f4554',
            'receive':'#1f4554',
            'map':'#341661',
            'bank':'#444444',
            'settings':'#444444',
            'new':'#295d02',
            'command':'#000000',
            'command2':'#a0008b',// pink
            'coin':'#a95500',
            'alias':'#1e1e79',
            'key':'#073369'
        }

        this.local_aliases = [];// populate the 'searchable' stubs
        for ( var l in this.local_aliases ){
            var obj = this.local_aliases[l]
            obj['searchable']=''+obj['type']+' '+obj['title'].toLowerCase()
        }
        var available_functions={}
        function process_found_command( command_in , identifier_in ){
            console.log('   ',command_in , identifier_in )
        };
        for( var i in this.local_aliases){
            var obj = this.local_aliases[i]
            obj['color']=this.label_colors[ obj['type'] ]
        }
        this.loaded_indexes=[]
        this.selected_index=-1;
        this.runstate = 0;
        this.render()
    }
    render() {        
        this.container.innerHTML = `
            <style>
                .spin{
                    width:42px;
                    position:absolute;
                    right:0px;
                    top:50%;
                    transform: translateY(-50%);
                }      
                .resu{
                    position:relative;
                    border-top: solid rgba(0, 85, 240, 0.24);
                    border-width:thin;
                    border-radius:0px;
                    margin-bottom:0px;
                    overflow:hidden;
                    font-size:12px;
                    cursor: pointer;
                    cursor: hand;
                    color:#AAAAAA;
                    margin-right:6px;
                    margin-left:6px;
                    background-color: rgba(15,15,15,0.7); }
                .res_icon{
                    width:25px;
                }
                .resutok{ background-color:white; border:solid #CCCCCC 1px; border-radius:10px; margin-bottom:4px; overflow:hidden; font-size:23px; text-align:center; padding:20px; }
                .colu{ display: inline-block;padding:9px;}
                .field1{ }
                .field2{/* width:25px; */
                    width:70px;
                    font-size:10px;
                    padding:8px;
                    margin-top:5px;
                }
                .field3{ }
                .colulast{
                    display: inline-block;
                    position:absolute;
                    right:3px;
                    margin: 11px;
                    top:1px;
                }
                .playi{ width:20px;  display: block; margin: 0 auto; }
                .active{ display:none; }
                .startsurv{
                    font-size:20px;
                    width:20px;
                    margin-left:18px;
                    text-align: right;}
                .light{ color:#CCCCCC; }
                
                .searchholder{
                    pointer-events: auto;
                    /* Remove margin:auto and margin-top, set to hug top */
                    min-width: 260px;
                    max-width: 408px;
                    margin: 0 auto;
                    padding: 0;
                    z-index: 10;
                }
                .form-group{margin-bottom: 10px;}
                .searchlogo{ position:absolute; left:8px; bottom:0px; vertical-align:bottom; font-size:13px; color:#9999BB; }
                #searchbox{ 
                    background-color:#060606;  
                    border: solid #444480 1px; 
                    color:#DDDDDD;
                    border-radius:0.55rem;}
                .octlogo{  width:44px; position:absolute; right:5px; margin-bottom:4px; }
                .survmessage{ font-size:10px; color:#888888; text-align:center; }
                .function_option_0{
                    text-align: center;
                    border: 0px;
                    background-color: #050531;
                    border-radius: 5px;
                    padding: 2px;
                }
                .function_option_1{
                    text-align: center;
                    border: -3px;
                    background-color: #011901;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    padding: 2px;
                    padding-right: 14px;
                    padding-left: 14px;
                }

                .Center-Container {
                    position: absolute;
                    height:100%;
                    width:100%;
                }
                .Absolute-Center {
                    position: relative;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
                input:focus::-webkit-textfield-decoration-container {
                    visibility: hidden;
                    pointer-events: none;
                    position: absolute;
                    right: 0;
                }                  
            </style>

            <!--oooXXXooo-->
            <div class="searchholder">
                <div class="brand" style="margin-top:18px;">
                </div>
                <div class="form-groupXL" style="position:relative;" incomponent="true">
                    <input id='searchbox' type="text" class="form-control input-lg"  autocomplete="off" spellcheck="false" incomponent="true">
                    <img class="spin" src="/img/spinoff.png"/>
                    <img class="spin active" src="/img/spinner.gif" incomponent="true"/>
                </div>
                
                <div id="search_results">
                </div>
                <div class="searchcontainer">
                </div>
            </div>
            <!--oooXXXooo-->`;

            //this.spinr= $( this.querySelector('.active') )
            this.spinr= this.container.querySelector('.active')
            this.rez = $( this.container.querySelector('#search_results') );
            this.restemplate = $( this.container.querySelector("#searchitem") )
            $( this ).on('click',           this.setSearchClick  )
            $( this.container.querySelector("#searchbox") ).on('keydown paste', this.setSearchKeyDownPaste )
            $( this.container.querySelector("#searchbox") ).on('input',         this.setSearchInput )



    }
    initEvent( e ){

        console.log(' init Event ')
        this.initStubs( e.detail.stubs )
    }
    initStubs( stbs ){
        this.local_aliases = stbs;
        for ( var l in this.local_aliases ){
            var obj = this.local_aliases[l]
            obj['searchable']=''+obj['type']+' '+obj['title'].toLowerCase()
        }
        var available_functions={}
        function process_found_command( command_in , identifier_in ){
            console.log('   ',command_in , identifier_in )
        };
        for( var i in this.local_aliases){
            var obj = this.local_aliases[i]
            obj['color']=this.label_colors[ obj['type'] ]
        }
        this.loaded_indexes=[]
        this.selected_index=-1;
        this.runstate = 0;
    }

    onSessionEvent(e){
        if( e.detail.model.session.state==1){
            this.container.style.display='inline'
        }else{
            this.container.style.display='none'
        }

        // IF panels are open glide on screen 
        if( e.detail.model.session.panels_open ){
            var g=5;
            this.drawer = document.querySelector('.searchholder')
            gsap.to( this.drawer, {duration: 1, top:-90, ease:Expo.easeOut });
            
        }else{
            //this.container.style.display='none'
            this.drawer = document.querySelector('.searchholder')
            gsap.to( this.drawer, {duration: 1, top:0, ease:Expo.easeOut });
            var d=5;
        }
    }
    termKeyUp( event ){}
    getItemTemplate( obj ,ndx){        
        var file_name_yo= obj["type"]
        if( obj["type"]=='bank'){
            file_name_yo= obj["type"]+obj["title"].toLowerCase()
        }
        var label_color = this.label_colors[ obj.type ]
        var item_template = `
            <div id="result">
                <div class="resu" ndx="${ndx}">
                    <div class="colu field1"><img class="res_icon" src="/img/${file_name_yo}.png"/></div>
                    <div class="colu field2 function_option_0" style="background-color:${ label_color };">${ obj.type }</div>
                    <div class="colu field3">${ obj.title }</div>
                    <div class="colulast">➤
                        <!--<img class="startsurv" src="img/play_button.png"></img>-->
                    </div>
                </div>
            </div>`;       
        return item_template; 
    }
    pushResultItemV2( obj_in , ndx ){
        var tmplt = this.getItemTemplate( obj_in , ndx )
        var tmpltobj= $( tmplt )
        obj_in.element = tmpltobj.find('.resu')
        this.loaded_indexes.push( obj_in )
        tmpltobj.appendTo(this.rez)
        //this.rez[0].insertAdjacentHTML( 'beforeend', tmplt )
    }
    setSearchClick(e){
        var resultdiv = $(e.target).closest('.resu')
        if( resultdiv.length > 0 ){
            var ndx = resultdiv.attr( "ndx");
            this.selected_index=ndx;
            var selected_obj = this.loaded_indexes[ this.selected_index ]
            this.generateNavEvent(e)
            e.stopPropagation()
        }
    };
    setSearchKeyDownPaste(e){
        
        //this.spinr.style.display = 'block';
        this.stopSpinner()
        
        this.rez.find('.resu').css("background-color", "rgba(14,14,14,0.7)")
        this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'Search INPUT'} }) )
        e = e || window.event;
        if (e.keyCode == '9'){           // TAB 
            var update_search_with_this = this.loaded_indexes[0]['type']+' ';
            e.target.value = update_search_with_this; // set field 
            e.preventDefault();  // stop tab exit field 
            e.target.dispatchEvent(new Event('input', {bubbles:true}));
            var k =3;
        }
        else if (e.keyCode == '38'){           // UP ARROW
            this.selected_index= this.selected_index >=1 ? this.selected_index-1 : this.selected_index;
            e.target.value=this.loaded_indexes[ this.selected_index ]['type']
            //this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'SELECT'} }) )
            this.loaded_indexes[ this.selected_index ].element.css("background-color", "rgba(0,152,254,0.5)")  // INDIGO BG
            //this.loaded_indexes[ this.selected_index ].element.css("background-color", "rgba(254,0,0,0.5)")   // RED BG 

        }else if (e.keyCode == '40'){    // DWN ARROW
            this.selected_index= this.selected_index + 1
            e.target.value=this.loaded_indexes[ this.selected_index ]['type']
            //this.dispatchEvent( new CustomEvent('logEvent', { detail:{'message':'SELECT'} }) )
            this.loaded_indexes[ this.selected_index ].element.css("background-color", "rgba(0,152,254,0.5)")  // INDIGO BG
            //this.loaded_indexes[ this.selected_index ].element.css("background-color", "rgba(254,0,0,0.5)") // RED BG 

        }else if (e.keyCode == '13'){    // ENTER KEY
            //this.generateNavEvent(e)
            // runstate = 'loading'      // RESTORE AFTER EVENT LISTENERES ARE WIRED
            // THIS ROLLED STATUS TEXT ONTO LOG TERMINAL: 
            // requestAnimationFrame( updateTossScroll )
            console.log(' BIG ENTER ')
            var what_is_selected=0;
            //this.processSelectedItem();
            this.generateNavEvent(e);
        }  
        e.stopPropagation() 
    };    
    setSearchInput(e){
        this_pass_index=0;
        
        this.spinr.style.display='block'
        this.rez.empty()
        var tosearch = $(e.target).val().toLowerCase();
        this.loaded_indexes=[];
        this.selected_index=-1;
        var this_pass_index=0;
        var search_tokens = tosearch.split(" ");
        if( tosearch != ''){
            try{
                for( var i in this.local_aliases ){
                    var valx = this.local_aliases[i]
                    //if( valx['type'].indexOf( tosearch ) !== -1 || valx['title'].indexOf( tosearch ) !== -1) {
                    if( valx['searchable'].indexOf( tosearch ) !== -1 || valx['title'].indexOf( tosearch ) !== -1){
                        if( this_pass_index < 9 )
                            this.pushResultItemV2( valx , this_pass_index )
                        this_pass_index ++;
                    }
                }
            }catch( e){
                console.log(' no keys ',e)
            }
        }
        if( tosearch.includes('0x') ){
            try{

                this.pushResultItemV2( { title:tosearch , type:'new' , color:0xff0000} , 0 )

            }catch( e){
                console.log(' no keys ',e)
            }
        }
                
        
        if (['view', 'list', 'vehicle', 'asset'].indexOf( search_tokens[0]) >= 0) {
            if( search_tokens[1] && !isNaN(search_tokens[1])  )
            
            //this.spinr.style.display='none'
            this.stopSpinner()
        }else{
            this.stopSpinner()
            //this.spinr.style.display='none'

            /*
            var zurl = "q="+tosearch+"&r="+Math.random()*9999;
            var rnd = Math.round( Math.random()*9999 );
            var requestURL = official_base+"/search?"+zurl+'?rnd='+rnd;
            var request = new XMLHttpRequest();//
            request.onload = function() {
                this.spinr.fadeOut();
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
            request.send();*/
        }
    };//

    startSpinner(){
        console.log(' firing spinner ')
    }
    stopSpinner(){
        this.spinr.style.display='block'
        setTimeout(function(){ 
            this.spinr.style.display='none'            
        }.bind(this),400);
    }

    generateNavEvent(e){
        
        this.spinr.style.display='none';
        this.rez.empty();

        if( 'target' in e && 'value' in e.target ){
            this.qry = e.target.value;    
        }else{
            this.qry = 'none'
        }
        
        e.target.value="";
        
        var selected_obj;
        if ( this.selected_index < 0){
            console.log(' regular search no stub or result ')
            selected_obj = { 'qry':'qrx='+this.qry , 'type':'freesearch' };
        }else{
            selected_obj = this.loaded_indexes[ this.selected_index ]
            
            /*
            try{
                window.location.hash = selected_obj.fragment;    
            }catch(e){ console.log(' hash fregment set except in search') } */
            
        }
        var outbound_object = {};
        outbound_object['action']='searchClick';
        outbound_object['type']=selected_obj['type'];
        outbound_object['title']=selected_obj['title'];
        outbound_object['item']=selected_obj['item'];
        outbound_object['query']=this.qry;
        var event = new CustomEvent('uiEvent', { detail:outbound_object , bubbles: true });
        this.dispatchEvent( event )
    }    


 
    onDataUpdate( data_in ){
        this.printTerm( data_in )
    }
    printTerm( data_in ){
        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        var xcontainer = this.shadow.querySelector('.termcontainer')
        xcontainer.innerHTML='';
        var termlines=data_in
        for( var t in termlines ){
            xcontainer.insertAdjacentHTML( 'beforeend', '<div>QUICK STRING</div>' )
        }
    }
    toggleSearch(){
        /*
        var searchopen = 1;
        function searchToggle( e){
        if( searchopen){
            searchopen=0;
            TweenMax.to('.searchholder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{
            searchopen=1;
            TweenMax.to('.searchholder', 1, { ease:Expo.easeOut, top: 0+'px'});
        }
        }*/        
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

 
export default SearchMod




    /*termKeyUpp=( event )=>{     //// TEST THIS IN FUTURE SAFARI / WEBKIT
        console.log('wow term') // WORKS IN CHROME, BUT BREAKS IN SAFARI
    }*/