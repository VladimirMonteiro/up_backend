const express = require('express')
const router = express.Router()

const upload = require('../helpers/CadastroImage')

const ProductController = require('../Controllers/ProductController')



router.post('/created',upload.single('image'), ProductController.create)
router.get('/productdetails/:id', ProductController.getProductById)
router.get('/', ProductController.showProducts )



module.exports = router