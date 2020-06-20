const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
// const proxyMiddleware = require('http-proxy-middleware')
// const proxyTable = require('./vue.config').devServer.proxy
const app = express()
const port = 3003

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

function resolveJsonFile(filePath) {
    return path.join(__dirname, filePath + '.json')
}

app.use(express.static(path.join(__dirname, './mock/images')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type, ACCESS-TOKEN');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})

app.use('/mock/*', function (req, res) {
    // 文件地址
    let filePath = resolveJsonFile(req.baseUrl);
    // 判断文件是否存在
    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.json({
                code: -1,
                message: '本地mock---请求接口不存在!!!'
            });
        } else {
            // 读取文件
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    res.json({
                        code: -1,
                        message: '本地mock---请求接口不存在!!!'
                    });
                } else {
                    res.send(data);
                }
            })
        }
    })
})

app.listen(port, function () {
    console.log('server start at ' + port)
});

module.exports = app;
