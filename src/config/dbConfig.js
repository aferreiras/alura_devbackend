import { MongoClient } from "mongodb"

export default async function connectToDB(stringConexao){
    let mongoClient

    try {
        mongoClient = new MongoClient(stringConexao)
        console.log('Conectando ao cluster de banco de dados...')
        await mongoClient.connect()
        console.log('Conectado ao MongoDB Atlas com sucesso!')

        return mongoClient
    } catch (error) {
        console.error('Falha na conexão com o banco', error)
        process.exit()
    }
}