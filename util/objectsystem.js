

// In the following line, you should include the prefixes of implementations you want to test.
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)





class ObjectSystem {
    constructor( initObj ){

        //this.addItem( 'krainbs2' , { ke:'kf3f3f3e' , se:'wa2a2aew' , dom:'coinbs' } )
        //this.addItem( 'coinbs' , { ke:'ke' , se:'wew' , dom:'coinbs' } )
        //this.addItem( 'vog' , { ke:'kf3f3f3e' , se:'wa2a2aew' , dom:'coinbs' } )
        this.runtest();
    }


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

    async runtest( obj_in ){
        //for( var i in obj_in ){
        //    this.items[ obj_in[i]['domain'] ] = obj_in[i]
    // }
        //var xy = this.items;


        const request = indexedDB.open("library");
        let db1;
        
        request.onupgradeneeded = function() {
            // The database did not previously exist, so create object stores and indexes.
            const db1 = request.result;
            const store = db1.createObjectStore("books", {keyPath: "isbn"});
            const titleIndex = store.createIndex("by_title", "title", {unique: true});
            const authorIndex = store.createIndex("by_author", "author");

            // Populate with initial data.
            store.put({title: "Ques", author: "Frd", isbn: 1023456});
            store.put({title: "WatOOs", author: "Fed", isbn: 234567});
            store.put({title: "BedOOs", author: "Bny", isbn: 3405678});
       
        }
        
        request.onsuccess = function() {
            db1 = request.result;
        };        

        var db = levelgraph(level("test"));
        db.put([{
            subject: "matteo",
            predicate: "friend",
            object: "daniele"
        }, {
            subject: "daniele",
            predicate: "friend",
            object: "matteo"
        }, {
            subject: "daniele",
            predicate: "friend",
            object: "marco"
        }, {
            subject: "lucio",
            predicate: "friend",
            object: "matteo"
        }, {
            subject: "lucio",
            predicate: "friend",
            object: "marco"
        }, {
            subject: "marco",
            predicate: "friend",
            object: "davide"
        }], function () {

//         var stream = db.searchStream([{
//             subject: "matteo",
//             predicate: "friend",
//             object: db.v("x")
//         }, {
//             subject: db.v("x"),
//             predicate: "friend",
//             object: db.v("y")
//         }, {
//             subject: db.v("y"),
//             predicate: "friend",
//             object: "davide"
//         }]);

//         stream.on("data", function(data) {
//             console.log(data);
//         });
        });


        // const tx = db.transaction("books", "readwrite");
        // const store = tx.objectStore("books");
        
        // store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
        // store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
        // store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
        
        // tx.oncomplete = function() {
        //   // All requests have succeeded and the transaction has committed.
        //     console.log(' batch  2 ')
        // };        


        // var db = levelgraph(level("test"));
        // db.put([{
        //     subject: "matteo",
        //     predicate: "friend",
        //     object: "daniele"
        // }, {
        //     subject: "daniele",
        //     predicate: "friend",
        //     object: "matteo"
        // }, {
        //     subject: "daniele",
        //     predicate: "friend",
        //     object: "marco"
        // }, {
        //     subject: "lucio",
        //     predicate: "friend",
        //     object: "matteo"
        // }, {
        //     subject: "lucio",
        //     predicate: "friend",
        //     object: "marco"
        // }, {
        //     subject: "marco",
        //     predicate: "friend",
        //     object: "davide"
        // }], function () {

        //     var stream = db.searchStream([{
        //         subject: "matteo",
        //         predicate: "friend",
        //         object: db.v("x")
        //     }, {
        //         subject: db.v("x"),
        //         predicate: "friend",
        //         object: db.v("y")
        //     }, {
        //         subject: db.v("y"),
        //         predicate: "friend",
        //         object: "davide"
        //     }]);

        //     stream.on("data", function (data) {
        //         console.log(data);
        //     });
        // });
    }


}

export default ObjectSystem