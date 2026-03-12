'use strict';

(function () {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    class DateWidget extends HTMLElement {
        constructor() {   // Fires when an instance of the element is created.
            super();

            // attaches shadow tree and returns shadow root reference
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
            const shadow = this.attachShadow({mode: 'open'});
            const datContainer = document.createElement('div'); // creating a container for the editable-list component
            
            this.yo = 'yoyo'
            datContainer.classList.add('date-widget')
            datContainer.innerHTML =  `
                <style>
                    @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
                    .container {
                        border-radius: 5px;
                        position: relative;
                        min-height: 100px;
                        font-family: 'Roboto Condensed', sans-serif;
                        margin: 10px 0;
                    }
                    .container .left {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 30%;
                        color: #FFF;
                        text-align: center;
                        padding: 18px 0 0 0;
                    }
                    .container .left .month {
                        line-height: 20px;
                        font-weight: 300;
                    }
                    .container .left .day {
                        font-size: 40px
                    }
                    .container .right {
                        margin-left: 30%;
                        padding: 10px 10px 10px 15px;
                        color: #FFF;
                    }
                    .container .right .day-long {
                        font-weight: 300;
                        font-size: 18px;
                        line-height: 35px;
                    }
                    .container .right .time {
                        font-weight: bold;
                        font-size: 35px;
                        line-height: 40px;
                    }
                    /* THEME CODE */
                    .container.green .left {
                        /*background-color: #37bc9b;*/
                    }
                    .container.green .day-long {
                        color: #278b70;
                    }
                    .container.red .day-long {
                        color: #922146;
                    }
                    .container.blue .left {
                        background-color: #356dbc;
                    }
                    .container.blue .day-long {
                        color: #2d5ea3;
                    }
                    .container.gold .left {
                        background-color: #bc9600;
                    }
                    .container.gold .day-long {
                        color: #9a7b00;
                    }
                </style>
                <div class="container">
                    <div class="left">
                        <div class="month"></div>
                        <div class="day"></div>
                     </div>
                     <div class="right">
                        <div class="day-long"></div>
                        <div class="time"></div>
                    </div>
                </div>
            `;
            this.container = datContainer.querySelector('.container');  //Grab the elements from the shadow root
            this.month = datContainer.querySelector('.month');
            this.day = datContainer.querySelector('.day');
            this.dayLong = datContainer.querySelector('.day-long');
            this.time = datContainer.querySelector('.time');
            this.updateTheme( this.getAttribute('theme') );
            this.draw();  //Call the draw function initially
            //Call the draw function every section to update the time
            setInterval(() => {
                this.draw();
            }, 1000);

            shadow.appendChild(  datContainer )
        }
        attachedCallback() {}  // Fires when an instance was inserted into the document.
        connectedCallback(){
            console.log(' connected fired ')
        }  // Fires when an instance was inserted into the document.
        attributeChangedCallback(attrName, oldVal, newVal) { // Fires when an attribute was added, removed, or updated.
            switch (attrName) {
                case "theme":
                    this.updateTheme(newVal);
                    break; }
        }
        draw() {
            this.date = new Date();
            this.month.innerHTML = months[this.date.getMonth()];
            this.day.innerHTML = this.date.getDate();
            this.dayLong.innerHTML = days[this.date.getDay()].toUpperCase();
            this.time.innerHTML = this.date.toLocaleTimeString();
        }
        updateTheme(theme) {
            var val = "green";
            if (["green", "red", "blue", "gold"].indexOf(theme) > -1) {
                val = theme;
            }
            this.container.className = "container " + val;
        }
    }
    //document.registerElement('date-widget', DateWidget);
    customElements.define('date-widget', DateWidget );
})();