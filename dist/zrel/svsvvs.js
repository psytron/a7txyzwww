 

class Kvs {

    constructor( initObj ) {
        
        this.container = initObj.container ? initObj.container : window.document.body; // default 
        this.data = initObj.data ? initObj.data : {'key1':'val1'}
        this.model = this.data.model;
        this.tmplt = this.container.querySelector('.item').cloneNode(true);
        this.container.innerHTML='';
        for( var i in this.data ){    
            this.addKvItem( i , this.data[i])
        }

    }

    onDataUpdate( data_in ){
        
    }

    addKvItem( k ,v ){
        var toins = this.tmplt.cloneNode(true);
    
        toins.querySelector('#xfer_removeitem').setAttribute("kvid", k);
        toins.querySelector('#xfer_removeitem').addEventListener('click', (e)=>{
            this.id = k;
            e.target.yoyo=k;
            console.log(' Remove keyval ',k , this.id ,e.target.getAttribute("kvid") )
            e.target.parentElement.remove()
            //this.removeItem()
            this.model.updateLink( fromId , toId , { tag:e.target.value } )
        })  
        toins.querySelector('#xfer_key').value=k;
        toins.querySelector('#xfer_key').addEventListener('input', (e)=>{
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            console.log('typing key ',this.model )
            //this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        })           
        toins.querySelector('#xfer_val').value=v;
        toins.querySelector('#xfer_val').addEventListener('input', (e)=>{
            //console.log('what input',e.target.value,data_in.uuid, this.model )
            console.log('typing val ',this.model)
            //this.model.updateObject( obj.data.uuid , { name:e.target.value } )
        })                      
        this.container.appendChild( toins )
    }
    
    removeKvItem( k ){}    

}

export { Kvs }




// How do we determine what is a graph and what is an edge // 
// Vission ( Visual Mission Control ) https://vission.ai


