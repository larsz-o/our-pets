const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this route gets existing users by their username to add to a household
router.get('/user', (req, res) => {
    console.log('in query get username request');
    const searchTerm = req.query;
    console.log(searchTerm); 
    const query = `SELECT "username", "id" FROM "person" WHERE "username" ILIKE $1;`;
    pool.query(query, [searchTerm.username]).then((results) => {
        console.log(results.rows); 
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error retrieving user', error);
        res.sendStatus(500);
    }); 
});
//gets the household_id of house by nickname 
router.get('/', (req, res) => {
    console.log('in query get houseID request');
    const searchTerm = req.query.nickname;
    console.log(searchTerm); 
    const query = `SELECT "id" from "households" WHERE "nickname" ILIKE $1;`;
    pool.query(query, [searchTerm]).then((results) => {
        res.send(results.rows);
        console.log(results.rows); 
    }).catch((error) => {
        console.log('Error getting household ID', error); 
        res.sendStatus(500);
    });
});
//gets the nickname of a household by id
router.get('/nickname', (req, res) => {
    console.log('in get household nickname route');
    const query = `SELECT "nickname" FROM "households" WHERE "id" = $1;`;
    pool.query(query, [req.user.household_id]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting household nickname', error);
        res.sendStatus(500);
    });
})
// gets all members of a household by household_id
router.get('/members', (req, res) => {
    const queryParam = req.query.id; 
    const query = `SELECT "person"."id", "username", "first_name" FROM "person" WHERE "household_id" = $1;`;
    pool.query(query, [queryParam]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting household members', error); 
        res.sendStatus(500); 
    });
});
//changes an invited user to authorized once invitation is accepted
router.put('/accept', (req, res) => {
    const updates = req.body;
    const query = `UPDATE "households" SET "authorized" = $1 WHERE "person_id" = $2 AND "id" = $3;`;
    pool.query(query, [updates.authorized, req.user.id, updates.household_id]).then((results) => {
        res.sendStatus(200); 
    }).catch((error) => {
        console.log('Error udpating household', error); 
        res.sendStatus(500); 
    });
})
// posts a new household 
router.post('/createhousehold', (req, res) => {
    const householdToAdd = req.body;
    const query = `INSERT INTO "households" ("nickname", "person_id", "authorized") VALUES ($1, $2, $3);`;
        pool.query(query, [householdToAdd.nickname, householdToAdd.person_id, householdToAdd.authorized]).then((results) => {
            console.log(results); 
            res.sendStatus(200); 
        }).catch((error) => {
            console.log('Error posting household', error); 
            res.sendStatus(500); 
        });
});

module.exports = router;