
//import ObjectSystem from './objectsystem.js';
//import { openDB, deleteDB, wrap, unwrap } from './../../web_modules/idb.js';
//import { set,get , update,del, clear,keys,values,entries ,createStore } from './../../web_modules/idb-keyval.js';
import * as idbkv from './../web_modules/idb-keyval.js';
import * as ids from './../util/ids.js';
import * as convert from '../util/convert.js'


class KeyCache {

    constructor( initObj={} ){

        this.store = idbkv.createStore('kcdbnm','kcdbst')
        this.items = []; //{} was 
        this.intermediateKey;
        this.imk;
        this.publicKey;
        this.privateKey;
        this.wrappedKey;
        this.dom;
        this.domhash;
        this.iv;
        this.ek;

        // if anchor it would persist between ressions via 
        // encrypted wasm nugget for seed 
        this.anchor = ( 'anchor' in initObj ) ? initObj.anchor : false; 
    }

    async deleteBlob(){ // REMOVE VAULT 
        idbkv.del( this.dom  , this.store );  //console.log(' current blob', this.dom );
    }
    
    async discoverVaults(){ // SHOW VAULTS 
        var availvaults=[];
        var lst = await idbkv.values( this.store );
        return lst;
    }
    
    exit(){ // CLOSE VAULT 
         this.im_key =false;
         this.items=[];
    }
    

