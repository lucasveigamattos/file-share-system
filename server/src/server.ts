import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import {fileURLToPath} from "url"

import pdfRoutes from "./routes/pdfs.js"
import imageRoutes from "./routes/images.js"
import videoRoutes from "./routes/videos.js"

dotenv.config()
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use("/assets/pdfs", express.static(path.join(__dirName, "../public/assets/pdfs")))
app.use("/assets/images", express.static(path.join(__dirName, "../public/assets/images")))
app.use("/assets/videos", express.static(path.join(__dirName, "../public/assets/videos")))

app.use("/pdfs", pdfRoutes)
app.use("/images", imageRoutes)
app.use("/videos", videoRoutes)

app.listen(port, () => {
    console.log(`> Server running on port: ${port}`)
})