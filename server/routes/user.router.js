const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO person (username, password, first_name, phone_number) VALUES ($1, $2, $3, $4) RETURNING id';
  pool.query(queryText, [username, password, req.body.first_name, req.body.phone_number])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/household', (req, res) => {
  const userToAdd = req.body; 
  const query = `UPDATE "person" SET "household_id" = $1 WHERE "id" = $2;`;
  for (let i = 0; i < userToAdd.users.length; i++){
    let newUser = userToAdd.users[i]; 
    pool.query(query, [userToAdd.household_id, newUser.person_id]).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Error updating user', error); 
      res.sendStatus(500); 
    });
  }
});
router.put('/settings', (req, res) => {
  const settings = req.body; 
  const query = `UPDATE "person" SET "text_alert_litterbox" = $1, "text_alert_medications" = $2, "text_alert_walk" = $3, "text_alert_fed" = $4 WHERE "id" = $5;`;
  pool.query(query, [settings.text_alert_litterbox, settings.text_alert_medications, settings.text_alert_walk, settings.text_alert_fed, req.user.id]).then((results) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error updating notification settings', error);
    res.sendStatus(500); 
  });
})

module.exports = router;
