import { createChart } from '../../../web_modules/lightweight-charts.js';
import { Elx } from '../../../x_modules/elx.js';
import { factory2d } from '../../../factory/factory2d.js'
class Cex extends Elx{

    instanceField = 'instance field'

    constructor( initObj ) {
        super( initObj )
        //container_in.insertAdjacentHTML( 'beforeend' , factory2d.renderSync( 'timeseries', dat ) );
        var k = 3
        var r = 2
        var obj = initObj.data;
        this.magnificentSeven = 7; 


        var vnode = factory2d.renderNodeSync( 'cex', obj.data )
        this.container = initObj.target;
        
        this.chart = createChart( vnode.querySelector('#linechart') , { width:660, height:280 });
        initObj.target.appendChild( vnode )

        var w = vnode.querySelector('#linechart').offsetWidth
        var h = vnode.querySelector('#linechart').offsetWidth
        this.chart.resize(w , 280);        

        this.chart.applyOptions({
            layout: {
                backgroundColor: '#11119933',
                textColor: '#CCCCEE'
            },
        });
        this.chart.applyOptions({
            grid: {
                vertLines: {
                    color: 'rgba(30, 30, 180, 0.7)',
                    style: 1,
                    visible: true,
                },
                horzLines: {
                    color: 'rgba(70, 30, 190, 0.6)',
                    style: 1,
                    visible: true,
                },
            },
        });        
        this.chart.applyOptions({
            priceScale: {
                //position: 'left',
                //mode: 2,
                autoScale: true,
                //invertScale: true,
                //alignLabels: false,
                //borderVisible: false,
                //borderColor: '#555ffd',
                scaleMargins: {
                    top: 0.30,
                    bottom: 0.25,
                },
            },
        });        
        

        const options = {  year: 'numeric', month:'numeric',day: 'numeric' };
        var seg_arr=[];
        var d = new Date();
        var last_value=99;
        d.setDate(2)
        for ( var i=0; i<30; i++){
            d.setDate( i+1 )
            var ll =  d.toLocaleDateString( undefined , options )
            //var nl = nd.toLocaleDateString(undefined, options);
            var nz = d.toLocaleDateString(undefined, options);

            seg_arr.push({
                time:nz,
                value:last_value
            })
            last_value = last_value + (Math.random()*5)-(Math.random()*5)
        }
        //const lineSeries = this.chart.addLineSeries();
        //lineSeries.setData( seg_arr )
        
        var moc_arr = [
            { time: '2019-02-11', value: 20.01 },
            { time: '2019-03-11', value: 40.01 },
            { time: '2019-04-11', value: 80.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
            { time: '2019-04-21', value: 80.01 },
            { time: '2019-04-22', value: 96.63 },
            { time: '2019-04-23', value: 76.64 },
            { time: '2019-04-24', value: 81.89 },
            { time: '2019-04-25', value: 74.43 },
            { time: '2019-04-26', value: 80.01 },
            { time: '2019-04-27', value: 96.63 },
            { time: '2019-04-28', value: 76.64 },
            { time: '2019-04-29', value: 81.89 }
        ]
        
        //lineSeries.setData(seg_arr );
        
        //this.chart.timeScale().fitContent();    
    }
    fetchBalance( obj ){

        console.log('balancesx finally in obj ')
        console.log( obj )
        var holdr = this.container.querySelector('#balanceListHolder');
        holdr.innerHTML = "";
        for( var i in obj.total ){
            // console.log( f , obj.free[f] )
            if( obj.total[i] >0){
                console.log(' avail : ',i , obj.total[i] )
                holdr.insertAdjacentHTML( 'beforeend','<div class"balobj" style="color:white">'+i+':'+obj.total[i]+'</div>');
            }
        }
    }
    pricedBalances( obj ){

        // hybrid composit from fabric combines prices and balances 
        // 
        console.log( obj )
        var l = 3;

        var holdr = this.container.querySelector('#balanceListHolder');
        holdr.innerHTML = "";
        for( var i in obj.payload ){
            // console.log( f , obj.free[f] )
            var bnode = obj.payload[i]
            holdr.insertAdjacentHTML( 'beforeend','<div class"balobj" style="color:white; font-size:10px;">'+i+':'+bnode.balance+ '  USD Unit Cost: '+bnode.usd_cost+' :    Asset Holdings Value: ' + bnode.usd_value +'</div>');
            if( bnode >0 ){
            //    console.log(' avail : ',i , obj.total[i] )
                
            }
        }
    }
    onDataUpdate( data_in ){

        var k = 9;
        console.log(' data update in CDEX module ')

    }
    timeSeries( data_in ){

        const options = {  year: 'numeric', month:'numeric',day: 'numeric' };
        var seg_arr=[];
        var d = new Date();
        var last_value=99;
        d.setDate(2)
        for ( var i=0; i<30; i++){
            d.setDate( i+1 )
            var ll =  d.toLocaleDateString( undefined , options )
            //var nl = nd.toLocaleDateString(undefined, options);
            var nz = d.toLocaleDateString(undefined, options);

            seg_arr.push({
                time:nz,
                value:last_value + i*2
            })
            last_value = last_value + (Math.random()*5)-(Math.random()*5)
        }

        var translated_series = []
        for( var i in data_in.payload ){
            let sample = data_in.payload[i]
            // THIS wasn't working:
            // new Date(sample[0]).toLocaleTimeString('en-GB', { timeZone: 'UTC' }) 
            // github suggested switch to unix timestamp: 
            translated_series.push( { time:sample[0]/1000, value:sample[3] } );
        }
        const lineSeries = this.chart.addLineSeries();
        // YOU ARE HERE: 
        // THIS UPDATED SERIES IS NOT RENDERING FOR SOME REASON 
        // RED ERRORS ARE JAMMING UP stream 
        lineSeries.setData( translated_series );

        this.chart.timeScale().fitContent();  
    }    

    specialFunc( o ){
        console.log('special func ')
    }

}

export { Cex }


//var sizespec = this.container.getBoundingClientRect()
//var offsetwidth = this.container.offsetWidth;
//console.log( offsetwidth )
/*
DOMRect {
    bottom: 177,
    height: 54.7,
    left: 278.5,​
    right: 909.5,
    top: 122.3,
    width: 631,
    x: 278.5,
    y: 122.3,
}*/