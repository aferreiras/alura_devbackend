import express from "express"
import multer from "multer"
import cors from "cors"
import { createNewPost, listPosts, uploadImg, updatePost } from "../controllers/postsController.js"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// If running on Windows OS
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({dest:"./uploads", storage})

// If running on Linux
const upload = multer({dest:"./uploads"})

const routes = (app) => {
    app.use(express.json())
    app.use(cors(corsOptions))

    app.get("/posts", listPosts)
    app.post("/posts", createNewPost)
    app.post("/upload", upload.single("img"), uploadImg)
    app.put("/upload/:id", updatePost)
}

export default routes