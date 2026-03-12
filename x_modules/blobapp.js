
// import  { Objx } from '' 
import { ElementX } from '/x_modules/elx.js'
import { Blob } from '/x_modules/blob.js'

class BlobApp extends ElementX {
    constructor( obj ){
        super( obj );
        var blob = this.new( Blob )      // ES6 Class 
        var elem = this.new( ElementX )  // ES6 Class 
        var empt = this.new()            // Empty Elx Container 
        
        //var objx = this.new( 'Objx' )  // ES6 Class 
        //var elem = this.new( ElementX )  // ES6 Class 
        //var menu = this.new( { class:'Menu' , data:obj } )
        //var menu = this.new( { class:'Menu' , data:obj , dispatcher:model } )
        //var menu = this.new( { class:'Menu' , data:obj , automatic:true  } )
        //var empt = this.new() // empty container same as ElementX 
        //var page = this.new('panel.html')
        //var page = this.new('panel.html')
        //var model = new IsoModel()
        //var controller = new Controller()

        // stat.discoverEventDispatchers( model )
        // menu.discoverEventDispatchers( model )
        // menu.addEventListener('customEvent' , blob)
        // menu.searchEventListeners( blob ) // all interested listeners

        // model.addEventListener('customEvent' , blob)
        // model.addEventListeners( blob ) // all interested listeners
        // model.addEventListeners( blob ) // all interested listeners
        // menu.prop('')
                console.log('  ajjaa', this.whoIsMyParent() )
    }
    ping(){
        this.dispatchEvent( 'customEvent' , {'detail':{'x':'111','y':'222'}} )        
    }
    render(){
        this.innerHTML= `<span>BLobspan</span>`;
    }    
}
export { BlobApp };