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
        const query = `SELECT "receiver", "message", "inbox"."id", "first_name" as "sender", "archived" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."sender" WHERE "receiver" = $1 AND "archived" = $2;`;
        pool.query(query, [req.user.id, req.query.archived]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
});
router.put('/', (req, res) => {
    if(req.isAuthenticated){
        const query = `UPDATE "inbox" SET "archived" = true WHERE "id" = $1;`; 
        pool.query(query, [req.body.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error archiving message', error); 
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
})
module.exports = router; 