    async encryptItems(){
        
        var itemsarr = []
        for(var i in this.items) itemsarr.push( this.items[i] );
        
        let s = JSON.stringify( itemsarr );
        let bDat =  new TextEncoder().encode( s );
 
        var cBlob = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                // Don't re-use initialization vectors!
                // Always generate a new iv every time your encrypt!
                // Recommended to use 12 bytes length
                iv: this.initilizationVector,
                // Additional authentication data (optional)
                // additionalData: ArrayBuffer,
                // Tag length (optional)
                tagLength: 128 //can be 32, 64, 96, 104, 112, 120 or 128 (default)
            },
            this.im_key,  //from generateKey or importKey above
            bDat   //ArrayBuffer of data to encrypt
        )          

        var unen = await this.decryptItems( cBlob );
        // conert arrau to string bavk to arrau and dectrypt 
        

        // how to turn thid cBlob back to text 
        // TEST DECRYPT FROM STRING 
        // var blob = new Blob([cBlob], {type: 'text/plain; charset=utf-8'});    
        // var textst = await blob.text()   //.then(text => console.log(text));   

        // var v3 = convert.arrayBufferToBase64( cBlob );

        // var v5 = convert.base64ToArrayBuffer( v3 );
        
        // // arrayBufferToBase64( buffer ) {
        // // base64ToArrayBuffer(base64) {
        
        // // convert text to blob
        // var myblob = new Blob([textst], {type: 'text/plain;  charset=utf-8'});
        // var see= await myblob.arrayBuffer();
        
        // // the text sh0uld convert to arraybuffer 23728
        // var arbufdat = convert.str2ab( textst );
        // var ffff =  new TextEncoder().encode( textst );
        // var dxtxt = new TextDecoder("utf-8").decode( ffff );        
        
        // var ff = await this.decryptItems( ffff );
        // var eo =0;
        // var dds =9;

        return cBlob;  
    }
    async decryptItems( cBlob ){
        
        var decryptedData = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv:this.initilizationVector,
                //additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
                tagLength: 128, //The tagLength you used to encrypt (if any)
            },
            this.im_key, //from generateKey or importKey above
            cBlob //ArrayBuffer of the data
        )
        
        var yofinalObj = decryptedData;
        var enc2 = new TextDecoder("utf-8");
        var finObj = enc2.decode( yofinalObj );
        var fimfim = JSON.parse( finObj );
        return fimfim;

    }
    async save(){ // WRITE VAULT 
        var cBlob = await this.encryptItems()
       
        var res = await idbkv.set( this.dom , { dom:this.dom , update_date: new Date() , dat:cBlob}  , this.store )
        var l = 1
    }

    // EXPORT FILE
    async exportFile(){ /// OK EXPORT SAVED ARCHIVE 
        var cBlob = await this.encryptItems()
        const a = document.createElement("a");

        // TEXTST STRING from AB // 
        //const blob = new Blob([cBlob], {type: 'text/plain; charset=utf-8'});    
        //var textst = await blob.text()//.then(text => console.log(text));        

        var textst = convert.arrayBufferToBase64( cBlob );
        
        
        var jsonData =  { dom:this.dom , update_date: new Date() , dat:textst } 
        a.href = URL.createObjectURL(new Blob([JSON.stringify( jsonData, null, 2)], {
            type: "application/json",
            type_og: "text/plain"
        }));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);        
    }

    // OK WARNING THIS IS 
    async exportClear(){ /// OK EXPORT SAVED ARCHIVE 
        //var cBlob = await this.encryptItems()
        const a = document.createElement("a");

        // TEXTST STRING from AB // 
        //const blob = new Blob([cBlob], {type: 'text/plain; charset=utf-8'});    
        //var textst = await blob.text()//.then(text => console.log(text));        
        var jsonData =  { dom:this.dom , update_date: new Date() , dat:this.items } 
        a.href = URL.createObjectURL(new Blob([JSON.stringify( jsonData, null, 2)], {
            type: "application/json",
            type_og: "text/plain"
        }));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);        
    }
    


    
    async available( dom ){
        var existObj = await idbkv.get( dom  , this.store );
        return ( existObj == undefined )
    }
    ensure_uuids( obj_in ){

        for( const i in obj_in ){
            var obj = obj_in[i];
            if( ! obj.uuid || obj.uuid ==''){
                obj['uuid']= ids.uuidv4()
            }
        }    
        return obj_in;
    }
 
    // IMPORT FILE 
    async importFileAndLogin( file , pw ){ /// OK IMPORT SAVED ARCHIEVE 
        // RECEIVE object , and PW? 
        // GRAB DAT , and Decompress 
        await this.set_imkey( dom , pw );
        
        console.log(' for importing saved files ')
    }


    async loginAndLoad( dom , pw , blob=false ){
        await this.set_imkey( dom , pw );

        var blobdata={};
        if( blob ){
            blobdata = { dat:blob };
        }else{
            blobdata = await idbkv.get( dom , this.store );   
        }

        // HERE BLOBDATA from BOTH SHOULD BE GOOD
        
        if ( blobdata )
        {
            try{
                var tempitems = await this.decryptItems( blobdata.dat )

                if( typeof( tempitems ) == 'Object'){
                    var l = 3;
                    console.log(' previous enc sch detect ')
                }
                
                this.items = await this.decryptItems( blobdata.dat )
                this.ensure_uuids( this.items );
                var wut = 9;
                //this.items['x']={ty: 'map', title: 'miccco/Vission', fragment: 'miccco/vission', searchable: 'map miccco/vission', color: '#341661'}
                //this.items['y']={ty: 'map', title: 'miccco/Vission', fragment: 'miccco/vission', searchable: 'map miccco/vission', color: '#341661'}
                var x=0;  
                return true;              
            }catch(err){

                return false;
            }

        }else{
            return false;
        }
    }
    async set_imkey( dom , pw ){
        // DERIVE INITILIZATION VECTORS 
        const encoder = new TextEncoder();
        let dat1 = encoder.encode( dom );
        let dat2 = encoder.encode( '0x'+dom ); // if send hex address 
        let dat3 = encoder.encode( pw );
        let hashBuf1 = await window.crypto.subtle.digest('SHA-256', dat1 ); 
        let hashBuf2 = await window.crypto.subtle.digest('SHA-256', dat2 ); 
        this.salt = new Uint8Array( hashBuf1.slice(0,16) );
        this.initilizationVector = new Uint8Array( hashBuf2.slice(0,12) );        

        // GENERATE KEY MATERIAL FROM INCOMINGPW
        var keyMaterial = await window.crypto.subtle.importKey(
            "raw",   
            encoder.encode(pw),
            "PBKDF2",
            false,
            ["deriveBits", "deriveKey"]
        );
        let im_key = await window.crypto.subtle.deriveKey(
            {
                name:      "PBKDF2",
                salt:       this.salt,
                iterations: 100000,
                hash:      "SHA-256"
            },
            keyMaterial,
            { 
                name: "AES-GCM", 
                length: 256 
            },
            true,
            ["encrypt", "decrypt"]
        );
        
        // RANDOMIZED ONE TIME 
        // this.salt_og = window.crypto.getRandomValues(new Uint8Array(16));
        // this.initilizationVector_og = window.crypto.getRandomValues(new Uint8Array(12));
        // SAVE INTERMEDIATE
        this.imk = im_key; 
        this.im_key = im_key; 
        this.domhash=dat1;
        this.dom=dom;
    }


    // ADD REMOVE
    appendCollection( obj_in ){
        for( var i in obj_in ){
            this.items[ obj_in[i]['domain'] ] = obj_in[i]
        }
        var xy = this.items;
    }

    keySelect( k,v ){
        var outarray=[]; 
        for( var xk in this.items ){
            var item = this.items[xk];
            if( item.hasOwnProperty( k ) ){
                 if( item[ k ] === v )
                     outarray.push( item )
            }
        }
        if( v =='object' ){
            return this.items;
        }else{
            return outarray;    
        }
    }
    // UPDATE ITEM BY KEY 
    keyUpdate( k, v, obj ){
        var outarray=[]; 
        for( var xk in this.items ){
            var item = this.items[xk];
            if( item.hasOwnProperty( k ) && item[k]==v ){
                //item[ k ] = v;
                for( var i in obj ){
                    
                    // TODO: exception for overwriting ***  from views 
                    if( i == 'se' && obj[i].includes('***') ){
                        // skip display layer obfuscated update 
                        var e=3;
                    }else{
                        item[ i ]=obj[i];                        
                    }

                }
            }
        }
    }    
    // DELETE ITEM BY KEY 
    keyDelete( k,v ){
        var bb = 9;
        var outarray=[]; 
        for( var xk in this.items ){
            var item = this.items[xk];
            if( item.hasOwnProperty( k ) ){
                 if( item[ k ] === v )
                     delete this.items[xk];
            }
        }
        var reindexed = []
        for( var s in this.items ){
            reindexed.push(this.items[s])
        }

        this.items=reindexed;
    }    
    itemsByScope( k,v ){
        var bb = 9;
        var outarray=[]; 
        for( var xk in this.items ){
            var item = this.items[xk];
            if( item.hasOwnProperty( k ) ){
                 if( item[ k ] === v )
                     outarray.push( item )
            }
        }
        if( v =='object' ){
            return this.items;
        }else{
            return outarray;    
        }
        
    }  
    // UPDATE ITEM BY KEY 
    // should hash remain vs. array because of single value requirement?
    // util of array was non sync of hash addrs and domain attr on object 
    keyMerge( k, v, obj ){
        var outarray=[]; 
        for( var xk in this.items ){
            var item = this.items[xk];
            if( item.hasOwnProperty( k ) && item[k]==v ){
                //item[ k ] = v;

                // propagate uuid 
                if( ! obj['uuid'] ){
                    obj.uuid = item.uuid;
                }
                
                this.items[xk]=obj;
                // here it needs to ensure uuid
                //this.items[xk]['dat']=obj.dat;                        
                return
            }
        }
        //new
        this.addItem( obj )
    }    
    replaceItem( obj ){
        //  overwrite uuid ? 
        // 
        
    }
    addItem( obj={} ){
        
        // ABORT IF ALREADY EXISTS OVERRIDDEN , maybe rename to previous version
        // if( ob.dom in this.items ){
        //     return false;
        // }else{  }
        
        // CURRENT SETUP WILL OVERWRITE
        // ADD UUID IF NONE INCOMING ( )
        if( ! ('uuid' in obj) ){
            // HERE WE CAN SETUP FUTURE UUIDV4 to take hint_object = ob
            obj['uuid'] = ids.uuidv4();
        }
        // NESTED DATA 
        obj['dat'] = obj.payload ? obj.payload : obj.dat; 
        delete obj.payload; 
        
        //this.items[ obj.dom ] = obj; 
        this.items.push( obj )
        
        // this.items[ ob.dom ]={dom:ob.dom , 
        //                        ke:ob.ke , 
        //                        se:ob.se , ty:ob.ty , dat:ob , 
        //                        uuid:cur_uuid };
        //}
        //var existingItem = (domain_in in this.items) ? this.items[ domain_in ] : {};        
        //this.items[domain_in] = { ...existingItem , ...obj_in }           
        return true;

    }
    deleteItem( domain_in ){
        delete this.items[ domain_in ];
    }
    count(){
        return Object.keys( this.items ).length;
    }    
    // MERGE CREDENTIALS 
    mergeArtifacts( obj_in ){
        var inVal = obj_in.brand ? obj_in.brand : obj_in.module ;
        return { ...obj_in  , ...this.keySelect(  'dom' , inVal )[0] }
    }  
    get( key_in ){
        return this.keySelect(  'dom' , key_in )[0];
    }      
    // function ab2str(buf) {
    //     return String.fromCharCode.apply(null, new Uint16Array(buf));
    // }
    // function str2ab(str) {
    //     var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    //     var bufView = new Uint16Array(buf);
    //     for (var i=0, strLen=str.length; i < strLen; i++) {
    //     bufView[i] = str.charCodeAt(i);
    //     }
    //     return buf;
    // }    
    

    async digestMessage(message) {
        var msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        var hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        var hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        var hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        return hashHex;
    }    
}
export default KeyCache














    // addXXXXOverwrites( obj_in ){
    //     this.items[ obj_in['domain'] ] = obj_in;
    // }   
    // RETURN ALL ITEMS MATCHING KEY VAL 



        //this.addItem( 'coinbs' , { ke:'ke' , se:'wew' , dom:'coinbs' } )
        //this.addItem( 'krainbs2' , { ke:'kf3f3f3e' , se:'wa2a2aew' , dom:'coinbs' } )
        //this.addItem( 'coinbs' , { ke:'ke' , se:'wew' , dom:'coinbs' } )
        //this.deleteItem( 'krainbs2' )
        //this.addItem( 'vog' , { ke:'kf3f3f3e' , se:'wa2a2aew' , dom:'coinbs' } )
        //this.runtest();
        //this.osz= new ObjectSystem({});

       // this.rundb()    

 //   async rundb(){

