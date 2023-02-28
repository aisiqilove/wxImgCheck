var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var axios = require('axios');
var router = express.Router();

var timer = setInterval(async () => {
  const url = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=';
  const data = {
    "msgtype": "text",
    "text": {
      "content": `${new Date()} 恰饭人 恰饭魂 恰饭都是人上人`,
      'mentioned_list': ["@all"],
    },
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  if(new Date().toLocaleString().includes('11:20:00'||'17:20:00')) {
    try {
      const res = await axios.post(url, data, { headers });
    } catch (err) {
      const res = await axios.post(url, data, { headers });
    }
  }
}, 5000)

/* GET users listing. */
router.get('/', async function (req, res, next) {

  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br>' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="upload your file">' +
    '</form>'
  );
});


module.exports = router;