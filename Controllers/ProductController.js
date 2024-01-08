const Product = require('../models/Product')

module.exports = class ProductController {

    static async create(req,res) {

        const {name,description, security_information, operational_information, technical_information, category} = req.body
       

        const createdProduct = new Product({
            image: req.file.filename,
            name,
            description,
            security_information,
            operational_information,
            technical_information,
            category


        })

        try { 
       
    

        await createdProduct.save()

        res.status(201).json({message: "produto cadastrado com sucesso."})

        }catch(err){
            console.log(err)
            res.status(401).json({message: "Ocorreu um erro, tente mais tarde."})
        }  
       

    }

    static async showProducts(req, res) {

        try {
            const products = await Product.find()

            res.status(200).json(products)
            
        } catch (error) {
            console.log(err)
            res.status(401).json({message: 'Houve um problema, tente mais tarde!'})
            
        }
    }

    static async getProductById(req,res){

        const {id} = req.params


        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
            
        } catch (error) {
            console.log(error)
            res.status(422).json({message: error})
            
        }

        


    }
}