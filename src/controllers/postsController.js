import fs from "fs"
import { updateDBPost, createDBPost, getAllPosts } from "../models/postsModel.js"
import geminiDescriptionGenerator from "../services/geminiService.js"

export async function listPosts(req, res) {
    const posts = await getAllPosts()
    res.status(200).json(posts)
}

export async function createNewPost(req, res) {
    const newPost = req.body

    try {
        const createdPost = await createDBPost(newPost)
        res.status(200).json(createdPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ "Error": "Internal Server Error" })
    }
}

export async function uploadImg(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const createdPost = await createDBPost(newPost)
        const postedImg = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, postedImg)
        res.status(200).json(createdPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ "Error": "Internal Server Error" })
    }
}

export async function updatePost(req, res) {
    const id = req.params.id
    const urlImg = `http://localhost:3000/${id}.png`

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await geminiDescriptionGenerator(imgBuffer)
        const post = {
            imgUrl: urlImg,
            description: description,
            alt: req.body.alt
        }
        const createdPost = await updateDBPost(id, post)

        res.status(200).json(createdPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ "Error": "Internal Server Error" })
    }

    // try {
    //     const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    //     const descricao = await gerarDescricaoComGemini(imgBuffer)

    //     const post = {
    //         imgUrl: urlImagem,
    //         descricao: descricao,
    //         alt: req.body.alt
    //     }

    //     const postCriado = await atualizarPost(id, post);
    //     res.status(200).json(postCriado);  
    // } catch(erro) {
    //     console.error(erro.message);
    //     res.status(500).json({"Erro":"Falha na requisição"});
    // }
}