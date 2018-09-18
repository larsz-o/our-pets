const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/user', (req, res) => {
    console.log('in query get userId request');
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
router.get('/house', (req, res) => {
    console.log('in query get houseID request');
    const searchTerm = req.query.houseid;
    console.log(searchTerm); 
    const query = `SELECT "id" from "households" WHERE "nickname" ILIKE $1;`;
    pool.query(query, [searchTerm]).then((results) => {
        res.send(results.rows);
        console.log(results.rows); 
    }).catch((error) => {
        console.log('Error getting household ID', error); 
        res.sendStatus(500);
    });
})

/**
 * POST route template
 */
router.post('/createhousehold', (req, res) => {
    console.log('in create household post route');
    const householdToAdd = req.body;
    console.log('householdtoAdd:', householdToAdd); 
    const query = `INSERT INTO "households" ("nickname", "person_id", "authorized") VALUES ($1, $2, $3);`;
    for (let i = 0; i < householdToAdd.users.length; i++){
        let userId = householdToAdd.users[i].person_id;
        console.log('householdToAdd.users[i].person_id:', householdToAdd.users[i].person_id); 
        let authorization = householdToAdd.users[i].authorized; 
        pool.query(query, [householdToAdd.nickname, userId, authorization]).then((results) => {
            console.log(results); 
            res.sendStatus(200); 
        }).catch((error) => {
            console.log('Error posting household', error); 
            res.sendStatus(500); 
        });
    }
});

module.exports = router;