import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import Feature from '../../components/Feature/Feature'
import TimeNav from '../../components/TimeNav/TimeNav'
import Shortcuts from '../../components/Shortcuts/Shortcuts'
import Friends from '../../components/Friends/Friends'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import './Home.css'
export default function Home() {

  return (

    <div className='homeContainer'>
      <Navbar />
      <Feature />
      <TimeNav/>

      <div className='gridMenu'>
        <Shortcuts />

        <Outlet />


        <Friends />
      </div>
      <Footer />
    </div>
  )
}


