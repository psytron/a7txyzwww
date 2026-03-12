var c = console.log;
SlideSensor = function( scroll_target ){
    
    THREE.Mesh.call( this);
    this.type = 'SlideSensor';
    var mouseX = 0;
    var mouseY = 0;
    var mouse = new THREE.Vector2();
    var raycaster;

    var last_x= 0;
    var last_z= 0;
    raycaster = new THREE.Raycaster();
    
    this.landing_offset = 0;        
    landing_offset_x =0;
    landing_offset_z =0;
    landing_x=0;
    landing_z=0;

    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 1000, 1000, 2, 2 ),
        new THREE.MeshBasicMaterial({ color: 0x3F0F3F , side: THREE.DoubleSide , wireframe:true }) );
    plane.rotateX( - Math.PI / 2);
    //plane.position.set( 0,0,0 );
    plane.material.visible = true;
    plane.material.visible = false;
    this.add( plane );


    function getIntersection( ev ){
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [plane] );//var intersects = raycaster.intersectObjects( ev.target , true );  // c , recursive
        for( var i =0; i<intersects.length; i++){

        };
        console.log( intersects.length )
        return intersects[0]
    }
    
    function onMoveEvent( ev ){           
        intersect = getIntersection(ev)
        //DROPP SPHERE IN POSITION
        
        var delta_x = intersect.point.x - last_x
        var delta_z = intersect.point.z - last_z

        /*
         var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.04,16,16) ,
            new THREE.MeshBasicMaterial({ color:0x33FF44, wireframe: true }) );
        sphere.position.x= intersect.point.x
        sphere.position.y= intersect.point.y
        sphere.position.z= intersect.point.z
        this.parent.add(sphere);    */


        try{
            scroll_target.position.x += delta_x
            scroll_target.position.z += delta_z
        }catch(err){}   

        last_x = intersect.point.x
        last_z = intersect.point.z
    }

    function onDownEvent( ev ){
        //event.preventDefault();
        controls.enabled = false;
        intersect = getIntersection(ev)
        landing_offset_x = scroll_target.position.x
        landing_offset_z = scroll_target.position.z

        last_x = intersect.point.x
        last_z = intersect.point.z
        
        document.addEventListener('mousemove' , onMoveEvent );
    }
    function onUpEvent( ev ){
        controls.enabled = true;
        document.removeEventListener('mousemove' , onMoveEvent );
    }
    
    plane.on('mousedown', onDownEvent );
    this.on('mouseup', onUpEvent );

    var _velocity = 0.0;
    var smooth_step = 0.1
    this.updateTossScroll=function()
    {
        var SmoothTime = 1.0;
        var _time = 0.1

        if(_underInertia && _time <= SmoothTime)
        {
            grid.transform.position += _velocity;
            _velocity = _velocity/3;
            _time += smooth_step;
        }
        else
        {
            _underInertia = false;
            _time = 0.0;
        }
    }

}
SlideSensor.prototype = Object.create( THREE.Mesh.prototype );
SlideSensor.prototype.constructor = SlideSensor;
SlideSensor.prototype.getMesh = function() {
    return this.mesh;
}




AvatarFactory = function() {
    this.avatars={}
    this.lefont;
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
        this.lefont = font;
        Window.lefont = font;

        /*
        if (preloaded){
            controller.processCluster( preloaded )
        }*/
        //controller.processCluster( initObj )

        //$.getJSON("/mapjson?label=vehicle&rel=ships", function( initObj ) {
        //    console.log(initObj); // this will show the info it in firebug console
        //    controller.processCluster( initObj )
        //});
    });
    // BASE CIRCLE //
    /*
    var material = new THREE.MeshBasicMaterial( { color: 0x000055 } );
    var circleGeometry = new THREE.CircleGeometry( 6, 22 ); //radius ,segs
    var circle = new THREE.Mesh( circleGeometry, material );
    circle.rotation.x=-Math.PI /2;
    */

    var exch_height=6;
    var sphereGeometryDot = new THREE.SphereGeometry(2,3,3);
    var sphereMeshDot = new THREE.MeshBasicMaterial({ color:XCOLORS.node_color, wireframe: true });
    var cylynderGeometryA = new THREE.CylinderGeometry( 5, 5, exch_height, 10 );
    var cylynderMeshA = new THREE.MeshBasicMaterial( {color:XCOLORS.dbase , wireframe: true});

    // EXCHANGE

    /*
    this.exchange = new THREE.Mesh();
    var exch_height=30;
    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 10, 10, exch_height, 20 ),
        new THREE.MeshBasicMaterial( {color:0x93ff00, wireframe: true}) );
    cylinder.position.y=exch_height/2;
    this.exchange.add( cylinder );
    this.exchange.add( circle );
    */


    /*loadTextureX('/static/img/ringtexta.png').then( function( txture ){
        var material = new THREE.MeshBasicMaterial( {map: txture} );
        var circle = new THREE.Mesh( new THREE.CircleGeometry( 6, 22 ) , material );
        circle.material.transparent = true;
        circle.rotation.x=-Math.PI /2;
        circle.position.y=0.2;
        circle.scale.set(4,4,4);
        this.exchange.add( circle );
    });*/
    // :: LOAD GLTF :: //
    //var modnum = Math.round( Math.random() *1 )
    //var lemods = ['body','car']
    //var icon_url = '/static/models3d/'+lemods[modnum]+'.gltf'
    //var icon_url = '/static/models3d/pawn.gltf'
    //loadModelX( icon_url ).then( ( objx ) => self.add( objx ) ); //dope tho


    // var icon_url = '/static/models3d/'+'clock'+'.gltf'
    // var icon_url = '/static/models3d/'+'subuser'+'.gltf'
    // loadModelX( icon_url ).then( ( objx ) => self.add( objx ) ); //dope tho

    // CylinderGeometry( radiusTop : Float,
    //                radiusBottom : Float,
    //                      height : Float,
    //              radialSegments : Integer,
    //              heightSegments : Integer,
    //                   openEnded : Boolean,
    //                  thetaStart : Float,
    //                 thetaLength : Float)
    /*
    SphereGeometry(
               radius : Float,
        widthSegments : Integer,
       heightSegments : Integer,
             phiStart : Float,
            phiLength : Float,
           thetaStart : Float,
          thetaLength : Float)
    radius — sphere radius. Default is 1.
    widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
    heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
    phiStart — specify horizontal starting angle. Default is 0.
    phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
    thetaStart — specify vertical starting angle. Default is 0.
    thetaLength — specify vertical sweep angle size. Default is Math.PI.
    */

    /*

    // PAWN
    this.pawn = new THREE.Mesh();
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4,5,5) ,
        new THREE.MeshBasicMaterial({ color:0x33FF44, wireframe: true }) );
    sphere.position.y=22;
    this.pawn.add( sphere );
    var cyl_height=16;
    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry( 3, 4, cyl_height, 10 ),
        new THREE.MeshBasicMaterial( {color:0x33FF44, wireframe: true}) );
    cylinder.position.y=cyl_height/2;
    this.pawn.add( cylinder )
    this.pawn.add( circle );


    // DOT
    this.dot = new THREE.Mesh();
    var sphere = new THREE.Mesh(
        sphereGeometryDot ,
        sphereMeshDot );
    this.dot.add( sphere );

    this.avatars['exchange']=this.exchange;
    this.avatars['pawn']=this.pawn;
    this.avatars['dot']=this.dot;
    */

    // getClone('pawn')
    this.getClone=function( identifier_in ){
        //return this.avatars[ identifier_in ].clone(false);
        //return this.avatars[ identifier_in ];
        switch ( identifier_in ) {
            case 'exchange':
                // EXCHANGE
                this.exchange = new THREE.Mesh();
                var exch_height=6;
                var cylinder = new THREE.Mesh(
                    cylynderGeometryA ,
                    cylynderMeshA );
                cylinder.position.y=exch_height/2;
                this.exchange.add( cylinder );
                return this.exchange;
                break;
            case 'dot':
                this.dot = new THREE.Mesh();
                var sphere = new THREE.Mesh(
                    sphereGeometryDot ,
                    sphereMeshDot );
                this.dot.add( sphere );
                return this.dot;
                break;
            default:
                break;
        }

    }





    var canvasx = document.createElement('canvas');
    this.createTextCanvasX=function (text, color, font, size) {
        size = size || 36;
        var ctx = canvasx.getContext('2d');
        ctx.clearRect(0, 0, canvasx.width, canvasx.height);
        var fontStr = (size + 'px ') + (font || 'Arial');
        ctx.font = fontStr;
        var w = ctx.measureText(text).width;
        var h = Math.ceil(size);
        canvasx.width = w;
        canvasx.height = h;
        ctx.font = fontStr;
        ctx.fillStyle = color || 'white';
        ctx.fillText(text, 0, Math.ceil(size * 0.8));
        return canvasx;
    };


    this.getSuperText=function( message_in , color_in ){
        var xMid, text;
        var color = color_in || 0x760aff;
        var matDark = new THREE.LineBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var matLite = new THREE.MeshBasicMaterial( {color: color, transparent: true, opacity: 0.8, side:THREE.DoubleSide });
        var shapes = Window.lefont.generateShapes( message_in , 100 );
        var geometry = new THREE.ShapeBufferGeometry( shapes );
        geometry.computeBoundingBox();
        //xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        //geometry.translate( xMid, 0, 0 );
        // make shape ( N.B. edge view not visible )
        text = new THREE.Mesh( geometry, matLite );
        //text.position.z = - 150;
        return text;
    }
}
/// :: LOADER CACHE :: /// TODO: MOVE INTO ROBUST SUBMOD
var loader = new THREE.GLTFLoader();
var models = {};
function loadModelX ( url ) {
    if ( models[ url ] ) {
        return models[ url ].then( ( o ) => o.clone() );
    }
    return models[ url ] = new Promise( ( resolve, reject ) => {
        loader.load( url, function ( gltf ) {
            resolve( gltf.scene );
        }, undefined, reject );
    });
};
var tloader = new THREE.TextureLoader();
var textures = {};
function loadTextureX( url ){
    //if ( textures[ url ] ) {
    //    return textures[ url ].then( ( o ) => o.clone() );
    // }
    return textures[ url ] = new Promise( ( resolve, reject ) => {
        tloader.load( url, function ( texture ) {
            resolve( texture );
        }, undefined, reject );
    });
};/// :: LOADER CACHE :: ///

function BaseAvatar() {
    THREE.Mesh.call( this);
    this.type = 'BaseAvatar';

    // SIMULATE CUBE
    // this.geometry = new THREE.BoxGeometry( 540, 540, 149 );
    // this.material = new THREE.MeshLambertMaterial( { color: 0xFF4F0F } );
    // THREE.Mesh.call( this, this.geometry, this.material );

    // FLAT CIRCLE
    ///var materialx = new THREE.MeshBasicMaterial({ color: 0x00FF44 });
    ////var circleGeometry = new THREE.CircleGeometry( 24, 32 ); //radius ,segs
    // var circle = new THREE.Mesh( circleGeometry, materialx );
    //circle.rotation.x=-Math.PI /2;
    // this.add( circle );

}

BaseAvatar.prototype = Object.create( THREE.Mesh.prototype );
BaseAvatar.prototype.constructor = BaseAvatar;
BaseAvatar.prototype.getMesh = function() {
    return this.mesh;
}

