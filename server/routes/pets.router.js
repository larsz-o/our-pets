const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//adding pets 
router.post('/', (req, res) => {
    if(req.isAuthenticated){
        const newPet = req.body; 
        console.log('pet to add', newPet);
        const query = `INSERT INTO "pets" ("name", "species_id", "birthday", "image_path", "household_id") VALUES ($1, $2, $3, $4, $5);`; 
            pool.query(query, [newPet.name, newPet.species_id, newPet.birthday, newPet.image_path, newPet.household_id]).then((results) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error posting new pets', error); 
                res.sendStatus(500); 
            });
    } else {
        res.sendStatus(403);
    }
}); 
//gets pets by household ID
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const householdId = req.query.id; 
        const query = `SELECT "pets"."id", "pets"."name", "pets"."species_id", "pets"."birthday", "pets"."image_path", "pets"."household_id" FROM "pets" JOIN "households" ON "pets"."household_id" = "households"."id" WHERE "households"."id" = $1;`;
        pool.query(query, [householdId]).then((results) => {
            res.send(results.rows); 
        }).catch((error) => {
            console.log('Error getting pets', error); 
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
router.get('/profile', (req, res) => {
    if(req.isAuthenticated){
    const pet = req.query.id;
    const query = `SELECT * FROM "pets" WHERE "id" = $1;`;
    pool.query(query, [pet]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting pet profile', error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
    }
})
//delete pet 
router.delete('/:id', (req, res) => {
    if(req.isAuthenticated){
        const petToDelete = req.params.id; 
        const query = `DELETE FROM "pets" WHERE "id" = $1;`;
        pool.query(query, [petToDelete]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error deleting pet', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
});
router.put('/', (req, res) => {
    if(req.isAuthenticated){
        const petToUpdate = req.body;
        const query = `UPDATE "pets" SET "image_path" = $1 WHERE "id" = $2;`;
        pool.query(query, [petToUpdate.image_path, petToUpdate.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error updating pet photo', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
})
module.exports = router;