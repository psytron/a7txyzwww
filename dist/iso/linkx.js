import * as THREE from '../web_modules/three.js'
import { XCOLORS } from '../x_modules/xcolors.js'
import { factory3d } from '../factory/factory3d.js'

function Linkx( objIn ){
    //var model = objIn.data.model;
    //this.model = objIn.data.model;
    var model = objIn.model;
    this.node = objIn;
    var factory = window.factory;
    this.a = model.getNodeByUUID( objIn.fromId ).sprite;
    this.b = model.getNodeByUUID( objIn.toId ).sprite;
    this.start = model.getNodeByUUID( objIn.toId ).sprite;
    this.end = model.getNodeByUUID( objIn.fromId ).sprite;
    this.initObj = objIn;
    this.targetmesh = objIn.mesh;
    this.model = objIn.model;
    this.visibility = 'normal'; // 'invisible', 0,1,2
    // this.mode=0,1,2
    this.linkmode; 
    this.id = objIn.id;
    //this.color = 0xFFFF44 //objIn.color || colors[Math.round( Math.random() *4)];

    //console.log( objIn , this.a, this.b )
     
    var colors = XCOLORS.link_colors;
    //this.color = "#EEEEEE" //objIn.color || colors[Math.round( Math.random() *4)];
    this.color = colors[Math.round( Math.random() *4)];
    this.gcolor = colors[Math.round( Math.random() *4)];
    if( this.initObj.data.label =='TRANSFERS'|| this.initObj.data.label =='ANY' ){
        this.color=XCOLORS.link_color_transfer;
    }
    if( this.initObj.data.label =='CONVERTS' ){
        // redthis.color=0x11EEEE;
        this.color=XCOLORS.link_color_convert;
    }


        // CURVE //     
    // var curve = new THREE.CubicBezierCurve3(
    //     //new THREE.Vector3( 0.25, 10, 0 ),
    //     this.a.position,
    //     new THREE.Vector3( 0, 0, 0 ),
    //     new THREE.Vector3( 10, 0, 0 ),
    //     this.b.position
    //     //new THREE.Vector3( 10, 0.25, 0 )
    // );
    // var points = curve.getPoints( 50 );
    // var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // var material = new THREE.LineBasicMaterial( { color : 0x00FF00 } );
    // // Create the final object to add to the scene
    // this.linexx = new THREE.Line( geometry, material );   
    // this.linexx.geometry.verticesNeedUpdate = true;
    // this.targetmesh.add( this.linexx ) 




// nu lin
    // const material = new THREE.LineBasicMaterial({
    //     color: 0x0000ff
    // });

    // const points = [];
    // points.push( new THREE.Vector3( - 10, 0, 0 ) );
    // points.push( new THREE.Vector3( 0, 10, 0 ) );
    // points.push( new THREE.Vector3( 10, 0, 0 ) );

    // const geometry = new THREE.BufferGeometry().setFromPoints( points );

    // const line = new THREE.Line( geometry, material );
    // scene.add( line );



    
    // STRAIGHT LINE 
    var lineGeom = new THREE.BufferGeometry();
    
    if( this.node.payload.type == "MultiLineString" ){
        //factory prinr line 
        this.linexx = factory3d.getClone( this.node.payload.label , { j:this.node.payload.label , type:'multi' , coordinates:this.node.payload.coordinates } ) ;        
        this.targetmesh.add( this.linexx )
    }else{
        //lineGeom.setFromPoints( this.a.position, this.b.position );
        const points = [];
        points.push( this.a.position  );
        points.push( this.b.position  );
    
        var lineGeom = new THREE.BufferGeometry().setFromPoints( points );        
        var lineMat = new THREE.LineBasicMaterial({ color:this.color ,linewidth:1.0, transparent: true, opacity: 0.7 , linecap:'round' });
        this.linexx = new THREE.Line( lineGeom, lineMat );        
        this.targetmesh.add( this.linexx )
    }


    
    



    
    this.activate=this.steady;
    this.packets = []


    //this.linexx.transparent=true;
    //this.floatlabel = this.XXXXXXXXXMakeText('WEIGHT',{})
    // FLOATING LABEL
    var w= Math.round( Math.random(8) )
    
    /*
    this.floatlabel = factory.getSuperText('.',this.color )
    this.floatlabel.position.set(0,1.5,0)
    this.floatlabel.scale.set(0.056,0.056,0.056)
    this.targetmesh.add( this.floatlabel ) */

    var floatinfo= this.initObj.type ? this.initObj.type : 'LOCKED';
    floatinfo = floatinfo.toUpperCase()

    // EXP FLOAT LABEL 
    this.floatgroup = new THREE.Group()
    this.txtx = factory3d.getSuperText2(floatinfo, this.color )
    this.txtx.position.set(-0.1,0.5,0)
    this.txtx.scale.set(0.007,0.007,0.007)
    this.txtx.rotation.set(-Math.PI/2,0,Math.PI/2)
    this.floatgroup.add( this.txtx )
    this.targetmesh.add( this.floatgroup )


    // LINK SENSE PLANE  // 
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.MeshBasicMaterial( {color: 0x0006AA, alphaTest: 0, wireframe:false, visible: true }));
    plane.position.set( 0,0,0)
    plane.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
    this.floatgroup.add( plane );
    
    
    this.clickfunc=function(ev){
        var model = this.initObj.data.model;
        window.controller.setFocusObject( this.initObj )
        this.toggleParticles();
    }.bind(this)

    this.toggleParticles=function(){
        if( this.packets.length < 1){ 
            this.initParticles()
            this.update = this.enterFrameUpdatePackets;    
        }else{
            this.destroyParticles()
            this.update = this.steady;    
        }
    };


    // temp disable 
    // this.txtx.on('mousedown',this.clickfunc)

    // temp disable 
    // this.floatgroup.on('mousedown',this.clickfunc)
    
    //this.floatlabel.on('mousedown',this.clickfunc)

    // temp disable 
    //this.on('mousedown',this.clickfunc)
    
    this.destroySelf=function(){
        //edge shoudl destroy Itself and its particles here: 
        this.destroyParticles();
        this.floatgroup.remove( this.txtx )
        this.targetmesh.remove( this.floatgroup )
        this.targetmesh.remove( this.linexx )
        //this.geometry.dispose();
        //thispacket.material.dispose();
        //this.targetmesh.remove( thispacket )
        console.log(' edge : ')
    }

    this.outing = function(){
        var x_distance = ( this.b.position.x - this.a.position.x) - this.exititer;
        var z_distance = ( this.b.position.z - this.a.position.z ) - this.exititer;
        this.linexx.geometry.verticesNeedUpdate = true;
        this.linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        this.exititer++;
    }
    this.update = function(){
        //this.steady();
        // disabled for paths routes exp
        this.enterFrameUpdatePackets();
    }
    this.onCameraEnvironmentUpdate=function( e ){
        console.log('  camera conditions crossed certain parameters ')
    }
    this.initParticles=function(){
        if( this.packets.length != 0){ return; }
        var geo = new THREE.BoxGeometry(0.21, 0.21, 0.21)
        var mat = new THREE.MeshNormalMaterial()
        for (var i in [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
            var tempmesh = new THREE.Mesh(geo, mat)
            this.packets.push(tempmesh)
            this.targetmesh.add(tempmesh)
        }
        this.speed_range = 100;
        this.step = 1;
        
        //Change LINE Color on Activate Particles 
        // this.linexx.material.color = new THREE.Color(0xDDDDFF);
        var temp=this.start;
        this.start=this.end;
        this.end=temp;
            //line.material.needsUpdate = true;
    }
    this.destroyParticles=function(){
        this.update = this.steady;
        for( var i in this.packets ){
            var thispacket = this.packets[i]
            thispacket.geometry.dispose();
            thispacket.material.dispose();
            this.targetmesh.remove( thispacket )
        }
        this.packets = []
    }
    this.steadyDark = function(){
        var x_distance = ( this.b.position.x - this.a.position.x);
        var y_distance = ( this.b.position.y - this.a.position.y );
        var z_distance = ( this.b.position.z - this.a.position.z );
        
        /*
        this.floatlabel.position.x = this.a.position.x + (x_distance/2);
        this.floatlabel.position.y = this.a.position.y + (y_distance/2);
        this.floatlabel.position.z = this.a.position.z + (z_distance/2);
        this.floatlabel.lookAt( camera.position  )       */


        this.floatgroup.position.x = this.a.position.x + (x_distance/2);
        this.floatgroup.position.y = this.a.position.y + (y_distance/2);
        this.floatgroup.position.z = this.a.position.z + (z_distance/2);        
        this.floatgroup.lookAt( this.end.position )
        // TRY TO POINT LINK TEXT AT NODES 
        //this.floatlabel.lookAt( this.b.position )
        //this.floatlabel.rotation.set( Math.PI *2 , 0,0 )
        

        this.linexx.geometry.verticesNeedUpdate = false;
        this.linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
    }   
    this.steady = function(){
        var x_distance = ( this.b.position.x - this.a.position.x);
        var y_distance = ( this.b.position.y - this.a.position.y );
        var z_distance = ( this.b.position.z - this.a.position.z );
        
        /*
        this.floatlabel.position.x = this.a.position.x + (x_distance/2);
        this.floatlabel.position.y = this.a.position.y + (y_distance/2);
        this.floatlabel.position.z = this.a.position.z + (z_distance/2);
        this.floatlabel.lookAt( camera.position  )       */


        this.floatgroup.position.x = this.a.position.x + (x_distance/2);
        this.floatgroup.position.y = this.a.position.y + (y_distance/2);
        this.floatgroup.position.z = this.a.position.z + (z_distance/2);        
        this.floatgroup.lookAt( this.end.position )
        // TRY TO POINT LINK TEXT AT NODES 
        //this.floatlabel.lookAt( this.b.position )
        //this.floatlabel.rotation.set( Math.PI *2 , 0,0 )
        
        
        // RND COL 
        //var randomColor = new THREE.Color();
        //randomColor.setRGB(Math.random(), Math.random(), Math.random());
        //this.linexx.material.color.set(randomColor);
        

        this.linexx.geometry.verticesNeedUpdate = true;
        this.linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.

        const positionAttribute =  this.linexx.geometry.getAttribute( 'position' );
        positionAttribute.setXYZ( 0, this.a.position.x, this.a.position.y, this.a.position.z )
        positionAttribute.setXYZ( 1, this.b.position.x, this.b.position.y, this.b.position.z )
        positionAttribute.needsUpdate = true; // required after the first render
        //If you change the position data values after the initial render, you may need to recompute bounding volumes so other features of the engine like view frustum culling or helpers properly work.

        this.linexx.geometry.computeBoundingBox();
        this.linexx.geometry.computeBoundingSphere();
        
        // this.linexx.geometry.attributes.position.array[ 0 ] += 0.01;
        // this.linexx.geometry.attributes.position[0]=this.b.position.x;
        // this.linexx.geometry.attributes.position[1]=this.b.position.y;
        // this.linexx.geometry.attributes.position[2]=this.b.position.z;
        
        this.linexx.geometry.attributes.position.needsUpdate = true;
        //After rendering, you need to reset the needsUpdate flag to true every time the attribute values are changed.        
    }    
    this.impt = function(dim, start, end, t){
        
        var calc = (start[dim]) + (end[dim] - start[dim]) * t || 0;
        return calc;
    }
    this.enterFrameUpdatePackets=function(){
        this.steady()
        var steps_per_speed = (this.speed_range / this.packets.length);
        for( var p in this.packets ){
            var t = (this.step+(p*steps_per_speed))/this.speed_range; 
            // COMPARE SPEED
            // const inplt = (dim, start, end, t) => (start[dim]) + (end[dim] - start[dim]) * t || 0;
            var x = this.impt('x', this.start.position, this.end.position, t%1 )
            var x2 = this.impt('x', this.start.position, this.end.position, t )
            this.packets[p].position.x = x;
            this.packets[p].position.y = this.impt('y', this.start.position, this.end.position, t%1 )
            this.packets[p].position.z = this.impt('z', this.start.position, this.end.position, t%1 )

        }
        this.step++;
        if( this.step > 32200 ){
            this.destroyParticles();
        }
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
            this.step=0;
            this.initParticles()
            this.update = this.enterFrameUpdatePackets;
        }
    }.bind(this) , false);

    

    window.addEventListener('arrangeChangeEvent', this.onArrangeChangeEvent.bind(this), true);

}
// Experiment Submesh loadable
Linkx.prototype = Object.create( THREE.Mesh.prototype );
Linkx.prototype.constructor = Linkx;
Linkx.prototype.getMesh = function() {
    return this.mesh;
}
Linkx.prototype.removeSelf=function(){

    this.linexx.geometry.dispose();
    this.remove( this.linexx );
    //t.lines[j].geometry.dispose();
}
Linkx.prototype.onArrangeChangeEvent=function( e ) {

    var f=e
   
    switch( model.cur_arrange ){

        case 'fragment':
            //this.initParticles()
            var l = 3;
            var ap = this.model.graph.getLink( this.initObj.fromId , this.initObj.toId );
            if( ap ){
                var dr = 39
            }else{
                var da  =35;
                //this.destroySelf();
                
            }
            
            console.log( l );
            break;            
        case 'random':
            //this.initParticles()
            
            break;
        case 'grid':
            //this.warpPhase1()
            break;
            
        case 'circle':
            //this.warpSort()
            break;        
            
        case 'sphere':
            this.linexx.material.color = new THREE.Color(0xFF0000 );
            this.linexx.linewidth= 6,
            this.linexx.material.needsUpdate = true;
            break;
            
        case 'globe':
            break;            
    }
    
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
    context.fill();
    context.fillStyle ="#dbbd7a";
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 11,11,11 );
    return sprite;
}

export { Linkx }

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