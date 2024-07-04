


import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../utils/api/usersApi';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const pfp = import.meta.env.VITE_DEFAULT_PROFILE
const defaultPhoto  = photoUrl + pfp;

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searched, setSearched] = useState(false); 

  useEffect(() => {
    if (searchText === '') {
      setFilteredUsers([]);
      setSearched(false); 
      return;
    }

    searchUsers({searchText})
      .then(result => {
        setFilteredUsers(result);
        setSearched(true);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [searchText]);

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  return (
    <div className="search-container">
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <input
            className="inputSearch"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            autoFocus
            style={{
              padding: '5px',
              marginLeft: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </li>
      </ul>

      <div>
        <ul>
          {filteredUsers.length === 0 && searched ? ( 
            <p>No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <li key={user.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div style={{ marginRight: '10px' }}>
                  <img src={`${user.profileImg || defaultPhoto}`} alt={`${user.name} ${user.surname}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </div>
                <div>
                  <p>{user.name}</p>
                  <p>{user.surname}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
