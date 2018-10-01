const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//template for all activity details posts
router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const reportData = req.body; 
        const query = `INSERT INTO "activity_details" ("activity_id", "pet_id", "person_id", "date", "time", "notes", "poop_check", "medication_name") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`; 
        pool.query(query, [reportData.activity_id, reportData.pet_id, reportData.person_id, reportData.date, reportData.time, reportData.notes, reportData.poop_check, reportData.medications]).then((results)=> {
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
//gets feeding and litterbox data for displaying in a table on reports page
router.get('/data', (req, res) => {
    if(req.isAuthenticated){
    const petToGet = req.query.pet;
    const activity = req.query.activity;
    const queryLimits = req.query.limit; 
    const query = `SELECT "pets"."name" as "pet_name", "time", "date", "person"."first_name" as "owner_name", "activities"."type" FROM "activity_details" JOIN "pets" ON "pets"."id" = "activity_details"."pet_id" JOIN "activities" ON "activities"."id" = "activity_details"."activity_id" JOIN "person" ON "activity_details"."person_id" = "person"."id" WHERE "activity_id" = $1 AND "pet_id" = $2 ORDER BY "date" DESC LIMIT $3;`; 
    pool.query(query, [activity, petToGet, queryLimits]).then((results) => {
        console.log(results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting feeding activity data', error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
}
});
//gets walking data for displaying in a table on reports page
router.get('/expandeddata', (req, res) => {
    if(req.isAuthenticated){
    const petToGet = req.query.pet;
    const activity = req.query.activity;
    const queryLimits = req.query.limit; 
    const query = `SELECT "pets"."name" as "pet_name", "time", "medication_name", "poop_check", "notes", "date", "person"."first_name" as "owner_name", "activities"."type" FROM "activity_details" JOIN "pets" ON "pets"."id" = "activity_details"."pet_id" JOIN "activities" ON "activities"."id" = "activity_details"."activity_id" JOIN "person" ON "activity_details"."person_id" = "person"."id" WHERE "activity_id" = $1 AND "pet_id" = $2 ORDER BY "date" DESC LIMIT $3;`; 
    pool.query(query, [activity, petToGet, queryLimits]).then((results) => {
        console.log(results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting feeding activity data', error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
}
});
module.exports = router; 