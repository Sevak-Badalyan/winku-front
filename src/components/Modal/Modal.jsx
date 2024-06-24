


import React, { useState, useEffect } from 'react';
import { editUsers, getUserData } from '../../utils/api/usersApi';

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    position: ''
  });

  const [users, setUser] = useState({});

  useEffect(() => {
    if (isOpen) {
      const userData = getUserData();
      setUser(userData);
      setFormData({
        name: userData.name || '',
        surname: userData.surname || '',
        position: userData.position || ''
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUsers(formData); // Assuming editUsers updates data in the API/database
      const updatedUserData = {
        ...users,
        name: formData.name,
        surname: formData.surname,
        position: formData.position
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input 
              type="text" 
              name="surname" 
              value={formData.surname} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input 
              type="text" 
              name="position" 
              value={formData.position} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
