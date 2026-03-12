

import * as THREE from '/web_modules/three.js';
import { OrbitControls } from '/web_modules/three/examples/jsm/controls/OrbitControls.js';

import { ChartView } from '/x_modules/liquid/chartview.js'
import { ChartGrid } from '/x_modules/liquid/chartgrid.js'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x=7;
camera.position.z = 15;
camera.position.y=10;
camera.rotation.x = 0.12;
var renderer = new THREE.WebGLRenderer( { antialias:true }  );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var controls = new OrbitControls( camera, renderer.domElement);

var z_height = 2;


var cg = new ChartGrid( { labelx:'TOTL' , curve:0.00 , bal:'14,594,000' } )
cg.position.z=0;
scene.add( cg );

var cv1 = new ChartView( { labelx:'SUSD (x)' , curve:3 ,bal:'$ 1,594,000' } )
cv1.position.z=z_height*1;
scene.add( cv1 )

var cv2 = new ChartView( { labelx:'USDC (x)' , curve:2  ,bal:'$ 2,594,000' } )
cv2.position.z=z_height*2;;
scene.add( cv2 );

var cv3 = new ChartView( { labelx:'DAI (x)' , curve:1  ,bal:'$ 394,000' } )
cv3.position.z=z_height*3;;
scene.add( cv3 );

var cv4 = new ChartView( { labelx:'USDT (x)' , curve:0  ,bal:'$ 6,594,000' } )
cv4.position.z=z_height*4;;
scene.add( cv4 );
//scene.add( new THREE.GridHelper( 10, 10 ) );




var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    //cv.update()
    renderer.render( scene, camera );
};

animate();