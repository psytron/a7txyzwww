function createTextCanvas(text, color, font, size) {
    size = size || 36;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var fontStr = (size + 'px ') + (font || 'Arial');
    ctx.font = fontStr;
    var w = ctx.measureText(text).width;
    var h = Math.ceil(size);
    canvas.width = w;
    canvas.height = h;
    ctx.font = fontStr;
    ctx.fillStyle = color || 'white';
    ctx.fillText(text, 0, Math.ceil(size * 0.8));
    return canvas;
};
function createText2D(text) {
    // try this flat text? ? https://codepen.io/anon/pen/QamPrY
    // var canvas = createTextCanvas(text, "#FF8888", "Helvetica", 45);
    var canvas = createTextCanvasX(text, "#FF8888", "Helvetica", 45);

    var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, 100, 100);
    var tex = new THREE.CanvasTexture( canvas );//var tex = new THREE.Texture(canvas);// R95 update
    tex.needsUpdate = true;
    var planeMat = new THREE.MeshBasicMaterial({  map: tex,          height:400,         width:500,
                                                  color: 0x999999,   transparent: true });
    return new THREE.Mesh(plane, planeMat);
};
this.makeTextSprite=function( message, parameters ){
    var canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    var context = canvas.getContext('2d');
    context.font = "130px Helvetica";
    context.fillStyle   = "#111155;";
    context.fillStyle = "rgba(33,53,3,1.0)";
    context.fillText( this.HEADLINE_A , 0,120);
    context.fill();
    context.fillStyle ="#dbbd7a";
    context.font = "72px Helvetica";
    context.fill()
    context.fillStyle ="#888888";
    context.fillText( this.HEADLINE_C ,0,135);

    var texture = new THREE.CanvasTexture( canvas );
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture,
        sizeAttenuation:true,
        depthWrite:false } ); //R95 MAKES TRANSPARENT //var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false ,  transparent: true, depthWrite: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.position.set( 0 , 1, 0 );
    return sprite;
};
this.makeTextSpriteOg=function( message, parameters ){
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Helvetica";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] :88;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:233, g:233, b:233, a:1.0 };

    var canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;

    var context = canvas.getContext('2d');
    context.font = "" + 190 + "px " + fontface;
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    //context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( this.HEADLINE_A , 0,94);
    context.fill();

    context.fillStyle ="#dbbd7a";
    context.font = "" +72 + "px " + fontface;
    //context.fillText( this.HEADLINE_B.toUpperCase() ,100,60);
    context.fill()
    context.fillStyle ="#888888";
    context.fillText( this.HEADLINE_C ,0,135);

    // R95
    var texture = new THREE.CanvasTexture( canvas );
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture,
                                                     sizeAttenuation:true,
                                                     depthWrite:false } ); //R95 MAKES TRANSPARENT //var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false ,  transparent: true, depthWrite: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.position.set( 0 , 1, 0 );
    return sprite;
};








        //this.model.setRoute( par )
        //this.model.setMap( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMode( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMode( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setAction( objIn );
        //this.model.setMap( 3 );
        //this.model.setAction( objIn );
        //this.model.setMap( 6 );
        //this.model.loadDataLocalHalf( {} );
        //this.model.loadDataNetwork( {} );
        //this.model.saveMap();
        //this.model.setMap( objIn.map)
        //break;


            /*
    this.setMap = function( objIn ){
        switch( objIn.map){
            case 0:
                this.model.setMap( 0 );
                TweenMax.to( camera.position , 2.2 , { ease:Expo.easeInOut , delay:0 , y:70 , x:0 , z:320 } )
                //TweenMax.to( camera.rotation , 2.2 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0 , z:0 } )
                break;
            case 1:
                this.model.setMap( 1 );
                //this.model.setGridEnumerateIndexes();
                break;
            case 2:
                this.model.setMap( 2 );
                //this.model.setGridEnumerateIndexes();
                break;
            case 3:
                this.model.loadDataLocal( {} );
                break;
            case 9:
                this.model.loadDataLocal( {} );
                break;
            case 10:
                this.model.loadDataLocalHalf( {} );
                break;
            case 11:
                this.model.loadDataNetwork( {} );
                break;
            case 13:
                this.model.clearData( {} );
                break;
            case 6:
                this.model.setGridEnumerateIndexes();
                this.model.setMap( objIn.map)
                break;
            default:
                this.model.setMap( objIn.map)
                break;
        };
    };*/






        //this.model.setRoute( par )
        //this.model.setMap( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMode( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMode( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 1 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setMap( 2 );
        //this.model.setGridEnumerateIndexes();
        //this.model.setAction( objIn );
        //this.model.setMap( 3 );
        //this.model.setAction( objIn );
        //this.model.setMap( 6 );
        //this.model.loadDataLocalHalf( {} );
        //this.model.loadDataNetwork( {} );
        //this.model.saveMap();
        //this.model.setMap( objIn.map)
        //break;
        /*
        switch( objIn.map){
            //case 0:
                //this.model.setMap( 0 );
                //TweenMax.to( camera.position , 2.2 , { ease:Expo.easeInOut , delay:0 , y:70 , x:0 , z:320 } )
                //TweenMax.to( camera.rotation , 2.2 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0 , z:0 } )
                this.model.setMap( 1 );
                //this.model.setGridEnumerateIndexes();
                this.model.setMap( 2 );
                //this.model.setGridEnumerateIndexes();
                this.model.loadDataLocal( {} );
                this.model.loadDataLocal( {} );
                this.model.loadDataLocalHalf( {} );
                this.model.loadDataNetwork( {} );
                this.model.clearData( {} );
                this.model.setGridEnumerateIndexes();
                this.model.setMap( objIn.map)
                this.model.setMap( objIn.map)
                break;
        };        */





        
        /* // PREVIOUS LAYOUT UPDATE  TRANSFER 
        for (var key in this.node_sprites) {
            var cube = this.node_sprites[key];
            var pos = this.layout.getNodePosition(key);
            cube.position.x = pos.x;
            cube.position.y = pos.y;
            cube.position.z = pos.z;
            cube.update()
        }*/



        // mesh.material.colorWrite = false; // <================= new
        // mesh.material.visible = false;
        // mesh.renderOrder = 0; // <===== new
        // PLANE
        //var geo = new THREE.PlaneBufferGeometry( spanl*2, spanl*2, 8, 8 ); //giant plane




        /*  // PLUS BUTTON ON BOTTOM
        var loader = new THREE.TextureLoader(); // Create a texture loader so we can load our image file
        var mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5),
            new THREE.MeshLambertMaterial({map: loader.load('/static/img/addbutton.png') }) );// combine our image geometry and material into a mesh// Load an image file into a custom material
        mesh.position.set(0,-99.9,0)
        mesh.material.color.set( 0x0000ff );
        mesh.material.color = new THREE.Color( 0xFF0000 ); //Hexadecimal color (recommended)
        mesh.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.subspace.add( mesh ); */


        /* // JAPANESE BANNER:
        var loader = new THREE.TextureLoader(); // Create a texture loader so we can load our image file
        var mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(125, 25),
            new THREE.MeshLambertMaterial({map: loader.load('/static/img/jbanner.jpg') }) );// combine our image geometry and material into a mesh// Load an image file into a custom material
        mesh.position.set(0,-101.9,50)
        mesh.material.color.set( 0xFFFFFF );
        mesh.material.color = new THREE.Color( 0xFFFFFF ); //Hexadecimal color (recommended)
        mesh.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.subspace.add( mesh );
        */

        /*
        var loader = new THREE.TextureLoader(); // Create a texture loader so we can load our image file
        var p = new THREE.Mesh(
            new THREE.PlaneGeometry(200,200,4,4),
            new THREE.MeshLambertMaterial({map: loader.load('/static/img/viewfloor_og.png' ,function ( texture ) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.offset.set( 0, 0 );
                    texture.repeat.set( 16, 16 );

            }  ) }) );// combine our image geometry and material into a mesh// Load an image file into a custom material
        p.position.set(0,-0.01,0)
        p.material.color.set( 0xFFFFFF );
        p.material.color = new THREE.Color( 0xFFFFFF );
        p.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        p.visible = true;
        this.subspace.add( p );
        this.plane = p; */


        
        
        /*// COORDINATE PLANE
        var spanl=300
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     spanl));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( spanl, 0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     20 ,   0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     -spanl));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( -spanl,0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     20,    0));
        material = new THREE.LineBasicMaterial( { color:axis_color , linewidth:1 } );
        xyzline = new THREE.Line(geometry, material);
        this.add(xyzline); */



    this.onDataUpdateWRK2 = function (e){
        var model = e.detail.model;
        this.model = e.detail.model;
        //this.layout = require('.')(model.graph , physicsSettings );
        //var physicsSettings = { springLength:60, gravity: -0.01,   theta:0.8, integrator: 'euler',//'verlet'
        //                    springCoeff:0.0008, dragCoeff:0.02, timeStep:20 };
        //this.layout = isostack.createLayout( model.graph , physicsSettings );
        this.layout = this.model.layout;
        //Window.simulator = this.layout.simulator.settings;
        //Window.layout = this.layout

  
        model.graph.forEachNode(function (node) {
            //var pos = this.layout.getNodePosition(node.id);
            //var node_data = node.data;
            //console.log( node , 'node data: ', node_data )
            // Comment june 19
            //node_data.body = this.layout.getBody( node.id )
            if( node.data && (node.id in this.node_sprites == false )  ){
                node.data['plane'] = this.plane;
                var cur_sprite = new AvatarX( node.data );
                node.data.sprite = cur_sprite;
                this.node_sprites[node.id] = cur_sprite;
                this.subspace.add( cur_sprite );
            }
        }.bind(this));

        model.graph.forEachLink( function( link ){
            if( link.fromId && (link.id in this.link_sprites == false )) {
                link.mesh = this.subspace;
                var newlink = new Linkx( link );
                this.link_sprites[link.id] = newlink
            }
        }.bind(this))

        // TEST TRIGGER AFTER ATTACHED SPRITES 
        //controller.setMap({map:6});
        //controller.setRoute('select/map/6');


        // UPDATE PHYSICS SETTINGS BASED ON DENSITY 
        //var node_count = model.graph.getNodesCount()
        //this.layout.simulator.springLength=30+(node_count/3);
        //physicsSettings.springLength=30+(node_count/3);


    }.bind(this)
    this.onDataUpdateOG_WORKING = function (e){
        var model = e.detail.model;
        //this.layout = require('.')(model.graph , physicsSettings );
        this.layout = isostack.createLayout( model.graph , physicsSettings );
        Window.simulator = this.layout.simulator.settings;
        Window.layout = this.layout

        model.graph.forEachNode(function (node) {
            //var pos = this.layout.getNodePosition(node.id);
            var node_data = node.data;
            console.log( node , 'node data: ', node_data )
            node_data.body = this.layout.getBody( node.id )
            if( node_data && (node.id in this.node_sprites == false )  ){
                node_data.plane = this.plane;
                var cur_sprite = new AvatarX( node_data );
                node.data.sprite = cur_sprite;
                this.node_sprites[node.id] = cur_sprite;
                this.subspace.add( cur_sprite );
            }
        }.bind(this));

        model.graph.forEachLink( function( link ){
            if( link.fromId && (link.id in this.link_sprites == false )) {
                link.mesh = this.subspace;
                var newlink = new Linkx( link );
                this.link_sprites[link.id] = newlink
            }
        }.bind(this))

        // TEST TRIGGER AFTER ATTACHED SPRITES 
        //controller.setMap({map:6});
        //controller.setRoute('select/map/6');

        var node_count = model.graph.getNodesCount()
        this.layout.simulator.springLength=30+(node_count/3);
        physicsSettings.springLength=30+(node_count/3);


    }.bind(this)    


