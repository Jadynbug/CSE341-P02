const routes = require('express').Router();
const Controller = require('../controllers/server');

routes.use('/', require('./swagger'));

routes.get('/characters', Controller.getData);

routes.get('/characters/:_id', Controller.getCharacterId);

routes.post('/characters', Controller.postCharacter);

routes.put('/characters/:_id', Controller.putChracter);

routes.delete('/characters/:_id', Controller.deleteCharacter);


module.exports = routes;