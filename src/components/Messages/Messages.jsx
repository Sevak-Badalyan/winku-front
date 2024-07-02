
import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import './Messages.scss';
import { getUserData } from '../../utils/api/usersApi';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import { getFriends, getFriendsMessageById } from '../../utils/api/friendsApi';
import Loader from "../Loader/Loader";
import AddGroup from '../AddGroup/AddGroup';
import { getGroupMessageById, getGroups } from '../../utils/api/groupsApi';
import DelMember from '../DelMember/DelMember';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';
const messageTone = new Audio('/src/components/Messages/iphone.mp3')


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

const Messages = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [users, setUsers] = useState({});
  const [activeTab, setActiveTab] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesDataRef = useRef(null);
  const [activeTabMes, setActiveTabMes] = useState('messages');
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [loading, setLoading] = useState(true);

  const [groupsList, setGroupsList] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const socket = io.connect(socketUrl);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesDataRef.current?.scrollTo({ top: messagesDataRef.current.scrollHeight });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      if (users.id) {
        try {
          const friends = await getFriends(users.id);

          setFriendsList(friends);

          const groups = await getGroups();
          setGroupsList(groups);
          if(friends.length === 0){
            return  <p className='noMes'>No messages available</p>;
          }else if (friends.length > 0) {
            const firstFriend = friends[0];
            setActiveTab(firstFriend);

            const messages = await getFriendsMessageById(firstFriend.friendships_id);
            setMessageList(messages);
          }

        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      }
    };

    fetchFriends();
  }, [users.id]);

  useEffect(() => {
    if (activeTab && socket) {
      if (activeTab.friendships_id === undefined) {
        socket.emit("join_room", activeTab.group_id);
      } else {
        socket.emit("join_room", activeTab.friendships_id);
      }
      scrollToBottom();
    }
  }, [activeTab, socket]);


  useEffect(() => {
    if (socket) {
      const handleMessage = (data) => {
        messageTone.play().catch(error => {
          console.error('Error playing the message tone:', error);
        });
        if (activeTab.friendships_id == undefined && data.group_id === activeTab.group_id) {
          setMessageList((list) => [...list, data]);
          scrollToBottom();
        } else if (activeTab.friendships_id != undefined && data.room === activeTab.friendships_id) {
          setMessageList((list) => [...list, data]);
          scrollToBottom();
        }
      };

      socket.on("receive_message", handleMessage,
      );
      socket.on("receive_group_message", handleMessage,
      );

      return () => {
        socket.off("receive_message", handleMessage);
        socket.off("receive_group_message", handleMessage);
      };
    }
  }, [socket, activeTab]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const handleTabClick = async (friend) => {
    setActiveTab(friend);
    const messages = await getFriendsMessageById(friend.friendships_id);
    setMessageList(messages);
  };
  const handleTabClickGroup = async (group) => {
    setActiveTab(group);
    const messages = await getGroupMessageById(group.group_id);
    setMessageList(messages);
  };



  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        author: users.username,
        sender_id: users.id,
        message: currentMessage.trim(),
        profileImg: users.profileImg,
        name: users.name,
        surname: users.surname,
        created_at: new Date().toISOString(),
      };

      if (activeTab.friendships_id === undefined) {
        messageData.group_id = activeTab.group_id;
        await socket.emit("send_group_message", messageData);
      } else {
        messageData.room = activeTab.friendships_id;
        messageData.receiver_id = activeTab.id !== users.id ? activeTab.id : activeTab.friend_id;
        await socket.emit("send_message", messageData);
      }

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      scrollToBottom();
    }
  };

  const handleTabClickMes = (tab) => {
    setActiveTabMes(tab);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const openModalDel = (group_id, user_id) => {
    setSelectedGroupId(group_id);
    setSelectedUserId(user_id);
    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setSelectedGroupId(null);
    setSelectedUserId(null);
    setIsModalOpenDel(false);
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };


  if(friendsList.length === 0){
    // setLoading(false);
    return <p className='noMes'>No messages available</p>; 
      }

  if (!activeTab) {
    return <Loader />
  } 
  // else if (friendsList.length === 0) {
  //   // setLoading(false);
  //   return <p className='noMes'>No messages available</p>;
  // }

  return (
    <div className='messageContainer'>
      <div className='mesBell'>
        <div className='bellAll'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
          <div className='mesOrGroup cursor-pointer '>
            <TitleUnderline className={activeTabMes === 'messages' ? 'active' : ''} title={'All Messages'} onClick={() => handleTabClickMes('messages')} />
          </div>

        </div>
        <div onClick={openModal} className='modalIcons cursor-pointer'>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
          </svg>

        </div>
      </div>
      <div className='messages'>
        <div className='leftFriends'>
          <ul className='friendsList'>
            {/* {friendsList.map((friend) => (
              <li key={friend.friendships_id} onClick={() => handleTabClick(friend)}>
                <div className='friendsInfo cursor-pointer'>
                  <div className='statImg'>
                    <img src={`${photoUrl}${friend.profileImg || defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />
                    <div className="status" style={{ outline: '3px solid', outlineColor: getStatusColor(friend.status) }}></div>
                  </div>
                  <p className="infFriend">{friend.name}</p>
                  <p>{friend.surname}</p>
                  <p className={activeTab.friendships_id === friend.friendships_id ? 'active' : ''}></p>
                </div>
              </li>
            ))} */}
            {
              friendsList.length > 0 ? (
                friendsList.map((friend) => (
                  <li key={friend.friendships_id} onClick={() => handleTabClick(friend)}>
                    <div className='friendsInfo cursor-pointer'>
                      <div className='statImg'>
                        <img src={`${photoUrl}${friend.profileImg || defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />
                        <div className="status" style={{ outline: '3px solid', outlineColor: getStatusColor(friend.status) }}></div>
                      </div>
                      <p className="infFriend">{friend.name}</p>
                      <p>{friend.surname}</p>
                      <p className={activeTab.friendships_id === friend.friendships_id ? 'active' : ''}></p>
                    </div>
                  </li>
                ))
              ) : (
                <p className='noMes'>No messages available</p>
              )
            }
          </ul>
          <ul className='groupsList'>

            {groupsList.map((group) => (

              <li key={group.group_id} onClick={() => handleTabClickGroup(group)}>


                <div className='friendsInfo cursor-pointer'>

                  <img src={`${photoUrl}/upload/default/group/group.png`} alt={`${activeTab.name} ${activeTab.surname}`} />
                  <p className="infFriend">{group.group_name}</p>


                  <button onClick={openModalDel} className='groupMembers'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>

                  </button>

                  <p className={activeTab.group_id === group.group_id ? 'active' : ''}></p>


                </div>
              </li>
            ))}
          </ul>
        </div>


        <div className='messagesBox'>
          <div className='friendInfoMes '>
            {activeTab.group_id ? (

              <img src={`${photoUrl}/upload/default/group/group.png`} alt={`${activeTab.name} ${activeTab.surname}`} />
            ) : (
              <img src={`${photoUrl}${activeTab.profileImg || defaultPhoto}`} alt={`${activeTab.name} ${activeTab.surname}`} />
            )}


            <div>
              <p>{activeTab.name} {activeTab.surname}</p>
              <p>{activeTab.status}</p>
              <p>{activeTab.group_name}

              </p>
            </div>


          </div>

          <hr />
          <div className="messagesData" ref={messagesDataRef}>
            {messageList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((msg, index) => (
              <div key={index} className={msg.sender_id === users.id ? 'send' : 'get'}>
                {msg.sender_id === users.id ? (
                  <div className='flex'>

                    <p className='bg-sky-100 pl-3 pr-3 pt-2 rounded'>{msg.message}</p>
                    <img src={users.profileImg || "/src/assets/images/pfp.webp"} alt='' className='ml-3' />
                  </div>
                ) : (
                  <div className='flex'>

                    {
                      (msg.profileImg && msg.profileImg.startsWith('/api')) ?
                        msg.profileImg = msg.profileImg.split('/api')[1] : false

                    }

                    <img
                      src={`${photoUrl}${activeTab.profileImg || msg.profileImg || defaultPhoto}`}
                      alt={`${activeTab?.name} ${activeTab?.surname}`}
                    />



                    <div>

                      <p className='text-xs text-neutral-400'>  {msg.name} {msg.surname}</p>

                      <p className='bg-green-100 pl-3 pr-3 pt-2 rounded'>{msg.message}</p>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='textContainer'>

            <textarea
              className='textarea'
              placeholder=''
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <div onClick={sendMessage} className='sendMesBut bg-sky-500 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddGroup
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}


      {isModalOpenDel && (
        <DelMember
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          group_id={activeTab.group_id}
        />
      )}
    </div>
  );
};

export default Messages;













