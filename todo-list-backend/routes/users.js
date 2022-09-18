const express = require('express');
const service = require('../services/user-service')
const router = express.Router();
const { body } = require('express-validator');

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  res.send('respond with a resource');
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
