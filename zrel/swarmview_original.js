
 // THREE.SceneUtils.traverseHierarchy( object, function ( object ) { object.visible = false; } );
SwarmView = function(){
    THREE.Mesh.call( this);
    this.type = 'SwarmView';
    //var self = this;
    //this.mesh = new THREE.Object3D();  // Create an empty container that will hold the different parts of the cloud
    //var mesh = this.mesh;
    var group = new THREE.Group();

    this.swarm_holder = new THREE.Group();
    this.add( this.swarm_holder )
    this.links=[];
    this.nodes=[];
    this.interval = 0;
    this.central_node;

    this.onDataUpdate = function (e){
        var model = e.detail.model;
        var linkData = model.links;
        var nodeData = model.nodes;
        var map = model.cur_map;
        this.nodes=model.nodes;
        this.links=model.links;

        cur_index=0;
        this.central_node = this.nodes[0];
        this.central_nodes = this.nodes.slice(3, 14);

        var intervalID = setInterval(function() {
            var datNode = this.nodes[cur_index]
            if( datNode )
            {
                var datNode = this.nodes[cur_index ]
                var av = new AvatarX( datNode );

                // HERE WE DYNAMICALLY ADD AVATAR_TYPE  datNode['type'] //
                ///// Dynamic Class here seemed like it was next levely but  comment it for now
                //if( datNode.type == 'market' || datNode.type =='asset_index' || datNode.type=='market_index' ){
                //    var c = eval('AvatarX');
                //}else{
                    //var c = eval('AvatarY');
                //}
                //av=new c( datNode );

                this.nodes[cur_index]["sprite"]=av;
                this.nodes[cur_index]['ndx']=cur_index;
                this.add( av )
                ++cur_index;                
            }else{
                clearInterval( intervalID );


                for( var l in this.links ){
                    var cur_link = this.links[l];
                    var originNode = model.getNodeByUUID( cur_link.a ).sprite
                    var datNode = model.getNodeByUUID( cur_link.b ).sprite
                    var newlink = new Link( { a:originNode , b:datNode , mesh:this.swarm_holder , type:cur_link.type, meta:cur_link.meta } );
                    cur_link.sprite = newlink;
                    //this.add( newlink ) // add not necessary as the object is managing drawing its own lines
                };

                // model.setMode(6) //Animate Map Upon Loading
                // THIS could do
                // model.setMode(0) based on no clusters being found or
                // or some server param :
            }
        }.bind(this), 0.1);

        var geometry = new THREE.CubeGeometry(5,5,5);
        var nodeMaterial = new THREE.MeshBasicMaterial({color: 0x009e8f});
        this.graph = require('ngraph.generators').grid3(8, 8, 8);
        this.layout = require('./')(this.graph);
        var ui = {};
        //var self = this;
        graph.forEachNode(function (node) {
            var pos = layout.getNodePosition(node.id);
            var cube = new THREE.Mesh(geometry, nodeMaterial);
            ui[node.id] = cube;
            this.add(cube);
        });


        /* ORINGIAL CREATE
        for( var n in this.nodes ){
            var av = new AvatarX( this.nodes[n] );
            nodeData[n]["sprite"]=av;
            nodeData[n]['ndx']=n;
            this.swarm_holder.add( av )
        }*/
        // test base avatar extended
        //var baX = new AvatarX({ uuid:'n00'})
        //mesh.add( baX )
        //nodes.push( baX )
        //Once edited breakpoints drop?

        //BUILD LINKS FROM NODES
        // THREE.SceneUtils.traverseHierarchy( object, function ( object ) { object.visible = false; } );

    }.bind(this)
    window.addEventListener('dataUpdate',this.onDataUpdate , false); // for
    window.addEventListener('build', function (e)
    {
        console.log(" swarm view received event ")
    }, false);
    //window.addEventListener('mapChanged', this.onMapChangeEvent.bind(this), false);
    window.addEventListener('mapChanged', function (e)
    {
        var model = e.detail.model;
        var map = model.cur_map;

        if( map == 0 ){
            TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:0.4 } )
            //this.update = this.updateGridEnumerate;
        }else if( map==1){
            TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:1.1 } )
            //this.update = this.updateRandom;
        }else if( map==3){
            TweenMax.to( this.rotation , 0.5 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            this.update = this.updateBlank;
        }else if( map==6){
            //TweenMax.to( this.rotation , 2.4 , { ease:Expo.easeInOut , delay:0 , y:0 } )
            this.update = this.updateGridEnumerate;
        };
        //console.log("@#F@# ")
    }.bind(this) , false);

    window.addEventListener('clearUpdate', function (e){  // Listen for the event.
        for (var i = this.swarm_holder.children.length - 1; i >= 0; i--) {
            var cur_sprite = this.swarm_holder.children[i];
            try{
                cur_sprite.deallocate();
            }catch(err){};
            this.swarm_holder.remove( cur_sprite );
        }
        this.nodes=[];
        this.links=[];
    }.bind(this) ,false )




    var intrvl = 240;

    this.updateForceDirected = function() {
        this.rotation.y += 0.0001;

        this.layout.step();
        for (var key in ui) {
            var cube = ui[key];
            var pos = this.layout.getNodePosition(key);
            cube.position.x = pos.x;
            cube.position.y = pos.y;
            cube.position.z = pos.z;
        }

        //var springs = []
        //for( x in springs){
        //    var source_node = spring.a
        //    sprint.b.positoin = spring.a + local_offeset_enumerated;
        // }





    }



    this.updateGridEnumerate = function() {
        this.rotation.y -= 0.0002;
        

        for( n in this.nodes ){

            var fu_vec = this.nodes[n].positions['futurex']
            var cur_vec = this.nodes[n].sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/50
            cur_vec.y  += ((  fu_vec.y  ) - cur_vec.y )/20
            cur_vec.z  += ((  fu_vec.z  ) - cur_vec.z )/100
            
        }
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
        //        this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
            //    this.links[l].sprite.update();
            }catch( e ){};
        }        
    }



    this.updateGridEnumerateRand = function() {
        this.rotation.y -= 0.0002;
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            fu_point = cur_node.positions['futurex']

            // iterate over virtual springs
            // each spring connects two nodes
            // iteration is in fixed order so that one always starts first one ends last
            // move node at one end of spring to some relative position of first end of spring 
            var orig_n = n
            var remlen = 6 % Math.max( 1,n)
            var lenrem = 1 + n % 6
            var offset = 5 - n % 6;
            var xclass = cur_node.label;
            //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            fu_vec = this.nodes[remlen].sprite.position
            
            cur_vec = cur_node.sprite.position
            cur_vec.x  += ((  fu_vec.x  ) - cur_vec.x )/100
            cur_vec.y  += ((  (n)+fu_vec.y  ) - cur_vec.y )/100
            cur_vec.z  += (fu_vec.z - cur_vec.z )/100

        }
    }

    this.updateGridEnumerateMoveTowards = function() {
        this.rotation.y -= 0.0002;
        fu_vec = this.nodes[0].sprite.position
        for( n in this.nodes ){
            if( n > 0 ){


            cur_node = this.nodes[n]
            //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
            //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
            //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
            fu_point = cur_node.positions['futurex']
            random_x = Math.random()*10-Math.random()*10
            random_y = Math.random()*10-Math.random()*10
            random_z = Math.random()*10-Math.random()*10
            //fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            //fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            
            cur_vec = cur_node.sprite.position
            //cur_node.sprite.translateOnAxis( fu_vec ,0.001)
            cur_vec.x  += ( fu_vec.x - cur_vec.x )/100
            cur_vec.y  += ( fu_vec.y - cur_vec.y )/100
            cur_vec.z  += ( fu_vec.z - cur_vec.z )/100
            //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
            //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            

            }; 
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }

        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }


    this.updateGridEnumerateSliding = function() {
        this.rotation.y -= 0.0002;
        for( n in this.nodes ){
            cur_node = this.nodes[n]
            //x_dist = cur_node.positions['futurex']['x'] + Math.max(0, (cur_node.sprite.position['x'] - cur_node.positions['futurex']['x'])/2 )
            //y_dist = cur_node.positions['futurex']['y'] + Math.max(0, (cur_node.sprite.position['y'] - cur_node.positions['futurex']['y'])/2 )
            //z_dist = cur_node.positions['futurex']['z'] + Math.max(0, (cur_node.sprite.position['z'] - cur_node.positions['futurex']['z'])/2 )
            //cur_node.sprite.position.set( x_dist,y_dist,z_dist )
            fu_point = cur_node.positions['futurex']
            random_x = Math.random()*10-Math.random()*10
            random_y = Math.random()*10-Math.random()*10
            random_z = Math.random()*10-Math.random()*10
            fu_vec = new THREE.Vector3( random_x,random_y,random_z )
            fu_vec = this.nodes[Math.max(0,this.nodes.length-n-1)].sprite.position
            cur_node.sprite.translateOnAxis( fu_vec ,0.001)
            //cur_node.sprite.position.set( cur_node.positions['futurex']['x'] , cur_node.positions['futurex']['y'], cur_node.positions['futurex']['z'] )
        }

        // upon activation write new grid position assigments into metadata of ordered model or swarmview cache
        // move each towards its model defined position  , based on randomly selected unique position of cube address.
        // distribute positions to random cube address positions:
        // default position can be 3D offeset from 0
        // or manual positions, manually set maps,
        //
    }

    this.updateElastic = function(){
        this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                // calculate the net force on this sprite from surrounding sprites?
                var center_sprite = this.nodes[i].sprite;
                for( var gx in this.nodes ){
                    var related_sprite = this.nodes[gx];
                }
                //this.nodes[i].sprite.position.y -= this.nodes[i].sprite.position.y / 12;
                //this.nodes[i].sprite.position.x = ( this.nodes[i].sprite.position.x - (this.central_node.sprite.position.x/22) ) ;

                this.central_node.sprite.position.x = this.central_node.sprite.position.x +( (0-this.central_node.sprite.position.x ) / intrvl );
                this.central_node.sprite.position.z = this.central_node.sprite.position.z +( (0-this.central_node.sprite.position.z ) / intrvl );
                this.central_node.sprite.position.y = this.central_node.sprite.position.y +( (0-this.central_node.sprite.position.y ) / intrvl );

                for( var cx in this.central_nodes ){
                    var periphery_node = this.central_nodes[cx];
                    periphery_node.sprite.position.x = this.central_node.sprite.position.x;
                    periphery_node.sprite.position.z = this.central_node.sprite.position.z;// + ( (this.central_node - periphery_node.sprite.position.x)/intrvl );
                }
            }catch( e ){};
        }

        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
                // link get a <-( distance / force )-> b
                // a.moveTowards / Away
                // b.moveTowards / Away
            }catch( e ){};
        }
    }

    this.updateRandom = function(){
        this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
                this.nodes[i].sprite.position.x += i / 30;
                this.nodes[i].sprite.position.z -= i / 50;
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }

    this.updateBlank = function(){
        this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;
        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }

    this.updateOriginal = function(){
        this.rotation.y+=0.0001;
        var timestamp = new Date() * 0.0005;

        for( var i in this.nodes ){
            try{
                this.nodes[i].sprite.update();
            }catch( e ){};
        }
        for( var l in this.links ){
            try{
                this.links[l].sprite.update();
            }catch( e ){};
        }
    }

    this.update = this.updateBlank;

    this.onCamReset = function(){


    }

    this.selfUpdate = function(){
        requestAnimationFrame( this.selfUpdate );
        var timestamp = new Date() * 0.0005;
        nodes[0].position.x+=Math.sin(timestamp) * 3;
        nodes[0].position.z+=Math.cos(timestamp) * 3;
        nodes[1].position.x+=Math.cos(timestamp) * 3;
        nodes[1].position.z+=Math.sin(timestamp) * 3;
        linexx.geometry.verticesNeedUpdate = true;
    }
    this.drawCoordinates=function(){

        var colors = ["#FF7777","#77FF77","#7777FF","#7777FF","#7777FF"]
        this.color = colors[Math.round( Math.random() *3)];
        // COORDINATE PLANE
        var spanl=300
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     spanl));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( spanl, 0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     20 ,   0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     -spanl));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( -spanl,0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     0,     0));
        geometry.vertices.push(new THREE.Vector3( 0,     20,    0));
        material = new THREE.LineBasicMaterial( { color:this.color , linewidth:1 } );
        xyzline = new THREE.Line(geometry, material);
        this.add(xyzline);

        var total_lines=32;
        var one_space=24;
        var line_length =((total_lines*one_space)-one_space)/2;
        var half_offset= -(total_lines/2)*one_space;
        for( var i=0; i<total_lines; i++){
            var geometry = new THREE.Geometry();
            geometry.vertices.push( new THREE.Vector3( 0, 0, line_length ) ); //x, y, z
            geometry.vertices.push( new THREE.Vector3( 0, 0,-line_length ) );
            var material = new THREE.LineBasicMaterial( { color:this.color , linewidth: 1 } );/* linewidth on windows will always be 1 */
            var line = new THREE.Line(geometry, material);
            var newpos = half_offset+(i*one_space)
            line.position.x=newpos;
            this.add(line);

            var line = new THREE.Line(geometry, material);
            var newpos = half_offset+(i*one_space)
            line.position.z=newpos;
            line.rotation.y=Math.PI/2;
            this.add(line);
        }

        // PLANE
        //var geo = new THREE.PlaneBufferGeometry( spanl*2, spanl*2, 8, 8 ); //giant plane
        var geo = new THREE.PlaneBufferGeometry( 100, 100, 1, 1 );
        var mat = new THREE.MeshBasicMaterial({ color: 0x33FF33 , side: THREE.DoubleSide , wireframe:true });
        var plane = new THREE.Mesh(geo, mat);
        plane.rotateX( - Math.PI / 2);
        plane.position.set( 100,1,50 )
        this.add( plane );
        plane.position.set(100,1,150)
        this.add( plane );

        // Create a texture loader so we can load our image file
        var loader = new THREE.TextureLoader();
        // Load an image file into a custom material
        var material = new THREE.MeshLambertMaterial({map: loader.load('/static/img/addbutton.png') });
        var geometry = new THREE.PlaneGeometry(5, 5);// create a plane geometry for the image with a width of 10// and a height that preserves the image's aspect ratio
        var mesh = new THREE.Mesh(geometry, material);// combine our image geometry and material into a mesh
        mesh.position.set(0,0,0)
        //Hexadecimal color (recommended)
        var myColor = new THREE.Color( 0x22AA22 );
        material.color = myColor;
        mesh.rotation.setFromVector3( new THREE.Vector3(  - Math.PI / 2, 0,0) );
        this.add(mesh);


        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(880,16,16) ,
            new THREE.MeshBasicMaterial({ color:0x33FF44, wireframe: true }) );
        sphere.position.set( 0,0,0)
        this.add( sphere );

    }
    this.drawCoordinates();
}
SwarmView.prototype = Object.create( THREE.Mesh.prototype );
SwarmView.prototype.constructor = SwarmView;
SwarmView.prototype.getMesh = function() {
    return this.mesh;
}
