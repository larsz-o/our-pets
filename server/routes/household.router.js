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
router.post('/', (req, res) => {

});

module.exports = router;