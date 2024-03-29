const moongose = require('mongoose')


const Schema =  moongose.Schema

const ProductSchema = new Schema({
    image: {type: String, require: true},
    name: {type: String, require:true},
    description: {type: String, require: true},
    security_information: {type: Array, require: true},
    operational_information: {type: Array, require: true},
    technical_information: {type: Object, require: true},
    category: {type: String, require: true},
    


})


module.exports = moongose.model("Product", ProductSchema)