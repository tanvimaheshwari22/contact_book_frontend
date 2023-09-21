import { userContacts } from '../../service/userSvc'
import LoaderPage from '../layout/LoadingPage'
import Button from '../layout/button'
import AddContactPopover from './AddContactPopover'
import './dashboard.css'
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router'

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [searchValue, setSearchValue] = useState(undefined);
    const [openProfile, setOpenProfile] = useState(false)
    let navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear()
        navigate("/login");
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await userContacts(searchValue);
            setContactList(response.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [searchValue]);


    if (isLoading) {
        <LoaderPage />;
    }

    return (
        <div className="container">
            <div className='leftside'>
                <div className='chat-header'>
                    <div className='user-icon' onClick={() => setOpenProfile(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </div>
                    <div className='header-icon'>
                        <li onClick={() => setOpenProfile(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                            </svg>
                        </li>
                        <li>
                            <AddContactPopover addedContact={contactList} />
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </li>
                    </div>
                </div>
                {!openProfile &&
                    <div style={{height:"100%"}}>
                        <div className='search-chat'>
                            <div>
                                <input type='text' placeholder='Search or start a new chat' onChange={(e) => setSearchValue(e.target.value)} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className='chat-list'>
                            {contactList.map(contact => {
                                return (
                                    <div key={contact.contact_user_id} className='block'>
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
                    </div>
                }
                {openProfile &&
                    <div>
                        <div className='user-profile'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </div>
                        <div className="user-name">{user.name}</div>
                    </div>}

            </div>
            <div className='rightside'>
                <div className='chat-header'>
                    <div className='logout-icon'>
                        <Button
                            btnColor="btn-dark"
                            label="Logout"
                            handleClick={onLogout}
                        />
                    </div>
                </div>
                <div className='chat-bottom'>
                    <div className='msg-input'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                        </svg>
                        <input type='text' placeholder='Type a message' />
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage