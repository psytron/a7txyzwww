



import { platform } from "../x_modules/util/platform.js"
//import VanillaQR from "./web_modules/vanillaqr.js"
import { TickerTape } from '../x_modules/apps/tickertape/tickertape.js'



console.log(' dyn module ')
/*
var qr = new VanillaQR({
    url: "https://apdex.com/connect",
    size: 140,
    colorLight: "#00000000",
    colorDark: "#EEEEFF",
    toTable: false,//output to table or canvas
    ecclevel: 1,//Ecc correction level 1-4
    noBorder:true,//Use a border or not
    borderSize: 0//Border size to output at
});
//Canvas or table is stored in domElement property
document.body.querySelector('#qr').appendChild(qr.domElement); */
//console.log( platform.domain() )
document.body.querySelector("#logo").innerHTML='<img src="/img/'+platform.domain()+'.png" style="width:85px;"></img>'

//document.body.querySelector("#logo").innerHTML='<img src="img/'+platform.domain()+'.png" style="width:85px;"></img>'

var unit_price_1 = parseFloat( document.body.querySelector("#eth_price_1").innerHTML );
var unit_price_2 = parseFloat( document.body.querySelector("#eth_price_2").innerHTML );
var unit_price_3 = parseFloat( document.body.querySelector("#eth_price_2").innerHTML );



var cb = new ccxt.coinbase();
var cb = new ccxt.binanceus();
// cb.fetchTicker('ETH/USD').then( function( obj ){
 
//     var close = obj.close;
//     // document.body.querySelector("#usd_price_1").innerHTML =' $'+ unit_price_1 * close;
//     // document.body.querySelector("#usd_price_2").innerHTML =' $'+ unit_price_2 * close; 
    
//     document.body.querySelector("#eth_price_1").innerHTML = ( 99 / close ).toFixed( 3 ) + ' ETH';
//     document.body.querySelector("#eth_price_2").innerHTML = ( 999 / close ).toFixed( 3 ) + ' ETH';
//     document.body.querySelector("#eth_price_3").innerHTML = ( 1999 / close ).toFixed( 3 ) + ' ETH';

// });

cb.fetchTickers().then( function( obj ){
    
    var close = obj['ETH/USD'].close;    
    document.body.querySelector("#eth_price_1").innerHTML = ( 99 / close ).toFixed( 3 ) + ' ETH';
    document.body.querySelector("#eth_price_2").innerHTML = ( 999 / close ).toFixed( 3 ) + ' ETH';
    //document.body.querySelector("#eth_price_3").innerHTML = ( 1999 / close ).toFixed( 3 ) + ' ETH';
    

    
    //document.body.querySelector("#eth_price_1").innerHTML = ( 99 / close ).toFixed( 3 ) + ' ETH';
    ///document.body.querySelector("#eth_price_2").innerHTML = ( 999 / close ).toFixed( 3 ) + ' ETH';
//     var inlist={ nodes:[ 
//         { price:0.456 , symbol:'USD/BTC' },
//         { price:116.0 , symbol:'ETH/BTC' },   
//         { price:116.0 , symbol:'ETH/BTC' },       
//         { price:0.456 , symbol:'USD/BTC' },
//         { price:116.0 , symbol:'ETH/BTC' },        
//         { price:987.9 , symbol:'USD/BTC' } ] }
    // (({ a, c }) => ({ a, c }))({ a:5, b:6, c:7 });
    
    //const arr = [{ id: '124', name: 'qqq' }, { id: '589', name: 'www' }, { id: '45', name: 'eee' }, { id: '567', name: 'rrr' } ];
    //var result = arr.map(({name, ...rest}) => ({...rest, title: name}) );
    //var obj2 = obj.map( ({close,...rest})=>({...rest, price:close}) );
    var markets_arr = Object.keys(obj).map( (key) => key ); // All 
    //var markets_arr = [ obj['ETH/USD'],obj['BTC/USD'],obj['POLY/USD'] ]; // some

    //var post_add = markets_arr.map( ( ob )=>( { diff:ob['close']/ob['bid'] , ...ob }) );
    
    var lxo = ['1INCH/USD','AAVE/USD','ATOM/USD','BAT/USD','BCH/USD','BTC/USD',
               'BTC/USDT', 'BTC/USDT','ETH/BTC', 'ETH/USD','COMP/USD','MKR/USD','ADA/USD',
               'LTC/USD',  'UNI/USD', 'YFI/USD', '1INCH/USD','MATIC/USD','DOGE/USDT']

    var mrks = {}
    for( var i in obj ){
        if( lxo.includes(i) ){
            mrks[i]=obj[i];
        } 
    }
    var inlist={ nodes:mrks }

    var tt = new TickerTape( { target:document.querySelector('#tapeholder') } );
    tt.buildTicker( inlist );     

});
console.log(' er ', ccxt )