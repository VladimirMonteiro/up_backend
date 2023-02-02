const moongose = require('mongoose')


moongose.set('strictQuery', true)

async function main () {
    await moongose.connect(`mongodb+srv://doadmin:6c59O4rT8P0k2lS3@db-mongodb-nyc1-53693-a8a5c363.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-53693`)

    console.log('conctado com sucesso ao MongoDB')
}

main().catch((err => console.log(err)))


module.exports = main