import express from "express"
import multer from "multer"
import path from "path"

import {getVideo, postVideo, deleteVideo} from "../controllers/videos.js"
import uniqueSuffix from "../utils/uniqueSuffix.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, "public/assets/videos")
    },
    filename: function(request, file, cb) {
        const extension = path.extname(file.originalname)
        const fileNameWithoutExtension = path.basename(file.originalname, extension)

        cb(null, `${fileNameWithoutExtension} - ${uniqueSuffix()}${extension}`)
    }
})

const upload = multer({storage: storage})

router.get("/:id", getVideo)
router.post("/", upload.single("video"), postVideo)
router.delete("/:id", deleteVideo)

export default router