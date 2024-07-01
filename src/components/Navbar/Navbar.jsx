import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserData } from '../../utils/api/usersApi';
import './Navbar.scss'
import { Link, NavLink } from 'react-router-dom'
import Modal from '../Modal/Modal';
import Search from '../Search/Search';

const photoUrl = import.meta.env.VITE_PHOTO_URL;



const menuItems = [
  {
    title: 'Home ⌵',
    subMenu: ['HOME ', 'PHOTOS', 'FRIENDS', 'MESSAGES', 'NEWS FEED']
  },
  {
    title: 'Timeline ⌵',
    subMenu: ['TIMELINE', 'TIMELINE FRIENDS', 'TIMELINE GROUPS', 'TIMELINE PAGES', 'TIMELINE PHOTOS', 'TIMELINE VIDEOS']
  },
  {
    title: 'Account Settings ⌵',
    subMenu: ['CREATE FAV PAGE', 'EDIT ACCOUNT SETTING', 'EDIT-INTERESR', 'EDIT-PASSWORD', 'EDIT PROFILE BASICS', ' EDIT WORK EDUCATIONS', 'MESSAGE BOX', 'INBOX', 'NOTIFICATIONS PAGE']
  },
  {
    title: 'More Pages ⌵',
    subMenu: ['CAREERS', 'CAREER DETAIL', '404 ERROR PAGE', '404 STYLE2', 'FAQS PAGE', 'INSIGHTS', 'KNOWLEDGE BASE']
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'green';
    case 'offline':
      return 'grey';
    case 'away':
      return 'orange';
    default:
      return 'black';
  }
};




const StatusIndicator = ({ status, onClick }) => (
  <div
    className="status"
    style={{ backgroundColor: getStatusColor(status) }}
    onClick={() => onClick(status)}
  ></div>
);

export const Navbar = () => {



  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('online');
  const [showInput, setShowInput] = useState(false);
  const [users, setUsers] = useState([]);



  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
  };
  useEffect(() => {
    setUsers(getUserData())

  }, [])


  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };


  const toggleInput = () => {
    setShowInput(!showInput);
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    handleCloseModal();
  };



  return (
    <>
      <div className='navbarContainer'>
        <Link to='/newsfeed'>
          <div className='leftNav'>
            <img src={`${photoUrl}/upload/default/logo/logo.png`} alt="img" />

          </div>
        </Link>
        <div className='minbar'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-justify" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
          </svg>
          <img src="https://www.wpkixx.com/html/winku/newsfeed.html" alt="" />

        </div>
        <div className='centerNav'>

          <div className='menu'>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <a href="#">{menuItem.title}</a>
                  <ul className='menuItem'>
                    {menuItem.subMenu.map((subMenuItem, subIndex) => (
                      <li key={subIndex}>{subMenuItem}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className='rightNav'>
          <div className='icons'>

            <ul>

              <li onClick={toggleInput} style={{ cursor: 'pointer' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>

              </li>
              {showInput && (
                
                  <div className='inputSearch'>

                    <Search />
                  </div>
              
              )}

     




              <li className='homeNav'>
                <Link to='/'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>
                </Link>
               </li>
            {/*  <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
              </li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              </svg></li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-central-south-asia" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z" />
                </svg>
              </li> */}
              <li>
                <div className='userImgNav'>
                  <div className='myStatus'>



                    <img onClick={() => handleOpen()} src={users.profileImg || "/src/assets/images/pfp.webp"} alt={`Profile `} />
                    <StatusIndicator status={currentStatus} onClick={handleStatusChange} />
                    <div className="status">

                    </div>
                  </div>
                  <ul className={isOpen ? 'active' : ''}>

                    <li>
                      <span>Online</span>
                      <div className="status"></div>
                      <StatusIndicator status="online" onClick={handleStatusChange} />
                    </li>
                    <li>
                      <span>Away</span>
                      <div className="status"></div>

                      <StatusIndicator status="away" onClick={handleStatusChange} />
                    </li>
                    <li>
                      <span>Offline</span>
                      <div className="status"></div>

                      <StatusIndicator status="offline" onClick={handleStatusChange} />
                    </li>


                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                      <span>View Profile</span></li>
                    <li onClick={handleOpenModal} className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                      Edit Profile</li>
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
                    <li>
                      <NavLink to="/auth/login" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                          <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                        </svg>
                        Log Out
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

          </div>

        </div>
      </div >
<div className='miniCont'>


<Search />

</div>
    </>


  )
}





