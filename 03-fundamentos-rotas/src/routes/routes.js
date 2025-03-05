import { randomUUID } from 'node:crypto'
import {Database} from "../database.js";


const database = new Database();

export const routes = [
    {
        url : '/users',
        method : 'GET',
        handled : (req, res) => {

            res.writeHead(200, { 'Content-Type': 'application/json' });

            return res.end(JSON.stringify(database.select('users')));
        }
    },
    {
        url: '/users',
        method: 'POST',
        handled: (req, res) => {
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
    },

]
