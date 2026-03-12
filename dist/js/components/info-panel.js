

class InfoPanel extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.shadow = shadow
        const leContainer = document.createElement('div');
        leContainer.classList.add('ticker-tape');
        leContainer.innerHTML = `
            <link href="css/bootstrap.min.css" rel="stylesheet"><!-- Favicons -->
            <link href="css/pricing.css" rel="stylesheet">
            <footer class="pt-4 my-md-5 pt-md-5 border-top">
                <div class="row" style="margin:0px; margin-left:0px; margin-right:0px;">
                    <div class="col-12 col-md">
                        <brand-logo style="font-size:8px;"></brand-logo>
                        <small class="d-block mb-3 text-muted" style="font-size:12px;">© 2020</small>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Features</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="text-muted" href="/xprmnt">Cool stuff</a>
                            </li>
                            <li><a class="text-muted" href="/xprmnt">Random
                                feature</a></li>
                            <li><a class="text-muted" href="/xprmnt">Team
                                feature</a></li>
                            <li><a class="text-muted" href="/xprmnt">Stuff for
                                developers</a></li>
                            <li><a class="text-muted" href="/xprmnt">Another
                                one</a></li>
                            <li><a class="text-muted" href="/xprmnt">Last time</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>Resources</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="text-muted" href="/xprmnt">Resource</a>
                            </li>
                            <li><a class="text-muted" href="/xprmnt">Resource
                                name</a></li>
                            <li><a class="text-muted" href="/xprmnt">Another
                                resource</a></li>
                            <li><a class="text-muted" href="/xprmnt">Final
                                resource</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5>About</h5>
                        <ul class="list-unstyled text-small">
                            <li><a class="text-muted" href="/xprmnt">Team</a></li>
                            <li><a class="text-muted" href="/xprmnt">Locations</a>
                            </li>
                            <li><a class="text-muted" href="/xprmnt">Privacy</a>
                            </li>
                            <li><a class="text-muted" href="/xprmnt">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>         
        `;

        shadow.appendChild( leContainer );
    }


    get myObj() {
        return this._myObj;
    }
    set myObj(value) {
        this._myObj = value;
        this.render();
    }
    render() {
        this.innerHTML= ``
    }
}

customElements.define('info-panel', InfoPanel);