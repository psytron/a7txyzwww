import $ from '/web_modules/jquery.js';

let MultiFlatFactory = function () {
    return {
        cache: [],
        getTemplate(id) {
            let cache = this.cache;
            return new Promise((resolve, reject) => {
                if (cache[id]) {
                    resolve(cache[id]);
                } else {
                    this.loadTemplate(id)
                        .then(template => {
                            cache[id] = template;
                            resolve(template);
                        })
                        .fail(reject);
                }
            });
        },
        loadTemplate(id) {
            return $.get('/x_modules/apps/' +id+'/'+ id + '.html');
        },
        
        render( tmp_id , data_in ){
            //var templatestring='`'+this.con.querySelector('#'+tmp_id).innerHTML+'`'
            var templatestring='`'+this.con.querySelector('#'+tmp_id).outerHTML+'`'
            var wholefunc = '( obj ) =>{ return '+templatestring+' }  ';
            var outcome = eval( wholefunc )( data_in )
            return outcome;
        },

        loadTemplateX( url ) {   
            return new Promise( ( resolve, reject ) => {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (e) { 
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        con.innerHTML = xhr.responseText;
                        resolve( con );
                    }
                }
                xhr.open("GET", url , true);
                xhr.setRequestHeader('Content-type', 'text/html');
                xhr.send();     
            });
        } 
    }
};



export { MultiFlatFactory }

/*
var tmp = document.createElement('div')
    document.body.appendChild( tmp )
    tmp.style.display = 'none';
    var con = tmp.attachShadow({mode:'closed'});
    this.con=con;  */