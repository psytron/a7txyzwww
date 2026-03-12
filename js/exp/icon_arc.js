



var curve = new THREE.EllipseCurve(
    0, 0,             // ax, aY
    7, 15,            // xRadius, yRadius
    0, 3/2 * Math.PI, // aStartAngle, aEndAngle
    false             // aClockwise
);

var points = curve.getSpacedPoints( 20 );

var path = new THREE.Path();
var geometry = path.createGeometry( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

var line = new THREE.Line( geometry, material );

scene.add( line );