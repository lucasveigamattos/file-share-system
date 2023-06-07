import {FormEvent, useState} from "react"
import Uploader from "./Uploader"
import FileInfo from "./FileInfo"

interface ImageFormProps {
    isVisible: boolean
}

function ImageForm(props: ImageFormProps) {
    const [imageFileLink, setImageFileLink] = useState("")

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault()
    
        const formData = new FormData(event.target as HTMLFormElement)
    
        const response = await fetch(`http://localhost:3000/images`, {
          method: "POST",
          body: formData
        })
    
        const data = await response.json()
        setImageFileLink(data.fileLink)
    }

    function openImageInput() {
        const imageInput = document.getElementById("imageInput") as HTMLInputElement
        imageInput.click()

        imageInput.addEventListener("input", () => {
            const imageName = document.getElementById("imageName") as HTMLDivElement
            imageName.innerText = imageInput.value.replace("C:\\fakepath\\", "")
        })
    }
    
    return (
        <form className={`${props.isVisible ? "flex" : "hidden"} flex-col items-center`} onSubmit={handleFormSubmit}>
            <input type="file" name="image" id="imageInput" className="hidden" accept="image/png, image/jpeg, image/png"/>
            <Uploader uploaderId="imageName" submitButtonLabel="UPLOAD IMAGE" barAction={openImageInput}/>

            <FileInfo fileLink={imageFileLink}/>
        </form>
    )
}

export default ImageForm