//        var lst = await idbkv.values();
        //var qw = await get('ewe').catch((err) => console.log('It failed!', err));      
        //var qrr= await get('qwe').catch((err) => console.log('It failed!', err));
         
        // logs: "worcld"
//         clear()

//         get('qwre')
//         .then((val) => console.log( 'gotn',val))
//         .catch( (err)=> console.log('llll',err));        

//         set('xalpha.local', { dom:'xalpha.local', update_date:new Date() , items:88088 } )
//           .then(() => console.log('It worked!'))
//           .catch((err) => console.log('It failed!', err));
         
//         set('DAO.demo.local', { dom:'DAO.demo.local', update_date:new Date() , items:88088 } )
//           .then(() => console.log('It worked!'))
//           .catch((err) => console.log('It failed!', err));
 

  //  }
    
    // //////////////// FROM MNEMONIC 
    // var mnemonic = "monkey wild winning team fluff whatnot";
    // var wallet = Wallet.fromMnemonic(mnemonic);
    
    // console.log("Address: " + wallet.address);

    // //////////////// Brain Wallet
    // var un = "village@monkeys.io";
    // var pw = "somesuperpass";
    // Wallet.fromBrainWallet( un, pw).then(function(wallet) {
    //         console.log("Address: " + wallet.address);
    // });
    

        // loc store 
        //         var availvaults=[];
        //         Object.keys(localStorage).forEach(function(key){
        //             availvaults.push( { dom:key , val:localStorage.getItem(key) }  )
        //         });
        //         return availvaults;



