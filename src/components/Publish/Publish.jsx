
import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/api/usersApi';
import { createPost } from '../../utils/api/postApi';
import './Publish.css';

export default function Publish({ refreshPosts }) {
  const [postText, setPostText] = useState('');
  const [postPhoto, setPostPhoto] = useState(null);
  const [users, setUsers] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData();
      setUsers(userData);
    }
    fetchData();
  }, []);

  const handleTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
      setPostPhoto(file);
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = async () => {
    if (!users) {
      console.error('User not available');
      return;
    }

    try {
      const { id } = JSON.parse(localStorage.getItem('userData'));

      if (!postText.trim() && !postPhoto) {
        return;
      }

      const body = {
        user_id: id,
        type: 'posts',
        postText: postText,
        postPhoto: postPhoto,
      };

      const response = await createPost(body);

      console.log('Post created:', response);

      setPostText('');
      setPostPhoto(null);
      setFilePreview(null);

      refreshPosts();
    } catch (error) {
      setPostText('');
      setPostPhoto(null);
      setFilePreview(null);
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='publishsContainer'>
      <div className='publishs'>
        <div>
          <div>
            <img className='user_image' src={users?.profileImg} alt="" />
          </div>
        </div>
        <div className='textContainer'>
          <textarea
            className='textarea'
            placeholder='Write something'
            value={postText}
            onChange={handleTextChange}
          ></textarea>
          <div className='attachments'>
            <ul>
              <li>
                <input type="file" accept='image/*' id='file' name='file' onChange={handleUpload} />
                <label htmlFor='file'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-card-image' viewBox='0 0 16 16'>
                    <path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
                    <path d='M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z' />
                  </svg>
                </label>
              </li>
              <li>
                <button onClick={handlePostSubmit}>Publish</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="preview">
        {filePreview && (
          <img src={filePreview} alt="File Preview" className="file-preview" />
        )}
      </div>
    </div>
  );
}
