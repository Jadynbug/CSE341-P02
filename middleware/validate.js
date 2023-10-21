const validator = require('../helpers/validate');

const saveCharacter = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        alias: 'required|string',
        gender: 'required|string',
        class: {
            name: "required|string",
            level: "required|integer"
        },
        race: 'required|string',
        alignment: 'required|string',
        'ability-scores': 'required|array',
        'armor-class': 'required|integer',
        initiative: 'required|integer',
        'hit-points': 'required|integer',
        skills: 'required|array',
        'saving-throws': 'required|array',
        languages: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed in save character",
                data: err
            });
        } else {
            next();
        };
    });
};

const saveWeapon = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        'attack-bonus': 'required|string',
        'damage-type': 'required|string',
        'damage-amount': 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: "validation falled in save weapon",
                data: err
            });
        } else {
            next();
        };
    });
};

module.exports = {
    saveCharacter,
    saveWeapon
}