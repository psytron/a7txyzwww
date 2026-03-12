// r69dev requires an explicit call to the dispose method for meshes to properly remove references held by the renderer.

// Working code:
// clearScene:
function (obj) {
    if (obj instanceof THREE.Mesh)
    {
        obj.geometry.dispose();
        obj.geometry = null;
        obj.material.dispose();
        obj.material = null;
        obj.dispose(); // required in r69dev to remove references from the renderer.
        obj = null;
    }
    else
    {
        if (obj.children !== undefined) {
            while (obj.children.length > 0) {
                this.clearScene(obj.children[0]);
                obj.remove(obj.children[0]);
            }
        }
    }
}


// You need to go back to front, not front to back, when removing array objects like this.

var obj, i;
for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
    obj = scene.children[ i ];
    if ( obj !== plane && obj !== camera) {
        scene.remove(obj);
    }
}




// The following will do to the RGB to hex conversion and add any required zero padding:

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

alert( rgbToHex(0, 51, 255) ); // #0033ff
//Converting the other way:

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

alert( hexToRgb("#0033ff").g ); // "51";
//Finally, an alternative version of rgbToHex(), as discussed in @casablanca's answer and suggested in the comments by @cwolves:

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


// Update 3 December 2012
// Here's a version of hexToRgb() that also parses a shorthand hex triplet such as "#03F":

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

alert( hexToRgb("#0033ff").g ); // "51";
alert( hexToRgb("#03f").g ); // "51";




// TEXTURE:
var TextureLoader = (function () {
    var _instance = null;

    var Loader = function () {
        var _loader = new THREE.TextureLoader();
        var _cache = [];

        function _cachePush(elem, val) {
            _cache.push({
                element: elem,
                value: val
            });
        }

        function _cacheSearch(elem) {
            for (var i = 0; i < _cache.length; i++) {
                if (_cache[i].element === elem) {
                    return _cache[i].value;
                }
            }

            return false;
        }

        function load(texture) {
            var match = _cacheSearch(texture);

            if (match) {
                return match;
            }

            var val = _loader.load(texture);
            _cachePush(texture, val);

            return val;
        }

        return {
            load: load
        }
    };

    function getInstance() {
        return (_instance) ? _instance : _instance = Loader();
    }

    return {
        getInstance: getInstance
    }
})();
// To use and cache the texture you need to call:
TextureLoader.getInstance().load(texture);








    ////////////////////////////////////////////////////////////////////////////////////
    ////  You can create a line in three.js having one color on each segment
    ////  by using the THREE.LineSegments and setting vertexColors = THREE.VertexColors;
    ////////////////////////////////////////////////////////////////////////////////////
    // for ( var i = 0; i < geometry.vertices.length; i+=2 ) {
    //    geometry.colors[ i ] = new THREE.Color( Math.random(), Math.random(), Math.random() );
    //    geometry.colors[ i + 1 ] = geometry.colors[ i ];
    //}
    // var material = new THREE.LineBasicMaterial({ color: 0xffffff,vertexColors: THREE.VertexColors });
    // var line = new THREE.LineSegments( geometry, material );
    // this.floor.geometry.vertices[idx].y = someNewYVal;
    // this.floor.geometry.__dirtyVertices = true;

    //this.float_a = new THREE.Mesh();
    // this.float_a = new THREE.Sprite();
    //this.float_a.position.set( this.a.position )