import {FormEvent, useState} from "react"
import Uploader from "./Uploader"
import FileInfo from "./FileInfo"

interface VideoFormProps {
    isVisible: boolean
}

function VideoForm(props: VideoFormProps) {
    const [videoFileLink, setVideoFileLink] = useState("")

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault()
    
        const formData = new FormData(event.target as HTMLFormElement)
    
        const response = await fetch(`http://localhost:3000/videos`, {
          method: "POST",
          body: formData
        })
    
        const data = await response.json()
        setVideoFileLink(data.fileLink)
    }

    function openVideoInput() {
        const videoInput = document.getElementById("videoInput") as HTMLInputElement
        videoInput.click()

        videoInput.addEventListener("input", () => {
            const videoName = document.getElementById("videoName") as HTMLDivElement
            videoName.innerText = videoInput.value.replace("C:\\fakepath\\", "")
        })
    }
    
    return (
        <form className={`${props.isVisible ? "flex" : "hidden"} flex-col items-center`} onSubmit={handleFormSubmit}>
            <input type="file" name="video" id="videoInput" className="hidden" accept="video/mp4, video/x-ms-wmv, video/webm, video/ogg"/>
            <Uploader uploaderId="videoName" submitButtonLabel="UPLOAD VIDEO" barAction={openVideoInput}/>

            <FileInfo fileLink={videoFileLink}/>
        </form>
    )
}

export default VideoForm