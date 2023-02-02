const Product = require('../models/Product')

module.exports = class CreateProductController {

    static async create(req,res) {

        try { 
       
        const {name,description} = req.body
        console.log(req.file.filename)
    

        const createdProduct = new Product({
            image: req.file.filename,
            name,
            description
        })

        await createdProduct.save()

        res.status(201).json({message: "produto cadastrado com sucesso."})

        }catch(err){
            console.log(err)
            res.status(401).json({message: "Ocorreu um erro, tente mais tarde."})
        }  
       

    }
}