const http = require("http");
const servidor = http.createServer((request, response) => {
    if (request.url.includes("/contacto")) {
        response.end("Contacto");
    } else {
        console.log(request.url);
        response.end("Hola mundo");
    }
});
const port = 3000;
servidor.listen(port, () => {
    console.log(`http://localhost:${port}`);
});