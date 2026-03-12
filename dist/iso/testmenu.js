import { Kvs } from './../x_modules/apps/kvs/kvs.js';
import { Elx } from '../x_modules/elx.js';
import { factory2d } from '../factory/factory2d.js'

class TestMenu extends Elx{

    constructor( initObj ){
        super( initObj )

        this.kvs;
        this.render()

        // CAVEMAN RESCOPE
        this.onDataUpdate = this.onDataUpdate.bind( this )
    }

    onDataUpdate( e ){

        this.model=e.detail.model;
        
        var mapname= e.detail.model.meta.name;
        this.container.querySelector('#maptitle_alias').value = mapname;

        var con = this.container.querySelector('#metakeyval');
        con.innerHTML='';
        
        // meta KVS 
        this.kvs = new Kvs( { container: con , data:e.detail.model.meta  }  )
        this.kvs.addEventListener( 'kvInputEvent' , function(e){
            console.log(' meta keyval kvInputEvent ')

                var kvobj = e.detail;
                for (var i in kvobj){
                    this.model.meta[ i ] = kvobj[i];            
                }

                
        }.bind(this));            
        

    }
    // wow can I e
    render(){
        this.container.innerHTML = `
            <style>
                .cgrn{
                    background-color:rgba(10,240,10,0.2);
                }
                .grn{
                    background-color:rgba(10,240,10,0.4);
                }
                .blu{
                    background-color:rgba(10,10,240,0.7);
                }
                .gra{
                    background-color:rgba(20,20,20,0.6);
                }
                .dynfunc{
                    display: inline-block;
                    margin:6px;
                    padding: 3px 11px 3px 11px;
                    font-size:9px;
                    cursor: pointer;
                    color: #EEEEEE;
                    font-color:#EEEEEE;
                    border-radius:1px;
                    
                    cursor:pointer;
                    margin-bottom:5px;

                    transform: skewX(-20deg);
                    margin: 0 -3px 0 0;
                  -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Safari */
                     -khtml-user-select: none; /* Konqueror HTML */
                       -moz-user-select: none; /* Old versions of Firefox */
                        -ms-user-select: none; /* Internet Explorer/Edge */
                            user-select: none; 
                }
                .dynfunca{
                    padding: 10px 20px 10px 20px;
                    background-color: 222222;
                    display: inline-block;
                    font-color: #EEEEEE;
                    font-size: 12px;
                    border-radius: 0;                    
                    height: 100%;
                    content: "";
                    top: 0;
                }
            </style>
            
            <style>
            /* latin-ext */
                @font-face {
                    font-family: 'Kanit';
                    font-style: normal;
                    font-weight: 400;
                    font-display: swap;
                    src: url(/fonts/kanitext.woff2) format('woff2');
                    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                }
                /* latin */
                @font-face {
                    font-family: 'Kanit';
                    font-style: normal;
                    font-weight: 400;
                    font-display: swap;
                    src: url(/fonts/kanit.woff2) format('woff2');
                    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }            
                .dynfunc{
                    font-family: 'Kanit', sans-serif;
                }
            </style>
            <div id="dynfuncs" style="position:absolute; display:inline-block; margin-top:70px; width:30%; left:6px; top:3px; font-size:7px; text-align:left; margin-right:-9px;">
                <div fun='create/node/alias'  class="dynfunc cgrn" >NEW</div>
                <br><br>
                <span fun='create/node/x'  class="dynfunc grn">X</span>
                <span fun='create/node/alias'  class="dynfunc grn">ALIAS</span>
                <span fun='create/node/repo'  class="dynfunc grn">REP</span> 
                <span fun='create/node/bot'  class="dynfunc grn">BOT</span> 
                <span fun='create/node/module'  class="dynfunc grn">MOD</span> 
                <span fun='create/node/tag'  class="dynfunc grn">TAG</span> 
                <span fun='create/node/token'  class="dynfunc grn">TOKEN</span> 
                <span fun='create/node/ctoken'  class="dynfunc grn">CTOKEN</span> 
                <span fun='create/node/dtoken'  class="dynfunc grn">DTOKEN</span> 
                <span fun='create/node/cex'  class="dynfunc grn">CEX</span>
                <span fun='create/node/dex'  class="dynfunc grn">DEX</span>
                <span fun='create/node/simfiat'  class="dynfunc grn">FIAT</span>                
                <br><br>
                <span fun='select/map/0'  class="dynfunc blu">LYT0</span>
                <span fun='select/map/1'  class="dynfunc blu">LYT1</span>
                <span fun='select/map/2'  class="dynfunc blu">LYT2</span>
                <span fun='select/map/3'  class="dynfunc blu">LYT3</span>
                <span fun='select/map/4'  class="dynfunc blu">LYT4</span>
                <span fun='select/map/5'  class="dynfunc blu">LYT5</span>
                <br>
                <span fun='select/mode/up'  class="dynfunc gra" >MO+</span>
                <span fun='select/mode/down'  class="dynfunc gra" >MO-</span>
                <span fun='select/arrange/circle'  class="dynfunc gra" >SR_C</span>
                <span fun='select/arrange/grid'  class="dynfunc gra" >AR_GRD</span>
                <span fun='select/arrange/random' class="dynfunc gra" >AR_RND</span>
                <span fun='select/arrange/force' class="dynfunc gra" >AR_FORCE</span>
                <span fun='select/arrange/globe' class="dynfunc gra" >GLOBE</span>                
                <span fun='select/arrange/sphere' class="dynfunc gra" >SPHERE</span>
                <span fun='select/arrange/springshort' class="dynfunc gra" >SRNG NEAR</span>
                <span fun='select/arrange/springlong' class="dynfunc gra" >SRNG FAR</span>
                <span fun='select/arrange/springswap' class="dynfunc gra" >SRNG SWAP</span>
                <span fun='select/arrange/fragment' class="dynfunc gra" >FRAGMENT</span>
                <span fun='select/arrange/rejoin' class="dynfunc gra" >REJOIN</span>
                <span fun='select/arrange/invert' class="dynfunc gra" >INVERT</span>
                <span fun='save/map/all'  class="dynfunc" >MAP_WRT</span>
                <span fun='select/arrange/force' class="dynfunc gra" >AC</span>
                <span fun='config/reuuid/all' class="dynfunc gra" >RE-UUID</span>
                <div style="display:flex; flex-direction:column; justify-content:flex-end;">
                    <div style="font-size:11px; color:#CCCCFF; margin-bottom:1px;">MAP ID: </div>
                    <div>
                        <input type='text' id='maptitle_alias' style="width:180px;font-size:16px;color:rgba(120,140,240,1); width:100%;  border:solid #6666FF 1px; outline: none; background: transparent; " value="EDITABLE TITLE"></input>
                        <!--<input type='text' id='maptitle_alias' style="width:100px;font-size:16px;color:rgba(50,50,240,1); border:solid #6666FF 1px; outline: none; background: transparent; border: none transparent; border-color: transparent;" value="EDITABLE TITLE"></input>-->
                    </div>    
                    <div style="font-size:11px; color:#CCCCFF; margin-bottom:1px;">CHANNEL: </div>
                    <div>
                        <input type='text' id='mapchannel' style="width:180px;font-size:16px;color:rgba(120,140,240,1); width:100%; border:solid #6666FF 1px; outline: none; background: transparent; " value="internal"></input>
                        <!--<input type='text' id='maptitle_alias' style="width:100px;font-size:16px;color:rgba(50,50,240,1); border:solid #6666FF 1px; outline: none; background: transparent; border: none transparent; border-color: transparent;" value="EDITABLE TITLE"></input>-->
                    </div>                                            
                </div>
                <div id="metakeyval">
                </div>
                <span fun='save/map/all'  class="dynfunc" >SAV ALL</span>                
                <span fun='reportrequest'  class="dynfunc" >POS_SAV</span>  
                
            </div>

            `
    	
        factory2d.loadAll( 
    		['x_modules/apps/qr/qr.html',
    		 'x_modules/apps/kvs/kvs.html']
    		)
        .then( ( libx )=>{  
            
            console.log('library loaded') 
            // meta KVS 
            this.kvs = new Kvs( { container: this.container.querySelector('#metakeyval') , data:{ map_id:'set', expand:'root',channel:'0xa2c3e01'}  }  )
            this.kvs.addEventListener( 'kvInputEvent' , function(e){
                console.log(' meta keyval kvInputEvent ')
                //this.model.updateObject( this.node , e.detail  )
            }.bind(this));            
        
        }); 


                        
        ///// CONVERT CLICKS TO CUSTOM EVENT BUBBLES /// 
        this.container.querySelectorAll('.dynfunc').forEach( (b)=>{
            b.addEventListener('click',(el)=>{
                var fun = el.target.getAttribute('fun')
                this.dispatchEvent( new CustomEvent( 'clickEvent', { detail:{'fun':fun} }) )
            })
        })

        this.container.querySelector('#maptitle_alias').addEventListener('input', function(e){

            var newmapname = e.target.value;
            this.dispatchEvent( new CustomEvent( 'mapEditRequestEvent', { detail:{'name':newmapname} }) )
        
        }.bind(this)) 
        this.container.querySelector('#mapchannel').addEventListener('input', function(e){

            var xval = e.target.value;
            this.dispatchEvent( new CustomEvent( 'mapEditRequestEvent', { detail:{'mapchannel':xval} }) )
        
        }.bind(this))  

    }
}
export { TestMenu }
//customElements.define('test-menu', TestMenu );