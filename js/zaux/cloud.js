			Cloud = function( par_in ){
				
				console.log("par in: ",par_in)
				this.mesh = new THREE.Object3D();  // Create an empty container that will hold the different parts of the cloud
				var lemesh = this.mesh;
				var geom = new THREE.BoxGeometry(2,2,2); // this shape will be duplicated to create the cloud  // create a cube geometry;
				var mat = new THREE.MeshPhongMaterial( new THREE.Color( 'skyblue' )  );// create a material; a simple white material will do the trick
				var mat = new THREE.MeshPhongMaterial( new THREE.Color( 'skyblue' )  );// create a material; a simple white material will do the trick
				var nBlocs = 1+Math.floor(Math.random()*3); // duplicate the geometry a random number of times

				var geom = new THREE.BoxGeometry( 2, 2, 2 );
				var mat = new THREE.MeshNormalMaterial();

				setTimeout(function(){ 
					//warp();
				}, 4000);

				//var mesh = new THREE.Mesh( geometry, material );
				this.mesh.position.x = Math.random() * 2300 - 1150; 
				this.mesh.position.y = Math.random() * 2300 - 1150; 
				//this.mesh.position.z = Math.random() * 2300 - 1150;
				this.mesh.scale.x = 5; this.mesh.scale.y = 5; this.mesh.scale.z = 5; 
			
				//mesh.updateMatrix();
				
				var lablz=["KLE1","ZERO","2xEE","VOFP","@30"]
				var txtspr = makeTextSprite( lablz[Math.floor(Math.random()*4)]) 
				this.mesh.add( txtspr )
				var loader = new THREE.ObjectLoader();
				loader.load("/static/models/teapot-claraio.json", function ( obj ){
				 	obj.scale.x = 10; obj.scale.y = 10; obj.scale.z = 10;
				 	lemesh.add( obj );
				})


				for (var i=0; i<nBlocs; i++ ){
					var m = new THREE.Mesh(geom, mat);  // create the mesh by cloning the geometry
					//m.updateMatrix();
					m.position.x = i*15; // set the position and the rotation of each cube randomly
					m.position.y = Math.random()*20;
					m.position.z = Math.random()*220;
					m.rotation.z = Math.random()*Math.PI*2;
					m.rotation.y = Math.random()*Math.PI*2;
					var s = .1 + Math.random()*.9; // set the size of the cube randomly
					//m.scale.set(1,1,1);
					this.mesh.add(m); // add the cube to the container we first created
				}

				this.warp=function(){
					//console.log("should warp", TWEEN );
					//TWEEN.removeAll();
					//new TWEEN.Tween( lemesh.position )
    				//.to( { x:0 ,y:0 , z:0 }, 5000 )
    				//.onUpdate( render )
    				//.start();   
    				scl = -22 + Math.random()*20
    				pcl = -100 + Math.random()*100
    				//TweenMax.to( lemesh.position, 5 , { ease: Expo.easeInOut, x:pcl, y:pcl, z:pcl } )
    				//TweenMax.to( lemesh.scale, 5 , { ease: Expo.easeInOut, x:scl, y:scl, z:scl } )
				}
				var warp = this.warp;
			};
