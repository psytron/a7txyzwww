import { GameObject } from '/x_modules/gameobject/index.js'
import { Timeline } from '/x_modules/apps/timeline/timeline.js'
import { Xcollection } from '/x_modules/apps/xcollection.js'


class GrowApp extends GameObject{
    constructor( initObj ){
        super( initObj )
        
        // YOUR DATA as PLAIN OBJECTS
        var projectA = {
            logo:'/img/signalmesh_logo.png',
            name:'SignalMesh',
            subname:'Energy Operating System and router',
            project_type:'C CORP',
            project_time:'Fixed Term'  }
        
        var projectB = {
            logo:'/img/basefarm.png',
            name:'Orgzonx',
            subname:'Organic SHopping alternative x2',
            project_type:'NON-PROFIT',
            project_time:'FIXED'  }

        var milestonesData = [  
            { 'title':'milestones1' , 'date':'2020 Q1' }, 
            { 'title':'milestones2' , 'date':'2020 Q2' }, 
            { 'title':'milestones3' , 'date':'2020 Q3' } ]

        var backersData = [  
            { 'name':'Steve Vonegut' , 'type':'$10' , 'userimg':'/img/rando1.png' }, 
            { 'name':'Wompler Jeulwuor' , 'type':'$10'  , 'userimg':'/img/rando2.png'}, 
            { 'name':'Skew Badoup' , 'type':'$10'  , 'userimg':'/img/rando3.png'}, 
            { 'name':'Julia Johnson' , 'type':'$100' , 'userimg':'/img/rando4.png' }, 
            { 'name':'Maria Mcdonald' , 'type':'$10'  , 'userimg':'/img/rando1.png'}, 
            { 'name':'Robing Schuews' , 'type':'$100'  , 'userimg':'/img/rando2.png'},             
            { 'name':'Alias Wells' , 'type':'$50'  , 'userimg':'/img/rando3.png'},         
            { 'name':'Julia Johnson' , 'type':'$100' , 'userimg':'/img/rando4.png' }, 
            { 'name':'Maria Mcdonald' , 'type':'$10'  , 'userimg':'/img/rando1.png'}, 
            { 'name':'Robing Schuews' , 'type':'$100'  , 'userimg':'/img/rando2.png'},             
            { 'name':'Alias Wells' , 'type':'$50'  , 'userimg':'/img/rando3.png'},                         
            { 'name':'Mongro Blindo' , 'type':'$150'  , 'userimg':'/img/rando4.png'} ]                    


        
        // SPAWN a BUNCH OF GAMEOBJECTS 
        var projectHeader = new GameObject( { target:this.container , data:projectA   ,    ui:'projectheader' } );  
        var timeline = new Timeline(        { target:this.container , data:milestonesData                     } );  
        var backers = new Xcollection(      { target:this.container , data:backersData ,   ui:'backer'        } );  



        // LISTEN FOR BUBBLING EVENTS and ROUTE TO CONTROLLER: 
        //this.addEventListener( 'clickEvent' , controller.onClickEvent )

        // controller.investigate
        
    }
}


export { GrowApp }
























        // timeline  // this has its own // attached ready to write existing //   
        //var backers = new Xcollection( {target:document.querySelector('#timeline') ,  template:'backer' , data:backersList }  )
//var timeline = this.attachChild( new Timeline( { target:document.querySelector('#timeline')  ,  data:milestonesData  }) )        