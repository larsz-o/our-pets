const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('in pets post route'); 
    const petToAdd = req.body; 
    const query = `INSERT INTO "pets" ("name", "species_id", "birthday", "image_path", "household_id", "medications", "feeding", "litterbox", "walking") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`; 
    for (let i = 0; i < petToAdd.pets.length; i ++) {
        let newPet = petToAdd.pets[i]; 
        console.log(newPet);
        pool.query(query, [newPet.pet_name, newPet.species_id, newPet.birthday, newPet.image_path, petToAdd.household_id, newPet.medications, newPet.feeding, newPet.litterbox, newPet.walking]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error posting new pets', error); 
            res.sendStatus(500); 
        });
    }
}); 
//gets pets by household ID
router.get('/', (req, res) => {
    console.log('in pets get route'); 
    const householdId = req.query.id; 
    console.log(householdId); 
    const query = `SELECT "pets"."name", "pets"."image_path", "medications", "feeding", "litterbox", "walking" FROM "pets" JOIN "households" ON "pets"."household_id" = "households"."id" WHERE "households"."id" = $1;`;
    pool.query(query, [householdId]).then((results) => {
        res.send(results.rows); 
    }).catch((error) => {
        console.log('Error getting pets', error); 
        res.sendStatus(500);
    })
})

module.exports = router;