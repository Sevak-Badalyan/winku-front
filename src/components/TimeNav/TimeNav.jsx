import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/api/usersApi';

import './TimeNav.scss'

import { NavLink } from 'react-router-dom';

export default function TimeNav() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
  setUsers(getUserData())

    }, [])

    return (
        <div className='timeline'>

            <ul className='timeul'>
                <li className='adminName  '>

                        <div key={users.id}>
                            <h5 className='text-base'>{users.name} {users.surname}</h5>
                            <span>{users.position}</span>
                        </div>


                </li>
                <li className='menuTime'>
                    <NavLink to="/">Time Line  </NavLink>
                    <NavLink to="/photos">Photos</NavLink>
                    <NavLink to="/friendspage">Friends</NavLink>
                    <NavLink to="/messages">Messages</NavLink>
                </li>
            </ul>

        </div>

    )
}
