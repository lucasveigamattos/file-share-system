import express from "express"
import multer from "multer"
import path from "path"

import {getPDF, postPDF, deletePDF} from "../controllers/pdfs.js"
import uniqueSuffix from "../utils/uniqueSuffix.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, "public/assets/pdfs")
    },
    filename: function(request, file, cb) {
        const extension = path.extname(file.originalname)
        const fileNameWithoutExtension = path.basename(file.originalname, extension)

        cb(null, `${fileNameWithoutExtension} - ${uniqueSuffix()}${extension}`)
    }
})

const upload = multer({storage: storage})

router.get("/:id", getPDF)
router.post("/", upload.single("pdf"), postPDF)
router.delete("/:id", deletePDF)

export default router