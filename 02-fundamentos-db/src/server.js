import http from 'node:http';
import { randomUUID } from 'node:crypto'
import {json} from "./middlewares/json.js";
import {Database} from "./database.js";


const database = new Database();

const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res);

    if (url === '/users' && method === 'POST') {
        if (!req.body) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid or missing JSON body' }));
        }

        const { nome, email } = req.body

        const user = {
            id: randomUUID(),
            nome: nome,
            email: email,
        }

        database.insert('users', user);

        res.statusCode = 201;
        return res.end(JSON.stringify(user));
    }

    if (url === '/users' && method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(database.select('users')));
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({
            status: 404,
            message: 'Not Found' }
        )
    );

});

server.listen(3000);