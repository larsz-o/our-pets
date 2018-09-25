const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//template for all activity details posts
router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const reportData = req.body; 
        const query = `INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes", "time_start", "time_end", "poop_check", "medication_name") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`; 
        pool.query(query, [reportData.activity_id, reportData.pet_id, reportData.person_id, reportData.date, reportData.time, reportData.notes, reportData.time_start, reportData.time_end, reportData.poop_check, reportData.medications]).then((results)=> {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error posting report', error); 
            res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
});
//gets time and date of last time an activity happened for the dashboard view 
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const activity = req.query.activity;
        const pet = req.query.pet; 
        const query = `SELECT "time", "date" FROM "activity_details" WHERE "pet_id" = $1 AND "activity_id" = $2 ORDER BY "id" DESC LIMIT 1;`;
        pool.query(query, [pet, activity]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting activity history', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
}); 
//gets data for displaying in a chart on reports page
router.get('/data', (req, res) => {
    if(req.isAuthenticated){
    const petToGet = req.query.pet;
    const activity = req.query.activity; 
    console.log(petToGet, activity); 
    const query = `SELECT * FROM "activity_details" WHERE "activity_id" = $1 AND "pet_id" = $2;`; 
    pool.query(query, [activity, petToGet]).then((results) => {
        console.log(results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting activity data', error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
}
})

module.exports = router; 