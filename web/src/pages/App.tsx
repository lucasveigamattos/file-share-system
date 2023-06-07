import {useState} from "react"

import FileButton from "../components/FileButton"
import PDFForm from "../components/PDFForm"
import ImageForm from "../components/ImageForm"
import VideoForm from "../components/VideoForm"

import pdfIcon from "../assets/pdf-icon.png"
import imageIcon from "../assets/image-icon.png"
import videoIcon from "../assets/video-icon.png"
import "../styles/main.css"

function App() {
  const [isPDFFormVisible, setIsPDFFormVisible] = useState(true)
  const [isImageFormVisible, setIsImageFormVisible] = useState(false)
  const [isVideoFormVisible, setIsVideoFormVisible] = useState(false)

  function switchFormsVisibilities(pdfFormVisibility: boolean, imageFormVisibility: boolean, videoFormVisibility: boolean) {
    setIsPDFFormVisible(pdfFormVisibility)
    setIsImageFormVisible(imageFormVisibility)
    setIsVideoFormVisible(videoFormVisibility)
  }

  return (
    <div>
      <div className="flex justify-center gap-[32px] mb-20 pt-[240px]">
        <FileButton image={pdfIcon} action={() => {switchFormsVisibilities(true, false, false)}}/>
        <FileButton image={imageIcon} action={() => {switchFormsVisibilities(false, true, false)}}/>
        <FileButton image={videoIcon} action={() => {switchFormsVisibilities(false, false, true)}}/>
      </div>
      
      <PDFForm isVisible={isPDFFormVisible}/>
      <ImageForm isVisible={isImageFormVisible}/>
      <VideoForm isVisible={isVideoFormVisible}/>
    </div>
  )
}

export default App