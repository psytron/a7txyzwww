window.addEventListener('message', handleMessage, false);
// message event handler (e is event object)
function handleMessage(e) {
    // Reference to element for data display
    var el = document.getElementById('display');
    initObj = e.data;
    if( lefont ){
        controller.processCluster( initObj )
    }else{
        preloaded = initObj;
    }
    console.log(')))  payload received incoming message ' , new Date() )
    e.source.postMessage('PayLoad receives incoming message at ',"*");
    // send reply using e.source and e.origin properties
    // Check origin
    //if ( e.origin === 'http://www.example.com' ) {
    // Retrieve data sent in postMessage
    //el.innerHTML = e.data;


    // Send reply to source of message
    //e.source.postMessage('Message received', e.origin);
    //}
}

//console.log(' Interpreted mainb.js and Sending Ping to Parent at ', new Date())
//parent.postMessage("Hello","http://localhost:8851");
//parent.postMessage("Hello");
