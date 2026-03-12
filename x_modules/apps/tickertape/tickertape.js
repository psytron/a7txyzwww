
import { Elx } from '../../../x_modules/elx.js'
import { factory2d } from '../../../factory/factory2d.js'


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
                .minitickertapecontainer{
                    background-color: #000;
                    font-size: 13px;
                    position: relative;
                    font-family: 'Roboto Condensed', sans-serif;
                    overflow: hidden;
                    display:inline-flex;
                    width:100%;
                    overflow:hidden;  
                    border-top:solid 2px #555577; 
                    border-bottom:solid 1px #7777AA; 
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
            <div class="minitickertapecontainer">
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
    async buildTicker( data_in ){

        var xll = this.container;
        var xlk = 1;
        await factory2d.loadAll( ['./opanels.html']).then( ( libx )=>{  
            console.log('library loaded') 
        });  

        //var vnod  = factory2d.renderNodeSync('tickeritem_green',{});
        //var vnod2 = factory2d.renderNodeSync('tickeritem',{ close:999 });
        //vnod2.querySelector('.tickeritemholder').classList.add('green');
        //var vnod3 = factory2d.renderNodeSync('tickeritem',{});
        //vnod3.querySelector('.tickeritemholder').classList.add('red');
        //document.body.append( vnod );
        //document.body.append( vnod2 );
        //document.body.append( vnod3 );
        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        
        
        var xcontainer = this.container.querySelector('.tickertapecontainer')
        xcontainer.innerHTML='';
        var ycontainer = this.container.querySelector('.minitickertapecontainer')
        ycontainer.innerHTML='';
        var asset_list=data_in.nodes
        for ( var a in asset_list ){
            var obj = asset_list[a]
            var vnode = factory2d.renderNodeSync('tickeritem',obj)
            if( obj.percentage > 0){
                vnode.classList.add('asc');
            }else{
                vnode.classList.add('desc');
            }
            xcontainer.append( vnode )
            var vnode2 = factory2d.renderNodeSync('minitickeritem',obj)
            ycontainer.prepend( vnode2 );
        }
    }
}

export { TickerTape }