


import React, { useState, useEffect } from 'react';
import { delMembers, getMembers } from '../../utils/api/groupsApi';
import "./DelMember.scss";

const photoUrl = import.meta.env.VITE_PHOTO_URL;
const defaultPhoto = 'upload/default/profile/beff811f-c8ce-44b1-9ebb-21e699f6d82a.webp';

const DelMember = ({ isOpen, onClose, group_id }) => {
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getMembers(group_id);
        setMembersList(members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    if (isOpen) {
      fetchMembers();
    }
  }, [isOpen, group_id]);


const handleDelete = async (user_id) => {
  try {
    const response = await delMembers({group_id, user_id});

    setMembersList(membersList.filter(member => member.user_id !== user_id));
    console.log('Deleted:', response);
  } catch (error) {
    console.error('Error deleting member:', error);
  } 
};
const { id } = JSON.parse(localStorage.getItem('userData'));

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Members </h2>
    
         <div className="members-list">
          {membersList.map((member) => (
            <div key={member.user_id} className="member-item">
              <img src={`${photoUrl}${member.profileImg || defaultPhoto}`} alt={`${member.name} ${member.surname}`} />
              <label className='memberGroup' htmlFor={`member-${member.user_id}`}>{member.name} {member.surname}</label>
              {member.user_id === id ? (
                <button onClick={() => handleDelete(member.user_id)}>
                  Leave
                </button>
              ) : (<button onClick={() => handleDelete(member.user_id)} >
               
              Delete
            </button>)}
            </div>
          ))}
        </div>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DelMember;
