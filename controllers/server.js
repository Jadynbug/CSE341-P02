const mongodb = require('../db/connect');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const postError = "Missing field in post request";
const err = "Problem in controller";

const getData = async(req, res, next) => {
    console.log("in controllers");
    try {
        //console.log(req.query);
        let query = {};
        if(req.query) {
            query = req.query;
        }
        // console.log(query);
        const result = await mongodb.getDb().db('P02').collection('characters').find(query);
        console.log("got db");
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            console.log("header set");
            res.status(200).json(lists);
        });
    } catch {
        res.status(500).json(err);
    }
};

const getCharacterId = async (req, res, next) => {
    console.log('in get character by id');
    try {
        if(!req.params['_id']) {
            console.log('lack of _id error in get character by id');
            res.send(err);
        };
        let query = {'_id': new ObjectId(req.params['_id'])};

        console.log(query);
        const result = await mongodb.getDb().db('P02').collection('characters').find(query);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch {
        res.status(500).json(err);
    };
};

const postCharacter = async(req, res, next) => {
    console.log("in post character");
    try {
        if (!req.body['character-id'] || !req.body['name'] || !req.body['alias'] || !req.body['gender'] || !req.body['class'] || !req.body['race'] || !req.body['alignment'] || !req.body['ability-scores'] || !req.body['armor-class'] || !req.body['initiative'] || !req.body['hit-points'] || !req.body['skills'] || !req.body['saving-throws'] || !req.body['languages']) {
            console.log("There are things missing!!");
            res.status(400).json(postError);
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
        
    } catch {
        res.status(400).json(postError);
    };

}

const putChracter = async (req, res, next) => {
    console.log('in put character');
    try {
        if(!req.params['_id']) {
            console.log('lack of id error in put character');
            res.send(error);
        }
        let update = {};
        let id = {"_id": new ObjectId(req.params['_id'])};
        console.log(id);

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
        console.log(newValues);
        let result = await mongodb.getDb().db('CSE341').collection("contacts").updateOne(id, newValues);

        res.send(result).status(204);
    } catch {
        res.status(500).json(err);
    };
};

const deleteCharacter = async (req, res, next) => {
    console.log('in delete characters')
    try {
        if(!req.params['_id']) {
            console.log('lack of _id error in delete character');
            res.send(err);
        }
        let query = {'_id': new ObjectId(req.params['_id'])};
        console.log(query);
        let result = await mongodb.getDb().db('CSE341-P02').collection("characters").deleteOne(query);

        res.send(result).status(200);
    } catch {
        res.status(500).json(err);
    }
}


module.exports = {
    getData,
    getCharacterId,
    postCharacter,
    putChracter,
    deleteCharacter
};