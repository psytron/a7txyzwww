Avatar = function( objIn )
{
    var elementary = "SUPER ELEMENTARRY";
    this.elem = elementary;
    this.uuid = objIn['uuid'];
    var uuid = objIn['uuid'];
    this.self = this;
    this.self = this;
    this.floatingRef = objIn;
    var floatingRef = objIn;
    this.mesh = new THREE.Object3D();  // Create an empty container that will hold the different parts of the cloud
    var lemesh = this.mesh;
    var geom = new THREE.BoxGeometry(2,2,2); // this shape will be duplicated to create the cloud  // create a cube geometry;
    //var mat = new THREE.MeshPhongMaterial( new THREE.Color( 'skyblue' )  );// create a material; a simple white material will do the trick
    var nBlocs = 1+Math.floor(Math.random()*3); // duplicate the geometry a random number of times

    var geom = new THREE.BoxGeometry( 2, 2, 2 );
    var mat = new THREE.MeshNormalMaterial();

    setTimeout(function(){
        //warp();
    }, 4000);

    //var mesh = new THREE.Mesh( geometry, material );
    this.mesh.position.x = Math.random() * 2400 - 1200;
    this.mesh.position.z = Math.random() * 2400 - 1200;
    this.mesh.position.y = 14;

    this.mesh.fireYo=function(){
        console.log("fire yo yo yo")
    }
    //this.mesh.scale.x = 5; this.mesh.scale.y = 5; this.mesh.scale.z = 5;

    //mesh.updateMatrix();
    /*
    var loader = new THREE.ObjectLoader();
    loader.load("/static/models/teapot-claraio.json", function ( obj ){
        obj.scale.x = 10; obj.scale.y = 10; obj.scale.z = 10;
        lemesh.add( obj );
    })*/

    //POSITIONING SPHERES
    var geometry = new THREE.SphereGeometry(12, 4, 4);
    var material = new THREE.MeshBasicMaterial( { color: 0x11FF00, wireframe: true } );
    var sphere = new THREE.Mesh( geometry, material );
    lemesh.add( sphere );

    // LINE
    geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( 0, 0, 1500 ) ); //x, y, z
    geometry.vertices.push( new THREE.Vector3( 0, 0,-1500 ) );
    material = new THREE.LineBasicMaterial( { color: 0x020202 , linewidth: 1 } );/* linewidth on windows will always be 1 */
    line = new THREE.Line(geometry, material);
    lemesh.add(line);
    var m = new THREE.Mesh(geom, mat);  // create the mesh by cloning the geometry
    m.position.x = 8;
    m.position.y = 6;

    //m.rotation.z = Math.random()*Math.PI*2;
    //m.rotation.y = Math.random()*Math.PI*2;
   // var s = .1 + Math.random()*.9; // set the size of the cube randomly
    //m.scale.set(1,1,1);
    this.mesh.add(m);


    //BASE CIRCLE
    var material = new THREE.MeshBasicMaterial({ color: 0x0000aa });
    var circleGeometry = new THREE.CircleGeometry( 9, 32 ); //radius ,segs
    var circle = new THREE.Mesh( circleGeometry, material );
    circle.rotation.x=-Math.PI /2;
    this.mesh.add( circle );


    this.update=function(){

        var timestamp = new Date() * Math.random()*0.005;
        this.mesh.position.x+=Math.sin(timestamp) * 3;
        this.mesh.position.y+=Math.tan(timestamp) * 3;
        this.mesh.position.z+=Math.cos(timestamp) * 3;
    }

    this.warp=function(){
        //console.log("should warp", TWEEN );
        //TWEEN.removeAll();
        //new TWEEN.Tween( lemesh.position )
        //.to( { x:0 ,y:0 , z:0 }, 5000 )
        //.onUpdate( render )
        //.start();
        scl = Math.random()*20
        pcl = -100 + Math.random()*100
        TweenMax.to( lemesh.position, 2 , { ease: Expo.easeOut, x:pcl, y:0, z:pcl } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    var warp = this.warp;

    this.warpRandom=function(){
        scl = Math.random()*20
        pcl = -1200 + Math.random()*600
        pclx = -400 + Math.random()*800
        pclz = -400 + Math.random()*800
        TweenMax.to( lemesh.position, 2 , { ease: Expo.easeOut, x:pclx, y:0, z:pclz } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    var warpRandom = this.warpRandom;

    this.warpSort=function( model ){

        scl = Math.random()*320

        var youuid = this.uuid;
        var nod = model.getNodeByUUID( this.uuid );
        var spacer=70;
        var xg = -100+(nod.ndx%4)*spacer;
        var zgo = -150 + Math.round( ( nod.ndx/4) ) * spacer;
        var dly = nod.ndx / 12;
        TweenMax.to( lemesh.position, 2 , { ease:Expo.easeOut , delay:dly , y:0 , x:xg , z:zgo } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }

    this.warpY=function(){
        scl = Math.random()*220
        var yess = Math.round( Math.random()*1)
        if( yess )
            TweenMax.to( lemesh.position, 2 , { ease: Expo.easeOut, y:scl+200 } )
        //TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
    }
    var warpY = this.warpY;

    function createTextCanvas(text, color, font, size) {
        size = size || 16;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
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
    }

    function createText2D(text, color, font, size, segW, segH) {
        var canvas = createTextCanvas(text, color, font, size);
        var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
        var tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        var planeMat = new THREE.MeshBasicMaterial({
            map: tex,
            color: 0xffffff,
            transparent: true
        });
        var mesh = new THREE.Mesh(plane, planeMat);
        mesh.scale.set(0.1, 0.1, 0.1);
        mesh.doubleSided = true;
        return mesh;
    }

    this.makeTextSprite=function( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Helvetica";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] :100;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:233, g:233, b:233, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        //sprite.scale.set( 0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize );
        //sprite.scale.set( 5, 5, 5 );
        return sprite;
    }
    var makeTextSprite = this.makeTextSprite;

    var lablz=["UNKNOWN","$2913.","$2890.10","$2345.","$2902.","$2490.10","$2795.","$2711.40","$2741.","$2788."]
    var txtspr = makeTextSprite( lablz[Math.floor(Math.random()*9)])
    txtspr.position.y=25;
    txtspr.scale.set(22,22,22);
    //txtspr.scale.set(3,3,3);
    this.mesh.add( txtspr );

    var titleZ = createText2D('-Z '+this.uuid);
    titleZ.position.z = 20;
    titleZ.position.y = -8;
    titleZ.scale.set(0.5,0.5,0.5);
    this.mesh.add(titleZ);

    //var titleX = createText2D('-X ' +'X TEXT LENGTH');
    //titleX.position.z = -20;
    //this.mesh.add(titleX);



    window.addEventListener('build', function (e)
    {
        console.log(" build received in Avatar ");
        warp();
    }, false);

    window.addEventListener('mapChanged', function (e)
    {
        var model = e.detail.model;
        var map = model.cur_map;

        if( map == 0 ){
            warpRandom();
        }
        else if( map==1)
        {   warp();
        }else{
            warpY();
        }

    }, false);

    window.addEventListener('dataUpdate', function (e)
    {
        var model = e.detail.model;
        var map = model.cur_map;
    }, false);

    window.addEventListener('sortEvent', this.onSortEvent.bind(this), false);
/*    {
        var model = e.detail.model;
        var map = model.cur_map;
        warpSort( model )
        //scl = Math.random()*320
        //var yess = Math.round( Math.random()*1)
        //if( yess )
        //  TweenMax.to( lemesh.position, 2 , { ease: Expo.easeOut, y: } )
    }, false);*/
};

Avatar.prototype.onSortEvent = function(e) {
    var model = e.detail.model;
    this.warpSort( model )
};

// COOL NESTED FUNC
// https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
// ASCII
// http://www.kammerl.de/ascii/AsciiSignature.php