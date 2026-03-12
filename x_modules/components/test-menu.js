
class TestMenu extends HTMLElement{

    constructor(){
        super()
        this.render()

        // CAVEMAN RESCOPE
        this.onDataUpdate = this.onDataUpdate.bind( this )
    }

    onDataUpdate( e ){
        var mapname= e.detail.model.meta.name;
        this.querySelector('#maptitle_a1as').value = mapname;

    }
    // wow can I e
    render(){
        this.innerHTML = `
            <style>
                .cgrn{
                    background-color:rgba(10,240,10,0.2);
                }
                .grn{
                    background-color:rgba(10,240,10,0.6);
                }
                .blu{
                    background-color:rgba(10,10,240,0.6);
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
                    font-size: 12px;
                     font-color:#EEEEEE;
                    content: "";
                    background-color: 222222;
                    display: inline-block;
                    height: 100%;
                    top: 0;

                    border-radius: 0;                    
                }
            </style>
            <div id="dynfuncs" style="position:absolute; display:inline-block; margin-top:70px; width:30%; right:6px; top:3px; font-size:7px; text-align:right; margin-right:-9px;">
                <div fun='create/node/alias'  class="dynfunc cgrn" >NEW+A</div>
                <br>
                <span fun='create/node/alias'  class="dynfunc grn" >ALI</span>
                <span fun='create/node/repo'  class="dynfunc grn" >REP</span> 
                <span fun='create/node/bot'  class="dynfunc grn" >BOT</span> 
                <span fun='create/node/module'  class="dynfunc grn" >MOD</span> 
                <span fun='create/node/tag'  class="dynfunc grn" >TAG</span> 
                <span fun='create/node/token'  class="dynfunc grn" >TOKEN</span> 
                <br><br>
                <span fun='select/map/0'  class="dynfunc blu" >LYT0</span>
                <span fun='select/map/1'  class="dynfunc blu" >LYT1</span>
                <span fun='select/map/2'  class="dynfunc blu" >LYT2</span>
                <span fun='select/map/3'  class="dynfunc blu" >LYT3</span>
                <span fun='select/map/4'  class="dynfunc blu" >LYT4</span>
                <span fun='select/map/5'  class="dynfunc blu" >LYT5</span>
                <br>
                <span fun='select/mode/up'  class="dynfunc gra" >MO+</span>
                <span fun='select/mode/down'  class="dynfunc gra" >MO-</span>
                <span fun='select/arrange/circle'  class="dynfunc gra" >SR_C</span>
                <span fun='select/arrange/grid'  class="dynfunc gra" >AR_GRD</span>
                <span fun='select/arrange/random' class="dynfunc gra" >AR_RND</span>
                <span fun='select/arrange/force' class="dynfunc gra" >AR_FRC</span>
                <span fun='save/map/all'  class="dynfunc" >MAP_WRT</span>
                <span fun='select/arrange/force' class="dynfunc gra" >AC</span>
                <div style="display:flex; flex-direction:column; justify-content:flex-end;">
                    <div style="font-size:11px; color:#CCCCFF; margin-bottom:-10px;">MAP ID: </div>
                    <div>
                        <input type='text' id='maptitle_a1as' style="border:solid red 1px; width:100px;font-size:14px;color:rgba(10,10,240,1);; border: none; outline: none; background: transparent; border: none transparent; border-color: transparent;" value="EDITABLE TITLE"></input>
                    </div>                        
                </div>
                <span fun='save/map/all'  class="dynfunc" >SAV ALL</span>                
                <span fun='reportrequest'  class="dynfunc" >POS_SAV</span>                
            </div>

            `

                        
        ///// CONVERT CLICKS TO CUSTOM EVENT BUBBLES /// 
        this.querySelectorAll('.dynfunc').forEach( (b)=>{
            b.addEventListener('click',(el)=>{
                var fun = el.target.getAttribute('fun')
                this.dispatchEvent( new CustomEvent( 'clickEvent', { detail:{'fun':fun} }) )
            })
        })

        this.querySelector('#maptitle_a1as').addEventListener('input', function(e){

            var newmapname = e.target.value;
            this.dispatchEvent( new CustomEvent( 'mapEditRequestEvent', { detail:{'name':newmapname} }) )
        
        }.bind(this))

    }
}

customElements.define('test-menu', TestMenu );