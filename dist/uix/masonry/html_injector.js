






// const fs = require('fs');
// const parse = require('node-html-parser').parse;

// fs.readFile('index.html', 'utf8', (err, html) => {
//     if (err) {
//         throw err;
//     }

//     const root = parse(html);

//     const body = root.querySelector('body');
//     //body.set_content('<div id = "asdf"></div>');
//     body.appendChild('<div id = "asdf"></div>');
//     console.log(root.toString()); // This you can write back to file!
//     fs.writeFile('./data/'+'ag'+tag+'.html', root.toString(), 'utf8', function(e){    console.log('file written')   });        
// });

import fs from 'fs';        //\\//\\//\\ or jsdom
import jsdom from "jsdom";   // \// \//
const { JSDOM } = jsdom;    //  //  //

import {factory2d} from './../../x_modules/factory/factory2d.mjs'
import gluemapper from './../../x_modules/util/gluemapper.js'
import { listPerTag } from './basewrap.js'
import { download } from './downloader.js'

//JSDOM.fromFile('index_mass.html', { runScripts: "dangerously", resources: "usable" })
JSDOM.fromFile('./src/uix/masonry/index_mass.html')
.then(async function(dom) {
    var window = dom.window;
    var dat = await listPerTag('media')
    global.document = window.document;
    global.window = window;
    var doc = window.document;

    var numCallbacksCalled = 0;
    function callback() {
        numCallbacksCalled++;
    }
    

    var example_items = [
        {
            title: 'Ocean Support',
            body: 'Dr. Bob Richmond Ph.D',
            img: '../woods.jpg',
            stats: '44 members',
            links:[
                'https://twitter.com',
                'https://twitter.com'                    
            ]
        },
        {
            title: 'Vigo Irregular',
            body: 'another good word getting tiledmover works good and will have a cool long paragraph to tet it out the and is the alayas ginsing always ign',
            img: '../vacation.jpg',
            stats: '52 members',
            links:[
                'https://twitter.com',
                'https://twitter.com'                    
            ]                
        },
        {
            title: 'Eiop Dipo',
            body: 'another good word getting tiledmover works good and will have a cool long paragraph to tet it out the and is the alayas ginsing always ign',
            img: '../ocean.jpeg',
            stats: '52 members'
        },
        {
            title: 'Grigo Montage',
            body: 'another good word getting tiledmover works good and will have a cool long paragraph to tet it out the and is the alayas ginsing always ign',
            img: '../ocean.png',
            stats: '52 members'
        },
        {
            title: 'Grigo Montage',
            body: 'another good word getting tiledmover works good and will have a cool long paragraph to tet it out the and is the alayas ginsing always ign',
            img: '../round.jpg',
            stats: '52 members'
        }            
    ]        

    var datx = await listPerTag('media')
    var daty = await listPerTag('science')



    for( var u in daty ){
        var unit=daty[u];
        if( unit.image ){
            var iurl = JSON.parse( unit.image)[0].url;
            
            var file_path = 'img/'+ JSON.parse( unit.image)[0].title; 
            var final_path = '/Users/alophant/1m/apps/oceanhealth.github.io/'+file_path;
            var status = await download(iurl, final_path, () => {})
            unit.img = './../'+file_path;
            console.log('✅ Saved: ', final_path , status )
        }

    }


    var cont = doc.querySelector('#maincont');
    var hucont = doc.querySelector('#hucont');
    factory2d.storeStaticTemplate( cont.children[0] )  // prepares template for injections 
    factory2d.storeStaticTemplate( doc.querySelector('#facePanel') )
    
    hucont.innerHTML = ''



    //var items = example_items;
    var items = daty;
    for (var i in items) {
        let obj = items[i];

        var fnode = factory2d.renderNodeSync( 'facePanel', {}  )                   
        gluemapper.pushx( obj , fnode );
        hucont.appendChild( fnode )

        var vnode = factory2d.renderNodeSync( 'massPanel', {}  )             
        gluemapper.pushx( obj , vnode );
        cont.appendChild( vnode );
    } 



    var bod = dom.serialize()

    //fs.writeFile('./src/uix/masonry/'+'OUTPUT'+'.html', bod, 'utf8', function(e){    console.log('file written')   });        
    fs.writeFile('/Users/alophant/1m/apps/oceanhealth.github.io/'+'OUTPUT'+'.html', bod, 'utf8', function(e){    console.log('file written')   });        
    
    //var events = new EventListener(document.body);
    //events.on('click', callback);

    //var event = new window.MouseEvent('click', { bubbles: true, view: window });
    //document.querySelector('.some-class').dispatchEvent(event);
    //test.equal(numCallbacksCalled, 1);

    window.close();
});



//const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
//console.log(dom.window.document.querySelector("p").textContent); // "Hello world"

