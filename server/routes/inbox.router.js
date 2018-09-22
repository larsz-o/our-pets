const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const newMessage = req.body; 
        const query = `INSERT INTO "inbox" ("sender", "receiver", "message") VALUES ($1, $2, $3);`;
        pool.query(query, [newMessage.sender, newMessage.receiver, newMessage.message]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
});
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "receiver", "message", "inbox"."id", "first_name" as "sender" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."sender" WHERE "receiver" = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
});

module.exports = router; 