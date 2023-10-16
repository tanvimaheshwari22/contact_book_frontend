import React from "react"
import './dashboard.css'

const ChatList = (props) => {
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
        <div className='chat-list' onClick={() => props.setGroup(undefined)}>
            {props.contactList.map(contact => {
                return (
                    <div key={contact.contact_user_id} onClick={() => {
                        localStorage.setItem("contact", contact.contact_user_id)
                        props.setContact(contact)
                        props.setMessage("")
                        props.fetchMessages(contact.contact_user_id);
                    }} className='block'>
                        <div className="me-2">
                            {contact.activity === "OFFLINE" &&
                                <>
                                    {!contact.picture &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle profile" style={{ borderColor: "red" }} viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    }
                                    {contact.picture &&
                                        <img src={contact.picture} style={{ borderColor: "red" }} className="profile" />
                                    }
                                </>
                            }
                            {contact.activity === "ONLINE" &&
                                <>
                                    {!contact.picture &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle profile" style={{ borderColor: "green" }} viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    }
                                    {contact.picture &&
                                        <img src={contact.picture} style={{ borderColor: "green" }} className="profile" />
                                    }
                                </>
                            }
                        </div>
                        <div className='details'>
                            <div className='list'>
                                <h4>{contact.first_name} {contact.last_name}</h4>
                                {
                                    contact.status === 'REGISTERED' &&
                                    <div className='register-contact-display'>{contact.status}</div>
                                }
                                {
                                    contact.status === 'INVITED' &&
                                    <div className='invited-contact-display'>{contact.status}</div>
                                }
                            </div>
                            <div className='contact-display'>
                                {contact.mobile_number}
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ChatList