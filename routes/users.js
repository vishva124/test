var express = require('express');
var router = express.Router();
var http=require('http');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

http.createServer(function(req,res){
  res.end();
})

module.exports = router;
