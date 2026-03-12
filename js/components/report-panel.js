// cluster component
class DetailPanel extends HTMLElement {
    constructor() {
        super();
        this.needs_capabilities={
            'Alias':['updateid','altertype'],
            'Repo':['updateid','altertype']
        }
        
        this.drawer;
        this.drawer2;
        this.drawer_open = 0;
        this.iter = 0;
        this.render(); 
        this.model; 

        //this.onLogEvent = this.onMapChangeEvent.bind(this)
        //this.printTerm = this.printTerm.bind(this)

        this.onFocusEvent=function( eventObj ){
            this.model = eventObj.detail.model;
            if( model.focusobject ){
                var thegoods = this.model.focusobject; 
                this.buildControls( thegoods.data )
                
                // SLIDE PANEL 
                this.drawer_open=1;
                TweenMax.to(this.drawer, 2, {top:-250 ,ease:Expo.easeOut});
                TweenMax.to(this.drawer2, 2, {bottom:-250 ,ease:Expo.easeOut});
            }else{
                
                this.drawer_open=0;
                TweenMax.to(this.drawer, 2, {top:-580 , ease:Expo.easeOut} );
                TweenMax.to(this.drawer2, 2, {bottom:-580 , ease:Expo.easeOut} );
                //this.reset();
            }
            // this.toggleDrawer()
        }.bind(this)
    }

    headerTemplate( vl ){
        var tmpl =`<div class='coltitle'>${vl}</div>
                   <div style="width:100%; border-top:solid #00758d 1px;"></div>`
        return tmpl
    }

    buildControls( data_in ){
        
        // Git Repo
        //    show full URL
        //    show commits ,
        //    show contributors
        // .  show Credential / Key 

        // Exchange 
        // .  Domain 
        //    Access Credential / Key being used partial 
        // .  Aggregate Stats ? Aux Knowledge ? News ? 
        // .  News Bubble from Asset , into asset ? 

        // Alias
        // .  Keylist 
        // .  Name of Alias
        // .  

        // console.log(  factory2d.render('basic',{a:'bonde008'})  )
        // var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        // var xcontainer = document.querySelector('ticker-tape').shadow
   
        var allcons = this.querySelectorAll('.confpanel')
        var con1 = allcons[0]
        var con2 = allcons[1]
        var con3 = allcons[2]

        // COLUMN 1
        con1.innerHTML='';
        con1.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'HEADER X2' ) )
        con1.insertAdjacentHTML( 'beforeend', factory2d.render('greenlogo',{price:'bonde008',symbol:'XLES',label:'2j29'})  )

        // COLUMN 2
        con2.innerHTML = '';
        con2.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'HEADER X4' ) )
        con2.insertAdjacentHTML( 'beforeend', factory2d.render('anglezone',{a:'bonde008'})  )

        /*
        // COLUMN 3
        con3.innerHTML = '';
        con3.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'HEADER X4' ) )
        // Insert SubItems: 
        for( var g in ['detail','func','rel'] ){
            var tmplt = this.itemTemplate2( { 'x':'woaw','y':'wie','z':'woiwe'} ) 
            xcontainer.insertAdjacentHTML( 'beforeend', tmplt )
        }*/

    }


    toggleDrawer(){
        //var y_vert = Math.round( Math.random() * 200 )
        //y_vert-= Math.round( Math.random() * 200 )
        if( this.drawer_open){
            this.drawer_open=0;
            TweenMax.to(this.drawer, 2, {top:-580 , ease:Expo.easeOut} );
            TweenMax.to(this.drawer2, 2, {bottom:-580 , ease:Expo.easeOut} );
            //TweenMax.to(sortmenu, 2, {right:-580 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{

            //TweenMax.to(sortmenu, 2, {right:0 , ease:Expo.easeOut} );
        }
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
            <style>
                .confpanel{
                    width:32%;
                    min-width:300px; 
                    border-top:solid green 1px;
                }
            </style>
            <div id="slide_drawer" style="position:absolute; width:100%; height:4%; top:-600px; text-align:center; background:rgba(0,0,0,0.5);">
                EDIT MODE<!-- May need: https://github.com/PierBover/ios-iframe-fix  if it keeps messing up. Latest iOS update fixed it for now.  -->
            </div>
            <div id="slide_drawer2" style="position:absolute; width:100%; height:50%; bottom:-600px; background:rgba(0,0,0,0.6); border-top:solid 1px #222222; padding-top:3px; ">
                <div class="container" style="">
                    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; ">
                        <div class="confpanel"></div>
                        <div class="confpanel"></div>
                        <div class="confpanel"></div>
                    </div>    
                </div>
            </div>`;
        // UI ELEMENTS 
        this.term = $( this.querySelector("#overflowterm") ) 
        this.termb = this.querySelector("#overflowterm")
        this.drawer = this.querySelector('#slide_drawer')
        this.drawer2 = this.querySelector('#slide_drawer2')
        //var sortmenu = document.getElementById( 'sortmenu')
    }
}

customElements.define('detail-panel', DetailPanel );