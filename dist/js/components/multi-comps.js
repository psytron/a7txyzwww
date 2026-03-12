// WEB COMPONENT 1: chat-form
customElements.define('chat-form', class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `Form<br><input id="msg" value="abc"/>
      <button id="btn">send</button>`

        btn.onclick = () => {
            // can: this.onsend() or not recommended: eval(this.getAttribute('onsend'))
            this.dispatchEvent(new CustomEvent('send',{detail: {message: msg.value} }))
            msg.value = '';
        }
    }
})

// WEB COMPONENT 2: chat-history
customElements.define('chat-history', class extends HTMLElement {
    add(msg) {
        let s = ""
        this.messages = (this.messages || []).concat(msg);
        for (let m of this.messages) s += `<li>${m}</li>`
        this.innerHTML = `<div><br>History<ul>${s}</ul></div>`
    }
})

// -----------------
// PARENT CODE
// which subscribe chat-form send event,
// receive message and set it to chat-history
// -----------------
