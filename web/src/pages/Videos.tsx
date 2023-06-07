import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"

function Videos() {
    const [fileName, setFileName] = useState("")

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")

    async function deleteFile() {
        await fetch(`http://localhost:3000/videos/${id}`, {
            method: "DELETE"
        })
    }

    async function getFileData() {
        const response = await fetch(`http://localhost:3000/videos/${id}`)
        const data = await response.json()

        setFileName(data.video.fileName)
    }

    useEffect(() => {
        getFileData()
        window.addEventListener("beforeunload", deleteFile)
    }, [])

    return (
        <div className="h-screen flex justify-center items-center">
            {fileName && (
                <video src={`http://localhost:3000/assets/videos/${fileName}`} controls autoPlay className="max-w-[900px]"></video>
            )}
        </div>
    )
}

export default Videos