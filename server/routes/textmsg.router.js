const express = require('express');
const router = express.Router();
const SID = process.env.TWILIO_SID;
const TOKEN = process.env.TWILIO_TOKEN;
const SENDER = process.env.TWILIO_SENDER
const twilio = require('twilio');
const client = new twilio(SID, TOKEN);

router.post('/', (req, res) => {
    if(!SID || !TOKEN) {
      return res.json({message: 'add TWILIO_SID and TWILIO_TOKEN to .env file.'})
    }
    client.messages.create({
      to: req.body.number,
      from: SENDER,
      body: req.body.message
    }).then((message) => {
        console.log(message.sid);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error with text', error);
        res.sendStatus(500); 
    });
});

module.exports = router; 