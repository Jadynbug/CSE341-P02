const routes = require('express').Router();
const Controller = require('../controllers/server');

routes.use('/', require('./swagger'));

routes.get('/characters', Controller.getData);

routes.post('/characters', Controller.postCharacter);


module.exports = routes;