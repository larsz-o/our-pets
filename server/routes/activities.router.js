const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const reportData = req.body; 
    const query = `INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes", "time_start", "time_end", "poop_check") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`; 
    pool.query(query, [reportData.activity_id, reportData.pet_id, reportData.person_id, reportData.date, reportData.time, reportData.notes, reportData.time_start, reportData.time_end, reportData.poop_check, reportData.medication_name]).then((results)=> {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error posting fed report', error); 
        res.sendStatus(500); 
    })
})


module.exports = router; 