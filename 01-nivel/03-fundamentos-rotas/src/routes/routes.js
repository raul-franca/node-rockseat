import { randomUUID } from 'node:crypto'
import {Database} from "../database.js";
import {buildRoutePath} from "../utils/build-route-path.js";


const database = new Database();

export const routes = [
    // GET /users
    {
        url: buildRoutePath('/users'),
        method : 'GET',
        handled : (req, res) => {

            const {search} = req.query;
            const users = database.select('users', search ? {
                nome: search
            } : null)

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));

        }
    },
    // GET /users/:id
    {
        url : buildRoutePath('/users/:id'),
        method : 'GET',
        handled : (req, res) => {
            console.log("GET /users/:id");
            const { id } = req.params;
            const user = database.select('users').find(user => user.id === id);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.statusCode = 200;
                return res.end(JSON.stringify(
                {
                        user: user,
                        status: 200
                    })
                );
            }

        }
    },
    // POST /users
    {
        url: buildRoutePath('/users'),
        method: 'POST',
        handled: (req, res) => {
            if (!req.body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    status: 400,
                    message: 'Invalid or missing JSON body'
                }));
            }

            const { nome, email } = req.body

            const user = {
                id: randomUUID(),
                nome: nome,
                email: email,
            }

            database.insert('users', user);

            res.statusCode = 201;
            return res.end(JSON.stringify(
                {
                    status: 201,
                    message: 'User created',
                    user: user
                })
            );
        }
    },
    // PUT /users/:id
    {
        url: buildRoutePath('/users/:id'),
        method: 'PUT',
        handled: (req, res) => {
            const { id } = req.params;
            const { nome, email } = req.body;

            const user = database.select('users').find(user => user.id === id);

            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(
                    {
                        status: 404,
                        message: 'User not found'
                    })
                );
            }

            user.nome = nome;
            user.email = email;

            database.update('users', user);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(
                {
                    status: 200,
                    message: 'User updated',
                    user: user
                })
            );
        }
    },
    {
        url: buildRoutePath('/users/:id'),
        method: 'DELETE',
        handled: (req, res) => {
            console.log("DELETE /users/:id");
            const { id } = req.params;

            const user = database.select('users').find(user => user.id === id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(
                    {
                        status: 404,
                         message: 'User not found'
                    })
                );
            }

            database.delete('users', id);

            res.writeHead(204);
            return res.end(
                {
                    statusCode: 204,
                    message: 'User deleted',
                    user: JSON.stringify(user)
                }
            );

        }
    }
    

]
