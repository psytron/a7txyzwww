import formatters from './formatters.js'


var brands_execs ={

    coinbase:'cex',
    github:'repo',
    neo:'repo',
    ethereum:'dex',
    you:'tag'
}


var route_map = {
    free:{
        display( o )
        {
            return {
                0:o[0] || 'FREE DEFAULT no 0',
                1:o[1] || 'FREE DEFAULT     '+new Date().toLocaleString(),
                2:o[2] || 'FREE DEFAULT no 0'
            }
        },
        brand( o ){
            return o.brand;  
        },
        mesh( o ){ 
            return o.mesh || 'girlbase.glb'
        },        
        props( o ){
            return { 
                brand:'coinbase' 
            }
        },
        caps( o ){
            return ['qr','shim']
        },        
        tokenScan( o )
        {
             // get init Object and    
        },
        fetchBalance( o ){
            console.log(' cex fetchBalance ')
            try{
                let bstr = '';
                for( var i in o.total ){
                    // console.log( f , obj.free[f] )
                    if( o.total[i] >0){
                        bstr +='['+ i +']:'+o.total[i] +' '
                        //console.log(' avail : ',i , obj.total[i] )
                        //holdr.insertAdjacentHTML( 'beforeend','<div class"balobj" style="color:white">'+i+':'+obj.total[i]+'</div>');
                    }
                }                   
                return [false,false,bstr]
            }catch(err){
                return [false,false,'3000: Update Balance']    
            }
         
            
        },
        interests( o ){

            return ['pricedBalances']
        }
        
    },  
    material:{

    },
    key:{
        launches( o ){

            var label_out;
            if( o.dom && o.dom in brands_execs ){
                
                label_out = brands_execs[ o.dom ];
            }else{
                label_out = 'tag';
            }
            return label_out;
        }  
    },
    ray:{
        display( o )
        {
            return [
                o.name,
                'LIVE: '+new Date().toLocaleString(),
                '0.0.0.0'
            ]
        },        
        caps( o ){
            return ['qr','timeseries']
        },      
        props( o ){
            return { 
                brand:'ray' , 
                name:'Ray Cluster'
            }
        },
        mesh( o ){ 
            return 'simcube.glb' 
        },
        brand( o ){
            return o.brand;  
        }        
    },
    docker:{
        display( o )
        {
            return [
                o.name,
                'LIVE: '+new Date().toLocaleString(),
                '0.0.0.0'
            ]
        },
        caps( o ){
            return ['qr','timeseries']
        },      
        props( o ){
            return { 
                brand:'docker' , 
                name:'Docker Cluster'
            }
        },
        mesh( o ){ 
            return 'simcube.glb' 
        },
        brand( o ){
            return o.brand;  
        }        
    },    
    cex:{
        display( o )
        {
            return {
                0:o.brand,
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }
        },
        brand( o ){
            return o.brand;  
        },
        mesh( o ){ 
            return 'simcube.glb' 
        },        
        props( o ){
            return { 
                brand:'coinbase' 
            }
        },
        caps( o ){
            return ['qr','shim']
        },        
        tokenScan( o )
        {
             // get init Object and    
        },
        fetchBalance( o ){
            console.log(' cex fetchBalance ')
            try{
                let bstr = '';
                for( var i in o.total ){
                    // console.log( f , obj.free[f] )
                    if( o.total[i] >0){
                        bstr +='['+ i +']:'+o.total[i] +' '
                        //console.log(' avail : ',i , obj.total[i] )
                        //holdr.insertAdjacentHTML( 'beforeend','<div class"balobj" style="color:white">'+i+':'+obj.total[i]+'</div>');
                    }
                }                   
                return [false,false,bstr]
            }catch(err){
                return [false,false,'3000: Update Balance']    
            }
         
            
        },
        interests( o ){

            return ['pricedBalances']
        }
        
    },
    dex:{
        display( o )
        {
            return {
                0:o.brand,
                1:'ETH/AVX/BTC',
                2:false
            }
        },
        brand( o ){
            return o.brand;  
        },
        mesh( o ){ 
            return 'simcube.glb' 
        },        
        props( o ){
            return { brand:'curve' }
        },
        caps( o ){
            return ['qr','cex']
        },        
        tokenScan( o )
        {
             // get init Object and    
        },
        fetchBalance( o ){
            console.log(' cex fetchBalance ')
            try{
                let bstr = '';
                for( var i in o.total ){
                    // console.log( f , obj.free[f] )
                    if( o.total[i] >0){
                        bstr +='['+ i +']:'+o.total[i] +' '
                        //console.log(' avail : ',i , obj.total[i] )
                        //holdr.insertAdjacentHTML( 'beforeend','<div class"balobj" style="color:white">'+i+':'+obj.total[i]+'</div>');
                    }
                }                   
                return [false,false,bstr]
            }catch(err){
                return [false,false,'3000: Update Balance']    
            }
         
            
        },
        interests( o ){

            return ['fetchBalance']
        }
        
    },    
    flash:{
            display(){

                return ['x','yo','x']
            }
            
        },
    admin:{
        display( o ){ 
            return[  o.name +' ('+o.brand+')'  , o.title ]  
        }, 
        mesh( o ){ 
            return 'pillarcube.glb' 
        },   
        brand( o ){
            return o.brand;  
        },
        menu( o ){
            return [ 'expand' , 'x' ]
        },
        caps( o ){
            return ['qr','buysell','timeseries']
        },
        props( o ){
            return { brand:'crown' , symbol:'BTC/USD' }
        },
        interests( o ){
            return ['fetchTicker','timeSeries']
        }
    },    
    automate:{
        display( obj ){ 
            return[  obj.name ,obj.brand]  
        }, 
        mesh( o ){ 
            return 'simbot.glb' 
        },   
        brand( o ){
            return o.brand;  
        },
        menu( o ){
            return [ 'expand' , 'x' ]
        },
        caps( o ){
            return ['qr','buysell','timeseries']
        },
        props( o ){
            return { brand:'plungebot' , name:'automate' }
        }
    },      
    flatworld:{
        props:{ type:'meta' , name:'flatworld' }          
    },
    globe:{
        props:{ type:'meta' , name:'globe'}  
    },
    ctoken:{
        display( o ){ 

            var amt=(Math.random()*1).toFixed(4);
            
            if( o.amount ){
                
                amt=o.amount;
            }
            
            return {
                0:''+amt+' '+ o.symbol +' ('+o.brand+')' ,
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }            
    
        }, 
        fetchTicker( obj ){ 
            return[ "$"+obj.close , false  , ''+new Date().toLocaleTimeString() ] 
        },
        brand( o ){
            let sub ;
            if( 'symbol' in o){
                let symb = o.symbol; 
                sub = symb.split("/")[0];
                sub = sub.toLowerCase();
            }else if( 'code' in o ){
                sub = o.code.toLowerCase()
            }
                else{
                sub = 'undefined'
            }
            return sub
        },
        menu( o ){
            return [ 'expand' , 'x' ]
        },
        mesh( o ){ 
            return 'simtoken.glb' 
        },
        caps( o ){
            return ['qr','buysell','timeseries']
        },
        props( o ){
            return { brand:'exor' , symbol:'BTC/USD' }
        },
        interests( o ){
            return ['fetchTicker','timeSeries']
        }
    },    
    dtoken:{
        display( obj ){ 
            return[ '...' ,  obj.symbol +' ('+obj.brand+')'  , 'LOADING']  
        }, 
        fetchTicker( obj ){ 
            return[ "$"+obj.close , false  , ''+new Date().toLocaleTimeString() ] 
        },
        pricedBalance( obj ){ 
            return[ "$"+obj.close , false  , ''+new Date().toLocaleTimeString() ] 
        },        
        brand( o ){
            let sub ;
            if( 'symbol' in o){
                let symb = o.symbol; 
                sub = symb.split("/")[0];
                sub = sub.toLowerCase();
            }else if( 'code' in o ){
                sub = o.code.toLowerCase()
            }
                else{
                sub = 'undefined'
            }
            return sub
        },
        menu( o ){
            return [ 'expand' , 'x' ]
        },
        mesh( o ){ 
            return 'simtoken.glb' 
        },
        caps( o ){
            return ['qr','timeseries']
        },
        props( o ){
            return { brand:'exor' , symbol:'BTC/USD' }
        },
        interests( o ){
            return ['pricedBalance']
        },
        balance( o ){
            return [ '$'+o.payload.avax.current_price  , false , ''+o.payload.avax.balance ] 
        }
    },          
    token:{
        display( obj ){ 
            return[ '...' ,  obj.symbol +' ('+obj.brand+')'  , 'LOADING']  
        }, 
        fetchTicker( obj ){ 
            return[ "$"+obj.close , false  , ''+new Date().toLocaleTimeString() ] 
        },
        brand( o ){
            let sub ;
            if( 'symbol' in o){
                let symb = o.symbol; 
                sub = symb.split("/")[0];
                sub = sub.toLowerCase();
            }else if( 'code' in o ){
                sub = o.code.toLowerCase()
            }
                else{
                sub = 'undefined'
            }
            return sub
        },
        menu( o ){
            return [ 'expand' , 'x' ]
        },
        mesh( o ){ 
            return 'simtoken.glb' 
        },
        caps( o ){
            return ['qr','qr','qr']
        },
        props( o ){
            
            return { brand:'exor' , symbol:'BTC/USD' }
        }
    },      
    module:{
        init( obj ){ 
            return[ obj.name , ''+new Date() ]  
        }, 
        display( obj ){ 
            var outlist=[]
            if( obj.properties ){

                outlist=[ obj.properties.name , obj.properties.brand ];
            }else{
                outlist=[ 'UNLISTED MOD', 'UNLISTED BRAND' ]
            }
            return outlist;
        }, 
        fetchTicker( obj ){ return [ "$ "+obj.close , obj.vol ] }, 
        fetchBalance( obj ){ return [ obj.close , obj.vol ] },
        zeroMeth( obj ){ return [ false, obj.time ] } ,  // returns only second field 
        caps( o ){ return ['qr','qr','qr'] }
    },
    alias:{
            display( obj ){ return[ obj.name ,'Generated Alias' ]  }, 
             mesh( obj ){ return 'simsuit.glb' },
        fetchTicker:( obj )=>{ return[ "ALIAS T: "+obj.close , "Alias sub: "+obj.vol ] }, 
        default:( o )=>{ 
            console.log( 'wow: ',o )
            return [ false , false]  
        }
    },
    exchange:{
        display( o )
        {
            return {
                0:o.brand,
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }
        },
        tokenScan( o )
        {
             // get init Object and    
        }
        
    },
    org:{
        display:( o )=>{ 
            return { 
                '0':'ORG COMING SOON',
                1:o.name ,
                '2':'X-FiLTR 0.5 Z-FILTR 1.432',
                brand: o.name , 
                mesh:o.label.toLowerCase(),
                baseplane: false ,
                detail:['qr','functions']
            } 
        }       
    },
    tower:{
        display( o ){

            return [ o.brand , o.domain , 'UPDT']
        }  
    },
    unknown:{
        display( o ){ 
            return [ 
                    'UNKNOWN 1',
                    'UNKNOWN 2',
                    'DISPLAY: '+new Date().toLocaleString()
            ]
        }
    },        
    repo:{
        display( o ){ 
            return [ 
                    o.name,
                    o.label ,
                    'UPDATED: '+new Date().toLocaleString()
                ]
        },
        gitStatus( o ){
            console.log(' status running on git driver ')
        },
        caps( o ){
            return ['qr','terminal']
        }            
    },    
    finorg:{
        display:( o )=>{ return[ 'Financial Organization','3,500,000' ] },
        brand( o ){  return ( ('brand' in o) ? o.brand : 'undefined') }
    },    
    tag:{
         display:( o )=>{ 
            var newVar = o.uuid.substring(0, 5);
            return[ o.name, newVar ] 
        }   ,
        caps( o ){
            return ['qr','detail']
        }
    },   
    coord:{
         display:( o )=>{ return[ o.name,'[x,y,z]' ] }   ,
        caps( o ){
            return ['qr','detail']
        }
    },       
    address:( obj )=>{ return{ line1:obj.balance , line2:obj.balance } },
    simbot:{
        name:function( obj ){ 
            return 'Min Eff: '+obj.name 
        },
        brand( o ){
            return o.brand;  
        }
    },
    locale:{

        caps(o){
            return ['list','list','list']
        }       

    },
    simserver:['name','subname'],
    parimutuel:['name','subname'],
    stock:{
        display( o )
        {
            return {
                0:o.brand.toUpperCase(),
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }
        },    
        props: ( o )=>{
            return { brand:'stock' , name:'Corpname' }
        },
        domain:function(obj){ 
            return obj.domain.toUpperCase()  
        },
        mesh:function( o ){ 
            return 'simstock.glb' 
        },
        label:'label',
        brand:function(o){
            return o.brand ;
        }
    },
    fiat:{
        display( o )
        {
            var amt=(Math.random()*1120).toFixed(2);
            
            if( o.amount ){
                
                amt=o.amount;
            }
            
            return {
                0:'$ '+amt+' '+o.brand.toUpperCase(),
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }
        },    
        props: ( o )=>{
            return { brand:'usd' , symbol:'UKNX/USD' }
        },
        domain:function(obj){ 
            return obj.domain.toUpperCase()  
        },
        mesh:function( o ){ 
            return 'simfiat.glb' 
        },
        label:'label',
        brand:function(o){
            return o.brand;
        }
    },
    study:{
        display( o )
        {
            var amt=(Math.random()*1120).toFixed(2);
            
            if( o.amount ){
                
                amt=o.amount;
            }
            
            return {
                0:'$ '+amt+' '+o.brand.toUpperCase(),
                1:'LIVE: '+new Date().toLocaleString(),
                2:false
            }
        },    
        props: ( o )=>{
            return { brand:'usd' , symbol:'UKNX/USD' }
        },
        domain:function(obj){ 
            return obj.domain.toUpperCase()  
        },
        mesh:function( o ){ 
            return 'simstock.glb' 
        },
        label:'label',
        brand:function(o){
            return o.brand;
        }
    },    
    xclass:['name','price'],
    service:['name','subname'],
    project:['name','label'],
    flatsquare:{
        display( o ){
            var d = new Date()
            return [ o.name.toUpperCase() , 'LIVE: '+d.toLocaleTimeString() , '0018.07.00']
        },
        brand( o ){
            return o.brand
        }
    },
    simcube:{
        display( o ){
            var d = new Date()
            return [ o.brand.charAt(0).toUpperCase() + o.brand.slice(1) , 'LIVE: '+d.toLocaleTimeString() ]
        },
        brand( o ){
            return o.brand
        }
    },
    wrapped_sphere:{ }, // a brand wrapped vector sphere , smooth color grad color / sphere with ring like planet ooh 
    asset:['name',function(obj){ return ''+Math.round( Math.random()*3.23)+'.00 - M'} ],
    connects:{
        caps(o){
            return ['qr','xfer','qr']
        },
        display(o){ 
            return [ ' '+Math.round(Math.random()*3.23)+'.00 - M' , 'iii' , 'iii']
        } 
    },
    owns:[],
    movie:{
        display( o ){
            var short =  o.properties.title.substring(0, 3);
            return [ short , 'none','none']
        }
    },
    default:{
        caps(o){
            return ['qr','xfer','qr']
        },        
        display( o ){
            var d = new Date()
            return [ 'DEFTI', 'LIVE: ']
        },
        brand( o ){
            return 'DEFBR'
        }
    }
}

