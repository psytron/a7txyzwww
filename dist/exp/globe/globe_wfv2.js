

import * as THREE from '../web_modules/three.js';
import { OrbitControls } from '../web_modules/three/examples/jsm/controls/OrbitControls.js';


var mb_tkn_pri = 'sk.eyJ1IjoicHN5dHJvbiIsImEiOiJja3J0a3Y2dHA5c2xlMzFsM2czejYyNWIyIn0.8gF84sfpgH8Qpp5VeO8D1g';
var mb_tkn_pub = 'pk.eyJ1IjoicHN5dHJvbiIsImEiOiJja3J0a3JwM2oyeXh1Mm9vOWFjZTJvZGR1In0.YS3wNXiBl4C2eTf4YYSr8w';



// San Francisco/Coordinates
//  37.7749° N, 122.4194° W
// Hawaii/Coordinates
// 19.8968° N, 155.5828° W
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.z = 15;
camera.position.y = 10;
//camera.rotation.x = 0;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);
var z_height = 2;



const material3 = new THREE.MeshBasicMaterial({ color: 0x111133, wireframe: false, transparent: true });
const sea = new THREE.Mesh(new THREE.SphereGeometry(19.9, 34, 24), material3);
scene.add(sea);


const material2 = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true, transparent: true });
const ze = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material2);
scene.add(ze);
const ne = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material2);
scene.add(ne);
const sf = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material2);
scene.add(sf);
const hi = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material2);
scene.add(hi);

var pos0 = calcPosFromLatLonRad(0, 0, 20);
var pos1 = calcPosFromLatLonRad(52.3676, 4.9041, 20);
var pos2 = calcPosFromLatLonRad(37.7749, -122.4194, 20);
var pos3 = calcPosFromLatLonRad(21.3069, -157.1583, 20);
//Amsterdam/Coordinates   //52.3676° N, 4.9041° E
// Honolulu/Coordinates  // 21.3069° N, 157.8583° W
//var pos3 = calcPosFromLatLonRad( 19.8968 , - 155.5828 , 20 ); // big island
//pos3.addScalar( 4 );
ze.position.x = pos0.x
ze.position.y = pos0.y
ze.position.z = pos0.z

ne.position.x = pos1.x
ne.position.y = pos1.y
ne.position.z = pos1.z

sf.position.x = pos2.x
sf.position.y = pos2.y
sf.position.z = pos2.z

hi.position.x = pos3.x
hi.position.y = pos3.y
hi.position.z = pos3.z


function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);

    var x = -(radius * Math.sin(phi) * Math.cos(theta));
    var y = (radius * Math.cos(phi));
    var z = (radius * Math.sin(phi) * Math.sin(theta));

    //return [x,y,z];
    return { x: x, y: y, z: z };
}

function calcPosFromLatLonRad2(lat, lon, radius) {
    var spherical = new THREE.Spherical(
        radius,
        THREE.Math.degToRad(90 - lon),
        THREE.Math.degToRad(lat)
    );
    var vector = new THREE.Vector3();
    vector.setFromSpherical(spherical);
    console.log(vector.x, vector.y, vector.z);
    return vector;
}

// FUNCIONT 
function vertex([longitude, latitude], radius) {
    const lambda = longitude * Math.PI / 180;
    const phi = latitude * Math.PI / 180;
    return new THREE.Vector3(
        radius * Math.cos(phi) * Math.cos(lambda),
        radius * Math.sin(phi),
        -radius * Math.cos(phi) * Math.sin(lambda)
    );
}

function wireframe(multilinestring, radius, material) {
    const geometry = new THREE.Geometry();
    for (const P of multilinestring.coordinates) {
        for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
            geometry.vertices.push(p0 = p1, p1 = vertex(P[i], radius));
        }
    }
    return new THREE.LineSegments(geometry, material);
}
async function land() {
    //const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json");
    //const citres = await fetch("/data/cities.json");
    const citres = await fetch("/data/cities_small.json");
    const cits = await citres.json();
    //.then(data => console.log(data) );
    var citsx = cits.splice(-5000)

    console.log(citsx);
    for (var c in citsx) {
        var x = c;
        var m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material2);
        scene.add(m);

        var pos = calcPosFromLatLonRad(parseFloat(citsx[c]['lat']), parseFloat(citsx[c]['lng']), 20);
        // Amsterdam/Coordinates   //52.3676° N, 4.9041° E
        // Honolulu/Coordinates  // 21.3069° N, 157.8583° W
        // var pos3 = calcPosFromLatLonRad( 19.8968 , - 155.5828 , 20 ); // big island
        // pos3.addScalar( 4 );
        m.position.x = pos.x
        m.position.y = pos.y
        m.position.z = pos.z
    }




    const response = await fetch("/data/land-50m.json");
    const topology = await response.json();
    const mesh = topojson.mesh(topology, topology.objects.land);
    return wireframe(mesh, radius, new THREE.LineBasicMaterial({ color: 0x00AA66 }));
}
async function graticule() {
    const mesh = graticule10();
    return wireframe(mesh, radius, new THREE.LineBasicMaterial({ color: 0xaaaaFF }));
}
var radius = 20;
var height = 20;
var width = 20;
var grid_step = 10;
function graticule10() { // See https://github.com/d3/d3-geo/issues/95
    return {
        type: "MultiLineString",
        coordinates: [].concat(
            Array.from(
                range(-180, 180, grid_step),
                x => x % 90 ? meridian(x, -80, 80) : meridian(x, -90, 90)
            ),
            Array.from(
                range(-80, 80 + 1e-6, grid_step),
                y => parallel(y, -180, 180)
            )
        )
    };
}
function meridian(x, y0, y1, dy = 2.5) {
    return Array.from(range(y0, y1 + 1e-6, dy), y => [x, y]);
}
function parallel(y, x0, x1, dx = 2.5) {
    return Array.from(range(x0, x1 + 1e-6, dx), x => [x, y]);
}
function* range(start, stop, step) {
    for (let i = 0, v = start; v < stop; v = start + (++i * step)) {
        yield v;
    }
}
//topojson = require("topojson-client@3")
//THREE = require("three@0.99.0/build/three.min.js")
var g = graticule().then(function (obn) {
    scene.add(obn);

}, function (err) {

})


var l = land().then(function (obn) {
    console.log(' land')
    scene.add(obn);
}, function (err) {

    console.log('err')
});



var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    //cv.update()
    renderer.render(scene, camera);
};

animate();