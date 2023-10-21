require('express-async-errors');
const mongodb = require('../db/connect');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const err = require('../error');



const getCharacter = async(req, res, next) => {
    console.log("in get character");
    try {
        //console.log(req.query);
        let query = {};
        if(req.query) {
            query = req.query;
        }
        // console.log(query);
        const result = await mongodb.getDb().db('P02').collection('characters').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    }
};

const getCharacterId = async (req, res, next) => {
    console.log('in get character by id');
    try {
        if(!req.params['_id']) {
            throw new err.lackOfID('lack of _id error in get character by id');
        };
        let query = {'_id': new ObjectId(req.params['_id'])};

        // console.log(query);
        const result = await mongodb.getDb().db('P02').collection('characters').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const postCharacter = async(req, res, next) => {
    console.log("in post character");
    try {
        if (!req.body['character-id'] || !req.body['name'] || !req.body['alias'] || !req.body['gender'] || !req.body['class'] || !req.body['race'] || !req.body['alignment'] || !req.body['ability-scores'] || !req.body['armor-class'] || !req.body['initiative'] || !req.body['hit-points'] || !req.body['skills'] || !req.body['saving-throws'] || !req.body['languages']) {
            throw new err.missingFields("There are required fields missing in post characters");
        };

        let newCharacter = {};

        newCharacter['character-id'] = req.body['character-id'];
        newCharacter.name = req.body['name'];
        newCharacter.alias = req.body['alias'];
        newCharacter.gender = req.body['gender'];
        newCharacter.class = req.body['class'];
        newCharacter.race = req.body['race'];
        newCharacter.alignment = req.body['alignment'];
        newCharacter['ability-scores'] = req.body['ability-scores'];
        newCharacter['armor-class'] = req.body['armor-class'];
        newCharacter.initiative = req.body['initiative'];
        newCharacter['hit-points'] = req.body['hit-points'];
        newCharacter.skills = req.body['skills'];
        newCharacter['saving-throws'] = req.body['saving-throws'];
        newCharacter.languages = req.body['languages'];

        // console.log(newCharacter);

        let collection = await mongodb.getDb().db('P02').collection("characters");
        
        let result = await collection.insertOne(newCharacter);
        res.send(result).status(201);
        
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };

};

const putCharacter = async (req, res, next) => {
    console.log('in put character');
    try {
        if(!req.params['_id']) {
            throw new err.lackOfID('lack of id error in put character');
        }
        let update = {};
        let id = {"_id": new ObjectId(req.params['_id'])};
        // console.log(id);

        if(req.body['character-id']) {update['character-id'] = req.body['character-id']};
        if(req.body.name) {update.name = req.body['name']};
        if(req.body.alias) {update.alias = req.body['alias']};
        if(req.body.gender) { update.gender = req.body['gender']};
        if(req.body.class) { update.class = req.body['class']};
        if(req.body.race) { update.race = req.body['race']};
        if(req.body.alignment) { update.alignment = req.body['alignment']};
        if(req.body['ability-scores']) { update['ability-scores'] = req.body['ability-scores']};
        if(req.body['armor-class']) { update['armor-class'] = req.body['armor-class']};
        if(req.body.initiative) { update.initiative = req.body['initiative']};
        if(req.body['hit-points']) { update['hit-points'] = req.body['hit-points']};
        if(req.body.skills) { update.skills = req.body['skills']};
        if(req.body['saving-throws']) { update['saving-throws'] = req.body['saving-throws']};
        if(req.body.languages) { update.languages = req.body['languages']};

        let newValues = {$set: update};
        // console.log(newValues);
        let result = await mongodb.getDb().db('P02').collection("characters").updateOne(id, newValues);

        res.send(result).status(204);
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const deleteCharacter = async (req, res, next) => {
    console.log('in delete characters');
    try {
        if(!req.params['_id']) {
            throw new err.lackOfID('lack of _id error in delete character');
        };
        let query = {'_id': new ObjectId(req.params['_id'])};
        // console.log(query);
        let result = await mongodb.getDb().db('P02').collection("characters").deleteOne(query);

        res.send(result).status(200);

    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const getWeapons = async(req, res, next) => {
    console.log("in get weapons");
    try {
        //console.log(req.query);
        let query = {};
        if(req.query) {
            query = req.query;
        };
        // console.log(query);
        const result = await mongodb.getDb().db('P02').collection('weapons').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const getWeaponsById = async(req, res, next) => {
    console.log("in get weapons by id");
    try {
        //console.log(req.query);
        if(!req.params['_id']) {
            throw new err.lackOfID("lack of id erro in get weapons by id");
        };
        let query = {'_id': new ObjectId(req.params['_id'])};
        // console.log(query);
        const result = await mongodb.getDb().db('P02').collection('weapons').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const postWeapon = async(req, res, next) => {
    console.log("in post weapon");
    try {
        // console.log(req.body);
        if (!req.body.name || !req.body['attack-bonus'] || !req.body['damage-type'] || !req.body['damage-amount']) {
            throw new err.missingFields("There are required fields missing in post weapons");
        };

        let newWeapon = {};

        newWeapon.name = req.body['name'];
        newWeapon['attack-bonus'] = req.body['attack-bonus'];
        newWeapon['damage-type'] = req.body['damage-type'];
        newWeapon['damage-amount'] = req.body['damage-amount'];


        console.log(newWeapon);

        let collection = await mongodb.getDb().db('P02').collection("weapons");
        
        let result = await collection.insertOne(newWeapon);
        res.send(result).status(201);
        
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const putWeapon = async (req, res, next) => {
    console.log('in put weapon');
    try {
        if(!req.params['_id']) {
            throw new err.lackOfID('lack of id error in put character');
        };
        let update = {};
        let id = {"_id": new ObjectId(req.params['_id'])};
        // console.log(id);

        if(req.body.name) {update.name = req.body['name']};
        if(req.body['attack-bonus']) { update['attack-bonus'] = req.body['attack-bonus']};
        if(req.body['damage-type']) { update['damage-type'] = req.body['damage-type']};
        if(req.body['damage-amount']) { update['damage-amount'] = req.body['damage-amount']};

        let newValues = {$set: update};
        // console.log(newValues);
        let result = await mongodb.getDb().db('P02').collection("weapons").updateOne(id, newValues);

        res.send(result).status(204);
    } catch(e) {
        res.status(e.statusCode).json(e.message);
    };
};

const deleteWeapon = async (req, res, next) => {
    console.log('in delete weapon')
    try {
        if(!req.params['_id']) {
            throw new err.lackOfID('lack of _id error in delete weapon');
        }
        let query = {'_id': new ObjectId(req.params['_id'])};
        // console.log(query);
        let result = await mongodb.getDb().db('P02').collection("weapons").deleteOne(query);

        res.send(result).status(200);

    } catch(e) {
        res.status(e.statusCode).json(e.message);
    }
}


module.exports = {
    getCharacter,
    getCharacterId,
    postCharacter,
    putCharacter,
    deleteCharacter,
    getWeapons,
    getWeaponsById,
    postWeapon,
    putWeapon,
    deleteWeapon
};