// function LocalStore(){
//     this.push=function( obj ){
//         console.log(' push localstore')
//     }
// }


//         if( dom in localStorage ){
//             var wObj =  localStorage.getItem( dom );
//             let enc = new TextEncoder();
//             var cBlob = enc.encode( wObj );

//             try {
//                 //await thisThrows();
//                 var decryptedData = await window.crypto.subtle.decrypt(
//                     {
//                         name: "AES-GCM",
//                         iv:this.initilizationVector,
//                         //additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
//                         tagLength: 128, //The tagLength you used to encrypt (if any)
//                     },
//                     this.im_key, //from generateKey or importKey above
//                     cBlob//ArrayBuffer of the data
//                 )

//                 var yofinalObj = decryptedData;
//                 console.log(new Uint8Array(yofinalObj));

//                 var enc2 = new TextDecoder("utf-8");
//                 var finObj = enc2.decode( yofinalObj );
//             } catch (e) {
//                 console.log(e);
//             } finally {
//                 console.log('We do cleanup here');
//             }    
//     async runtest(){
//         this.hashed_domain = 
//         this.salt = window.crypto.getRandomValues(new Uint8Array(16));
//         this.initilizationVector = window.crypto.getRandomValues(new Uint8Array(12));
        
//         let pw = "wowsers"; // window.prompt("Enter your password");
//         let enc = new TextEncoder();
//         var keyMaterial = await window.crypto.subtle.importKey(
//             "raw",   
//             enc.encode(pw),
//             "PBKDF2",
//             false,
//             ["deriveBits", "deriveKey"]
//         );

