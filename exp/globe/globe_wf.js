

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


const geometry3 = new THREE.SphereGeometry( 19.5 , 34, 24 );
const material3 = new THREE.MeshBasicMaterial( { color: 0x111133, wireframe:false, transparent: true } );
const hi = new THREE.Mesh( geometry3, material3 );
scene.add( hi );


// FUNCIONT 
function vertex([longitude, latitude], radius) {
    const lambda = longitude * Math.PI / 180;
    const phi = latitude * Math.PI / 180;
    return new THREE.Vector3(
      radius * Math.cos(phi) * Math.cos(lambda),
      radius * Math.sin(phi),
      -radius * Math.cos(phi) * Math.sin(lambda)
    );
}

function wireframe(multilinestring, radius, material) {
    const geometry = new THREE.Geometry();
    for (const P of multilinestring.coordinates) {
        for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
        geometry.vertices.push(p0 = p1, p1 = vertex(P[i], radius));
        }
    }
    return new THREE.LineSegments(geometry, material);
}
async function land() {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json");
    const topology = await response.json();
    const mesh = topojson.mesh(topology, topology.objects.land);
    return wireframe(mesh, radius, new THREE.LineBasicMaterial({color: 0x00AA66}));
}
async function graticule(){
    const mesh = graticule10();
    return wireframe(mesh, radius, new THREE.LineBasicMaterial({color: 0xaaaaFF}));
}
var radius = 20
var height = 20;
var width =20;
function graticule10() { // See https://github.com/d3/d3-geo/issues/95
    return {
      type: "MultiLineString",
      coordinates: [].concat(
        Array.from(
          range(-180, 180, 10),
          x => x % 90 ? meridian(x, -80, 80) : meridian(x, -90, 90)
        ),
        Array.from(
          range(-80, 80 + 1e-6, 10),
          y => parallel(y, -180, 180)
        )
      )
    };
  }
  function meridian(x, y0, y1, dy = 2.5) {
    return Array.from(range(y0, y1 + 1e-6, dy), y => [x, y]);
  }
  function parallel(y, x0, x1, dx = 2.5) {
    return Array.from(range(x0, x1 + 1e-6, dx), x => [x, y]);
  }
  function* range(start, stop, step) {
    for (let i = 0, v = start; v < stop; v = start + (++i * step)) {
      yield v;
    }
  }
  //topojson = require("topojson-client@3")
  //THREE = require("three@0.99.0/build/three.min.js")
  var g= graticule().then( function( obn ){
    scene.add( obn );

  }, function( err ){

  })
  

  var l = land().then( function(obn){

        console.log(' land')
        scene.add( obn );
  }, function(err){

        console.log('err')
  } );
 
  

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    //cv.update()
    renderer.render( scene, camera );
};

animate();