
class BrandLogo extends HTMLElement {

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
            
                .mybrandspan {
                    font-size:30px;
                    font-family: 'Montserrat', sans-serif;
                }            
                /* latin */
                @font-face {
                    font-family: 'Montserrat';
                    font-style: italic;
                    font-weight: 700;
                    font-display: swap;
                    src: local('Montserrat Bold Italic'), local('Montserrat-BoldItalic'), url(fonts/montserrat.woff2) format('woff2');
                    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }                
            </style>

            <span class="mybrandspan">Apdex</span>`;
    }
}

customElements.define('brand-logo', BrandLogo);