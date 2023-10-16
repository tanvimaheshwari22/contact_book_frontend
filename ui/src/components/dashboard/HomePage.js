import { getGroupMessage, getGroups, getMessages, getUserById, logout, sendGroupMessage, sendMessgae, updateMsgStatus, userContacts } from '../../service/userSvc'
import LoaderPage from '../layout/LoadingPage'
import Button from '../layout/button'
import AddContactPopover from './AddContactPopover'
import './dashboard.css'
import React, { useEffect, useState } from "react"
import ChatBox from './ChatBox'
import { useNavigate } from 'react-router'
import UserProfile from './UserProfile'
import ChatList from './ChatList'
import MessageRequest from './MessageRequest'
import CreateGroupPopover from './CreateGroupPopover'
import GroupList from './GroupList'
import GroupChat from './GroupChat'

const Homepage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [searchValue, setSearchValue] = useState(undefined);
    const [openProfile, setOpenProfile] = useState(false)
    const [contact, setContact] = useState(undefined)
    const [group, setGroup] = useState(undefined)
    const [message, setMessage] = useState(undefined)
    const [chats, setChats] = useState([])
    const [openRequest, setOpenRequest] = useState(false)
    const [showGroups, setShowGroups] = useState(false)
    const [groups, setGroups] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [picture, setPicture] = useState(undefined)

    let navigate = useNavigate();

    const fetchGroups = async () => {
        try {
            setIsLoading(true);
            const res = await getGroups()
            setGroups(res.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = async () => {
        try {
            await logout(user.userId)
        } catch (err) {
            console.log(err);
        }
        localStorage.clear()
        navigate("/login");
    }

    const fetchMessages = async (contactUserID) => {
        try {
            setIsLoading(true)
            await updateMsgStatus(localStorage.getItem("contact"))
            const response = await getMessages(contactUserID)
            setChats(response.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    const fetchGroupMessages = async (groupId) => {
        try {
            setIsLoading(true)
            const response = await getGroupMessage(groupId)
            setChats(response.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    const fetchData = async (userId) => {
        try {
            setIsLoading(true);
            const response = await userContacts(userId, searchValue);
            const curUser = await getUserById(user.userId)
            setCurrentUser(curUser.data.data)
            setPicture(curUser.data.data[0].picture)
            setContactList(response.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const ConnectWebSocket = () => {
        const socket = new WebSocket("ws://localhost:5000")

        socket.onopen = (ws) => {
            console.log("Successfully .");
            socket.send(localStorage.getItem('user'))
        }

        socket.onclose = (event) => {
            console.log("Socket Closed Connection: ", event);
            socket.send("Client Closed !")
        }


        socket.onmessage = async (msg) => {
            const update = JSON.parse(msg.data)
            if (update.receiverId) {
                if (user.userId === update.receiverId) {
                    const response = await getUserById(update.receiverId)
                    if (response.data.data[0].activity === "ONLINE") {
                        if (update.groupId) {
                            fetchGroupMessages(update.groupId)
                        } else {
                            if (update.senderId == localStorage.getItem("contact")) {
                                fetchMessages(update.senderId)
                            }
                        }
                    }
                }
            }
            if (update.clientId) {
                if (user.userId == update.clientId) {
                    fetchData(update.clientId)
                }
            }
            if (update.msgStatus === "READ") {
                fetchMessages(update.idToUpdate)
            }
        }

        socket.onerror = (err) => {
            console.log("Socket error: ", err);
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

    const onSendGroupMessage = async () => {
        try {
            setIsLoading(true)
            await sendGroupMessage(group.group_id, message)
            fetchGroupMessages(group.group_id)
            setMessage("")
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    let id = contact
    useEffect(() => {
        fetchData(user.userId);
        ConnectWebSocket();
    }, [searchValue]);

    if (isLoading) {
        <LoaderPage />;
    }

    return (
        <div className="container">
            <div className='leftside'>
                <div className='chat-header'>
                    <div className='user-icon' style={{ objectFit: "cover" }} onClick={() => {
                        setOpenProfile(true)
                        setOpenRequest(false)
                        setShowGroups(false)
                    }}>
                        {!picture &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        }
                        {picture &&
                            <img src={picture} width={40} height={40} />
                        }
                    </div>
                    <div className='header-icon'>
                        <li data-bs-toggle="tooltip" data-bs-placement="top" title="Create Group">
                            <CreateGroupPopover userId={user.userId} />
                        </li>
                        <li onClick={() => {
                            setOpenProfile(false)
                            setShowGroups(false)
                            setOpenRequest(false)
                        }} data-bs-toggle="tooltip" data-bs-placement="top" title="Chats">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                            </svg>
                        </li>
                        <li>
                            <AddContactPopover addedContact={contactList} />
                        </li>
                        <li className='dropdown'>
                            <div className="dropdown-toggle" data-bs-toggle="dropdown" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </div>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item dropdown-options" href="#" onClick={() => {
                                    setOpenRequest(false)
                                    setOpenProfile(false)
                                    setShowGroups(true)
                                    fetchGroups()
                                }}>Groups</a>
                                </li>
                                <li><a className="dropdown-item dropdown-options" href="#" onClick={() => {
                                    setOpenRequest(true)
                                    setOpenProfile(false)
                                    setShowGroups(false)
                                }}>Message Request</a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
                {!openProfile && !openRequest && !showGroups &&
                    <div style={{ height: "100%" }}>
                        <div className='search-chat'>
                            <div>
                                <input type='text' placeholder='Search or start a new chat' onChange={(e) => setSearchValue(e.target.value)} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                        <ChatList isLoading={isLoading} contactList={contactList} setContact={setContact} setGroup={setGroup}
                            setMessage={setMessage} fetchMessages={fetchMessages} />
                    </div>
                }
                {openProfile && !openRequest && !showGroups &&
                    <UserProfile user={user} isLoading={isLoading} picture={picture} setIsLoading={setIsLoading} currentUser={currentUser} setPicture={setPicture} />
                }
                {openRequest && !openProfile && !showGroups &&
                    <MessageRequest userId={user.userId} />}
                {showGroups && !openRequest && !openProfile &&
                    <GroupList isLoading={isLoading} groups={groups} setGroup={setGroup} setContact={setContact}
                        fetchGroupMessages={fetchGroupMessages} setMessage={setMessage} />
                }
            </div>
            {!contact && !showGroups &&
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
            {contact && !showGroups &&
                <ChatBox message={message} setMessage={setMessage}
                    onSend={onSend} contact={contact} onLogout={onLogout}
                    setChats={setChats} userId={user.userId}
                    chats={chats} isLoading={isLoading} />
            }
            {showGroups &&
                <GroupChat group={group} isLoading={isLoading}
                    onSendGroupMessage={onSendGroupMessage} onLogout={onLogout}
                    setChats={setChats} chats={chats} userId={user.userId}
                    message={message} setMessage={setMessage} />}
        </div>
    )
}

export default Homepage