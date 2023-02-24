// 这个文件不是真正的入口，只是express demo
const express = require('express')
const app = express()
// const router= express.Router()

const indexRouter = require('./views/indexRouter')
const userRouter = require('./views/userRouter')
const fileRouter = require('./views/fileRouter')
const port = 3339

/**
 * use方法中，若忽略path参数
 * 则
 */
// app.use(express.json())
// app.use(express.urlencoded({ extended:false }))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/file', fileRouter)

app.get('what',(req,resp,next) =>{
    resp.send('我是what')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})