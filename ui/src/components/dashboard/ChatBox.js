import React, { useRef, useState } from "react"
import './dashboard.css'
import ChatBottom from "./ChatBottom"
import ChatHeader from "./ChatHeader"
import Messages from "./Messages"
import CaptureImage from "./CaptureImage"
import AttachmentMsg from "./AttachmentMsg"

const ChatBox = (props) => {
    const [openCamera, setOpenCamera] = useState(false)
    const webcamRef = React.useRef(null)

    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot()
        props.setImageData(pictureSrc)
    }, [])

    if (props.isLoading) {
        return (
            <div className='rightside'>
                <div className="loader">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </div>
        )
    }

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setImageData(imageSrc);
    };


    return (
        <>
            {openCamera &&
                <div className="camera-box">
                    <div className='chat-header'>
                        <ChatHeader contact={props.contact} onLogout={props.onLogout} />
                    </div>
                    <div className="header">
                        <div style={{ marginRight: "15px" }} onClick={() => {
                            setOpenCamera(false)
                            props.setImageData('')
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <span className="text">Take Picture</span>
                        {props.imageData &&
                            <>
                                <div style={{ marginLeft: "300px" }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        props.setImageData('')
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                                    </svg>
                                    <span className="text" style={{ fontSize: "medium", marginLeft: "3px" }}>Retake</span>
                                </div>
                            </>
                        }
                    </div>
                    <CaptureImage picture={props.imageData} webcamRef={webcamRef} />
                    {!props.imageData &&
                        <div className="capture-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                captureImage()
                                capture()
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="bi bi-camera-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                            </svg>
                        </div>
                    }
                    {props.imageData &&
                        <AttachmentMsg setOpenCamera={setOpenCamera} setImageData={props.setImageData} message={props.message} onSend={props.onSend} setMessage={props.setMessage} />
                    }
                </div>
            }
            {props.selectDoc &&
                <div className="camera-box">
                    <div className='chat-header'>
                        <ChatHeader contact={props.contact} onLogout={props.onLogout} />
                    </div>
                    <div className="header">
                        <div style={{ marginRight: "15px" }} onClick={() => {
                            props.setSelectDoc(undefined)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <span className="text">{props.selectDoc.name}</span>

                    </div>
                    <AttachmentMsg setImageData={props.setImageData} setOpenCamera={setOpenCamera} message={props.message} onSend={props.onSend} setMessage={props.setMessage} />
                </div>
            }
            {!openCamera && !props.selectDoc &&
                <div className='rightside'>
                    <div className='chat-header'>
                        <ChatHeader contact={props.contact} onLogout={props.onLogout} />
                    </div>
                    <>
                        {props.contact.status === 'INVITED' &&
                            <div className='empty-box'>
                                <div>
                                    Invited the user,
                                    once the user will accept the invitation,
                                    you can start conversation...
                                </div>
                            </div>
                        }
                        {props.contact.status === 'REGISTERED' &&
                            <>
                                <Messages messages={props.chats} userId={props.userId} />
                                <ChatBottom message={props.message} setMessage={props.setMessage} onSend={props.onSend}
                                    setOpenCamera={setOpenCamera} setSelectDoc={props.setSelectDoc} />
                            </>
                        }
                    </>
                </div>
            }
        </>
    )
}

export default ChatBox