
function print( str_in ){

    console.log( str_in , this )
}


var register= function(){
    document.getElementById("logerrout").innerHTML='Registering Flow...';
    if( document.getElementById("password").value.length < 8){
        document.getElementById("password").value=''
        document.getElementById("logerrout").innerHTML='Password Minimum 8 Characters';
        return false;
    }
    data={
        un:document.getElementById("username").value,
        pw:document.getElementById("password").value
    }
    //XHTTP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 && xhttp.status==200) {
            var response = JSON.parse(xhttp.responseText);
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
            //document.getElementById("token").innerHTML = response.token;
            //document.getElementById("token").value = response.token;
        }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
        }
        if(xhttp.readyState==4 && xhttp.status==400){
            document.getElementById("logerrout").innerHTML=JSON.parse(xhttp.responseText).message;
        }
    };
    xhttp.open("POST", official_base+"/jxtreg", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
var auth= function(){
    document.getElementById("logerrout").innerHTML='Auth Flow...';
    data={
        un:document.getElementById("username").value,
        pw:document.getElementById("password").value
    }/*
    function leftPad (str, len, ch) {
        str = String(str);
        var i = -1;
        if (!ch && ch !== 0) ch = ' ';
        len = len - str.length;
        while (++i < len){
        str = ch + str; }
        return str;}
    var valin = document.getElementById("password").value
    data['pwh']= Web3.sha3((valin).toString(16), { encoding: 'hex' })*/

    //XHTTP
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4 ) {
            var resObj = JSON.parse(xhttp.responseText);
            if( xhttp.status == 200){
                document.getElementById("logerrout").innerHTML=resObj.message;
                jtkn = resObj.tkn
                $('#loginholder').hide()
                $('.searchholder').load( "subhtml/searchfield.html", function() {
                    //alert( "Load was performed." );
                    $( document ).on('click',           searchMod.setSearchClick  )
                    $("#searchbox").on('keydown paste', searchMod.setSearchKeyDownPaste )
                    $("#searchbox").on('input',         searchMod.setSearchInput )
                    rez = $('#search_results');
                    spinr = $('.active');
                }.bind(this));                
            }else{
                document.getElementById("logerrout").innerHTML=resObj.message;
            } //window.location.replace('/');
        }
    };
    // xhttp.open("POST", official_base+"/jxtavail", true);
    //xhttp.withCredentials = true;
    xhttp.open("POST", official_base+"/jxtlogin", true);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(data));
}
var test= function(){
    console.log(' test ')
    // data={token:document.getElementById("token").value}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState==4) {
            if( xhttp.status==200 ){
                resObj = JSON.parse(xhttp.responseText)
                document.getElementById("logerrout").innerHTML=resObj.message;
            }else{
                document.getElementById("logerrout").innerHTML='Session Reset';
            }
        }
    };
    xhttp.open("POST", official_base+"/jxttest", true);
    xhttp.setRequestHeader('Authorization', jtkn);
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send();
}
var logout= function(){
    console.log(' test ')
    // data={token:document.getElementById("token").value}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        resObj = JSON.parse(xhttp.responseText)
        if (xhttp.readyState==4 && xhttp.status==200){
            var response = JSON.parse(xhttp.responseText);
            document.getElementById("logerrout").innerHTML=resObj.message; }
        if(xhttp.readyState==4 && xhttp.status==403){
            document.getElementById("logerrout").innerHTML=resObj.message; }};
    
            xhttp.open("POST", official_base+"/jxtlogout", true);
    //xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
    xhttp.send();
}





//EXP 
//document.querySelector('body').appendChild( searchMod )
//searchMod = SearchMod() 
//navMenu = NavMenu()
//viewFrame = ViewFrame() 
//level.add( [ searchMod , viewFrame , navMenu ])
//searchMod.addEventListener( 'navEvent' , viewFrame.onNavEvent ) // clears memory and displays OR sends Command 
//searchMod.addEventListener( 'navEvent' , navMenu.onNavEvent )   // closes itself 
