const express = require('express')
const router = express.Router()

const upload = require('../helpers/CadastroImage')

const createProductController = require('../Controllers/createProductController')



router.post('/created',upload.single('image'), createProductController.create)



module.exports = router