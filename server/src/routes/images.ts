import express from "express"
import multer from "multer"
import path from "path"

import {getImage, postImage, deleteImage} from "../controllers/images.js"
import uniqueSuffix from "../utils/uniqueSuffix.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, "public/assets/images")
    },
    filename: function(request, file, cb) {
        const extension = path.extname(file.originalname)
        const fileNameWithoutExtension = path.basename(file.originalname, extension)
        
        cb(null, `${fileNameWithoutExtension} - ${uniqueSuffix()}${extension}`)
    }
})

const upload = multer({storage: storage})

router.get("/:id", getImage)
router.post("/", upload.single("image"), postImage)
router.delete("/:id", deleteImage)

export default router