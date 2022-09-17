var express = require('express');
var service = require('../services/user-service')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {

  console.log(req.body)
  service.saveUser(req.body).then(savedEmail => {
    res.send(`User with email ${savedEmail} registered`)
  })
  
})

module.exports = router;
