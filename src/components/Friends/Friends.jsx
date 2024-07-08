

import React, { useEffect, useState } from 'react';
import Friend from './Friend/Friend';
import TitleUnderline from '../TitleUnderline/TitleUnderline';
import { getFriends } from '../../utils/api/friendsApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './Friends.css';

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
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="skeleton-loader">
                <Skeleton circle={true} height={40} width={40} />
                <div>
                  <Skeleton width={100} />
                  <Skeleton width={150} />
                </div>
              </div>
            ))
          ) : filteredFriends.length > 0 ? (
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

