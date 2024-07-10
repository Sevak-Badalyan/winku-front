import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import './Messages.scss';


  
  export default function SkeletonMes() {
  return (
    <div className="messageContainer">
      <div className="mesBell">
        <div className="bellAll">

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
          <div className='mesOrGroup cursor-pointer '>
            <TitleUnderline title={'All Messages'} />
          </div>
        </div>

        <div className="modalIcons">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
          </svg>
        </div>
      </div>



      <div className="messages">
        <div className="leftFriends">
          <ul className="friendsList">
            <li>
              <div className="friendsInfo">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={100} />
              </div>
            </li>
            <li>
              <div className="friendsInfo">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={100} />
              </div>
            </li>
            <li>
              <div className="friendsInfo">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={100} />
              </div>
            </li>
          </ul>
        </div>
        <div className="messagesBox">
          <div className="friendInfoMes">
            <Skeleton circle={true} height={50} width={50} />
            <Skeleton width={150} />
          </div>
          <div className="messagesData">
              <div className="message get">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton width={200} height={20} style={{ marginLeft: '10px' }} />
              </div>
              <div className="message send">
                <Skeleton width={200} height={20} />
                <Skeleton circle={true} height={30} width={30} style={{ marginLeft: '10px' }} />
              </div>
              <div className="message get">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton width={200} height={20} style={{ marginLeft: '10px' }} />
              </div>
          </div>
          <div className="textContainer">

            <textarea
              className='textarea'
              placeholder=''
             
            ></textarea>
            <div  className='sendMesBut bg-sky-500 cursor-pointer'>
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