//         let im_key = await window.crypto.subtle.deriveKey(
//             {
//                 name:      "PBKDF2",
//                 salt:       this.salt,
//                 iterations: 100000,
//                 hash:      "SHA-256"
//             },
//             keyMaterial,
//             { 
//                 name: "AES-GCM", 
//                 length: 256 
//             },
//             true,
//             ["encrypt", "decrypt"]
//         );

//         const obj = {name: "xjsx", axis: 230, city: "New York"};
//         const objString = JSON.stringify(obj);
//         //var enc = new TextEncoder(); // always utf-8
//         var data = enc.encode( objString );
//         var gen_key = await window.crypto.subtle.generateKey(
//             {
//                 name: "AES-GCM",   // Galois/Counter Mode
//                 length: 256,       // Key Length can be  128, 192, 256
//             },
//             false,                 // key is extractable (i.e. can be used in exportKey)
//             ["encrypt", "decrypt"] // can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
//         )
//         var eblob = await window.crypto.subtle.encrypt(
//             {
//                 name: "AES-GCM",
//                 //Don't re-use initialization vectors!
//                 //Always generate a new iv every time your encrypt!
//                 //Recommended to use 12 bytes length
//                 iv: this.initilizationVector,
//                 //Additional authentication data (optional)
//                 //additionalData: ArrayBuffer,
//                 //Tag length (optional)
//                 tagLength: 128 //can be 32, 64, 96, 104, 112, 120 or 128 (default)
//             },
//             im_key,  //from generateKey or importKey above
//             data   //ArrayBuffer of data to encrypt
//         )        

//         var decryptedData = await window.crypto.subtle.decrypt(
//             {
//                 name: "AES-GCM",
//                 iv:this.initilizationVector,
//                 //additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
//                 tagLength: 128, //The tagLength you used to encrypt (if any)
//             },
//             im_key, //from generateKey or importKey above
//             eblob //ArrayBuffer of the data
//         )
        
//         var yofinalObj = decryptedData;
//         console.log(new Uint8Array(yofinalObj));

//         var enc2 = new TextDecoder("utf-8");
//         var finObj = enc2.decode( yofinalObj );

//         localStorage.setItem( 'enc_test' , enc2.decode( eblob) );

//         console.log( finObj );
//         console.log( JSON.parse( finObj) );
//     }
    
