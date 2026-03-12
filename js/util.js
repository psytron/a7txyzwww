
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