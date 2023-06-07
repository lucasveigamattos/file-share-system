import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient()

async function getImage(request: Request, response: Response) {
    const image = await prisma.image.findUniqueOrThrow({
        where: {
            id: request.params.id
        }
    })

    response.json({
        image
    })
}

async function postImage(request: Request, response: Response) {
    const image = await prisma.image.create({
        data: {
            fileName: String(request.file?.filename)
        }
    })

    response.status(201).json({
        image,
        fileLink: `http://localhost:5173/images/?id=${image.id}`
    })
}

async function deleteImage(request: Request, response: Response) {
    const image = await prisma.image.delete({
        where: {
            id: request.params.id
        }
    })

    fs.unlink(`./public/assets/images/${image.fileName}`, (error) => {
        if (error) {
            console.error(error)
        }
    })

    response.json({
        image,
        message: "Image deleted."
    })
}

export {
    getImage,
    postImage,
    deleteImage
}