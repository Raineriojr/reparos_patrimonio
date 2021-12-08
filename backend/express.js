const express = require('express');
const routes = require('./src/routes');

const App = express();

App.use(express.json());
App.use(routes);

App.listen(3333, () => {
    console.log('rodando na porta 3333');
})
