const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//posts a new message 
router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const newMessage = req.body; 
        console.log(newMessage);
        const query = `INSERT INTO "inbox" ("sender", "receiver", "subject", "message", "date", "invitation") VALUES ($1, $2, $3, $4, $5, $6);`;
        pool.query(query, [ req.user.id, newMessage.receiver, newMessage.subject, newMessage.message, newMessage.date, newMessage.invitation]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error getting messages', error); 
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
});
//gets messages 
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "receiver", "message", "subject", "inbox"."id", "date", "first_name" as "sender", "archived", "invitation" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."sender" WHERE "receiver" = $1 AND "archived" = $2 AND "invitation" = $3;`;
        pool.query(query, [req.user.id, req.query.archived, req.query.invitation]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting messages', error); 
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403); 
    }
});
//gets all "sent" mesages by a user
router.get('/sent', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "receiver", "message", "subject", "inbox"."id", "date", "first_name" as "sender", "archived", "invitation" FROM "inbox" JOIN "person" ON "person"."id" = "inbox"."sender" WHERE "sender" = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting sent messages', error);
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403); 
    }
});
//archives read messages
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