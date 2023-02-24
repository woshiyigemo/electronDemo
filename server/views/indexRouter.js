const express = require('express')
const indexRouter = express.Router()

// 洋葱模型中的中间件使用
indexRouter.get('/', async (req,resp,next) => {
    // resp.send('我是首页, Hello Express')
    // console.log('我是首页, Hello Express')
    next()
    // console.log(`${req.superMsg}`)
    resp.send(`${req.superMsg}`)
})

indexRouter.get('/', async (req,resp,next) => {
    // resp.send('我是首页的第二个中间件')
    console.log('我是首页的第二个中间件, Hello Express End')
    req.superMsg = '我是首页的第二个中间件, Hello Express End'
})


indexRouter.get('/get', async (req,resp,next) => {
    console.log(113,req.query)
    resp.send(
        `获取到的参数:${JSON.stringify({
            ...req.query
        })}`
    )
})


indexRouter.post('/indexpageinfo', async (req,resp,next) => {
    resp.send('index page info')
})

module.exports = indexRouter