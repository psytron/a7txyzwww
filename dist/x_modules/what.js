var aObj = {
    ping:function(){
        console.log(' aObj.ping ',this)
    }
}


function aFun(){
    this.ping=function(){
        console.log(' aFun.ping',this, aFun.__proto__)
    }
    function pinga(){
        console.log('funwhat')
    }    
}


class aCla{
    constructor(){
        console.log(' ccla.constructor ')
    }
    ping(){
        console.log( 'CCla.ping',this , aCla.__proto__ )
    }
}

aObj.ping()
var b = new aFun()
var c = new aCla()

b.ping()
c.ping()
// var n = new cObj() // x
// 
aFun.ping()
