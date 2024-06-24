import React, { useEffect, useState } from 'react';
import { getUserData } from '../../utils/api/usersApi';

import './TimeNav.scss'

import { NavLink } from 'react-router-dom';
// const {id} = JSON.parse(localStorage.getItem('userData'))

export default function TimeNav() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
  setUsers(getUserData())
      // getUserData().then((result) => {
      //   setUsers(result)
      // })
    }, [])

    return (
        <div className='timeline'>

            <ul className='timeul'>
                <li className='adminName  '>

                    {/* {users.map((user) => ( */}
                        <div key={users.id}>
                            <h5 className='text-base'>{users.name} {users.surname}</h5>
                            <span>{users.position}</span>
                        </div>
                    {/* ))} */}


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
