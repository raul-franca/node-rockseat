// Importa o módulo nativo 'http' do Node.js para criar um servidor HTTP.
import http from 'node:http';

// Cria um array vazio que será usado para armazenar os usuários.
// OBS: Como os dados estão apenas em memória, eles serão perdidos ao reiniciar o servidor.
const users = [];

// Cria o servidor HTTP utilizando a função createServer.
// O callback é assíncrono para permitir operações assíncronas, como a leitura do corpo da requisição.
const server = http.createServer(async (req, res) => {
    // Desestrutura as propriedades 'url' e 'method' do objeto de requisição (req).
    const { url, method } = req;

    // Cria um array que servirá como buffer para armazenar os pedaços (chunks) do corpo da requisição.
    const buffer = [];

    // Loop assíncrono para ler cada pedaço da requisição conforme ele chega.
    // Cada 'chunk' é adicionado ao array 'buffer'.
    for await (const chunk of req) {
        buffer.push(chunk);
    }

    try {
        // Tenta fazer o parse do JSON a partir dos pedaços armazenados no buffer.
        req.body = JSON.parse(Buffer.concat(buffer).toString());

    } catch (error) {
        // Se ocorrer um erro ao fazer o parse do JSON (por exemplo, JSON inválido),
        // define req.body como null para evitar erros posteriores.
        req.body = null;
    }

    // Rota para criação de um novo usuário (POST /users).
    if (url === '/users' && method === 'POST') {
        // Verifica se o corpo da requisição foi corretamente enviado e parseado.
        if (!req.body) {
            // Se não houver corpo ou ele for inválido, responde com erro 400 (Bad Request)
            // e retorna uma mensagem de erro no formato JSON.
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid or missing JSON body' }));
        }

        // Desestrutura as propriedades 'nome' e 'email' do corpo da requisição.
        const { nome, email } = req.body;

        // Adiciona um novo objeto usuário ao array 'users', com um id incremental.
        users.push({
            id : users.length + 1, // Define o id com base no tamanho atual do array.
            nome: nome,            // Armazena o nome do usuário.
            email: email,          // Armazena o e-mail do usuário.
        });

        // Responde com status 201 (Created) e retorna o array atualizado de usuários em JSON.
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(users));
    }

    // Rota para retornar a lista de usuários (GET /users).
    if (url === '/users' && method === 'GET') {
        // Responde com status 200 (OK) e envia o array de usuários em formato JSON.
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(users));
    }

    // Caso a rota ou metodo não seja encontrado, responde com status 404 (Not Found) e uma mensagem de erro.
    res.writeHead(404, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({
            status: 404,
            message: 'Not Found' }
        )
    );

});

// Inicia o servidor e faz com que ele escute na porta 3000.
server.listen(3000);