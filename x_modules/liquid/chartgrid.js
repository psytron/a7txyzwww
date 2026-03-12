
import * as THREE from '../../web_modules/three.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function ChartGrid( objIn ){
    THREE.Mesh.call( this);
    this.type = 'Axis';

    var material = new THREE.LineBasicMaterial({  color: 0xAAAACC  });
    var points = [];
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( geometry, material );
    this.add( line );



    var points = [];
    var material = new THREE.LineBasicMaterial({  color: 0x777777  });
    points.push( new THREE.Vector3( 5, 0, 0 ) );
    points.push( new THREE.Vector3( 5, 10, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var liner = new THREE.Line( geometry, material );
    this.add( liner );

    var points = [];
    var material = new THREE.LineBasicMaterial({  color: 0x777777  });
    points.push( new THREE.Vector3( 0, 5, 0 ) );
    points.push( new THREE.Vector3( 10, 5, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var liner = new THREE.Line( geometry, material );
    this.add( liner );



    
    var points = [];
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 10, 0 ) );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var liner = new THREE.Line( geometry, material );
    this.add( liner );



    

    factory3d.getSuperTextAsync( objIn.labelx , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(5,-0.4,0)
        this.add( this.title )
    })


    factory3d.getSuperTextAsync( 'POOL \n T/x' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(-0.9,5,0)
        this.add( this.title )
    })

    factory3d.getSuperTextAsync( '$14,594,000' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.003,0.003,0.003)
        this.title.position.set(8.0,-0.45,0)
        this.add( this.title )
    })



}
ChartGrid.prototype = Object.create( THREE.Mesh.prototype );
ChartGrid.prototype.constructor = ChartGrid;
ChartGrid.prototype.getMesh = function() {
    return this.mesh;
}
//module.exports = SwarmView

export { ChartGrid }