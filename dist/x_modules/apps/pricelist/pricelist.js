import { Elx } from '../../../x_modules/elx.js'

class Pricelist extends Elx {

    constructor( initObj ) {
        super( initObj );

        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow
        const tickertapeContainer = document.createElement('div');
        tickertapeContainer.classList.add('grid-panel');
        tickertapeContainer.innerHTML = `
            <style>
                .gridpanelcontainer {
                    background-color: #000;
                    font-size: 13px;
                    position: relative;
                    font-family: 'Roboto Condensed', sans-serif;
                    overflow: hidden;
                    display:flex;
                }
                .gridcolumn {
                    width:32%;
                    min-width:300px; 
                }
                .griditem{
                    position:relative; 
                    overflow:hidden;
                    display:flex;
                    justify-content:space-between;
                    align-items: center;
                    vertical-align: middle;
                    border-bottom: solid gray 1px;
                    font-size: 12px;
                    padding: 4px;
                }
                .redarrow{
                    position:absolute;
                    top:50%;
                    width:12px;
                    right:44px;
                    transform: translate(-50%,-50%);
                }
                .greenarrow{
                    position:absolute;
                    top:50%;
                    width:12px;
                    right:14px;
                    transform: translate(-50%,-50%);
                }   
                .griditemcolumn{
                    width:50px;
                    
                }             
            </style>
            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; ">
                <div class="gridcolumn panel1">
                </div>
    
                <div class="gridcolumn panel2">
                </div>
    
                <div class="gridcolumn panel3">
                </div>
            </div>                  
        `;
        /*
        let reqURL = 'http://localhost:8851/comodhashes'
        var requestURL = "/data/comodhashes.json";
        $.ajax({
            url: requestURL,
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                //'selected': document.getElementById('first_cat').value
                'selected':'bars'
            },
            dataType:"json",
            success:function ( data){
                this.buildTicker( data )
            }.bind(this)
        });*/

        // this.render();
        // appending the container to the shadow DOM
        shadow.appendChild(tickertapeContainer);
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
            var x_templates= {
                'tickeritem_red':`
                <div class='tickeritem'>
                    <div class='tickertext' style="">${obj_in.price}</div>
                    <div class='tickertext' >${obj_in.symbol}</div>
                </div>
            `,
                'tickeritem_green':`
                <div class='tickeritem'>
                    <div class='tickertext' style="">${obj_in.price}</div>
                    <div class='tickertext' >${obj_in.symbol}</div>
                </div>
            `}

            return x_templates[ temp_identifier ]
        }


        function itemTemplate( obj_in ){
            let template_item=`
                <div class="griditem">
                    <div style="">
                        ${obj_in.symbol}
                    </div>
                    <div style="">
                        ${obj_in.price}
                    </div>
                </div>`
            return template_item
        }

        function itemTemplate2( obj_in ){
            let template_item=`
                <div class="griditem">
                    <div class="griditemcolumn">
                        ${obj_in.symbol}
                    </div>
                    <div  class="griditemcolumn">
                        (${obj_in.price})
                    </div>
                    <div  class="griditemcolumn">
                        [${obj_in.price}]
                    </div>                    
                    
                    <div  class="griditemcolumn">
                        <img src="img/icons/angle-down-solid.svg" class="redarrow" style=" vertical-align:middle;"/>
                        ${obj_in.price}
                    </div>
                </div>`
            return template_item
        }

        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        
        var panels=[]

        var con1 = this.shadow.querySelector('.panel1')
        con1.innerHTML='';
        panels.push( con1 )

        var con2 = this.shadow.querySelector('.panel2')
        con2.innerHTML=''; 
        panels.push( con2 )       

        var con3 = this.shadow.querySelector('.panel3')
        con3.innerHTML='';
        panels.push( con3 )        

        var slotsmap = {
            'NAS100':2,
            'BCO/USD':2,
            'WTICO/USD':2,
            'CORN/USD':2,
            'WHEAT/US':2,
            'NATGAS/USD':2,
            'WHEAT/USD':2,
            'SUGAR/USD':2,
            'XAG/USD':2,
            'XAU/USD':2,
            'XCU/USD':2,
            'XPD/USD':2,
            'XPT/USD':2,
            'SPX500/USD':1,
            'NAS100/USD':1,
            'CN50/USD':1,
            'USB02Y/USD':1,
            'USB05Y/USD':1,
            'USB10Y/USD':1,
            'USB30Y/USD':1
        }


        var asset_list=data_in.nodes

        for ( var a in asset_list ){
            var obj = asset_list[a]
            var sym = a.split('-')[1]
            var vll = obj[ Object.keys(obj)[0] ]
            let dv2 = document.createElement('div');
            dv2.innerHTML = itemTemplate2( { symbol:sym, price:vll } )
            var gx = itemTemplate2( { symbol:sym, price:vll } )
            
            if ( sym in slotsmap ){
                panels[ slotsmap[sym] ].insertAdjacentHTML( 'beforeend', gx);
            }else{
                panels[0].insertAdjacentHTML( 'beforeend', gx);
            }
        }
    }
}

export { Pricelist }