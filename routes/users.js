var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${}&secret=${}`, function (err, req, body) {
        
        if(!err) {
          const data = JSON.parse(body);
            console.log(data.access_token , 'access_token');
            res.status(200).jsonp(data); 
        }
        
    })
});

module.exports = router;