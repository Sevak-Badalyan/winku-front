import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/api/usersApi';
import { changePicture } from '../../utils/api/uploadApi';
import './Feature.scss'

// const photoUrl = import.meta.env.VITE_PHOTO_URL
export default function Feature() {


  const [users, setUser] = useState({});
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  const handleUpload = async (event, type) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      let response = await changePicture({ file: selectedFile, type: type });
      if (!response.imagePath) {
        // response.imagePath =``
      }
      const updatedUser = { ...users };

      if (type === 'profile') {
        updatedUser.profileImg = `${response.imagePath}`
      } else if (type === 'cover') {
        updatedUser.coverImg = `${response.imagePath}`
      }

      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));

      // console.log('User data updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='featureContainer'>
      <div className="featurePhoto">


        <img src={users.coverImg} alt="" />
      </div>

      <div className='userPhoto'>
        <img src={users.profileImg} alt="" />
        <input type="file" accept='image/*' id='file2' name='file2' onChange={(e) => handleUpload(e, 'profile')} />

        <label htmlFor='file2'  >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
          </svg>
          <p>    Edit Display Photo </p>
        </label>
      </div>

      <div className='editBut'>

        <input type="file" accept='image/*' id='file3' name='file3' onChange={(e) => handleUpload(e, 'cover')} />
        <label htmlFor='file3'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
          </svg>
          Edit Cover Photo
        </label>
      </div>
      <div className='rightBut'>
        <span>1205 followers</span>
        <button className='addBut'>Add Friend</button>
      </div>
    </div>
  )
}
