

import React from 'react';
import './Friend.css';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const pfp = import.meta.env.VITE_DEFAULT_PROFILE
const defaultPhoto  = photoUrl + pfp;

const getStatusColor = (status) => {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
        case 'away':
            return 'orange';
        default:
            return 'grey';
    }
};




export default function Friend({ friend }) {
    return (
        <div className="friend">
            <div className='statImg'>


                <img src={`${friend.profileImg|| defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />




                <div className="status" style={{ outline: '4px solid', outlineColor: getStatusColor(friend.status) }}>
                </div>
            </div>



            <div className="friend-info">
                <h3>{friend.name} {friend.surname}</h3>
                <p>{friend.email}</p>
            </div>
        </div>
    );
};


