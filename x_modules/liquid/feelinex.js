
import * as THREE from '../../web_modules/three.js'
import { gsap , Expo } from '../../web_modules/gsap.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function FeeLineX(){
    THREE.Mesh.call( this);
    this.type = 'FeeLine';

    //new THREE.Vector3( 0, 0, 0 ) 

    this.line = new THREE.Group()
    this.add( this.line )

    factory3d.getSuperTextAsync( 'Fee \nZONE \nRES(y)' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(-1.1,0,0)
        this.line.add( this.title )
    })


    var geometry = new THREE.CircleGeometry( 0.1, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
    var circle = new THREE.Mesh( geometry, material );
    circle.rotateZ( Math.PI / 2 );
    this.line.add( circle );   
    /*
    var material = new THREE.LineDashedMaterial( {
        color: 0xFF00FF,
        linewidth: 1,
        scale: 1,
        dashSize: 3,
        gapSize: 1
    } ); */
    var material = new THREE.LineDashedMaterial( { color: 0xff0000, dashSize: 1, gapSize: 0.5 } )
    var fee_level = 0.5;
    var points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    var line1 = new THREE.Line( geometry, material );
    this.line.add( line1 );
    this.line.position.y=Math.random()*0.1
    this.zlevel=Math.random()*1;
    gsap.to( this.line.position ,  
        { 
            duration:6, 
            y:this.zlevel , 
            ease:Expo.easeInOut , 
            delay:0 ,  
            repeat:99, 
            yoyo:true , 
            onComplete:function()
            { 
                this.zlevel=Math.random()*5 
            } 
        });     


}
FeeLineX.prototype = Object.create( THREE.Mesh.prototype );
FeeLineX.prototype.constructor = FeeLineX;
FeeLineX.prototype.getMesh = function() {
    return this.mesh;
}

export { FeeLineX }