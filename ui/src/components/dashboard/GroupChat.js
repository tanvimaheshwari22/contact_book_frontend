import React from "react"
import './dashboard.css'
import Button from "../layout/button"
import ChatBottom from "./ChatBottom"
import Messages from "./Messages"

const GroupChat = (props) => {
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

    return (
        <>
            {!props.group &&
                <div className='rightside'>
                    <div className='chat-header'>
                        <div className='logout-icon'>
                            <Button
                                btnColor="btn-dark"
                                label="Logout"
                                handleClick={props.onLogout}
                            />
                        </div>
                    </div>
                    <div className='empty-box'>
                        <div>
                            Select Group to Chat...
                        </div>
                    </div>
                </div>
            }
            {
                props.group &&
                <div className='rightside'>
                    <div className='chat-header'>
                        <div className='reciever-details'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                                </svg>
                            </div>
                            <div className='reciever-name'>{props.group.group_name}</div>
                        </div>
                        <div className='logout-icon'>
                            <Button
                                btnColor="btn-dark"
                                label="Logout"
                                handleClick={props.onLogout}
                            />
                        </div>
                    </div>
                    <>
                        <Messages messages={props.chats} userId={props.userId} />
                        <ChatBottom message={props.message} setMessage={props.setMessage} onSend={props.onSendGroupMessage} />
                    </>
                </div>
            }
        </>
    )
}

export default GroupChat