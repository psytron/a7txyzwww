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
    floor_line:0x00AAAA,
    node_color:0x82a200,
    dbase:0xa948ff,
    link_color_transfer:0x2e379F,
    link_color_convert:0x4b7F7C,
    main_avatar_text:0x222222,
    sub_avatar_text:0x555555,
    link_colors:[0x00FFbe,0x33cbFF,0x33FF44,0xfff040,0xd9ff40,0xbcff39] }


class Xcolors {

    constructor(){
        
    }

    confOrRandom( obj ){

        var color1 = '';
        if( 'color' in obj){
            
            if (typeof obj['color'] === 'string') {
                color1 = parseInt(obj['color'].replace('#', '0x'), 16);
            } else {
                color1 = obj['color'];
            }
            
        }else
        {
            var colors = [ 0x6610f2, 0xfd7e14, 0xffc107, 0xffc107, 0x00FFbe,0x33cbFF,0x33FF44,0xfff040,0xd9ff40,0xbcff39 ];
            color1 = colors[ Math.round( Math.random() *6) ];            
        }
        return color1;
        
    }


}

var xcolors = new Xcolors( );


export { darkTheme as XCOLORS , xcolors }

