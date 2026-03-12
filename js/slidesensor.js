var c = console.log;
SlideSensor = function( scroll_target ){
    
    THREE.Mesh.call( this);
    this.type = 'SlideSensor';
    var mouseX = 0;
    var mouseY = 0;
    var mouse = new THREE.Vector2();
    var raycaster;

    var last_x= 0;
    var last_z= 0;
    raycaster = new THREE.Raycaster();
    
    this.landing_offset = 0;        
    landing_offset_x =0;
    landing_offset_z =0;
    landing_x=0;
    landing_z=0;

    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 1000, 1000, 2, 2 ),
        new THREE.MeshBasicMaterial({ color: 0x3F0F3F , side: THREE.DoubleSide , wireframe:true }) );
    plane.rotateX( - Math.PI / 2);
    //plane.position.set( 0,0,0 );
    plane.material.visible = true;
    plane.material.visible = false;
    this.add( plane );


    function getIntersection( ev ){
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( [plane] );//var intersects = raycaster.intersectObjects( ev.target , true );  // c , recursive
        for( var i =0; i<intersects.length; i++){

        };
        console.log( intersects.length )
        return intersects[0]
    }
    
    function onMoveEvent( ev ){           
        intersect = getIntersection(ev)
        //DROPP SPHERE IN POSITION
        
        var delta_x = intersect.point.x - last_x
        var delta_z = intersect.point.z - last_z

        /*
         var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.04,16,16) ,
            new THREE.MeshBasicMaterial({ color:0x33FF44, wireframe: true }) );
        sphere.position.x= intersect.point.x
        sphere.position.y= intersect.point.y
        sphere.position.z= intersect.point.z
        this.parent.add(sphere);    */


        try{
            scroll_target.position.x += delta_x
            scroll_target.position.z += delta_z
        }catch(err){}   

        last_x = intersect.point.x
        last_z = intersect.point.z
    }

    function onDownEvent( ev ){
        //event.preventDefault();
        controls.enabled = false;
        intersect = getIntersection(ev)
        landing_offset_x = scroll_target.position.x
        landing_offset_z = scroll_target.position.z

        last_x = intersect.point.x
        last_z = intersect.point.z
        
        document.addEventListener('mousemove' , onMoveEvent );
    }
    function onUpEvent( ev ){
        controls.enabled = true;
        document.removeEventListener('mousemove' , onMoveEvent );
    }
    
    plane.on('mousedown', onDownEvent );
    this.on('mouseup', onUpEvent );

    var _velocity = 0.0;
    var smooth_step = 0.1
    this.updateTossScroll=function()
    {
        var SmoothTime = 1.0;
        var _time = 0.1

        if(_underInertia && _time <= SmoothTime)
        {
            grid.transform.position += _velocity;
            _velocity = _velocity/3;
            _time += smooth_step;
        }
        else
        {
            _underInertia = false;
            _time = 0.0;
        }
    }

}
SlideSensor.prototype = Object.create( THREE.Mesh.prototype );
SlideSensor.prototype.constructor = SlideSensor;
SlideSensor.prototype.getMesh = function() {
    return this.mesh;
}