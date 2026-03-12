
function Util(){

    function uuidv4a() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    this.uuidv4=function() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
      
    this.ping=function(){
        console.log(' ping ')
    }

    this.context = function() {
        var jtkn = 'blank' // JTKN
        var session_fragment = Math.round( Math.random()*99999 )
        var official_base = window.location.protocol + "//" + window.location.host;
        //var official_base ='https://signalmesh.io'
        


        return { official_base , session_fragment }
        //var official_base = window.location.protocol + "//" + window.location.host;
        

        // SESSION FRAgMENT 
        var session_fragment = Math.round( Math.random()*99999 )

    }

    // source: http://stackoverflow.com/a/11058858
    this.ab2str=function (buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    //stringToArrayBuffer.js
    // source: http://stackoverflow.com/a/11058858
    this.str2ab=function(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }


}




function term( min ){
    this.dispatchEvent( new CustomEvent('statusEvent', { detail:{'message':min} }) )
}

var lightTheme = {
    bg:0xFFFFFF ,
    link:0xCCCCCC ,
    avatarbase:0xCCCCCC,
    floor_line:0xffdcc7,
    node_color:0x82a200,
    dbase:0xa948ff,
    link_color_transfer:0xff9a9a,
    link_color_convert:0xffc368,
    main_avatar_text:0x222222,
    sub_avatar_text:0x555555,
    link_colors:[0xffbebe,0xffcb55,0xffc966,0xfff040,0xd9ff40,0xbcff39] }
var darkTheme = {
    bg:0x000000,
    link:0xCCCCCC ,
    avatarbase:0xCCCCCC,
    floor_line:0x005566,
    node_color:0x82a200,
    dbase:0xa948ff,
    link_color_transfer:0x2e379F,
    link_color_convert:0x4b7F7C,
    main_avatar_text:0x222222,
    sub_avatar_text:0x555555,
    link_colors:[0x00FFbe,0x33cbFF,0x33FF44,0xfff040,0xd9ff40,0xbcff39] }
var XCOLORS = darkTheme; 



        // OFFICIAL BASE 
var official_base='https://api.apdex.com'
if(  window.location.host.includes("localhost") || window.location.host.includes("xcore.love") || window.location.host.includes("0.0.0.0")  )
{ 
    official_base ='http://localhost:8851' 
}


const random_hex_color = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
const random_hex_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return n.slice(0, 6);
};
var rhc = random_hex_code();

//var session_fragment = Math.round( Math.random()*99999 );
var session_fragment = random_hex_code();
export { Util , official_base , session_fragment }