
function SubGraphVert() {
    THREE.Mesh.call( this);
    this.type = 'SubGraphVert';

    // SIMULATE CUBE
    //this.geometry = new THREE.BoxGeometry( 540, 540, 149 );
    //this.material = new THREE.MeshLambertMaterial( { color: 0xFF4F0F } );
    // THREE.Mesh.call( this, this.geometry, this.material );

    // FLAT CIRCLE
    //var materialx = new THREE.MeshBasicMaterial({ color: 0xF0FF44 });
    //var circleGeometry = new THREE.CircleGeometry( 24, 32 ); //radius ,segs
    //var circle = new THREE.Mesh( circleGeometry, materialx );
    //circle.rotation.x=-Math.PI /2;
    //this.add( circle );
    var geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 3 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00FF00 , wireframe:true} );
    var cylinder = new THREE.Mesh( geometry, material );
    this.add( cylinder );

    var growth=20+Math.random()*31;
    var delrnd = Math.random()*5;
    TweenMax.to( cylinder.scale,     2 ,{ease:Expo.easeOut ,y:growth , delay:delrnd })
    TweenMax.to( cylinder.position , 2 ,{ease:Expo.easeOut ,y:growth , delay:delrnd })


}

// Experiment Submesh loadable
SubGraphVert.prototype = Object.create( THREE.Mesh.prototype );
SubGraphVert.prototype.constructor = SubGraphVert;
SubGraphVert.prototype.getMesh = function() {
    return this.mesh;
}
