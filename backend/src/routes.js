const express = require('express');

const routes = express.Router();

const categoriaController = require('./controllers/categoriaController');
const userController = require('./controllers/userController');
const setoresController = require('./controllers/setoresController');
const servicosController = require('./controllers/servicosController');
const detalheCategoriaController = require('./controllers/detalheCategoriaController');
const historicoController = require('./controllers/historicoController');

//categorias
routes.post('/categorias/criar', categoriaController.create);
routes.get('/categorias/lista', categoriaController.index);
routes.delete('/categorias/remover/:id', categoriaController.delete);

//detalhe_categoria
routes.post('/patrimonio/cadastro', detalheCategoriaController.create);
routes.get('/patrimonio/:id', detalheCategoriaController.index);
routes.get('/patrimonios/lista/setor/:id', detalheCategoriaController.count);
routes.get('/patrimonios/lista/categoria/:id', detalheCategoriaController.index2);

//usuarios
routes.post('/usuarios/cadastro', userController.create);
routes.get('/usuarios/lista', userController.index);
routes.post('/login', userController.login);

//setores
routes.get('/setores/lista', setoresController.index);

//servicos
routes.post('/servicos/novo', servicosController.create);
routes.get('/servicos/categoria/:id', servicosController.index);
routes.delete('/servicos/remover/:id', servicosController.delete);

//chamados
routes.post('/chamados/cadastro', historicoController.create);
routes.post('/chamados/concluir', historicoController.update);
routes.get('/chamados/chamados_concluidos', historicoController.indexOPen);
routes.get('/chamados/chamados_abertos', historicoController.indexClose);
routes.get('/chamados/historico/:id', historicoController.registers);

module.exports = routes;