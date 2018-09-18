const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('in pets post route'); 
    const petToAdd = req.body; 
    const query = `INSERT INTO "pets" ("name", "species_id", "birthday", "image_path", "household_id", "medications") VALUES ($1, 2, $3, $4, $5, $6);`; 
    for (let i = 0; i < petToAdd.pets.length; i ++) {
        let newPet = petToadd.pets[i]; 
        pool.query(query, [newPet.name, newPet.species_id, newPet.birthday, newPet.image_path, petToAdd.household_id, newPet.medications]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error posting new pets', error); 
        });
    }
}); 


module.exports = router;