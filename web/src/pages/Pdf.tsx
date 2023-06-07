import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"

function Pdfs() {
    const [fileName, setFileName] = useState("")

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")

    async function deleteFile() {
        await fetch(`http://localhost:3000/pdfs/${id}`, {
            method: "DELETE"
        })
    }

    async function getFileData() {
        const response = await fetch(`http://localhost:3000/pdfs/${id}`)
        const data = await response.json()

        setFileName(data.pdf.fileName)
    }

    useEffect(() => {
        getFileData()
        window.addEventListener("beforeunload", deleteFile)
    }, [])

    return (
        <div className="h-screen flex justify-center items-center">
            {fileName && (
                <object data={`http://localhost:3000/assets/pdfs/${fileName}`} type="application/pdf" width="900px" height="491px"></object>
            )}
        </div>
    )
}

export default Pdfs