//     async readBlob( name_in ){
        
//         // item xds
//         var item =  localStorage.getItem( name_in );
//         if( item ){
//             var obj= JSON.parse( item )
//             return obj;
//         }else{
//             return {};
//         }
//     }
//     async writeBlob( name_in ){
   
//         // get memory resident and convert to byteArray 
//         var obj = this.items;
//         //var item = this.getLocal()
//         var blob = this.readBlob();
//         var newlocal = { ...item , ...obj }   
//         localStorage.setItem( name_in  , JSON.stringify(obj) );
//         return newlocal;
//     }



        // YOU ARE HERE :  DOES ALIAS WRAP CYTHON ? 
        // this.alias.authenticate() 
        // Alias checks current auth and loads inventory blob ? 
        // 
        // ALIAS_PROXY   , ALIAS_WRAPPER()
        // a = AliasProxy()
        // a.authenticate( obj ) 
        // now token is in Cython  AliasProxy falls back on localstore
        // 
        // a.search( string )

        // v = a.vehicle( 'domain' ,'symbol')
        // map_object.vehicles = v ;
        // map talks to vehicle / object inside the map through alias. 
        // YOU ARE HERE :  DOES ALIAS WRAP CYTHON ? 
        // this.alias.authenticate() 
        // Alias checks current auth and loads inventory blob ? 
        // ALIAS_PROXY   , ALIAS_WRAPPER()
        // a = AliasProxy()
        // a.authenticate( obj )  
        // now token is in Cython  AliasProxy falls back on localstore
        // a.search( string )
        // v = a.vehicle( 'domain' ,'symbol')
        // map_object.vehicles = v ;
        // map talks to vehicle / object inside the map through alias. 

                //var crypto = crypto.subtle;

        //var ephem_im_key = hash( initObj.key );

        // var item =  localStorage.getItem(  hash( userPub ) + key_domain);
//         this.encProm = crypto.subtle.encrypt( 'wow' ).then(function( out ){
            //returns a keypair object
//            / console.log( ' total out ' );
//             console.log( out );
//         });


//this.solve();
//         window.crypto.subtle.generateKey(
//             {
//                 name: "RSA-OAEP",
//                 modulusLength: 4096,
//                 publicExponent: new Uint8Array([1, 0, 1]),
//                 hash: "SHA-256",//can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
//             },
//             true, //whether the key is extractable (i.e. can be used in exportKey)
//             ["sign", "verify"] //can be any combination of "sign" and "verify"
//         )
//         .then( async function(key){
//             //returns a keypair object
//             console.log('key Cache Key ');
//             console.log(key);
//             console.log(key.publicKey);
//             console.log(key.privateKey);

//             const result = await window.crypto.subtle.encrypt( 
//                 {name: "RSA-OAEP"},  
//                 key.publicKey, 
//                 new TextEncoder().encode('mystring')
//             );
//             console.log(' result ', result)
//         })
//         .catch(function(err){
//             console.error(err);
//         });
        
        // PEM encoded X.509 key
// const publicKey = 
// `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAunF5aDa6HCfLMMI/MZLT
// OhZu+0Bo1LXloCTe+vmIQ2YCX7EatUOuyQMt2Vwx4uV+d/A3DP6PtMGBKpF8St4i
// GwIDAQAB
// -----END PUBLIC KEY-----`;

// importPublicKeyAndEncrypt();
    
//     async function importPublicKeyAndEncrypt() {

//         const plaintext = 'This text will be encoded UTF8 and may contain special characters like § and €.';
                    
//         try {
//             const pub = await importPublicKey(publicKey);
//             const encrypted = await encryptRSA(pub, new TextEncoder().encode(plaintext));
//             const encryptedBase64 = window.btoa(ab2str(encrypted));
//             console.log(encryptedBase64.replace(/(.{64})/g, "$1\n")); 
//         } catch(error) {
//             console.log(error);
//         }
//     }

