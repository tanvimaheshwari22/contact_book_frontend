import React from "react"
import './dashboard.css'

const GroupList = (props) => {
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
        <div className='chat-list' onClick={() => props.setContact(undefined)}>
            {props.groups.map(group => {
                return (
                    <div key={group.id} onClick={() => {
                        props.setGroup(group)
                        props.setMessage("")
                        props.fetchGroupMessages(group.group_id);
                    }} className='block'>
                        <div className='details'>
                            <div className='list'>
                                <h4>{group.group_name}</h4>
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default GroupList