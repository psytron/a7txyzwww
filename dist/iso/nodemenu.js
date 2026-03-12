import * as THREE from '../web_modules/three.js'
import { BaseAvatar } from './baseavatar.js'
import {gsap , Expo } from '../web_modules/gsap.js'

class NodeMenu extends THREE.Mesh{

    constructor(objIn){
        super();
        this.floor = objIn.floor;
        this.im = objIn.im;
        this.type = 'NodeMenu';
        this.last_click_time = new Date()
        this.last_selected_obj = {}
        this.circle=true;
        //this.mesh.visible = false ;
        this.itr = 0;
    
        this.menu = new THREE.Group();
        this.menu.rotation.set( -Math.PI / 2,0,0);
        this.menu.name = 'menu';
        this.add( this.menu )    
        
        this.menubuttons = {
            // activate:{
            //     image:'img/avatar_icon.png',
            //     action:"path"
            // },
            // price:{
            //     image:'img/office_icon.png',
            //     action:'nothing'
            //     // Launch Gmail Email
            //     //https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=target@email.com&su=SUBJEX%20SOMETHING&body=Hello%2C%0A%0AI%20
            // },
            // coin:{
            //     image:'img/task_icon.png',
            //     action:'nothing'
            // },
    
            // asset:{
            //     image:'img/asset_icon.png',
            //     action:'link'
            // },
            delete:{
                image:'img/delete_icon.png',
                action:'delete'
            },        
            expand:{
                image:'img/arrange_icon.png',
                action:'expand'
            },
            settings:{
                image:'img/settings_icon.png',
                action:'settings'
            },
            link:{
                image:'img/link_icon.png',
                action:'link'
            },
            close:{
                image:'img/close_icon.png',
                action:'close'
            }
        }
            
        this.fireTouchEvent = this.fireTouchEvent.bind(this);
        this.reset = this.reset.bind(this);
        this.onFrameUpdate = this.onFrameUpdate.bind(this);
        this.hideComplete = this.hideComplete.bind(this);
        this.onFocusEvent = this.onFocusEvent.bind(this);
        this.onMapChanged = this.onMapChanged.bind(this);
        this.build = this.build.bind(this);

        window.addEventListener("focusEvent" ,this.onFocusEvent )
        window.addEventListener('mapChanged', this.onMapChanged )
        window.addEventListener('clearViewsEvent', this.reset )
        this.build()
    
        // INVIS 
        //this.visible=false;
        //this.position.set(999,999,999);
    
        // VIS 
        //this.visible=false;
        this.position.set(10,5,1);
        this.position.set(999,999,999);        
        
    }


    reset(){
        window.controller.setFocusObject( false )
        if( this.floor ){
            this.floor.off('mousedown',this.reset)
        }
    }
    
    fireTouchEvent( ev ){
        console.log('Clicked one button: ', ev.action )
        if( ev.action=='path' ){
            window.controller.outflowFromFocused()
        }
        if( ev.action=='link' ){
            window.controller.activateLinkSelection()
        }
        if( ev.action=='arrange' ){
            window.controller.arrangeAround()
        }
        if( ev.action=='currencies' ){
            window.controller.expand()
        }        
        if( ev.action=='delete' ){
            window.controller.delete()
        }        
        if( ev.action=='close' ){
            window.controller.setFocusObject( false )
        }    
        if( ev.action=='expand' ){
            window.controller.subgraphRequest( )
            
        }            
        this.hide()
    }
    
