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

const postCharacter = async(req, res, next) => {
    console.log("in post character");
    try {
        if (!req.body['character-id'] || !req.body['name'] || !req.body['alias'] || !req.body['gender'] || !req.body['class'] || !req.body['race'] || !req.body['alignment'] || !req.body['ability-scores'] || !req.body['armor-class'] || !req.body['initiative'] || !req.body['hit-points'] || !req.body['skills'] || !req.body['saving-throws'] || !req.body['languages']) {
            console.log("There are things missing!!");
            res.status(400).json(postError);
        }

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



module.exports = {
    getData,
    postCharacter
}