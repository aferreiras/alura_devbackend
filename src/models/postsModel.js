import 'dotenv/config'
import { ObjectId } from "mongodb"
import connectToDB from "../config/dbConfig.js"

const connection = await connectToDB(process.env.STRING_CONEXAO)

export async function getAllPosts() {
    const db = connection.db("instabytes")
    const collection = db.collection("posts")

    return collection.find().toArray()
}

export async function createDBPost(newPost) {
    const db = connection.db("instabytes")
    const collection = db.collection("posts")

    return collection.insertOne(newPost)
}

export async function updateDBPost(id, newPost) {
    const db = connection.db("instabytes")
    const collection = db.collection("posts")
    const objId = ObjectId.createFromHexString(id)

    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newPost})
}