
import * as THREE from '../../web_modules/three.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function Axis( objIn ){
    THREE.Mesh.call( this);
    this.type = 'Axis';

    var material = new THREE.LineBasicMaterial({  color: 0xCCCCFF  });
    
    var points = [];
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    var line = new THREE.Line( geometry, material );
    this.add( line );

    

    factory3d.getSuperTextAsync( objIn.labelx , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.0035,0.0035,0.0035)
        this.title.position.set(4,-0.6,0)
        this.add( this.title )
    })

    factory3d.getSuperTextAsync( 'RESERVE SUM' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.rotateZ( Math.PI /2 ) 
        this.title.position.set(-0.1,8,0)
        this.add( this.title )
    })

    factory3d.getSuperTextAsync( objIn.bal , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.003,0.003,0.003)
        this.title.position.set(8.0,-0.45,0)
        this.add( this.title )
    })


}
Axis.prototype = Object.create( THREE.Mesh.prototype );
Axis.prototype.constructor = Axis;
Axis.prototype.getMesh = function() {
    return this.mesh;
}
//module.exports = SwarmView

export { Axis }