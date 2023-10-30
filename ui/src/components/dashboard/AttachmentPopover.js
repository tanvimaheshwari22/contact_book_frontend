import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import SelectDocument from "./SelectDocument";
import SelectMedia from "./SelectMedia";

const AttachmentPopover = (props) => {
    const popoverTop = (
        <Popover id="popover-positioned-top" className="attachment-box" title="Popover top">
            <div className="highlight" onClick={() => props.setOpenCamera(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera2 icon" viewBox="0 0 16 16">
                    <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4z" />
                    <path d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.972 5.972 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1zM2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0z" />
                </svg>
            </div>
            <SelectMedia setSelectDoc={props.setSelectDoc} />
            <SelectDocument setSelectDoc={props.setSelectDoc} />
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="top" overlay={popoverTop} rootClose>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
            </svg>
        </OverlayTrigger>
    )
}

export default AttachmentPopover