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
                                {m.group_id &&
                                    <p> <span style={{ fontWeight: "bold" }}>{m.first_name}</span> {m.message}<br></br><span>{`${displayTime[0]}:${displayTime[1]}`}</span></p>
                                }
                                {
                                    !m.group_id &&
                                    <p>{m.message}<br></br><span>{`${displayTime[0]}:${displayTime[1]}`}</span></p>
                                }
                            </div>

                        }
                        {isUserMsg(m) &&
                            <div className='message my_msg'>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>
                                        YOU
                                    </span>
                                    {m.message}
                                    <br></br>
                                    <span>
                                        {`${displayTime[0]}:${displayTime[1]}`}
                                        {!m.seen &&
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                            </svg>
                                        }
                                        {m.seen &&
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                                            </svg>
                                        }
                                    </span>
                                </p>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Messages