/// :: LOADER CACHE :: /// TODO: MOVE INTO ROBUST SUBMOD
var loader = new THREE.GLTFLoader();
var models = {};
function loadModelX ( url ) {
    if ( models[ url ] ) {
        return models[ url ].then( ( o ) => o.clone() );
    }
    return models[ url ] = new Promise( ( resolve, reject ) => {
        loader.load( url, function ( gltf ) {
            resolve( gltf.scene );
        }, undefined, reject );
    });
};
var tloader = new THREE.TextureLoader();
var textures = {};
function loadTextureX( url ){
    //if ( textures[ url ] ) {
    //    return textures[ url ].then( ( o ) => o.clone() );
    // }
    return textures[ url ] = new Promise( ( resolve, reject ) => {
        tloader.load( url, function ( texture ) {
            resolve( texture );
        }, undefined, reject );
    });
};/// :: LOADER CACHE :: ///


function Factory(){
    var loader = new THREE.GLTFLoader();
    var models = {};
    function loadModelX ( url ) {
        if ( models[ url ] ) {
            return models[ url ].then( ( o ) => o.clone() );
        }
        return models[ url ] = new Promise( ( resolve, reject ) => {
            loader.load( url, function ( gltf ) {
                resolve( gltf.scene );
            }, undefined, reject );
        });
    };
}