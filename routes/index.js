const routes = require('express').Router();
const Controller = require('../controllers/server');
const validation = require('../middleware/validate');
const {ensureAuth, ensureGuest} = require('../middleware/auth');

//landing page
routes.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
});

//dashboard
routes.get('/dashboard', ensureAuth, (req, res) => {
    console.log('in dashboard route');
    res.render('dashboard'); 
})


routes.use('/', require('./swagger'));

routes.get('/characters', Controller.getCharacter);

routes.get('/characters/:_id', Controller.getCharacterId);

routes.post('/characters', validation.saveCharacter, Controller.postCharacter);

routes.put('/characters/:_id', validation.saveCharacter, Controller.putCharacter);

routes.delete('/characters/:_id', Controller.deleteCharacter);

routes.get('/weapons', Controller.getWeapons);

routes.get('/weapons/:_id', Controller.getWeaponsById);

routes.post('/weapons', validation.saveWeapon, Controller.postWeapon);

routes.put('/weapons/:_id', validation.saveWeapon, Controller.putWeapon);

routes.delete('/weapons/:_id', Controller.deleteWeapon);


module.exports = routes;