const smpt_config = require('../config/smtp')
const nodemailer = require('nodemailer')


module.exports = class sendEmailController {


    static sendEmail(req, res){

    const {name, tel, message} = req.body
    
    
    const transporter = nodemailer.createTransport({
        host: smpt_config.host,
        port: smpt_config.PT,
        secure:false,
        auth:{
            user: smpt_config.user,
            pass: smpt_config.pass
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    
    async function run () {
        const mailSent = await transporter.sendMail({
            text:'texto do email',
            subject: "Contato enviado pelo site",
            from: smpt_config.user,
            to: smpt_config.user,
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