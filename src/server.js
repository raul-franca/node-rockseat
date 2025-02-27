import http from 'node:http';

const users = [];
let cont = 0;
const server = http.createServer((req, res) => {

    const { url, method } = req;

    if (url === '/users' && method === 'POST') {
        cont++;
        users.push({ name: 'User '+ cont });

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return  res.end(JSON.stringify(users));

    }

    if (url === '/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(users));
    }

});


server.listen(3000);