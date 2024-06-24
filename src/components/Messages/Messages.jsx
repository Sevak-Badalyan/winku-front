// jishta bayc sax em stanum friend umessage 

// import io from "socket.io-client";
// import React, { useState, useEffect, useRef } from 'react';
// import './Messages.scss';
// import { getUserData } from '../../utils/api/usersApi';
// import TitleUnderline from '../TitleUnderline/TitleUnderline';
// import { getFriendsMessage} from '../../utils/api/friendsApi';
// import Loader from "../Loader/Loader";

// const photoUrl = import.meta.env.VITE_PHOTO_URL;
// const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';
// // const messageTone = new Audio('../../assets/audio/pol.mp3');

// const getStatusColor = (status) => {
//   switch (status) {
//     case 'online':
//       return 'green';
//     case 'offline':
//       return 'grey';
//     case 'away':
//       return 'orange';
//     default:
//       return 'grey';
//   }
// };

// const Messages = () => {
//   const [friendsList, setFriendsList] = useState([]);
//   const [users, setUsers] = useState({});
//   const [activeTab, setActiveTab] = useState(null);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
  
//   const messagesDataRef = useRef(null);



    
//   const socket = io.connect("http://localhost:7071");
//   // console.log('/api');
//   // const socket = io.connect('/socket.io');
 
//   const scrollToBottom = () => {
//     messagesDataRef.current?.scrollTo({ top: messagesDataRef.current.scrollHeight });//, behavior: 'smooth'
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUserData();
//         setUsers(userData);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       if (users.id) {
//         try {
//           const result = await getFriendsMessage(users.id);
//           setFriendsList(result);
//           if (result.length > 0) {
//             setActiveTab(result[0]);
//             setMessageList(result[0].messages);
//           }
//         } catch (error) {
//           console.error('Error fetching friends:', error);
//         }
//       }
//     };

//     fetchFriends();
//   }, [users.id]);
 

// // useEffect(() => {
// //   const fetchFriends = async () => {
// //     setLoading(true);
// //     setError(null);

// //     if (users.id && activeTab) {
// //       try {
// //         const result = await getFriendsMessageById(activeTab.friendships_id);
// //         setFriendsList([result]); // Assuming result is a single object or an array of messages
// //         socket.current.emit("join_room", activeTab.friendships_id);
// //       } catch (error) {
// //         console.error(`Error fetching messages for friendships_id ${activeTab.friendships_id}:`, error);
// //         setError('Failed to fetch messages');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   fetchFriends();
// // }, [users.id, activeTab]);


//   useEffect(() => {
//     if (activeTab) {
//     //  console.log(" activeTab", activeTab);
//     socket.emit("join_room", activeTab.friendships_id);
//     //  try {
//     //   const result =  getFriendsMessageById(activeTab.friendships_id);
     
//     //   // setFriendsList(result);
//     // }catch (error) {
//     //   console.error('Error fetching friends:', error);
//     // }
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [activeTab, socket]);

//   useEffect(() => {
//     if (activeTab) {
//       setMessageList(activeTab.messages);
//       scrollToBottom();
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageList((list) => [...list, data]);
//       // messageTone.play();
//       scrollToBottom();
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [socket]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messageList]);

//   const handleTabClick = (friend) => {
//     setActiveTab(friend);
//   };

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: activeTab.friendships_id,
//         author: users.username,
//         sender_id: users.id,
//         receiver_id: activeTab.id !== users.id ? activeTab.id : activeTab.friend_id,
//         message: currentMessage,
//       };

//       await socket.emit("send_message", messageData);
//       setMessageList((list) => [...list, messageData]);
//       setCurrentMessage("");
//       scrollToBottom();
//     }
//   };

//   if (!activeTab) return <Loader />;

//   return (
//     <div className='messageContainer'>
//       <div className='mesBell'>
//         <div className='bellAll'>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
//             <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
//           </svg>
//           <TitleUnderline title={'All Messages'} />
//         </div>
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
//             <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
//           </svg>
//         </div>
//       </div>

//       <div className='messages'>
//         <div className='leftFriends'>
//           <ul className='friendsList'>
//             {friendsList.map((friend) => (
//               <li key={friend.friendships_id} onClick={() => handleTabClick(friend)}>
//                 <div className='friendsInfo cursor-pointer'>
//                   <div className='statImg'>
//                     <img src={`${photoUrl}${friend.profileImg || defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />
//                     <div className="status" style={{ outline: '3px solid', outlineColor: getStatusColor(friend.status) }}></div>
//                   </div>
//                   <p className="infFriend">{friend.name}</p>
//                   <p > {friend.surname} </p>
//                   <p className={activeTab.friendships_id === friend.friendships_id ? 'active' : ''}></p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className='messagesBox'>
//           <div className='friendInfoMes '>
//             <img src={`${photoUrl}${activeTab.profileImg || defaultPhoto}`} alt={`${activeTab.name} ${activeTab.surname}`} />
//             <div>
//               <p>{activeTab.name} {activeTab.surname}</p>
//               <p>{activeTab.status}</p>
//             </div>
//           </div>
//           <hr />

