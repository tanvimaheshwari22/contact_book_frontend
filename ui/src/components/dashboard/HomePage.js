import { getMessages, sendMessgae, userContacts } from '../../service/userSvc'
import LoaderPage from '../layout/LoadingPage'
import Button from '../layout/button'
import AddContactPopover from './AddContactPopover'
import './dashboard.css'
import React, { useEffect, useState } from "react"
import ChatBox from './ChatBox'
import { useNavigate } from 'react-router'
import UserProfile from './UserProfile'
import ChatList from './ChatList'

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [searchValue, setSearchValue] = useState(undefined);
    const [openProfile, setOpenProfile] = useState(false)
    const [contact, setContact] = useState(undefined)
    const [message, setMessage] = useState(undefined)
    const [chats, setChats] = useState([])

    let navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        localStorage.clear()
        navigate("/login");
    }

    const fetchMessages = async (contactUserID) => {
        try {
            setIsLoading(true)
            const response = await getMessages(contactUserID)
            setChats(response.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

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

    const onSend = async () => {
        try {
            setIsLoading(true)
            await sendMessgae(message, contact.contact_user_id)
            fetchMessages(contact.contact_user_id)
            setMessage("")
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
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
                    <div style={{ height: "100%" }}>
                        <div className='search-chat'>
                            <div>
                                <input type='text' placeholder='Search or start a new chat' value={message} onChange={(e) => setSearchValue(e.target.value)} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                        <ChatList isLoading={isLoading} contactList={contactList} setContact={setContact}
                            setMessage={setMessage} fetchMessages={fetchMessages} />
                    </div>
                }
                {openProfile &&
                    <UserProfile user={user} isLoading={isLoading} />
                }

            </div>
            {!contact &&
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
                    <div className='empty-box'>
                        <div>
                            Select Contact to Chat...
                        </div>
                    </div>
                </div>
            }
            {contact &&
                <ChatBox message={message} setMessage={setMessage}
                    onSend={onSend} contact={contact} onLogout={onLogout}
                    setChats={setChats} userId={user.userId}
                    chats={chats} isLoading={isLoading} />
            }
        </div>
    )
}

export default Homepage