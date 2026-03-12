
import { Elx } from '../../../x_modules/elx.js'


class Cell extends Elx {
    constructor( initObj ) {
        super( initObj )
        
        this.element = initObj.element; 
        // better to have initObj ? 
        // if 'container' in initObj else 'body'
        // if 'data' in initObj else {}
        // if 'id' in initObj else 'qr'
        this.count = 1000;
        var node = initObj.data;
        this.node=initObj.data;

        if (!(node instanceof HTMLElement)) {
            throw new Error("The 'node' property must be an HTML element reference.");
        }
        this.node = node;
        this.initialize();
    }
    onDataUpdate( data_in ){
        
    }
    render( objIn ){

        this.element; 

        if( objIn == 'Object' ){

        }else{
            // ARRAY SO LOOP 
             
        }

        var label;
        if( 'labels' in obj.payload ){
            label =  obj.payload.labels[0];
            
        }else if( 'label' in obj.payload ){
            label = obj.payload.label; 
        }else{
            label = 'connects'; 
        }

        // OK IS IT HERE THAT WE ADD INJECTION OF IFRAME PARANMETERS ? 
        // OR DO WE PUT IT IN THE TERMINAL MODULE 
        // HOW DOES IT GO FROM DATA TO TERMINAL MODULE 
        

        // Eventuall map this to the module itself
        // E.g. module knows its best arrangement. 

        // soon xclasss 
        var detected_xclass = label.toLowerCase(); 
        label = detected_xclass;
        
        //label = ('label' in obj.payload )?  : 'connects';
        // GET ARRAY OF CAPABILITY DEMANDS FOR THIS XCLASS 
        var caplist = gluemapper.xclass_caps( label , 'caps' , obj.payload );
        
        // ATTACH PANELS 
        if( model.focusobjecttype == 1){
            var fromObj = model.getNodeByUUID( obj.fromId )
            var toObj = model.getNodeByUUID( obj.toId )
            this.newClass( con1 ,  'Qr' , fromObj , 'some_id1', 0)
            this.newClass( con1 ,  'Xfer', obj ,     'some_id2', 1)
            this.newClass( con1 ,  'Qr' , toObj ,   'some_id3', 2)
        }else if( model.focusobject.payload.label == 'Module' ){
            var winds=[];
            console.log('Module clicked: ')
            caplist.forEach( function(item, index){
                var nc = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
                var a = nc;
                winds.push( nc );
            }.bind(this));       
            var j=3;      
        }
        else{
            caplist.forEach( function(item, index){
                var ncyo = this.newClass( con1 ,  caplist[index] , obj , 'some_id5',index)
                this.panels.push( ncyo )
                var k = 9; 
            }.bind(this)); 
        } 
    }
    initialize() {
        // Example initialization logic

        this.node.innerHTML = "<div>Cell Initialized</div>";
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Example event listener setup
        this.node.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        console.log('Cell clicked!', event);
    }
}
