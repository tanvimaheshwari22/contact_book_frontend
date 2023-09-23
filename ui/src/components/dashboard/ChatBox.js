import React from "react"
import './dashboard.css'
import ChatBottom from "./ChatBottom"
import ChatHeader from "./ChatHeader"
import Messages from "./Messages"

const ChatBox = (props) => {
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
                        <ChatBottom message={props.message} setMessage={props.setMessage} onSend={props.onSend} />
                    </>
                }

            </>
        </div>
    )
}

export default ChatBox