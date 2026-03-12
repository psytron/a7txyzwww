

import * as THREE from '../web_modules/three.js';
import { OrbitControls } from '../web_modules/three/examples/jsm/controls/OrbitControls.js';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x=0;
camera.position.z = 15;
camera.position.y=10;
//camera.rotation.x = 0;
var renderer = new THREE.WebGLRenderer( { antialias:true }  );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var controls = new OrbitControls( camera, renderer.domElement);

var z_height = 2;



const geometry = new THREE.SphereGeometry( 8 , 32, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0x00FFFF, wireframe: true, transparent: true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const geometry2 = new THREE.SphereGeometry( 0.1 , 2, 2 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xFF00FF, wireframe: true, transparent: true } );
const sf = new THREE.Mesh( geometry2, material2 );
scene.add( sf );

const geometry3 = new THREE.SphereGeometry( 0.1 , 2, 2 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xFF00FF, wireframe: true, transparent: true } );
const hi = new THREE.Mesh( geometry3, material3 );
scene.add( hi );

// San Francisco/Coordinates
//  37.7749° N, 122.4194° W
// Hawaii/Coordinates
// 19.8968° N, 155.5828° W


function calcPosFromLatLonRad(lat,lon,radius){  
    var phi   = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);

    var x = -(radius * Math.sin(phi)*Math.cos(theta));
    var z = (radius * Math.sin(phi)*Math.sin(theta));
    var y = (radius * Math.cos(phi));

    //return [x,y,z];
    return { x:x,y:y,z:z };
}

function calcPosFromLatLonRad2(lat, lon, radius ) {

    var spherical = new THREE.Spherical(
      radius,
      THREE.Math.degToRad(90 - lon),
      THREE.Math.degToRad(lat)
    );
    var vector = new THREE.Vector3();
    vector.setFromSpherical(spherical);
    console.log(vector.x, vector.y, vector.z);
    return vector;
}

function lonLatToVector3( lng, lat, out )
{
    out = out || new THREE.Vector3();
    
    lat = Math.PI / 2 - lat;    // flips the Y axis
    
    out.set(                    // distribute to sphere
        Math.sin( lat ) * Math.sin( lng ),
        Math.cos( lat ),
        Math.sin( lat ) * Math.cos( lng )
    );
    return out;
}
  
  //calcPosFromLatLonRad(0.5, -74.00597, 40.71427);

var pos1 = calcPosFromLatLonRad( 37.7749 , 122.4194 , 8 );
var pos2 = calcPosFromLatLonRad2( 37.7749 , 122.4194 , 8 );
var pos3 = lonLatToVector3( 37.7749 , 122.4194 );

var sfpos = calcPosFromLatLonRad( 37.7749 , 122.4194 , 8 );
pos3.addScalar( 4 );
sf.position.x = pos3.x
sf.position.y = pos3.y
sf.position.z = pos3.z

var hipos = calcPosFromLatLonRad( 19.896 , 155.5828 , 8 );
hi.position.x =0
hi.position.y = 0
hi.position.z =0

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    //cv.update()
    renderer.render( scene, camera );
};

animate();