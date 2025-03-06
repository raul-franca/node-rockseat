import http from 'node:http';
import {json} from "./middlewares/json.js";
import {routes} from "./routes/routes.js";
import {extractQueryParams} from "./utils/extract-query-params.js";





const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res);

    // Tenta encontrar a rota correspondente
    const route = routes.find(route => {
        // Verifica se o metodo e a URL da requisição correspondem a rotas definidas
        return route.method === method && route.url.test(url);
    });

    if(route) {
        const routeParams = req.url.match(route.url)

        const {query,...params} = routeParams.groups;

        req.params = params;
        req.query = query ? extractQueryParams(query) : {} ;

        return route.handled(req, res);
    }

    return res.writeHead(404, {'Content-Type': 'application/json'})
            .end(JSON.stringify({
                    status: 404,
                    message: 'route - Not Found'
                })
            );
});

server.listen(3000);

