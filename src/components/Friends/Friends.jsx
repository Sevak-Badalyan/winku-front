import React, { useEffect, useState } from 'react';
import Friend from './Friend/Friend';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import { getFriends } from '../../utils/api/friendsApi';


import './Friends.css'
import Loader from '../Loader/Loader';


export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFriends().then((result) => {
      setFriends(result);
      setLoading(false);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFriends = friends.filter((friend) => {
    const fullName = `${friend.name} ${friend.surname}`.toLowerCase();
    return fullName.includes(searchTerm);
  });


if (loading) { 
  return <Loader />;
}
  return (
    <div className='friendsContainer'>
      <div className="friend-list">
        <div>
          <TitleUnderline title={'Friends'} />
          <input
            type="text"
            placeholder='Search Contacts...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className='data'>
       
           {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))
        ) : (
          <p className='noFriends'>No friends available</p>
        )}
        </div>
      </div>
    </div>
  );
}
