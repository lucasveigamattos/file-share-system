interface FileButtonProps {
    image: string,
    action: () => void
}

function FileButton(props: FileButtonProps) {
    return <button className="rounded-lg p-[6px] bg-[#242729]" onClick={props.action}><img src={props.image}/></button>
}

export default FileButton