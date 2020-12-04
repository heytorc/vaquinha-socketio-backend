const { Router } = require('express');

const VaquinhaController = require('./controllers/VaquinhaController');

const routes = Router();

routes.get('/vaquinha', VaquinhaController.index);
routes.post('/vaquinha/store', VaquinhaController.store);

module.exports = routes;