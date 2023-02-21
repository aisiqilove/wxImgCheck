var express = require('express');
var multiparty = require('multiparty');
var util = require('util');
var FormData = require('form-data');
var fs = require('fs');
var axios = require('axios');
var { APPID, APPSECRET } = process.env;
var router = express.Router();

const isValid = async () => {
    const { AccessToken: { token, time, flag } } = global;

    if (token) {
        let oldTime = new Date(time).getTime();
        let newTime = new Date().getTime();
        let result = parseInt((newTime - oldTime) / 1000 / 60 / 60);
        console.log(result, 'time')
        if (result > 1 && !flag) {
            global.AccessToken.flag = true;
            return await getToken();
        }
    } else {
        return await getToken();
    }
}

const getToken = async () => {
    try {
        const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`);
        if (res?.data?.errcode) {
            global.AccessToken.token = '';
            global.AccessToken.time = '';
            global.AccessToken.flag = false;
            return '';
        }
        global.AccessToken.token = res?.data?.access_token;
        global.AccessToken.time = new Date().getTime();
        global.AccessToken.flag = false;
        return res.data.access_token;
    } catch (err) {
        global.AccessToken.token = '';
        global.AccessToken.time = '';
        global.AccessToken.flag = false;
        return '';
    }
}

const wxImgCheck = async (token, file) => {
    const url = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${token}`;
    const stream = fs.createReadStream(file.path);
    const form = new FormData();
    form.append('media', stream);

    const getHeaders = form => {
        return new Promise((resolve, reject) => {
            form.getLength((err, len) => {
                if (err) { reject(err); };
                const headers = Object.assign({ 'Content-Length': len, }, form.getHeaders());
                resolve(headers);
            });
        })
    }

    const headers = await getHeaders(form);
    const res = await axios.post(url, form, { headers });
    return res.data;
}


router.post('/', async function (req, res, next) {
    if (req.baseUrl === '/upload' && req.method === 'POST') {
        await isValid();
        var form = new multiparty.Form();

        form.parse(req, async function (err, fields, files) {

            try {
                const data = await wxImgCheck(global.AccessToken.token, files.upload[0]);
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({
                    code: 500,
                    message: err.message
                });
            }
        });

        return;
    }

});

module.exports = router;