const express = require('express');
const app = express();
const port = 3000;
app.get('/', (request, response) => {
    response.send('Hola mund o desde express');
});

app.get('/contacto', (request, response) => {
    response.send('Contacto desde express   ');
});
app.listen(port, () => {
    console.log(`example app listening at http://localhost: ${port}`);
});

