




var menu_model =
{
    label:'Main',
    items:[
        {
            label:'System', 
            items:[
                {},
                {},
                {}
            ]
        },
        {
            label:'Imports',
            items:[
                {},
                {},
                {}
            ]
        },
        {
            label:'Collections',
            method:'show_all',
            items:[
                {},
                {},
                {}
            ]
        }
    ]    
}




// NAV 
class Hierarchnav {

    instfield = 5 
    int3 = 3 
    
    constructor( initObj ){
        
        var bnode = document.querySelector('#level0')
        for ( var i in initObj ){
            console.log( i ) 
            // ADD Menus ? 

            var newEl = document.createElement('span');
            newEl.className = "event-list";
            newEl.innerHTML = '['+i+']';
            bnode.appendChild(newEl);

        }

        
    }

    renderPath( path_in ){


        
    }

    displayPath( path_of_nav_item ){

        var path = ['main','system','settings']
        var path2 = ['main','imports','map']
        
        
    }

    // BY DEFAULT ONLY DISPLAY ONE MENU ROW OR  
    // OR JUST ENTRY POINT ITEM 
    // MAYBE IT SHOULD BE SELECTABLE WITH CONFIGURATION 

    


    
}


export { Hierarchnav }