
import * as THREE from '../../web_modules/three.js'
import { gsap , Expo } from '../../web_modules/gsap.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function VLine( initObj ){
    THREE.Mesh.call( this);
    this.type = 'VLine';



    this.obj1 = new THREE.Group()
    this.obj1.position.x=initObj.curve;
    this.obj1.position.y=initObj.curve;
    this.add( this.obj1 )

    this.obj2 = new THREE.Group()
    this.obj2.position.x=initObj.curve;
    this.obj2.position.y=initObj.curve;
    this.add( this.obj2 )

    // CURVE //     
    var curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( 0.25, 10, 0 ),
        this.obj1.position,
        this.obj2.position,
        new THREE.Vector3( 10, 0.25, 0 )
    );
    
    var points = curve.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );

    var material = new THREE.LineBasicMaterial( { color : 0x00FF00 } );

    // Create the final object to add to the scene
    this.curveObject = new THREE.Line( geometry, material );   
    this.curveObject.geometry.verticesNeedUpdate = true;
    this.add( this.curveObject ) 
    

    this.floatPoint = new THREE.Group()
    this.add( this.floatPoint )

    var geometry = new THREE.CircleGeometry( 0.1, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
    var circle = new THREE.Mesh( geometry, material );
    circle.rotateZ( Math.PI / 2 );
    this.floatPoint.add( circle );   


    var points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 1, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var liner = new THREE.Line( geometry, material );
    liner.position.y=-0.5
    this.floatPoint.add( liner );



    factory3d.getSuperTextAsync( 'EXEC' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(0.3,0,0)
        this.floatPoint.add( this.title )
    })

     


    this.floatPoint.position.set( Math.random()*5 ,  Math.random()*5, 0 )

    gsap.to( this.floatPoint.position , { 
        duration:3+Math.random()*5, 
        x:Math.random()*7 , 
        ease:Expo.easeInOut,
        yoyo:true,
        repeat:99,
        onUpdate:function(){ 
            console.log(' updt') 
        } 
    });     
    gsap.to( this.floatPoint.position , { 
        duration:3+Math.random()*4, 
        y:Math.random()*7, 
        ease:Expo.easeInOut,
        yoyo:true,
        repeat:99,
        onUpdate:function(){ 
            console.log(' updt') 
        } 
    });             

    
    // draw line straight 
    /*
    var material = new THREE.LineBasicMaterial({  color: 0xFFFF00  });
    var points = [];
    points.push( this.obj1.position );
    points.push( new THREE.Vector3( 5, 0, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );    
    this.line1 = new THREE.Line( geometry, material );
    this.add( this.line1 );  */
    





    //gsap.to( this.obj1.position ,  { duration:1, y:-10 , ease:Expo.easeInOut } );     
    gsap.to( curve.v3 , { 
        duration:1, y:-10 , ease:Expo.easeInOut,
        onUpdate : function(){ console.log(' updt') } });     

    this.update = function(){
        //this.line1.position.y+=0.2
        
        //this.line1.geometry.verticesNeedUpdate = true;
        //this.line1.geometry.computeBoundingSphere();

        this.curveObject.geometry.verticesNeedUpdate = true;
        this.curveObject.geometry.computeBoundingSphere();
    }

}

VLine.prototype = Object.create( THREE.Mesh.prototype );
VLine.prototype.constructor = VLine;
VLine.prototype.getMesh = function() {
    return this.mesh;
}

export { VLine }