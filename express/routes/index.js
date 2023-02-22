var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ckeditor page. */
router.get('/ckeditor', function(req, res, next) {
  res.render('ckeditor', { title: 'CKEditor' });
});

module.exports = router;
