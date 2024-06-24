// import { useState } from 'react'
// import './App.css'
// import Login from './pages/Login/Login'
// import { Route, Routes } from 'react-router-dom';


// import Home from './pages/Home/Home'
// import Newsfeed from './pages/Newsfeed/Newsfeed'
// import Photos from './components/Photos/Photos'
// import Messages from './components/Messages/Messages'
// import Register from './pages/Register/Register'
// import Friendspage from './components/Friendspage/Friendspage'
// import Timeline from './components/Timeline/Timeline'
// import OpenRoute from './components/OpenRoute/OpenRoute'
// import PrivateRoute from './components/PrivateRoute/PrivateRoute'



// function App() {
//   const [count, setCount] = useState(0)

//   return (
    // <>
    //   <Routes>
    //     <Route path="/" element={<PrivateRoute />}>

    //       <Route path='/' element={<Home />} >


    //         <Route path='photos' element={<Photos />} />
    //         <Route path='friendspage' element={<Friendspage />} />
    //         <Route path='/' element={<Timeline />} />
    //         <Route path='messages' element={<Messages />} />
    //       </Route>
    //       <Route path='/newsfeed' element={<Newsfeed />} />
    //     </Route>

    //     <Route path="/" element={<OpenRoute />}>
    //       <Route path='auth/login' element={<Login />} />
    //       <Route path='auth/register' element={<Register />} />
    //     </Route>

    //   </Routes >
    // </>
//   )
// }

// export default App


import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import OpenRoute from './components/OpenRoute/OpenRoute';
import Loader from './components/Loader/Loader';

// Lazy-loaded components
const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyNewsfeed = lazy(() => import('./pages/Newsfeed/Newsfeed'));
const LazyPhotos = lazy(() => import('./components/Photos/Photos'));
const LazyMessages = lazy(() => import('./components/Messages/Messages'));

const LazyRegister = lazy(() => import('./pages/Register/Register'));
const LazyFriendspage = lazy(() => import('./components/Friendspage/Friendspage'));
const LazyTimeline = lazy(() => import('./components/Timeline/Timeline'));
const LazyLogin = lazy(() => import('./pages/Login/Login'));

function App() {
  const [count, setCount] = useState(0);

  return (
 <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>

          <Route path='/' element={<Suspense fallback={<Loader/>}> <LazyHome /></Suspense>} >


            <Route path='photos' element={<Suspense fallback={<Loader/>}> <LazyPhotos /></Suspense>}  />
            <Route path='friendspage' element={<Suspense fallback={<Loader/>}> <LazyFriendspage/></Suspense>}  />
            <Route path='' element={<Suspense fallback={<Loader/>}> <LazyTimeline/></Suspense>}  />
            <Route path='messages' element={<Suspense fallback={<Loader/>}> <LazyMessages /></Suspense>}  />

          </Route>
          <Route path='/newsfeed' element={<Suspense fallback={<Loader/>}> <LazyNewsfeed /></Suspense>}  />
        </Route>

        <Route path="/auth/" element={<OpenRoute />}>
          <Route path='login' element={<Suspense fallback={<Loader/>}> <LazyLogin /></Suspense>} />
          <Route path='register' element={<Suspense fallback={<Loader/>}> <LazyRegister /></Suspense>} />
        </Route>

      </Routes >
   </>
  );
}

export default App;
