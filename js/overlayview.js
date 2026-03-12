
OverlayView = function( initObj ){

    document.getElementById("df0").addEventListener("click", function(){
        controller.setMap({map:0});
    }.bind(this));
    document.getElementById("df1").addEventListener("click", function(){
        controller.setMap({map:1});
    }.bind(this));    //   F1    F2     F3
    document.getElementById("df2").addEventListener("click", function(){
        controller.toggleDrawer()
    }.bind(this));
    document.getElementById("df3").addEventListener("click", function(){
        controller.setMap({map:6});
    }.bind(this));
    document.getElementById("df4").addEventListener("click", function(){
        controller.saveMap();
    }.bind(this));
    document.getElementById("df5").addEventListener("click", function(){
        controller.addActor();
    }.bind(this));
    document.getElementById("df6").addEventListener("click", function(){
        controller.setMap({map:2});
    }.bind(this));


    var drawer = document.getElementById( 'slide_drawer')
    var drawer2 = document.getElementById( 'slide_drawer2')
    var drawer_open = 0;
    this.toggleDrawer=function(){
        //var y_vert = Math.round( Math.random() * 200 )
        //y_vert-= Math.round( Math.random() * 200 )
        if( drawer_open){
            drawer_open=0;
            TweenMax.to(drawer, 3, {top:-500 , ease:Expo.easeOut} );
            TweenMax.to(drawer2, 3, {bottom:-500 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{
            drawer_open=1;
            TweenMax.to(drawer, 3, {top:0 ,ease:Expo.easeOut});
            TweenMax.to(drawer2, 3, {top:0 ,ease:Expo.easeOut});
        }
    }

    window.addEventListener('load' , function( ev ){
        //$('#adder').bind("click", controller.setAction );
        // CONTROLS OVERLAY

        /*
        var gui = new dat.GUI( { autoplace:false, width:110 } );
        gui.close();
        gui.add( controller, 'V1', "APDEX-GEN" ).name("R V0.1");
        gui.add( controller, 'speed', -5, 5 ).name("SPEEE");
        gui.add({setMap : controller.setMap.bind(controller, {map:0})}, "setMap").name("MAP:0");
        gui.add({setMap : controller.setMap.bind(controller, {map:1})}, "setMap").name("MAP:1");
        gui.add({setMap : controller.setMap.bind(controller, {map:2})}, "setMap").name("MAP:2");
        gui.add({setMap : controller.setMap.bind(controller, {map:3})}, "setMap").name("MAP:3");
        gui.add({setCam : controller.setCam.bind(controller, {pos:0})}, "setCam").name("CAM TOP");
        gui.add({setCam : controller.setCam.bind(controller, {pos:1})}, "setCam").name("CAM F1");
        gui.add({setSort : controller.setSort.bind(controller, {sort:1})}, "setSort").name("SORT GRID");
        gui.add({setPacket : controller.setPacket.bind(controller, {sort:1})}, "setPacket").name("SEND Packet C");
        gui.add({setMode : controller.setMode.bind(controller, {mod:6})}, "setMode").name("Phase 1");
        gui.add({setAction : controller.setAction.bind(controller, {sort:1 , action:'yzero' ,map:'yzero'})}, "setAction").name("Y ZERO");
        gui.add({setAction : controller.setAction.bind(controller, {sort:1 , action:'demand' ,map:'demand'})}, "setAction").name("Demand Elastic");
        gui.add({setAction : controller.setAction.bind(controller, {sort:1 , action:'samples' ,map:'samples'})}, "setAction").name("Time Samples");
        gui.add({setMap : controller.setMap.bind(controller, {map:5  })}, "setMap").name("MAP STR");
        gui.add({setMap : controller.setMap.bind(controller, {map:5  })}, "setMap").name("MAP EXCH");
        gui.add({setMap : controller.setMap.bind(controller, {map:5  })}, "setMap").name("MAP USERS");
        gui.add({setMap : controller.setMap.bind(controller, {map:7  })}, "setMap").name("MAP:7");
        gui.add({setMap : controller.setMap.bind(controller, {map:8  })}, "setMap").name("MAP:8");
        gui.add({setMap : controller.setMap.bind(controller, {map:9  })}, "setMap").name("LOAD:LOC");
        gui.add({setMap : controller.setMap.bind(controller, {map:10 })}, "setMap").name("LOAD:HF");
        gui.add({setMap : controller.setMap.bind(controller, {map:11 })}, "setMap").name("LOAD:NET");
        gui.add({setMap : controller.setMap.bind(controller, {map:13 })}, "setMap").name("CLR FRAME")
        */


    })





}