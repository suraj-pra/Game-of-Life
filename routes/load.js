const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.get('/', async function(req, res) {
    const client = new MongoClient('mongodb://localhost:27017/');

    try {
        const database = client.db("game-of-life");
        const patterns = database.collection("patterns");
        
        const query = {};
        const options = {
          projection: { _id: 0, name: 1, pattern: 1 }
        };

        const pattern = patterns.find(query, options);
        
        var output = [];
        await pattern.forEach(el => output.push(el));

        res.send(output);
    } finally {
        await client.close();
    }
});

module.exports = router;
