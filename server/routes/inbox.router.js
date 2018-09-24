const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const newMessage = req.body; 
        console.log(newMessage);
        const query = `INSERT INTO "inbox" ("sender", "receiver", "message", "date") VALUES ($1, $2, $3, $4);`;
        pool.query(query, [ req.user.id, newMessage.receiver, newMessage.message, newMessage.date]).then((results) => {
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
        const query = `SELECT "receiver", "message", "inbox"."id", "date", "first_name" as "sender", "archived" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."sender" WHERE "receiver" = $1 AND "archived" = $2;`;
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