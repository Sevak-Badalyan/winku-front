
import React, { useEffect, useState } from 'react';
import './Friendspage.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getFriends, getFriendsRequests, deleteFriends, answerFriendsRequests, getExplorePeoples, addFriends } from '../../utils/api/friendsApi';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const pfp = import.meta.env.VITE_DEFAULT_PROFILE;
const defaultPhoto = photoUrl + pfp;

export default function Friendspage() {
  const [activeTab, setActiveTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [friendsReq, setFriendsReq] = useState([]);
  const [explorePeoples, setExplorePeoples] = useState([]);
  const [requestStatus, setRequestStatus] = useState({});
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingExplore, setLoadingExplore] = useState(true);
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
      setLoadingFriends(false);
    });
  }, []);

  useEffect(() => {
    getFriendsRequests().then((result) => {
      setFriendsReq(result);
      setLoadingRequests(false);
    });
  }, []);

  useEffect(() => {
    getExplorePeoples().then((result) => {
      setExplorePeoples(result);
      setLoadingExplore(false);
    });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleUnfriend = async (friend_id) => {
    try {
      await deleteFriends(friend_id);
      setFriends(friends.filter(friend => friend.id !== friend_id));
    } catch (error) {
      console.error('Failed to delete friendship:', error);
    }
  };

  const handleDeleteRequest = async (sender_id) => {
    try {
      await answerFriendsRequests({
        sender_id: sender_id,
        statusFr: 'rejected'
      });
      setFriendsReq(friendsReq.filter(friendReq => friendReq.sender_id !== sender_id));
    } catch (error) {
      console.error('Failed to reject friend request:', error);
    }
  };

  const handleConfirm = async (sender_id) => {
    try {
      await answerFriendsRequests({
        sender_id,
        statusFr: 'accepted'
      });
      setFriendsReq(friendsReq.filter(friendReq => friendReq.sender_id !== sender_id));
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
          <div className='frbut cursor-pointer'>
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
        {activeTab === 'friends' && (loadingFriends ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='friendItem shadow hover:shadow-xl'>
              <Skeleton circle={true} height={60} width={60} />
              <div className='friendInfo'>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
              <Skeleton width={80} height={30} />
            </div>
          ))
        ) : friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.friendships_id} className='friendItem shadow hover:shadow-xl'>
              <img src={`${friend.profileImg || defaultPhoto}`} className='friendProfile' alt={`${friend.name} ${friend.surname}`} />
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
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='noFriends'>
            No Friends Available
          </div>
        ))}
        {activeTab === 'friendRequests' && (loadingRequests ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='friendItem shadow hover:shadow-xl'>
              <Skeleton circle={true} height={60} width={60} />
              <div className='friendInfo'>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
              <Skeleton width={80} height={30} />
            </div>
          ))
        ) : friendsReq.length > 0 ? (
          friendsReq.map((friendReq) => (
            <div key={friendReq.request_id} className='friendItem shadow hover:shadow-xl'>
              <img src={`${friendReq.profileImg || defaultPhoto}`} alt={`${friendReq.name} ${friendReq.surname}`} />
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M13.485 1.793a.5.5 0 0 1 .146.352v1.414a.5.5 0 0 1-.146.352L6.707 12.354a.5.5 0 0 1-.708 0L2.354 8.707a.5.5 0 0 1 .707-.707L6 11.293l6.779-6.779a.5.5 0 0 1 .707 0z" />
                    </svg>
                  ) : (
                    'Confirm'
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='noFriends'>
            No Friend Requests Available
          </div>
        ))}
        {activeTab === 'explorePeoples' && (loadingExplore ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='friendItem shadow hover:shadow-xl'>
              <Skeleton circle={true} height={60} width={60} />
              <div className='friendInfo'>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
              <Skeleton width={80} height={30} />
            </div>
          ))
        ) : explorePeoples.length > 0 ? (
          explorePeoples.map((explore) => (
            <div key={explore.id} className='friendItem shadow hover:shadow-xl'>
              <img src={`${explore.profileImg || defaultPhoto}`} alt={`${explore.name} ${explore.surname}`} />
              <div className='friendInfo'>
                <p>{`${explore.name} ${explore.surname}`}</p>
                <p className='text-sky-500 text-sm'>{explore.position}</p>
              </div>
              <div className='friendButtons'>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white rounded'
                  onClick={() => handleAddFriend(explore.id)}
                >
                  {requestStatus[explore.id] === 'sent' ? (
                    'Request Sent'
                  ) : isMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  ) : (
                    'Add Friend'
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='noFriends'>
            No People to Explore
          </div>
        ))}
      </div>
    </div>
  );
}
