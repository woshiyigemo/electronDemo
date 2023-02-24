const express = require('express')
const fileRouter = express.Router()

fileRouter.get('/', async (req,resp,next) => {
    resp.send('文件首页')
})

fileRouter.get('/upload', async (req,resp,next) => {
    resp.send('上传页')
})


fileRouter.post('/download', async (req,resp,next) => {
    resp.send('下载页')
})

module.exports = fileRouter