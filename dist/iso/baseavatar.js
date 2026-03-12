import * as THREE from '../web_modules/three.js';
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

export { BaseAvatar }