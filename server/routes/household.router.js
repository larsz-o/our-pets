const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this route gets existing users by their username to add to a household
router.get('/user', (req, res) => {
    if(req.isAuthenticated){
        const searchTerm = req.query;
        const query = `SELECT "username", "phone_number", "id" FROM "person" WHERE "username" ILIKE $1;`;
        pool.query(query, [searchTerm.username]).then((results) => {
            console.log(results.rows); 
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error retrieving user', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    } 
});
//gets the household_id of house by nickname 
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const searchTerm = req.query.nickname;
        console.log(searchTerm); 
        const query = `SELECT "id", "nickname" from "households" WHERE "nickname" ILIKE $1;`;
        pool.query(query, [searchTerm]).then((results) => {
            res.send(results.rows);
            console.log(results.rows); 
        }).catch((error) => {
            console.log('Error getting household ID', error); 
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
//gets the nickname of a household by id
router.get('/nickname', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "nickname" FROM "households" WHERE "id" = $1;`;
        pool.query(query, [req.user.household_id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting household nickname', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
// gets all members of a household by household_id
router.get('/members', (req, res) => {
    if(req.isAuthenticated){
        const queryParam = req.query.id; 
        console.log('in get household members', queryParam);
        const query = `SELECT "person"."id", "username", "first_name", "authorized", "phone_number", "role", "text_alert_walk", "text_alert_fed", "text_alert_litterbox", "text_alert_medications" FROM "person" JOIN "households" ON "households"."id" = "person"."household_id" WHERE "household_id" = $1;`;
        pool.query(query, [queryParam]).then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting household members', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
});
//changes an invited user to authorized once invitation is accepted
router.put('/accept', (req, res) => {
    if(req.isAuthenticated){
        const updates = req.body;
        const query = `UPDATE "person" SET "authorized" = $1 WHERE "id" = $2;`;
        pool.query(query, [updates.authorized, req.user.id]).then((results) => {
            res.sendStatus(200); 
        }).catch((error) => {
            console.log('Error authorizing user', error); 
            res.sendStatus(500); 
        });
        } else {
            res.sendStatus(403);
        }
    });
// posts a new household -- need to also do a put request to edit the req.user to authorized
router.post('/createhousehold', (req, res) => {
    if(req.isAuthenticated){
        const householdToAdd = req.body;
        const query = `INSERT INTO "households" ("nickname", "person_id") VALUES ($1, $2);`;
            pool.query(query, [householdToAdd.nickname, householdToAdd.person_id]).then((results) => {
                console.log(results); 
                res.sendStatus(200); 
            }).catch((error) => {
                console.log('Error posting household', error); 
                res.sendStatus(500); 
            });
        } else {
            res.sendStatus(403);
        }
    });
module.exports = router;