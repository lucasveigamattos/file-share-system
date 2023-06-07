import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"

function Images() {
    const [fileName, setFileName] = useState("")

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")

    async function deleteFile() {
        await fetch(`http://localhost:3000/images/${id}`, {
            method: "DELETE"
        })
    }

    async function getFileData() {
        const response = await fetch(`http://localhost:3000/images/${id}`)
        const data = await response.json()

        setFileName(data.image.fileName)
    }

    useEffect(() => {
        getFileData()
        window.addEventListener("beforeunload", deleteFile)
    }, [])

    return (
        <div className="h-screen flex justify-center items-center">
            {fileName && (
                <img src={`http://localhost:3000/assets/images/${fileName}`} className="max-w-[900px]"/>
            )}
        </div>
    )
}

export default Images