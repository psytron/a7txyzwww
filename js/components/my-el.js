

class MyEl extends HTMLElement {

    constructor() {
        super();
        this.render();
    }
    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.render();
    }
    render() {
        this.innerHTML= `
            <style>
                @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                .myelspan {
                    background-color: #FFF;
                    font-size:30px;
                    border-radius: 5px;
                    box-shadow: 0 0 5px #dadada;
                    position: relative;
                    min-height: 100px;
                    font-family: 'Roboto Condensed', sans-serif;
                    border: solid orange 4px;
                }            
            </style>

            <span class="myelspan">X-COMPONENT-08</span>`;
    }
}

customElements.define('my-el', MyEl);