// convenience wraapper with exception fall backs for missing methods 
// how will this now gappen with llms 

export default {
    fieldListFromData( obj ){

        // LABEL ( XCLASS )
        var label;
        //var obj =  this.node.payload;
        if( 'labels' in obj ){
            label = obj.labels[0].toLowerCase();
        }else{
            label = (obj.label || 'nolower_case').toLowerCase();
        }

        // FIELD LIST 
        var landing_fields = this.xclass_method_object( label , 'display' , obj );        
        
        
        landing_fields[0] = obj.field1 ? obj[ obj.field1 ] : landing_fields[0];
        landing_fields[1] = obj.field2 ? obj[ obj.field2 ] : landing_fields[1];
        landing_fields[2] = obj.field3 ? obj[ obj.field3 ] : landing_fields[2];

        return landing_fields;        
    },
    // RELATED SITE
    xclass_rel( xclass , obj ){
        // try xclass & rel , if not return default page  ( prices  )
        var res = {}
        try{
            
            res = route_map [ xclass ].rel( obj )

        }catch( err ){
            console.log( err );
            res = 'default.html'
        }        
        return res;
    },
    // INTERESTS 
    xclass_interests( xclass ){
        var interests;
        try{
            interests = route_map[ xclass ];
            if( route_map[ xclass ].interests ){
                interests = route_map[ xclass ].interests({})
            }else{
                interests = [] //  Object.keys( interests );  // too many 
            }
        }catch( err){
            //console.log( err );
            interests = []
        }
        return interests;
    },
    // MAP INPUTS 
    xclass_method_object( xclass , method , obj ){

        var insertion_list;
        try{
            if( xclass in route_map && method in route_map[xclass] ){
                insertion_list = route_map[ xclass ][ method ]( obj );
            }else{
                insertion_list = [ false , false ];    
            }
        }catch( err ){
            console.log( err )
            insertion_list = [ false, false ];
        }
        return insertion_list;
    },
    // BRAND WRAP 
    xclass_brand( xclass , method = 'brand' , obj ){
        var fullpath; 

        // route_map.contains_xclass( xclass )
        if ( xclass in route_map && 'brand' in route_map[xclass]  ){
            let shortbrand = route_map[ xclass ]['brand']( obj )
            fullpath= 'media/domain/'+shortbrand+'.png'            
        }else{
            fullpath = false;
        }
        return fullpath; 
    },
    // BRAND WRAP 
    xclass_caps( xclass , method = 'caps' , obj ){
        
        // get xclass label from route_map 
        var caplist;
        try{
            caplist = route_map[ xclass ]['caps']( obj );
        }catch( e ){
            console.log( e )
            caplist = ['qr','timeseries'];
        }
        caplist = (obj && 'fromId' in obj) ? ['qr','xfer','qr'] : caplist;         
        return caplist; 
    },    
    // GET CUSTOM PROPS RETURN UNKOWN 
    xclass_props( xclass , method ='props' , obj={} ){
        
        var proplist;
        try{
            proplist = route_map[ xclass.toLowerCase() ]['props']( obj );
        }catch( e ){
            proplist = { brand:'unknown', name:'unknown'};
        }
        
        return proplist;         
    },
    // MESH WRAP ( MOVING TO route map )
    xclass_mesh( xclass , method , obj ){
        var meshmap_prev_ref_only = {
            'xindex':'bluecube.glb',
            'domain':'bluecube.glb',
            'project':'bluecube.glb',
            'app':'greencube.glb',
            'world':'globe.glb',
            'credential':'key.glb',
            'barrel':'atm.glb',
            'atm':'atm.glb',
            'token':'simtoken.glb',
            'simfiat':'simfiat.glb',            
            'service':'simcube.glb',
            'actor':'subuser.gltf',
            'user':'subuser.gltf',
            'alias':'simsuit.glb',
            'zerox':'simsuit.gltf'
        }
        var icon_url;
        try{
            icon_url = route_map[ xclass.toLowerCase() ]['mesh']( obj )
        }catch( err ){
            icon_url = xclass+'.glb';
        }
        //let icon_url = ( xclass in meshmap ) ? meshmap[ xclass ] : xclass+'.glb';
        let fullpath = 'models3d/'+icon_url; // temp remove seed: +'?'+Math.round( Math.random()*9999 )    
        return fullpath;
    },

    // USED TO POPULATE OBJECT FOR LOADS AND MERGES INTO MAP 
    xclass_launches( xclass , method='launches' , obj ){
        try{
            res = route_map[ xclass ][ method ]( obj );
        }catch( err ){
            res = 'unknown';
        }
        return res;          
    },

    // USED FOR TITLE OF LISTS IN GLOBAL OBJECT STORE 
    xclass_list_display( xclass , method , obj ){

        
    },
    
    // CAN THIS BE USED TO STRUCTURE DIFFERNT MAP SAVES 
    format_map:{
        current_price: formatters.dollar ,
                 name: formatters.pass , 
                  drd: formatters.percent,
                  total_supply: formatters.units,
                  price_change_percentage_24h: formatters.percent
    },

    // this method 
    // HERE IN THE FIELD MAP You can just embed a function for specific fields
    // if  domain in need_capitalization='alias','repo'
    // this should use map as route map of which data to put where 
    pull( obj , label , fieldnum ){
        var out_val;
        var field_obj;
        if( label in this.field_map ){

            field_obj = this.field_map[ label ][ fieldnum ]

        }else{
            //out_val = 'LABEL NOT MAPPED'
            field_obj = this.field_map[ 'default' ][ fieldnum ]
        }
        
        
        try{
            out_val = field_obj( obj )
        }catch(err){
            try{
                out_val = ( field_obj in obj ) ? obj[ field_obj ] : field_obj;
                var l=3  
            }catch( err ){
                out_val = field_obj 
            }
        }
        
        return out_val;
        // remembering that this: eval( 'a+"/"+b') // also works

    }, 
    push( obj_in , target_node ){
        
        const keys = Object.keys( obj_in );

        // LATER SPEED THIS UP BY ONLY QUERYING THE EXISTING KEYS 
        keys.forEach((key, index) => {
            console.log( `${key}: ${ obj_in[key] }` );

            var fields = target_node.querySelectorAll('#'+key);
            if( fields.length > 0 ){
                
                for( var i = 0; i < fields.length; ++i) {
                    var field = fields[i]; // .style.color = "green";
                    if( field.nodeName.toLowerCase() === 'img'){
                        field.src="/media/domain/"+obj_in[key]+".png";
                        //field.src=obj_in[key];
                    }else{

                        if( this.format_map.hasOwnProperty(key)  ){
                            field.innerHTML = this.format_map[ key ]( obj_in[ key ] );
                        }else{
                            field.innerHTML = obj_in[key];            
                        }
                        
                    }                    
                }
            }
        });        


    },
    pushx( obj_in , target_node ){
        
        const keys = Object.keys( obj_in );

        // LATER SPEED THIS UP BY ONLY QUERYING THE EXISTING KEYS 
        keys.forEach((key, index) => {
            console.log( `${key}: ${ obj_in[key] }` );

            var fields = target_node.querySelectorAll('#'+key);
            if( fields.length > 0 ){
                
                for( var i = 0; i < fields.length; ++i) {
                    var field = fields[i]; // .style.color = "green";
                    var nodeName = field.nodeName.toLowerCase();
                    if( nodeName === 'img'){
                        //field.src="/media/domain/"+obj_in[key]+".png";
                        field.src=obj_in[key];
                    }
                    if( nodeName === 'a'){
                        //field.src="/media/domain/"+obj_in[key]+".png";
                        field.href=obj_in[key];
                    }
                    else{

                        if( this.format_map.hasOwnProperty(key)  ){
                            field.innerHTML = this.format_map[ key ]( obj_in[ key ] );
                        }else{
                            field.innerHTML = obj_in[key];            
                        }
                        
                    }                          
                    
                    // if(  typeof(obj_in[key])=='object' ){ // if data is a [] list 
                    //     // iterate
                    //     var dd=0
                    //     // fancy attach 
                    // }
              
                }
            }
        });        


    },    
    ingest_type_map:function( map_in ){
        // THIS will Adapt the Glue Mapper using Functions Mappings in the data itself 
        // HERE how do we add a different ROUTE For Detail Panel and Avatar X ?? 
        console.log(' Future Route add functions from data ')
    },    
    yo(){
        console.log('yo ')
    }

}






