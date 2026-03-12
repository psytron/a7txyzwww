
function Packet( initObj ) {
    THREE.Mesh.call( this);
    this.type = 'Packet';

    this.a = initObj.a;
    this.b = initObj.b;
    this.ttl = 0;
    this.selfpacket = this;
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
    var geometry = new THREE.CylinderGeometry( 1.5, 1.5, 1, 3 );
    var material = new THREE.MeshBasicMaterial( {color: "#ffe35d" , wireframe:true} );
    var cylinder = new THREE.Mesh( geometry, material );
    this.cylinder = cylinder;
    this.add( cylinder );

    this.position.x = initObj.x;
    this.position.y = initObj.y;
    this.position.z = initObj.z;

    var growth=20+Math.random()*31;
    var delrnd = Math.random()*5;
   // TweenMax.to( cylinder.scale,     2 ,{ease:Expo.easeOut ,x:growth  })
    //TweenMax.to( cylinder.position , 2 ,{ease:Expo.easeOut ,y:growth , delay:delrnd })
    this.increment = 1+Math.random()*3;
    this.origvec = { x:this.x , y:this.y, z:this.z }
}

// Experiment Submesh loadable
Packet.prototype = Object.create( THREE.Mesh.prototype );
Packet.prototype.constructor = Packet;
Packet.prototype.onBeforeRender = function( renderer, scene, camera, geometry, material, group ) {
    this.ttl +=0.01;
    // your code here
    //console.log( 'before render ')
    var bposx = this.b.position.x; 
    var x_distance =  ( this.b.position.x - this.a.position.x);
    var y_distance =  ( this.b.position.y - this.a.position.y);
    var z_distance = ( this.b.position.z - this.a.position.z );
    var steps = 100;
    this.position.x = this.position.x + ( (x_distance/steps) * this.ttl); //this.origvec.x +  this.ttl;
    this.position.y = this.position.y + ( (y_distance/steps) * this.ttl); //this.origvec.x +  this.ttl;
    this.position.z = this.position.z + ( (z_distance/steps) * this.ttl); //this.origvec.x +  this.ttl;
    //this.position.z = this.origvec.z +  this.ttl;//  this.increment;
    if( this.position.x > bposx ){
        this.parent.remove( this );
    }

};
Packet.prototype.getMesh = function() {
    return this.mesh;
}




