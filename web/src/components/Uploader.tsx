interface UploaderProps {
    uploaderId: string,
    submitButtonLabel: string,
    barAction: () => void
}

function Uploader(props: UploaderProps) {
    return (
        <div className="flex justify-between min-w-[712px] mb-4 rounded-lg px-[24px] py-[16px] bg-[#1B1E1F]">
            <div className="font-medium text-white flex flex-1 items-center cursor-pointer" id={props.uploaderId} onClick={props.barAction}></div>
            <button type="submit" className="font-semibold text-white rounded-[4px] px-[28px] py-[16px] bg-[#524BA1]">{props.submitButtonLabel}</button>
        </div>
    )
}

export default Uploader