require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const path = require('path')
const app =  express()
const helmet = require('helmet')


const port = process.env.PORT || 8000


const conn = require('./db/conn')



const sendEmailRouter = require('./routes/FormContact')
const createProductRouter = require('./routes/Products')




app.use(cors({credentials:true, origin:'*'}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())

app.use((req, res, next) => {
    // Adiciona o cabeçalho X-Content-Type-Options à resposta
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });




app.use('/', sendEmailRouter)

app.use('/product', createProductRouter )




app.listen(port , () => {
    console.log(`servidor rodando na porta ${port}`)
    })


