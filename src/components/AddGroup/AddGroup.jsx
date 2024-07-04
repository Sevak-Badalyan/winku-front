
import React, { useState, useEffect } from 'react';
import './AddGroup.scss';
import { getFriends } from '../../utils/api/friendsApi';
import { addGroups, addMembers } from '../../utils/api/groupsApi';

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const pfp = import.meta.env.VITE_DEFAULT_PROFILE
const defaultPhoto  = photoUrl + pfp;

const AddGroup = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const handleCheckboxChange = (friendId) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(friendId)
        ? prevSelectedFriends.filter((id) => id !== friendId)
        : [...prevSelectedFriends, friendId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGroup = await addGroups({ group_name: groupName });
      const groupId = newGroup.group_id;
      const { id } = JSON.parse(localStorage.getItem('userData'));
      await addMembers({ group_id: groupId, user_id: id });
      await Promise.all(selectedFriends.map(friendId => addMembers({ group_id: groupId, user_id: friendId })));

      setGroupName('');
      setSelectedFriends([]);
      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friends = await getFriends();
        setFriendsList(friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    if (isOpen) {
      fetchFriends();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Add Group</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='modalInp'
            type="text"
            placeholder="Enter group's name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <button className='CreateGroup' type="submit">Create Group</button>
          <div className="group-friend-list">
            {friendsList.map((friend) => (
              <div key={friend.id} className="group-friend-item">
                <img src={`${friend.profileImg || defaultPhoto}`} alt={`${friend.name} ${friend.surname}`} />
                <label className='frGroup' htmlFor={`friend-${friend.id}`}>{friend.name} {friend.surname}</label>
                <input
                  className='modalInp'

                  type="checkbox"
                  id={`friend-${friend.id}`}
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleCheckboxChange(friend.id)}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
