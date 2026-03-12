
import ElementX from '/x_modules/elementx.js';
class QrPanel extends ElementX {

    constructor() {
        super();
    }

    render() {
        this.innerHTML= ``
    }
    onDataUpdate( data_in ){

        console.log(' incomign obj ')
    }

}

customElements.define('qr-panel', QrPanel);