    build(){
        var loader = new THREE.TextureLoader();
        var idx =0;
        var im = this.im;
        for ( var i in this.menubuttons ){
            
            var cur_opt = this.menubuttons[i]
            cur_opt.idx = idx;
            var idxy = i;
            var texture = new THREE.TextureLoader().load( cur_opt.image ); 
            var material = new THREE.MeshBasicMaterial( { map:texture } );
            var circleGeometry = new THREE.CircleGeometry( 2.2, 22 ); //radius ,segs
            cur_opt.ref = new THREE.Mesh( circleGeometry, material );
            cur_opt.ref.name=''+i
            cur_opt.ref.scale.set(0.14,0.14,0.14)
            cur_opt.ref.material.transparent = true;
            cur_opt.ref.position.z=13; // radius
            cur_opt.ref.position.x=Math.sin( -1.62+ cur_opt.idx/1.7)*6; // radius
            cur_opt.ref.position.y=Math.cos( -1.62+ cur_opt.idx/1.7)*6;
            cur_opt.ref.addEventListener('mouseup', function(ev){
                // WHY IS THIS TRIGGERED EVERYWHERE 
                ev.stopPropagation();    
                console.log( Math.random(), this ,  ev , ev.target.name   )
                //this.parent.parent.fireTouchEvent(cur_opt)
                // add this so menu click doesn't trigger selection of self 
            })

            cur_opt.ref.addEventListener('mousedown', this.fireClickStarting );
            cur_opt.ref.addEventListener('mouseup', this.fireClickEnding );

            this.menu.add( cur_opt.ref );
            this.im.add( cur_opt.ref );
            idx++;               
            // cur_opt.callbackx = function( texture ){
            //     var o=6;
            //     // you are here 
            //     // meed to add this.im.add( btn )
            // }         
            //loader.load( cur_opt.image , cur_opt.callbackx.bind(this) );
        } // for
        //this.im.add( this.menu );
        //this.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.rotation.setFromVector3( new THREE.Vector3(0, 0,0) );
        this.position.set(0,0,4)
        var circle_bg;
        //loader.load( 'img/dottedcircle.png',  // resource URL
        loader.load( 'img/ringtexta.png',  // resource URL
            function ( texture ){         // Callback passes texture ref
                var material = new THREE.MeshBasicMaterial( {map: texture} );
                var circleGeometry = new THREE.CircleGeometry( 5, 24 ); //radius ,segs
                this.circle = new THREE.Mesh( circleGeometry, material );
                this.circle.name = 'ringtext';
                this.circle.material.transparent = true;
                this.circle.rotation.set( -Math.PI / 2,0,0);
                this.circle.position.x=0;
                this.circle.position.y=0;
                this.circle.position.z=0;//-1.9;
                this.add( this.circle );
            }.bind(this)
        );        
    }
    fireClickStarting( e ){

        var o =3;
        console.log(' STE:', e , this.name )
        this.parent.parent.fireTouchEvent( this.parent.parent.menubuttons[this.name] );
    }
    fireClickEnding( e ){

        var o =3;
        console.log(' END:' , e , this.name )
    }    
    onFrameUpdate( timestamp ){
            
        // COMPARE AT: 
        //this.lookAt( camera.position );

        // COMPARE AT: 
        this.menu.lookAt( camera.position );
        
        // console.log(' this',this.itr , timestamp )
        // rotation.y += 0.0006;
        this.itr++;
        
       
        if( this.visible  ){

            // TODO: this throws ex when edge is selected while node previously sel
            if( model.focusobject ){
                this.position.x=model.focusobject.sprite.position.x;
                this.position.y=model.focusobject.sprite.position.y;
                this.position.z=model.focusobject.sprite.position.z;
            }                
            this.circle.rotation.z -=0.0023;

       
            window.requestAnimationFrame( this.onFrameUpdate );    
        }else{
            window.cancelAnimationFrame( this.onFrameUpdate );
        }
    }
    
    show(){
        this.circle.scale.set(0,0,0)
        gsap.to( this.circle.scale ,  { duration:0.5, ease:Expo.easeOut , delay:0 , y:1,x:1,z:1 } )
        for( var i in this.menubuttons) {
            var cur_spr = this.menubuttons[i].ref
            cur_spr.scale.set(0,0,0)
        }
        var ndx = 0;
        for( var i in this.menubuttons){
            var cur_spr = this.menubuttons[i].ref
            gsap.to( cur_spr.scale , { duration:0.5, ease:Expo.easeOut , delay:0.2+(ndx/24) , y:0.6,x:0.6,z:0.6 } )
            ndx++;
        }
    }
    
    hideComplete(){
        this.visible=false;
        this.position.set(999,999,999)
    }
    
    hide(){
        var ndx = 0;
        gsap.to( this.circle.scale , { duration:0.5, ease:Expo.easeOut , delay:0 , y:0,x:0,z:0 } )
        for( var i in this.menubuttons){
            var cur_spr = this.menubuttons[i].ref
            gsap.to( cur_spr.scale , { duration:0.3, ease:Expo.easeOut , delay:ndx/24 , y:0,x:0,z:0 , onComplete:this.hideComplete } )
            ndx++;
        }
    }    
    onFocusEvent(e){
        
        if( model.focusobject && model.focusobjecttype != 1 ) {
            this.visible=true
            this.position.x=model.focusobject.sprite.position.x;
            this.position.y=model.focusobject.sprite.position.y;
            this.position.z=model.focusobject.sprite.position.z;
            this.show()
            this.last_selected_obj = model.focusobject.sprite;
            
            // THIS IS WHERE RESET FROM FLOOR WAS HAPPENING 
            // this.floor.on('mousedown', this.reset )
            window.requestAnimationFrame( this.onFrameUpdate );
        }else{
            //this.visible=false;
            //this.position.set(999,999,999)
            this.hide()
        }
    }
    onMapChanged(e){
        var model = e.detail.model;
        var map = model.cur_map;
        this.visible=false;
        this.position.set(999,999,999)
        if (map == 0) {

        }
    }
    //this.reset()    
}
//NodeMenu.prototype = Object.create( BaseAvatar.prototype );
//NodeMenu.prototype.constructor = NodeMenu;

//NodeMenu.prototype = Object.create( THREE.Sprite.prototype );
//NodeMenu.prototype.constructor = NodeMenu;
//NodeMenu.prototype.getMesh = function() {
//    return this.mesh;
//}
//NodeMenu.prototype.getSprite = function() {
//    return this.sprite;
//}

export { NodeMenu }

//module.exports = NodeMenu