//import { Kvs } from '/x_modules/kvs.js'
//import { Kvs } from '/x_modules/apps/kvs/kvs.js'

class Hexframe{

    constructor( initObj ) {
        
        console.log(' new hex frame ', initObj )

        this.frame = document.createElement('iframe');
        this.frame.setAttribute('id', 'frame'); // assign an id
        this.frame.style.width='500px'

        
        this.target = initObj.target;
        this.target.appendChild(this.frame); // to place at end of document

        // assign url
        this.frame.setAttribute('src', 'http://yahoo.com');        
    }


}

export { Hexframe }



