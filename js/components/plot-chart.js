

class PlotChart extends HTMLElement {

    constructor() {
        super();
        this.render();
        var mem_df = {}
        var memhash = {}
        var memobj = {}
        var arra;
        var xlayout = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                showgrid: true,
                zeroline: false
            },
            yaxis: {
                showline: true
            },
            margin:{'t': 0 , 'b':12 , 'l':0 ,'r':0}
        };

        var official_base ='https://api.apdex.com'
        var official_base ='./data/'
        var official_base ='http://0.0.0.0:8851'
        if( window.location.host.includes("localhost") ){ official_base ='http://localhost:8851' }
        var requestURL = official_base+"/timehashes?selected=bars";

        $.ajax({
            url: requestURL,
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                //'selected': document.getElementById('first_cat').value
                'selected':'bars'
            },
            dataType:"json",
            success: function (data) {

                // CONVERT DATAFRAME JSON To PLOTCOMPATIBLE HERE:
                // x
                //obj = JSON.parse( data )
                
                /*
                var obj = data
                mem_df = obj
                arra = obj.nodes['binance-BTC/USD-close']

                var dat = [ {'x':Object.keys(arra).map(Number) ,
                    'y':Object.values(arra),
                    'line': {
                        color:'rgb(150, 212, 231)',
                        width: 0.3
                    }} ] ;
                Plotly.newPlot('bargraph',  dat , xlayout);
                */
            }
        });

        // get all instruments update
        // latestinstruments --> Query with Vector  X Y Z
        // cass.segment( [ x,y,z] )
        // returns JSON with
        // [
        //    {  'symbol':
        // instruments_arr
        // ajax.onComplete = function( data ){
        //     tickertapeview.update( data )
        //     gridstackview.update( data )
        //     timegraphview.update( data )
        //
        $('#first_cat').on('change',function(){

        })
        /*
        var myVar = setInterval(myTimer, 1000);
        function myTimer() {
            $.ajax({
                url: requestURL,
                type: "GET",
                contentType: 'application/json;charset=UTF-8',
                data: {
                    //'selected': document.getElementById('first_cat').value
                    'selected':'bars'
                },
                dataType:"json",
                success: function(data) {

                    // CONVERT DATAFRAME JSON To PLOTCOMPATIBLE HERE:
                    // obj = data
                    // arra = obj.nodes['binance-BTC/USD-ask']

                    var fres = data.nodes['binance-BTC/USD-ask']
                    var orig = mem_df.nodes['binance-BTC/USD-ask']
                    var only_fresh = _.difference( Object.keys(fres) , Object.keys(orig) )
                    // console.log( fres ) // console.log( orig ) // console.log( only_fresh )

                    arra = {}
                    for( x in only_fresh ){
                        arra[ only_fresh[x] ]=fres[ only_fresh[x]]
                    }
                    console.log('arra shipipng:')
                    console.log( arra )
                    dat = { 'x':[Object.keys(arra).map(Number)]  ,
                        'y':[Object.values(arra) ] } ;

                    mem_df.nodes['binance-BTC/USD-ask'] = Object.assign( {} , orig, fres )

                    //Plotly.newPlot('bargraph',  dato , xlayout);
                    Plotly.extendTraces('bargraph', dat, [0] )
                }
            }); 
        } */


    }
    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.render();
    }
    render() {
        this.innerHTML= `
            <style>
                @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                .myelspan {
                    background-color: #FFF;
                    font-size:30px;
                    border-radius: 5px;
                    box-shadow: 0 0 5px #dadada;
                    position: relative;
                    min-height: 100px;
                    font-family: 'Roboto Condensed', sans-serif;
                    border: solid orange 4px;
                }            
            </style>
            <div id="bargraph" style="overflow:hidden; height:270px; margin-top:3px; background-color:#222222; "></div>
        `;
    }
}

customElements.define('plot-chart', PlotChart);