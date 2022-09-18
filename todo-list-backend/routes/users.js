const express = require('express');
const service = require('../services/user-service')
const sessionService = require('../services/session-service')
const router = express.Router();
const { body } = require('express-validator');

router.get('/', (req, res, next) => {  
  const session = req.session
  const user = service.getUser(session.userid)
  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`User with email ${session.userid} not founded`)
  }
});

router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  service.canUserLogin(email, password).then(async can => {
    if (can) {
      await sessionService.saveSession(email, req.session)
      res.send('Logged in')
    } else {
      res.status(400).send('Wrong password')
    }
  }).catch(e => {
    res.status(404).send(e)
  })
});

router.post('/register', body('email').isEmail(), (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send("Invalid email!")
  }

  service.createUser(req)
  .then(savedEmail => {
    res.send(`User with email ${savedEmail} registered`)
  })
  .catch(e => {
    res.status(400).send(e)
  })
})

module.exports = router;
