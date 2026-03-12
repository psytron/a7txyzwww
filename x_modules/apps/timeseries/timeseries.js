import { createChart } from '../../../web_modules/lightweight-charts.js';
import { Elx } from '../../../x_modules/elx.js';
import { factory2d } from '../../../factory/factory2d.js'
class Timeseries extends Elx{

    constructor( initObj ) {
        super( initObj )
        //container_in.insertAdjacentHTML( 'beforeend' , factory2d.renderSync( 'timeseries', dat ) );
        var k = 3
        var r = 2
        var obj = initObj.data;


        var vnode = factory2d.renderNodeSync( 'timeseries', obj.data )
        this.container = initObj.target;
        
        this.chart = createChart( vnode.querySelector('#linechart') , { width:660, height:280 });
        initObj.target.appendChild( vnode )

        var w = vnode.querySelector('#linechart').offsetWidth
        var h = vnode.querySelector('#linechart').offsetWidth
        this.chart.resize(w , 280);        


        this.chart.applyOptions({
            grid: {
                vertLines: {
                    color: 'rgba(30, 30, 240, 1.0)',
                    style: 1,
                    visible: true,
                },
                horzLines: {
                    color: 'rgba(70, 30, 250, 1.0)',
                    style: 1,
                    visible: true,
                },
            },
            layout: {
                backgroundColor: '#1111FF33',
                textColor: '#CCCCEE'
            }
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
        

        
        var seg_arr=this.getGeneratedTimeSeries()
        this.lineSeries = this.chart.addLineSeries();
        //lineSeries.setData( seg_arr )
        
        // var moc_arr = [
        //     { time: '2019-02-11', value: 20.01 },
        //     { time: '2019-03-11', value: 40.01 },
        //     { time: '2019-04-11', value: 80.01 },
        //     { time: '2019-04-12', value: 96.63 },
        //     { time: '2019-04-13', value: 76.64 },
        //     { time: '2019-04-14', value: 81.89 },
        //     { time: '2019-04-15', value: 74.43 },
        //     { time: '2019-04-16', value: 80.01 },
        //     { time: '2019-04-17', value: 96.63 },
        //     { time: '2019-04-18', value: 76.64 },
        //     { time: '2019-04-19', value: 81.89 },
        //     { time: '2019-04-20', value: 74.43 },
        //     { time: '2019-04-21', value: 80.01 },
        //     { time: '2019-04-22', value: 96.63 },
        //     { time: '2019-04-23', value: 76.64 },
        //     { time: '2019-04-24', value: 81.89 },
        //     { time: '2019-04-25', value: 74.43 },
        //     { time: '2019-04-26', value: 80.01 },
        //     { time: '2019-04-27', value: 96.63 },
        //     { time: '2019-04-28', value: 76.64 },
        //     { time: '2019-04-29', value: 81.89 }
        // ]
        
        //this.lineSeries.setData(seg_arr );
        
        //this.chart.timeScale().fitContent();    

        var chart_conf_obj =  {
            width: window.innerWidth - 100,
            height: window.innerHeight /2,
            autoSize: true,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25
                }
            },
            layout: {
                backgroundColor: "#131722",
                textColor: "#d1d4dd",
                background: {
                    color: '#000000'
                }
            },
            grid: {
                vertLines: {
                    color: "rgba(42, 46, 57, 0)"
                },
                horzLines: {
                    color: "rgba(42, 46, 57, 0.6)"
                }
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                fixLeftEdge: false ,// Allow zooming past the first data point
                fixRightEdge: false ,
                ticksVisible: true,
                minBarSpacing: 0.01  // Limits maximum zoom out so set this lower for birds eye on big dataset 
            }
        }

        var loadedFrame = {}
        var lineSeriesMap = {}; // Store references to LineSeries

        setInterval(function() {
            fetch('/jso')
                .then(response => response.json())
                .then( function( newData ) {
                    var data = newData;          
    
                    //let chartContainer = document.getElementById('lightweight');
                    //let chart = chartContainer.lightweightChart;
                    var chart = this.chart;

    
                    for (let key in data) {
                        let lineSeries = lineSeriesMap[key];
                        if (!lineSeries) {
                            
                            var clr;
                            try{
                                //clr = '#FF00FF' // 
                                //'#' + Math.floor(Math.random()*16777215).toString(16)
                                clr = '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
                            }catch( e ){
                                clr = '#FF00FF'
                            }
                            lineSeries = chart.addLineSeries({
                                title: key , // Set the title of the line series
                                color: clr ,
                                lineWidth: Math.random() * (2 - 0.1) + 0.2
                            
                            });
                            // title: 'My Line Name'
                            chart.timeScale().fitContent()
                            lineSeriesMap[key] = lineSeries;
                            
                        }
    
                        var series = data[key]
                        if( series ){
                            var seriesData =[]

    
                            for( var s in  series ){
                                var item = series[s]
                                var itemtime = new Date(item.time)
                                itemtime = itemtime.getTime() / 1000;
                                var sobj = { time: itemtime, value: item.value };
                                seriesData.push(  sobj );
                            }
                            lineSeries.setData( seriesData );

                            const markers = [
                                {
                                    time: { year: 2024, month: 4, day: 20 , hour:1 },
                                    position: 'aboveBar',
                                    color: '#f684FF',
                                    shape: 'circle',
                                    text: 'X11d ETCT',
                                },
                                {
                                    time: { year: 2024, month: 4, day: 20 , hour:14 },
                                    position: 'belowBar',
                                    color: '#f6FF10',
                                    shape: 'square',
                                    text: 'AX12 4#R5',
                                }                                
                            ];
                            lineSeries.setMarkers(markers);
                        }//for
                        //chart.timeScale().fitContent()
                    }
                }.bind(this))
                .catch(error => console.error('Error:', error));
                
        }.bind(this), 30000); // Poll every 5 seconds        
    }
    getGeneratedTimeSeries(){
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

        return seg_arr
    }
    timeSeries( data_in ){

        var seg_arr = this.getGeneratedTimeSeries()
        var translated_series = []
        for( var i in data_in.payload ){
            let sample = data_in.payload[i]
            // THIS wasn't working:
            // new Date(sample[0]).toLocaleTimeString('en-GB', { timeZone: 'UTC' }) 
            // github suggested switch to unix timestamp: 
            translated_series.push( { time:sample[0]/1000, value:sample[3] } );
        }
        //const lineSeries = this.chart.addLineSeries();
        // YOU ARE HERE: 
        // THIS UPDATED SERIES IS NOT RENDERING FOR SOME REASON 
        // RED ERRORS ARE JAMMING UP stream 
        this.lineSeries.setData( translated_series );
        //this.lineSeries.update( translated_series );

        this.chart.timeScale().fitContent();  
    }    
    onDataUpdate( data_in ){

        console.log(" onDataUpdate From Fabric Hopefully ? ")
    }

}

export { Timeseries }


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