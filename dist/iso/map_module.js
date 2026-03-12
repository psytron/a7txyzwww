

import * as THREE from '../web_modules/three.js';

///import { Interaction } from "../web_modules/three.interaction.module.js"

import { InteractionManager } from "../web_modules/three.interactive.js"; /// ne2


//import { Interaction } from "../web_modules/three.interaction.web.js";// 

import { OrbitControls } from '../web_modules/three/addons.js';
import { GLTFLoader } from '../web_modules/three/addons.js';
import { SVGLoader } from '../web_modules/three/addons.js';
import { gsap , Expo } from "../web_modules/gsap.js";
import Stats from '../web_modules/stats-js.js'; // MUST COMMENT OUT TO COMPILE SnowPack // although wait, is it stats.js.js  
import { Factory3d } from '../factory/factory3d.js'
 // import { factory2d } from '../x_modules/factory/factory2d.js'
import { AvatarX } from './avatarx.js'
import { SwarmView } from './swarmview.js'
import { DetailDisplay } from './detaildisplay.js'
import { XCOLORS } from '../x_modules/xcolors.js'
import { IsoModel } from './isomodel.js'
import { IsoController } from './isocontroller.js'
import { CameraListener } from './cameralistener.js'
import { TestMenu } from './testmenu.js'

// REPLACE OUTDATED TRACKBALL CONTROL 
// import { TrackballControls } from 'TrackballControls';
//import { InteractionManager } from '../web_modules/three.interactive.js';
// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }
// const controls = new TrackballControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.12;
// controls.minDistance = 0.1;
// controls.maxDistance = 10000;
// controls.target.set(0, 0, 0);
// controls.update();



document.styleSheets[0].insertRule('canvas { outline:none; border:none; }', 0); // Remove Blue Outline
var container = document.createElement( 'div' ); document.body.appendChild( container );
//container.style.cssText = "outline: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */"
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
var renderer = new THREE.WebGLRenderer( { antialias:true } );//antialiasing:false=Faster but sucks
var raycaster = new THREE.Raycaster();
window.raycaster = raycaster;
window.camera = camera;
renderer.setClearColor( XCOLORS.bg );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.sortObjects = false;
window.renderer = renderer;
container.appendChild( renderer.domElement );
var scene = new THREE.Scene();
//scene.add( new THREE.AxesHelper( 11 ) );
var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( -100, -200, 400 );
scene.add( ...lights  );

scene.add( new THREE.AmbientLight( 0xFFFFFF , 1 ) ); // without this ambient light default material not visible UVmap
//scene.add( new THREE.AmbientLight( 0x00FFFF ) ); /// This washes out all 3D Shapes with Phongmat
//scene.add( new THREE.DirectionalLight( 0xFFFFFF) );
scene.add( new THREE.HemisphereLight( 0xFFFFFF, 0x0000FF, 1 ) ); // 
//var overlayView = new OverlayView();   //scene.add( overlayView );
var testmenu = new TestMenu( {} )

// var interaction = new Interaction( renderer, scene, camera );
//const interactionManager = new InteractionManager( renderer, camera,renderer.domElement, { autoAdd:true , scene });

var interactionManager = new InteractionManager(
     renderer,
     camera,
     renderer.domElement,
     {
         autoAdd: false,
         scene
     }
);

var detaildisplay = new DetailDisplay();
var swarmView = new SwarmView( {interactionManager} );       scene.add( swarmView );
var model = new IsoModel()   //var model = new IsoModel();  //var IsoModel = require('./isomodel.js')
var controller = new IsoController( {model:model , camera:camera , target:swarmView , renderer:renderer  } );//controller.start()
var controls = new OrbitControls( camera, renderer.domElement);
var cameraListener = new CameraListener( camera , controls );
window.controls = controls;
window.controller = controller;
window.model = model;
//controls.enableDamping=false;
//controls.dampingFactor=2.2;
controls.screenSpacePanning=false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
//controls.mouseButtons.PAN=0 .// PREV VERS 
//controls.mouseButtons.ORBIT=2// PREV VERS 
//controls.enablePan=false;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
// controls.mouseButtons = {
// 	LEFT: THREE.MOUSE.PAN,
// 	MIDDLE: THREE.MOUSE.DOLLY,
// 	RIGHT: THREE.MOUSE.ROTATE
// }

// controls.touches = {
// 	ONE: THREE.TOUCH.DOLLY_PAN,
// 	TWO: THREE.TOUCH.ROTATE
// }
controls.touches = {
	ONE: 2 ,
	TWO: 1    
}

function animate() {
    // CPU SAVE TOGGLE: 
    // if( document.rolling ){
	// TWEEN.update();//}
    window.stats.update();
    swarmView.update();
    camera.updateProjectionMatrix();
    renderer.render( scene, camera );
    //camera.lookAt( swarmView.position )
    controls.update();
    requestAnimationFrame( animate );
}


async function ready(){
    console.log('MP V 0.4.2.1')
    window.stats = new Stats();               container.appendChild( stats.dom );
    window.factory3d = new Factory3d();
    var f = await window.factory3d.loadFonts();

    // EVENT PATCHBAY
    addEventListener('dataUpdateEvent',    swarmView.onDataUpdate , true ); 
	addEventListener('dataAppendEvent',    swarmView.onDataAppendEvent , true ); 
    addEventListener('mapChanged',         swarmView.onMapChanged , true ); 
    addEventListener('arrangeChangeEvent', swarmView.onArrangeChangeEvent, true);
    addEventListener('arrangeChangeEvent', cameraListener.onArrangeChangeEvent, true);

    addEventListener('clearUpdate',        swarmView.onClearUpdate , true ); 
    addEventListener('focusEvent',         swarmView.onFocusEvent , true ); 
    addEventListener('reportRequestEvent', swarmView.onReportRequestEvent , true );

    addEventListener('dataUpdateEvent' ,  testmenu.onDataUpdate , true )
    addEventListener('focusEvent', detaildisplay.onFocusEvent , true );
	addEventListener('fabricEvent', detaildisplay.onFabricEvent.bind(this), true);
    addEventListener('message',    controller.allIncomingMessages , false);
    
    addEventListener('clickEvent', controller.onClickEvent , true);
    addEventListener('mapChangeEvent',    function(e){ console.log(e,' bubbles to window') } ,true)
    addEventListener('dataUpdateEvent',   function(e){ console.log(e,' dataUpdate bubbles to window') }   ,true)
    addEventListener('focusRemovedEvent', function(e){ console.log(e,' focusRemoved bubbles to window') } ,true)
    addEventListener('resize',      controller.onWindowResize, false );
    addEventListener('clearUpdate', controller.onClearUpdate)
    addEventListener('selfReportEvent', controller.onSelfReportEvent, true );
    addEventListener('mapEditRequestEvent', controller.mapEditRequestEvent, true );

    // TILE STARTED EXPERIMENT MODULE 
	addEventListener( 'tileStarted' , function(e){
		console.log('Tile started in: ',e,'  ::  ',e.detail )
		var tile = e.detail.ref;
		tile.ping()
	})

    requestAnimationFrame( animate ); // DRAW EVENT 
    controller.start()
	
	window.xvar=9999;

}
document.addEventListener( "DOMContentLoaded", ready );
