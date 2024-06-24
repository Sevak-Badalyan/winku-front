import React, { useEffect, useState } from 'react';
import Friend from './Friend/Friend';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import { getFriends } from '../../utils/api/friendsApi';


import './Friends.css'


export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getFriends().then((result) => {
      setFriends(result);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFriends = friends.filter((friend) => {
    const fullName = `${friend.name} ${friend.surname}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

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
          {filteredFriends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
