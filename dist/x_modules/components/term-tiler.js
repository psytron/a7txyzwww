

class TermTiler extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow;
        const xContainer = document.createElement('div');
        xContainer.classList.add('term-tiler');
        xContainer.innerHTML = `
            <template id="termitem">
                <div class='tickeritem' style="display:inline-block; position:relative; color:red; padding-left:5px;">
                    TERM ITEM EXAMP
                </div>    
            </template>
            <style>
                @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                .squaretext{
                    font-size:12px;
                    margin:0px;
                    padding:0px;     }
                .monofo{
                    font-family: "Courier New", monospace;
                    white-space: pre;
                    font-size:15px;
                    color:lightgreen;  }
                .commandinput{ position:absolute;bottom:8px;  background-color:black;    border:none;           }
                #inputfield{ width:100%;    }
                .outputfield{ height:300px;   }
                ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                  color: lightgreen;
                  opacity: 1; /* Firefox */
                }
            </style>
            <div class="termcontainer">
                <div id="outputfield" class="monofo">
SOME TEXT OUTPUT COMMAND 
                </div>
                <input id='inputfield' type="text" class="commandinput monofo" placeholder="$> COMMAND"></input>
            </div>`;

        shadow.appendChild(xContainer);
        this.xinput = shadow.getElementById("inputfield")
        this.xoutput = shadow.getElementById("outputfield")
        this.xinput.addEventListener("keyup", this.termKeyUp );
    }

    termKeyUp = ( event ) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.xoutput.innerHTML=''
            this.xoutput.innerHTML+= this.xinput.value
            $.ajax({
                url: "http://localhost:8851/runcom",
                type: "GET",
                contentType: 'application/json;charset=UTF-8',
                data: {
                    //'selected': document.getElementById('first_cat').value
                    'q':this.xinput.value
                },
                dataType:"json",
                error:function( data ){
                    console.log( 'yo error ', this)
                }.bind(this ),
                success:function ( data){
                    this.xoutput.innerHTML=''
                    var dataj = JSON.parse( data )
                    for ( var i in dataj ){
                        this.xoutput.insertAdjacentHTML( 'beforeend', '<div>'+dataj[i]+'</div>' )
                    }
                    this.xinput.value=''
                    console.log( this )
                }.bind(this)
            });
            // Trigger the button element with a click
        }
    }

    printTerm( message_in ){
        term.innerHTML+= "<div class='loggert'>"+message_in+"</div>"
        $( "#overflowterm").children().first().remove()
    }
    render() {
        this.innerHTML= ``
    }
    onDataUpdate( data_in ){
        this.printTerm( data_in )
    }
    printTerm( data_in ){
        //var xcontainer = this.shadowRoot.querySelector('.tickertapecontainer')
        //var xcontainer = document.querySelector('ticker-tape').shadow
        var xcontainer = this.shadow.querySelector('.termcontainer')
        xcontainer.innerHTML='';
        var termlines=data_in
        for ( var t in termlines ){
            xcontainer.insertAdjacentHTML( 'beforeend', '<div>QUICK STRING</div>' )
        }
    }
}

customElements.define('term-tiler', TermTiler );