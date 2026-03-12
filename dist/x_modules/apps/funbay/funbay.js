
var run_counter = 1;
var counter = 0;
var count = 839;
var numberone=1;
function init( obj ){
    this.counter= 33;
    this.count = 48484;
    var v=3;
    var vnode = window.factory2d.renderNodeSync('funbay')
    obj.target.appendChild( vnode );

    window.addEventListener('mapChanged' , function(e){

        var oi=3;
        console.log('mapChanged heard in temp module: ', this)
    })

}

function increment(){
        count+=1;
        return { count , thiscount:this.count };
}
function increment2(){
        this.count+=1;
        return { count , thiscount:this.count }; 
}    

function decrement() {
    counter--;
}

export default {
    counter: counter,
    increment: increment,
    increment2: increment2,
    decrement: decrement,
    init:init
};