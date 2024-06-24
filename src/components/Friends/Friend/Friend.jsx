// import React from 'react'
// import './Friend.css'

// const data = [
//     {
//         id: 1,
//         name: 'Bucky',
//         surname: "Barnes",
//         email:'barnes@gmail.com',
//         img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar.jpg'
//     },
//     {
//         id: 2,
//         name: 'Sarah',
//         surname: "Loren",
//         email:'loren@gmail.com',
//         img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar2.jpg'
//     },
//     {
//         id: 3,
//         name: 'Jason',
//         surname: "Boren",
//         email:'boren@gmail.com',
//         img: 'https://wpkixx.com/html/winku/images/resources/friend-avatar3.jpg'
//     },
// ]

// export default function
//     () {
//     return (
//         <div>

//         </div>
//     )
// }

import React from 'react';
import './Friend.css';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';
const getStatusColor = (status) => {
    switch (status) {
        case 'online':
            return 'green';
        case 'offline':
            return 'grey';
        case 'away':
            return 'orange';
        default:
            return 'grey'; // Default color if status is not recognized
    }
};




export default function Friend({ friend }) {
    return (
        <div className="friend">
            <div className='statImg'>


                <img src={`${photoUrl}${friend.profileImg|| defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />




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


