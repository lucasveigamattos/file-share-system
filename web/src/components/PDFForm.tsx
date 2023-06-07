import {FormEvent, useState} from "react"
import Uploader from "./Uploader"
import FileInfo from "./FileInfo"

interface PDFFormProps {
    isVisible: boolean
}

function PDFForm(props: PDFFormProps) {
    const [PDFFileLink, setPDFFileLink] = useState("")

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const response = await fetch(`http://localhost:3000/pdfs`, {
            method: "POST",
            body: formData
        })

        const data = await response.json()
        setPDFFileLink(data.fileLink)
    }

    function openPDFInput() {
        const PDFInput = document.getElementById("PDFInput") as HTMLInputElement
        PDFInput.click()

        PDFInput.addEventListener("input", () => {
            const PDFName = document.getElementById("PDFName") as HTMLDivElement
            PDFName.innerText = PDFInput.value.replace("C:\\fakepath\\", "")
        })
    }

    return (
        <form className={`${props.isVisible ? "flex" : "hidden"} flex-col items-center`} onSubmit={handleFormSubmit}>
            <input type="file" name="pdf" id="PDFInput" className="hidden" accept="application/pdf"/>
            <Uploader uploaderId="PDFName" submitButtonLabel="UPLOAD PDF" barAction={openPDFInput}/>

            <FileInfo fileLink={PDFFileLink}/>
        </form>
    )
}

export default PDFForm