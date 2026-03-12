import * as THREE from '../web_modules/three.js'
import {gsap , Expo } from '../web_modules/gsap.js'

class MetaView extends THREE.Mesh{
    

    constructor(){
        //THREE.Mesh.call( this);
        super();
        this.type = 'MetaView';
        this.cube = 1;

        this.build = this.build.bind(this);
        this.reset = this.reset.bind(this);
        this.selfUpdate = this.selfUpdate.bind(this);
        this.onSelectHoverEvent= this.onSelectHoverEvent.bind(this)
        
        window.addEventListener("selectHoverEvent" , this.onSelectHoverEvent )
        window.addEventListener("clearViewsEvent" , this.reset )
        window.addEventListener('mapChanged', this.reset )
        this.reset()
        this.build();
        
    }



    build = function(){
        this.cube = new THREE.Mesh(
            //new THREE.BoxGeometry( 7, 1, 7 ),
            new THREE.CylinderGeometry( 3, 3, 0.1, 32 ),
            new THREE.MeshNormalMaterial() );
        this.add( this.cube );
        this.cube.position.set(0,-0.6,0)
        //cube.rotation.set(-3,0,0)
    }

    reset(){
        this.visible=false;
        this.position.set(999,999,999)        
    }
    


    onSelectHoverEvent(e){

        if( model.hovernode && model.mode == 'select') {
            this.visible=true
            this.position.x=model.hovernode.sprite.position.x;
            this.position.y=model.hovernode.sprite.position.y;
            this.position.z=model.hovernode.sprite.position.z;

            for( var bb in this.buttons ){
                var aa=this.buttons[bb]
                aa.scale.set(0.01,0.01,0.01)
                TweenMax.to( aa.scale, 0.6, { ease:Expo.easeOut,delay:bb/15,y:1,x:1,z:1 } )
            }
            //this.scale.set(0,0,0);
            //TweenMax.to( this.position , 0.6 , { ease:Expo.easeOut , delay:0 , y:this.position.y+11 } )
            //TweenMax.to( this.scale , 0.6 , { ease:Expo.easeOut , delay:0 , x:1 , y:1 , z:1 } )
            this.last_selected_obj = model.hovernode.sprite

            this.cube.scale.set(0,0,0);
            gsap.to( this.cube.scale, 0.2 ,{
                ease:Expo.easeOut ,
                x:1 ,
                y:1,
                z:1
            })     
        }else{
            this.visible=false;
            this.position.set(999,999,999)
        }

    }

    selfUpdate=function(){
        /*
        if( _time <= SmoothTime){
            requestAnimationFrame( this.selfUpdate )
        }else{
        }*/
        this.lookAt( camera )
    }

}
// MetaView.prototype = Object.create( THREE.Mesh.prototype );
// MetaView.prototype.constructor = MetaView;
// MetaView.prototype.getMesh = function() {
//     return this.mesh;
// }

export { MetaView }