//     async function importPublicKey(spkiPem) {       
//         return await window.crypto.subtle.importKey(
//             "spki",
//             getSpkiDer(spkiPem),
//             {
//                 name: "RSA-OAEP",
//                 hash: "SHA-256",
//             },
//             true,
//             ["encrypt"]
//         );
//     }

//     async function encryptRSA(key, plaintext) {
//         let encrypted = await window.crypto.subtle.encrypt(
//             {
//                 name: "RSA-OAEP"
//             },
//             key,
//             plaintext
//         );
//         return encrypted;
//     }

//     function getSpkiDer(spkiPem){
//         const pemHeader = "-----BEGIN PUBLIC KEY-----";
//         const pemFooter = "-----END PUBLIC KEY-----";
//         var pemContents = spkiPem.substring(pemHeader.length, spkiPem.length - pemFooter.length);
//         var binaryDerString = window.atob(pemContents);
//         return str2ab(binaryDerString); 
//     }

// //
// // Helper
// //

//     // https://stackoverflow.com/a/11058858
//     function str2ab(str) {
//         const buf = new ArrayBuffer(str.length);
//         const bufView = new Uint8Array(buf);
//         for (let i = 0, strLen = str.length; i < strLen; i++) {
//             bufView[i] = str.charCodeAt(i);
//         }
//         return buf;
//     }
//     function ab2str(buf) {
//         return String.fromCharCode.apply(null, new Uint8Array(buf));
//     }
        
//         // window.crypto.subtle.encProm( )

//     }

//     resetAll( obj ){
//         localStorage.clear();
//         this.connector.logout().then( function( authObj ){
//             this.setSession( {} )
//         }.bind(this))
//     }    


//     async  rsaKeyPair() {
//       let keyPair = await crypto.subtle.generateKey({
//           name: "RSA-OAEP",
//           modulusLength: 4096,
//           publicExponent: new Uint8Array([1, 0, 1]),
//           hash: "SHA-256",
//         },
//         true, ["wrapKey", "unwrapKey"]
//       );
//       this.publicKey = keyPair.publicKey;
//       this.privateKey = keyPair.privateKey;
//     }

//     async encrypt(secret) {
//       // generating random intermediate key to encrypt and decrypt the secret
//       this.intermediateKey = await crypto.subtle.generateKey({
//           name: "AES-GCM",
//           length: 256
//         },
//         true, ["encrypt", "decrypt"]
//       );
//       var s=33;
//       // encrypt secret
//       // ...
//       // wrap intermediate key (export + encrypt) intermediateKey using publicKey.
//       this.iv = crypto.getRandomValues(new Uint8Array(12));
//       this.wrappedKey = await crypto.subtle.wrapKey(
//         "jwk",
//         this.intermediateKey,
//         this.publicKey, {
//           name: "AES-GCM",
//           iv: this.iv
//         }
//       );

//       var s=23;
//     }

//     async decrypt(cipher) {
//       // unwrap (decrypt + import) aes key using private key.
//       this.intermediateKey = await crypto.subtle.unwrapKey(
//         "jwk",
//         this.wrappedKey,
//         this.privateKey, {
//           name: "AES-GCM",
//           iv: iv
//         }, {
//           name: "AES-GCM"
//         },
//         false, ["encrypt", "decrypt"]
//       );
//       // decrypt the cipher
//       // ...
//     }

//     async  solve() {
//       // generate rsa-keypairs
//       await this.rsaKeyPair();
//       // encrypt secret
//       const cipher = await this.encrypt("secret");
//       // decrypt cipher
//       await this.decrypt(cipher);
//     }



//     //// LOCAL STORAGE 
//     getLocal(){
//         var item =  localStorage.getItem('sm');
//         if( item ){
//             var obj= JSON.parse( item )
//             return obj;
//         }else{
//             return {};
//         }
//     }
//     pushLocal( obj ){
//         var item = this.getLocal()
//         var newlocal = { ...item , ...obj }   
//         localStorage.setItem('sm', JSON.stringify(obj) );
//         return newlocal;
//     }
//     onLogEvent(){
//         console.log(' state model hears log event ',this)
//     }

