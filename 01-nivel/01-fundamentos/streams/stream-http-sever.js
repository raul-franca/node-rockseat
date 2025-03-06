import http from 'node:http';

import { Transform } from 'node:stream';

class InversorNum extends Transform{
    _transform(chunk, encoding, callback){
        const n = parseInt(chunk.toString());
        const res = n * -1;
        console.log(res);
        callback(null, res.toString());
    }
}

const server = http.createServer((req, res) => {
    return req.pipe(new InversorNum()).pipe(res);
});

server.listen(3001);