// Available Usage
//var foo = new BaseAvatar();
//scene.add( foo );
console.log(' interpreting inside link js  2nd ')
Link = function( objIn ){
    console.log(' interpreting inside link js  2nd ')
    this.objIn = objIn;





    // ANIMATED LINE: // https://jsfiddle.net/prisoner849/4j4euqtv/
    this.steady = function(){
        
        //this.float_a.position.set( this.a.position );
        
        var x_distance =  ( this.b.position.x - this.a.position.x);
        var z_distance = ( this.b.position.z - this.a.position.z );
        linexx.geometry.verticesNeedUpdate = true;
        linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        //linexx.frustumCulled = false;// Alternatively, you can prevent frustum culling of your line by setting
        //txtspr.position.x = this.b.position.x- (x_distance / 2);
        //txtspr.position.y = this.b.position.y- (( this.b.position.y - this.a.position.y) / 2)+10;
        //txtspr.position.z = this.b.position.z- (z_distance / 2);
    }
    this.outing = function(){
        var x_distance =  ( this.b.position.x - this.a.position.x) - this.exititer;
        var z_distance = ( this.b.position.z - this.a.position.z ) - this.exititer;
        linexx.geometry.verticesNeedUpdate = true;
        linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        //linexx.frustumCulled = false;// Alternatively, you can prevent frustum culling of your line by setting
        //txtspr.position.x = this.b.position.x- (x_distance / 2);
        //txtspr.position.y = this.b.position.y- (( this.b.position.y - this.a.position.y) / 2)+10;
        //txtspr.position.z = this.b.position.z- (z_distance / 2);
        this.exititer++;
    }
    this.nothing = function(){

    }
    this.activate=this.steady;
    this.update = function(){
        this.steady();
    }

    this.a = objIn.a;
    this.b = objIn.b;
    this.initObj = objIn;
    this.targetmesh = objIn.mesh;
    var colors = [0x666666,0x00FF00,0xa700ff,0xffa800,0x71de00,0xce4e00]
    //this.color = "#EEEEEE" //objIn.color || colors[Math.round( Math.random() *4)];
    this.color = colors[Math.round( Math.random() *4)];

    if( this.initObj.type == 'demand_index'){
        this.color="#666666"
    }

    this.offset = Math.random() * 1.4;
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(this.a.position);
    lineGeom.vertices.push(this.b.position);
    var lineMat = new THREE.LineBasicMaterial({ color:this.color ,linewidth:1, linecap:'round' });
    var linexx = new THREE.Line( lineGeom, lineMat );
    this.linexx = linexx; //this.linexx.transparent=true;
    this.targetmesh.add( linexx )
    this.start_date = new Date()


    var geo = new THREE.CubeGeometry( 2, 2, 2 )
    var mat = new THREE.MeshNormalMaterial()
    this.packets = [new THREE.Mesh( geo , mat ),new THREE.Mesh( geo , mat ),new THREE.Mesh( geo , mat )];
    this.targetmesh.add( this.packets[0] )
    this.targetmesh.add( this.packets[1] )
    this.targetmesh.add( this.packets[2] )
    this.step = 0; 

    this.enterFrameUpdatePackets=function(){

    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    window.addEventListener('mapChanged', function (e) {
        this.exititer=0;
        var model = e.detail.model;
        var map = model.cur_map;

        if( map == 7){
            //this.visible=true;
            TweenMax.to( this.linexx.material ,2,{
                ease: Expo.easeIn,
                opacity:0 })  }
        if( map == 0 ){

            this.step=0;
            this.update = this.enterFrameUpdatePackets;
        }

    }.bind(this) , false);


}
// Experiment Submesh loadable
Link.prototype = Object.create( THREE.Mesh.prototype );
Link.prototype.constructor = Link;
Link.prototype.getMesh = function() {
    return this.mesh;
}
Link.prototype.makeTextSprite=function( message, parameters ) {
    var colorobj = hexToRgb(this.color);
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Helvetica";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] :100;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:colorobj.r, g:colorobj.g, b:colorobj.b, a:1.0 };
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "" + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.font = "" +42 + "px " + fontface;
    context.fillText( "000007" ,0, 80,400);
    context.fill()
    context.fillStyle ="#dbbd7a";

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 21,21,21 );
    return sprite;
}

Linkx = function( objIn ){

    //var model = objIn.data.model;
    //this.model = objIn.data.model;
    
    this.a = model.getNodeByUUID( objIn.fromId ).data.sprite;
    this.b = model.getNodeByUUID( objIn.toId ).data.sprite;
    this.start = model.getNodeByUUID( objIn.fromId ).data.sprite;
    this.end = model.getNodeByUUID( objIn.fromId ).data.sprite;
    this.initObj = objIn;
    this.targetmesh = objIn.mesh;
    //this.color = 0xFFFF44 //objIn.color || colors[Math.round( Math.random() *4)];

    var colors = XCOLORS.link_colors;
    //this.color = "#EEEEEE" //objIn.color || colors[Math.round( Math.random() *4)];
    this.color = colors[Math.round( Math.random() *4)];
    if( this.initObj.data.label =='TRANSFERS'|| this.initObj.data.label =='ANY' ){
        this.color=XCOLORS.link_color_transfer;
    }
    if( this.initObj.data.label =='CONVERTS' ){
        // redthis.color=0x11EEEE;
        this.color=XCOLORS.link_color_convert;
    }

    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(this.a.position);
    lineGeom.vertices.push(this.b.position);
    var lineMat = new THREE.LineBasicMaterial({ color:this.color ,linewidth:1.0, transparent: true, opacity: 0.7 , linecap:'round' });
    this.linexx = new THREE.Line( lineGeom, lineMat );
    this.targetmesh.add( this.linexx )
    this.activate=this.steady;
    this.packets = []


    //this.linexx.transparent=true;
    //this.floatlabel = this.XXXXXXXXXMakeText('WEIGHT',{})

    // FLOATING LAZBEL
    /*
    var w= Math.round( Math.random(8) )
    this.floatlabel = getSuperText(''+w,0xCC0000 )
                   //   getSuperText( ''+this.initObj.domain , 0x444411 )
    this.floatlabel.scale.set(0.015,0.015,0.015)
    this.targetmesh.add( this.floatlabel )
    this.floatlabel.on('mousedown',function(ev){
        console.log('what ')
        this.initParticles()
        this.update = this.enterFrameUpdatePackets;
    }.bind(this))*/

    this.steady = function(){
        var x_distance = ( this.b.position.x - this.a.position.x);
        var y_distance = ( this.b.position.y - this.a.position.y );
        var z_distance = ( this.b.position.z - this.a.position.z );
        //this.floatlabel.position.x = this.a.position.x + (x_distance/2);
        //this.floatlabel.position.y = this.a.position.y + (y_distance/2);
        //this.floatlabel.position.z = this.a.position.z + (z_distance/2);
        this.linexx.geometry.verticesNeedUpdate = true;
        this.linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
    }
    this.outing = function(){
        var x_distance = ( this.b.position.x - this.a.position.x) - this.exititer;
        var z_distance = ( this.b.position.z - this.a.position.z ) - this.exititer;
        this.linexx.geometry.verticesNeedUpdate = true;
        this.linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        this.exititer++;
    }
    this.update = function(){
        this.steady();
        //this.enterFrameUpdatePackets();
    }

    this.initParticles=function(){
        if( this.packets.length != 0){ return; }
        var geo = new THREE.CubeGeometry(0.5, 0.5, 0.5)
        var mat = new THREE.MeshNormalMaterial()
        for (i in [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
            var tempmesh = new THREE.Mesh(geo, mat)
            this.packets.push(tempmesh)
            this.targetmesh.add(tempmesh)
        }
        this.speed_range = 100;
        this.step = 1;
        this.linexx.material.color = new THREE.Color(0xDDDDFF);
            //line.material.needsUpdate = true;
    }
    this.destroyParticles=function(){
        this.update = this.steady;
        for( i in this.packets ){
            var thispacket = this.packets[i]
            thispacket.geometry.dispose();
            thispacket.material.dispose();
            this.targetmesh.remove( thispacket )
        }
        this.packets = []
    }
    this.enterFrameUpdatePackets=function(){
        this.steady()
        var steps_per_speed = this.speed_range / this.packets.length;
        for( p in this.packets ){
            var t = (this.step+(p*steps_per_speed))/this.speed_range; 
            const inplt = (dim, start, end, t) => (start[dim]) + (end[dim] - start[dim]) * t || 0;
            this.packets[p].position.x = inplt('x', this.start.position, this.end.position, t%1 )
            this.packets[p].position.y = inplt('y', this.start.position, this.end.position, t%1 )
            this.packets[p].position.z = inplt('z', this.start.position, this.end.position, t%1 )
        }
        this.step++;
    }

    window.addEventListener('linkFlowEvent', function (e) {
        if( this.initObj.data.flowFrom && this.initObj.data.flowTo ){
            var a = this.a
            var b = this.b
            this.start = model.getNodeByUUID( this.initObj.data.flowFrom ).data.sprite;
            this.end = model.getNodeByUUID( this.initObj.data.flowTo ).data.sprite;            
            this.initParticles();
            this.update=this.enterFrameUpdatePackets;            
        }
    }.bind(this) , false);

    window.addEventListener('mapChanged', function (e) {
        this.exititer=0;
        var model = e.detail.model;
        var map = model.cur_map;
        if( map == 7){
            TweenMax.to( this.linexx.material ,2,{
                ease: Expo.easeIn,
                opacity:0 })  }
        if( map == 0 ){
            //this.step=0;
            //this.initParticles()
            //this.update = this.enterFrameUpdatePackets;
        }
    }.bind(this) , false);

}
// Experiment Submesh loadable
Linkx.prototype = Object.create( THREE.Mesh.prototype );
Linkx.prototype.constructor = Linkx;
Linkx.prototype.getMesh = function() {
    return this.mesh;
}
Linkx.prototype.makeTextSprite=function( message, parameters ) {
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Helvetica";
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:252, g:222, b:111, a:1.0 };
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "" + 17 + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.font = "" +42 + "px " + fontface;
    context.fillText( "000007" ,0, 80,400);
    context.fill()
    context.fillStyle ="#dbbd7a";
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 11,11,11 );
    return sprite;
}


// var elapsed = new Date() - this.start_date;
// var x_distance =  ( this.b.position.x - this.a.position.x );
// var y_distance =  ( this.b.position.y - this.a.position.y );
// var z_distance =  ( this.b.position.z - this.a.position.z );
// var x_step = x_distance / 3;
// var y_step = y_distance / 3; 
// var z_step = z_distance / 3; 