// var field_map = {
//     simbot:['name', function( obj ){ return 'Min Eff: '+obj.name } ],
//     simserver:['name','subname'],
//     parimutuel:['name','subname'],
//     simfiat:[
//         function(obj){ return obj.domain.toUpperCase()  },
//         'label'],
//     xclass:['name','price'],
//     repo:['name','label'],
//     service:['name','subname'],
//     token:[
//         function(obj){ return obj.domain.toUpperCase()  } , 
//         function(obj){ 
//             return ''+(Math.random()*0.23).toFixed(4)+'  M'
//         }.bind(this)],
//     project:['name','label'],
//     simcube:[
//         function(obj){ return obj.domain.charAt(0).toUpperCase() + obj.domain.slice(1)  },
//         function(obj){ 
//             var d = new Date()
//             return 'LIVE: '+d.toLocaleTimeString();
//         }],
//     mod:['name','label'],
//     tag:['name','label'],
//     alias:['name','subname'],
//     asset:['name',function(obj){ return ''+Math.round( Math.random()*3.23)+'.00 - M'} ],
//     connects:[
//         'wow',
//         function(obj){ return ''+Math.round( Math.random()*3.23)+'.00 - M'} ],
//     owns:[],
//     default:['name','label'],
// }


        // var xclass_brand_map = {
        //     token:(o)=>{ 
        //         let sub ;
        //         if( 'symbol' in o){
        //             let symb = o.symbol; 
        //             sub = symb.split("/")[0];                    
        //         }else{
        //             sub = 'USX/XYZ'
        //         }

        //         return {
        //             brand:sub
        //         }
        //     },
        //     simcube(o){ 
        //         return {
        //             brand:o.brand
        //         }
        //     }            
        // }  

        // HERE CAN DO DEFAULT ROUTE NOW OR REPLACE MISSING 
        // OR we can switch routes based on same route accross multiple sub domains 
        // FOR NOW RETURN FALSE ON BOTH FIELDS IF NO FUNCTION ?? 


// var cap_map = {
//     'repo':['qr','hexframe'],
//     'tower':['qr','terminal'],
//     'project':['qr','terminal'],            
//     'alias':['qr','timeseries'],
//     'module':['qr','qr','funbay'], 
//     'token':['qr','qr','qr'], 
//     'service':['qr','terminal'],
//     'exchange':['qr','funbay'],
//     'exchange1':['stored_key','time_series'],
//     'wordpress1':['auth','anglezone','greenlogo'],
//     'app1':['tags','app_domain','auth'],
//     'connects':['qr','xfer','qr'],
//     'owns':['qr','xfer','qr'],
//     'transfers':['qr','xfer','qr'],
//     'link':['qr','xfer','qr'],
//     'list':['list','list','list']
// }

// yo 