import {CopyToClipboard} from "react-copy-to-clipboard"
import copyIcon from "../assets/copy-icon.png"

interface FileInfoProps {
    fileLink: string
}

function FileInfo(props: FileInfoProps) {
    return (
        <div className={`${props.fileLink != "" ? "flex" : "hidden"} flex-col items-center`}>
            <span className={`font-medium text-white`}>Go share with your friends!</span>

            <div className="flex gap-2">
                <a className="font-bold text-white" href={props.fileLink} target="_blank">{props.fileLink}</a>
                
                <CopyToClipboard text={props.fileLink}>
                    <button type="button"><img src={copyIcon}/></button>
                </CopyToClipboard>
            </div>

            <span className={`text-[#d44b4b]`}>Note: the file will be deleted once it has been viewed.</span>
        </div>
    )
}

export default FileInfo