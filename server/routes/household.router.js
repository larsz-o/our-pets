const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this route gets existing users by their username to add to a household
router.get('/user', (req, res) => {
    if(req.isAuthenticated){
        const searchTerm = req.query;
        const query = `SELECT "username", "phone_number", "id", "first_name" FROM "person" WHERE "username" ILIKE $1;`;
        pool.query(query, [searchTerm.username]).then((results) => {
            console.log(results.rows); 
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error retrieving user', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    } 
});
//gets the household_id of house by nickname 
router.get('/', (req, res) => {
    if(req.isAuthenticated){
        const searchTerm = req.query.nickname;
        console.log(searchTerm); 
        const query = `SELECT "id", "nickname" from "households" WHERE "nickname" ILIKE $1;`;
        pool.query(query, [searchTerm]).then((results) => {
            res.send(results.rows);
            console.log(results.rows); 
        }).catch((error) => {
            console.log('Error getting household ID', error); 
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
//gets the nickname of a household by id
router.get('/nickname', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "nickname" FROM "households" WHERE "id" = $1;`;
        pool.query(query, [req.user.household_id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting household nickname', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
// gets all members of a household by household_id
router.get('/members', (req, res) => {
    if(req.isAuthenticated){
        const queryParam = req.query.id; 
        console.log('in get household members', queryParam);
        const query = `SELECT "person"."id", "username", "first_name", "household_members"."authorized", "phone_number", "role", "text_alert_walk", "text_alert_fed", "text_alert_litterbox", "text_alert_medications" FROM "person" JOIN "household_members" ON "household_members"."member" = "person"."id" WHERE "household_members"."household_id" = $1;`;
        pool.query(query, [queryParam]).then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting household members', error); 
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
});
//gets all members from all shared households
router.get('/members/all', (req, res) => {
    if(req.isAuthenticated){
        const id = req.query.id;
        const query = `SELECT "household_members"."household_id", "username", "first_name" FROM "household_members" JOIN "person" ON "person"."id" = "household_members"."member" WHERE "household_members"."household_id" = $1;`;
        pool.query(query, [id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting members', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403); 
    }
})
//gets all households that a user is part of
router.get('/all', (req, res) => {
    if(req.isAuthenticated){
        const query = `SELECT "household_id", "nickname" FROM "household_members" JOIN "households" ON "household_members"."household_id" = "households"."id" WHERE "member"  = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error getting user households', error);
            res.sendStatus(500); 
        });
    } else {
        res.sendStatus(403);
    }
})
//the route to add multiple users to a household upon household creation, requires adding information about role and authorization
router.post('/addmembers', (req, res) => {
    if(req.isAuthenticated){
      const userToAdd = req.body; 
      const query = `INSERT INTO "household_members" ("household_id", "authorized", "member") VALUES ($1, $2, $3);`;
      for (let i = 0; i < userToAdd.users.length; i++){
        let newUser = userToAdd.users[i]; 
        pool.query(query, [userToAdd.household_id, newUser.authorized, newUser.person_id]).then((result) => {
          res.sendStatus(200);
        }).catch((error) => {
          console.log('Error updating user', error); 
          res.sendStatus(500); 
        });
      }
    } else {
      res.sendStatus(403);
    }
  });
// posts a new household 
router.post('/createhousehold', (req, res) => {
    if(req.isAuthenticated){
        const householdToAdd = req.body;
        const query = `INSERT INTO "households" ("nickname", "person_id") VALUES ($1, $2);`;
            pool.query(query, [householdToAdd.nickname, householdToAdd.person_id]).then((results) => {
                console.log(results); 
                res.sendStatus(200); 
            }).catch((error) => {
                console.log('Error posting household', error); 
                res.sendStatus(500); 
            });
        } else {
            res.sendStatus(403);
        }
    });
//changes an invited user to authorized once invitation is accepted
router.put('/accept', (req, res) => {
    if(req.isAuthenticated){
        const updates = req.body;
        const query = `UPDATE "household_members" SET "authorized" = $1 WHERE "member" = $2;`;
        pool.query(query, [updates.authorized, req.user.id]).then((results) => {
            res.sendStatus(200); 
        }).catch((error) => {
            console.log('Error authorizing user', error); 
            res.sendStatus(500); 
        });
        } else {
            res.sendStatus(403);
        }
    });
router.put('primary', (req, res) => {
    if(req.isAuthenticated){
        const query = `UPDATE "household_members" SET "primary" = true WHERE "person_id" = $1;`;
        pool.query(query, [req.user.id]).then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error setting primary household', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})
router.put('/removefrom', (req, res) => {
    if(req.isAuthenticated && req.user.role === 1){
          const userToRemove = req.body; 
          const query = `DELETE FROM "household_members" WHERE "member" = $2;`; 
          pool.query(query, [userToRemove.id]).then((results) => {
            res.sendStatus(200);
          }).catch((error) => {
            console.log('Error removing user', error); 
            res.sendStatus(500); 
          });
        } else {
          res.sendStatus(403); 
        }
      })
module.exports = router;