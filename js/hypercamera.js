var camera       // camera
var cameraPos0   // initial camera position
var cameraUp0    // initial camera up
var cameraZoom   // camera zoom
var iniQ         // initial quaternion
var endQ         // target quaternion
var curQ         // temp quaternion during slerp
var vec3         // generic vector object
var tweenValue   // tweenable value

// init camera
function setup()
{
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position = new THREE.Vector3(0, 0, 80)
    cameraPos0 = camera.position.clone()
    cameraUp0 = camera.up.clone()
    cameraZoom = camera.position.z
}

// set a new target for the camera
function moveCamera(euler, zoom)
{
    // reset everything
    endQ = new THREE.Quaternion()
    iniQ = new THREE.Quaternion().copy(camera.quaternion)
    curQ = new THREE.Quaternion()
    vec3 = new THREE.Vector3()
    tweenValue = 0

    endQ.setFromEuler(euler)
    TweenLite.to(this, 5, { tweenValue:1, cameraZoom:zoom, onUpdate:onSlerpUpdate })
}

// some .
// on every update of the tween
function onSlerpUpdate()
{
    // interpolate quaternions with the current tween value
    THREE.Quaternion.slerp(iniQ, endQ, curQ, tweenObj.value)

    // apply new quaternion to camera position
    vec3.x = cameraPos0.x
    vec3.y = cameraPos0.y
    vec3.z = cameraZoom
    vec3.applyQuaternion(curQ)
    camera.position.copy(vec3)

    // apply new quaternion to camera up
    vec3 = cameraUp0.clone()
    vec3.applyQuaternion(curQ)
    camera.up.copy(vec3)
}