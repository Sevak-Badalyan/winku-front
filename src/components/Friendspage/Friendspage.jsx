
import React, { useEffect, useState } from 'react';
import './Friendspage.scss';
import { getFriends, getFriendsRequests, deleteFriends, answerFriendsRequests, getExplorePeoples, addFriends } from '../../utils/api/friendsApi';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';

export default function Friendspage() {
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [friendsReq, setFriendsReq] = useState([]);
  const [explorePeoples, setExplorePeoples] = useState([]);
  const [requestStatus, setRequestStatus] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    getFriends().then((result) => {
      setFriends(result);
    });
  }, []);

  useEffect(() => {
    getFriendsRequests().then((result) => {
      setFriendsReq(result);
    });
  }, []);

  useEffect(() => {
    getExplorePeoples().then((result) => {
      setExplorePeoples(result);
    });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  

  const handleUnfriend = async (friend_id) => {
    deleteFriends(friend_id)
    .then(() => {
        console.log(friends);
        setFriends(friends.filter(friend => friend.id != friend_id))
      })
      .catch(error => {
        console.error('Failed to delete friendship:', error);
      })
  };

  
  const handleDeleteRequest = async (sender_id) => {
    try {
      const response = await answerFriendsRequests({

        sender_id: sender_id,
        statusFr: 'rejected'
      });
      setFriendsReq(friendsReq.filter(friendReq =>friendReq.sender_id != sender_id))
      console.log('Friend request rejected:', response);
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };
  

  const handleConfirm = async (sender_id) => {
    try {
      const response = await answerFriendsRequests({

        sender_id,
        statusFr: 'accepted'
      });
      setFriendsReq(friendsReq.filter(friendReq =>friendReq.sender_id != sender_id))
      console.log('Friend request accepted:', response);
    } catch (error) {
      console.error('Failed to accept friend request:', error);
    }
  };

  const handleAddFriend = async (receiver_id) => {
    try {
      await addFriends({ receiver_id });
      setRequestStatus(prevStatus => ({
        ...prevStatus,
        [receiver_id]: 'sent'
      }));
      console.log('Friend request sent');
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };
  return (
    <div className='friendsPageContainer'>
      <ul className='navFriendsPage'>
        <li onClick={() => handleTabClick('friends')}>
          <div className='cursor-pointer'>
            <p className={activeTab === 'friends' ? 'active' : ''}>My Friends</p>
          </div>
          <div className='friendsNum'>{friends.length}</div>
        </li>
        <li onClick={() => handleTabClick('friendRequests')}>
          <div className='frbut  cursor-pointer '>
            <p className={activeTab === 'friendRequests' ? 'active' : ''}>Friend Requests</p>
          </div>
          <div className='friendsNum'>{friendsReq.length}</div>
        </li>
        <li onClick={() => handleTabClick('explorePeoples')}>
          <div className='frbut cursor-pointer'>
            <p className={activeTab === 'explorePeoples' ? 'active' : ''}>Explore people</p>
          </div>
        </li>
      </ul>
      <div className='friends'>
        {activeTab === 'friends' && friends.map((friend) => (
          <div key={friend.friendships_id} className='friendItem shadow hover:shadow-xl'>
            <img src={`${photoUrl}${friend.profileImg || defaultPhoto}`} className='friendProfile' alt={`${friend.name} ${friend.surname}`} />
            <div className='friendInfo'>
              <p>{`${friend.name} ${friend.surname}`}</p>
              <p className='text-sky-500 text-sm'>{friend.position}</p>
            </div>
            <div className='friendButtons'>
              <button className='bg-slate-500 hover:bg-slate-600 text-white rounded' onClick={() => handleUnfriend(friend.id)}>
                {isMobile ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                ) : (
                  'Unfriend'
                )}</button>
            </div>
          </div>
        ))}
        {activeTab === 'friendRequests' && friendsReq.map((friendReq) => (
          <div key={friendReq.request_id} className='friendItem shadow hover:shadow-xl'>
            <img src={`${photoUrl}${friendReq.profileImg || defaultPhoto}`} alt={`${friendReq.name} ${friendReq.surname}`} />
            <div className='friendInfo'>
              <p>{`${friendReq.name} ${friendReq.surname}`}</p>
              <p className='text-sky-500 text-sm'>{friendReq.position}</p>
            </div>

            <div className='friendButtons'>
              <button
                className='bg-slate-500 hover:bg-slate-600 text-white rounded'
                onClick={() => handleDeleteRequest(friendReq.sender_id)}
              >
                {isMobile ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                ) : (
                  'Delete Request'
                )}
              </button>

              <button
                className='bg-blue-500 hover:bg-blue-600 text-white rounded'
                onClick={() => handleConfirm(friendReq.sender_id)}
              >
                {isMobile ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                  </svg>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>

          </div>
        ))}
        {activeTab === 'explorePeoples' && explorePeoples.map((explorePeople) => (
          <div key={explorePeople.id} className='friendItem shadow hover:shadow-xl'>
            <img src={`${photoUrl}${explorePeople.profileImg || defaultPhoto}`} alt={`${explorePeople.name} ${explorePeople.surname}`} />
            <div className='friendInfo'>
              <p>{`${explorePeople.name} ${explorePeople.surname}`}</p>
              <p className='text-sky-500 text-sm'>{explorePeople.position}</p>
            </div>
            <div className='friendButtons'>


              <button
                className={`rounded text-white ${requestStatus[explorePeople.id] === 'sent' ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                onClick={() => handleAddFriend(explorePeople.id)}
                disabled={requestStatus[explorePeople.id] === 'sent'}
              >
                {requestStatus[explorePeople.id] === 'sent' ? (
                  isMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>
                  ) : (
                    'Request Sent'
                  )
                ) : (
                  isMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                  ) : (
                    'Add Friend'
                  )
                )}
              </button>
            </div>
          </div>
        ))}

      </div>
      {/* <button className='seeMore'> see more</button> */}
    </div>
  );
}


