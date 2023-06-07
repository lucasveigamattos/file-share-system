import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient()

async function getVideo(request: Request, response: Response) {
    const video = await prisma.video.findFirstOrThrow({
        where: {
            id: request.params.id
        }
    })

    response.json({
        video
    })
}

async function postVideo(request: Request, response: Response) {
    const video = await prisma.video.create({
        data: {
            fileName: String(request.file?.filename)
        }
    })

    response.status(201).json({
        video,
        fileLink: `http://localhost:5173/videos/?id=${video.id}`
    })
}

async function deleteVideo(request: Request, response: Response) {
    const video = await prisma.video.delete({
        where: {
            id: request.params.id
        }
    })

    fs.unlink(`./public/assets/videos/${video.fileName}`, (error) => {
        if (error) {
            console.error(error)
            response.status(500).json({error})
        }
    })

    response.json({
        video,
        message: "Video deleted."
    })
}

export {
    getVideo,
    postVideo,
    deleteVideo
}