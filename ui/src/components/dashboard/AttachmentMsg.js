import React from "react"

const AttachmentMsg = (props) => {
    return (
        <div className='img-msg img-msg-input'>
            <input type='text' placeholder='Type a message' id="message" value={props.message} onChange={(e) => props.setMessage(e.target.value)} />
            <div onClick={() => {
                props.onSend()
                props.setOpenCamera(false)
                props.setImageData('')
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="#318eb3" height="20" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
            </div>
        </div>
    )
}

export default AttachmentMsg