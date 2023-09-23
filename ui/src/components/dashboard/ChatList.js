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
        <div className='chat-list'>
            {props.contactList.map(contact => {
                return (
                    <div key={contact.contact_user_id} onClick={() => {
                        props.setContact(contact)
                        props.setMessage("")
                        props.fetchMessages(contact.contact_user_id);
                    }} className='block'>
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