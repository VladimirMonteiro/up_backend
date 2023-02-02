require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const path = require('path')
const app =  express()


const port = process.env.PORT || 8000


const conn = require('./db/conn')
const Product = require('./models/Product')


const sendEmailRouter = require('./routes/FormContact')
const createProductRouter = require('./routes/createProduct')



app.use('/files',express.static(path.resolve(__dirname,'public', "images")))
app.use(cors({credentials:true, origin: process.env.ORIGIN}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())




app.use('/', sendEmailRouter)

app.use('/product', createProductRouter )


app.get('/products', async (req,res)=> {

    
    await Product.find().then((products) => {
        
        return res.json({erro: false, products, url: process.env.URL_PRODUCTS })

    }).catch(err => console.log(err))
  


  




})






    app.listen(port , () => {
        console.log(`servidor rodando na porta ${port}`)
     })


