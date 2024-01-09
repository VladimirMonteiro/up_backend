require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const path = require('path')
const app =  express()


const port = process.env.PORT || 8000


const conn = require('./db/conn')



const sendEmailRouter = require('./routes/FormContact')
const createProductRouter = require('./routes/Products')




app.use(cors({credentials:true, origin:'up-locations.vercel.app'}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))




app.use('/', sendEmailRouter)

app.use('/product', createProductRouter )




app.listen(port , () => {
    console.log(`servidor rodando na porta ${port}`)
    })


