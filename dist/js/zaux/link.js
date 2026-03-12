
Link = function( objIn ){

    this.objIn = objIn;





    // ANIMATED LINE: // https://jsfiddle.net/prisoner849/4j4euqtv/
    this.steady = function(){
        
        //this.float_a.position.set( this.a.position );
        
        var x_distance =  ( this.b.position.x - this.a.position.x);
        var z_distance = ( this.b.position.z - this.a.position.z );
        linexx.geometry.verticesNeedUpdate = true;
        linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        //linexx.frustumCulled = false;// Alternatively, you can prevent frustum culling of your line by setting
        //txtspr.position.x = this.b.position.x- (x_distance / 2);
        //txtspr.position.y = this.b.position.y- (( this.b.position.y - this.a.position.y) / 2)+10;
        //txtspr.position.z = this.b.position.z- (z_distance / 2);
    }
    this.outing = function(){
        var x_distance =  ( this.b.position.x - this.a.position.x) - this.exititer;
        var z_distance = ( this.b.position.z - this.a.position.z ) - this.exititer;
        linexx.geometry.verticesNeedUpdate = true;
        linexx.geometry.computeBoundingSphere();// frustum culling to work correctly.
        //linexx.frustumCulled = false;// Alternatively, you can prevent frustum culling of your line by setting
        //txtspr.position.x = this.b.position.x- (x_distance / 2);
        //txtspr.position.y = this.b.position.y- (( this.b.position.y - this.a.position.y) / 2)+10;
        //txtspr.position.z = this.b.position.z- (z_distance / 2);
        this.exititer++;
    }
    this.nothing = function(){

    }
    this.activate=this.steady;
    this.update = function(){
        this.steady();
    }

    this.a = objIn.a;
    this.b = objIn.b;
    this.initObj = objIn;
    this.targetmesh = objIn.mesh;
    var colors = [0x666666,0x00FF00,0xa700ff,0xffa800,0x71de00,0xce4e00]
    //this.color = "#EEEEEE" //objIn.color || colors[Math.round( Math.random() *4)];
    this.color = colors[Math.round( Math.random() *4)];

    if( this.initObj.type == 'demand_index'){
        this.color="#666666"
    }

    this.offset = Math.random() * 1.4;
    var lineGeom = new THREE.Geometry();
    lineGeom.vertices.push(this.a.position);
    lineGeom.vertices.push(this.b.position);
    var lineMat = new THREE.LineBasicMaterial({ color:this.color ,linewidth:1, linecap:'round' });
    var linexx = new THREE.Line( lineGeom, lineMat );
    this.linexx = linexx; //this.linexx.transparent=true;
    this.targetmesh.add( linexx )
    this.start_date = new Date()


    var geo = new THREE.CubeGeometry( 2, 2, 2 )
    var mat = new THREE.MeshNormalMaterial()
    this.packets = [new THREE.Mesh( geo , mat ),new THREE.Mesh( geo , mat ),new THREE.Mesh( geo , mat )];
    this.targetmesh.add( this.packets[0] )
    this.targetmesh.add( this.packets[1] )
    this.targetmesh.add( this.packets[2] )
    this.step = 0; 

    this.enterFrameUpdatePackets=function(){

    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    window.addEventListener('mapChanged', function (e) {
        this.exititer=0;
        var model = e.detail.model;
        var map = model.cur_map;

        if( map == 7){
            //this.visible=true;
            TweenMax.to( this.linexx.material ,2,{
                ease: Expo.easeIn,
                opacity:0 })  }
        if( map == 0 ){

            this.step=0;
            this.update = this.enterFrameUpdatePackets;
        }

    }.bind(this) , false);


}
// Experiment Submesh loadable
Link.prototype = Object.create( THREE.Mesh.prototype );
Link.prototype.constructor = Link;
Link.prototype.getMesh = function() {
    return this.mesh;
}
Link.prototype.makeTextSprite=function( message, parameters ) {
    var colorobj = hexToRgb(this.color);
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Helvetica";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] :100;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:colorobj.r, g:colorobj.g, b:colorobj.b, a:1.0 };
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "" + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.font = "" +42 + "px " + fontface;
    context.fillText( "000007" ,0, 80,400);
    context.fill()
    context.fillStyle ="#dbbd7a";

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 21,21,21 );
    return sprite;
}