// query auto complete // 
// http://suggestqueries.google.com/complete/search?&output=toolbar&gl=us&hl=en&q=x%20vs.




// FROM AVATARX ThinDOwn:

    /*
    this.onUpEvent=function( ev ){
        stop()
        controls.enabled = true;
        document.removeEventListener('mouseup' , this.onUpEvent );
    }
    function getIntersection( ev ){
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [self] );//var intersects = raycaster.intersectObjects( ev.target , true );  // c , recursive
        for( var i =0; i<intersects.length; i++){

        };
        console.log( intersects.length )
        return intersects[0]
    }    
    function onMoveEvent( ev ){           
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [self] );//var intersects = raycaster.intersectObjects( ev.target , true );  // c , recursive
        if( intersect.length>0){
            var delta_x = intersect.point.x - last_x
            var delta_z = intersect.point.z - last_z
        }
        try{
            scroll_target.position.x += delta_x
            scroll_target.position.z += delta_z
        }catch(err){}   

        last_x = intersect.point.x
        last_z = intersect.point.z

    }*/

    // FROM CONTROLLER : 
    
    onAuthEventOG( e ){
        var action = e.detail.action;
        if( action == 'login'){
            this.connector.auth(e.detail).then( function( par ){
                
                this.model.setState(1)
                this.model.setSession( par )
                this.model.pushState( { 'type':'map' , 'title':'Project: Xynthx (GIT)' ,  'fragment':'qrx=MATCH(x0:Project)-[r0]-(x1:Repo)-[r1]-(x2:Alias)return x0,r0,x1,r1,x2'} )
            }.bind(this))
        }else{
            
            this.connector.logout().then( function( par){
                this.model.setState(0)
                this.model.pushState( e.detail )
            }.bind(this))
        }

        /* // DYNAMIC 'FN' on Buttons: 
        try{
            var mth = eval('this.connector.'+action )
            mth().then( function( par){ console.log(' auth promise runs: ', par ) })
        }catch(e){
            console.log(' dyn func attempt fail in ',this)
        }*/
        //this.model.setSession( {'wow':'weaowo'} )
        // this.model.setSessionOwner( cookie )
    }    



    // TEST METHODS
    mega(z){
        console.log(' X:',z)
    }
    ping(p){
        console.log(' P:',p)
    }

        /* // DYNAMIC 'FN' on Buttons: 
        try{
            var mth = eval('this.connector.'+action )
            mth().then( function( par){ console.log(' auth promise runs: ', par ) })
        }catch(e){
            console.log(' dyn func attempt fail in ',this)
        }*/
        //this.model.setSession( {'wow':'weaowo'} )
        // this.model.setSessionOwner( cookie )


