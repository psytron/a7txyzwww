

let officialstate='winning';

function alter(){
    officialstate += '_added_chunk_'+String( Math.round( Math.random()*888))
    console.log( 'OFFICIAL STATE: ',officialstate)
}

export { alter }

