const moongose = require('mongoose')


moongose.set('strictQuery', false)


async function main () {
    await moongose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@up.wzrjx02.mongodb.net/?retryWrites=true&w=majority`)

    console.log('conctado com sucesso ao MongoDB')
}

main().catch((err => console.log(err)))


module.exports = main
