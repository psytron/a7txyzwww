//const offscreen = document.querySelector('canvas').transferControlToOffscreen();
//const worker = new Worker('/static/js/worker.js');
//worker.postMessage({ canvas: offscreen }, [offscreen]);

//window.addEventListener("message", receiveMessage, false);
/* wow */
/*
function receiveMessage(event){
    console.log('win')
    if (event.origin !== "http://example.org:8080")
        console.log('win')
    return;
}
*/
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8851/loginprivate", true);
xhr.withCredentials = true;
xhr.setRequestHeader("Authorization", 'Basic ' + btoa('myuser:mypswd'));xhr.onload = function () {
    console.log(xhr.responseText);
};
//xhr.send();

var requirex= {}