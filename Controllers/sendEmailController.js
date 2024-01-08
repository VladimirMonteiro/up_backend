const smpt_config = require('../config/smtp')
const nodemailer = require('nodemailer')


module.exports = class sendEmailController {


    static sendEmail(req, res){

    const {name, tel, message} = req.body
    
    
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.DOOR,
        secure:false,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    
    async function run () {
        const mailSent = await transporter.sendMail({
            text:'texto do email',
            subject: "Contato enviado pelo site",
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            html: `
            <html>
            <body>
              <strong>Nome: <strong>${name}<br>
              <strong>Telefone: <strong>${tel}<br>
              <strong>Mensagem: <strong> <br>${message}
            </body>
          </html> 
            
            `

        })

        console.log(mailSent)
    }

    run()


    res.status(201).json({message: `${name} ${tel}`})


    }
}