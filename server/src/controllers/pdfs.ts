import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient()

async function getPDF(request: Request, response: Response) {
    const pdf = await prisma.pdf.findUniqueOrThrow({
        where: {
            id: request.params.id
        }
    })

    response.json({
        pdf
    })
}

async function postPDF(request: Request, response: Response) {
    const pdf = await prisma.pdf.create({
        data: {
            fileName: String(request.file?.filename)
        }
    })

    response.status(201).json({
        pdf,
        fileLink: `http://localhost:5173/pdfs/?id=${pdf.id}`
    })
}

async function deletePDF(request: Request, response: Response) {
    const pdf = await prisma.pdf.delete({
        where: {
            id: request.params.id
        }
    })

    fs.unlink(`./public/assets/pdfs/${pdf.fileName}`, (error) => {
        if (error) {
            console.error(error)
            response.status(500).json({error})
        }
    })

    response.json({
        pdf,
        message: "PDF deleted."
    })
}

export {
    getPDF,
    postPDF,
    deletePDF
}