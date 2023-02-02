const moongose = require('mongoose')

moongose.set('strictQuery', true)

async function main () {
    await moongose.connect(`mongodb+srv://${process.env.DB_USER_DEV}:${process.env.DB_PASSWORD_DEV}@up.wzrjx02.mongodb.net/?retryWrites=true&w=majority`)

    console.log('conctado com sucesso ao MongoDB')
}

main().catch((err => console.log(err)))


module.exports = main