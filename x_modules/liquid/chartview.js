
import * as THREE from '../../web_modules/three.js'
import { FeeLineX } from './feelinex.js'
import { FeeLineY } from './feeliney.js'
import { VLine } from './vline.js'
import { Axis } from './axis.js'
import { gsap , Expo } from '../../web_modules/gsap.js'
import { factory3d } from '../../x_modules/factory/factory3d.js'

function ChartView( objIn ){
    THREE.Mesh.call( this);
    this.type = 'ChartView';

    var ax = new Axis( objIn )
    this.add( ax )
    var flx = new FeeLineX( )
    this.add( flx )
    var fly = new FeeLineY( {} )
    this.add( fly )
    this.vl = new VLine( objIn )
    this.add( this.vl )

    


    var geometry = new THREE.PlaneGeometry( 10, 10);
    var material = new THREE.MeshBasicMaterial( {color: 0x444444, side: THREE.DoubleSide  , wireframe:true , opacity: 0.5 } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.set(5.1,5.1,0)
    plane.rotateZ( Math.PI / 2 )
    this.add( plane );
    
    this.update = function(){

        console.log(' valine update ')
        this.vl.update()
    }

    /*
    var geometry = new THREE.CylinderGeometry( 0.4, 0.4, 0.01, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00CC00 , wireframe:true } );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x=-0.5
    cylinder.position.y=0.5
    this.add( cylinder );    */
    
    this.vol = new THREE.Group()
    this.add( this.vol )
    var geometry = new THREE.CircleGeometry( 0.1, 12 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00FFFF , wireframe:true } );
    var circle = new THREE.Mesh( geometry, material );
    circle.rotateZ( Math.PI / 2 );
    this.vol.add( circle );   
    this.vol.position.y=5;


    var points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 1, 0, 0 ) );
    var material = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var liner = new THREE.Line( geometry, material );
    liner.position.x=-0.5
    this.vol.add( liner );
    this.vol.position.x=-1;

    factory3d.getSuperTextAsync( 'Quant (Y)' , 0xEEEEEE ).then( ( titleZ ) => {    
        this.title = titleZ;
        this.title.scale.set(0.002,0.002,0.002)
        this.title.position.set(-1.9,-0.1,0)
        this.vol.add( this.title )
    })




    gsap.to( this.vol.position ,  { duration:4+Math.random()*2, y:5*Math.random() , ease:Expo.easeInOut , repeat:99, yoyo:true} );     



   
}

ChartView.prototype = Object.create( THREE.Mesh.prototype );
ChartView.prototype.constructor = ChartView;
ChartView.prototype.getMesh = function() {
    return this.mesh;
}
//module.exports = SwarmView

export { ChartView }