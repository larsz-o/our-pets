
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// const uppy = require('./modules/uppy');

// Route includes
const userRouter = require('./routes/user.router');
const householdRouter = require('./routes/household.router');
const petsRouter = require('./routes/pets.router'); 
const activitiesRouter = require('./routes/activities.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/household', householdRouter);
app.use('/api/pets', petsRouter); 
app.use('/api/activities', activitiesRouter); 

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