// FLOAT TEXT AT MIDPOINT 
//linexx.frustumCulled = false;// Alternatively, you can prevent frustum culling of your line by setting
//txtspr.position.x = this.b.position.x- (x_distance / 2);
//txtspr.position.y = this.b.position.y- (( this.b.position.y - this.a.position.y) / 2)+10;
//txtspr.position.z = this.b.position.z- (z_distance / 2);

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
    var drawer_open = 0;
    this.toggleDrawer=function(){
        //var y_vert = Math.round( Math.random() * 200 )
        //y_vert-= Math.round( Math.random() * 200 )
        if( drawer_open){
            drawer_open=0;
            TweenMax.to(drawer, 3, {top:-500 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{
            drawer_open=1;
            TweenMax.to(drawer, 3, {top:0 ,ease:Expo.easeOut});
        }
    }

    window.addEventListener('load' , function( ev ){
        //$('#adder').bind("click", controller.setAction );
        // CONTROLS OVERLAY
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


    })





}
NodeMenu = function( objIn ) {
    THREE.Sprite.call(this);
    this.floor = objIn.floor;
    this.type = 'NodeMenu';
    this.last_click_time = new Date()
    this.last_selected_obj = {}
    this.circle=true;
    this.menubuttons = {
        save:{
            image:'img/arrange_icon.png',
            action:'arrange'
        },
        activate:{
            image:'img/avatar_icon.png',
            action:"path"
        },
        price:{
            image:'img/office_icon.png',
            action:'nothing'
            // Launch Gmail Email
            //https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=target@email.com&su=SUBJEX%20SOMETHING&body=Hello%2C%0A%0AI%20
        },
        coin:{
            image:'img/task_icon.png',
            action:'nothing'
        },
        settings:{
            image:'img/settings_icon.png',
            action:'settings'
        },
        asset:{
            image:'img/asset_icon.png',
            action:'link'
        },
        link:{
            image:'img/link_icon.png',
            action:'link'
        }
    }


    this.reset = function(){
        this.visible=false;
        this.position.set(999,999,999)

        if( this.floor ){
            this.floor.off('mousedown',this.reset)
        }
    }.bind(this)
    this.fireTouchEvent=function( ev ){
        console.log('Clicked one button: ', ev.action )
        if( ev.action=='path' ){
            window.controller.outflowFromFocused()
        }
        if( ev.action=='link' ){
            window.controller.activateLinkSelection()
        }
        if( ev.action=='arrange' ){
            window.controller.arrangeAround()
        }
        this.hide()
    }.bind(this)
    this.build = function(){
        var loader = new THREE.TextureLoader();
        var idx =0;
        for ( var i in this.menubuttons ){
            (function(idx , cur_opt, thisin ) {

                cur_opt.idx = idx;
                cur_opt.callbackx = function( texture ){
                    var idxy = i;
                    var material = new THREE.MeshBasicMaterial( {map: texture} );
                    var circleGeometry = new THREE.CircleGeometry( 6, 22 ); //radius ,segs
                    cur_opt.ref = new THREE.Mesh( circleGeometry, material );
                    cur_opt.ref.material.transparent = true;
                    cur_opt.ref.position.x=Math.sin( cur_opt.idx/1.5)*20; // radius
                    cur_opt.ref.position.y=Math.cos( cur_opt.idx/1.5)*20;
                    cur_opt.ref.on('mousedown', function(ev){
                        this.parent.fireTouchEvent(cur_opt)
                    })
                    thisin.add( cur_opt.ref );
                }
                idx++;
                loader.load( cur_opt['image'], cur_opt.callbackx );
            })(idx , this.menubuttons[i] , this );
            idx ++; 
        }

        //this.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.rotation.setFromVector3( new THREE.Vector3(0, 0,0) );
        this.position.set(0,0,4)
        var circle_bg;
        loader.load( 'img/dottedcircle.png',  // resource URL
            function ( texture ){         // Callback passes texture ref
                var material = new THREE.MeshBasicMaterial( {map: texture} );
                var circleGeometry = new THREE.CircleGeometry( 13, 24 ); //radius ,segs
                this.circle = new THREE.Mesh( circleGeometry, material );
                this.circle.material.transparent = true;
                this.circle.position.x=0;
                this.circle.position.y=0;
                this.circle.position.z=-0.01;
                this.add( this.circle );
            }.bind(this)
        );
    };
    this.show = function(){
        this.circle.scale.set(0,0,0)
        TweenMax.to( this.circle.scale , 0.5  , { ease:Expo.easeOut , delay:0 , y:1,x:1,z:1 } )
        for( var i in this.menubuttons) {
            var cur_spr = this.menubuttons[i].ref
            cur_spr.scale.set(0,0,0)
        }
        var ndx = 0;
        for( var i in this.menubuttons){
            var cur_spr = this.menubuttons[i].ref
            TweenMax.to( cur_spr.scale , 0.4  , { ease:Expo.easeOut , delay:0.3+(ndx/24) , y:1,x:1,z:1 } )
            ndx++;
        }
    }
    this.hide = function(){
        var ndx = 0;
        for( var i in this.menubuttons){
            var cur_spr = this.menubuttons[i].ref
            TweenMax.to( cur_spr.scale , 0.3  , { ease:Expo.easeOut , delay:ndx/24 , y:0,x:0,z:0 } )
            ndx++;
        }
    }    
    this.onFocusEvent = function(e){
        if( model.focusobject ) {
            this.visible=true
            this.position.x=model.focusobject.data.sprite.position.x;
            this.position.y=model.focusobject.data.sprite.position.y;
            this.position.z=model.focusobject.data.sprite.position.z;
            this.show()
            this.last_selected_obj = model.focusobject.data.sprite;
            this.floor.on('mousedown', this.reset )
        }else{
            this.reset();
        }
    }.bind(this)
    this.onMapChanged = function (e){
        var model = e.detail.model;
        var map = model.cur_map;
        this.visible=false;
        this.position.set(999,999,999)
        if (map == 0) {

        }
    }.bind(this)
    window.addEventListener("focusEvent" ,this.onFocusEvent )
    window.addEventListener('mapChanged', this.onMapChanged )
    window.addEventListener('clearViewsEvent', this.reset )
    this.build()
    this.reset()    
}
NodeMenu.prototype = Object.create( THREE.Sprite.prototype );
NodeMenu.prototype.constructor = NodeMenu;
NodeMenu.prototype.getMesh = function() {
    return this.mesh;
}
NodeMenu.prototype.getSprite = function() {
    return this.sprite;
}


//module.exports = NodeMenu
MetaView = function(){
    THREE.Mesh.call( this);
    this.type = 'MetaView';


    this.build = function(){
        cube = new THREE.Mesh(
            new THREE.CubeGeometry( 7, 1, 7 ),
            new THREE.MeshNormalMaterial() );
        this.add( cube );
        cube.position.set(0,-0.3,0)
        //cube.rotation.set(-3,0,0)
    }.bind(this)

    this.reset = function(){
        this.visible=false;
        this.position.set(999,999,999)        
    }.bind(this)
    this.reset()


    this.onSelectHoverEvent = function(e){

        if( model.hovernode && model.mode == 'select') {
            this.visible=true
            this.position.x=model.hovernode.data.sprite.position.x;
            this.position.y=model.hovernode.data.sprite.position.y;
            this.position.z=model.hovernode.data.sprite.position.z;

            for( var bb in this.buttons ){
                var aa=this.buttons[bb]
                aa.scale.set(0.01,0.01,0.01)
                TweenMax.to( aa.scale , 0.6  , { ease:Expo.easeOut , delay:bb/15 , y:1,x:1,z:1 } )
            }
            //this.scale.set(0,0,0);
            //TweenMax.to( this.position , 0.6 , { ease:Expo.easeOut , delay:0 , y:this.position.y+11 } )
            //TweenMax.to( this.scale , 0.6 , { ease:Expo.easeOut , delay:0 , x:1 , y:1 , z:1 } )
            this.last_selected_obj = model.hovernode.data.sprite
        }else{
            this.visible=false;
            this.position.set(999,999,999)
        }

    }.bind(this)

    this.selfUpdate=function(){
        /*
        if( _time <= SmoothTime){
            requestAnimationFrame( this.selfUpdate )
        }else{
        }*/
        this.lookAt( camera )
    }.bind(this)
    window.addEventListener("selectHoverEvent" , this.onSelectHoverEvent )
    window.addEventListener("clearViewsEvent" , this.reset )
    window.addEventListener('mapChanged', this.reset )
    this.build();
}
MetaView.prototype = Object.create( THREE.Mesh.prototype );
MetaView.prototype.constructor = MetaView;
MetaView.prototype.getMesh = function() {
    return this.mesh;
}

var IsoController = function( initObj ) {

    this.model=initObj.model; //
    var renderer = initObj.renderer;
    var swarmView = initObj.target;
    this.V1 = 'OCTOPUS.GRAPH';
    this.speed =  0.8;
    this.trigger1 = 2;
    this.displayOutline = false;
    //this.camera = initObj.camera;
    //this.target = initObj.target;
    var windowHalfX = window.innerWidth  / 2; var dark_color=0xFFFFFF;
    var windowHalfY = window.innerHeight / 2; var light_color=0xFFFFFF;
    var camera = initObj.camera;
    camera.position.z = 285; camera.position.y = 60;
    var target = initObj.target;
    var self = this;
    var selfyo = this;
    var mouseX = 0;
    var mouseY = 0;
    var mouse = new THREE.Vector2();


    // WINDOW EVENTS
    this.onWindowResize=function( event) {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    // EVENT LISTENERS
    window.addEventListener('resize',      this.onWindowResize, false );
    window.addEventListener('clearUpdate', function(e){ console.log(' base level reload ');reClear();container.innerHTML = '';}.bind(this))
    var drawer = document.getElementById( 'slide_drawer')
    var sortmenu = document.getElementById( 'sortmenu')
    var drawer_open = 0;


    // message event handler (e is event object)
    this.handleIFRMessage=function(e) {
        // Reference to element for data display
        var el = document.getElementById('display');
        initObj = e.data;
        if( Window.lefont ){
            this.processCluster( initObj )
        }else{
            Window.preloaded = initObj;
        }
        console.log(')))  payload received incoming message ' , new Date() )
        e.source.postMessage('PayLoad receives incoming message at ',"*");
        // send reply using e.source and e.origin properties
        // Check origin
        //if ( e.origin === 'http://www.example.com' ) {
        // Retrieve data sent in postMessage
        //el.innerHTML = e.data;


        // Send reply to source of message
        //e.source.postMessage('Message received', e.origin);
        //}
    }.bind(this);







    this.toggleDrawer=function(){
        //var y_vert = Math.round( Math.random() * 200 )
        //y_vert-= Math.round( Math.random() * 200 )
        if( drawer_open){
            drawer_open=0;
            TweenMax.to(drawer, 2, {top:-580 , ease:Expo.easeOut} );
            TweenMax.to(sortmenu, 2, {right:-580 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
        }else{
            drawer_open=1;
            TweenMax.to(drawer, 2, {top:0 ,ease:Expo.easeOut});
            TweenMax.to(sortmenu, 2, {right:0 , ease:Expo.easeOut} );
        }
    }


    //  Global Zero Event Comes in  " map 0 " -->

    var last_click_time = new Date()

    this.explode = function(){
        console.log("wow explode");
        this.model.updateStop();
    };
    this.arrangement1 = function(){
        console.log("wow explode");
        this.model.updateStop();
    };
    this.processCluster = function( objIn ){
        //this.model.updateStop()
        this.model.parseCluster( objIn );
    };
    this.outflowFromFocused = function ( ){
        this.model.outflowFromFocused();
    }
    this.setHoverSelect = function( id_in ){
        this.model.setHoverSelect( id_in );
    }
    this.setNewLink= function( id_in ){
        this.model.setNewLink( id_in )
    }
    this.activateLinkSelection = function(){
        this.model.activateLinkSelection()
    }
    this.arrangeAround = function(){
        this.model.arrangeAround()
    }
    this.setFocusObject = function( node_id ){
        var now = new Date()
        //controls.reset();
        this.model.setFocusObject( node_id )
        var clicked_node= this.model.getNodeByUUID( node_id )
        var elapsed_since_last_tap = now - last_click_time;
        var clicked_sprite = clicked_node.data.sprite;



        //controls.update();
        //controls.target.set(30, 167, 81); // //Update target:
        //controls.update();
        // Reset camera To reset the camera to the initial position you can do:
        //controls.reset();

        if( clicked_node ){
            // WORKIGN CAMERA CLICK ZOOM
            TweenMax.to( camera.position , 1.9 , { ease:Expo.easeInOut , delay:0 , x:clicked_sprite.position.x ,  y:clicked_sprite.position.y , z:clicked_sprite.position.z+80 } )
            TweenMax.to( camera.rotation , 1.9 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0 , z:0 ,  onComplete:function(){
                    //console.log(this.target);
                    //controls.update();
            }})
            if( elapsed_since_last_tap < 20000){ }
        }else {
            //TweenMax.to( camera.position , 2.1 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0 , z:0 } )
        }
    };
    this.setAction = function( objIn ){
        switch( objIn.map){
            case 'yzero':
                this.model.setAction( objIn );
                break;
            case 'demand':
                this.model.setAction( objIn );
                break;
            case 'samples':
                this.model.setAction( objIn );
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
            default:
                this.model.setMap( objIn.map)
                break;
        };
    }
    this.addActor=function(){
        this.model.addActor();
    }
    this.saveMap=function(){
        this.model.saveMap();
    }
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
    };
    this.setPacket = function( objIn){
        this.model.setPacket();
    }
    this.setSort = function( objIn){
        this.model.setSort( objIn['sort'] );
    }
    this.setCam = function ( objIn){
        //this.model.map
    }
    this.setMode = function ( objIn){
        this.model.setMode(6)
    }
    this.run=function(){
        //this.model.setData( {} );
    }
    this.setSearchClick= function(e){
        resultdiv = $(e.target).closest(".resu")[0]
        if( resultdiv ){
            node = $( resultdiv )
            rez.html( '<div class="resutok"><span class="light">TOKEN:</span>'+node.attr('token')+' <img src="/static/img/greenarrow.png"><span class="light">XFR:</span> '+node.attr('mrn')+'</div><div class="survmessage"></div>');

            console.log( 'launching: ', loaded_indexes[ selected_index-1 ] )
            app.spinr.fadeOut();
            rez.empty();
            e.target.value="";
            e.stopPropagation()
        }
    };
    this.setSearchKeyDownPaste=function(e){
        app.spinr.show()
        e = e || window.event; 
        if (e.keyCode == '38') {
            
            rez.find('.resu').css("background-color", "rgba(0,0,0,0.4)")
            selected_index= selected_index>=1 ? selected_index-1 : selected_index;
            e.target.value=loaded_indexes[ selected_index-1 ]['name']
            loaded_indexes[ selected_index-1 ].element.css("background-color", "rgba(254,0,0,0.2)")
            e.stopPropagation()
        }else if (e.keyCode == '40') {
            rez.find('.resu').css("background-color", "rgba(0,0,0,0.4)")
            selected_index= selected_index + 1
            e.target.value=loaded_indexes[ selected_index-1 ]['name']
            loaded_indexes[ selected_index-1 ].element.css("background-color", "rgba(254,0,0,0.2)")
            e.stopPropagation()
        }else if (e.keyCode == '13') {
            console.log( 'launching: ', loaded_indexes[ selected_index-1 ] )
            app.spinr.fadeOut();
            rez.empty();
            e.target.value="";
            this.setMap( {map:9} )
            e.stopPropagation()
        }
    }.bind(this);
    this.setSearchInput=function(e){
        app.spinr.show();
        
        tosearch = $(e.target).val();
        var tokens = tosearch.split(" ");
        zurl = "q="+tosearch+"&r="+Math.random()*9999;
        if( tokens[0]=='view'){   
            if( tokens[1] && !isNaN(tokens[1])  )
                this.model.setMode( tokens[1]%10 )
            app.spinr.fadeOut();
        }else{
            var rnd = Math.round( Math.random()*9999 );
            var requestURL = "/search?"+zurl+'?rnd='+rnd;
            var request = new XMLHttpRequest();//
            request.onload = function() {

                app.spinr.fadeOut();
                var data = request.response;
                var items = [];
                var restring ='';
                rez.empty()
                loaded_indexes=[];
                selected_index=0;
                data.forEach(function(valx, indx) {
                    var template = $("#templates #result").clone();
                    template.find('.field1').html( '<img src="/static/img/'+valx['type']+'.png"/>')
                    template.find('.field2').html( valx['name'] )
                    template.find('.field3').html( valx['type'] )
                    valx.element = template.find('.resu')
                    loaded_indexes.push( valx )
                    template.appendTo( rez )
                }, this); 
            };
            request.responseType = 'json';
            request.open('GET', requestURL);
            request.send();
        }
    };// setSearchInput





}; // class IsoController

AvatarX = function( objIn ){
    BaseAvatar.call( this);
    var factory = new AvatarFactory() //var factory = require('./avatarfactory.js')

    var timefloss = 0;
    var controller = objIn.controller;
    this.initObj = objIn;
    this.random_offset = Math.random() * 1.4;
    this.uuid = objIn['uuid'];
    this.guuid = objIn['guuid'];
    this.looklock = false;
    this.node = objIn;
    this.data = objIn;
    this.id = objIn.id;
    this.model = objIn.model;
    this.subspace = new THREE.Object3D();
    this.add( this.subspace );
    this.last_click_time = new Date();
    this.last_drag_start_time = new Date();
    this.dragHoldTime = 0;
    this.plane = objIn.plane;
    this.mode = 'normal'
    this.textcanvas = objIn.canvas;

    this.HEADLINE_A=this.initObj.id ? this.initObj.id : " HA "
    this.HEADLINE_B=this.initObj.label ? this.initObj.label :" HB "
    this.HEADLINE_C=this.initObj.domain ? this.initObj.domain : " HC "
    this.HEADLINE_D=this.initObj.name ? this.initObj.name : " HD "
    var self = this;

    this.posobj = { x:0 , y:0 , z:0 }

    /* // SELF MANAGED ENTERFRAME REPLACEMENT
    var requestId = 0;
    function animate(time) {
        console.log(' animating ', time)
        requestId = window.requestAnimationFrame(animate);
        mouse.x =  ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        self.position.x =mouse.x;
    }
    function start() {
        animationStartTime = window.performance.now();
        requestId = window.requestAnimationFrame(animate);
    }
    function stop() {
        if (requestId)
            window.cancelAnimationFrame(requestId);
        requestId = 0;
    }*/
    this.onSelectHover = function(e){
        console.log(' selecting: ',this.guuid )
        window.controller.setHoverSelect(this.guuid)
    }
    this.onSelectModeEvent=function(e){

        console.log(' select Mode event in : ', this)
        this.mode = 'select'
        this.on('mousemove', this.onSelectHover )

    }
    this.fireTouchEvent=function(e){
        console.log("fireTouchEvent in AvatarX:  uuid: ",this.guuid)
        
        //e.stopPropagation()
        //e.preventDefault()
        //this.update = this.updateDrag;
        //TweenMax.to( this.position, 2 , { ease: Expo.easeOut, x:0, y:0, z:0 } )
        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        console.log(' timeelapsted: ',elapsed_since_last_tap )
        if( elapsed_since_last_tap < 200 ){
            window.controller.setFocusObject( this.guuid )
            document.addEventListener('mouseup' , this.onUpEvent );
        }
        if( this.model.mode == 'select'){
            window.controller.setNewLink(this.guuid)
        }
        this.last_click_time = now;

        //start()
    }.bind(this);
    this.on('mouseup', this.fireTouchEvent );
    this.on('touchend', this.fireTouchEvent );

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
    this.getNodeId=function(){
        return this.node['guuid'];
    }
    this.update=function(){
        var timestamp = new Date() * 0.0003 * this.random_offset;
        // WOW this just WORKED by SURPRISE :)
        this.lookAt( camera.position );
    }
    this.updatelocked=function(){
        var timestamp = new Date() * 0.0003 * this.random_offset;
        // WOW this just WORKED by SURPRISE :)
        //this.lookAt( camera.position );
    }
    this.warp=function(){
        scl = Math.random()*20
        pcl = -100 + Math.random()*100
        //console.log("should warp", TWEEN );
        //TWEEN.removeAll();
        //new TWEEN.Tween( lemesh.position )
        //.to( { x:0 ,y:0 , z:0 }, 5000 )
        //.onUpdate( render )
        //.start();
        //TweenMax.to( lemesh.position, 2 , { ease: Expo.easeOut, x:pcl, y:0, z:pcl } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    this.warpRandom=function(){
        
        scl = Math.random()*20
        pclx = Math.random()*200 - Math.random()*200
        pcly = Math.random()*100 ;
        pclz = Math.random()*200 - Math.random()*200
        // TweenMax.to( this.position, 2 , { ease: Expo.easeInOut, x:pclx, y:pcly, z:pclz } )
        if( this.initObj.base == 'BTC' || this.initObj.base == 'ETH' || this.initObj.name == 'ETH'|| this.initObj.name == 'BTC'|| this.initObj.name == 'USDT'|| this.initObj.name == 'BNB'){
            TweenMax.to( this.initObj.body.pos , 5 , { ease: Expo.easeInOut, x:pclx, y:pcly+40, z:pclz } )
        }
        var l =3;
    }
    this.warpSort=function( model ){
        scl = Math.random()*320
        var rowz = 8;
        var youuid = this.uuid;
        var nod = model.getNodeByUUID( this.uuid );
        var spacer=30;
        var xg = -spacer*3+(nod.ndx%rowz)*spacer;
        var zgo = -spacer*2 + Math.round( ( nod.ndx/rowz) ) * spacer;
        var dly = nod.ndx / 34;
        TweenMax.to( this.position, 2 , { ease:Expo.easeOut , delay:dly , y:5 , x:xg , z:zgo } )
    }
    this.iconOn=function( model ){
        var objx = new SubGraphVert( {} );
        this.subspace.add( objx )
    }
    this.iconOff=function( model ){
        for (var i = this.subspace.children.length - 1; i >= 0; i--) {
            this.subspace.remove(this.subspace.children[i]);
        }
    }
    this.warpPhase1=function( model ){
        var node = model.getNodeByUUID( this.uuid );
        var links = node.links;
        var rowz = 3;
        var spacer=170;
        var star = node.star;
        var xg = - ( spacer )+(node.star%rowz)*spacer;
        var zg = -spacer + Math.round( ( node.star/rowz) ) * spacer;
        var radius= 70;
        if( node.central ) {
            TweenMax.to( this.position, 2 ,{
                ease:Expo.easeOut ,
                y:5 ,
                x:xg ,
                z:zg,
                delay:star/22
            })
        }else{
            TweenMax.to( this.position,2, {
                ease: Expo.easeInOut,
                x:xg+Math.sin( parseInt( node.subindex )/1.5)*radius,
                z:zg+Math.cos( parseInt( node.subindex)/1.5)*radius,
                delay:node.subindex/12,
                y: Math.max(0,0)
            })
        }
    };
    this.warpPhaseDemand=function( model ){
        var node = model.getNodeByUUID( this.uuid );
        var links = node.links;
        var rowz = 3;
        var spacer=270;
        var star = node.star;
        var xg = - ( spacer )+(node.star%rowz)*spacer;
        var zg = -spacer + Math.round( ( node.star/rowz) ) * spacer;
        var radius= 210;
        if( node.type=='hub' || node.type=='market_index'|| node.type=='asset_index'){
            TweenMax.to( this.position, 2 ,{
                ease:Expo.easeOut ,
                y:5 ,
                x:0+Math.sin( parseInt( node.subindex )/1.2)*radius/2.4,
                z:0+Math.cos( parseInt( node.subindex)/1.2)*radius/2.4,
                delay:star/22
            })
        }else{
            TweenMax.to( this.position , 2 ,
            {
                ease: Expo.easeInOut,
                x:0+Math.sin( parseInt( node.subindex )/6.8)*radius*0.8,
                z:0+Math.cos( parseInt( node.subindex)/6.8)*radius*0.8,
                delay:node.subindex/12,
                y: Math.max(0,0)
            })
        }
    };
    this.warpSortLine=function( model ){
        scl = Math.random()*320;
        var youuid = this.uuid;
        var nod = model.getNodeByUUID( this.uuid );
        var spacer=170;
        var xg = -100+(nod.ndx%4)*spacer;
        var zgo = -4;//-1150 + Math.round( ( nod.ndx/4) ) * spacer;
        var dly = nod.ndx / 34;
        TweenMax.to( this.position, 2 , { ease:Expo.easeOut , delay:dly , y:0 , x:xg , z:zgo } )
    }
    this.warpSortCharts=function( model ){
        scl = Math.random()*320;
        var youuid = this.uuid;
        var nod = model.getNodeByUUID( this.uuid );
        var spacer=25;
        var xg = 0;
        var zgo = nod.ndx *2;// -1 + Math.round( ( nod.subindex*1) ) * spacer;
        var dly = nod.ndx / 34;
        TweenMax.to( this.position, 2 , { ease:Expo.easeOut , delay:dly , y:0 , x:xg , z:zgo } )
        var colors = ["#330000","#002200","#395512","#6a7fd4"]
        this.color = Math.random() * 999999;//colors[Math.round( Math.random() *3)];
        var spanl=119
        geometry = new THREE.Geometry();
        trendrnd = Math.random()*10 - Math.random()*10;
        var points = this.initObj.history;
        var range = points[0].last;
        var multiplier = 14000 / range;
        var last_sample_date = points[points.length-1].create_date;
        var first_date = points[0].create_date
        for( var i=0; i<points.length; i++){
            var new_x =  ( -first_date +  points[i].create_date ) / 59;
            var new_x2 = i;
            offsety =-209 + ( (points[i].last)  * multiplier ) / 64 ;
            geometry.vertices.push( new THREE.Vector3(new_x, offsety ,0) );
        }
        material = new THREE.LineBasicMaterial( { color:this.color , linewidth:1 } );
        xyzline = new THREE.Line(geometry, material);
        this.add(xyzline);
    }
    this.warpFlat=function(){
        TweenMax.to( this.position, 2 , { ease: Expo.easeOut, y:1 } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    this.warpWall=function(){
        TweenMax.to( this.position, 2 , { ease: Expo.easeInOut, x:-50+(this.initObj.ndx%8)*20 ,y:(this.initObj.ndx%9)*15 ,z:5   } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    this.warpY=function(){
        scl = Math.random()*220
        var yess = Math.round( Math.random()*1)
        if( yess )
            TweenMax.to( this.position, 2 , { ease: Expo.easeOut, y:scl+200 } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    this.onSomePositionsUpdated= function( evt ){
        console.log(" event fired ")
        if( this.data.futurepos && this.position.x != this.data.futurepos.x ){
            var fupos = this.data.futurepos;
            TweenMax.to( this.position , 1.5, { ease: Expo.easeOut, x:fupos.x , y:fupos.y, z:fupos.z })
        }
    }
    this.warpStar=function( model ){
        var node = model.getNodeByUUID( this.uuid );
        var links = node.links;
        for( var nd in links ){
            var targsprite = model.getNodeByUUID( links[nd] ).sprite;
            var dly = nd / 9;
            TweenMax.to( targsprite.position,2,{
            ease: Expo.easeOut,
            delay:dly,
            x:this.position.x+Math.sin( parseInt(nd))*92,
            z:this.position.z+Math.cos( parseInt(nd))*92,
            y: Math.max(0,this.position.y) })
        }
        /*
        TweenMax.to( this.scale ,2,{
            ease: Expo.easeIn,
            x:0.001,
            z:0.001,
            y:0.001,
        })*/
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    };

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
    this.buildInternals=function(){

    }


    // POSITIONING SPHERES //
    var colors = [0xFF0000,0x00bd39,0x93ff00,0x00FF00,0xFFFFFF]
    this.color = colors[Math.round( Math.random() *3)];
    var label = this.initObj.label;
    if( label =='Xindex' || label=='Domain' || label =='Project'){
        this.add( factory.getClone('exchange') )
        var titleZ= factory.getSuperText( this.HEADLINE_D , 0x760aff )
        titleZ.scale.set(0.03,0.03,0.03)
        titleZ.position.set(0,-4.03,0)
        this.add( titleZ )

    }else if( label =='Block'){
        this.add( factory.getClone('exchange') )
        var titleZ= factory.getSuperText( this.HEADLINE_D , 0x760aff )
        titleZ.scale.set(0.03,0.03,0.03)
        titleZ.position.set(0,-4.03,0)
        this.add( titleZ )

    }
    else if( label == 'World'){
        // Here we attach the Globe  , if  label=='World'
        // Here we attach the Globe  , if  label=='World'
        //#var icon_url = 'models3d/'+'world'+'.gltf'
        //#loadModelX( icon_url ).then( ( objx ) => this.add( objx ) ); //dope tho

        var icon_url = 'models3d/'+'globe'+'.glb?'+Math.round( Math.random()*9999 )
        //#loadModelX( icon_url ).then( ( objx ) =>{ this.add( objx )  });
        loadModelX( icon_url ).then( ( objx ) =>{ this.add( objx ); objx.scale.set(30,30,30);  });
        //loadModelX( icon_url ).then( function( objx ){
        //    this.add( objx );
        //});

        //objx.scale.set(5,5,5)
        // IMPORT GLOBE STYLE: Explore THis
        //const Globe = new ThreeGlobe().globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        //Globe.scale.set(0.25,0.25,0.25)
        //this.add( Globe )
        this.update = this.updatelocked
    }
    else if( label == 'Credential'){
        var icon_url = 'models3d/'+'credential'+'.glb'
        loadModelX( icon_url ).then( ( objx ) => this.add( objx ) ); //dope tho

        var a_label = 'ANONYMOUS'
        if( 'ke' in this.initObj)
            a_label = this.initObj.ke

        var titleZ= factory.getSuperText( a_label , 0x9999FF )
        titleZ.scale.set(0.01,0.01,0.01)
        titleZ.position.set(-3,-2.5,0)
        this.add( titleZ )

    }
    else if( label == 'Actor' || label == 'User' ){
        var icon_url = 'models3d/'+'subuser'+'.gltf'



        loadModelX( icon_url ).then( ( objx ) => this.add( objx ) ); //dope tho


        var a_label = 'ANONYMOUS'
        if( 'name' in this.initObj)
            a_label = this.initObj.name

        var titleZ= factory.getSuperText( a_label , 0x4444CC )
        titleZ.scale.set(0.02,0.02,0.02)
        titleZ.position.set(2,7,0)
        this.add( titleZ )

        var u_label = 'Not Defined'
        if( 'email' in this.initObj )
            u_label = this.initObj.email

        var titleZ2= factory.getSuperText( u_label , 0xDDDDDD )
        titleZ2.scale.set(0.01,0.01,0.01)
        titleZ2.position.set(2,5.5,0)
        this.add( titleZ2 )


        var geo = new THREE.PlaneBufferGeometry( 4, 4, 1, 1 );
        var mat = new THREE.MeshBasicMaterial({ color: XCOLORS.avatarbase , side: THREE.DoubleSide , wireframe:true });
        var plane = new THREE.Mesh(geo, mat);
        plane.rotateX( - Math.PI / 2);
        plane.position.set( 0,0,0 )
        this.add( plane );

        this.update = this.updatelocked
    }else{
        this.add( factory.getClone('dot') )

        var main_title = this.initObj.base || this.initObj.name || 'Not X';
        var titleZ= factory.getSuperText( main_title, XCOLORS.main_avatar_text )
        titleZ.scale.set(0.03,0.03,0.03)
        titleZ.position.set(2,1.6,0)
        this.add( titleZ )

        //var titleX= factory.getSuperText( label , 0x111111 )
        if( this.initObj.close && this.initObj.quote ){
            var titleX= factory.getSuperText( ''+this.initObj.close+'/'+this.initObj.quote +'@ '+this.initObj.domain , XCOLORS.sub_avatar_text )
            titleX.scale.set(0.02,0.02,0.02)
            titleX.position.set(2,-0.5,0)
            this.add( titleX )
        }
        if( this.initObj.label =='Asset'){
            var titleX= factory.getSuperText( 'INDEX' , 0xAAAABB )
            titleX.scale.set(0.016,0.016,0.016)
            titleX.position.set(2,-1,0)
            this.add( titleX )
        }

        if( this.initObj.domain ){
            var titleY= factory.getSuperText( ''+this.initObj.domain , 0x444411 )
            titleY.scale.set(0.015,0.015,0.015)
            titleY.position.set(6,-2.5,0)
            this.add( titleY )
        }


        if( this.initObj.delta_x != undefined ){

            if( this.initObj.delta_x >0){
                var delta_color = 0x22FF22;
            }else{
                var delta_color = 0xFF2222;
            }

            var titleDx= factory.getSuperText( ''+this.initObj.delta_x , delta_color )
            titleDx.scale.set(0.015,0.015,0.015)
            titleDx.position.set(2,-2.5,0)
            this.add( titleDx )
            var locdate = this.initObj.update_date.toLocaleString('en-US', { timeZone: 'PST' })
            var titleDx2= factory.getSuperText( ''+locdate , 0x999999 )
            titleDx2.scale.set(0.012,0.012,0.012)
            titleDx2.position.set(2,-4.5,0)
            this.add( titleDx2 )

        }


    }

    
    var mouse = new THREE.Vector2();
    var last_x= 0;
    var last_z= 0;
    var _velocity = 0.0;
    var x_velocity = 0.0;
    var z_velocity = 0.0;
    var smooth_step = 0.1;
    var SmoothTime = 5.0;
    var _time = 0.1
    this.getIntersection = function( ev ){
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [this.plane] ,true );  // c , recursive
        return intersects[0]
    }
    this.getIntersectionTouch = function( ev ){
        mouse.x = ( ev.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( ev.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [this.plane] ,true );  // c , recursive
        return intersects[0]
    }    
    this.movingMouse=function(ev){
        
        if( ev.touches ){
            ev.preventDefault();
            ev = event.changedTouches[ 0 ];
            intersect = this.getIntersectionTouch(ev)
            l = 'wh'
        }else
        {
            intersect = this.getIntersection(ev)
        }
        x_velocity = intersect.point.x - last_x
        z_velocity = intersect.point.z - last_z
        try{
            this.position.x += x_velocity
            this.position.z += z_velocity
        }catch(err){}
        last_x = intersect.point.x
        last_z = intersect.point.z

    }.bind(this)
    this.updateTossScroll=function(){
        if( _time <= SmoothTime){
            x_velocity = x_velocity/1.05;
            z_velocity = z_velocity/1.05;
            this.position.x += x_velocity;
            this.position.z += z_velocity;
            _time += smooth_step;
            requestAnimationFrame( this.updateTossScroll )
        }else{
            _underInertia = false;
            _time = 0.0;
            x_velocity = 0;
            z_velocity = 0;
            last_x = this.position.x;
            last_z = this.position.z;
        }
    }.bind(this)
    this.onUpEvent=function( ev ){
        controls.enabled = true;
        document.removeEventListener('mousemove' , this.movingMouse );
        document.removeEventListener('mouseup' , this.onUpEvent );
        
        var dragHoldTime = (new Date() - this.last_drag_start_time )
        if( dragHoldTime > 200 ){
            requestAnimationFrame( this.updateTossScroll );    
        }
        
    }.bind(this)
    this.onTouchUpEvent=function( ev ){
        controls.enabled = true;
        document.removeEventListener('touchmove' , this.movingMouse );
        document.removeEventListener('touchend' , this.onTouchUpEvent );
        var dragHoldTime = (new Date() - this.last_drag_start_time )
        if( dragHoldTime > 200 ){
            requestAnimationFrame( this.updateTossScroll );
        }
    }.bind(this)
    this.on('mousedown', function(ev){
        this.last_drag_start_time=new Date();
        controls.enabled = false;
        x_velocity = 0;
        z_velocity = 0;
        last_x = this.position.x;
        last_z = this.position.z;
        document.addEventListener('mousemove' , this.movingMouse );
        document.addEventListener('mouseup' , this.onUpEvent );
    });
    this.on('touchstart', function(ev){
        this.last_drag_start_time=new Date();
        controls.enabled = false;
        x_velocity = 0;
        z_velocity = 0;
        last_x = this.position.x;
        last_z = this.position.z;
        document.addEventListener('touchmove' , this.movingMouse );
        document.addEventListener('touchend' , this.onTouchUpEvent );
    });

    window.addEventListener('somePositionsUpdatedEvent', this.onSomePositionsUpdated.bind(this), false);
    window.addEventListener('mapChanged', this.onMapChangeEvent.bind(this), false);
    window.addEventListener('mapSaveEvent', this.onMapSaveEvent.bind(this), false);
    window.addEventListener('sortEvent', this.onSortEvent.bind(this), false);
    window.addEventListener('actionEvent', this.onActionEvent.bind(this), false);
    window.addEventListener('selectModeEvent', this.onSelectModeEvent.bind(this), false);
};
AvatarX.prototype = Object.create( BaseAvatar.prototype );
AvatarX.prototype.constructor = AvatarX;
AvatarX.prototype.onSortEvent = function(e) {
    var model = e.detail.model;
    this.warpSort( model )
};
AvatarX.prototype.onActionEvent = function(e) {
    var model = e.detail.model;
    var model = e.detail.model;
    var map = model.cur_map;

    if( model.action =='yzero'){
        this.warpFlat( model )
    }else if( model.action == 'demand'){
        this.warpPhaseDemand( model )
    }else if( model.action == 'samples'){
        this.warpSortCharts( model )
    }

};
AvatarX.prototype.onMapSaveEvent = function(e ){

    console.log(' save position in ',this.uuid , ' : ', this.position )
}
AvatarX.prototype.onMapChangeEvent = function(e) {
    var model = e.detail.model;
    var model = e.detail.model;
    var map = model.cur_map;

    if( map == 0 ){
        //
    }
    else if( map==1)
    {   this.warp();
        this.warpRandom();
    }
    else if( map==2)
    {

        this.warpWall();
    }
    else if( map==3)
    {   this.warpPhase1( model );
    }else if( map==5) {
        this.warpStar( model );
        //this.warpY();
    }else if( map == 6)
    {   //this.warpPhase1( model );
    }else if( map == 7)
    {
        this.iconOn( model );

    }else if( map == 8)
    {
        this.iconOff( model );

    }
};
AvatarX.prototype.deallocate=function(){
    window.removeEventListener('dataUpdate' , this.onMapChangeEvent.bind(this) , false);
    window.removeEventListener('sortEvent' , this.onSortEvent.bind(this) , false);
    object.traverse( function ( child ){
        if ( child.geometry !== undefined ) {
            child.geometry.dispose();
            child.material.dispose();
        }
    });
    this.geometry.dispose();
    this.geometry = null; // or undefined
    delete this.geometry
}
//const offscreen = document.querySelector('canvas').transferControlToOffscreen();
//const worker = new Worker('/static/js/worker.js');
//worker.postMessage({ canvas: offscreen }, [offscreen]);

//window.addEventListener("message", receiveMessage, false);
/* wow */
/*
function receiveMessage(event){
    console.log('win')
    if (event.origin !== "http://example.org:8080")
        console.log('win')
    return;
}
*/
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8851/loginprivate", true);
xhr.withCredentials = true;
xhr.setRequestHeader("Authorization", 'Basic ' + btoa('myuser:mypswd'));xhr.onload = function () {
    console.log(xhr.responseText);
};
//xhr.send();

var requirex= {}
console.log('  IsoModel interpreting 3rd ')
IsoModel = function() {

    var maps = []
    var maps = {}
    // maps['opener'] .  maps[0]

    var path = require('ngraph.path');

    function findPath() {
        var path_related = []
        for (l in links) {
        }
    }

    console.log('  IsoModel instantiating 3rd ')
    this.focusnode = 0;
    this.hovernode = 0;
    this.cur_map = 0;
    this.positions = []
    this.stop = false;
    this.nodes = []
    this.links = []
    this.mode = 'normal'
    var createGraph = require('ngraph.graph');
    console.log(' requirex worked? : ')
    console.log(createGraph)
    this.graph = createGraph();
    var labels_radiuses = {
        'App': 1,
        'Domain': 2.5
    }
    var TWOPI = 2.0 * Math.PI;
    this.focusobject = false;
    function randSphereSurface(r) {
        var phi = TWOPI * Math.random();
        var theta = 2.0 * Math.asin(Math.sqrt(Math.random()));
        var x = r * Math.sin(theta);
        var y = x * Math.sin(phi);
        //x*= x*Math.cos(phi);
        var z = r * Math.cos(theta);

        return {
            x: x,
            y: y,
            z: z
        };
    }
    function pointOnSphere(lat, long, r) {
        phi = lat;
        theta = long;
        radius = r;
        return {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(theta) * Math.sin(phi)
        };

    }

    this.outflowFromFocused = function() {

        // find which object it is connected to

        console.log(' focused Object : ', this.focusobject)
        var focused_id = this.focusobject.id;

        let path = require('ngraph.path');
        let pathFinder = path.aStar(this.graph);
        // graph is https://github.com/anvaka/ngraph.graph

        let fromNodeId = focused_id;
        let toNodeId = 4129;
        let foundPath = pathFinder.find(fromNodeId, toNodeId);
        var stpyo = foundPath;

        for (var x = foundPath.length - 1; x > 0; x--) {
            var a = ''+foundPath[x].id
            var b = ''+foundPath[x - 1].id

            if (this.graph.getLink(a, b)) {
                var curlink = this.graph.getLink(a, b)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            } else {
                var curlink = this.graph.getLink(b, a)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            }
        }

        window.dispatchEvent(new CustomEvent('linkFlowEvent',{
            detail: {
                model: this
            }
        }))

    }

    this.outflowFromFocusedWorks = function() {

        // find which object it is connected to

        console.log(' focused Object : ', this.focusobject)
        var focused_id = this.focusobject.id;

        let path = require('ngraph.path');
        let pathFinder = path.aStar(this.graph);
        // graph is https://github.com/anvaka/ngraph.graph

        let fromNodeId = focused_id;
        let toNodeId = 89;
        let foundPath = pathFinder.find(fromNodeId, toNodeId);
        var stpyo = foundPath;

        for (var x = 0; x < foundPath.length - 1; x++) {
            var a = foundPath[x].id
            var b = foundPath[x + 1].id

            if (this.graph.getLink(a, b)) {
                var curlink = this.graph.getLink(a, b)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = a;
                curlink.data.flowTo = b;
            } else {
                var curlink = this.graph.getLink(b, a)
                if (curlink.data == undefined)
                    curlink.data = {};
                curlink.data.flowFrom = b;
                curlink.data.flowTo = a;
            }
        }

        window.dispatchEvent(new CustomEvent('linkFlowEvent',{
            detail: {
                model: this
            }
        }))

    }

    this.setLinearIndex = function() {
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.subindex = n;
        }
        ;
    }
    this.setDemandIndexes = function() {
        var stars_hash = {};
        var iter_inner = 1;
        var iter_outer = 1;
        this.nodes = this.nodes.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            // ignore upper and lowercase
            var nameB = b.name.toUpperCase();
            // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
            // names must be equal
        });
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            if (cur_node.type == 'hub' || cur_node.type == 'market_index' || cur_node.type == 'asset_index') {
                cur_node.subindex = iter_inner;
                iter_inner++;
            } else if (cur_node.type == 'market') {
                cur_node.subindex = iter_outer;
                iter_outer++;
            }
        }
        ;var g = 'yo';
    }
    this.setGridEnumerateIndexes = function() {
        var iter_inner = 1;
        var iter_outer = 1;
        //this.nodes.sort( function(a,b){ return a.risk-b.risk; } );
        this.nodes.sort((a,b)=>(a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        for (var s in this.nodes) {//this.nodes[s]['ndx']=s;
        //this.layout_getNodePosition( node.id )
        }
        for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.positions['futurex'] = pointOnSphere(n / 3, n % 3, 140.0)
        }
    }
    this.setGridEnumerateIndexesWorkingRings = function() {
        var iter_inner = 1;
        var iter_outer = 1;
        this.nodes.sort((a,b)=>(a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        for (var s in this.nodes) {
            this.nodes[s]['ndx'] = s;
        }
        ;for (var n in this.nodes) {
            var cur_node = this.nodes[n];
            cur_node.positions['futurex'] = pointOnSphere(n / 3, n % 3, 140.0)
        }
        ;console.log('whatever')
    }
    this.setStarIndexes = function() {
        var center_possibles = ["Xindex", "Company"]
        var stars_hash = {};
        for (var l in this.links) {
            var cur_link = this.links[l];
            var a_node = this.getNodeByUUID(cur_link.a);
            var b_node = this.getNodeByUUID(cur_link.b);
            if (center_possibles.indexOf(a_node.label) != -1) {
                if (!stars_hash[a_node.uuid]) {
                    stars_hash[a_node.uuid] = []
                }
                a_node.central = true;
                stars_hash[a_node.uuid].push(b_node)
            }
            ;if (center_possibles.indexOf(b_node.label) != -1) {
                if (!stars_hash[b_node.uuid]) {
                    stars_hash[b_node.uuid] = []
                }
                stars_hash[b_node.uuid].push(b_node)
                b_node.central = true;
            }
            ;
        }
        ;var hubcount = 0;
        for (var s in stars_hash) {
            hubcount += 1;
            m_node = this.getNodeByUUID(s);
            m_node.star = hubcount;
            subs_arr = stars_hash[s]
            for (var ss in subs_arr) {
                subs_arr[ss].subindex = ss;
                subs_arr[ss].star = m_node.star;
                subs_arr[ss].starparent = m_node;
            }
        }
        var g = 'yo';
    }
    this.getNodeByUUID = function(guuid_in) {
        return this.graph.getNode(guuid_in)
        //return this.nodes[uuid_in];
    }
    this.updateStop = function() {
        this.stop = true;
        console.log("Dispatch the event.");
        window.dispatchEvent(event);
    }
    this.setData = function(objIn) {
        window.dispatchEvent(new CustomEvent('dataUpdate',{
            detail: {
                model: this
            }
        }))
    }
    this.loadSignals = function() {
        var rnd = Math.round(Math.random() * 9999);
        var requestURL = '/unique_signals' + '?rnd=' + rnd;
        var request = new XMLHttpRequest();
        //
        request.open('GET', requestURL);
        request.onload = function() {
            var superHeroes = request.response;
            console.log(superHeroes)
        }
        request.responseType = 'json';
        request.send();
    }
    this.loadDataNetwork = function(objIn) {
        var requestURL = '/unique_signals' + '?rnd=' + Math.round(Math.random() * 9999);
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.onload = function() {
            var res = request.response;
            for (var r in res) {
                var curitem = res[r];
                var obj = {
                    uuid: "n01",
                    class: '',
                    name: "x",
                    star: 0,
                    subindex: 0,
                    risk: 5,
                    links: [],
                    ndx: 1,
                    futurepos: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    positions: {
                        default: {
                            x: 0,
                            y: 0,
                            z: 0
                        }
                    }
                };
                obj.guuid = 'n' + curitem.pk;
                this.nodes[obj.guuid] = obj;
            }
            window.dispatchEvent(new CustomEvent('dataUpdate',{
                detail: {
                    model: this
                }
            }))

        }
        .bind(this)
        request.responseType = 'json';
        request.send();
    }
    this.clearData = function(objIn) {
        this.nodes = {}
        this.links = {}
        window.dispatchEvent(new CustomEvent('clearUpdate',{
            detail: {
                model: this
            }
        }))
    }
    this.parseCluster = function(objIn) {
        var temp_nodes = []
        for (var i in objIn.nodes) {
            var cur_node = objIn.nodes[i].fields ? objIn.nodes[i].fields : objIn.nodes[i];
            cur_node.futurepos = {
                x: 0,
                y: 0,
                z: 0
            };
            //cur_node.meta =   cur_node.meta ;
            cur_node.star = 0;
            cur_node.subindex = 0;
            cur_node.model = this;
            cur_node.id = cur_node.guuid;
            cur_node.data = {};
            cur_node.links = []
            // here cache links necessary ?
            cur_node.positions = {
                default: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
            this.graph.addNode(cur_node.guuid, cur_node)
            temp_nodes.push(cur_node);
        }
        for (l in objIn['links']) {
            var lnk = objIn['links'][l]
            this.graph.addLink(lnk['a'], lnk['b'], {
                model: this,
                label: lnk.label,
                guuid:lnk.guuid
            })
        }
        // Arbitrary transfer links
        //this.graph.addLink( "47" , "25" )
        //this.graph.addLink( "47" , "57" )
        //this.graph.addLink( "56" , "57" )
        //this.graph.addLink( "55", "999")
        //this.graph.addLink( "999", "1001")
        this.links = [];
        //objIn.links;
        this.nodes = temp_nodes;

        this.graph.forEachNode(function(node) {
            console.log(node.id, node.data);
        });
        window.dispatchEvent(new CustomEvent('dataUpdate',{detail: {model: this}}))

    }
    this.loadDataLocal = function(objIn){ }
    this.resetFocusObject = function(){
        this.focusnode = false;
        this.focusobject = false;
    }
    this.setFocusObject = function(id_in) {
        this.focusnode = id_in;
        this.focusobject = this.getNodeByUUID(id_in);

        window.dispatchEvent(new CustomEvent('focusEvent',{
            model: this,
            detail: {
                model: this
            }
        }))
    }
    this.setPacket = function(objIn) {
        window.dispatchEvent(new CustomEvent('packetEvent',{
            detail: {
                model: this
            }
        }))
    }
    this.setSort = function(objIn) {

        this.nodes.sort(function(a, b) {
            return a.risk - b.risk;
        });
        for (var s in this.nodes) {
            this.nodes[s]['ndx'] = s;
        }
        window.dispatchEvent(new CustomEvent('sortEvent',{
            detail: {
                model: this
            }
        }))

    }
    this.setAction = function(objIn) {
        this.action = objIn.action;

        switch (objIn.action) {
        case 'demand':
            this.setDemandIndexes();
        case 'samples':
            this.setLinearIndex();
        }

        window.dispatchEvent(new CustomEvent('actionEvent',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }
    this.setMode = function(map_in) {
        this.cur_map = map_in
        this.setStarIndexes();

        /*
        if( map_in == 6 )
        {
            var starcenter = 0;
            for( var s in this.nodes){

                if( this.nodes[s].links.length >= 1 )
                {
                    this.nodes[s].star = starcenter;
                    starcenter++;
                };
            };
        }*/

        window.dispatchEvent(new CustomEvent('mapChanged',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }
    this.updatePointerState = function(event) {
        // slick new functions
        console.log(' updatePointer state,  Moue going through model')
    }
    this.addActor = function() {

        var l = this.graph;
        this.graph.addNode( 'unxid',{ name:'new name'})

        window.dispatchEvent(new CustomEvent('dataUpdate',{detail: {model: this}}))
    }
    this.activateLinkSelection = function(){
        this.mode='select'
        console.log( 'targeting link from: ' , this.focusnode ,  ' to: ', 'tbd' );
        window.dispatchEvent(new CustomEvent('selectModeEvent',{detail: {model: this}}))
    }
    this.setHoverSelect=function(id_in) {

        console.log(' model has hover node: ' , id_in );
        this.hovernode = this.getNodeByUUID(id_in);
        window.dispatchEvent(new CustomEvent('selectHoverEvent',{detail: {model: this}}))
    }
    this.setNewLink=function( id_in ){
        console.log(' new possible link: ', this.focusobject , this.getNodeByUUID( id_in ) );
        this.graph.addLink( this.focusobject.id , id_in , {type:'fresh'} );
        window.dispatchEvent(new CustomEvent('dataUpdate',{detail: {model: this}}))
        this.mode = 'normal'
        window.dispatchEvent(new CustomEvent('clearViewsEvent',{detail: {model: this}}))
    }
    this.arrangeAround=function(){

        //this.focusobject.sprite.arrangeAround()
        var related_nodes = this.graph.getLinks( this.focusnode )
        var focused_sprite = this.getNodeByUUID( this.focusnode ).data.sprite;
        
        // all future pos : reset 
        // only relevant future pos set to COS * index   focused_sprite.position.x
        this.graph.forEachNode( function( node ){
            node.data.futurepos = false;
        })
        
        var ndx = 0;
        
        this.graph.forEachLinkedNode( this.focusnode , function(linkedNode, link){
            var yo= 3;

            var linkedNodeX = this.getNodeByUUID( link.toId )
            if( ! linkedNodeX.data.futurepos ){ linkedNodeX.data.futurepos={} }
            linkedNodeX.data.futurepos.x = focused_sprite.position.x + (Math.cos(ndx)*20);
            linkedNodeX.data.futurepos.y = 0;
            linkedNodeX.data.futurepos.z = focused_sprite.position.z + (Math.sin(ndx)*20);            
            ndx++;
        }.bind(this))
        window.dispatchEvent( new CustomEvent('somePositionsUpdatedEvent' , {detail: {model: this} }))
        

        /*
        for ( var xn in related_nodes ){

            var cur_link = related_nodes[xn]
            var related_node = this.getNodeByUUID( cur_link.toId )
            
            if( ! related_node.data.futurepos ){ related_node.data.futurepos={} }
            related_node.data.futurepos.x = 12;
            related_node.data.futurepos.y = 42;
            related_node.data.futurepos.z = 52;

        }*/

        
    }
    this.saveMap = function() {
        window.dispatchEvent(new CustomEvent('mapSaveEvent',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }
    this.setMap = function(map_in) {
        this.cur_map = map_in;

        switch (map_in) {
        case 0:
            this.resetFocusObject();
        case 1:
            this.resetFocusObject();
        case 2:
            this.resetFocusObject();
            var ndx=0
            this.graph.forEachNode( function(nod){
                nod.data.ndx=ndx;
                ndx++;
            }.bind(this))
        }

        window.dispatchEvent(new CustomEvent('mapChanged',{
            detail: {
                model: this
            },
            detail2: "something else"
        }))
    }

}


// THREE.SceneUtils.traverseHierarchy( object, function ( object ) { object.visible = false; } );


SwarmView = function(){
    THREE.Mesh.call( this);
    this.type = 'SwarmView';

    var physicsSettings = { springLength:60, gravity: -0.01,   theta:0.8, integrator: 'euler',//'verlet'
                            springCoeff:0.0008, dragCoeff:0.02, timeStep:20 };
    this.plane;
    this.subspace = new THREE.Group();
    this.add( this.subspace )

    this.node_sprites = {};
    this.link_sprites = {};
    this.interval = 0;
    this.central_node;
    this.last_click_time = new Date();
    var ntrvl = 0;

    this.onDataUpdate = function (e){
        var model = e.detail.model;
        this.layout = require('./')(model.graph , physicsSettings );
        Window.simulator = this.layout.simulator.settings;
        Window.layout = this.layout

        model.graph.forEachNode(function (node) {
            //var pos = this.layout.getNodePosition(node.id);
            var node_data = node.data
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

        controller.setMap({map:6});
        var node_count = model.graph.getNodesCount()
        this.layout.simulator.springLength=30+(node_count/3);
        physicsSettings.springLength=30+(node_count/3);
        console.log('S Len: ', this.layout.simulator.springLength )

        /* TIMELINE  LIGHT TIMELINE
        for( var ye =10; ye<32; ye++){
            cube = new THREE.Mesh(
                new THREE.CubeGeometry( 17, 8, 0.1 ),
                new THREE.MeshNormalMaterial() );
            this.add( cube );
            cube.position.set(-300+(ye*18),-0.3,0)

            var titleX= getSuperText( '20'+ye , 0xAAAAFF )
            titleX.scale.set(0.05,0.05,0.05)
            titleX.position.set( -300+(ye*18)-8,0,1.1)
            this.add( titleX )
        }*/

        //this.layout.pinNode( 148 );
        //this.layout.pinNode( 100 );

    }.bind(this)
    window.addEventListener('dataUpdate',this.onDataUpdate , false); // for
    window.addEventListener('mapChanged', function (e) {
        var model = e.detail.model;
        var map = model.cur_map;

        if( map == 0 ){
            TweenMax.to( this.rotation , 1.0 , { ease:Expo.easeInOut , delay:0 , x:0 , y:0 , z:0 } )
            TweenMax.to( this.position , 1.0 , { ease:Expo.easeInOut , delay:0 ,x:0, y:0 , z:0 } )
            TweenMax.to( this.subspace.position , 1.0 , { ease:Expo.easeInOut , delay:0 ,x:0, y:0 , z:0 } )
            //this.update = this.updateGridEnumerate;
        }else if( map==1){
            //TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:1.1 } )

            //this.update = this.updateRandom;
        }else if( map==3){
            //TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            this.update = this.updateBlank;
        }else if( map==6){
            //TweenMax.to( this.rotation , 2.4 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            //this.update = this.updateGridEnumerate;
            this.update = this.updateForceDirected;
        };
        //console.log("@#F@# ")
    }.bind(this) , false);
    window.addEventListener('clearUpdate', function (e){  // Listen for the event.
        for (var i = this.swarm_holder.children.length - 1; i >= 0; i--) {
            var cur_sprite = this.swarm_holder.children[i];
            try{
                cur_sprite.deallocate();
            }catch(err){};
            this.swarm_holder.remove( cur_sprite );
        }
        this.nodes=[];
        this.links=[];
    }.bind(this) ,false )
    window.addEventListener( 'focusEvent' , function(e){

        var now = new Date()
        var elapsed_since_last_tap = now - this.last_click_time;
        var model = e.detail.model;
        var clicked_id = model.focusnode;
        //var selected_node = model.getNodeByUUID( id_in )
        var clicked_node= model.getNodeByUUID( clicked_id )
        var clicked_sprite = clicked_node.data.sprite;

        if( model.focusobject ){
            var spos = clicked_sprite.position;
            var tpos = this.position;

            //var vector = new THREE.Vector3();
            //vector.setFromMatrixPosition( clicked_sprite.matrixWorld );
            //var spos = vector;


            // HERE THIS IS REPEATING THE OFFSET OVER AND OVER , IT MUST BE FIXED SOMWHOEW
            //TweenMax.to( this.position , 1.6 , { ease:Expo.easeInOut , delay:0 , y:(0-spos.y) , x:(0-spos.x), z:(0-spos.z) } )
            //TweenMax.to( this.rotation , 1.6 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )
            //TweenMax.to( this.subspace.position , 1.6 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )

            if( elapsed_since_last_tap < 20000 ){

            }
            this.last_click_time = new Date()
            // selected_node.sprite.position
        }else{
            TweenMax.to( this.position , 2.1 , { ease:Expo.easeInOut , delay:0 , y:0, x:0, z:0 } )
            TweenMax.to( this.rotation , 2.1 , { ease:Expo.easeInOut , delay:0 , y:0 , x:0, z:0 } )
        }
        // attach background_tap listener here ?

    }.bind(this))

    this.drawCoordinates=function(){
        var axis_color = "#CCCCCC"
        var colors = ["#FF7777","#FF7777","#7777FF","#7777FF","#7777FF"]
        this.color = colors[Math.round( Math.random()*3) ];

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

        var l_material = new THREE.LineBasicMaterial( { color:XCOLORS.floor_line , linewidth:1 } );/* linewidth on windows will always be 1 */
        var total_lines=31;
        var one_space=24;
        var line_length =((total_lines*one_space)-one_space)/2;
        var half_offset= -Math.floor(total_lines/2)*one_space;
        for( var i=0; i<total_lines; i++){
            var geometry = new THREE.Geometry();
            geometry.vertices.push( new THREE.Vector3( 0, -60.2, line_length ) ); //x, y, z
            geometry.vertices.push( new THREE.Vector3( 0, -60.2,-line_length ) );

            var line = new THREE.Line(geometry, l_material);
            var newpos = half_offset+(i*one_space)
            line.position.x=newpos;
            this.subspace.add(line);

            var line = new THREE.Line(geometry, l_material);
            var newpos = half_offset+(i*one_space)
            line.position.z=newpos;
            line.rotation.y=Math.PI/2;
            this.subspace.add(line);
        }



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

        this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(600, 600, 4, 4),
        new THREE.MeshBasicMaterial( {
            color: 0x248f24, alphaTest: 0, visible: false
        }));
        this.plane.position.set( 0,-0.1,0)
        this.plane.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.subspace.add( this.plane )
        this.subspace.add( new NodeMenu( {floor:this.plane}) )
        this.subspace.add( new MetaView() )

        // mesh.material.colorWrite = false; // <================= new
        // mesh.material.visible = false;
        // mesh.renderOrder = 0; // <===== new
        // PLANE
        //var geo = new THREE.PlaneBufferGeometry( spanl*2, spanl*2, 8, 8 ); //giant plane

    }
    this.drawCoordinates();
    this.updateForceDirected = function() {
        //this.rotation.y += 0.0001;
        this.layout.step();

        //this.layout.pinNode( nodeId , !layout.isNodePinned(node));

        for (var key in this.node_sprites) {
            var cube = this.node_sprites[key];
            var pos = this.layout.getNodePosition(key);
            cube.position.x = pos.x;
            cube.position.y = pos.y;
            cube.position.z = pos.z;


            cube.update()
        }
        for (var key in this.link_sprites) {
            var cube = this.link_sprites[key];
            cube.update()
        }

        if( ntrvl>850){
            //this.update = this.updateBlank;
            ntrvl=0;
        }
        ntrvl++;
    }
    this.updateGridEnumerate = function() {
        //this.rotation.y -= 0.0002;
        for( n in this.nodes ){
            var fu_vec = this.nodes[n].positions['futurex']
            var cur_vec = this.nodes[n].sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/50
            cur_vec.y  += ((  fu_vec.y  ) - cur_vec.y )/20
            cur_vec.z  += ((  fu_vec.z  ) - cur_vec.z )/100
        }
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
        //        this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
            //    this.links[l].sprite.update();
            }catch( e ){};
        }        
    }
    this.updateGridEnumerateRand = function() {
        //this.rotation.y -= 0.0002;
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            fu_point = cur_node.positions['futurex']

            // iterate over virtual springs
            // each spring connects two nodes
            // iteration is in fixed order so that one always starts first one ends last
            // move node at one end of spring to some relative position of first end of spring 
            var orig_n = n
            var remlen = 6 % Math.max( 1,n)
            var lenrem = 1 + n % 6
            var offset = 5 - n % 6;
            var xclass = cur_node.label;
            //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            fu_vec = this.nodes[remlen].sprite.position
            
            cur_vec = cur_node.sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/100
            cur_vec.y  += ((  (n)+fu_vec.y  ) - cur_vec.y )/100
            cur_vec.z  += (fu_vec.z - cur_vec.z )/100

        }
    }
    this.updateGridEnumerateMoveTowards = function() {
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            if( n > 0 ){
                cur_node = this.nodes[n]
                //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
                //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
                //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
                //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
                fu_point = cur_node.positions['futurex']
                random_x = Math.random()*10-Math.random()*10
                random_y = Math.random()*10-Math.random()*10
                random_z = Math.random()*10-Math.random()*10
                //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
                //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position

                cur_vec = cur_node.sprite.position
                //cur_node.sprite.translateOnAxis( fu_vec ,0.001)
                cur_vec.x  += ( fu_vec.x - cur_vec.x )/100
                cur_vec.y  += ( fu_vec.y - cur_vec.y )/100
                cur_vec.z  += ( fu_vec.z - cur_vec.z )/100
                //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
                //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            }; 
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }

        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }
    this.updateGridEnumerateSliding = function() {
        //this.rotation.y -= 0.0002;
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
            //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
            //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
            fu_point = cur_node.positions['futurex']
            random_x = Math.random()*10-Math.random()*10
            random_y = Math.random()*10-Math.random()*10
            random_z = Math.random()*10-Math.random()*10
            fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            cur_node.sprite.translateOnAxis( fu_vec ,0.001)
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }

        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }
    this.updateElastic = function(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                // calculate the net force on this sprite from surrounding sprites?
                var center_sprite = this.nodes[i].sprite;
                for( var gx in this.nodes ){
                    var related_sprite = this.nodes[gx];
                }
                //this.nodes[i].sprite.position.y -= this.nodes[i].sprite.position.y / 12;
                //this.nodes[i].sprite.position.x = ( this.nodes[i].sprite.position.x - (this.central_node.sprite.position.x/22) ) ;

                this.central_node.sprite.position.x = this.central_node.sprite.position.x +( (0-this.central_node.sprite.position.x ) / intrvl );
                this.central_node.sprite.position.z = this.central_node.sprite.position.z +( (0-this.central_node.sprite.position.z ) / intrvl );
                this.central_node.sprite.position.y = this.central_node.sprite.position.y +( (0-this.central_node.sprite.position.y ) / intrvl );

                for( var cx in this.central_nodes ){
                    var periphery_node = this.central_nodes[cx];
                    periphery_node.sprite.position.x = this.central_node.sprite.position.x;
                    periphery_node.sprite.position.z = this.central_node.sprite.position.z;// + ( (this.central_node - periphery_node.sprite.position.x)/intrvl );
                }
            }catch( e ){};
        }

        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
                // link get a <-( distance / force )-> b
                // a.moveTowards / Away
                // b.moveTowards / Away
            }catch( e ){};
        }
    }
    this.updateRandom = function(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                this.nodes[i].sprite.position.x += i / 30;
                this.nodes[i].sprite.position.z -= i / 50;
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }
    this.updateBlank = function(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for (var key in this.link_sprites) {
            var cube = this.link_sprites[key];
            cube.update()
        }
    }
    this.updateOriginal = function(){
        //this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;

        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }
    this.onCamReset = function(){}
    this.selfUpdate = function(){
        requestAnimationFrame( this.selfUpdate );
        var timestamp = new Date() * 0.0005;
        nodes[0].position.x+=Math.sin(timestamp) * 3;
        nodes[0].position.z+=Math.cos(timestamp) * 3;
        nodes[1].position.x+=Math.cos(timestamp) * 3;
        nodes[1].position.z+=Math.sin(timestamp) * 3;
        linexx.geometry.verticesNeedUpdate = true;
    }
    this.update = this.updateBlank;
}
SwarmView.prototype = Object.create( THREE.Mesh.prototype );
SwarmView.prototype.constructor = SwarmView;
SwarmView.prototype.getMesh = function() {
    return this.mesh;
}
//module.exports = SwarmView


/*                                         TINY
 ____    ____       _       _____  ____  _____
|_   \  /   _|     / \     |_   _||_   \|_   _|
  |   \/   |      / _ \      | |    |   \ | |
  | |\  /| |     / ___ \     | |    | |\ \| |
 _| |_\/_| |_  _/ /   \ \_  _| |_  _| |_\   |_
|_____||_____||____| |____||_____||_____|\____|
//        X-Graph Visualizer  V0.13          */

var lightTheme = {
    link:0xCCCCCC ,  avatarbase:0xCCCCCC, floor_line:0xffdcc7, node_color:0x82a200, dbase:0xa948ff,  bg:0xFFFFFF ,
    link_colors:[0xffbebe,0xffcb55,0xffc966,0xfff040,0xd9ff40,0xbcff39] }
var darkTheme = {
    link:0xCCCCCC ,  avatarbase:0xCCCCCC,  floor_line:0x003344, node_color:0x82a200,
    dbase:0xa948ff,  bg:0x000000, link_color_transfer:0x2e379F, link_color_convert:0x4b7F7C,
    main_avatar_text:0xFFCC99,       sub_avatar_text:0xAACCFF,
    link_colors:[0x00FFbe,0x33cbFF,0x33FF44,0xfff040,0xd9ff40,0xbcff39] }
var XCOLORS = darkTheme;
var container = document.createElement( 'div' ); document.body.appendChild( container );
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
var renderer = new THREE.WebGLRenderer( { antialias:true } );// NO antialiasing ? Faster but sucks
var raycaster = new THREE.Raycaster();
renderer.setClearColor( XCOLORS.bg );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.sortObjects = false;
container.appendChild( renderer.domElement );
var scene = new THREE.Scene();
//scene.fog = new THREE.Fog( 0xFFFFFF, 1, 10000 );
scene.add( new THREE.AmbientLight( 0xFFFFFF ) );
//scene.add( new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ) );
var interaction = new THREE.Interaction(renderer, scene, camera);
var factory = new AvatarFactory()
var swarmView = new SwarmView();       scene.add( swarmView );
var overlayView = new OverlayView();   //scene.add( overlayView );
var stats = new Stats();               container.appendChild( stats.dom );
var model = new IsoModel()   //var model = new IsoModel();//var IsoModel = require('./isomodel.js')
var controller = new IsoController( {model:model , camera:camera , target:swarmView , renderer:renderer  } );//controller.start()
window.camera = camera;
window.renderer = renderer;

// CUSTOM IMPLIENTATION ?
controls = new THREE.OrbitControls( camera, renderer.domElement);
controls.enableDamping=false;
controls.dampingFactor=2.2;
controls.screenSpacePanning=false;
controls.enablePan=true;

function render() {
    renderer.render( scene, camera );
}
requestAnimationFrame( animate );
function animate() {
    stats.update();
    swarmView.update();
    camera.updateProjectionMatrix();
    render();
    requestAnimationFrame( animate );
    //controls.update();
    //TWEEN.update();
}

window.addEventListener('message', controller.handleIFRMessage , false);


//import greet from '/js/greeter.js';
//greet();