import fastify from "fastify";

const app = fastify();

app.get("/hello",()=>{
    return {message: "Hello world"}
});

app.listen({
    port: 3000,
    host: "localhost"
}).then(()=>{
    console.log("Server is running on http://localhost:3000");
})