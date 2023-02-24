const express = require('express')

const userRouter = express.Router()

userRouter.get('/account/register',(req, res, next) => {
    res.send('用户注册页')
})

userRouter.get('/account/info',(req, res, next) => {
    res.send('用户详情页')
})

module.exports = userRouter