

class NewsFeed extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow
        const xContainer = document.createElement('div');
        xContainer.classList.add('news-feed');
        xContainer.innerHTML = `
            <template id="tapeitem">
                <div class='tickeritem' style="display:inline-block; position:relative; color:red; padding-left:5px;">
                    <i class="uparr" style="color:red;"></i>
                    <div style="color:white; font-weight:bold;">8888.30</div>
                    <div>BTC/USD</div>
                </div>    
            </template>
            <style>
                @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                .newscontainer {
                    background-color:#181933DD;
                    font-size: 13px;
                    position: relative;
                    font-family: 'Roboto Condensed', sans-serif;
                    overflow: hidden;
                    white-space:nowrap;
                    display: flex;
                    align-items: center;
                    padding:2px;
                }
                .squaretext{
                    font-size:12px;
                    margin:0px;
                    padding:0px;
                }
                i{
                    /* border: solid black; */
                    /* border-width: 0 3px 3px 0; */
                    /* display: inline-block; */
                    /* padding: 3px; */
                }
                .tickeritem{
                    padding-left:14px;
                    padding-right:18px;
                    width: 120px;
                }                
                .newsitem{
                    overflow:hidden;  
                    display:inline-block; 
                    position:relative; 
                    padding:1px;
                    color:white;
                    font-weight:lighter;
                    margin:0px;
                    padding:0px;
                }
                .greentext{
                    color:green;
                }
                .redtext{
                    color:red;
                }
                .textpercent{
                    font-weight: 100;
                    font-size:12px;
                }
                .green{
                    background:url(img/icons/angle-up-solid.svg)no-repeat left top;
                    background-position-x: 10px; 
                }
                .red{
                    background:url(img/icons/angle-down-solid.svg)no-repeat left top;
                    background-position-x: 10px;  
                }
                .tickertext{
                    margin-left:24px;
                    margin-top:1px;
                }
                .tickertexttop{
                    font-weight:bold;
                    font-size:17px;
                    margin-bottom:-3px;
                    margin-left:35px;
                }
                .tickertextbottom{
                    color:white;
                    font-size:13px;
                    margin-left:35px;
                }
                .redarrow{
                    position:absolute;
                    top:50%;
                    width:32px;
                    left:14px;
                    transform: translate(-50%,-50%) rotate(90deg);
                }
            </style>
            <div class="newscontainer">
            </div>
        `;

        // this.render();
        // appending the container to the shadow DOM
        shadow.appendChild(xContainer);
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

            var x_templates= {
                'tickeritem_red':`
                <div class='newsitem'>
                    <span class='squaretext' >${obj_in.symbol}</span>
                </div>
            `,
                'tickeritem_green':`
                <div class='newsitem'>
                    <span class='squaretext' >${obj_in.symbol}</span>
                </div>
            `}
            return x_templates[ temp_identifier ]
        }



        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        var xcontainer = this.shadow.querySelector('.newscontainer')
        xcontainer.innerHTML='';

        var asset_list=data_in.nodes

        for ( var a in asset_list ){
            var obj = asset_list[a]
            var sym = a.split('-')[1]
            var vll = obj[ Object.keys(obj)[0] ]

            if( Math.round( Math.random()*1 ) > 0){
                var tmplt = templateDynamic( { symbol:vll, price:vll } , 'tickeritem_green' )
            }else{
                var tmplt = templateDynamic( { symbol:vll, price:vll } , 'tickeritem_red' )
            }
            xcontainer.insertAdjacentHTML( 'beforeend', tmplt )
        }
    }
}

customElements.define('news-feed', NewsFeed );