// FROM DETAIL DISPLAY buildControls: 


        // console.log(  factory2d.render('basic',{a:'bonde008'})  )
        // var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        // var xcontainer = document.querySelector('ticker-tape').shadow
   
        //var allcons = this.con.querySelectorAll('.confpanelholder')

        //con1.insertAdjacentHTML( 'beforeend', this.headerTemplate( name_or_title ) )        
        // IF title becomes non input
        //name_or_title += ' <span style="color:grey;">( '+data_in.label+')</span>'
        // attach Components if they match the domain / 
        
        // non editable
        //con1.querySelector('#sectionheader').innerHTML= name_or_title || 'UNTYPED';
        // as input: 
        //con1.querySelector('#aliastype').value =name_or_title || 'UNTYPED';
        


        //con1.querySelector('#labelicon').value =name_or_title || 'UNTYPED';
        // PUT THIS LABEL SOMWHERE and ADD LISTENER: 
        //  this.model.focusobject.data.label

        //con1.querySelector('#aliasuuid').innerHTML= this.model.focusobject.data.uuid || 'no uuid';


        //startGlyph( { label:this.model.focusobject.data.label , holder:con1.querySelector('#glyphbox') } )
        //startGlyph( { label:this.model.focusobject.data.label , holder:con1.querySelector('#glyphbox') } )

        // COLUMN 2
        //con2.innerHTML = '';
        //con2.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'INPUTS' ) )


        // Insert SubItems: 
        /*
        for( var g in ['detail','func','rel'] ){
            var tmplt = factory2d.render('multiitem',{a:'bonde008'}) 
            con2.insertAdjacentHTML( 'beforeend', tmplt )
        }*/
        
        // COLUMN 3
        //con3.innerHTML = '';
        //con3.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'Custom Functions' ) )

        

            /*
        this.con.innerHTML = `
            <style>
                .confpanel{
                    width:32%;
                    min-width:300px; 
                    
                }
                .submenutitle{
                        font-size:14px;
                        color:white;
                        border: none;                        
                        outline: none;
                        background: transparent;
                        border: none transparent;
                        border-color: transparent;
                }        
                .noselect {
                  -webkit-touch-callout: none; //iOS Safari 
                    -webkit-user-select: none; // Safari 
                     -khtml-user-select: none; // Konqueror HTML 
                       -moz-user-select: none; // Old versions of Firefox 
                        -ms-user-select: none; // Internet Explorer/Edge 
                            user-select: none; // Non-prefixed version, currently
                                                  supported by Chrome, Edge, Opera and Firefox 
                }                             
            </style>
            <div id="slide_drawer" style="position:absolute; display:flex; width:100%; height:4%; top:-600px; text-align:right; background:rgba(0,0,0,0.5);">
                <input type='text' id='mapname' class='submenutitle' style="" value="MAP NAME"></input>
            </div>
            <div id="slide_drawer2" class='noselect' style="position:absolute; width:100%; height:300px; bottom:-600px; background:rgba(0,0,0,0.6); padding-top:3px; border-top:solid #223322 1px;">
                <div class="container" style="">
                    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; ">
                        
                        <div class="confpanel">
                            <div class="confpanelholder"></div>
                        </div>
                        
                        <div class="confpanel">
                            <div class="confpanelholder"></div>
                        </div>
                        
                        <div class="confpanel">
                            <div class="confpanelholder"></div>
                        </div>

                    </div>    
                </div>
            </div>`;            
            */
        // UI ELEMENTS 
        //this.term = $( this.querySelector("#overflowterm") ) 
        //this.termb = this.querySelector("#overflowterm")

        




















    this.buildControlsWorks=function( data_in ){
        
        // Git Repo
        //    show full URL
        //    show commits ,
        //    show contributors
        // .  show Credential / Key 

        // Exchange 
        // .  Domain 
        //    Access Credential / Key being used partial 
        // .  Aggregate Stats ? Aux Knowledge ? News ? 
        // .  News Bubble from Asset , into asset ? 

        // Alias
        // .  Keylist 
        // .  Name of Alias
        // .  

        // console.log(  factory2d.render('basic',{a:'bonde008'})  )
        // var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        // var xcontainer = document.querySelector('ticker-tape').shadow
   
        var allcons = this.con.querySelectorAll('.confpanelholder')
        var con1 = allcons[0] 
        //var con1 = this.con.querySelector('#glyphholder')
        var con2 = allcons[1]
        var con3 = allcons[2]

        // COLUMN 1
        var name_or_title = data_in.name || data_title.title || ' '
        name_or_title += ' ('+data_in.label+')'
        
        con1.innerHTML='';
        con1.insertAdjacentHTML( 'beforeend', this.headerTemplate( name_or_title ) )
        con1.insertAdjacentHTML( 'beforeend', factory2d.render('qr', data_in )  )

        
        // IF title becomes non input
        //name_or_title += ' <span style="color:grey;">( '+data_in.label+')</span>'
        
        // non editable
        //con1.querySelector('#sectionheader').innerHTML= name_or_title || 'UNTYPED';
        // as input: 
        //con1.querySelector('#aliastype').value =name_or_title || 'UNTYPED';
        con1.querySelector('#glyphbox').src = 'models2d/'+data_in.label+'.png' || 'UNTYPED';

        //con1.querySelector('#labelicon').value =name_or_title || 'UNTYPED';
        // PUT THIS LABEL SOMWHERE and ADD LISTENER: 
        //  this.model.focusobject.data.label

        //con1.querySelector('#aliasuuid').innerHTML= this.model.focusobject.data.uuid || 'no uuid';
        
        con1.querySelector('#supereditabletitle').addEventListener('input', function(e){
            console.log('what input',e.target.value,data_in.uuid, this.model )

            this.model.updateObject( data_in.uuid , { name:e.target.value } )
        }.bind(this))

        //startGlyph( { label:this.model.focusobject.data.label , holder:con1.querySelector('#glyphbox') } )
        //startGlyph( { label:this.model.focusobject.data.label , holder:con1.querySelector('#glyphbox') } )

        // COLUMN 2
        con2.innerHTML = '';
        con2.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'INPUTS' ) )
        con2.insertAdjacentHTML( 'beforeend', factory2d.render('anglezone',{a:'list sigs'})  )

        // Insert SubItems: 
        for( var g in ['detail','func','rel'] ){
            var tmplt = factory2d.render('multiitem',{a:'bonde008'}) 
            con2.insertAdjacentHTML( 'beforeend', tmplt )
        }
        
        // COLUMN 3
        con3.innerHTML = '';
        con3.insertAdjacentHTML( 'beforeend', this.headerTemplate( 'Custom Functions' ) )
        con3.insertAdjacentHTML( 'beforeend', factory2d.render('greenlogo',{a:'bonde008', price:'bonde008',symbol:'XLES',label:'2j29'})  )        
        con3.querySelector('#closebuttonxl').addEventListener('click', function(event) {
            window.controller.setFocusObject( false )
            window.dispatchEvent( new CustomEvent( 'focusRemovedEvent' , { detail:{} }) )
        })

    }

    
    /*
    this.updateTossScroll=function(){
        if( runstate == 'loading'){
            requestAnimationFrame( this.updateTossScroll )
            if( new Date().getMilliseconds() >500){
                printTerm(' Load DX: '+Math.random()*1000+new Date() )
            }else{
                printTerm('::')
            }
        }else
        {
            printTerm(' LOAD XE: Complete: '+new Date() )
            _time = 0.0;
        }
    }
    this.printTerm=function( message_in ){
        
        var output_message = this.iter+':'+message_in;
        this.termb.innerHTML+= "<div class='loggert'>"+output_message+"</div>"  
        this.termb.removeChild( this.termb.firstChild )
        this.iter++;
    } */   








        //var con1 = allcons;
        var name_or_title = data_in.name || data_title.title || ' '
        name_or_title += ' ('+data_in.label+')'

        /*
        function myFunction(item, index) 
        { 
            console.log(item); 
        }

        for ( var c in caplist ){
            //var ticker = selfContain( c , data_in )
            var dd = 3;
            con1.insertAdjacentHTML( 'beforeend', factory2d.render( c, data_in )  )
        }*/        

        //con1.insertAdjacentHTML( 'beforeend', factory2d.render('qr', data_in )  )
        //con1.insertAdjacentHTML( 'beforeend', factory2d.render('anglezone', data_in )  )
        //con1.insertAdjacentHTML( 'beforeend', factory2d.render('greenlogo', data_in ) )              





        /*
        if( model.focusobjecttype == 1){
            var fromObj = model.getNodeByUUID( obj.fromId )
            var toObj = model.getNodeByUUID( obj.toId )
            
            this.newComponent( con1 ,  caplist[0] , fromObj.data , 'some_id1')
            this.newComponent( con1 ,  caplist[0] , obj.data , 'some_id1')
            this.newComponent( con1 ,  caplist[0] , toObj.data , 'some_id1')

            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[0] , fromObj.data ) )
            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[1] , obj.data ) )
            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[2] , toObj.data ) )
            
            

            // ADD TWO GLYPHS 
            con1.querySelectorAll('#glyphbox')[0].src = 'models2d/'+fromObj.data.label+'.png' || 'UNTYPED';
            con1.querySelectorAll('#glyphbox')[1].src = 'models2d/'+toObj.data.label+'.png' || 'UNTYPED';
        }else{
            
            caplist.forEach( function(item, index){
                con1.insertAdjacentHTML( 'beforeend', factory2d.render( item, obj.data )  )
            }); 
            // ADD IMAGE GLYPH
            con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';

        } */


        // DIRECT WRAPs 
        //con1.insertAdjacentHTML( 'beforeend' , '<qr-panel id="qr"></qr-panel>' )
        //var app_ref = con1.querySelector('#qr');
        //app_ref.init( obj.data )
        

        // WORKING PANELS NO COMPONENTS 
        /*
        if( model.focusobjecttype == 1){
            var fromObj = model.getNodeByUUID( obj.fromId )
            var toObj = model.getNodeByUUID( obj.toId )
            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[0] , fromObj.data ) )
            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[1] , obj.data ) )
            con1.insertAdjacentHTML( 'beforeend' , factory2d.render( caplist[2] , toObj.data ) )
            
            con1.querySelectorAll('.xferarrow').forEach( function( div ){ 
                var cl = '#'+ obj.sprite.color.toString(16);
                div.style.borderRight = '12px solid '+cl;
                div.style.borderBottom = '12px solid '+cl;
                console.log(' wow ')

            })            
            // ADD TWO GLYPHS 
            con1.querySelectorAll('#glyphbox')[0].src = 'models2d/'+fromObj.data.label+'.png' || 'UNTYPED';
            con1.querySelectorAll('#glyphbox')[1].src = 'models2d/'+toObj.data.label+'.png' || 'UNTYPED';
        }else{
            caplist.forEach( function(item, index){
                con1.insertAdjacentHTML( 'beforeend', factory2d.render( item, obj.data )  )
            }); 
            // ADD IMAGE GLYPH
            con1.querySelector('#glyphbox').src = 'models2d/'+label+'.png' || 'UNTYPED';

            // EXPERIMENT TO LOAD NESTED COMPONENTS 
            //var requestURL = "/data/comodhashes.json";
            //$.ajax({
            //    url: requestURL,
            //    type: "GET",
            //    contentType: 'application/json;charset=UTF-8',
            //    data: {'selected':'bars'},
            //    dataType:"json",
            //    success:function ( data){
            //        con1.insertAdjacentHTML( 'beforeend', '<ticker-tape id="tickertape2"></ticker-tape>' )
            //        tickertape2.onDataUpdate( data )    
            //    }.bind(this)
            //});      
        }
  
        // INSERT DATA and EVENT LISTENERS 
        con1.querySelector('#supereditabletitle').addEventListener('input', function(e){
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        }.bind(this))

        */
       this.absorbControls=function( data_in ){    
                
        // Git Repo
        //    show full URL
        //    show commits ,
        //    show contributors
        // .  show Credential / Key 
        // Exchange 
        // .  Domain 
        //    Access Credential / Key being used partial 
        // .  Aggregate Stats ? Aux Knowledge ? News ? 
        // .  News Bubble from Asset , into asset ? 
        // Alias
        // .  Keylist 
        // .  Name of Alias
        // .  
        // ASYNC 
        //var ticker = selfContain( '/js/components/ticker-tape.js' , data_obj )
        // SYNC 
        //var ticker = selfContain( 'ticker-tape' , data_obj )
        //document.body.insertAdjacentHTML( 'beforeend', '<ticker-tape id="tickertape2"></ticker-tape>' )
        //tickertape2.onDataUpdate( data )
        // Attach Obligatory ID_panel 
        // iterate caplist and insert panels , 
        // retile upon 
        // AFTER ALL PANELS Inserted. 
        // How can every panel be component with bubblying events. 
        // How to attach event listeners for clicks and data entry 
        // UUID of FocusObject is used to get....
        // node.capabilities = ['alias_auth','time_series','']
        // serviceMesh.
    }