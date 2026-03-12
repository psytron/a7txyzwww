const ePath = process.env.PROJECT ? `${__dirname}/.env.${process.env.PROJECT}` : `${__dirname}/.env`
require('dotenv').config({ path: ePath })
const debugWS = require('debug')('ws')
const debugHTTP = require('debug')('http')
const uWS = require('uWebSockets.js')
const routeMatcher = require('route-matcher').routeMatcher;
const httpCodes = require('./utils/httpStatusCodes')
const port = Number(process.env.PORT || 9001);
const sockets = new Set();
const idle = new Set();

var env = process.env.NODE_ENV || 'dev';
console.log(`Running app in ${env} mode`)

const router = {
    session: routeMatcher(`${process.env.WSMM_PREFIX}/:source/:action/:uid`),
}

//APPLICATION START
const uApp = (env === 'dev') ? uWS.App : uWS.SSLApp;
const app = uApp({
    key_file_name: process.env.SITE_KEY,
    cert_file_name: process.env.SITE_CERT,
    passphrase: process.env.SITE_PWD,
    ssl_prefer_low_memory_usage: true
})
    .ws(`${process.env.WSMM_PREFIX}/*`, {
        /* Options */
        //compression: 0,
        compression: uWS.SHARED_COMPRESSOR, //DEDICATED_COMPRESSOR_3KB,
        maxBackpressure: 256 * 1024,
        maxPayloadLength: 256 * 1024,
        idleTimeout: 0, //Disabled
        //idleTimeout: 15,
        /* Handlers */
        upgrade: (res, req, context) => {
            console.log('An Http connection wants to become WebSocket, URL: ' + req.getUrl() + '!');
            const params = router.session.parse(req.getUrl());
            if (typeof params.source !== "string" || typeof params.action !== "string" || typeof params.uid !== "string") {
                res.writeHeader("Content-Type", "application/json")
                res.writeHeader("Access-Control-Allow-Origin", "*") //TODO: Update CORS
                res.write(`{ "ok" : false, "error" : { "code": "${httpCodes.UNAUTHORIZED}", "msg": "Not a valid connection request [1]." } }`);
                res.writeStatus(httpCodes.UNAUTHORIZED);
                return res.end(httpCodes.UNAUTHORIZED);
            }
            const source = params.source.toLowerCase();
            const action = params.action.toLowerCase();
            const uid = params.uid.toLowerCase();
            if (source !== "audio" && source !== "video" && source !== "hqaudio" && source !== "hqvideo") {
                res.writeHeader("Content-Type", "application/json")
                res.writeHeader("Access-Control-Allow-Origin", "*") //TODO: Update CORS
                res.write(`{ "ok" : false, "error" : { "code": "${httpCodes.UNAUTHORIZED}", "msg": "Not a valid connection request [2]." } }`);
                res.writeStatus(httpCodes.UNAUTHORIZED);
                return res.end(httpCodes.UNAUTHORIZED);
            }
            if (action !== "producer" && action !== "consumer") {
                res.writeHeader("Content-Type", "application/json")
                res.writeHeader("Access-Control-Allow-Origin", "*") //TODO: Update CORS
                res.write(`{ "ok" : false, "error" : { "code": "${httpCodes.UNAUTHORIZED}", "msg": "Not a valid connection request [3]." } }`);
                res.writeStatus(httpCodes.UNAUTHORIZED);
                return res.end(httpCodes.UNAUTHORIZED);
            }
            if (uid.length < 1 || uid.length > 40) {
                res.writeHeader("Content-Type", "application/json")
                res.writeHeader("Access-Control-Allow-Origin", "*") //TODO: Update CORS
                res.write(`{ "ok" : false, "error" : { "code": "${httpCodes.UNAUTHORIZED}", "msg": "Not a valid connection request [4]." } }`);
                res.writeStatus(httpCodes.UNAUTHORIZED);
                return res.end(httpCodes.UNAUTHORIZED);
            }
            /* This immediately calls open handler, you must not use res after this call */
            res.upgrade({
                url: req.getUrl(),
                source,
                action,
                uid
            },
                /* Spell these correctly */
                req.getHeader('sec-websocket-key'),
                req.getHeader('sec-websocket-protocol'),
                req.getHeader('sec-websocket-extensions'),
                context);

        },
        open: (ws) => {
            console.log(ws.url)
            debugWS('A WebSocket connecting via URL: ' + ws.url + '!');
            try {
                ws.subscribe('/broadcast/system');
                if (ws.action === "consumer") {
                    ws.subscribe(`/${ws.source}/${ws.action}/${ws.uid}`);
                }
                debugWS(`[WS Connected] Connect (ws) ${ws.url} from IP ${Buffer.from(ws.getRemoteAddressAsText()).toString()}`);

            } catch (ex) {
                const error = `UNAUTHORIZED Connect (ws) ${ws.url} from IP ${Buffer.from(ws.getRemoteAddressAsText()).toString()}`;
                debugWS(error);
            }
        },
        message: (ws, msg, isBinary) => {
            ws.publish(`/${ws.source}/consumer/${ws.uid}`, msg, isBinary, true); //Buffer.from(msg || "")
        },
        drain: (ws) => {
            // actually it's better to check bufferedAmount here
            debugWS('Draining...')
            sockets.add(ws);
            idle.delete(ws);
            debugWS('WebSocket backpressure: ' + ws.getBufferedAmount());
        },
        close: (ws, code, message) => {
            debugWS('Closing...')
            sockets.delete(ws);
            idle.delete(ws);
            debugWS('WebSocket closed, sockets open:', sockets.size);
        }
    })
    //OPTIONS - CORS
    .options(`${process.env.V2_PREFIX}/*`, (res, req) => {
        res.writeStatus(httpCodes.OK);
        res.writeHeader("Access-Control-Allow-Origin", "*") //TODO: Update CORS
        res.writeHeader("Access-Control-Allow-Methods", "GET, POST, HEAD, DELETE, PUT")
        res.writeHeader("Access-Control-Allow-Headers", "Content-Type, Header, Authorization, Accept, User")
        res.writeHeader("Access-Control-Allow-Credentials", "true")
        res.writeHeader("Access-Control-Max-Age", "1728000")
        res.writeHeader("Vary", "Accept-Encoding, Origin")
        res.writeHeader("Keep-Alive", "timeout=2, max=100")
        res.writeHeader("Connection", "Keep-Alive")
        res.writeHeader("Author", "SFPL")
        res.end();
    })
    //HEALTH CHECK
    .get(`/ping`, (res) => {
        res.writeStatus(httpCodes.OK);
        res.end(httpCodes.OK);
    })
    //CATCH ALL
    .any('/*', (res, req) => {
        let comms = { res, req };
        const ex = `UNAUTHORIZED ${req.getMethod()}  ${req.getUrl()} from IP ${req.getHeader('x-forwarded-for')} or ${Buffer.from(res.getRemoteAddressAsText()).toString()}`;
        debugHTTP(ex)
        res.writeStatus(httpCodes.NOT_FOUND);
        res.end(httpCodes.NOT_FOUND);
    }).listen(port, (token) => {
        if (token) {
            console.log('Listening to port ' + port);
            //uWS.us_listen_socket_close(listenSocket);
        } else {
            console.log('Failed to listen to port ' + port);
        }
    });
