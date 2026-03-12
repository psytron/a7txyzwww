




function checkglobals( ){
    for(var b in window) {
        if(window.hasOwnProperty(b)) console.log(b);
    }
}
export default checkglobals;