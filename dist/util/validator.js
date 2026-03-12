
var run_counter = 1;
var counter = 0;
function inspect( obj ) {
    run_counter++;
    var out = { message:'ob' , error:0 }

    // MISMATCH 
    if( obj.passphrase1 != obj.passphrase2 ){
        out.message = 'Mismatched PassPhrase'
        out.error = 1;
    }

    // PAS MISH 
    if( 'passphrase1' in obj && obj.passphrase1.length < 1 ){
        out.message = 'PassPhrase Too Short'
        out.error = 1;
    }    

    // DOM SHORT  
    if( obj.domain =='' ){
        console.log('fd');
        out.message = 'Domain Missing'
        out.error = 1
    }        

    return out;
}

    

function increment() {
    counter++;
}

function decrement() {
    counter--;
}

export default {
    counter: counter,
    inspect: inspect,
    increment: increment,
    decrement: decrement
};