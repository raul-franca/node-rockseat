import http from 'node:http';
import {json} from "./middlewares/json.js";
import {routes} from "./routes/routes.js";



const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.url === url
    });

    if(route) {
        return route.handled(req, res);
    }

    return res.writeHead(404, {'Content-Type': 'application/json'})
            .end(JSON.stringify({
                    status: 404,
                    message: 'Not Found'
                }));

});

server.listen(3000);