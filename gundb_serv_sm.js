import Gun from 'gun';
import cors from 'cors';
import { createServer } from 'http';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Enable all CORS requests
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gun relay server');
});

server.listen(7654, () => {
    console.log('Gun relay started on port 7654');
});

const gun = Gun({
    web: server,
    peers: [], // Important: Leave this empty for a relay
    // Optional: configure other options as needed, like file storage
    // file: 'data.json', // Example: to persist data to a file
});