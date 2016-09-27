var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  return User.findAll()
  .then(function(users) {
    res.render('users.html', {users: users})
  })
  .catch(next)
  })


router.get('/:userID', function(req, res, next) {
  return User.findAll()
  .then(function(users) {
    res.render('users.html', {users: users})
  })
  .catch(next)
  })


// router.get('/id', function(req, res, next) {
//   res.render('addpage')
// })


// router.get('/:urlTitle', function(req, res, next) {
//   return Page.findAll({
//     where: {
//       urlTitle: req.params.urlTitle
//     }
//   })
//   .then(function(foundPage) {
//   res.render('wikipage.html', {foundPage: foundPage});
// })
//   .catch(next);
// })


module.exports = router;
