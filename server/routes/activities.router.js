const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/fed', (req, res) => {
    console.log('in fed report router');
    const fedReport = req.body; 
    const query = `INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes") VALUES ($1, $2, $3, $4, $5, $6);`; 
    pool.query(query, [fedReport.activity_id, fedReport.pet_id, fedReport.person_id, fedReport.date, fedReport.time, fedReport.notes]).then((results)=> {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error posting fed report', error); 
        res.sendStatus(500); 
    })
})

module.exports = router; 