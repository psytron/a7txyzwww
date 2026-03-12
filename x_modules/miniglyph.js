import * as THREE from '/web_modules/three.js';
//import { Interaction } from "/web_modules/three.interaction.js";
import { Factory3d } from './../factory/factory3d.js'
import { AvatarX } from './../iso/avatarx.js'


function saveImage( label ) {
    const canvas =  document.getElementsByTagName("canvas")[0]
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    a.download=label+".png"
    a.click();
}

function startGlyph( obj ){
    var controller={};
    var factory = new Factory3d();
    window.factory = factory;
    var objrot = ( 'objrot' in obj ) ? obj.objrot : 0;
    var container = obj.holder; 
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 60,0.95, 1, 10000 );
    camera.position.set( ...obj.campos );
    camera.lookAt( new THREE.Vector3(...obj.camlook ) )

    var renderer = new THREE.WebGLRenderer(  { alpha: true  ,  antialias:true , preserveDrawingBuffer: true } );
    renderer.setSize( 400, 400 );
    //var interaction = new Interaction( renderer, scene, camera );
    //renderer.setClearColor( '#0000FF' );
    container.appendChild( renderer.domElement );

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffEEEE, 1, 0 );
    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( -100, -200, -400 );
    scene.add( ...lights  );
    



    var cur_sprite = new AvatarX( obj );
    scene.add( cur_sprite );


    var label = obj.label.toLowerCase();
    var icon_url = ''

    if( ['bot','flash','tower','module','atm','credential','world','repo','app'].includes( label ) )
    {
        icon_url = label+'.glb'
    }
    else if( label =='xindex' || label=='domain' || label =='project'){    
        icon_url = 'bluecube.glb'
    }
    else if(label =='app'){
        icon_url = 'greencube.glb'
    }
    else if(label =='service'){
        icon_url = 'redcube.glb'
    }    
    else if( label == 'actor' || label == 'user' || label == 'alias'  ){
        icon_url ='subuser.gltf'
    }else{                
        scene.add( factory.getClone('dot') )
    }        
    if( icon_url != ''){
        var final_icon_url = 'models3d/'+icon_url+'?'+Math.round( Math.random()*9999 )
        factory.loadModelX( final_icon_url ).then( ( objx ) =>{ 
            
            var box = new THREE.Box3().setFromObject( objx );
            scene.add( objx ) 
            objx.rotation.set(0, objrot ,0)
            //camera.position.y = box.max.y/2;
            //camera.position.z = 2+ box.max.y;
            //camera.lookAt( objx.position )
        });        
    }


    
    /// RENDER ONCE:::
    /// renderer.render( scene, camera );

    
    var animate = function () {
        requestAnimationFrame( animate );

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        //console.log('  ren',camera.uuid )
        renderer.render( scene, camera );
    };
    animate();
    
    
    document.getElementById('save').addEventListener('click', ()=>{
        saveImage( label )
    }) 
}


function animate() {

    minicamera.updateProjectionMatrix();
    renderer.render( scene, minicamera );
    requestAnimationFrame( animate );
}

export { saveImage , startGlyph }


function ready(){}
document.addEventListener( "DOMContentLoaded", ready );
