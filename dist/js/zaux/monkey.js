Monkey = function( objIn ){
    BaseAvatar.call( this);

    cube = new THREE.Mesh( 
        new THREE.CubeGeometry( 2, 2, 2 ), 
        new THREE.MeshNormalMaterial() );
    this.add( cube );

    this.plane = objIn.plane;     
    var mouse = new THREE.Vector2();
    var last_x= 0;
    var last_z= 0;
    var _velocity = 0.0;
    var x_velocity = 0.0;
    var z_velocity = 0.0;
    var smooth_step = 0.1;
    var SmoothTime = 5.0;
    var _time = 0.1
    function getIntersection( ev ){
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [this.plane] ,true );  // c , recursive
        return intersects[0]
    }
    this.movingMouse=function(ev){
        intersect = getIntersection(ev)
        x_velocity = intersect.point.x - last_x
        z_velocity = intersect.point.z - last_z
        try{
            this.position.x += x_velocity
            this.position.z += z_velocity
        }catch(err){}   
        last_x = intersect.point.x
        last_z = intersect.point.z        

    }.bind(this)
    this.updateTossScroll=function(){
        if( _time <= SmoothTime){
            x_velocity = x_velocity/1.05;
            z_velocity = z_velocity/1.05;
            this.position.x += x_velocity;
            this.position.z += z_velocity;
            _time += smooth_step;
            requestAnimationFrame( this.updateTossScroll )
        }else{
            _underInertia = false;
            _time = 0.0;
            x_velocity = 0;
            z_velocity = 0;
            last_x = this.position.x;
            last_z = this.position.z;
        }
    }.bind(this)
    this.onUpEvent=function( ev ){
        controls.enabled = true;
        document.removeEventListener('mousemove' , this.movingMouse );
        document.removeEventListener('mouseup' , this.onUpEvent );
        requestAnimationFrame( this.updateTossScroll );
    }.bind(this)
    this.on('mousedown', function(ev){
        controls.enabled = false;
        document.addEventListener('mousemove' , this.movingMouse );
        document.addEventListener('mouseup' , this.onUpEvent );
    });

};
Monkey.prototype = Object.create( BaseAvatar.prototype );
Monkey.prototype.constructor = Monkey;