


// BASE 64 Image as TEXT :: 
var width = window.innerWidth;
var height = window.innerHeight; var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement); 
var scene = new THREE.Scene(); 


let image = new Image();
image.src = '<PASTE YOUR BASE64 CODE HERE>'; 
let texture = new THREE.Texture();
texture.image = image;
image.onload = function () {
    texture.needsUpdate = true;
}; 
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
let material = new THREE.MeshLambertMaterial({ map: texture });
let cubeSize = 150;
let cubeMesh = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
var cube = new THREE.Mesh(cubeMesh, material);
scene.add(cube); var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position); scene.add(camera);//Add ambient light to make the scene more light
ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight); var clock = new THREE.Clock(); function render() {
    requestAnimationFrame(render);
    cube.rotation.y -= 0.005;
    cube.rotation.z += 0.005;
    renderer.render(scene, camera);
} render();