//           <div className="messagesData" ref={messagesDataRef}>
//             {messageList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((msg, index) => (
//               <div key={index} className={msg.sender_id === users.id ? 'send' : 'get'}>
//                 {msg.sender_id === users.id ? (
//                   <div className='flex'>
//                     <p className='bg-sky-100 pl-3 pr-3 pt-2 rounded'>{msg.message}</p>
//                     <img src={users.profileImg || "/src/assets/images/pfp.webp"} alt='' className='ml-3' />
//                   </div>
//                 ) : (
//                   <div className='flex'>
//                     <img src={`${photoUrl}${activeTab.profileImg || defaultPhoto}`} alt={`${activeTab.name} ${activeTab.surname}`} />
//                     <p className='bg-green-100 pl-3 pr-3 pt-2 rounded'>{msg.message}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className='textContainer'>
//             <textarea
//               className='textarea'
//               placeholder=''
//               value={currentMessage}
//               onChange={(e) => setCurrentMessage(e.target.value)}
//             ></textarea>
//             <div onClick={sendMessage} className='sendMesBut bg-sky-500 cursor-pointer'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
//                 <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;








import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import './Messages.scss';
import { getUserData } from '../../utils/api/usersApi';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import { getFriends, getFriendsMessageById } from '../../utils/api/friendsApi';
import Loader from "../Loader/Loader";

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
  // const [socket, setSocket] = useState(null);
  
   const socket = io.connect("http://localhost:7071");

  // useEffect(() => {
  //   const socket= io.connect("http://localhost:7071");
  //   // setSocket(newSocket);

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  
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
          if (friends.length > 0) {
            const firstFriend = friends[0];
            setActiveTab(firstFriend);
            const messages = await getFriendsMessageById(firstFriend.friendships_id );
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
      socket.emit("join_room", activeTab.friendships_id);
      scrollToBottom();
    }
  }, [activeTab, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        if (data.room === activeTab.friendships_id) {
          setMessageList((list) => [...list, data]);
          scrollToBottom();
        }
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [socket, activeTab]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const handleTabClick = async (friend) => {
    setActiveTab(friend);
    const messages = await getFriendsMessageById(friend.friendships_id );
    
    setMessageList(messages);
  };

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: activeTab.friendships_id,
        author: users.username,
        sender_id: users.id,
        receiver_id: activeTab.id !== users.id ? activeTab.id : activeTab.friend_id,
        message: currentMessage.trim(),
        created_at: new Date().toISOString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      scrollToBottom();
    }
  };

  if (!activeTab) return <Loader />;

  return (
    <div className='messageContainer'>
      <div className='mesBell'>
        <div className='bellAll'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
          <TitleUnderline title={'All Messages'} />
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
        </div>
      </div>

      <div className='messages'>
        <div className='leftFriends'>
          <ul className='friendsList'>
            {friendsList.map((friend) => (
              <li key={friend.friendships_id} onClick={() => handleTabClick(friend)}>
                <div className='friendsInfo cursor-pointer'>
                  <div className='statImg'>
                    <img src={`${photoUrl}${friend.profileImg || defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />
                    <div className="status" style={{ outline: '3px solid', outlineColor: getStatusColor(friend.status) }}></div>
                  </div>
                  <p className="infFriend">{friend.name}</p>
                  <p > {friend.surname} </p>
                  <p className={activeTab.friendships_id === friend.friendships_id ? 'active' : ''}></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='messagesBox'>
          <div className='friendInfoMes '>
            <img src={`${photoUrl}${activeTab.profileImg || defaultPhoto}`} alt={`${activeTab.name} ${activeTab.surname}`} />
            <div>
              <p>{activeTab.name} {activeTab.surname}</p>
              <p>{activeTab.status}</p>
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
                    <img src={`${photoUrl}${activeTab?.profileImg || defaultPhoto}`} alt={`${activeTab?.name} ${activeTab?.surname}`} />
                    <p className='bg-green-100 pl-3 pr-3 pt-2 rounded'>{msg.message}</p>
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
            ></textarea>
            <div onClick={sendMessage} className='sendMesBut bg-sky-500 cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;





