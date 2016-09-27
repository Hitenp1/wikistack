var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  return Page.findAll()
  .then(function(pages) {
    console.log(pages);
    res.render('index.html', {pages: pages})
  })
  .catch(next)
  })


router.post('/', function(req, res, next) {

 User.findOrCreate({
  where: {
    name: req.body.name,
    email: req.body.email
  }
}).then(function(values) {
    var user = values[0];

    var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  return page.save().then(function(page) {
    return page.setAuthor(user);
  });

}).then(function(savedPage){res.redirect(savedPage.route);}).catch(next);

});


router.get('/add', function(req, res, next) {
	res.render('addpage')
})


router.get('/:urlTitle', function(req, res, next) {
  return Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage) {

    if(foundPage === null) {
      return next(new Error("Not Found!"))
    }

    return page.getAuthor().then(function(author){
      page.author = author;

    res.render('wikipage.html', {foundPage: foundPage});

    })   
})
  .catch(next);
})


module.exports = router;
