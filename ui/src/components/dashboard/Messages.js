import React from "react"
import './dashboard.css'

const Messages = (prop) => {
    const isUserMsg = (detail) => {
        if (detail.sender_id === prop.userId) {
            return true
        }
        return false
    }
    return (
        <div className='chat-box'>
            {prop.messages.map(m => {
                let time = m.created_at.split("T")
                let displayTime = time[1].split(":")
                return (
                    <div key={m.id} >
                        {!isUserMsg(m) &&
                            <div className='message frnd_msg'>
                                <p>{m.message}<br></br><span>{`${displayTime[0]}:${displayTime[1]}`}</span></p>
                            </div>

                        }
                        {isUserMsg(m) &&
                            <div className='message my_msg'>
                                <p>{m.message}<br></br><span>{`${displayTime[0]}:${displayTime[1]}`}</span></p>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Messages