import { gsap , Expo } from "../web_modules/gsap.js";


class CameraListener{
    
        
    constructor( cam , cont ){

        this.camera = cam;
        this.controls = cont
        
    }


    

    onArrangeChangeEvent(e){

        switch( e.detail.model.cur_arrange ){
            case "force":
        		// gsap.to( this.camera.position , {  duration:4.5, ease:Expo.easeInOut , x:0 , z:148 , y:40, onComplete:function(e){
          //   		var jjj=0;
        		// 	this.controls.update();
        		// }.bind(this)  }) 
                break;                
            case "springshort":
            case "springlong":   
            case "springswap":   
                //this.update = this.updateForceDirected; 
                break;
            case "sphere":
        		// gsap.to( this.camera.position , {  duration:4.5, ease:Expo.easeInOut , x:0 , z:148 , y:40, onComplete:function(e){
        		// 	this.controls.update();
        		// }.bind(this)  }) 
                break;
            case "fragment":
        		// gsap.to( this.camera.position , {  duration:4.5, ease:Expo.easeInOut , x:0 , z:248 , y:80, onComplete:function(e){
        		// 	this.controls.update();
        		// }.bind(this)  })                 
                break;
            default:
                //this.update = this.updateBlank;    
                // default does nothing now 
                // shouldn't update the refresh mode if something else changes 

                
        } 


    }
}

export { CameraListener }

