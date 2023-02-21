var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var router = express.Router();


/* GET users listing. */
router.get('/', async function(req, res, next) {
    
      // show a file upload form
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="upload your file">'+
        '</form>'
      );
});


module.exports = router;