
import { Elx } from '../../../x_modules/elx.js'

class TickerTape extends Elx {

    constructor( initObj ) {
        super( initObj )

        this.container.innerHTML = `
 
            <style>
                @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                .tickertapecontainer {
                    background-color: #000;
                    font-size: 13px;
                    position: relative;
                    font-family: 'Roboto Condensed', sans-serif;
                    overflow: hidden;
                    display:inline-flex;
                    width:100%;
                    overflow:hidden;
                    
                    
                }
                i{
                    /* border: solid black; */
                    /* border-width: 0 3px 3px 0; */
                    /* display: inline-block; */
                    /* padding: 3px; */
                }         
                .tickeritem{
                    /*overflow:hidden;*/ 
                    display:inline-block; 
                    position:relative; 
                    padding-left:34px;
                    padding:6px;
                    border-right:1px solid #222222;
                    padding-right:18px;
                }
                .tickeritem::before {
                    content: "";
                    position: absolute;
                    z-index: -1;
                    background:url(img/icons/arrowrightlongthin.svg)no-repeat left top;
                    transform: rotate(30deg);
                }
                .greentext{
                    color:green;
                }
                .redtext{
                    color:red;
                }
                .greenOG{
                    background:url(img/icons/angle-up-solid.svg)no-repeat left top;
                    background-position-x: 10px; 
                    background-size: 20px;
                }
                .green{
                    /*background:url(img/icons/arrowrightlongthin.svg)no-repeat left top;*/
                    background-position-x: 10px; 
                    background-size: 20px;
                }
                .red{
                    /*background:url(img/icons/angle-down-solid.svg)no-repeat left top;*/
                    background-position-x: 10px;
                    background-size: 20px;  
                }
                .textpercent{
                    font-weight: 100;
                    font-size:14px;
                    margin-left:21px;
                }                
                .tickertext{
                    margin-left:24px;
                    margin-top:1px;
                }
                .tickertexttop{
                    font-weight:bold;
                    font-size:17px;
                    margin-bottom:-3px;
                    margin-left:21px;
                }
                .tickertextbottom{
                    color:white;
                    font-size:13px;
                    margin-left:21px;
                }
                .redarrow{
                    position:absolute;
                    top:50%;
                    width:24px;
                    left:15px;
                    transform: translate(-50%,-50%) rotate(90deg);
                }
               .greenarrow{
                    position:absolute;
                    top:50%;
                    width:24px;
                    left:15px;
                    transform: translate(-50%,-50%) rotate(-90deg);
                }
                .bold_symbol{
                    font-weight:900;
                }
                .thin_symbol{
                    font-weight:100;
                }
            </style>
            <div class="tickertapecontainer">
            </div>
        `;


    }
    
    ping( param_in ){
        console.log(' ticker tape getting ping in class ')
    }

    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.render();
    }
    render() {
        this.innerHTML= ``
    }
    onDataUpdate( data_in ){

        this.buildTicker( data_in )
    }
    buildTicker( data_in ){
        function templateDynamic( obj_in , temp_identifier  ){

            // GET  THEME switch =   green / red
            // use ${  }  to   temp_identifier switch classes in CSS instead of double template
            var x_templates= {
                'tickeritem_red':`
                <div class='tickeritem red'>
                    <img src="img/icons/arrow_vert_red.svg" class="redarrow"/>
                    <div class='tickertexttop redtext'><span class='bold_symbol'>${obj_in.close}</span><span class='thin_symbol'></span></div>
                    <div class='tickertextbottom'><span class='bold_symbol'>${obj_in.symbol}</span><span class='thin_symbol redtext'>(%${obj_in.percentage})</span></div>
                </div>
            `,
                'tickeritem_green':`
                <div class='tickeritem green'>
                    <img src="img/icons/arrow_vert_green.svg" class="greenarrow"/>
                    <div class='tickertexttop greentext'><span class='bold_symbol'>${obj_in.close}</span><span class='thin_symbol'></span></div>
                    <div class='tickertextbottom'><span class='bold_symbol'>${obj_in.symbol}</span><span class='thin_symbol greentext'>(%${obj_in.percentage})</span></div>
                </div>
            `}
            return x_templates[ temp_identifier ]
        }



        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        var xcontainer = this.container.querySelector('.tickertapecontainer')
        xcontainer.innerHTML='';

        var asset_list=data_in.nodes

        for ( var a in asset_list ){
            var obj = asset_list[a]
            //var sym = a.split('-')[1]
            //var vll = obj[ Object.keys(obj)[0] ]

            if( Math.round( Math.random()*1 ) > 0){
                var tmplt = templateDynamic( obj , 'tickeritem_green' )
            }else{
                var tmplt = templateDynamic( obj , 'tickeritem_red' )
            }
            xcontainer.insertAdjacentHTML( 'beforeend', tmplt )
        }
    }
}

export { TickerTape }