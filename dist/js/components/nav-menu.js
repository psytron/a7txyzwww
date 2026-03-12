

class NavMenu extends HTMLElement {


    constructor() {
        super();
        this.drawer_open = 0;
        this.drawer = 0

        const title = this.title;
        const gxa = this.getAttribute('gxa')
        let g = 33

        ///// CAVEMAN RESCOPE ///
        this.toggleDrawer = this.toggleDrawer.bind( this )
        this.onNavEvent = this.onNavEvent.bind( this )

        this.webLoginPanel = `
            <form style="margin:24px;">
                <div class="form-group">
                    <label class='frmlabel' for="username">KEY</label>
                    <input type="text" class="form-control" id="username" placeholder="email">
                </div>
                <div class="form-group">
                    <label class='frmlabel' for="password">PASSPHRASE</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                    <div id="logerrout" class='frmlabel logerout' >
                    </div>
                </div>
                <div style="text-align:center; margin-top:18px;">
                    <button id="newbtn" fn="new" type="button" class="btn btn-primary" onclick="register()">New</button>
                    <button id="authbtn" fn="login"  type="button" class="btn btn-primary" onclick="auth()">Login</button>
                    <button id="statusbtn" fn="status"  type="button" class="btn btn-primary" onclick="test()">Status</button>
                    <!--<button type="button" class="btn btn-primary" onclick="fillx()" style="background-color:none; ">Demo</button>-->
                </div>
            </form>    
        `;

        this.statusPanel = `
            <div class="form-group" style="margin:24px;">
                <label  class='frmlabel'  for="username">LocalHost OP</label>
                <input type="text" class="form-control" id="username" placeholder="localkey">
            </div>
        `;

        this.render();
    }
    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.render();
    }


    toggleDrawer(){
        this.drawer = this.querySelector('#slide_drawer2')
        if( this.drawer_open){
            this.drawer_open=0;
            //TweenMax.to( this.drawer, 1, {right:-350 , ease:Expo.easeOut} );
            //TweenMax.to(drawer2, 2, {top:-580 , ease:Expo.easeOut} );
            //TweenMax.to(sortmenu, 2, {right:-580 , ease:Expo.easeOut} );
            //TweenMax.to('.holder', 1, { ease:Expo.easeOut, top: -86+'px'});
            gsap.to( this.drawer, {duration: 1, right:-350, ease:Expo.easeOut });
        }else{
            this.drawer_open=1;
            //TweenMax.to(this.drawer, 1, {right:0 ,ease:Expo.easeOut});
            //TweenMax.to(drawer2, 2, {top:0 ,ease:Expo.easeOut});
            //TweenMax.to(sortmenu, 2, {right:0 , ease:Expo.easeOut} );
            gsap.to( this.drawer, {duration: 1, right:0, ease:Expo.easeOut });
        }
    }
    render() {
        this.innerHTML = `
            <script src='js/TweenMax.min.js'></script>
            <script type="module">
                import 'js/components/brand-logo.js';
            </script>
            <style>
                .xnavicon {
                    font-size:30px;
                    position: absolute;
                    font-family: 'Roboto Condensed', sans-serif;
                    cursor: pointer;
                    top:0;
                    right:0;
                    padding:15px;
                    margin-top:-3px;
                    -webkit-user-select: none; /* Safari */        
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* IE10+/Edge */
                    user-select: none; /* Standard */
                    color: #EEEEEE;
                }
                .xnavitem{
                    margin:10px;
                    color:white;
                    font-weight:bold;
                    font-family: 'Roboto Condensed', sans-serif;
                    cursor:pointer;
                }   
                .frmlabel{
                    color:#FFFFFF;
                    font-size:11px;
                } 
                .logerout{
                    
                    text-align:center; 
                    margin-bottom:5px;
                    font-size:11px;
                }
                #slide_drawer2{
                    position:absolute; 
                    top:0px; width:300px; height:100%; right:-400px; background:rgba(0,0,0,0.8);
                    border-left:solid #222222 1px;
                    pointer-events: auto;
                }
                .slide_container{
                    width:300px; 
                    height:100%; 
                    position:fixed; 
                    top:0px; 
                    right:0px; 
                    overlay:hidden; 
                    pointer-events: none;
                }
            </style>
            <div id="slide_container" class="slide_container" style="">
                <div id="slide_drawer2">
                    <div style="height:120px;"></div>
                    <div id='displaystage'>
                        <!-- CURRENT Panel Goes Here --> 
                    </div>
                </div>
            </div>
            <span class="xnavicon">&#9776;</span>`;
            
        $( this.querySelectorAll('.btn') ).on('click' , function( e ){
            var authEventObj={}
            authEventObj['un'] = this.querySelector("#username").value;
            authEventObj['pw'] = this.querySelector("#password").value;
            authEventObj['fn'] = $( e.target ).attr('fn')
            this.dispatchEvent( new CustomEvent('authEvent', { detail:authEventObj }) )
        }.bind(this))
        /*
        this.querySelector('#authbtn').addEventListener('click' , function(){
            console.log(" AUTH Event in Module ")
        })
        this.querySelector('#statusbtn').addEventListener('click' , function(){
            console.log(" STATUS Event in Module ")
        })*/
        this.updatePanel('weblogin')
        this.querySelector(".xnavicon").onclick = function(event) {
            this.toggleDrawer()
        }.bind(this)
    }


    onNavEvent( obj ){
        console.log( obj )
        if( this.drawer_open == 1){
            console.log( 'Drawer was open, closing..' )
            this.drawer_open=0;
            TweenMax.to(this.drawer, 1, {right:-350 , ease:Expo.easeOut , delay:1} );        
        }
    }

    onAuthEvent( obj ){
        this.updatePanel('weblogin')
    }

    updatePanel( panel_in ){
        var nd = this.querySelector("#displaystage")
        while (nd.firstChild) {
            nd.removeChild(nd.lastChild);
        }
        nd.insertAdjacentHTML( 'beforeend', this.webLoginPanel );
    }
    

}
customElements.define('nav-menu', NavMenu );