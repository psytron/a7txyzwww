import GUN from "gun"  //# "https://cdn.skypack.dev/gun";
import { createServer } from 'http';
import { readFile } from 'fs';
import { join } from 'path';

const server = createServer((req, res) => {
    if (req.url === '/') {
        const filePath ='./exp/gun_hello_origin.html';
        readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(8765);

const gun = GUN({ web: server });