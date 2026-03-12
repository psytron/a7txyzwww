/* Usage:
   ajax( {
      url : 'url'                        // required
      contentType : 'contentType'        // optional
      method : 'method'                  // required
      headers : { h1 : 'v1', h2 : 'v2' } // optional
      data : ...                         // optional
      callback : function(response) { }  // required
      errback : function() { }           // optional
   } );
*/
function ajax(settings) {
    var req;

    if (!settings) return;

    if (XMLHttpRequest) {
        req = new XMLHttpRequest();
        if ('withCredentials' in req) {
            req.open(settings.method, settings.url, true);
            req.onerror = settings.errback;
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status >= 200 && req.status < 400) {
                        if (settings.callback) {
                            settings.callback(req.responseText);
                        }
                    } else {
                        if (settings.errback) {
                            settings.errback(new Error('Response returned with non-OK status'));
                        }
                    }
                }
            };
            if (settings.headers) {
                for (header in settings.headers)
                    req.setRequestHeader(header, settings.headers[header]);
            }
            if (settings.contentType)
                req.setRequestHeader('Content-Type', settings.contentType);
            req.send(settings.data);
        }
    }
}
//The actual token flow is then as follows:

var server = {
    authorizationEndpoint:
        "https://oauth2.server/oauth2/authorize?" +
        "response_type=token&" +
        "client_id=client_id&" +
        "scope=whatever.scope.you.need&" +
        "redirect_uri=http://application.server/Index.html",
    profileEndpoint: "https://oauth2.server/api/profile"
}

window.onload = function () {

    // the access token is passed back with the uri fragment
    // this little helper retrieves values from the uri fragment
    // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
    var query = {};

    if (window.location.hash.indexOf("#") === 0) {
        window.location.hash.substr(1)
            .split("&")
            .forEach(
                function (item) {
                    query[item.split("=")[0]] = item.split("=")[1]
                });
    };

    if ( query.access_token == undefined ) {
        // unauthorized, redirect to the provider
        window.location.href = server.authorizationEndpoint;
    }
    else {
        // the token is here
        // use it to query the profile API
        var req = {
            url:      server.profileEndpoint,
            method:   'GET',
            callback: oauth2loggedin,
            headers: {
                Authorization : 'Bearer ' + query.access_token
            }
        };

        ajax(req);
    }
}

function oauth2loggedin(profilej) {
    var profile = JSON.parse(profilej);
    if (profile && profile.Email) {
        var user = document.getElementById('user');
        user.innerHTML = profile.Email;
    }
}
