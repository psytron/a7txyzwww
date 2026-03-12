//import { factory2d } from '../../../factory/factory2d.js'
// var factory2d = window.factory2d;
class Kvs {

    constructor( initObj ) {
        
        this.container = initObj.container ? initObj.container : window.document.body; // default 
        this.data = initObj.data ? initObj.data : {'key1':'val1'}
        this.model = this.data.model;

        var vnode = window.factory2d.renderNodeSync( 'kvs', {} )
        this.holder = vnode.querySelector('#kvs_keyval')
        this.tmplt = vnode.querySelector('.item').cloneNode(true);
        
        this.holder.innerHTML='';
        for( var i in this.data ){    
            let field_pair = this.data[i];
            if( i=='se' || i=='pw'){
                this.data[i]='*****************'
            }
            this.addKvItem( i , this.data[i])
        }

        vnode.querySelector('#kvs_plus').addEventListener('click', (e)=>{
            console.log(' add keyval ')
            this.addKvItem('','')
            //model.updateLink( fromId , toId , { tag:e.target.value } )
        })  



        if(initObj.color){
            var colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.id = 'nodecolor';
            vnode.appendChild(colorInput);
            vnode.querySelector('#nodecolor').addEventListener('input', (e) => {
                console.log('Selected color:', e.target.value);
    
                var col = parseInt(e.target.value.replace('#', '0x'), 16);
                
                if( 'color' in this.data ){    
                    this.updateItemValue('color',col )
                }else{
                    this.addKvItem('color',col)
                    this.data['color']=col;   
                }
            });
            
            
        }

        this.container.appendChild( vnode )

    }
    addEventListener( event_type , event_object ){
        this.container.addEventListener( event_type , event_object )
    }
    onDataUpdate( data_in ){
        var j=55;
    }



    addKvItem( k ,v ){
        var toins = this.tmplt.cloneNode(true);
        toins.querySelector('#xfer_key').value=k;
        
        // FOR INCOMING UPDATE FINDING  Field ID: 
        toins.setAttribute('fid', k);

        toins.querySelector('#xfer_key').addEventListener('input', (e)=>{
            var ky = e.target.value;
            var vl = e.target.parentElement.querySelector('#xfer_val').value

            //e.target.setAttribute('fid', e.target.value);

            // DO NOT UPDATE ON KEY CHANGE 
            //var obj = {}
            //obj[ ky ] = vl;
            //this.model.updateObject( this.data.uuid , obj  )
        })      
        toins.querySelector('#xfer_val').value=v;
        toins.querySelector('#xfer_val').addEventListener('input', (e)=>{
            
            var obj = {}            
            var ky = e.target.parentElement.querySelector('#xfer_key').value
            obj[ky]=e.target.value
            // ADD UUID TO EVENT IF PRESENT
            // BUT PUT THIS ON HOLD SO IT DOES NOT OVERWRITE ITSELF 
            //if( 'uuid' in this.data ){
            //    obj['uuid'] = this.data.uuid; 
            //}
            this.container.dispatchEvent( new CustomEvent('kvInputEvent' , { detail:obj } ) )
        })                               
    
        toins.querySelector('#xfer_removeitem').setAttribute("kvid", k);
        toins.querySelector('#xfer_removeitem').addEventListener('click', (e)=>{
            this.id = k;
            e.target.yoyo=k;
            console.log(' Remove keyval ',k , this.id ,e.target.getAttribute("kvid") )
            e.target.parentElement.remove()
            //this.removeItem()
            
        })  
    
       
        this.holder.appendChild( toins )
    }
    updateItemValue( k ,v ){
        var value = k
        //var colorInput = this.container.querySelector('input[value="color"]');
        var allInputs = this.container.querySelectorAll('input');
        var results = [];
        for(var x=0;x<allInputs.length;x++){
            if(allInputs[x].value == value){
                results.push(allInputs[x]);
                var ni = allInputs[x+1];
                break;
            }
        }
        ni.value = v;
    }
    acceptUpdate(k, v){
        

    }

    removeKvItem( k ){}    

}

export { Kvs }




// How do we determine what is a graph and what is an edge // 
// Vission ( Visual Mission Control ) https://vission.ai


