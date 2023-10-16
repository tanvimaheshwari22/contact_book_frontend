import React, { useState } from "react"
import Avatar from "react-avatar-edit"

const ChooseProfile = (props) => {
    const [uploadProfile, setUploadProfile] = useState(true)
    const [uploadAvatar, setUploadAvatar] = useState(false)
    const [src, setSrc] = useState(null)

    const onClose = () => {
        props.setPreview(null)
    }

    const onCrop = (view) => {
        props.setPreview(view)
    }

    const imageSrc = (e) => {
        props.setPreview(e.target.src)
    }

    return (
        <>
            {!props.preview &&
                <div className="text-center pt-1 pb-1 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </div>
            }
            {props.preview &&
                <div className="text-center pt-1 pb-1 ">
                    <img src={props.preview} className="circle" />
                </div>
            }
            <div className="text-center pt-1 pb-1">
                <button type="button" style={{
                    fontSize: "small",
                    border: 'hidden',
                    color: "blue"
                }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Choose Profile
                </button>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                {uploadProfile &&
                                    <>
                                        <li className="active-modal-title" onClick={() => {
                                            setUploadProfile(true)
                                            setUploadAvatar(false)
                                        }}>Upload profile</li>
                                        <li className="unactive-modal-title" onClick={() => {
                                            setUploadProfile(false)
                                            setUploadAvatar(true)
                                        }}>Create Avatar</li>
                                    </>}
                                {uploadAvatar &&
                                    <>
                                        <li className="unactive-modal-title" onClick={() => {
                                            setUploadProfile(true)
                                            setUploadAvatar(false)
                                        }}>Upload profile</li>
                                        <li className="active-modal-title" onClick={() => {
                                            setUploadProfile(false)
                                            setUploadAvatar(true)
                                        }}>Create Avatar</li>
                                    </>}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {uploadProfile &&
                                <div>
                                    <Avatar
                                        height={300}
                                        width={400}
                                        onCrop={onCrop}
                                        onClose={onClose}
                                        src={src} />
                                </div>
                            }
                            {
                                uploadAvatar &&
                                <>
                                    <div className="avatar">
                                        <img className="pic" onClick={imageSrc} src="/images/p1.png" alt="avatar1" />
                                        <img className="pic" onClick={imageSrc} src="/images/p2.png" alt="avatar2" />
                                        <img className="pic" onClick={imageSrc} src="/images/p3.png" alt="avatar3" />
                                        <img className="pic" onClick={imageSrc} src="/images/p4.png" alt="avatar4" />
                                    </div>
                                    <div className="avatar">
                                        <img className="pic" onClick={imageSrc} src="/images/p5.png" alt="avatar5" />
                                        <img className="pic" onClick={imageSrc} src="/images/p6.png" alt="avatar6" />
                                        <img className="pic" onClick={imageSrc} src="/images/p7.png" alt="avatar7" />
                                        <img className="pic" onClick={imageSrc} src="/images/p8.png" alt="avatar8" />
                                    </div>
                                </>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => props.setPreview(props.preview)} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseProfile