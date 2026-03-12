




function concatLayouts(  layouts_a , layouts_b ){

    for ( var ly in layouts_b ){
        var cur_incoming_layout = layouts_b[ ly ];

        // CREATE NON EXISTING LAYOUT 
        if( ! layouts_a[ ly ] ){  layouts_a[ly]={}   };

        // MERGE 
         layouts_a[ly] = { ...layouts_a[ly] , ...cur_incoming_layout };
    }


    return layouts_a; 
}



function concatNodes(  nodes_a  , nodes_b ){
    
    for( var n in nodes_b ){
        var nd = nodes_b[n];
        nodes_a.set( nd.slot , nd );
    }
    return nodes_a; 
}


function concatLinks(  links_a  , links_b ){
    
    for( var k in links_b ){
        var lk = links_b[k];
        // prob is no slot for link ?
        links_a.set( [lk.slota,lk.slotb] , lk );
    }
    return links_a; 
}

export { concatLayouts , concatNodes , concatLinks }