
import * as THREE from '../../web_modules/three.js'
import { gsap , Expo } from '../../web_modules/gsap.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function FeeLineY(){
    THREE.Mesh.call( this);
    this.type = 'FeeLine';

    this.line = new THREE.Group()
    this.add( this.line )


    factory3d.getSuperTextAsync( 'Fee ZONE (x)' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(0,-0.4,0)
        this.line.add( this.title )
    })


    var geometry = new THREE.CircleGeometry( 0.1, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    var circle = new THREE.Mesh( geometry, material );
    circle.rotateZ( Math.PI / 2 );
    this.line.add( circle );   


    var material = new THREE.LineBasicMaterial({  color: 0xFF0000  });
    var points = [];
    var fee_level = 1;
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    var line1 = new THREE.Line( geometry, material );
    this.line.add( line1 );
    this.line.position.x = 0.2
    


    gsap.to( this.line.position ,  { duration:4, x:fee_level , ease:Expo.easeInOut , delay:0 , repeat:99, yoyo:true} );     


}
FeeLineY.prototype = Object.create( THREE.Mesh.prototype );
FeeLineY.prototype.constructor = FeeLineY;
FeeLineY.prototype.getMesh = function() {
    return this.mesh;
}

export { FeeLineY }