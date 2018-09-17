const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in query get request');
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

/**
 * POST route template
 */
router.post('/createhousehold', (req, res) => {
    console.log('in create household post route');
    const householdToAdd = req.body;
    const query = `INSERT INTO "households" ("nickname, "person_id", "authorized") VALUES ($1, $2, $3);`;
    for (let i = 0; i < householdToAdd.users.length; i++){
        let userId = householdToAdd[i].person_id;
        let authorization = householdToAdd[i].authorized; 
        console.log(userId);
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