const express = require('express')
const router = express.Router()
const sendEmailController = require('../Controllers/sendEmailController')

const imageUpload = require('../helpers/CadastroImage')


router.post('/form', sendEmailController.sendEmail )



module.exports =router