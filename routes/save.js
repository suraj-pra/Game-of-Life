const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.post('/', async function(req, res) {
    const client = new MongoClient('mongodb://localhost:27017/');

    try {
        const database = client.db("game-of-life");
        const patterns = database.collection("patterns");
        
        const query = { name: req.body.name };
        const options = {
            projection: { _id: 0, name: 1 }
        };
        const isExists = await patterns.findOne(query, options);
        
        if(isExists == null) {
            const pattern = {
                name: req.body.name,
                pattern: req.body.pattern
            }
            const result = await patterns.insertOne(pattern);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.sendStatus(201);
        }
        else {
            res.sendStatus(403);
        }
    } finally {
        await client.close();
    }
});

module.exports = router;
